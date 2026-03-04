"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Calendar, MapPin, Mic2, Scale, PenTool, Wand2, HelpCircle, GraduationCap } from "lucide-react";
import Container from "./Container";
import { AnimatedList } from "@/components/ui/animated-list";
import { ComicText } from "@/components/ui/comic-text";
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";
import { cn } from "@/lib/utils";

const feedItems = [
  {
    icon: Scale,
    title: "Youth Parliament",
    detail: "Day 1 · Seminar Hall A",
    time: "11:00 AM",
    color: "#f1cd76",
  },
  {
    icon: Mic2,
    title: "Kaavya Manch",
    detail: "Day 1 · Open Air Theatre",
    time: "2:00 PM",
    color: "#d0a651",
  },
  {
    icon: PenTool,
    title: "Writers' Hunt",
    detail: "Day 1 · Campus Grounds",
    time: "11:00 AM",
    color: "#f1cd76",
  },
  {
    icon: HelpCircle,
    title: "Quiz Competition",
    detail: "Day 1 · Seminar Hall B",
    time: "2:00 PM",
    color: "#d0a651",
  },
  {
    icon: Wand2,
    title: "Harry Potter Declamation",
    detail: "Day 2 · Seminar Hall A",
    time: "9:30 AM",
    color: "#f1cd76",
  },
  {
    icon: GraduationCap,
    title: "Alumni Talk",
    detail: "Day 1 · College Auditorium",
    time: "5:30 PM",
    color: "#d0a651",
  },
  {
    icon: Calendar,
    title: "Valedictory Ceremony",
    detail: "Day 2 · College Auditorium",
    time: "5:30 PM",
    color: "#f1cd76",
  },
];

function FeedItem({ icon: Icon, title, detail, time, color }: typeof feedItems[number]) {
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-white/[0.07] backdrop-blur-sm border border-white/10 px-5 py-4 w-full max-w-md transition-all hover:bg-white/[0.12]">
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
        style={{ background: `linear-gradient(135deg, ${color}, ${color}88)` }}
      >
        <Icon className="w-5 h-5 text-[#2d006b]" />
      </div>
      <div className="flex-1 min-w-0">
        <p
          className="text-white text-sm font-bold truncate"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {title}
        </p>
        <p className="text-white/50 text-xs flex items-center gap-1.5">
          <MapPin size={10} className="shrink-0" />
          {detail}
        </p>
      </div>
      <span
        className="text-xs font-bold px-3 py-1 rounded-full shrink-0"
        style={{
          fontFamily: "var(--font-display)",
          background: `${color}20`,
          color: color,
        }}
      >
        {time}
      </span>
    </div>
  );
}

export default function LiveFeed() {
  const router = useRouter();

  return (
    <section className="relative bg-[#2d006b] text-white py-20 overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(80,0,160,0.3) 0%, transparent 70%)",
        }}
      />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <span className="eyebrow-label">Live at the Fest</span>
            <ComicText
              fontSize={3}
              className="mt-1 mb-5"
              style={{
                fontSize: "clamp(1.8rem, 4vw, 3rem)",
                backgroundColor: "#f1cd76",
                backgroundImage:
                  "radial-gradient(circle at 1px 1px, #d0a651 1px, transparent 0)",
                WebkitTextStroke: `${3 * 0.35}px #1a0040`,
                filter:
                  "drop-shadow(4px 4px 0px #1a0040) drop-shadow(2px 2px 0px #d0a651)",
                transform: "skewX(-8deg)",
                textAlign: "left",
              }}
            >
              WHAT&apos;S HAPPENING
            </ComicText>
            <p className="text-white/55 text-base leading-relaxed max-w-md mb-6">
              From heated parliamentary debates to poetic recitals under open
              skies — here&apos;s a glimpse at the events unfolding across two
              exhilarating days.
            </p>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#f1cd76] animate-pulse" />
              <span className="text-white/40 text-xs tracking-widest uppercase font-bold" style={{ fontFamily: "var(--font-display)" }}>
                7 events across 2 days
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative h-[340px] overflow-hidden"
          >
            <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-[#2d006b] to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#2d006b] to-transparent z-10 pointer-events-none" />
            <AnimatedList delay={2000} className="pt-4">
              {feedItems.map((item) => (
                <FeedItem key={item.title} {...item} />
              ))}
            </AnimatedList>
          </motion.div>
        </div>

        {/* View Schedule CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <InteractiveHoverButton
            onClick={() => router.push("/schedule")}
            className="bg-transparent border-white/60 text-white hover:bg-white/10 px-8 py-3 text-sm font-bold tracking-widest uppercase [&_div.bg-primary]:bg-[#f1cd76] [&_div.text-primary-foreground]:text-[#2d006b]"
            style={{ fontFamily: "var(--font-display)" }}
          >
            View Schedule
          </InteractiveHoverButton>
        </motion.div>
      </Container>
    </section>
  );
}
