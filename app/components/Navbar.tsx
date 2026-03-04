"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Container from "./Container";

const navLinks = [
  { href: "/schedule", label: "Schedule" },
  { href: "/merch", label: "Merch" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 overflow-visible ${
        isScrolled
          ? "bg-[#2d006b] shadow-[0_4px_20px_rgba(0,0,0,0.3)]"
          : "bg-[#2d006b]"
      }`}
    >
      <Container>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <Image
              src="/sahithyotsav-logo.png"
              alt="Sahithyotsav"
              width={36}
              height={36}
              className="rounded-full"
              unoptimized
            />
            <span
              className="text-white font-black text-lg tracking-tight hidden sm:inline"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              SAHITHYOTSAV
            </span>
            <span className="text-white/30 hidden sm:inline">|</span>
            <Image
              src="/ldc-logo.png"
              alt="Literary & Debate Club"
              width={28}
              height={28}
              className="rounded-full hidden sm:block"
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-xs font-bold tracking-[0.15em] uppercase text-white/80 hover:text-white transition-colors duration-200"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                {link.label}
                {pathname === link.href && (
                  <motion.span
                    layoutId="nav-active-line"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-linear-to-r from-[#f1cd76] to-[#d0a651] rounded-full"
                    initial={false}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                )}
              </Link>
            ))}
            <Link
              href="/register"
              className="btn-gold text-xs px-5 py-2.5"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              Register Now
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-white hover:text-[#cbb386] transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden bg-[#1a0040] border-t border-white/10"
          >
            <Container>
              <div className="py-5 space-y-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07 }}
                  >
                    <Link
                      href={link.href}
                      className={`block py-3 px-4 rounded-lg text-xs font-bold tracking-[0.15em] uppercase transition-all duration-200 ${
                        pathname === link.href
                          ? "text-[#cbb386] bg-white/5"
                          : "text-white/70 hover:text-white hover:bg-white/5"
                      }`}
                      style={{ fontFamily: "var(--font-montserrat)" }}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
                <div className="pt-3">
                  <Link href="/register" className="btn-gold w-full">
                    Register Now
                  </Link>
                </div>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
