"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";

// Берём все пропсы motion.button, НО children переопределяем на ReactNode
type MotionButtonBase = Omit<React.ComponentProps<typeof motion.button>, "children">;

type Props = MotionButtonBase & {
  children?: React.ReactNode;
  icon?: React.ReactNode;
};

export default function PrimaryButton({ children, className, icon, ...props }: Props) {
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ y: 0 }}
      {...props}
      className={cn(
        "group relative inline-flex items-center gap-2 rounded-2xl px-6 py-3 font-semibold text-slate-900",
        "bg-white shadow-lg hover:shadow-xl active:scale-[0.99]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500",
        className
      )}
    >
      <span className="relative z-10">{children as React.ReactNode}</span>
      {icon && <span className="relative z-10">{icon}</span>}
      {/* sheen */}
      <span className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-white/0 via-white/10 to-white/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </motion.button>
  );
}
