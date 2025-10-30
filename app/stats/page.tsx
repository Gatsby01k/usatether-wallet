import LiveStats from '@/components/LiveStats';
export default function Page(){
  return (
    <main className="pt-10">
      <section className="container py-8">
        <h1 className="h1 mb-6">Live Rates</h1>
        <LiveStats />
      </section>
    </main>
  );
}
