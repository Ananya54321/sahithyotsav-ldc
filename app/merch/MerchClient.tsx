"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Check, Loader2, IndianRupee, AlertCircle } from "lucide-react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { BorderBeam } from "@/components/ui/border-beam";
import { ComicText } from "@/components/ui/comic-text";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import { motion, AnimatePresence } from "framer-motion";

const inputClass =
  "w-full px-3 py-2.5 rounded-lg bg-white border border-[#2d006b]/15 text-[#1a0040] placeholder-[#9b9b9b] text-sm focus:border-[#2d006b] transition-colors";
const labelClass =
  "block text-[10px] font-black uppercase tracking-widest text-[#2d006b] mb-1";

const mugImages = [
  "/mug-showcase.jpeg",
  "/mug-face-1.jpeg",
  "/mug-face-2.jpeg",
];

export default function MerchClient() {
  const [showForm, setShowForm] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    college: "",
    rollNumber: "",
    yearOfStudy: "",
    branch: "",
    customName: "",
    utrNumber: "",
  });
  const [errors, setErrors] = useState<any>({});

  const validateForm = () => {
    const e: any = {};
    if (!formData.fullName.trim()) e.fullName = "Required";
    if (!formData.email.trim()) e.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = "Invalid email";
    if (!formData.phone.trim()) e.phone = "Required";
    if (!formData.college.trim()) e.college = "Required";
    if (!formData.rollNumber.trim()) e.rollNumber = "Required";
    if (!formData.yearOfStudy) e.yearOfStudy = "Required";
    if (!formData.branch.trim()) e.branch = "Required";
    if (!formData.customName.trim()) e.customName = "Required";
    if (!formData.utrNumber.trim()) e.utrNumber = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev: any) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    setErrors({});
    
    try {
      const res = await fetch("/api/merch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrors({ general: data.error ?? "Something went wrong." });
        setIsSubmitting(false);
        return;
      }
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        college: "",
        rollNumber: "",
        yearOfStudy: "",
        branch: "",
        customName: "",
        utrNumber: "",
      });
    } catch {
      setErrors({ general: "Network error. Please check your connection." });
      setIsSubmitting(false);
    }
  };

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

                {/* Badges */}
                <div className="absolute top-6 left-6 flex flex-col gap-2 z-10 pointer-events-none">
                  <span className="badge-gold shadow-lg">New Arrival</span>
                  <span className="badge-purple shadow-lg">Limited Stock</span>
                </div>
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

            {/* Product Details Column OR Form Column */}
            <div className="flex flex-col w-full min-w-0">
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col items-center justify-center h-full text-center py-10"
                  >
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
                      <Check className="w-8 h-8 text-green-600" />
                    </div>
                    <h2 className="text-3xl font-black text-[#1a0040] mb-4" style={{ fontFamily: "var(--font-montserrat)" }}>
                      Order Placed!
                    </h2>
                    <p className="text-[#6b5f8a] mb-8 max-w-sm">
                      Thank you for ordering your customized merchandise. We will process it shortly!
                    </p>
                    <button
                      onClick={() => {
                        setIsSuccess(false);
                        setShowForm(false);
                      }}
                      className="px-6 py-3 bg-[#2d006b] text-white rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#1a0040] transition-colors"
                      style={{ fontFamily: "var(--font-display)" }}
                    >
                      View More Details
                    </button>
                  </motion.div>
                ) : showForm ? (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="w-full flex justify-between flex-col h-full"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-black text-[#1a0040]" style={{ fontFamily: "var(--font-montserrat)" }}>
                          Place Your Order
                        </h2>
                        <button
                          type="button"
                          onClick={() => setShowForm(false)}
                          className="text-sm font-bold text-[#6b5f8a] hover:text-[#2d006b] underline"
                        >
                          Cancel
                        </button>
                      </div>

                      <div className="space-y-4">
                        {errors.general && (
                          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs">
                            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />{errors.general}
                          </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className={labelClass} style={{ fontFamily: "var(--font-montserrat)" }}>
                              Full Name <span className="text-[#d0a651]">*</span>
                            </label>
                            <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange}
                              className={`${inputClass} ${errors.fullName ? "border-red-400" : ""}`} placeholder="John Doe" />
                            {errors.fullName && <p className="text-red-500 text-[10px] mt-0.5">{errors.fullName}</p>}
                          </div>
                          <div>
                            <label className={labelClass} style={{ fontFamily: "var(--font-montserrat)" }}>
                              Email <span className="text-[#d0a651]">*</span>
                            </label>
                            <input type="email" name="email" value={formData.email} onChange={handleInputChange}
                              className={`${inputClass} ${errors.email ? "border-red-400" : ""}`} placeholder="john@example.com" />
                            {errors.email && <p className="text-red-500 text-[10px] mt-0.5">{errors.email}</p>}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className={labelClass} style={{ fontFamily: "var(--font-montserrat)" }}>
                              Phone <span className="text-[#d0a651]">*</span>
                            </label>
                            <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange}
                              className={`${inputClass} ${errors.phone ? "border-red-400" : ""}`} placeholder="+91 98765 43210" />
                            {errors.phone && <p className="text-red-500 text-[10px] mt-0.5">{errors.phone}</p>}
                          </div>
                          <div>
                            <label className={labelClass} style={{ fontFamily: "var(--font-montserrat)" }}>
                              College <span className="text-[#d0a651]">*</span>
                            </label>
                            <input type="text" name="college" value={formData.college} onChange={handleInputChange}
                              className={`${inputClass} ${errors.college ? "border-red-400" : ""}`} placeholder="College name" />
                            {errors.college && <p className="text-red-500 text-[10px] mt-0.5">{errors.college}</p>}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                          <div>
                            <label className={labelClass} style={{ fontFamily: "var(--font-montserrat)" }}>
                              Roll No. <span className="text-[#d0a651]">*</span>
                            </label>
                            <input type="text" name="rollNumber" value={formData.rollNumber} onChange={handleInputChange}
                              className={`${inputClass} ${errors.rollNumber ? "border-red-400" : ""}`} placeholder="22B81A0501" />
                            {errors.rollNumber && <p className="text-red-500 text-[10px] mt-0.5">{errors.rollNumber}</p>}
                          </div>
                          <div>
                            <label className={labelClass} style={{ fontFamily: "var(--font-montserrat)" }}>
                              Year <span className="text-[#d0a651]">*</span>
                            </label>
                            <select name="yearOfStudy" value={formData.yearOfStudy} onChange={handleInputChange}
                              className={`${inputClass} appearance-none ${errors.yearOfStudy ? "border-red-400" : ""}`}
                              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%232d006b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 8px center", backgroundSize: "14px" }}>
                              <option value="">Select</option>
                              {["1st Year", "2nd Year", "3rd Year", "4th Year", "Post Graduate", "Other"].map((y) => <option key={y} value={y}>{y}</option>)}
                            </select>
                            {errors.yearOfStudy && <p className="text-red-500 text-[10px] mt-0.5">{errors.yearOfStudy}</p>}
                          </div>
                          <div>
                            <label className={labelClass} style={{ fontFamily: "var(--font-montserrat)" }}>
                              Branch <span className="text-[#d0a651]">*</span>
                            </label>
                            <input type="text" name="branch" value={formData.branch} onChange={handleInputChange}
                              className={`${inputClass} ${errors.branch ? "border-red-400" : ""}`} placeholder="CSE, ECE..." />
                            {errors.branch && <p className="text-red-500 text-[10px] mt-0.5">{errors.branch}</p>}
                          </div>
                        </div>
                        <div>
                          <label className={labelClass} style={{ fontFamily: "var(--font-montserrat)" }}>
                            Custom Name for Mug <span className="text-[#d0a651]">*</span>
                          </label>
                          <input type="text" name="customName" value={formData.customName} onChange={handleInputChange}
                            className={`${inputClass} ${errors.customName ? "border-red-400" : ""}`} placeholder="Name to engrave" />
                          {errors.customName && <p className="text-red-500 text-[10px] mt-0.5">{errors.customName}</p>}
                        </div>

                        {/* Payment Section */}
                        <div className="mt-2">
                          <p className={labelClass} style={{ fontFamily: "var(--font-montserrat)" }}>
                            Payment — ₹200 <span className="text-[#d0a651]">*</span>
                          </p>
                          <div className="flex flex-col sm:flex-row gap-6 mt-2">
                            {/* QR code */}
                            <div className="w-full sm:w-[160px] shrink-0 aspect-square rounded-xl bg-[#faf9f7] border border-[#2d006b]/10 flex items-center justify-center p-3">
                              <div className="text-center w-full">
                                <div className="relative w-full aspect-square mx-auto bg-white rounded-lg mb-2 overflow-hidden border border-[#9b9b9b]/20">
                                  <Image src="/qr.png" alt="QR Code" fill className="object-cover" />
                                </div>
                                <span className="text-[10px] text-[#6b5f8a]">Scan to pay ₹200</span>
                              </div>
                            </div>
                            
                            {/* UTR */}
                            <div className="flex flex-col justify-center flex-grow w-full">
                              <label htmlFor="utrNumber" className={labelClass} style={{ fontFamily: "var(--font-montserrat)" }}>
                                UTR / Reference Number <span className="text-[#d0a651]">*</span>
                              </label>
                              <input required type="text" id="utrNumber" name="utrNumber" value={formData.utrNumber} onChange={handleInputChange}
                                className={`${inputClass} ${errors.utrNumber ? "border-red-400" : ""}`} placeholder="12-digit UTR number" />
                              <p className="text-[10px] text-[#6b5f8a] mt-1.5 leading-tight">
                                Unique Transaction Reference (UTR) is a 12-digit number found in your payment app (GPay, PhonePe, etc.) after a successful transaction.
                              </p>
                              {errors.utrNumber && <p className="text-red-500 text-[10px] mt-1">{errors.utrNumber}</p>}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-[#2d006b]/10">
                      {isSubmitting ? (
                        <div className="w-full py-3.5 rounded-full font-black text-sm tracking-widest uppercase bg-[#2d006b]/20 text-[#6b5f8a] cursor-not-allowed flex items-center justify-center gap-2" style={{ fontFamily: "var(--font-montserrat)" }}>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Processing...
                        </div>
                      ) : (
                        <HoverBorderGradient
                          containerClassName="rounded-full w-full"
                          as="button"
                          className="bg-[#f1cd76] w-full flex items-center justify-center gap-2 hover:bg-[#d0a651] text-[#1a0040] text-sm px-8 py-3.5 font-bold tracking-widest uppercase transition-colors"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          Submit Order
                        </HoverBorderGradient>
                      )}
                    </div>
                  </motion.form>
                ) : (
                  <motion.div
                    key="details"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col w-full"
                  >
                    <h2 className="text-4xl md:text-5xl font-black text-[#1a0040] heading-display tracking-tight leading-tight">
                      Exclusive Customised <br />
                      <span className="text-[#2d006b]">Merchandise</span>
                    </h2>

                    <div className="mt-4 flex items-end gap-3">
                      <span className="text-4xl font-bold text-[#1a0040]">₹200</span>
                    </div>

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
                        <div className="w-8 h-8 rounded-full bg-[#2d006b]/10 flex items-center justify-center text-[#2d006b]">
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

                    <div className="mt-10 flex flex-col sm:flex-row gap-4">
                      <HoverBorderGradient
                        containerClassName="rounded-full w-full sm:w-auto flex-1"
                        as="button"
                        onClick={(e) => {
                          e.preventDefault();
                          setShowForm(true);
                        }}
                        className="bg-[#f1cd76] w-full flex items-center justify-center gap-2 hover:bg-[#d0a651] text-[#1a0040] text-lg px-8 py-4 font-bold tracking-widest uppercase transition-colors cursor-pointer"
                        style={{ fontFamily: "var(--font-montserrat)" }}
                      >
                        <ShoppingCart className="w-5 h-5" />
                        Order Now
                      </HoverBorderGradient>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
