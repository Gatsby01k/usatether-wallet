
'use client';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const nav = [
  { href: '/', label: 'Home' },
  { href: '/swap', label: 'Swap' },
  { href: '/bridge', label: 'Bridge' },
  { href: '/buy', label: 'Buy' },
  { href: '/faq', label: 'FAQ' },
];

export default function Navbar(){
  const pathname = usePathname();
  return (
    <header className="fixed top-0 inset-x-0 z-40 backdrop-blur-xl bg-black/10 border-b border-white/10">
      <div className="container mx-auto px-5 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-8 h-8">
            <Image src="/logo.svg" alt="USATether" fill className="object-contain" />
          </div>
          <span className="font-bold tracking-tight">USATether</span>
        </Link>
        <nav className="flex items-center gap-6">
          {nav.map(i => (
            <Link key={i.href} href={i.href}
              className={"text-sm font-medium hover:text-white " + (pathname===i.href? "text-white":"text-white/70")}>
              {i.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
