"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { QuizAnswer } from "@/types/quiz";

const initialAnswers: QuizAnswer = {
  q1: "",
  q2: "",
  q3: "",
  q4: "",
  q5: "",
};

export default function QuizForm() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [answers, setAnswers] = useState<QuizAnswer>(initialAnswers);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const steps = [
    "Basic Info",
    "Track Preference",
    "Experience",
    "Runtime",
    "Testing",
    "Learning Style",
  ];
  const percent = Math.round((step / (steps.length - 1)) * 100);

  // Step validation for disabling buttons
  function isStepValid(): boolean {
    if (step === 0) {
      return name.trim() !== "" && /\S+@\S+\.\S+/.test(email);
    }
    if (step === 1) return answers.q1 !== "";
    if (step === 2) return answers.q2 !== "";
    if (step === 3) return answers.q3 !== "";
    if (step === 4) return answers.q4 !== "";
    if (step === 5) return answers.q5 !== "";
    return false;
  }

  async function onSubmit() {
    if (!isStepValid()) return;

    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, answers }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok)
        throw new Error(data.message || "Submission failed");
      router.push(`/thank-you?rec=${encodeURIComponent(data.recommendation)}`);
    } catch (e: unknown) {
      if (e instanceof Error) setError(e.message);
      else setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow max-w-lg mx-auto">
      <div className="mb-4">
        <div className="h-2 w-full rounded bg-gray-100">
          <div
            className="h-2 rounded bg-blue-500 transition-all"
            style={{ width: `${percent}%` }}
          />
        </div>
        <div className="mt-2 text-sm text-gray-500">
          Step {step + 1} of {steps.length} — {steps[step]}
        </div>
      </div>

      {/* --- Step Fields --- */}
      {step === 0 && (
        <section className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium">Name</span>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-lg border p-2"
              placeholder="Your name"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border p-2"
              placeholder="you@example.com"
            />
          </label>
        </section>
      )}

      {step === 1 && (
        <section className="space-y-2">
          <h2 className="font-medium">Which track interests you most?</h2>
          {["frontend", "backend", "fullstack"].map((opt) => (
            <label key={opt} className="block">
              <input
                type="radio"
                name="q1"
                value={opt}
                checked={answers.q1 === opt}
                onChange={(e) => setAnswers({ ...answers, q1: e.target.value })}
              />{" "}
              {opt}
            </label>
          ))}
        </section>
      )}

      {step === 2 && (
        <section className="space-y-2">
          <h2 className="font-medium">Years of experience?</h2>
          {["0-1", "2-3", "3+"].map((opt) => (
            <label key={opt} className="block">
              <input
                type="radio"
                name="q2"
                value={opt}
                checked={answers.q2 === opt}
                onChange={(e) => setAnswers({ ...answers, q2: e.target.value })}
              />{" "}
              {opt}
            </label>
          ))}
        </section>
      )}

      {step === 3 && (
        <section className="space-y-2">
          <h2 className="font-medium">Preferred runtime?</h2>
          {["node", "deno", "bun"].map((opt) => (
            <label key={opt} className="block">
              <input
                type="radio"
                name="q3"
                value={opt}
                checked={answers.q3 === opt}
                onChange={(e) => setAnswers({ ...answers, q3: e.target.value })}
              />{" "}
              {opt}
            </label>
          ))}
        </section>
      )}

      {step === 4 && (
        <section className="space-y-2">
          <h2 className="font-medium">How do you feel about testing?</h2>
          {["love", "comfortable", "meh"].map((opt) => (
            <label key={opt} className="block">
              <input
                type="radio"
                name="q4"
                value={opt}
                checked={answers.q4 === opt}
                onChange={(e) => setAnswers({ ...answers, q4: e.target.value })}
              />{" "}
              {opt}
            </label>
          ))}
        </section>
      )}

      {step === 5 && (
        <section className="space-y-2">
          <h2 className="font-medium">What’s your learning style?</h2>
          {["hands-on", "reading", "video"].map((opt) => (
            <label key={opt} className="block">
              <input
                type="radio"
                name="q5"
                value={opt}
                checked={answers.q5 === opt}
                onChange={(e) => setAnswers({ ...answers, q5: e.target.value })}
              />{" "}
              {opt}
            </label>
          ))}
        </section>
      )}

      {error && <div className="mt-4 text-sm text-red-600">{error}</div>}

      <div className="mt-6 flex justify-between">
        {step > 0 && (
          <button
            onClick={() => setStep(step - 1)}
            className="rounded-lg bg-gray-200 px-4 py-2 cursor-pointer"
            disabled={loading}
          >
            Back
          </button>
        )}
        {step < steps.length - 1 && (
          <button
            onClick={() => setStep(step + 1)}
            className={`ml-auto rounded-lg bg-blue-600 px-4 py-2 text-white cursor-pointer ${
              !isStepValid() || loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!isStepValid() || loading}
          >
            Next
          </button>
        )}
        {step === steps.length - 1 && (
          <button
            onClick={onSubmit}
            className={`ml-auto rounded-lg bg-green-600 px-4 py-2 text-white cursor-pointer  ${
              !isStepValid() || loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={!isStepValid() || loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        )}
      </div>
    </div>
  );
}
