"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Scale, PenTool, Mic2, HelpCircle, GraduationCap, Wand2, BookOpen, Brain
} from "lucide-react";
import Container from "./Container";
import { DotPattern } from "@/components/ui/dot-pattern";
import { ComicText } from "@/components/ui/comic-text";

const highlights = [
  {
    title: "Youth Parliament",
    description: "Experience the thrill of parliamentary debate. Argue, persuade, and lead in this simulation of democratic discourse.",
    icon: Scale,
    gradient: "linear-gradient(135deg, #4a009e 0%, #7c3aed 100%)",
    image: "/events/youth_parliament.png"
  },
  {
    title: "Writers' Hunt: The Literary Quest Competition",
    description: "A treasure hunt for the literary mind. Solve clues, decode references, and race against time.",
    icon: PenTool,
    gradient: "linear-gradient(135deg, #1a0040 0%, #5a00c8 100%)",
    image: "/events/writers_hunt.png"
  },
  {
    title: "Kaavya Manch – Open Mic Poetry",
    description: "A stage for poets to share their verses. Express emotions through the beauty of Hindi and English poetry.",
    icon: Mic2,
    gradient: "linear-gradient(135deg, #2d006b 0%, #8b5cf6 100%)",
    image: "/events/open_mic.png"
  },
  {
    title: "Workshop – Engaging Public Speaking",
    description: "Learn the art of articulation and captivate audiences in this hands-on public speaking workshop.",
    icon: HelpCircle,
    gradient: "linear-gradient(135deg, #3d1080 0%, #a78bfa 100%)",
    image: "/events/public_speaking.png"
  },
  {
    title: "Workshop – Emotional Intelligence in the Time of Artificial Intelligence",
    description: "Gain insights into managing emotions and maintaining human connection in an increasingly AI-driven world.",
    icon: Brain,
    gradient: "linear-gradient(135deg, #3d1080 0%, #a78bfa 100%)",
    image: "/events/emotional_intelligence.png"
  },
  {
    title: "Alumni Talk",
    description: "Gain insights from distinguished alumni who have made their mark in the literary and professional world.",
    icon: GraduationCap,
    gradient: "linear-gradient(135deg, #1a003d 0%, #6d28d9 100%)",
    image: "/events/alumni_talk.png"
  },
  {
    title: "Declamation on Harry Potter Series Competition",
    description: "Step into the wizarding world. Deliver iconic speeches from the beloved series with passion and flair.",
    icon: Wand2,
    gradient: "linear-gradient(135deg, #2d006b 0%, #c084fc 100%)",
    image: "/events/harry_potter.png"
  },
];

