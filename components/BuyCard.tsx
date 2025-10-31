"use client";
export default function BuyCard({
  title, href, soon,
}: { title: string; href?: string; soon?: boolean; }) {
  return (
    <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        {soon ? (
          <span className="rounded-full bg-white/10 px-2 py-1 text-xs">soon</span>
        ) : null}
      </div>
      <p className="mt-2 text-sm text-white/70">Card on-ramp to buy stablecoins directly.</p>
      <div className="mt-4">
        {href ? (
          <a target="_blank" rel="noopener noreferrer"
             className="inline-flex rounded-xl bg-emerald-500/90 px-3 py-2 text-sm font-medium hover:bg-emerald-500"
             href={href}>
            Open
          </a>
        ) : (
          <button disabled className="rounded-xl bg-white/10 px-3 py-2 text-sm opacity-60">Not available</button>
        )}
      </div>
    </div>
  );
}
