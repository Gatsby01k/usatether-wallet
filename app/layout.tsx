import './globals.css';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Providers from './providers';
import Starfield from '@/components/Starfield';

export const metadata: Metadata = {
  title: 'USATether Wallet — American Web Wallet',
  description: 'Swap, Bridge, Buy, FAQ. Built for the U.S. market.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0A1B34] text-white">
        {/* глобальный фон со звёздами */}
        <Starfield className="fixed inset-0 -z-20 pointer-events-none opacity-70" />
        {/* (если в твоём Starfield нет prop className — оберни div с этими классами внутри него) */}

        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
