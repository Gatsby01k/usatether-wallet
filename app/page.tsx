// app/page.tsx — финальная композиция главной
import HeroExact from "@/components/HeroExact";
import { HomeFeatures, FAQShort, SocialProof, CtaBanner } from "@/components/HomeSections";

export default function Page() {
  return (
    <main className="relative min-h-screen">
      <HeroExact />

      {/* Тонкий градиент-разделитель */}
      <div className="mx-auto my-16 h-px w-full max-w-6xl bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <HomeFeatures />

      <SocialProof />

      <CtaBanner />

      {/* FAQ в конце для доверия */}
      <div className="mx-auto my-16 h-px w-full max-w-6xl bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <FAQShort />
    </main>
  );
}
