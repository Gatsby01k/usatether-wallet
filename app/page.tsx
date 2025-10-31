// app/page.tsx — серверный компонент, без обёрток
import HeroExact from "@/components/HeroExact";
import { HomeFeatures, FAQShort } from "@/components/HomeSections";

export default function Page() {
  return (
    <main className="relative min-h-screen">
      <HeroExact />
      <HomeFeatures />
      <FAQShort />
    </main>
  );
}
