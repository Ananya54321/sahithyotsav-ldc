"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Container from "../components/Container";
import ScheduleSection from "../components/ScheduleSection";
import { schedule } from "../data/schedule";
import { ComicText } from "@/components/ui/comic-text";
import { DotPattern } from "@/components/ui/dot-pattern";

const EVENT_DATE = new Date("2026-03-13T09:00:00+05:30");

function useCountdown(target: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    function calc() {
      const diff = Math.max(0, target.getTime() - Date.now());
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    }
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [target]);

  return timeLeft;
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div
        className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center"
      >
        <span
          className="text-2xl sm:text-3xl font-black text-[#f1cd76]"
          style={{ fontFamily: "var(--font-montserrat)" }}
        >
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="text-[10px] text-white/50 uppercase tracking-wider font-semibold mt-2">
        {label}
      </span>
    </div>
  );
}

export default function SchedulePage() {
  const countdown = useCountdown(EVENT_DATE);

  return (
    <div className="flex flex-col min-h-screen">
      {/* ── Hero ── */}
      <section className="relative bg-[#2d006b] text-white pt-20 pb-28 text-center overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(80,0,160,0.4) 0%, transparent 70%)",
          }}
        />
        <DotPattern
          className="text-white/6"
          width={24}
          height={24}
          cr={1.2}
        />

        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col items-center"
          >
            <span className="eyebrow-label">Event Timeline</span>

            <ComicText
              fontSize={4}
              className="mt-2 mb-4"
              style={{
                backgroundColor: "#f1cd76",
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, #d0a651 1px, transparent 0)",
                WebkitTextStroke: `${4 * 0.35}px #1a0040`,
                filter:
                  "drop-shadow(5px 5px 0px #1a0040) drop-shadow(3px 3px 0px #d0a651)",
                transform: "skewX(-8deg)",
              }}
            >
              Festival Schedule
            </ComicText>

            <p className="text-white/70 text-lg max-w-xl mx-auto mb-8">
              Two days packed with literary events, competitions, and inspiring
              sessions. Plan your fest experience.
            </p>

            {/* Countdown */}
            <div className="flex items-center gap-3 sm:gap-5">
              <CountdownUnit value={countdown.days} label="Days" />
              <span className="text-2xl font-black text-white/30 mt-[-20px]">:</span>
              <CountdownUnit value={countdown.hours} label="Hours" />
              <span className="text-2xl font-black text-white/30 mt-[-20px]">:</span>
              <CountdownUnit value={countdown.minutes} label="Min" />
              <span className="text-2xl font-black text-white/30 mt-[-20px]">:</span>
              <CountdownUnit value={countdown.seconds} label="Sec" />
            </div>
          </motion.div>
        </Container>

        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg
            viewBox="0 0 1440 70"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            className="w-full h-[55px] md:h-[70px]"
          >
            <path
              d="M0,35 C360,70 1080,0 1440,35 L1440,70 L0,70 Z"
              fill="#faf9f7"
            />
          </svg>
        </div>
      </section>

      {/* ── Schedule content ── */}
      <section className="relative grow py-16 bg-[#faf9f7]">
        <DotPattern
          className="text-[#2d006b]/3"
          width={32}
          height={32}
          cr={0.8}
        />
        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {schedule.map((day, index) => (
              <ScheduleSection
                key={day.day}
                day={day.day}
                events={day.events}
                dayIndex={index}
              />
            ))}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="text-center text-[#6b5f8a] text-sm italic mt-12"
          >
            * Schedule is subject to minor changes. Please check back for
            updates.
          </motion.p>
        </Container>
      </section>
    </div>
  );
}
