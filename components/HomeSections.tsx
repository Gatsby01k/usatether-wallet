// components/HomeSections.tsx — финальная версия
import type { Route } from "next";
import Link from "next/link";
import {
  Shield,
  Repeat,
  CreditCard,
  HelpCircle,
  Newspaper,
  Lock,
  CheckCircle2,
} from "lucide-react";

/* ===== Features ===== */
export function HomeFeatures() {
  const items = [
    {
      title: "Swap",
      text: "Simple token swaps with clear fees and finality.",
      href: "/swap" as Route,
      icon: Repeat,
    },
    {
      title: "Bridge",
      text: "Move value between USAT and USDT with confidence.",
      href: "/bridge" as Route,
      icon: Shield,
    },
    {
      title: "Buy",
      text: "USD → crypto on-ramp (coming soon). Self-custody only.",
      href: "/buy" as Route,
      icon: CreditCard,
    },
    {
      title: "FAQ",
      text: "Compliance & security answers.",
      href: "/faq" as Route,
      icon: HelpCircle,
    },
  ] as const;

  return (
    <section className="container mx-auto px-6 py-10">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {items.map(({ title, text, href, icon: Icon }) => (
          <Link
            key={title}
            href={href}
            className="group rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition hover:bg-white/10"
          >
            <div className="mb-3 flex items-center gap-2">
              <Icon className="h-5 w-5 opacity-80" />
              <h3 className="text-lg font-semibold">{title}</h3>
            </div>
            <p className="text-sm leading-relaxed text-white/70">{text}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ===== Social Proof / Trust ===== */
export function SocialProof() {
  const items = [
    { t: "Self-custody • Non-custodial", i: Lock },
    { t: "Transparent fees", i: CheckCircle2 },
    { t: "U.S.-focused UX", i: Newspaper },
  ];
  return (
    <section className="container mx-auto px-6 py-12">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
        <div className="grid items-center gap-4 text-center md:grid-cols-3">
          {items.map(({ t, i: I }) => (
            <div
              key={t}
              className="flex items-center justify-center gap-3 text-white/80"
            >
              <I className="h-5 w-5 opacity-80" />
              <span className="text-sm md:text-base">{t}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== CTA Banner ===== */
export function CtaBanner() {
  return (
    <section className="container mx-auto px-6 py-16">
      <div className="flex flex-col items-center justify-between gap-6 rounded-3xl border border-white/10 bg-gradient-to-r from-sky-500/10 to-rose-500/10 p-8 text-center md:flex-row md:text-left">
        <div>
          <h3 className="text-2xl font-bold">Ready to move value?</h3>
          <p className="mt-2 text-white/70">
            Bridge USAT ↔ USDT with clarity. WalletConnect planned; MetaMask
            works today.
          </p>
        </div>
        <Link
          href={"/bridge" as Route}
          className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-5 py-3 font-semibold hover:bg-white/15"
        >
          Launch Bridge
        </Link>
      </div>
    </section>
  );
}

/* ===== FAQ (Short) ===== */
export function FAQShort() {
  const q = [
    {
      q: "Is USAT a stablecoin?",
      a: "USAT is a planned USD-pegged asset. The UI here is an MVP demo.",
    },
    {
      q: "Which wallets?",
      a: "MetaMask works today. WalletConnect planned.",
    },
    {
      q: "Where are funds stored?",
      a: "In your own wallet. This site never stores keys.",
    },
  ];
  return (
    <section className="container mx-auto px-6 pb-20">
      <h2 className="mb-6 text-2xl font-extrabold">FAQ</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {q.map(({ q, a }) => (
          <div
            key={q}
            className="rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <h3 className="mb-2 font-semibold">{q}</h3>
            <p className="text-sm text-white/70 leading-relaxed">{a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
