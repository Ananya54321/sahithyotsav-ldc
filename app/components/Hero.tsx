"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Calendar, MapPin, BookOpen, Feather, PenTool, Scale, GraduationCap, Wand2, Trophy, Users } from "lucide-react";
import { motion } from "framer-motion";
import Container from "./Container";
import { ComicText } from "@/components/ui/comic-text";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

const heroStats = [
  { icon: Calendar, label: "Days", value: "2" },
  { icon: Trophy, label: "Events", value: "19" },
  { icon: Users, label: "Competitions", value: "6" },
];

export default function Hero() {
  const router = useRouter();

  return (
    <section className="relative pt-24 pb-36 bg-[#1e0050] text-white flex flex-col justify-center overflow-hidden">
      {/* ===== LAYERED BACKGROUND GRADIENTS ===== */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 100% 80% at 50% -10%, #4a009e 0%, #2d006b 40%, #1a003d 100%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 55%, rgba(203,179,134,0.09) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 40% 70% at -5% 50%, rgba(100,0,180,0.25) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 40% 70% at 105% 50%, rgba(100,0,180,0.18) 0%, transparent 60%)",
        }}
      />

      {/* ===== 6 DECORATIVE FLOATING ICONS — all 80px, well-dispersed ===== */}
      <div
        className="absolute left-[5%] top-[12%] w-20 h-20 pointer-events-none select-none animate-float"
        style={{ opacity: 0.05, transform: "rotate(-10deg)" }}
      >
        <PenTool className="w-full h-full text-[#cbb386]" strokeWidth={0.5} />
      </div>
      <div
        className="absolute right-[6%] top-[10%] w-20 h-20 pointer-events-none select-none animate-float"
        style={{ opacity: 0.05, transform: "rotate(5deg)", animationDelay: "1s" }}
      >
        <BookOpen className="w-full h-full text-[#cbb386]" strokeWidth={0.5} />
      </div>
      <div
        className="absolute left-[4%] top-[55%] w-20 h-20 pointer-events-none select-none animate-float"
        style={{ opacity: 0.05, transform: "rotate(8deg)", animationDelay: "2s" }}
      >
        <Scale className="w-full h-full text-white" strokeWidth={0.5} />
      </div>
      <div
        className="absolute right-[5%] top-[50%] w-20 h-20 pointer-events-none select-none animate-float"
        style={{ opacity: 0.05, transform: "rotate(25deg)", animationDelay: "3s" }}
      >
        <Wand2 className="w-full h-full text-white" strokeWidth={0.5} />
      </div>
      <div
        className="absolute left-[15%] bottom-[10%] w-20 h-20 pointer-events-none select-none animate-float"
        style={{ opacity: 0.05, transform: "rotate(-20deg)", animationDelay: "4s" }}
      >
        <Feather className="w-full h-full text-[#cbb386]" strokeWidth={0.5} />
      </div>
      <div
        className="absolute right-[16%] bottom-[10%] w-20 h-20 pointer-events-none select-none animate-float"
        style={{ opacity: 0.05, transform: "rotate(-5deg)", animationDelay: "5s" }}
      >
        <GraduationCap className="w-full h-full text-white" strokeWidth={0.5} />
      </div>

      {/* ===== HERO CONTENT ===== */}
      <Container className="relative z-10 py-24 md:py-0 flex flex-col items-center text-center">
        {/* Logos */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-4 mb-6"
        >
          <Image
            src="/sahithyotsav-logo.png"
            alt="Sahithyotsav 2K26"
            width={72}
            height={72}
            className="rounded-full drop-shadow-[0_4px_20px_rgba(209,166,81,0.3)]"
          />
          <Image
            src="/ldc-logo.png"
            alt="Literary & Debate Club, CVR"
            width={64}
            height={64}
            className="rounded-full drop-shadow-[0_4px_20px_rgba(255,255,255,0.15)]"
          />
        </motion.div>

        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-5"
        >
          <span
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold tracking-[0.18em] uppercase"
            style={{
              fontFamily: "var(--font-display)",
              background: "linear-gradient(90deg, #f1cd76 0%, #d0a651 100%)",
              color: "#2d006b",
              boxShadow: "0 2px 18px rgba(209,166,81,0.35)",
            }}
          >
            <Calendar size={11} />
            March 13 – 14, 2026
          </span>
        </motion.div>

        {/* Main heading */}
        <div className="mb-4">
          <ComicText
            fontSize={5}
            className="mt-2"
            style={{
              fontSize: "clamp(3.5rem, 10vw, 5rem)",
              backgroundColor: "#f1cd76",
              backgroundImage:
                "radial-gradient(circle at 1px 1px, #d0a651 1px, transparent 0)",
              WebkitTextStroke: `${5 * 0.35}px #1a0040`,
              filter:
                "drop-shadow(5px 5px 0px #1a0040) drop-shadow(3px 3px 0px #d0a651)",
              transform: "skewX(-8deg)",
            }}
          >
            SAHITHYOTSAV
          </ComicText>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-white/90 mb-2 leading-snug font-semibold"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)",
            letterSpacing: "0.04em",
          }}
        >
          A Celebration of Literature
        </motion.p>

        {/* Location */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45, duration: 0.6 }}
          className="flex items-center gap-2 text-white/45 text-sm mb-8"
        >
          <MapPin size={13} className="text-[#cbb386]" />
          <span>CVR College Of Engineering</span>
        </motion.div>

        {/* Quick stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-8 sm:gap-12 mb-8"
        >
          {heroStats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center mb-1.5">
                <stat.icon size={20} className="text-[#f1cd76]" />
              </div>
              <span
                className="text-xl font-black text-white"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                {stat.value}
              </span>
              <span className="text-[10px] text-white/50 uppercase tracking-wider font-semibold">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-wrap justify-center items-center gap-4"
        >
          <Link
            href="/register"
            className="btn-gold text-sm px-8 py-4"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Register Now
          </Link>
          <InteractiveHoverButton
            onClick={() => router.push("/schedule")}
            className="bg-transparent border-white/60 text-white hover:bg-white/10 px-8 py-3 text-sm font-bold tracking-widest uppercase [&_div.bg-primary]:bg-[#f1cd76] [&_div.text-primary-foreground]:text-[#2d006b]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            View Schedule
          </InteractiveHoverButton>
        </motion.div>

      </Container>

      {/* Wave separator */}
      <div className="wave-bottom-white">
        <svg
          viewBox="0 0 1440 80"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-[60px] md:h-[80px]"
        >
          <path
            d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z"
            fill="#f5f5f5"
          />
        </svg>
      </div>
    </section>
  );
}
