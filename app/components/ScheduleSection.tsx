"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, MapPin, Sun, Sunset, Star, X } from "lucide-react";
import { ScheduleEvent } from "../data/schedule";
import { ComicText } from "@/components/ui/comic-text";
import { ShineBorder } from "@/components/ui/shine-border";
import { MagicCard } from "@/components/ui/magic-card";
import { BorderBeam } from "@/components/ui/border-beam";
import { useOutsideClick } from "@/hooks/use-outside-click";

interface ScheduleSectionProps {
  day: string;
  events: ScheduleEvent[];
  dayIndex: number;
}

const sessionStyle: Record<
  string,
  { label: string; badge: string; gradient: string }
> = {
  FN: {
    label: "Forenoon",
    badge: "badge-purple",
    gradient: "from-[#2d006b] to-[#5a00c8]",
  },
  AN: {
    label: "Afternoon",
    badge: "badge-gold",
    gradient: "from-[#d0a651] to-[#f1cd76]",
  },
  Online: {
    label: "Online",
    badge: "badge-purple",
    gradient: "from-[#2d006b] to-[#5a00c8]",
  },
  "Full Day": {
    label: "Full Day",
    badge: "badge-gold",
    gradient: "from-[#d0a651] to-[#f1cd76]",
  },
};

const isSpecial = (t: string) =>
  /inauguration|finale|valedictory|closing|cultural|prize/i.test(t);

