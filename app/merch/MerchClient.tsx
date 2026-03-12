"use client";

import { useState } from "react";
import Image from "next/image";
import { Check, X, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { BorderBeam } from "@/components/ui/border-beam";
import { ComicText } from "@/components/ui/comic-text";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import { motion, AnimatePresence } from "framer-motion";

const mugImages = [
  "/posters/merch.png",
  "/mug-showcase.jpeg",
  "/mug-face-1.jpeg",
  "/mug-face-2.jpeg",
];

export default function MerchClient() {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  return (
    <div className="min-h-screen bg-[#1a0040] py-20 selection:bg-[#f1cd76] selection:text-[#1a0040] relative overflow-hidden">
      {/* Explosive Canvas Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0">
        <CanvasRevealEffect
          animationSpeed={3}
          containerClassName="bg-transparent opacity-30"
          colors={[
            [241, 205, 118], 
            [208, 166, 81], 
          ]}
          dotSize={2}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mt-12 md:mt-16 mb-20 md:mb-28 animate-in slide-in-from-bottom-8 duration-700">
          <span className="eyebrow-label text-gold drop-shadow-md !mb-1">Sahithyotsav Store</span>
          <div className="flex justify-center mt-0">
            <ComicText
              fontSize={4.5}
              className="z-10"
              style={{
                fontSize: "clamp(2.5rem, 8vw, 4.5rem)",
                backgroundColor: "#f1cd76",
                backgroundImage:
                  "radial-gradient(circle at 2px 2px, #d0a651 1px, transparent 0)",
                WebkitTextStroke: `${4.5 * 0.35}px #1a0040`,
                filter:
                  "drop-shadow(6px 6px 0px #1a0040) drop-shadow(4px 4px 0px #d0a651)",
                transform: "skewX(-8deg)",
              }}
            >
              OFFICIAL MERCH
            </ComicText>
          </div>
        </div>

        {/* Product Showcase Container */}
        <div className="relative mt-8 md:mt-24">
          {/* SVG character standing on the card */}
          <div className="absolute right-4 md:right-24 bottom-full w-32 h-32 md:w-56 md:h-56 z-20 pointer-events-none origin-bottom translate-y-px">
            <Image
               src="/merch.svg"
               alt="Merch element"
               fill
               className="object-contain object-bottom"
               priority
            />
          </div>

          <div className="royal-card p-6 md:p-12 relative overflow-hidden group border-0 ring-1 ring-[#cbb386]/30 bg-white">
          <BorderBeam size={300} duration={8} delay={0} colorFrom="#f1cd76" colorTo="#2d006b" />
          
          {/* Subtle background glow effect */}
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#f1cd76] rounded-full blur-[100px] opacity-20 pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-[#2d006b] rounded-full blur-[100px] opacity-10 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 relative z-10 w-full">
            
            {/* Image Gallery Column */}
            <div className="relative flex flex-col items-center justify-center gap-4 h-full">
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden shadow-2xl border border-[#cbb386]/20 bg-white">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeImageIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <Image
                      src={mugImages[activeImageIndex]}
                      alt={`Sahithyotsav 2k26 Custom Mug ${activeImageIndex + 1}`}
                      fill
                      className="object-cover"
                      priority
                    />
                  </motion.div>
                </AnimatePresence>

              </div>

              {/* Carousel Dots */}
              <div className="flex items-center gap-3 mt-2">
                {mugImages.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 cursor-pointer ${
                      activeImageIndex === idx ? "bg-[#2d006b] scale-125" : "bg-[#2d006b]/20 hover:bg-[#2d006b]/40"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Product Details Column */}
            <div className="flex flex-col w-full min-w-0 relative justify-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col w-full"
              >
                <h2 className="text-4xl md:text-5xl font-black text-[#1a0040] heading-display tracking-tight leading-tight">
                  Exclusive Customized <br className="hidden sm:block" />
                  <span className="text-[#2d006b]">Merchandise</span>
                </h2>

                <p className="mt-6 text-gray-600 text-lg leading-relaxed">
                  Custom Sahithyotsav Mugs with your Name! Keep it entirely your own and cherish the memories of the literature festival.
                </p>

                <div className="mt-8 space-y-4">
                  <div className="flex items-center gap-3 text-gray-700 font-medium">
                    <div className="w-8 h-8 rounded-full bg-[#f1cd76]/20 flex items-center justify-center text-[#d0a651]">
                      <Check className="w-5 h-5" />
                    </div>
                    Custom Name Engraving
                  </div>
                  <div className="flex items-center gap-3 text-gray-700 font-medium">
                    <div className="w-8 h-8 rounded-full bg-[#f1cd76]/20 flex items-center justify-center text-[#d0a651]">
                      <Check className="w-5 h-5" />
                    </div>
                    High-Grade Ceramic
                  </div>
                  <div className="flex items-center gap-3 text-gray-700 font-medium">
                    <div className="w-8 h-8 rounded-full bg-[#f1cd76]/20 flex items-center justify-center text-[#d0a651]">
                      <Check className="w-5 h-5" />
                    </div>
                    Sahithyotsav Branding
                  </div>
                </div>

                <div className="mt-10 p-6 md:p-8 rounded-2xl bg-slate-50 border-2 border-dashed border-slate-200 text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-slate-200/10 rounded-full blur-2xl pointer-events-none" />
                  <div className="absolute bottom-0 left-0 w-32 h-32 bg-slate-200/10 rounded-full blur-2xl pointer-events-none" />
                  
                  <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-2 relative z-10" style={{ fontFamily: "var(--font-montserrat)" }}>
                    Orders are closed!
                  </h3>
                  
                  <Link href="/" className="inline-flex items-center justify-center gap-3 bg-slate-800 hover:bg-slate-900 text-white px-8 py-3 rounded-full font-bold tracking-widest relative z-10 transition-colors" style={{ fontFamily: "var(--font-montserrat)" }}>
                    <ArrowLeft className="w-4 h-4" />
                    BACK TO HOME
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
