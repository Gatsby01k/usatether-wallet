"use client";

import { useEffect, useRef } from "react";

/**
 * Небесная «комета» за курсором — лёгкая, без слушателей на каждом элементе.
 * Добавляет премиум-ощущение на главной.
 */
export default function CursorComet() {
  const r = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = r.current!;
    const move = (e: MouseEvent) => {
      const x = e.clientX - 100;
      const y = e.clientY - 100;
      el.style.transform = `translate3d(${x}px,${y}px,0)`;
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      ref={r}
      className="pointer-events-none fixed left-0 top-0 z-[40] h-[200px] w-[200px] -translate-x-1/2 -translate-y-1/2 opacity-0 md:opacity-60"
      style={{
        filter: "blur(24px)",
        background:
          "radial-gradient(closest-side, rgba(255,255,255,.22), rgba(31,95,175,.18), rgba(193,18,47,.18), transparent 65%)",
      }}
    />
  );
}
