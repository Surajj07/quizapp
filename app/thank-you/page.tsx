export default async function ThankYou({
  searchParams,
}: {
  searchParams: { rec?: string };
}) {
 const params = await searchParams;
  const rec = params?.rec ? decodeURIComponent(params.rec) : null;

  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="text-3xl font-bold mb-2">Thanks for submitting! ✅</h1>
      <p className="text-gray-600">We also sent you a confirmation email.</p>

      <div className="mt-6 rounded-2xl bg-white p-6 shadow">
        <h2 className="mb-2 text-xl font-semibold">
          Your Personalized Recommendation
        </h2>
        <p className="text-gray-800">{rec || "No recommendation found."}</p>
      </div>
    </main>
  );
}
