"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "./Container";
import { DotPattern } from "@/components/ui/dot-pattern";
import { ComicText } from "@/components/ui/comic-text";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

export default function MerchShowcase() {
  const mugImages = ["/posters/merch.png", "/mug-showcase.jpeg", "/mug-face-1.jpeg", "/mug-face-2.jpeg"];
  const [currentMug, setCurrentMug] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setCurrentMug(c => (c + 1) % mugImages.length), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative bg-surface py-24 overflow-hidden">
      <DotPattern
        width={20}
        height={20}
        cr={1.4}
        className="text-[#2d006b]/25 mask-[radial-gradient(ellipse_90%_90%_at_50%_50%,black_50%,transparent_100%)]"
      />

      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="eyebrow-label-purple">Offerings</span>
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
            MERCH & BOOKSTALL
          </ComicText>
          <p className="text-[#4a4a4a] max-w-2xl mx-auto mt-4 text-base">
            Take a piece of Sahithyotsav home with you and explore our curated collection of books.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Merch Mug */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="royal-card p-8 flex flex-col items-center text-center group ring-1 ring-[#cbb386]/30 overflow-hidden relative"
          >
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#f1cd76] rounded-full blur-[100px] opacity-20 pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-[#2d006b] rounded-full blur-[100px] opacity-10 pointer-events-none" />

            <div className="relative w-full aspect-square max-w-[280px] mb-8 bg-primary-dark rounded-2xl shadow-xl flex items-center justify-center overflow-hidden">
              <div className="absolute top-4 left-4 z-20">
                <span className="badge-gold shadow-lg text-[10px] sm:text-xs">Limited Edition</span>
              </div>
              <div className="relative w-full h-full">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentMug}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={mugImages[currentMug]}
                      alt="Sahithyotsav 2k26 Ceramic Mug"
                      fill
                      className="object-cover transition-transform duration-3000 group-hover:scale-110"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
            
            <h3 className="text-2xl font-black text-primary-dark mb-3" style={{ fontFamily: "var(--font-montserrat)" }}>
              Exclusive Customized Merchandise
            </h3>
            <p className="text-[#4a4a4a] mb-6">
              Custom Sahithyotsav Mugs with your Name. Grab yours today for just ₹200.
            </p>
            <div className="mt-auto w-full">
              <Link href="/merch" className="w-full block">
                <HoverBorderGradient
                  containerClassName="rounded-full w-full"
                  as="div"
                  className="bg-[#2d006b] w-full flex items-center justify-center gap-2 hover:bg-primary-dark text-white text-sm px-6 py-3 font-bold tracking-widest uppercase transition-colors"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Buy Now
                </HoverBorderGradient>
              </Link>
            </div>
          </motion.div>

          {/* Bookstall */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="royal-card p-8 flex flex-col items-center text-center group ring-1 ring-[#cbb386]/30 overflow-hidden relative"
          >
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#2d006b] rounded-full blur-[100px] opacity-10 pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-[#f1cd76] rounded-full blur-[100px] opacity-20 pointer-events-none" />

            <div className="relative w-full aspect-square max-w-[280px] mb-8 bg-surface rounded-2xl shadow-xl flex items-center justify-center overflow-hidden">
               <Image 
                 src="/bookstall.jpg" 
                 alt="Exclusive Bookstall" 
                 fill 
                 className="object-cover transition-transform duration-700 group-hover:scale-110" 
               />
            </div>
            
            <h3 className="text-2xl font-black text-primary-dark mb-3" style={{ fontFamily: "var(--font-montserrat)" }}>
              Exclusive Bookstall
            </h3>
            <p className="text-[#4a4a4a] mb-6">
              Dive into a curated collection of literature, featuring works from renowned authors and fresh voices gathered just for Sahithyotsav.
            </p>
            <div className="mt-auto w-full">
              <div className="rounded-full w-full bg-[#f1cd76] px-6 py-3 text-primary-dark font-bold tracking-widest uppercase text-sm cursor-default border border-[#d0a651] shadow-inner text-center">
                Explore at the Fest
              </div>
            </div>
          </motion.div>
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
