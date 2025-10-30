
'use client';
import Starfield from '@/components/Starfield';

const items = [
  { q:'What is USAT?', a:'A planned USD-pegged stable asset. This UI is an MVP for design and flows.'},
  { q:'Is Stripe used to store funds?', a:'No. Stripe may be used only for future on-ramp payments. Wallets remain self-custody.'},
  { q:'Which wallets are supported?', a:'MetaMask today; WalletConnect planned.'},
  { q:'Where are private keys stored?', a:'Keys stay in your wallet provider; not on this website.'},
];

export default function FAQ(){
  return (
    <main className="relative min-h-[70vh] pt-24">
      <Starfield />
      <section className="container mx-auto px-5">
        <h1 className="text-4xl font-extrabold">FAQ</h1>
        <div className="mt-6 grid sm:grid-cols-2 gap-4">
          {items.map((it)=> (
            <div key={it.q} className="rounded-2xl border border-white/10 p-5 bg-white/5">
              <p className="font-semibold">{it.q}</p>
              <p className="text-sm text-white/70 mt-1">{it.a}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
