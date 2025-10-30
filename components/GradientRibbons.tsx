// components/GradientRibbons.tsx
"use client";
import { motion } from "framer-motion";


export default function GradientRibbons() {
return (
<div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
<motion.div
initial={{ y: 40, opacity: 0 }}
animate={{ y: 0, opacity: 1 }}
transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
className="absolute -left-40 top-10 h-[70vh] w-[120vw] rotate-[-6deg] blur-2xl"
style={{
background:
"conic-gradient(from 210deg at 30% 50%, rgba(193,18,47,.55), rgba(31,95,175,.55), transparent 70%)",
maskImage: "radial-gradient(80% 60% at 50% 50%, black 60%, transparent 100%)",
}}
/>
</div>
);
}
