// app/terms/page.tsx
export default function TermsPage() {
  return (
    <main className="container mx-auto px-6 py-24">
      <h1 className="text-4xl font-extrabold">Terms of Use</h1>
      <p className="mt-4 max-w-3xl text-white/70">
        USATether Wallet is provided “as is” for demonstration purposes. No custody, no guarantees.
        Use at your own risk. Contact <a href="mailto:info@usatether.io" className="text-sky-300">info@usatether.io</a>.
      </p>
    </main>
  );
}
