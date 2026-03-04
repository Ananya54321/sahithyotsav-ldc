"use client";

import { motion } from "framer-motion";
import { Clock, MapPin, Star } from "lucide-react";
import { MagicCard } from "@/components/ui/magic-card";
import { BorderBeam } from "@/components/ui/border-beam";

interface EventCardProps {
  session: "FN" | "AN" | "Online" | "Full Day";
  time: string;
  title: string;
  venue: string;
  index: number;
}

const sessionBadges = {
  FN: { label: "Forenoon", classes: "badge-purple" },
  AN: { label: "Afternoon", classes: "badge-gold" },
  Online: { label: "Online", classes: "badge-purple" },
  "Full Day": { label: "Full Day", classes: "badge-gold" },
};

const isSpecialEvent = (title: string) =>
  /inauguration|finale|valedictory|closing|cultural|prize/i.test(title);

export default function EventCard({
  session,
  time,
  title,
  venue,
  index,
}: EventCardProps) {
  const badge = sessionBadges[session];
  const special = isSpecialEvent(title);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.06, duration: 0.45 }}
      className="rounded-2xl"
    >
      <MagicCard
        className="rounded-2xl h-full"
        gradientSize={280}
        gradientColor="rgba(45, 0, 107, 0.06)"
        gradientFrom="#7c3aed"
        gradientTo="#f1cd76"
        gradientOpacity={0.5}
      >
        <div className="h-1 bg-linear-to-r from-[#2d006b] via-[#5a00c8] to-[#7c3aed]" />

        <div className="p-5">
          <div className="flex items-center justify-between mb-3">
            <span className={badge.classes}>{badge.label}</span>
            {special && (
              <Star
                size={14}
                className="text-[#d0a651] fill-[#f1cd76]"
              />
            )}
          </div>

          <h3
            className="font-black uppercase text-sm tracking-wide text-[#1a0040] mb-3 leading-snug"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            {title}
          </h3>

          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-[#6b5f8a] text-sm">
              <Clock size={13} className="text-[#cbb386] shrink-0" />
              <span>{time}</span>
            </div>
            <div className="flex items-center gap-2 text-[#6b5f8a] text-sm">
              <MapPin size={13} className="text-[#cbb386] shrink-0" />
              <span>{venue}</span>
            </div>
          </div>
        </div>

        {special && (
          <BorderBeam
            size={100}
            duration={8}
            colorFrom="#f1cd76"
            colorTo="#7c3aed"
            borderWidth={2}
          />
        )}
      </MagicCard>
    </motion.div>
  );
}
