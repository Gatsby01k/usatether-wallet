'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type SectionId = 'swap' | 'bridge' | 'buy' | 'faq';

const items: { key: SectionId; label: string }[] = [
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
          <Link href="/" className="hover:opacity-80">Home</Link>

          {items.map(({ key, label }) =>
            onHome ? (
              // На главной: скролл к якорям обычной ссылкой (typedRoutes не мешает)
              <a key={key} href={`/#${key}`} className="text-white/80 hover:text-white">
                {label}
              </a>
            ) : (
              // На внутренних: строго типизированные пути через Link
              <Link key={key} href={`/${key}` as `/${SectionId}`} className="text-white/80 hover:text-white">
                {label}
              </Link>
            )
          )}
        </div>
      </div>
    </nav>
  );
}
