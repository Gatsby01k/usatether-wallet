'use client';

export const dynamic = "force-dynamic";
export const revalidate = 0;

import Starfield from '@/components/Starfield';
import HeroExact from '@/components/HeroExact';
import { HomeFeatures, FAQShort } from '@/components/HomeSections';

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <Starfield />
      <HeroExact />
      <HomeFeatures />
      <FAQShort />
    </main>
  );
}
