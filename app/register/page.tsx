"use client";

import { Suspense, useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle, Loader2, AlertCircle, PencilLine, ArrowLeft, Upload, X, IndianRupee,
} from "lucide-react";
import Container from "../components/Container";
import { eventsConfig } from "../data/schedule";
import { ComicText } from "@/components/ui/comic-text";
import { DotPattern } from "@/components/ui/dot-pattern";
import { ShineBorder } from "@/components/ui/shine-border";
import { Confetti, type ConfettiRef } from "@/components/ui/confetti";

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
  paymentScreenshot?: string;
}

const yearOptions = ["1st Year", "2nd Year", "3rd Year", "4th Year", "Post Graduate", "Other"];

const defaultFormData: FormData = {
  fullName: "", email: "", phone: "", college: "", rollNumber: "", yearOfStudy: "", branch: "", selectedEvent: "",
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
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [paymentFile, setPaymentFile] = useState<File | null>(null);
  const [paymentPreview, setPaymentPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [successAction, setSuccessAction] = useState<"created" | "updated">("created");
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      setFormData((prev) => ({ ...prev, selectedEvent: eventParam }));
    }
  }, [searchParams]);

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
    if (requiresPayment && !paymentFile && !isEditMode) e.paymentScreenshot = "Payment screenshot is required";
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
      localStorage.setItem(LS_KEY, JSON.stringify(formData));
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
    setPaymentFile(null);
    setPaymentPreview(null);
    setIsEditMode(false);
    setErrors({});
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { setErrors((p) => ({ ...p, paymentScreenshot: "Upload an image file" })); return; }
    if (file.size > 5 * 1024 * 1024) { setErrors((p) => ({ ...p, paymentScreenshot: "Max 5 MB" })); return; }
    setPaymentFile(file);
    setPaymentPreview(URL.createObjectURL(file));
    setErrors((p) => ({ ...p, paymentScreenshot: undefined }));
  };

  const removeFile = () => {
    setPaymentFile(null);
    setPaymentPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const confettiRef = useRef<ConfettiRef>(null);

  useEffect(() => {
    if (isSuccess && confettiRef.current) {
      const fire = () => confettiRef.current?.fire({
        particleCount: 120, spread: 80, origin: { y: 0.6 },
        colors: ["#f1cd76", "#d0a651", "#2d006b", "#7c3aed", "#ffffff"],
      });
      fire();
      const t = setTimeout(fire, 400);
      return () => clearTimeout(t);
    }
  }, [isSuccess]);

  /* ── Success screen ── */
  if (isSuccess) {
    return (
      <div className="flex flex-col min-h-screen">
        <Confetti ref={confettiRef} className="fixed inset-0 z-[100] pointer-events-none" manualstart />
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
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="max-w-lg mx-auto royal-card p-10 text-center relative overflow-hidden">
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
              <p className="text-sm text-[#9b9b9b] italic mb-8">We look forward to seeing you at Sahithyotsav 2026!</p>
              <button onClick={() => { setIsSuccess(false); setIsEditMode(true); }} className="btn-purple-outline">Edit Registration</button>
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
      <section className="relative bg-[#2d006b] text-white pt-20 pb-28 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(80,0,160,0.4) 0%, transparent 70%)" }} />
        <DotPattern className="text-white/6" width={24} height={24} cr={1.2} />
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <svg viewBox="0 0 1440 70" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-[55px] md:h-[70px]">
            <path d="M0,35 C360,70 1080,0 1440,35 L1440,70 L0,70 Z" fill="#f5f5f5" />
          </svg>
        </div>
        <Container className="relative z-10">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="eyebrow-label">{isEditMode ? "Update Your Entry" : "Join Us"}</span>
            <ComicText fontSize={4} className="mt-2 mb-3" style={{ fontSize: "clamp(2.5rem, 7vw, 4rem)", backgroundColor: "#f1cd76", backgroundImage: "radial-gradient(circle at 1px 1px, #d0a651 1px, transparent 0)", WebkitTextStroke: `${4 * 0.35}px #1a0040`, filter: "drop-shadow(5px 5px 0px #1a0040) drop-shadow(3px 3px 0px #d0a651)", transform: "skewX(-8deg)" }}>
              {isEditMode ? "Edit Registration" : "Register Now"}
            </ComicText>
            <p className="text-white/70 max-w-xl mx-auto text-lg">
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
                      onClick={() => setFormData((prev) => ({ ...prev, selectedEvent: event.name }))}
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
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div key="registration-form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} className="max-w-5xl mx-auto">
                {/* Back + edit banner */}
                <div className="flex items-center justify-between mb-4">
                  <button
                    type="button"
                    onClick={() => { setFormData((p) => ({ ...p, selectedEvent: "" })); setErrors({}); setPaymentFile(null); setPaymentPreview(null); }}
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
                    {/* Event poster placeholder */}
                    <div
                      className="aspect-square w-full rounded-2xl flex items-center justify-center relative overflow-hidden"
                      style={{ background: selectedEventConfig?.gradient ?? "linear-gradient(135deg, #2d006b, #7c3aed)" }}
                    >
                      <div className="absolute inset-0 bg-black/20" />
                      <div className="relative z-10 text-center px-6">
                        <span
                          className="text-white/60 text-[10px] uppercase tracking-[0.2em] font-bold"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          Event Poster
                        </span>
                        <p
                          className="text-white font-black text-xl mt-2"
                          style={{ fontFamily: "'Bangers', 'Comic Sans MS', sans-serif" }}
                        >
                          {formData.selectedEvent}
                        </p>
                      </div>
                    </div>

                    {/* QR + upload for paid events */}
                    {requiresPayment && (
                      <div className="royal-card p-4 space-y-3">
                        <p className={labelClass} style={{ fontFamily: "var(--font-montserrat)" }}>
                          Payment — ₹{selectedEventConfig!.fee}
                        </p>
                        {/* QR placeholder */}
                        <div className="aspect-square w-full max-w-[200px] mx-auto rounded-xl bg-white border border-[#2d006b]/10 flex items-center justify-center">
                          <div className="text-center">
                            <div className="w-32 h-32 mx-auto bg-[#f5f5f5] rounded-lg flex items-center justify-center mb-2">
                              <span className="text-[#9b9b9b] text-xs">QR Code</span>
                            </div>
                            <span className="text-[10px] text-[#6b5f8a]">Scan to pay ₹{selectedEventConfig!.fee}</span>
                          </div>
                        </div>
                        {/* Upload */}
                        <div>
                          <label className={labelClass} style={{ fontFamily: "var(--font-montserrat)" }}>
                            Upload Screenshot <span className="text-[#d0a651]">*</span>
                          </label>
                          {paymentPreview ? (
                            <div className="relative inline-block">
                              <img src={paymentPreview} alt="Payment" className="max-w-[160px] max-h-[160px] rounded-lg border border-[#2d006b]/15 object-cover" />
                              <button type="button" onClick={removeFile} className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer">
                                <X size={10} />
                              </button>
                            </div>
                          ) : (
                            <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-[#2d006b]/20 rounded-lg cursor-pointer hover:border-[#2d006b]/40 transition-all">
                              <Upload className="w-5 h-5 text-[#6b5f8a] mb-1" />
                              <span className="text-xs text-[#6b5f8a]">Click to upload</span>
                              <span className="text-[10px] text-[#9b9b9b]">PNG, JPG up to 5 MB</span>
                              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                            </label>
                          )}
                          {errors.paymentScreenshot && <p className="text-red-500 text-xs mt-1">{errors.paymentScreenshot}</p>}
                        </div>
                      </div>
                    )}
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
                            className={`${inputClass} ${errors.rollNumber ? "border-red-400" : ""}`} placeholder="21B81A0501" />
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

                      {/* Submit */}
                      <div className="space-y-2 pt-1">
                        {isSubmitting ? (
                          <div className="w-full py-3 rounded-full font-black text-sm tracking-widest uppercase bg-[#2d006b]/20 text-[#9b9b9b] cursor-not-allowed flex items-center justify-center gap-2" style={{ fontFamily: "var(--font-montserrat)" }}>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            {isEditMode ? "Updating..." : "Submitting..."}
                          </div>
                        ) : (
                          <button type="submit" className="btn-gold w-full">
                            {isEditMode ? "Update Registration" : "Submit Registration"}
                          </button>
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
    </div>
  );
}
