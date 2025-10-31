// components/Navbar.tsx
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const items = [
  { key: 'swap', label: 'Swap' },
  { key: 'bridge', label: 'Bridge' },
  { key: 'buy', label: 'Buy' },
  { key: 'faq', label: 'FAQ' },
];

export default function Navbar() {
  const pathname = usePathname();
  const onHome = pathname === '/';

  return (
    <nav className="sticky top-0 z-40 backdrop-blur bg-black/20">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <img src="/logo.svg" alt="USATether" className="h-6 w-6" />
          <span>USATether</span>
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/" className={`hover:opacity-80 ${onHome ? 'text-white' : 'text-white/80'}`}>Home</Link>
          {items.map(i => {
            const href = onHome ? `/#${i.key}` : `/${i.key}`;
            return (
              <Link key={i.key} href={href} className="text-white/80 hover:text-white">
                {i.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
