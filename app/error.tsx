"use client";
import { useEffect } from "react";

export default function GlobalError({ error }: { error: Error }) {
  useEffect(() => console.error(error), [error]);
  return (
    <html>
      <body className="flex min-h-screen items-center justify-center text-center text-white/80">
        <div>
          <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
          <p>Please refresh the page.</p>
        </div>
      </body>
    </html>
  );
}
