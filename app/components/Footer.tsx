"use client";

import Image from "next/image";
import Link from "next/link";
import { Instagram, Linkedin, Mail, Phone } from "lucide-react";
import Container from "./Container";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/schedule", label: "Schedule" },
  { href: "/register", label: "Register" },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#2d006b] text-white pt-16 pb-8 overflow-hidden">
      <Container className="relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/sahithyotsav-logo.png"
                alt="Sahithyotsav"
                width={36}
                height={36}
                className="rounded-full"
              />
              <Image
                src="/ldc-logo.png"
                alt="Literary & Debate Club"
                width={36}
                height={36}
                className="rounded-full"
              />
              <span
                className="text-white font-black text-base tracking-tight"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                SAHITHYOTSAV 2k26
              </span>
            </div>
            <p className="text-white/50 text-sm leading-relaxed max-w-[220px]">
              A celebration of literature, language, and the power of words.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4
              className="text-xs font-black uppercase tracking-[0.15em] text-[#cbb386] mb-5"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 text-sm hover:text-[#cbb386] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-xs font-black uppercase tracking-[0.15em] text-[#cbb386] mb-5"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              Connect
            </h4>
            <div className="flex items-center gap-3 mb-4">
              <a
                href="https://www.instagram.com/cvr.ldc"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-[#cbb386] hover:text-[#2d006b] transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://www.linkedin.com/company/ldccvr"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-[#cbb386] hover:text-[#2d006b] transition-all duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin size={16} />
              </a>
              <a
                href="mailto:ldc.cvr@gmail.com"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-[#cbb386] hover:text-[#2d006b] transition-all duration-300"
                aria-label="Email"
              >
                <Mail size={16} />
              </a>
            </div>
            <div className="space-y-2 mt-4">
              <a
                href="tel:+919346251983"
                className="flex items-center gap-2 text-white/50 text-xs hover:text-[#cbb386] transition-colors"
              >
                <Phone size={12} className="shrink-0" />
                +91 93462 51983
              </a>
              <a
                href="mailto:ldc.cvr@gmail.com"
                className="flex items-center gap-2 text-white/50 text-xs hover:text-[#cbb386] transition-colors"
              >
                <Mail size={12} className="shrink-0" />
                ldc.cvr@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs">
            © 2k26 Sahithyotsav. All rights reserved.
          </p>
          <p className="text-white/20 text-xs">
            Literary &amp; Debate Club, CVR College Of Engineering
          </p>
        </div>
      </Container>
    </footer>
  );
}
