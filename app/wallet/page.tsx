export const dynamic = "force-dynamic";
export const revalidate = false;

import ConnectButton from '@/components/ConnectButton';

export default function Page() {
  return (
    <main className="pt-10">
      <section className="container py-8">
        <h1 className="h1 mb-6">Connect Wallet</h1>
        <div className="soft-card p-6 md:p-10">
          <p className="tagline mb-4">MetaMask / WalletConnect</p>
          <ConnectButton />
        </div>
      </section>
    </main>
  );
}
