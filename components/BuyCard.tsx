"use client";
export default function BuyCard({
  title, href, soon = true, note,
}: { title: string; href?: string; soon?: boolean; note?: string }) {
  const disabled = soon || !href;
  return (
    <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">{title}</h3>
        <span className="badge-soon">SOON</span>
      </div>
      <p className="mt-2 text-sm text-white/70">
        {note ?? "Card on-ramp for buying stablecoins. USAT support will be added at launch."}
      </p>
      <div className="mt-4">
        <button
          disabled={disabled}
          className={`btn-primary ${disabled ? "opacity-60" : ""}`}
          onClick={() => { if (!disabled && href) window.open(href, "_blank", "noopener,noreferrer"); }}
        >
          Open
        </button>
      </div>
    </div>
  );
}
