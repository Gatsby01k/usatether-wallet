// app/privacy/page.tsx
export default function PrivacyPage() {
  return (
    <main className="container mx-auto px-6 py-24">
      <h1 className="text-4xl font-extrabold">Privacy Policy</h1>
      <p className="mt-4 max-w-3xl text-white/70">
        This MVP does not collect or store personal data. Wallet keys remain in your self-custody.
        For inquiries contact <a href="mailto:info@usatether.io" className="text-sky-300">info@usatether.io</a>.
      </p>
    </main>
  );
}
