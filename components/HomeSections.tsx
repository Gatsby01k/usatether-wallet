
import Link from 'next/link';

export function HomeFeatures(){
  const items = [
    { title: 'Swap', desc: 'Simple token swaps with clear fees and finality.', href: '/swap' },
    { title: 'Bridge', desc: 'Move value between USAT and USDT with confidence.', href: '/bridge' },
    { title: 'Buy', desc: 'On-ramp options for fast USD → crypto (coming soon).', href: '/buy' },
    { title: 'FAQ', desc: 'Clear answers about compliance and security.', href: '/faq' },
  ];
  return (
    <section className="container mx-auto px-5 py-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {items.map((it)=> (
        <Link key={it.title} href={it.href}
          className="soft-card p-5 hover:bg-white/10 transition rounded-3xl border border-white/10 bg-white/5">
          <h3 className="text-lg font-semibold">{it.title}</h3>
          <p className="mt-2 text-sm text-white/70">{it.desc}</p>
        </Link>
      ))}
    </section>
  );
}

export function FAQShort(){
  const faqs = [
    { q: 'Is USAT a stablecoin?', a: 'USAT is a planned USD-pegged asset. The UI here is an MVP demo.'},
    { q: 'Which wallets?', a: 'MetaMask works today. WalletConnect planned.'},
    { q: 'Where are funds stored?', a: 'In your own wallet. This site never stores keys.'},
  ];
  return (
    <section className="container mx-auto px-5 pb-16">
      <h2 className="text-2xl font-bold mb-4">FAQ</h2>
      <div className="grid sm:grid-cols-3 gap-4">
        {faqs.map((f)=> (
          <div key={f.q} className="rounded-2xl border border-white/10 p-4 bg-white/5">
            <p className="font-semibold">{f.q}</p>
            <p className="text-sm text-white/70 mt-1">{f.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
