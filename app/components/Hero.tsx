"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Calendar, MapPin, BookOpen, Feather, PenTool, Scale, GraduationCap, Wand2, Trophy, Users } from "lucide-react";
import { motion } from "framer-motion";
import Container from "./Container";
import { ComicText } from "@/components/ui/comic-text";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

export default function Hero() {
  const router = useRouter();

  return (
    <section className="relative pt-24 pb-36 bg-[#2d006b] text-white flex flex-col justify-center overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(80,0,160,0.3) 0%, transparent 70%)",
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

        {/* Hero Character */}
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.4, duration: 0.6 }}
           className="w-full max-w-lg mx-auto mb-8"
        >
          <Image
            src="/hero-happy.svg"
            alt="Hero Element"
            width={400}
            height={300}
            className="w-full h-auto drop-shadow-[0_10px_30px_rgba(209,166,81,0.2)]"
            priority
          />
        </motion.div>

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


        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="flex flex-wrap justify-center items-center gap-4"
        >
          <HoverBorderGradient
            containerClassName="rounded-full"
            as="button"
            className="bg-[#2d006b] hover:bg-[#1a003d] text-[#f1cd76] text-sm px-8 py-3.5 font-bold tracking-[0.15em] uppercase transition-colors"
            onClick={() => router.push("/register")}
            style={{ fontFamily: "var(--font-display)" }}
          >
            Register Now
          </HoverBorderGradient>
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
