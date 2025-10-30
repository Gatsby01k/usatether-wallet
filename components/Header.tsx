// components/Header.tsx
"use client";
export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-[rgba(8,18,32,.75)] backdrop-blur border-b border-white/10">
      <div className="container-xxl h-16 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3">
          <img src="/logo.svg?v=4" alt="USATether" className="h-9 w-auto drop-shadow-[0_0_18px_rgba(255,255,255,.35)]" />
          <span className="sr-only">USATether</span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {[
            { href: "#bridge", label: "Bridge" },
            { href: "#features", label: "Features" },
            { href: "#why", label: "Why it works" },
            { href: "#faq", label: "FAQ" },
          ].map(l => (
            <a key={l.href} href={l.href} className="link-nav">{l.label}</a>
          ))}
          <a href="#cta" className="btn btn-primary">Launch App</a>
        </nav>
      </div>
    </header>
  );
}
