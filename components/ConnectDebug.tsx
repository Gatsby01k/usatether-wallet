// components/ConnectDebug.tsx
'use client';
import { useConnect } from 'wagmi';

export default function ConnectDebug() {
  const { connectors, status } = useConnect();
  return (
    <pre className="text-xs bg-black/40 rounded-lg p-3 overflow-auto">
      status: {status}
      {'\n'}
      connectors:
      {connectors.map((c) => `\n- ${c.id} (${c.name}) ready=${(c as any).ready}`).join('')}
    </pre>
  );
}
