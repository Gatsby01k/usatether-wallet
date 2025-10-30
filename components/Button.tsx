// components/Button.tsx
"use client";
import React from "react";
import { cn } from "../lib/utils";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost";
};
export default function Button({ variant="primary", className, ...props }: Props) {
  return (
    <button
      {...props}
      className={cn("btn", variant==="primary" ? "btn-primary" : "btn-ghost", className)}
    />
  );
}
