"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import {
  Wind,
  RefreshCw,
  Thermometer,
  Shirt,
  Fan,
  Gauge,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
} from "lucide-react";
import { urbanist, inter } from "../fonts";
import Image from "next/image";

// ─────────────────────────────────────────────
// Country config — easy to extend
// ─────────────────────────────────────────────
const COUNTRY_CONFIG = {
  us: {
    flag: "🇺🇸",
    label: "US",
    promoText: (
      <>
        <strong className="font-bold">Save 10%</strong> on your first HVAC
        Cleaning booking!
      </>
    ),
  },
  ca: {
    flag: "🇨🇦",
    label: "CA",
    promoText: (
      <>
        <strong className="font-bold">Save 10%</strong> on your first HVAC
        Cleaning booking!
      </>
    ),
  },
  // Add more countries here:
  // uk: { flag: "🇬🇧", label: "UK", promoText: <></> },
};

const DEFAULT_COUNTRY = "us";

// ─────────────────────────────────────────────
// Services data
// ─────────────────────────────────────────────
const SERVICES = [
  {
    label: "Air Duct Cleaning",
    href: "/services/air-duct-cleaning",
    icon: Wind,
    desc: "Full system duct sanitation & decontamination",
  },
  {
    label: "Air Exchanger Cleaning",
    href: "/services/air-exchanger-cleaning",
    icon: RefreshCw,
    desc: "Improve indoor air quality and ventilation",
  },
  {
    label: "Heat Pump Cleaning",
    href: "/services/heat-pump-cleaning",
    icon: Thermometer,
    desc: "Maintain peak heating and cooling performance",
  },
  {
    label: "Dryer Vent Cleaning",
    href: "/services/dryer-vent-cleaning",
    icon: Shirt,
    desc: "Prevent fire hazards and boost efficiency",
  },
  {
    label: "Furnace Blower Cleaning",
    href: "/services/furnace-blower-cleaning",
    icon: Fan,
    desc: "Extend equipment lifespan significantly",
  },
  {
    label: "Central Vacuum Cleaning",
    href: "/services/central-vacuum-cleaning",
    icon: Gauge,
    desc: "Deep-clean your entire vacuum system",
  },
];

const NAV_LINKS = [
  { label: "Services", href: "#", isDropdown: true },
  { label: "Who we serve", href: "/who-we-serve", hasChevron: true },
  { label: "Pricing", href: "/pricing" },
  { label: "Reviews", href: "/reviews" },
  { label: "Promos", href: "/promos" },
  { label: "About", href: "/about", hasChevron: true },
];

// ─────────────────────────────────────────────
// Custom hook — detect country from pathname
// e.g. /us/... → "us", /ca/... → "ca"
// ─────────────────────────────────────────────
function useCountry() {
  const pathname = usePathname();
  const segments = pathname?.split("/").filter(Boolean);
  const code = segments?.[0]?.toLowerCase();
  return COUNTRY_CONFIG[code] ? code : DEFAULT_COUNTRY;
}

