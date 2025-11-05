// components/Navbar.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type SectionRoute = '/swap' | '/bridge' | '/buy' | '/wallet';

const items: { href: SectionRoute; label: string }[] = [
  { href: '/swap', label: 'Swap' },
  { href: '/bridge', label: 'Bridge' },
  { href: '/buy', label: 'Buy' },
  { href: '/wallet', label: 'Wallet' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-40 backdrop-blur bg-black/20 border-b border-white/10">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        {/* Логотип */}
        <Link href="/" className="flex items-center gap-2 font-semibold text-white hover:opacity-90">
          <img src="/logo.svg" alt="USATether" className="h-6 w-6" />
          <span>USATether</span>
        </Link>

        {/* Навигация */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className={`transition-colors hover:text-white ${
              pathname === '/' ? 'text-white font-medium' : 'text-white/70'
            }`}
          >
            Home
          </Link>

          {items.map(({ href, label }) => {
            const active = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`transition-colors ${
                  active ? 'text-white font-medium' : 'text-white/70 hover:text-white'
                }`}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
