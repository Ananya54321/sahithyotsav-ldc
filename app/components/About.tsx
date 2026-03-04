"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BookOpen, Users, Sparkles } from "lucide-react";
import Container from "./Container";
import { DotPattern } from "@/components/ui/dot-pattern";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { ComicText } from "@/components/ui/comic-text";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 1800;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, hasAnimated]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const stats = [
  { icon: BookOpen, value: 10, suffix: "+", label: "Events", description: "Diverse literary competitions" },
  { icon: Users, value: 500, suffix: "+", label: "Participants", description: "From colleges across the region" },
  { icon: Sparkles, value: 2, suffix: "", label: "Days", description: "Of literary excellence" },
];

export default function About() {
  return (
    <section className="relative bg-[#f5f5f5] py-24 overflow-hidden">
      <DotPattern
        width={20}
        height={20}
        cr={1.4}
        className="text-[#2d006b]/25 [mask-image:radial-gradient(ellipse_90%_90%_at_50%_50%,black_50%,transparent_100%)]"
      />
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="eyebrow-label-purple">About the Fest</span>
          <ComicText
            fontSize={3}
            className="mb-6"
            style={{
              fontSize: "clamp(2rem, 5vw, 3rem)",
              backgroundColor: "#2d006b",
              backgroundImage:
                "radial-gradient(circle at 1px 1px, #4a009e 1px, transparent 0)",
              WebkitTextStroke: `${3 * 0.35}px #f1cd76`,
              filter:
                "drop-shadow(4px 4px 0px #1a0040) drop-shadow(2px 2px 0px #d0a651)",
              transform: "skewX(-8deg)",
            }}
          >
            WHERE WORDS COME ALIVE
          </ComicText>
          <p className="text-[#4a4a4a] text-lg leading-relaxed">
            Our literary fest is a celebration of the written and spoken word—a
            space where young minds gather to debate, discuss, recite, and
            create. Over two transformative days, participants engage with
            diverse literary forms, from parliamentary debates to the rhythm of
            poetry and the magic of storytelling.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index, duration: 0.6 }}
              >
                <CardSpotlight
                  className="p-8 text-center bg-white border-[#2d006b]/10 rounded-2xl"
                  color="rgba(45, 0, 107, 0.12)"
                  radius={300}
                >
                  <div className="relative z-20">
                    <div className="icon-circle-gold mx-auto mb-5">
                      <Icon className="w-7 h-7 text-[#2d006b]" />
                    </div>
                    <div
                      className="text-5xl font-black text-[#2d006b] mb-1"
                      style={{ fontFamily: "var(--font-montserrat)" }}
                    >
                      <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                    </div>
                    <p
                      className="text-sm font-black uppercase tracking-widest text-[#2d006b] mb-1"
                      style={{ fontFamily: "var(--font-montserrat)" }}
                    >
                      {stat.label}
                    </p>
                    <p className="text-[#6b5f8a] text-sm">{stat.description}</p>
                  </div>
                </CardSpotlight>
              </motion.div>
            );
          })}
        </div>
      </Container>

      <div className="wave-bottom-white absolute bottom-0 left-0 w-full">
        <svg
          viewBox="0 0 1440 60"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="w-full h-[50px] md:h-[60px]"
        >
          <path d="M0,30 C480,60 960,0 1440,30 L1440,60 L0,60 Z" fill="#2d006b" />
        </svg>
      </div>
    </section>
  );
}
