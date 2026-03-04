"use client";

import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

/* Cadbury-style rule: two gold lines with a sparkle center */
export function OrnamentalDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`chapter-rule my-6 ${className}`}>
      <Sparkles size={16} className="text-[#cbb386]" />
    </div>
  );
}

/* These aren't used in the new Cadbury design — return null to not clutter */
export function FloatingFeather({ className = "" }: { className?: string }) {
  return null;
}

export function FloatingBook({ className = "" }: { className?: string }) {
  return null;
}
