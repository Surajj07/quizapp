import QuizForm from "@/components/QuizForm";
export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen border-2  gap-16 ">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-3xl font-bold mb-2">SDE‑1 Quiz</h1>
        <p className="text-gray-600 mb-6">
          Answer 5 quick questions to get a personalized recommendation.
        </p>
        <QuizForm />
      </main>
    </div>
  );
}
