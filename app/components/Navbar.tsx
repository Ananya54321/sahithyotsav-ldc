"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Navbar as ResizableNavbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
} from "@/components/ui/resizable-navbar";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";

const navLinks = [
  { name: "Schedule", link: "/schedule" },
  { name: "Merch", link: "/merch" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const Logo = () => (
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
      <span
        className="text-white font-black text-lg uppercase tracking-tight hidden sm:block group-data-[shrunk=true]/nav:hidden"
        style={{ fontFamily: "var(--font-montserrat)" }}
      >
        Literary & Debate Club
      </span>
      <span
        className="text-white font-black text-lg tracking-tight hidden group-data-[shrunk=true]/nav:block"
        style={{ fontFamily: "var(--font-montserrat)" }}
      >
        LDC
      </span>
    </Link>
  );

  const MobileLogo = () => (
    <Link href="/" className="flex items-center gap-2.5 group">
      <Image
        src="/ldc-logo.png"
        alt="Literary & Debate Club"
        width={36}
        height={36}
        className="rounded-full"
      />
      <span
        className="text-white font-black uppercase text-lg tracking-tight"
        style={{ fontFamily: "var(--font-montserrat)" }}
      >
        Literary & Debate Club
      </span>
    </Link>
  );

  return (
    <ResizableNavbar>
      <NavBody>
        <Logo />
        <div className="flex items-center gap-6">
          <NavItems items={navLinks} />
          <HoverBorderGradient
            containerClassName="rounded-full hidden lg:flex"
            as="button"
            className="bg-[#f1cd76] hover:bg-[#d0a651] text-[#1a0040] text-xs px-5 py-2.5 font-bold tracking-widest uppercase transition-colors"
            onClick={() => router.push("/register")}
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            Register Now
          </HoverBorderGradient>
        </div>
      </NavBody>

      <MobileNav>
        <MobileNavHeader>
          <MobileLogo />
          <MobileNavToggle
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </MobileNavHeader>
        <MobileNavMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)}>
          <div className="flex flex-col gap-4 w-full">
            {navLinks.map((link) => (
              <Link key={link.link} href={link.link} className="text-[#1a0040] dark:text-white font-bold text-lg">
                {link.name}
              </Link>
            ))}
            <HoverBorderGradient
              containerClassName="rounded-full w-full"
              as="button"
              className="bg-[#f1cd76] w-full text-center hover:bg-[#d0a651] text-[#1a0040] text-sm px-5 py-3 font-bold tracking-widest uppercase transition-colors"
              onClick={() => router.push("/register")}
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              Register Now
            </HoverBorderGradient>
          </div>
        </MobileNavMenu>
      </MobileNav>
    </ResizableNavbar>
  );
}
