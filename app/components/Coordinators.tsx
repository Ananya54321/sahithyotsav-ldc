"use client";

import { motion } from "framer-motion";
import { GraduationCap, User } from "lucide-react";
import Container from "./Container";
import { DotPattern } from "@/components/ui/dot-pattern";
import { ComicText } from "@/components/ui/comic-text";

interface Coordinator {
  name: string;
  role: string;
  department?: string;
}

const facultyCoordinators: Coordinator[] = [
  { name: "Dr. Faculty Name 1", role: "Faculty Coordinator", department: "Department of English" },
  { name: "Dr. Faculty Name 2", role: "Faculty Coordinator", department: "Department of Humanities" },
  { name: "Dr. Faculty Name 3", role: "Faculty Coordinator", department: "Department of Languages" },
];

const studentCoordinators: Coordinator[] = [
  { name: "Student Name 1", role: "Student Coordinator", department: "CSE, 3rd Year" },
  { name: "Student Name 2", role: "Student Coordinator", department: "ECE, 3rd Year" },
  { name: "Student Name 3", role: "Student Coordinator", department: "IT, 2nd Year" },
];

function CoordinatorCard({
  coordinator,
  index,
  isFaculty,
}: {
  coordinator: Coordinator;
  index: number;
  isFaculty: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="royal-card p-6 text-center"
    >
      <div
        className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
        style={{
          background: isFaculty
            ? "linear-gradient(135deg, #f1cd76, #d0a651)"
            : "linear-gradient(135deg, #2d006b, #5a00c8)",
        }}
      >
        {isFaculty ? (
          <GraduationCap className="w-7 h-7 text-[#2d006b]" />
        ) : (
          <User className="w-7 h-7 text-white" />
        )}
      </div>
      <h3
        className="text-base font-black text-[#1a0040] mb-1"
        style={{ fontFamily: "var(--font-montserrat)" }}
      >
        {coordinator.name}
      </h3>
      <p
        className="text-xs font-bold uppercase tracking-wider text-[#2d006b] mb-1"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {coordinator.role}
      </p>
      {coordinator.department && (
        <p className="text-xs text-[#6b5f8a]">{coordinator.department}</p>
      )}
    </motion.div>
  );
}

export default function Coordinators() {
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
          <span className="eyebrow-label-purple">The Team</span>
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
            COORDINATORS
          </ComicText>
          <p className="text-[#4a4a4a] max-w-2xl mx-auto mt-4 text-base">
            Meet the dedicated team behind Sahithyotsav 2026.
          </p>
        </motion.div>

        {/* Faculty Coordinators */}
        <div className="mb-12">
          <h3
            className="text-center text-xs font-black uppercase tracking-[0.15em] text-[#2d006b] mb-6"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            Faculty Coordinators
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl mx-auto">
            {facultyCoordinators.map((c, i) => (
              <CoordinatorCard
                key={c.name}
                coordinator={c}
                index={i}
                isFaculty
              />
            ))}
          </div>
        </div>

        {/* Student Coordinators */}
        <div>
          <h3
            className="text-center text-xs font-black uppercase tracking-[0.15em] text-[#2d006b] mb-6"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            Student Coordinators
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl mx-auto">
            {studentCoordinators.map((c, i) => (
              <CoordinatorCard
                key={c.name}
                coordinator={c}
                index={i}
                isFaculty={false}
              />
            ))}
          </div>
        </div>
      </Container>

      {/* Wave to footer (purple) */}
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
