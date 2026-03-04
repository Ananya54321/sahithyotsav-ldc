import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Check, Star, ShieldCheck } from "lucide-react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { BorderBeam } from "@/components/ui/border-beam";
import { ComicText } from "@/components/ui/comic-text";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";

export const metadata = {
  title: "Merchandise | Sahithyotsav 2026",
  description: "Get your official Sahithyotsav 2026 merchandise. Limited edition mugs available now.",
};

export default function MerchPage() {
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

          <div className="royal-card p-6 md:p-12 relative overflow-hidden group border-0 ring-1 ring-[#cbb386]/30">
          <BorderBeam size={300} duration={8} delay={0} colorFrom="#f1cd76" colorTo="#2d006b" />
          
          {/* Subtle background glow effect */}
          <div className="absolute -top-32 -right-32 w-64 h-64 bg-[#f1cd76] rounded-full blur-[100px] opacity-20 pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-[#2d006b] rounded-full blur-[100px] opacity-10 pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
            
            {/* Image Gallery Column */}
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-[#1a0040] to-black shadow-2xl p-4 md:p-8 flex items-center justify-center">
              {/* Gold border decorative elements */}
              <div className="absolute inset-4 border border-[#cbb386]/30 rounded-xl pointer-events-none" />
              <div className="absolute inset-8 border border-[#cbb386]/10 rounded-lg pointer-events-none" />
              
              <div className="relative w-full h-full ">
                <Image
                  src="/mug.png"
                  alt="Sahithyotsav 2026 Edition Ceramic Mug"
                  fill
                  className="object-cover md:object-contain rounded-lg drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-transform duration-700 hover:scale-105"
                  priority
                />
              </div>

              {/* Badges */}
              <div className="absolute top-8 left-8 flex flex-col gap-2">
                <span className="badge-gold shadow-lg">New Arrival</span>
                <span className="badge-purple shadow-lg">Limited Stock</span>
              </div>
            </div>

            {/* Product Details Column */}
            <div className="flex flex-col">

              <h2 className="text-4xl md:text-5xl font-black text-[#1a0040] heading-display tracking-tight leading-tight">
                Sahithyotsav '26 <br />
                <span className="text-[#2d006b]">Ceramic Mug</span>
              </h2>

              <div className="mt-4 flex items-end gap-3">
                <span className="text-4xl font-bold text-[#1a0040]">₹299</span>
                <span className="text-xl text-gray-400 line-through font-medium mb-1">₹499</span>
              </div>

              <p className="mt-6 text-gray-600 text-lg leading-relaxed">
                Start your day with a touch of elegance. Our premium black ceramic coffee mug features exclusive gold geometric accents and a subtle literary feather—inspired by the spirit of Sahithyotsav.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 text-gray-700 font-medium">
                  <div className="w-8 h-8 rounded-full bg-[#f1cd76]/20 flex items-center justify-center text-[#d0a651]">
                    <Check className="w-5 h-5" />
                  </div>
                  Premium Matte Black Finish
                </div>
                <div className="flex items-center gap-3 text-gray-700 font-medium">
                  <div className="w-8 h-8 rounded-full bg-[#2d006b]/10 flex items-center justify-center text-[#2d006b]">
                    <Check className="w-5 h-5" />
                  </div>
                  Durable High-Grade Ceramic
                </div>
                <div className="flex items-center gap-3 text-gray-700 font-medium">
                  <div className="w-8 h-8 rounded-full bg-[#f1cd76]/20 flex items-center justify-center text-[#d0a651]">
                    <Check className="w-5 h-5" />
                  </div>
                  Microwave & Dishwasher Safe
                </div>
              </div>

              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <HoverBorderGradient
                  containerClassName="rounded-full w-full sm:w-auto flex-1"
                  as="button"
                  className="bg-[#f1cd76] w-full flex items-center justify-center gap-2 hover:bg-[#d0a651] text-[#1a0040] text-lg px-8 py-4 font-bold tracking-widest uppercase transition-colors"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  <ShoppingCart className="w-5 h-5" />
                  Order Now
                </HoverBorderGradient>
              </div>

            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
