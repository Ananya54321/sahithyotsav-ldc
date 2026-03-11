"use client";

import { Suspense, useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle, Loader2, AlertCircle, PencilLine, ArrowLeft, Upload, X, IndianRupee, Clock,
} from "lucide-react";
import Container from "../components/Container";
import { eventsConfig } from "../data/schedule";
import { ComicText } from "@/components/ui/comic-text";
import { DotPattern } from "@/components/ui/dot-pattern";
import { ShineBorder } from "@/components/ui/shine-border";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

const LS_KEY = "sahithyotsav_registration";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  college: string;
  rollNumber: string;
  yearOfStudy: string;
  branch: string;
  selectedEvent: string;
  utrNumber: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  college?: string;
  rollNumber?: string;
  yearOfStudy?: string;
  branch?: string;
  general?: string;
  utrNumber?: string;
}

const yearOptions = ["1st Year", "2nd Year", "3rd Year", "4th Year", "Post Graduate", "Other"];

const defaultFormData: FormData = {
  fullName: "", email: "", phone: "", college: "", rollNumber: "", yearOfStudy: "", branch: "", selectedEvent: "", utrNumber: "",
};

const inputClass =
  "w-full px-3 py-2.5 rounded-lg bg-white border border-[#2d006b]/15 text-[#1a0040] placeholder-[#9b9b9b] text-sm focus:border-[#2d006b] transition-colors";
const labelClass =
  "block text-[10px] font-black uppercase tracking-widest text-[#2d006b] mb-1";

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <RegisterPageContent />
    </Suspense>
  );
}

function RegisterPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [paymentMethod, setPaymentMethod] = useState<"phonepe" | "gpay">("gpay");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [successAction, setSuccessAction] = useState<"created" | "updated">("created");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LS_KEY);
      if (saved) {
        setFormData(JSON.parse(saved));
        setIsEditMode(true);
        return;
      }
    } catch { /* ignore */ }
    const eventParam = searchParams.get("event");
    if (eventParam && eventsConfig.some((e) => e.name === eventParam)) {
      if (eventParam === "Talk on Emotional Intelligence - Being Human in a High-Tech World") {
        window.open("https://forms.gle/9AwY3noqBBqpYeDr8", "_blank");
        router.replace("/register");
        return;
      }
      setFormData((prev) => ({ ...prev, selectedEvent: eventParam }));
    }
  }, [searchParams, router]);

  const selectedEventConfig = eventsConfig.find((e) => e.name === formData.selectedEvent);
  const requiresPayment = (selectedEventConfig?.fee ?? 0) > 0;

  const validateForm = (): boolean => {
    const e: FormErrors = {};
    if (!formData.fullName.trim()) e.fullName = "Required";
    if (!formData.email.trim()) e.email = "Required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = "Invalid email";
    if (!formData.phone.trim()) e.phone = "Required";
    if (!formData.college.trim()) e.college = "Required";
    if (!formData.rollNumber.trim()) e.rollNumber = "Required";
    if (!formData.yearOfStudy) e.yearOfStudy = "Required";
    if (!formData.branch.trim()) e.branch = "Required";
    if (requiresPayment) {
      if (!formData.utrNumber.trim()) e.utrNumber = "Required";
      else if (!/^\d{12}$/.test(formData.utrNumber.trim())) e.utrNumber = "Must be a 12-digit number";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    setErrors({});
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, events: [formData.selectedEvent], isEdit: isEditMode }),
      });
      const data = await res.json();
      if (res.status === 409) { setErrors({ email: data.error }); setIsSubmitting(false); return; }
      if (!res.ok) { setErrors({ general: data.error ?? "Something went wrong." }); setIsSubmitting(false); return; }
      localStorage.removeItem(LS_KEY);
      setSuccessAction(data.action ?? "created");
      setIsSubmitting(false);
      setIsSuccess(true);
    } catch {
      setErrors({ general: "Network error. Please check your connection." });
      setIsSubmitting(false);
    }
  };

  const handleCancelEdit = () => {
    localStorage.removeItem(LS_KEY);
    setFormData(defaultFormData);
    setIsEditMode(false);
    setErrors({});
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const successCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isSuccess) {
      setTimeout(() => {
        successCardRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);

    }
  }, [isSuccess]);

  /* ── Success screen ── */
  if (isSuccess) {
    return (
      <div className="flex flex-col min-h-screen">
        <section className="relative bg-[#2d006b] text-white pt-20 pb-28 overflow-hidden">
          <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(80,0,160,0.4) 0%, transparent 70%)" }} />
          <DotPattern className="text-white/6" width={24} height={24} cr={1.2} />
          <div className="absolute bottom-0 left-0 w-full overflow-hidden">
            <svg viewBox="0 0 1440 70" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-[55px] md:h-[70px]">
              <path d="M0,35 C360,70 1080,0 1440,35 L1440,70 L0,70 Z" fill="#f5f5f5" />
            </svg>
          </div>
          <Container className="relative z-10 text-center">
            <span className="eyebrow-label">Success</span>
            <ComicText fontSize={3.5} className="mt-2" style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", backgroundColor: "#f1cd76", backgroundImage: "radial-gradient(circle at 1px 1px, #d0a651 1px, transparent 0)", WebkitTextStroke: `${3.5 * 0.35}px #1a0040`, filter: "drop-shadow(5px 5px 0px #1a0040) drop-shadow(3px 3px 0px #d0a651)", transform: "skewX(-8deg)" }}>
              {successAction === "updated" ? "Registration Updated!" : "You're Registered!"}
            </ComicText>
          </Container>
        </section>
        <section className="bg-[#f5f5f5] grow py-16">
          <Container>
            <motion.div ref={successCardRef} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="max-w-lg mx-auto royal-card p-10 text-center relative overflow-hidden">
              <ShineBorder shineColor={["#f1cd76", "#d0a651", "#f1cd76"]} borderWidth={2} duration={10} />
              <div className="icon-circle-gold mx-auto mb-6"><CheckCircle className="w-8 h-8 text-[#2d006b]" /></div>
              <ComicText fontSize={2} className="mb-4" style={{ backgroundColor: "#2d006b", backgroundImage: "radial-gradient(circle at 1px 1px, #4a009e 1px, transparent 0)", WebkitTextStroke: `${2 * 0.35}px #f1cd76`, filter: "drop-shadow(3px 3px 0px #1a0040) drop-shadow(2px 2px 0px #d0a651)", transform: "skewX(-8deg)" }}>
                {successAction === "updated" ? "Details Updated" : "See You There!"}
              </ComicText>
              <p className="text-[#6b5f8a] mb-6">
                {successAction === "updated"
                  ? `Your registration for ${formData.selectedEvent} has been updated, ${formData.fullName}!`
                  : `Thank you for registering for ${formData.selectedEvent}, ${formData.fullName}!`}
              </p>
              <p className="text-sm text-[#9b9b9b] italic mb-8">We look forward to seeing you at Sahithyotsav 2k26!</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button 
                  onClick={() => { 
                    setIsSuccess(false); 
                    setFormData((prev) => ({ ...prev, selectedEvent: "", utrNumber: "" })); 
                    setIsEditMode(false); 
                    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
                  }} 
                  className="w-full sm:w-auto bg-[#f1cd76] hover:bg-[#d0a651] text-[#1a0040] text-xs sm:text-sm px-6 sm:px-8 py-3.5 font-bold tracking-[0.15em] uppercase transition-colors rounded-full"
                >
                  Explore Other Events
                </button>
                <button 
                  onClick={() => { 
                    setIsSuccess(false); 
                    setIsEditMode(true); 
                    setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 100);
                  }} 
                  className="btn-purple-outline w-full sm:w-auto"
                >
                  Edit Registration
                </button>
              </div>
            </motion.div>
          </Container>
        </section>
      </div>
    );
  }

  const showEventSelection = !formData.selectedEvent;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <section className="relative bg-[#2d006b] text-white py-28 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(80,0,160,0.4) 0%, transparent 70%)" }} />
        <DotPattern className="text-white/6" width={24} height={24} cr={1.2} />
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg viewBox="0 0 1440 70" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-[55px] md:h-[70px]">
            <path d="M0,35 C360,70 1080,0 1440,35 L1440,70 L0,70 Z" fill="#f5f5f5" />
          </svg>
        </div>
        <Container className="relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="flex flex-col items-center">
            <span className="eyebrow-label">{isEditMode ? "Update Your Entry" : "Join Us"}</span>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-2 mb-3 relative">
              <ComicText fontSize={4} className="z-10" style={{ fontSize: "clamp(2.5rem, 7vw, 4rem)", backgroundColor: "#f1cd76", backgroundImage: "radial-gradient(circle at 1px 1px, #d0a651 1px, transparent 0)", WebkitTextStroke: `${4 * 0.35}px #1a0040`, filter: "drop-shadow(5px 5px 0px #1a0040) drop-shadow(3px 3px 0px #d0a651)", transform: "skewX(-8deg)" }}>
                {isEditMode ? "Edit Registration" : "Register Now"}
              </ComicText>

              <div className="relative w-32 h-32 md:w-40 md:h-40 -mt-6 md:-mt-12 ml-4 md:ml-6 z-20">
                <Image
                   src="/register.svg"
                   alt="Registration element"
                   fill
                   className="object-contain"
                   priority
                />
              </div>
            </div>
            <p className="text-white/70 max-w-xl mx-auto text-lg mt-4">
              {showEventSelection ? "Choose the event you'd like to participate in." : `Registering for ${formData.selectedEvent}`}
            </p>
          </motion.div>
        </Container>
      </section>

      {/* Body */}
      <section className="bg-[#f5f5f5] grow py-10">
        <Container>
          <AnimatePresence mode="wait">
            {showEventSelection ? (
              <motion.div key="event-selection" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} className="max-w-3xl mx-auto">
                <h2 className="text-xs font-black uppercase tracking-[0.15em] text-[#2d006b] mb-6 text-center" style={{ fontFamily: "var(--font-montserrat)" }}>
                  Which event do you want to register for?
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {eventsConfig.map((event, i) => (
                    <motion.button
                      key={event.name}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => {
                        if (event.name === "Talk on Emotional Intelligence - Being Human in a High-Tech World") {
                          window.open("https://forms.gle/9AwY3noqBBqpYeDr8", "_blank");
                          return;
                        }
                        setFormData((prev) => ({ ...prev, selectedEvent: event.name }));
                      }}
                      className="royal-card p-5 text-left group cursor-pointer"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold text-[#1a0040] group-hover:text-[#2d006b] transition-colors" style={{ fontFamily: "var(--font-display)" }}>
                          {event.name}
                        </h3>
                        <span className={`text-xs font-bold px-3 py-1 rounded-full ${event.fee > 0 ? "bg-[#2d006b]/10 text-[#2d006b]" : "bg-green-100 text-green-700"}`} style={{ fontFamily: "var(--font-display)" }}>
                          {event.fee > 0 ? <span className="flex items-center gap-0.5"><IndianRupee size={10} />{event.fee}</span> : "Free"}
                        </span>
                      </div>
                      {event.name === "Youth Parliament" && (
                        <div className="mt-2.5 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-2.5 py-1 w-fit" style={{ fontFamily: "var(--font-montserrat)" }}>
                          <Clock size={9} className="shrink-0" />
                          Closes Mar 11
                        </div>
                      )}
                    </motion.button>
                  ))}
                  {/* Custom merch option */}
                  <motion.button
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: eventsConfig.length * 0.05 }}
                    onClick={() => router.push("/merch")}
                    className="royal-card p-5 text-left group cursor-pointer border border-[#cbb386]/30 bg-linear-to-br from-[#f1cd76]/10 to-transparent"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-[#1a0040] group-hover:text-[#2d006b] transition-colors" style={{ fontFamily: "var(--font-display)" }}>
                        Merchandise - Customized Mugs
                      </h3>
                    </div>
                  </motion.button>
                </div>
              </motion.div>
            ) : (
              <motion.div key="registration-form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} className="max-w-5xl mx-auto">
                {/* Youth Parliament deadline notice */}
                {formData.selectedEvent === "Youth Parliament" && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 flex items-center gap-3 px-4 py-3 rounded-xl bg-amber-50 border border-amber-200"
                  >
                    <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                    <p className="text-xs text-amber-800" style={{ fontFamily: "var(--font-montserrat)" }}>
                      <span className="font-black">Registration closes March 11.</span>{" "}Complete your registration before the deadline to secure your spot!
                    </p>
                  </motion.div>
                )}
                {/* Back + edit banner */}
                <div className="flex items-center justify-between mb-4">
                  <button
                    type="button"
                    onClick={() => { setFormData((p) => ({ ...p, selectedEvent: "" })); setErrors({}); }}
                    className="flex items-center gap-2 text-sm text-[#2d006b] font-bold hover:text-[#4a009e] transition-colors cursor-pointer"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    <ArrowLeft size={16} /> Change Event
                  </button>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${requiresPayment ? "bg-[#f1cd76] text-[#2d006b]" : "bg-green-100 text-green-700"}`}>
                    {requiresPayment ? <span className="flex items-center gap-0.5"><IndianRupee size={10} />{selectedEventConfig!.fee}</span> : "Free"}
                  </span>
                </div>

                <AnimatePresence>
                  {isEditMode && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="mb-4 flex items-start gap-3 px-4 py-3 rounded-xl bg-[#2d006b]/10 border border-[#2d006b]/20">
                      <PencilLine className="w-4 h-4 text-[#2d006b] mt-0.5 flex-shrink-0" />
                      <div className="flex-1 text-xs text-[#1a0040]"><span className="font-bold">Editing registration.</span> Submit to update.</div>
                      <button onClick={handleCancelEdit} className="text-xs text-[#6b5f8a] hover:text-red-500 transition-colors underline underline-offset-2 flex-shrink-0 cursor-pointer">Cancel</button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* 2-col: poster | form */}
                <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-6">
                  {/* Left column: poster + payment */}
                  <div className="space-y-4">
                    {/* Event poster */}
                    <div
                      className="aspect-[4/5] w-full rounded-2xl relative overflow-hidden"
                    >
                      {selectedEventConfig?.image && (
                        <div className="absolute inset-0 z-0">
                          <Image src={selectedEventConfig.image} alt={formData.selectedEvent} fill className="object-cover" />
                        </div>
                      )}
                    </div>

                  </div>

                  {/* Right column: form */}
                  <form onSubmit={handleSubmit} className="royal-card p-6 relative overflow-hidden">
                    <ShineBorder shineColor={["#f1cd76", "#d0a651", "#f1cd76"]} borderWidth={2} duration={12} />
                    <div className="space-y-4">
                      <AnimatePresence>
                        {errors.general && (
                          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs">
                            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />{errors.general}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Row 1: Name + Email */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="fullName" className={labelClass} style={{ fontFamily: "var(--font-montserrat)" }}>
                            Full Name <span className="text-[#d0a651]">*</span>
                          </label>
                          <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleInputChange}
                            className={`${inputClass} ${errors.fullName ? "border-red-400" : ""}`} placeholder="Full name" />
                          {errors.fullName && <p className="text-red-500 text-[10px] mt-0.5">{errors.fullName}</p>}
                        </div>
                        <div>
                          <label htmlFor="email" className={labelClass} style={{ fontFamily: "var(--font-montserrat)" }}>
                            Email <span className="text-[#d0a651]">*</span>
                          </label>
                          <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} disabled={isEditMode}
                            className={`${inputClass} ${errors.email ? "border-red-400" : ""} ${isEditMode ? "opacity-50 cursor-not-allowed" : ""}`} placeholder="email@example.com" />
                          {errors.email && <p className="text-red-500 text-[10px] mt-0.5">{errors.email}</p>}
                        </div>
                      </div>

                      {/* Row 2: Phone + College */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="phone" className={labelClass} style={{ fontFamily: "var(--font-montserrat)" }}>
                            Phone <span className="text-[#d0a651]">*</span>
                          </label>
                          <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange}
                            className={`${inputClass} ${errors.phone ? "border-red-400" : ""}`} placeholder="+91 98765 43210" />
                          {errors.phone && <p className="text-red-500 text-[10px] mt-0.5">{errors.phone}</p>}
                        </div>
                        <div>
                          <label htmlFor="college" className={labelClass} style={{ fontFamily: "var(--font-montserrat)" }}>
                            College <span className="text-[#d0a651]">*</span>
                          </label>
                          <input type="text" id="college" name="college" value={formData.college} onChange={handleInputChange}
                            className={`${inputClass} ${errors.college ? "border-red-400" : ""}`} placeholder="College name" />
                          {errors.college && <p className="text-red-500 text-[10px] mt-0.5">{errors.college}</p>}
                        </div>
                      </div>

                      {/* Row 3: Roll + Year + Branch */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label htmlFor="rollNumber" className={labelClass} style={{ fontFamily: "var(--font-montserrat)" }}>
                            Roll No. <span className="text-[#d0a651]">*</span>
                          </label>
                          <input type="text" id="rollNumber" name="rollNumber" value={formData.rollNumber} onChange={handleInputChange}
                            className={`${inputClass} ${errors.rollNumber ? "border-red-400" : ""}`} placeholder="22B81A0501" />
                          {errors.rollNumber && <p className="text-red-500 text-[10px] mt-0.5">{errors.rollNumber}</p>}
                        </div>
                        <div>
                          <label htmlFor="yearOfStudy" className={labelClass} style={{ fontFamily: "var(--font-montserrat)" }}>
                            Year <span className="text-[#d0a651]">*</span>
                          </label>
                          <select id="yearOfStudy" name="yearOfStudy" value={formData.yearOfStudy} onChange={handleInputChange}
                            className={`${inputClass} appearance-none ${errors.yearOfStudy ? "border-red-400" : ""}`}
                            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%232d006b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 8px center", backgroundSize: "14px" }}>
                            <option value="">Select</option>
                            {yearOptions.map((y) => <option key={y} value={y}>{y}</option>)}
                          </select>
                          {errors.yearOfStudy && <p className="text-red-500 text-[10px] mt-0.5">{errors.yearOfStudy}</p>}
                        </div>
                        <div>
                          <label htmlFor="branch" className={labelClass} style={{ fontFamily: "var(--font-montserrat)" }}>
                            Branch <span className="text-[#d0a651]">*</span>
                          </label>
                          <input type="text" id="branch" name="branch" value={formData.branch} onChange={handleInputChange}
                            className={`${inputClass} ${errors.branch ? "border-red-400" : ""}`} placeholder="CSE, ECE..." />
                          {errors.branch && <p className="text-red-500 text-[10px] mt-0.5">{errors.branch}</p>}
                        </div>
                      </div>

                      {/* Payment Section (Horizontal) */}
                      {requiresPayment && (
                        <div>
                          <p className={labelClass} style={{ fontFamily: "var(--font-montserrat)" }}>
                            Payment - ₹{selectedEventConfig!.fee} <span className="text-[#d0a651]">*</span>
                          </p>
                          <div className="flex flex-col sm:flex-row gap-6 mt-2">
                            {/* QR code */}
                            <div className="w-full sm:w-[220px] shrink-0 rounded-xl bg-white border border-[#2d006b]/10 flex flex-col items-center p-3">
                              <div className="flex gap-2 w-full mb-3">
                                <button
                                  type="button"
                                  onClick={() => setPaymentMethod("gpay")}
                                  className={`flex-1 py-1.5 text-[10px] font-bold rounded-md transition-colors ${paymentMethod === "gpay" ? "bg-[#2d006b] text-white" : "bg-[#2d006b]/10 text-[#2d006b]"}`}
                                  style={{ fontFamily: "var(--font-montserrat)" }}
                                >
                                  GPay
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setPaymentMethod("phonepe")}
                                  className={`flex-1 py-1.5 text-[10px] font-bold rounded-md transition-colors ${paymentMethod === "phonepe" ? "bg-[#2d006b] text-white" : "bg-[#2d006b]/10 text-[#2d006b]"}`}
                                  style={{ fontFamily: "var(--font-montserrat)" }}
                                >
                                  PhonePe
                                </button>
                              </div>
                              <div className="text-center w-full">
                                <div className="relative w-full aspect-square mx-auto bg-[#f5f5f5] rounded-lg mb-2 overflow-hidden border border-[#9b9b9b]/20">
                                  <Image src={paymentMethod === "gpay" ? "/payment/qr-gpay.jpeg" : "/payment/qr-phonepe.jpeg"} alt="QR Code" fill className="object-cover" />
                                </div>
                                <span className="text-[10px] text-[#6b5f8a]">Scan to pay ₹{selectedEventConfig!.fee}</span>
                              </div>
                            </div>
                            
                            {/* UTR */}
                            <div className="flex flex-col justify-center grow w-full">
                              <div className="mb-4 text-[11px] bg-[#2d006b]/5 p-3 rounded-xl border border-[#2d006b]/10">
                                <div className="flex flex-col gap-1 text-[#6b5f8a]">
                                  <div><span className="font-bold text-[#1a0040]">UPI:</span> 9346251983-2@ibl</div>
                                  <div><span className="font-bold text-[#1a0040]">Number:</span> 9346251983</div>
                                </div>
                              </div>
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
                      )}

                      {/* Submit */}
                      <div className="space-y-2 pt-1">
                        {isSubmitting ? (
                          <div className="w-full py-3 rounded-full font-black text-sm tracking-widest uppercase bg-[#2d006b]/20 text-[#9b9b9b] cursor-not-allowed flex items-center justify-center gap-2" style={{ fontFamily: "var(--font-montserrat)" }}>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            {isEditMode ? "Updating..." : "Submitting..."}
                          </div>
                        ) : (
                          <HoverBorderGradient
                            containerClassName="w-full rounded-full"
                            as="button"
                            className="w-full bg-[#f1cd76] hover:bg-[#d0a651] text-[#1a0040] text-sm px-8 py-3.5 font-bold tracking-[0.15em] uppercase transition-colors"
                            style={{ fontFamily: "var(--font-display)" }}
                          >
                            {isEditMode ? "Update Registration" : "Submit Registration"}
                          </HoverBorderGradient>
                        )}
                        {isEditMode && (
                          <button type="button" onClick={handleCancelEdit}
                            className="w-full py-2.5 rounded-full text-xs font-bold text-[#6b5f8a] hover:text-red-500 border border-[#2d006b]/15 hover:border-red-300 transition-all duration-300 uppercase tracking-wider cursor-pointer"
                            style={{ fontFamily: "var(--font-montserrat)" }}>
                            Cancel Edit &amp; Start Fresh
                          </button>
                        )}
                      </div>
                    </div>
                  </form>
                </div>

                <p className="text-center text-[#9b9b9b] text-xs mt-5 italic">
                  By registering, you agree to our terms and conditions.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </Container>
      </section>

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] bg-[#1a0040] text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 border border-[#f1cd76]/30"
          >
            <div className="w-2 h-2 rounded-full bg-[#f1cd76] animate-pulse" />
            <span className="text-sm font-semibold tracking-wide" style={{ fontFamily: "var(--font-montserrat)" }}>
              {toastMessage}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
