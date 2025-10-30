export default function LiveStats(){
  return (
    <div className="soft-card p-6 md:p-10">
      <h2 className="h2 mb-4">Live Rates</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="soft-card p-5">
          <div className="text-sm text-white/60">USAT Price</div>
          <div className="text-2xl font-bold">$1.00</div>
        </div>
        <div className="soft-card p-5">
          <div className="text-sm text-white/60">USDT Price</div>
          <div className="text-2xl font-bold">$1.00</div>
        </div>
        <div className="soft-card p-5">
          <div className="text-sm text-white/60">24h Volume</div>
          <div className="text-2xl font-bold">$0</div>
        </div>
      </div>
      <p className="text-white/50 text-xs mt-4">Connect your provider to show real data.</p>
    </div>
  );
}
