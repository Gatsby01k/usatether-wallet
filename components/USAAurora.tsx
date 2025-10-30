"use client";

import { motion } from "framer-motion";

/**
 * Патриотичный фон: глубокий navy + анимированные конусные ленты
 * из цветов логотипа (red/blue/white) + мягкое свечение.
 * Лёгкий, responsive, без Canvas/WebGL.
 */
export default function USAAurora() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* базовый navy с лёгким виньетированием */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_0%,#0B1831_0%,#081225_45%,#061021_100%)]" />

      {/* крупные «ленты» — conic-gradient слои */}
      <motion.div
        className="absolute -left-1/3 top-[-20%] h-[130vh] w-[160vw] blur-3xl opacity-70 mix-blend-screen"
        style={{
          background:
            "conic-gradient(from 230deg at 40% 50%, rgba(31,95,175,0.65), rgba(255,255,255,0.35), rgba(193,18,47,0.60), transparent 75%)",
          maskImage:
            "radial-gradient(80% 60% at 50% 50%, black 55%, transparent 100%)",
        }}
        initial={{ rotate: -4, y: 40, opacity: 0 }}
        animate={{ rotate: 2, y: 0, opacity: 0.85 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      />
      <motion.div
        className="absolute -right-1/4 bottom-[-30%] h-[120vh] w-[140vw] blur-3xl opacity-60 mix-blend-screen"
        style={{
          background:
            "conic-gradient(from 60deg at 60% 40%, rgba(193,18,47,0.55), rgba(255,255,255,0.25), rgba(31,95,175,0.55), transparent 75%)",
          maskImage:
            "radial-gradient(75% 60% at 50% 50%, black 50%, transparent 100%)",
        }}
        initial={{ rotate: 5, y: -20, opacity: 0 }}
        animate={{ rotate: -2, y: 0, opacity: 0.75 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      />

      {/* микро-звёзды */}
      <div className="absolute inset-0 opacity-40 [background-image:radial-gradient(1px_1px_at_25%_15%,rgba(255,255,255,.9),transparent_60%),radial-gradient(1px_1px_at_70%_35%,rgba(255,255,255,.8),transparent_60%),radial-gradient(1px_1px_at_40%_75%,rgba(255,255,255,.7),transparent_60%),radial-gradient(1px_1px_at_80%_70%,rgba(255,255,255,.7),transparent_60%)] [background-size:300px_300px,420px_420px,360px_360px,500px_500px] [background-repeat:repeat]" />

      {/* мягкая плёнка/зерно */}
      <div className="absolute inset-0 opacity-[.08] mix-blend-overlay [background-image:var(--grain-img)]" />

      {/* верхний «спотлайт» под логотип в hero */}
      <div className="absolute left-1/2 top-[18vh] h-[38vh] w-[38vh] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.28),rgba(31,95,175,.18),transparent_70%)] blur-2xl" />
    </div>
  );
}
