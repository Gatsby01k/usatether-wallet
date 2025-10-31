// components/WalletHints.tsx
'use client';

export function WalletHints() {
  const wcEnabled = Boolean(process.env.NEXT_PUBLIC_WC_PROJECT_ID);
  return (
    <div className="text-sm text-white/70 space-y-2">
      {!wcEnabled && (
        <div className="rounded-lg bg-amber-500/10 border border-amber-500/30 p-3">
          WalletConnect отключён: не задан <code>NEXT_PUBLIC_WC_PROJECT_ID</code> в переменных окружения.
        </div>
      )}
      <div className="rounded-lg bg-white/5 p-3">
        Нет MetaMask? Установите расширение из официального магазина браузера.
      </div>
    </div>
  );
}
