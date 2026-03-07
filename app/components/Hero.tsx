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
    <section className="relative pt-24 pb-16 bg-[#2d006b] text-white flex flex-col justify-center overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(80,0,160,0.3) 0%, transparent 70%)",
        }}
      />

      {/* ===== 6 DECORATIVE FLOATING ICONS - well-dispersed ===== */}
      <div
        className="absolute left-[5%] top-[12%] w-10 h-10 md:w-20 md:h-20 pointer-events-none select-none "
        style={{ opacity: 0.05, transform: "rotate(-10deg)" }}
      >
        <PenTool className="w-full h-full text-[#cbb386]" strokeWidth={0.5} />
      </div>
      <div
        className="absolute right-[6%] top-[10%] w-12 h-12 md:w-20 md:h-20 pointer-events-none select-none "
        style={{ opacity: 0.05, transform: "rotate(5deg)", animationDelay: "1s" }}
      >
        <BookOpen className="w-full h-full text-[#cbb386]" strokeWidth={0.5} />
      </div>
      <div
        className="absolute left-[4%] top-[55%] w-10 h-10 md:w-20 md:h-20 pointer-events-none select-none "
        style={{ opacity: 0.05, transform: "rotate(8deg)", animationDelay: "2s" }}
      >
        <Scale className="w-full h-full text-white" strokeWidth={0.5} />
      </div>
      <div
        className="absolute right-[5%] top-[50%] w-12 h-12 md:w-20 md:h-20 pointer-events-none select-none "
        style={{ opacity: 0.05, transform: "rotate(25deg)", animationDelay: "3s" }}
      >
        <Wand2 className="w-full h-full text-white" strokeWidth={0.5} />
      </div>
      <div
        className="absolute left-[15%] bottom-[10%] w-10 h-10 md:w-20 md:h-20 pointer-events-none select-none "
        style={{ opacity: 0.05, transform: "rotate(-20deg)", animationDelay: "4s" }}
      >
        <Feather className="w-full h-full text-[#cbb386]" strokeWidth={0.5} />
      </div>
      <div
        className="absolute right-[16%] bottom-[10%] w-12 h-12 md:w-20 md:h-20 pointer-events-none select-none "
        style={{ opacity: 0.05, transform: "rotate(-5deg)", animationDelay: "5s" }}
      >
        <GraduationCap className="w-full h-full text-white" strokeWidth={0.5} />
      </div>

      {/* ===== HERO CONTENT ===== */}
      <Container className="relative z-10 pt-24 pb-12 lg:py-16 w-full">
        <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-8 md:24 lg:gap-48">
          {/* Left Content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:max-w-[55%]">

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
                March 13 & 14, 2026
              </span>
            </motion.div>

            {/* Main heading */}
            <div className="mb-4 w-full">
              <ComicText
                fontSize={5}
                className="mt-2 inline-block"
                style={{
                  fontSize: "clamp(1.5rem, 8vw, 5rem)",
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
                fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
                letterSpacing: "0.04em",
              }}
            >
              A Celebration of Literature and Public Speaking
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

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start items-center gap-4 w-full"
            >
              <HoverBorderGradient
                containerClassName="rounded-full w-full sm:w-auto"
                as="button"
                className="w-full sm:w-auto bg-[#f1cd76] hover:bg-[#d0a651] text-[#1a0040] text-xs sm:text-sm px-6 sm:px-8 py-3.5 font-bold tracking-[0.15em] uppercase transition-colors"
                onClick={() => router.push("/register")}
                style={{ fontFamily: "var(--font-display)" }}
              >
                Register Now
              </HoverBorderGradient>
              <div className="w-full sm:w-auto">
                <InteractiveHoverButton
                  onClick={() => router.push("/schedule")}
                  className="w-full bg-transparent border-white/60 text-white hover:bg-white/10 px-6 sm:px-8 py-3 text-xs sm:text-sm font-bold tracking-widest uppercase [&_div.bg-primary]:bg-[#f1cd76] [&_div.text-primary-foreground]:text-[#2d006b]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  View Schedule
                </InteractiveHoverButton>
              </div>
            </motion.div>
          </div>

          {/* Right Content - Hero Character */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="w-full max-w-sm lg:max-w-lg mx-auto lg:mr-0 flex justify-center lg:justify-end"
          >
            <Image
              src="/hero-happy.svg"
              alt="Hero Element"
              width={500}
              height={400}
              className="w-full h-64 lg:h-auto lg:max-h-[500px] object-contain drop-shadow-[0_10px_30px_rgba(209,166,81,0.2)]"
              priority
            />
          </motion.div>
        </div>
      </Container>


    </section>
  );
}
