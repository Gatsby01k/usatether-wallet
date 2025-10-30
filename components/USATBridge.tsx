'use client';
import { useState } from 'react';

export default function USATBridge(){
  const [dir, setDir] = useState<'USAT->USDT'|'USDT->USAT'>('USAT->USDT');
  const [amt, setAmt] = useState('');
  const rate = 1.00; // placeholder

  return (
    <div className="soft-card p-6 md:p-10">
      <h2 className="h2 mb-4">USAT ↔ USDT Bridge</h2>
      <div className="grid md:grid-cols-2 gap-5">
        <div className="soft-card p-5">
          <label className="block text-sm text-white/70 mb-2">Direction</label>
          <div className="flex gap-3">
            <button onClick={() => setDir('USAT->USDT')} className={`btn ${dir==='USAT->USDT'?'btn-blue':'soft-card px-4 py-2.5'}`}><span>USAT → USDT</span></button>
            <button onClick={() => setDir('USDT->USAT')} className={`btn ${dir==='USDT->USAT'?'btn-blue':'soft-card px-4 py-2.5'}`}><span>USDT → USAT</span></button>
          </div>
        </div>
        <div className="soft-card p-5">
          <label className="block text-sm text-white/70 mb-2">Amount</label>
          <input value={amt} onChange={e=>setAmt(e.target.value)} placeholder="0.00" className="w-full bg-transparent border border-white/15 rounded-2xl px-4 py-3 outline-none focus:border-white/30" />
          <div className="text-xs text-white/60 mt-2">Est. rate: ${rate.toFixed(2)}</div>
        </div>
      </div>
      <div className="mt-6 flex gap-3">
        <button className="btn btn-red"><span>Confirm</span></button>
        <button className="btn btn-blue"><span>Connect Wallet</span></button>
      </div>
    </div>
  );
}