// ─────────────────────────────────────────────
// Navbar
// ─────────────────────────────────────────────
export default function Navbar() {
  const pathname = usePathname();
  const countryCode = useCountry();
  const country = COUNTRY_CONFIG[countryCode];

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  // ── Refs ──────────────────────────────────
  // Dropdown
  const dropdownWrapRef = useRef(null); // outer clip wrapper
  const dropdownPanelRef = useRef(null); // the panel that slides
  const dropdownCardsRef = useRef(null); // card grid
  // Mobile
  const mobileMenuRef = useRef(null);
  const mobileOverlayRef = useRef(null);
  const mobileServicesRef = useRef(null);
  // Timers
  const leaveTimerRef = useRef(null);
  const dropdownInitRef = useRef(false);

  // ── Desktop dropdown — shutter init ───────
  // We use a clip-wrapper approach:
  // dropdownWrapRef: overflow-hidden, height animated 0→auto (shutter)
  // dropdownPanelRef: translateY -100%→0 (slide up inside clip)
  useEffect(() => {
    if (!dropdownWrapRef.current || !dropdownPanelRef.current) return;
    // Hide completely on mount
    gsap.set(dropdownWrapRef.current, { height: 0, overflow: "hidden" });
    gsap.set(dropdownPanelRef.current, { y: "-100%" });
    dropdownInitRef.current = true;
  }, []);

  const openDropdown = () => {
    if (!dropdownInitRef.current) return;
    clearTimeout(leaveTimerRef.current);
    setDropdownOpen(true);

    // Kill any running tweens
    gsap.killTweensOf(dropdownWrapRef.current);
    gsap.killTweensOf(dropdownPanelRef.current);

    // Step 1: reveal wrapper height (shutter open)
    gsap.to(dropdownWrapRef.current, {
      height: "auto",
      duration: 0.38,
      ease: "power3.out",
    });

    // Step 2: panel rises into view simultaneously
    gsap.to(dropdownPanelRef.current, {
      y: "0%",
      duration: 0.38,
      ease: "power3.out",
    });

    // Step 3: stagger service cards fade up
    if (dropdownCardsRef.current) {
      gsap.fromTo(
        dropdownCardsRef.current.querySelectorAll(".svc-card"),
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.24,
          stagger: 0.04,
          ease: "power2.out",
          delay: 0.1,
        },
      );
    }
  };

  const closeDropdown = () => {
    if (!dropdownInitRef.current) return;
    leaveTimerRef.current = setTimeout(() => {
      setDropdownOpen(false);

      gsap.killTweensOf(dropdownWrapRef.current);
      gsap.killTweensOf(dropdownPanelRef.current);

      // Shutter close: panel slides up, wrapper collapses
      gsap.to(dropdownPanelRef.current, {
        y: "-100%",
        duration: 0.26,
        ease: "power2.in",
      });
      gsap.to(dropdownWrapRef.current, {
        height: 0,
        duration: 0.28,
        ease: "power2.in",
        delay: 0.04, // slight lag so panel exits before clip closes
      });
    }, 90);
  };

  const dismissDropdown = () => {
    if (!dropdownInitRef.current) return;
    setDropdownOpen(false);
    gsap.killTweensOf(dropdownWrapRef.current);
    gsap.killTweensOf(dropdownPanelRef.current);
    gsap.set(dropdownWrapRef.current, { height: 0 });
    gsap.set(dropdownPanelRef.current, { y: "-100%" });
  };

  // ── Mobile GSAP init ──────────────────────
  useEffect(() => {
    if (!mobileMenuRef.current || !mobileOverlayRef.current) return;
    gsap.set(mobileMenuRef.current, { x: "100%" });
    gsap.set(mobileOverlayRef.current, { opacity: 0, pointerEvents: "none" });
  }, []);

  useEffect(() => {
    if (!mobileMenuRef.current || !mobileOverlayRef.current) return;

    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      gsap.set(mobileOverlayRef.current, { pointerEvents: "auto" });
      gsap.to(mobileOverlayRef.current, {
        opacity: 1,
        duration: 0.28,
        ease: "power2.out",
      });
      gsap.to(mobileMenuRef.current, {
        x: "0%",
        duration: 0.36,
        ease: "power3.out",
      });
    } else {
      document.body.style.overflow = "";
      gsap.to(mobileMenuRef.current, {
        x: "100%",
        duration: 0.28,
        ease: "power2.in",
      });
      gsap.to(mobileOverlayRef.current, {
        opacity: 0,
        duration: 0.24,
        ease: "power2.in",
        onComplete: () =>
          gsap.set(mobileOverlayRef.current, { pointerEvents: "none" }),
      });
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // ── Mobile services accordion ─────────────
  useEffect(() => {
    if (!mobileServicesRef.current) return;
    if (mobileServicesOpen) {
      gsap.fromTo(
        mobileServicesRef.current,
        { height: 0, opacity: 0 },
        {
          height: "auto",
          opacity: 1,
          duration: 0.32,
          ease: "power3.out",
        },
      );
    } else {
      gsap.to(mobileServicesRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.22,
        ease: "power2.in",
      });
    }
  }, [mobileServicesOpen]);

  const isActive = (href) =>
    href !== "#" && (pathname === href || pathname.startsWith(href + "/"));

  return (
    <>
      {/* ── Announcement bar ── */}
      <div
        className={`relative z-50 flex items-center justify-center gap-2 py-2.25 px-4 text-[13px] text-gray-800 ${inter.className}`}
        style={{ backgroundColor: "#dff0ea" }}
      >
        {/* Country flag */}
        <span
          className="text-base leading-none select-none"
          role="img"
          aria-label={`${country.label} flag`}
          title={country.label}
        >
          {country.flag}
        </span>
        <span>{country.promoText}</span>
      </div>

      {/* ── Main navbar ── */}
      <header
        className={`sticky top-0 z-40 w-full border-b border-white/10 bg-black ${urbanist.className}`}
      >
        {/* Nav row */}
        <nav className="mx-auto flex h-17 max-w-350 items-center justify-between px-5 lg:px-10">
          {/* Logo — LCP fix: loading="eager" + priority */}
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <Image
              src="/black_logo.png"
              alt="Airflow Hub Logo"
              width={260}
              height={40}
              loading="eager"
              priority
            />
          </Link>

          {/* Desktop nav links */}
          <div className="hidden items-center lg:flex">
            {NAV_LINKS.map((link) =>
              link.isDropdown ? (
                <div
                  key="services-dd"
                  className="relative"
                  onMouseEnter={openDropdown}
                  onMouseLeave={closeDropdown}
                >
                  <button
                    className="relative flex items-center gap-1 px-3.5 py-2 text-[20px] font-medium text-gray-100 transition-colors duration-150 hover:text-[#5E7AC4]"
                    aria-expanded={dropdownOpen}
                    aria-haspopup="true"
                  >
                    Services
                    {dropdownOpen ? (
                      <ChevronUp className="h-3.5 w-3.5 text-gray-400 transition-transform duration-200" />
                    ) : (
                      <ChevronDown className="h-3.5 w-3.5 text-gray-400 transition-transform duration-200" />
                    )}
                    {/* Active underline */}
                    <span
                      className="absolute -bottom-px left-2 right-2 h-0.5 rounded-full bg-[#5E7AC4] transition-opacity duration-200"
                      style={{ opacity: dropdownOpen ? 1 : 0 }}
                    />
                  </button>
                </div>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative flex items-center gap-0.75 px-3.5 py-2 text-[20px] font-medium text-gray-100 transition-colors duration-150 hover:text-[#5E7AC4]"
                >
                  {link.label}
                  {link.hasChevron && (
                    <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
                  )}
                  {isActive(link.href) && (
                    <span className="absolute -bottom-px left-2 right-2 h-0.5 rounded-full bg-[#5E7AC4]" />
                  )}
                </Link>
              ),
            )}
          </div>

          {/* Right side */}
          <div className="hidden items-center gap-4 lg:flex">
            <Link
              href="/book"
              className="rounded-lg bg-white px-4.5 py-2 text-[18px] font-semibold text-black transition-all duration-200 hover:bg-[#5E7AC4] hover:text-white active:scale-[0.97] active:bg-[#4a63a8]"
            >
              Book online
            </Link>
          </div>

          {/* Mobile right side — flag + hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <span
              className="text-lg leading-none select-none"
              role="img"
              aria-label={`${country.label} flag`}
            >
              {country.flag}
            </span>
            <button
              className="flex h-9 w-9 items-center justify-center rounded-md text-white hover:bg-white/10 transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>

        {/* ── Desktop Dropdown — shutter wrapper ── */}
        {/*
          Architecture:
          [dropdownWrapRef]  overflow:hidden, height: 0→auto  ← clips the shutter
            [dropdownPanelRef]  translateY: -100%→0%           ← slides up into clip
              [actual dropdown content]
        */}
        <div
          ref={dropdownWrapRef}
          className="absolute left-0 top-full z-50 w-full"
          // overflow hidden set via GSAP on mount
          onMouseEnter={() => clearTimeout(leaveTimerRef.current)}
          onMouseLeave={closeDropdown}
          aria-hidden={!dropdownOpen}
        >
          <div
            ref={dropdownPanelRef}
            className="w-full border-t border-gray-100 bg-white shadow-lg"
          >
            <div className="mx-auto max-w-7xl px-5 py-8 lg:px-10">
              {/* 3-col service grid */}
              <div
                ref={dropdownCardsRef}
                className="grid grid-cols-3 gap-x-10 gap-y-6"
              >
                {SERVICES.map((service) => {
                  const Icon = service.icon;
                  return (
                    <Link
                      key={service.href}
                      href={service.href}
                      className="svc-card group flex items-start gap-4 rounded-xl px-5 py-5 transition-colors duration-150 hover:bg-gray-50"
                      onClick={dismissDropdown}
                    >
                      {/* Circle icon */}
                      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white transition-colors duration-150 group-hover:border-[#5E7AC4]/40 group-hover:bg-[#5E7AC4]/5">
                        <Icon
                          className="h-4.5 w-4.5 text-gray-600 transition-colors duration-150 group-hover:text-[#5E7AC4]"
                          strokeWidth={1.5}
                        />
                      </div>
                      {/* Text */}
                      <div className="min-w-0">
                        <p className="text-[14px] font-semibold leading-tight text-gray-900 transition-colors duration-150 group-hover:text-[#5E7AC4]">
                          {service.label}
                        </p>
                        <p className="mt-1 text-[13px] leading-snug text-gray-500">
                          {service.desc}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Contact Us CTA */}
              <div className="mt-7 border-t border-gray-100 pt-5">
                <Link
                  href="/contact"
                  className="inline-flex items-center rounded-lg border border-gray-900 px-4 py-2.25 text-[13px] font-semibold text-gray-900 transition-all duration-200 hover:border-[#5E7AC4] hover:bg-[#5E7AC4] hover:text-white"
                  onClick={dismissDropdown}
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile overlay ── */}
      <div
        ref={mobileOverlayRef}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-[2px] lg:hidden"
        onClick={() => setMobileOpen(false)}
      />

      {/* ── Mobile slide-in panel ── */}
      <div
        ref={mobileMenuRef}
        className={`fixed right-0 top-0 z-50 flex h-full w-75 flex-col bg-[#0d0d0d] shadow-2xl lg:hidden ${urbanist.className}`}
        style={{ borderLeft: "1px solid rgba(255,255,255,0.08)" }}
      >
        {/* Mobile header */}
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="flex items-center gap-2">
            <Image
              src="/black_logo.png"
              alt="Airflow Hub Logo"
              width={120}
              height={28}
              className="brightness-200"
            />
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-white/50 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Country badge */}
        <div
          className="flex items-center gap-2 px-5 py-3"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
        >
          <span className="text-base leading-none">{country.flag}</span>
          <span className="text-[12px] font-medium text-white/40 uppercase tracking-widest">
            {country.label}
          </span>
        </div>

        {/* Mobile links */}
        <div className="flex-1 overflow-y-auto px-3 py-3">
          {/* Services accordion */}
          <div>
            <button
              className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-[15px] font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-white"
              onClick={() => setMobileServicesOpen((v) => !v)}
            >
              Services
              <ChevronDown
                className={`h-4 w-4 text-white/40 transition-transform duration-300 ${
                  mobileServicesOpen ? "rotate-180 text-[#5E7AC4]" : ""
                }`}
              />
            </button>

            <div
              ref={mobileServicesRef}
              className="overflow-hidden"
              style={{ height: 0, opacity: 0 }}
            >
              <div
                className="ml-3 pb-2 pl-3"
                style={{ borderLeft: "1px solid rgba(255,255,255,0.1)" }}
              >
                {SERVICES.map((service) => {
                  const Icon = service.icon;
                  return (
                    <Link
                      key={service.href}
                      href={service.href}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] text-white/60 transition-colors hover:bg-white/5 hover:text-white"
                      onClick={() => setMobileOpen(false)}
                    >
                      <Icon
                        className="h-4 w-4 shrink-0 text-[#5E7AC4]"
                        strokeWidth={1.5}
                      />
                      {service.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Other nav links */}
          {NAV_LINKS.filter((l) => !l.isDropdown).map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center justify-between rounded-xl px-4 py-3 text-[15px] font-medium transition-colors ${
                isActive(link.href)
                  ? "bg-white/5 text-[#5E7AC4]"
                  : "text-white/80 hover:bg-white/5 hover:text-white"
              }`}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
              {link.hasChevron && (
                <ChevronDown className="h-3.5 w-3.5 text-white/30" />
              )}
            </Link>
          ))}
        </div>

        {/* Mobile footer CTA */}
        <div
          className="p-4 space-y-2"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <Link
            href="/book"
            className="flex w-full items-center justify-center rounded-xl bg-white py-3 text-[15px] font-semibold text-black transition-all duration-200 hover:bg-[#5E7AC4] hover:text-white active:scale-[0.98]"
            onClick={() => setMobileOpen(false)}
          >
            Book online
          </Link>
          <Link
            href="/contact"
            className="flex w-full items-center justify-center rounded-xl py-3 text-[14px] font-medium text-white/50 transition-colors hover:text-white"
            onClick={() => setMobileOpen(false)}
            style={{ border: "1px solid rgba(255,255,255,0.1)" }}
          >
            Contact Us
          </Link>
        </div>
      </div>
    </>
  );
}