export default function ScheduleSection({
  day,
  events,
  dayIndex,
}: ScheduleSectionProps) {
  const [active, setActive] = useState<ScheduleEvent | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
    };
    if (active) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  useOutsideClick(modalRef, () => setActive(null));

  const handleSelect = (event: ScheduleEvent) => {
    if (event.title === "Workshop – Emotional Intelligence in the Time of Artificial Intelligence") {
      setToastMessage("Registrations will be open soon!");
      setTimeout(() => setToastMessage(null), 3000);
      return;
    }
    setActive(event);
  };

  // Events no longer split by session

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: dayIndex * 0.2, duration: 0.6 }}
      className="mb-20 last:mb-0"
    >
      {/* ── Expanded modal ── */}
      <AnimatePresence>
        {active && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-40"
            />
            <div className="fixed inset-0 z-50 grid place-items-center p-4">
              <motion.div
                ref={modalRef}
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 20 }}
                transition={{ type: "spring", duration: 0.5, bounce: 0.2 }}
                className="relative w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl"
              >
                <button
                  onClick={() => setActive(null)}
                  className="absolute top-4 right-4 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-colors"
                >
                  <X size={16} className="text-white" />
                </button>

                <div
                  className={`bg-linear-to-r ${sessionStyle[active.session].gradient} p-8`}
                >
                  <span className="inline-block px-3 py-1 rounded-full text-[0.65rem] font-bold bg-white/20 text-white uppercase tracking-widest mb-3">
                    {sessionStyle[active.session].label}
                  </span>
                  <h3
                    className="font-black uppercase text-xl text-white tracking-wide leading-tight"
                    style={{ fontFamily: "var(--font-montserrat)" }}
                  >
                    {active.title}
                  </h3>
                </div>

                <div className="p-6 space-y-5">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-[#2d006b]/10 flex items-center justify-center shrink-0">
                      <Clock size={18} className="text-[#2d006b]" />
                    </div>
                    <div>
                      <p className="text-[0.65rem] text-[#6b5f8a] uppercase tracking-widest font-bold">
                        Time
                      </p>
                      <p className="font-semibold text-sm text-[#1a0040]">
                        {active.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-[#2d006b]/10 flex items-center justify-center shrink-0">
                      <MapPin size={18} className="text-[#2d006b]" />
                    </div>
                    <div>
                      <p className="text-[0.65rem] text-[#6b5f8a] uppercase tracking-widest font-bold">
                        Venue
                      </p>
                      <p className="font-semibold text-sm text-[#1a0040]">
                        {active.venue}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-[#2d006b]/10 flex items-center justify-center shrink-0">
                      {active.session === "FN" ? (
                        <Sun size={18} className="text-[#2d006b]" />
                      ) : (
                        <Sunset size={18} className="text-[#d0a651]" />
                      )}
                    </div>
                    <div>
                      <p className="text-[0.65rem] text-[#6b5f8a] uppercase tracking-widest font-bold">
                        Session
                      </p>
                      <p className="font-semibold text-sm text-[#1a0040]">
                        {`Day ${dayIndex + 1} · ${sessionStyle[active.session].label}`}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* ── Day header ── */}
      <div className="relative flex items-center gap-5 rounded-2xl bg-linear-to-r from-[#2d006b] to-primary-light p-6 mb-10 overflow-hidden">
        <ShineBorder
          shineColor={["#f1cd76", "#d0a651", "#7c3aed"]}
          borderWidth={2}
          duration={8}
        />
        <ComicText
          fontSize={2.2}
          className="shrink-0"
          style={{
            backgroundColor: "#f1cd76",
            backgroundImage:
              "radial-gradient(circle at 1px 1px, #d0a651 1px, transparent 0)",
            WebkitTextStroke: `${2.2 * 0.35}px #1a0040`,
            filter:
              "drop-shadow(3px 3px 0px #1a0040) drop-shadow(2px 2px 0px #d0a651)",
            transform: "skewX(-8deg)",
          }}
        >
          {`Day ${dayIndex + 1}`}
        </ComicText>
        <div>
          <h2 className="heading-section text-lg sm:text-xl text-white">
            {day}
          </h2>
          <p className="text-white/60 text-sm mt-0.5">
            {events.length} events scheduled
          </p>
        </div>
      </div>

      {/* ── All events ── */}
      <EventList events={events} onSelect={handleSelect} />

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-[#1a0040] text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-[#f1cd76]/30"
          >
            <div className="w-2 h-2 rounded-full bg-[#f1cd76] animate-pulse" />
            <span className="text-sm font-semibold tracking-wide" style={{ fontFamily: "var(--font-montserrat)" }}>
              {toastMessage}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

/* ────────────────────────────────────────────────
   Session group — label + desktop table + mobile cards
   ──────────────────────────────────────────────── */

function EventList({
  events,
  onSelect,
  className = "",
}: {
  events: ScheduleEvent[];
  onSelect: (e: ScheduleEvent) => void;
  className?: string;
}) {
  return (
    <div className={className}>

      {/* ── Desktop: table ── */}
      <div className="hidden md:block rounded-xl overflow-hidden border border-[#2d006b]/10 bg-white">
        <div className="grid grid-cols-[240px_1fr_200px] gap-4 px-5 py-3 bg-[#2d006b]/4 border-b border-[#2d006b]/10 items-center">
          <span className="text-[0.65rem] font-bold uppercase tracking-widest text-[#6b5f8a]">
            Time
          </span>
          <span className="text-[0.65rem] font-bold uppercase tracking-widest text-[#6b5f8a]">
            Event
          </span>
          <span className="text-[0.65rem] font-bold uppercase tracking-widest text-[#6b5f8a] text-right">
            Venue
          </span>
        </div>

        {events.map((event, i) => {
          const special = isSpecial(event.title);
          const cfg = sessionStyle[event.session];
          return (
            <motion.div
              key={`${event.title}-${event.time}`}
              onClick={() => onSelect(event)}
              initial={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.3 }}
              className="grid grid-cols-[240px_1fr_200px] gap-4 px-5 py-4 items-center cursor-pointer border-b border-[#2d006b]/5 last:border-b-0 hover:bg-[#2d006b]/3 transition-colors group"
            >
              <span className="text-sm text-[#6b5f8a] font-medium tabular-nums pr-2">
                {event.time}
              </span>
              <h3
                className="text-sm font-bold text-[#1a0040] uppercase tracking-wide group-hover:text-[#2d006b] transition-colors flex items-center gap-2 pr-4"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                {event.title}
                {special && (
                  <Star
                    size={12}
                    className="text-[#d0a651] fill-[#f1cd76] shrink-0"
                  />
                )}
              </h3>
              <span className="text-sm text-[#6b5f8a] text-right">{event.venue}</span>
            </motion.div>
          );
        })}
      </div>

      {/* ── Mobile: cards ── */}
      <div className="md:hidden grid grid-cols-1 gap-4">
        {events.map((event, i) => {
          const special = isSpecial(event.title);
          const cfg = sessionStyle[event.session];
          return (
            <motion.div
              key={`${event.title}-${event.time}-m`}
              onClick={() => onSelect(event)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.06, duration: 0.45 }}
              className="rounded-2xl cursor-pointer"
            >
              <MagicCard
                className="rounded-2xl h-full"
                gradientSize={280}
                gradientColor="rgba(45, 0, 107, 0.06)"
                gradientFrom="#7c3aed"
                gradientTo="#f1cd76"
                gradientOpacity={0.5}
              >
                <div
                  className={`h-1 bg-linear-to-r ${cfg.gradient}`}
                />
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className={cfg.badge}>{cfg.label}</span>
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
                    {event.title}
                  </h3>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-[#6b5f8a] text-sm">
                      <Clock size={13} className="text-[#cbb386] shrink-0" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#6b5f8a] text-sm">
                      <MapPin size={13} className="text-[#cbb386] shrink-0" />
                      <span>{event.venue}</span>
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
        })}
      </div>
    </div>
  );
}
