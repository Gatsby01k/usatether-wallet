import Link from "next/link";
import HeroExact from "@/components/HeroExact";

function SectionShell({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="relative mx-auto max-w-6xl px-5 py-16">
      <h2 className="text-2xl md:text-3xl font-bold mb-4">{title}</h2>
      <div className="text-white/80 mb-6">{children}</div>
      <div className="flex gap-3">
        <a
          href={`/#${id}`}
          className="rounded-xl border border-white/15 px-3 py-2 text-sm"
        >
          Scroll here
        </a>
        <Link
          href={`/${id}`}
          className="rounded-xl bg-white/10 px-3 py-2 text-sm hover:bg-white/15"
        >
          Open full page →
        </Link>
      </div>
    </section>
  );
}

export default function Page() {
  return (
    <main>
      <HeroExact />

      <SectionShell id="swap" title="Swap">
        Simple token swaps with clear fees and finality. Ideal for USAT ⇄ USDT
        and more.
      </SectionShell>

      <SectionShell id="bridge" title="Bridge">
        Move value between USAT and USDT with confidence. Compliance-first
        routes.
      </SectionShell>

      <SectionShell id="buy" title="Buy">
        On-ramp options for fast USD → crypto (coming soon). Self-custody only.
      </SectionShell>

      <SectionShell id="faq" title="FAQ">
        Clear answers about compliance, custody, and supported wallets.
      </SectionShell>
    </main>
  );
}
