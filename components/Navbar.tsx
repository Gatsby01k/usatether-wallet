// components/Navbar.tsx
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type SectionRoute = '/swap' | '/bridge' | '/buy' | '/faq';

const items: { href: SectionRoute; label: string }[] = [
  { href: '/swap', label: 'Swap' },
  { href: '/bridge', label: 'Bridge' },
  { href: '/buy', label: 'Buy' },
  { href: '/faq', label: 'FAQ' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-40 backdrop-blur bg-black/20">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <img src="/logo.svg" alt="USATether" className="h-6 w-6" />
          <span>USATether</span>
        </Link>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            className={`hover:opacity-80 ${pathname === '/' ? 'text-white' : 'text-white/80'}`}
          >
            Home
          </Link>
          {items.map(({ href, label }) => (
            <Link key={href} href={href} className="text-white/80 hover:text-white">
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
