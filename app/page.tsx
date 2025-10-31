// app/page.tsx
import HeroExact from "@/components/HeroExact";
import { FAQShort } from "@/components/HomeSections";

export default function Page() {
  return (
    <main className="relative min-h-screen">
      <HeroExact />
      <FAQShort />
    </main>
  );
}
