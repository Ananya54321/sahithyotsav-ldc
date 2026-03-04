"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { MagicCard } from "@/components/ui/magic-card";
import { ComicText } from "@/components/ui/comic-text";

interface HighlightCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  index: number;
}

export default function HighlightCard({
  title,
  description,
  icon: Icon,
  index,
}: HighlightCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="cursor-default rounded-[20px] h-full"
    >
      <MagicCard
        className="rounded-[20px] border-white/10 h-full"
        gradientColor="rgba(100, 0, 200, 0.15)"
        gradientSize={250}
        gradientFrom="#f1cd76"
        gradientTo="#7c3aed"
        gradientOpacity={0.12}
      >
        <div className="p-7 bg-[#3d1080] rounded-[20px] group h-full">
          <div
            className="mb-5 group-hover:animate-pulse-glow transition-all duration-300 shrink-0"
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #f1cd76, #d0a651)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 16px rgba(209, 166, 81, 0.35)",
            }}
          >
            <Icon className="w-8 h-8 text-[#2d006b]" />
          </div>

          <ComicText
            fontSize={1.2}
            className="mb-3"
            style={{
              fontSize: "0.95rem",
              backgroundColor: "#f1cd76",
              backgroundImage:
                "radial-gradient(circle at 1px 1px, #d0a651 1px, transparent 0)",
              WebkitTextStroke: `${1.2 * 0.3}px #1a0040`,
              filter:
                "drop-shadow(2px 2px 0px #1a0040) drop-shadow(1px 1px 0px #d0a651)",
              transform: "skewX(-6deg)",
              textAlign: "left",
            }}
          >
            {title}
          </ComicText>
          <p className="text-white/60 text-sm leading-relaxed">
            {description}
          </p>

          <div className="mt-5 h-[2px] w-0 group-hover:w-full bg-linear-to-r from-[#f1cd76] to-[#d0a651] transition-all duration-500 rounded-full" />
        </div>
      </MagicCard>
    </motion.div>
  );
}
