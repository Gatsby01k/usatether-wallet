import { Shield, Gauge, Globe, Zap, Repeat, CreditCard } from 'lucide-react';

const list = [
  { icon: Shield,      title: 'Secure & Compliant', text: 'Best-practice security with U.S.-focused compliance foundations.' },
  { icon: Gauge,       title: 'Fast & Stable',      text: 'Low-latency UI and reliable infra for serious use.' },
  { icon: Globe,       title: 'US Market Ready',    text: 'Tone, UX, stability — designed for American users.' },
  { icon: Zap,         title: 'Awwwards Polish',    text: 'Premium feel: gradients, motion, micro-interactions.' },
  { icon: Repeat,      title: 'USAT ↔ USDT Bridge', text: 'Move value seamlessly between assets.' },
  { icon: CreditCard,  title: 'Fiat On-Ramps',      text: 'Extensible architecture to integrate on-ramps.' },
];

export default function FeaturesGrid(){
  return (
    <section className="container py-10 md:py-16">
      <h2 className="h2 mb-6">Why USATether</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {list.map(({icon:Icon,title,text}) => (
          <div key={title} className="soft-card p-6">
            <div className="mb-3 opacity-90"><Icon size={22} /></div>
            <div className="font-semibold text-lg mb-1">{title}</div>
            <div className="text-white/70 text-sm">{text}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
