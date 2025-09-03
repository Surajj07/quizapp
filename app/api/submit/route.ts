import { NextResponse } from "next/server";
import { z } from "zod";
import { connectDB } from "@/lib/mongodb";
import QuizResult from "@/models/QuizResult";
import nodemailer from "nodemailer";

const schema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  answers: z.object({
    q1: z.string(),
    q2: z.string(),
    q3: z.string(),
    q4: z.string(),
    q5: z.string(),
  }),
});

function computeRecommendation(answers: any) {
  if (answers.q1 === "frontend")
    return "You’ll thrive in a React/Next.js Frontend role. Focus on Server Components, caching, and testing.";
  if (answers.q1 === "backend")
    return "Backend leaning – deepen Node.js, APIs, and databases. Add caching and observability.";
  return "Full-stack track – ship end-to-end features with Next.js App Router and MongoDB.";
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = schema.parse(body);

    await connectDB();

    const recommendation = computeRecommendation(parsed.answers);

    // Save result
    await QuizResult.create({
      name: parsed.name,
      email: parsed.email,
      answers: parsed.answers,
      recommendation,
    });

    // Configure transporter
    // const transporter = nodemailer.createTransport({
    //   host: "smtp.gmail.com",
    //   port: 465,
    //   secure: true,
    //   auth: {
    //     user: process.env.GMAIL_USER,
    //     pass: process.env.GMAIL_PASS,
    //   },
    // });

    // try {
    //   const info = await transporter.sendMail({
    //     from: `"Quiz App" <${process.env.GMAIL_USER}>`,
    //     to: parsed.email,
    //     subject: "Your Quiz Recommendation",
    //     html: `<p>Hi ${parsed.name},</p>
    //     <p>Your recommendation:</p>
    //     <blockquote>${recommendation}</blockquote>
    //     <p>— Next Quiz App</p>`,
    //   });

    //   console.log("✅ Email sent:", info.messageId);
    // } catch (mailErr) {
    //   console.error("❌ Mail send error:", mailErr);
    //   // Do not fail request if mail fails
    // }

    return NextResponse.json({ ok: true, recommendation });
  } catch (err: any) {
    console.error("❌ API submit error:", err);
    const message =
      err?.issues?.[0]?.message || err.message || "Invalid request";
    return NextResponse.json({ ok: false, message }, { status: 400 });
  }
}