export default function Highlights() {
  const router = useRouter();

  const [activeIndex, setActiveIndex] = useState(0);
  const isPaused = useRef(false);
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isPaused.current) {
        setActiveIndex((prev) => (prev + 1) % highlights.length);
      }
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleHoverStart = useCallback((index: number) => {
    isPaused.current = true;
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    hoverTimeout.current = setTimeout(() => {
      setActiveIndex(index);
    }, 400);
  }, []);

  const handleHoverEnd = useCallback(() => {
    if (hoverTimeout.current) {
      clearTimeout(hoverTimeout.current);
      hoverTimeout.current = null;
    }
  }, []);

  const handleContainerLeave = useCallback(() => {
    handleHoverEnd();
    isPaused.current = false;
  }, [handleHoverEnd]);

  const handleCardClick = useCallback(
    (title: string) => {
      if (title === "Workshop – Emotional Intelligence in the Time of Artificial Intelligence") {
        window.open("https://forms.gle/9AwY3noqBBqpYeDr8", "_blank");
        return;
      }
      router.push(`/register?event=${encodeURIComponent(title)}`);
    },
    [router]
  );

  return (
    <section className="relative bg-[#f5f5f5] py-24 overflow-hidden">
      <DotPattern
        width={20}
        height={20}
        cr={1.4}
        className="text-[#2d006b]/25 [mask-image:radial-gradient(ellipse_90%_90%_at_50%_50%,black_50%,transparent_100%)]"
      />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="eyebrow-label-purple">Featured Events</span>
          <ComicText
            fontSize={3}
            className="mt-1"
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
            EVENT LIST
          </ComicText>
          <p className="text-[#4a4a4a] max-w-2xl mx-auto mt-4 text-base">
            Discover the diverse range of events that make our literary fest a
            unique celebration of words and ideas.
          </p>
        </motion.div>

        {/* Desktop Carousel */}
        <div
          className="hidden lg:flex flex-row items-stretch w-full max-w-5xl mx-auto h-[55vh] min-h-[500px] gap-3 mb-12"
          onMouseLeave={handleContainerLeave}
        >
          {highlights.map((item, index) => {
            const Icon = item.icon;
            const isActive = index === activeIndex;

            return (
              <div
                key={item.title}
                className="relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
                style={{
                  background: isActive ? item.gradient : "#3b0764",
                  flex: isActive ? 5 : 1,
                  minHeight: isActive ? "280px" : "60px",
                }}
                onClick={() => handleCardClick(item.title)}
                onMouseEnter={() => handleHoverStart(index)}
                onMouseLeave={handleHoverEnd}
              >
                {/* Background image - visible when active */}
                <div
                  className="absolute inset-0 transition-opacity duration-700 pointer-events-none"
                  style={{ opacity: isActive ? 1 : 0 }}
                >
                  {item.image && (
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                  )}
                </div>

                {/* Gradient overlay - strong at bottom for text readability */}
                <div
                  className="absolute inset-0 transition-all duration-700 z-10"
                  style={{
                    background: isActive
                      ? "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.55) 40%, rgba(0,0,0,0.1) 100%)"
                      : item.gradient,
                  }}
                />

                {/* Icon - only shown when NOT active */}
                <div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
                  style={{ opacity: isActive ? 0 : 0.25 }}
                >
                  <Icon
                    className="text-white transition-all duration-500"
                    style={{ width: 48, height: 48 }}
                    strokeWidth={0.5}
                  />
                </div>

                <div className="relative z-20 h-full flex flex-col justify-end p-5 lg:p-6">
                  {/* Icon badge - only shown when active */}
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="w-10 h-10 rounded-full flex items-center justify-center mb-3"
                      style={{
                        background: "linear-gradient(135deg, #f1cd76, #d0a651)",
                        boxShadow: "0 4px 14px rgba(209,166,81,0.4)",
                      }}
                    >
                      <Icon className="w-4 h-4 text-[#2d006b]" />
                    </motion.div>
                  )}

                  <motion.div
                    animate={{ rotate: isActive ? 0 : -90 }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    className="font-black uppercase tracking-wider origin-bottom-left"
                    style={{
                      fontFamily: "'Bangers', 'Comic Sans MS', sans-serif",
                      fontSize: isActive ? "1.1rem" : "0.75rem",
                      letterSpacing: "0.08em",
                      color: "white",
                      whiteSpace: isActive ? "normal" : "nowrap",
                      maxWidth: isActive ? "100%" : undefined,
                      lineHeight: 1.3,
                    }}
                  >
                    {item.title}
                  </motion.div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile Expanded Cards */}
        <div className="flex lg:hidden flex-col w-full gap-4 mb-4">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={`mobile-${item.title}`}
                className="relative rounded-2xl overflow-hidden cursor-pointer flex flex-col justify-end p-6 min-h-[220px]"
                style={{ background: item.gradient }}
                onClick={() => handleCardClick(item.title)}
              >
                {/* Background image */}
                <div className="absolute inset-0 pointer-events-none">
                  {item.image && (
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                  )}
                </div>

                {/* Strong bottom scrim for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/5 z-10" />
                <div className="relative z-20">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center mb-4"
                    style={{
                      background: "linear-gradient(135deg, #f1cd76, #d0a651)",
                      boxShadow: "0 4px 14px rgba(209,166,81,0.4)",
                    }}
                  >
                    <Icon className="w-5 h-5 text-[#2d006b]" />
                  </div>
                  <div
                    className="font-black uppercase tracking-wider text-white"
                    style={{
                      fontFamily: "'Bangers', 'Comic Sans MS', sans-serif",
                      fontSize: "1.25rem",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {item.title}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </Container>

      {/* Wave to purple LiveFeed */}
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
