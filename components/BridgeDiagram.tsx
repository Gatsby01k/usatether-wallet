export default function BridgeDiagram(){
  return (
    <div className="soft-card p-6 md:p-10">
      <h2 className="h2 mb-3">USAT ↔ USDT Bridge</h2>
      <p className="text-white/70 mb-6">Visual scheme & flows. Replace this with your live bridge component.</p>
      <div className="grid md:grid-cols-3 gap-4">
        <div className="soft-card p-5">
          <div className="text-white/80 font-semibold mb-1">1. Connect</div>
          <div className="text-white/60 text-sm">Link MetaMask or WalletConnect.</div>
        </div>
        <div className="soft-card p-5">
          <div className="text-white/80 font-semibold mb-1">2. Choose Amount</div>
          <div className="text-white/60 text-sm">Enter USAT to convert to USDT (or back).</div>
        </div>
        <div className="soft-card p-5">
          <div className="text-white/80 font-semibold mb-1">3. Confirm</div>
          <div className="text-white/60 text-sm">Review rate and sign transaction.</div>
        </div>
      </div>
    </div>
  );
}