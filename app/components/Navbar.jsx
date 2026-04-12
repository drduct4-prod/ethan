"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
    img: "/us_flag.png",
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
    img: "/ca_flag.png",
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
// Services data — hrefs are base paths (no country prefix).
// The withCountry() helper prepends the active country at render time.
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

// Base hrefs — country prefix is applied via withCountry()
// isAnchor: true → smooth-scroll to section id, no page navigation
const NAV_LINKS = [
  { label: "Services", href: "#", isDropdown: true },
  { label: "What We Do", href: "#what-we-do", isAnchor: true },
  { label: "Reviews", href: "#reviews", isAnchor: true },
];

// ─────────────────────────────────────────────
// Helper — strip leading country segment from pathname
// e.g. /us/services/air-duct-cleaning → /services/air-duct-cleaning
// ─────────────────────────────────────────────
function stripCountryPrefix(pathname) {
  const segments = pathname?.split("/").filter(Boolean) ?? [];
  if (segments[0] && COUNTRY_CONFIG[segments[0].toLowerCase()]) {
    return "/" + segments.slice(1).join("/");
  }
  return pathname ?? "/";
}

// ─────────────────────────────────────────────
// Custom hook — resolve country from pathname
// ─────────────────────────────────────────────
function useCountryFromPath() {
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
  const router = useRouter();

  // Derive country from URL on first render; stay in sync on navigation
  const pathCountry = useCountryFromPath();
  const [selectedCountry, setSelectedCountry] = useState(pathCountry);
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);

  // Keep selectedCountry in sync when the user navigates (e.g. browser back)
  useEffect(() => {
    setSelectedCountry(pathCountry);
  }, [pathCountry]);

  const country = COUNTRY_CONFIG[selectedCountry];

  // ── Country switching ─────────────────────
  const handleCountryChange = useCallback(
    (code) => {
      if (code === selectedCountry) {
        setCountryDropdownOpen(false);
        return;
      }
      setSelectedCountry(code);
      setCountryDropdownOpen(false);

      // Navigate to the same base path under the new country prefix
      const basePath = stripCountryPrefix(pathname);
      router.push(`/${code}${basePath === "/" ? "" : basePath}`);
    },
    [selectedCountry, pathname, router],
  );

  // ── Link helper — prefix every path with active country ──
  // Anchor hrefs (starting with #) are passed through unchanged
  const withCountry = useCallback(
    (href) => {
      if (!href || href === "#" || href.startsWith("http") || href.startsWith("#")) return href;
      return `/${selectedCountry}${href}`;
    },
    [selectedCountry],
  );

  // ── Active-link check (country-aware) ────
  const isActive = useCallback(
    (href) => {
      if (href === "#" || href.startsWith("#")) return false;
      const prefixed = withCountry(href);
      return pathname === prefixed || pathname.startsWith(prefixed + "/");
    },
    [pathname, withCountry],
  );

  // ── Anchor scroll handler ─────────────────
  // Smoothly scrolls to the section with matching id, closes mobile menu if open
  const handleAnchorClick = useCallback((e, href) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  // ── UI state ──────────────────────────────
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  // ── Refs ──────────────────────────────────
  const dropdownWrapRef = useRef(null);
  const dropdownPanelRef = useRef(null);
  const dropdownCardsRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const mobileOverlayRef = useRef(null);
  const mobileServicesRef = useRef(null);
  const leaveTimerRef = useRef(null);
  const dropdownInitRef = useRef(false);
  const countryDropdownRef = useRef(null);

  // ── Close country dropdown on outside click ──
  useEffect(() => {
    if (!countryDropdownOpen) return;
    const handler = (e) => {
      if (
        countryDropdownRef.current &&
        !countryDropdownRef.current.contains(e.target)
      ) {
        setCountryDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [countryDropdownOpen]);

  // ── Desktop dropdown — shutter init ───────
  useEffect(() => {
    if (!dropdownWrapRef.current || !dropdownPanelRef.current) return;
    gsap.set(dropdownWrapRef.current, { height: 0, overflow: "hidden" });
    gsap.set(dropdownPanelRef.current, { y: "-100%" });
    dropdownInitRef.current = true;
  }, []);

  const openDropdown = () => {
    if (!dropdownInitRef.current) return;
    clearTimeout(leaveTimerRef.current);
    setDropdownOpen(true);

    gsap.killTweensOf(dropdownWrapRef.current);
    gsap.killTweensOf(dropdownPanelRef.current);

    gsap.to(dropdownWrapRef.current, {
      height: "auto",
      duration: 0.38,
      ease: "power3.out",
    });

    gsap.to(dropdownPanelRef.current, {
      y: "0%",
      duration: 0.38,
      ease: "power3.out",
    });

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

      gsap.to(dropdownPanelRef.current, {
        y: "-100%",
        duration: 0.26,
        ease: "power2.in",
      });
      gsap.to(dropdownWrapRef.current, {
        height: 0,
        duration: 0.28,
        ease: "power2.in",
        delay: 0.04,
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

  return (
    <>
      {/* ── Animated sweep line keyframes ── */}
      <style>{`
        @keyframes navLineSweep {
          0%   { left: -55%; }
          100% { left: 160%; }
        }
      `}</style>

      {/* ── Announcement bar ── */}
      <div
        className={`relative z-50 flex items-center justify-center gap-2 py-2.25 px-4 text-[13px] text-gray-800 ${inter.className}`}
        style={{ backgroundColor: "#dff0ea" }}
      >
        {/* ── Country selector ── */}
        <div ref={countryDropdownRef} className="relative">
          <button
            onClick={() => setCountryDropdownOpen((v) => !v)}
            className="flex items-center gap-1.5 rounded-md px-1.5 py-0.5 transition-colors hover:bg-black/5"
            aria-label="Select country"
            aria-expanded={countryDropdownOpen}
            aria-haspopup="listbox"
          >
            <Image
              src={country.img}
              alt={`${country.label} flag`}
              width={20}
              height={15}
              className="rounded-xs"
            />
            <span className="text-[12px] font-semibold text-gray-700 uppercase tracking-wide">
              {country.label}
            </span>
            <ChevronDown
              className={`h-3 w-3 text-gray-500 transition-transform duration-200 ${
                countryDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Country dropdown panel */}
          {countryDropdownOpen && (
            <div
              className="absolute left-0 top-full z-50 mt-1.5 min-w-27.5 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg"
              role="listbox"
              aria-label="Select country"
            >
              {Object.entries(COUNTRY_CONFIG).map(([code, cfg]) => (
                <button
                  key={code}
                  role="option"
                  aria-selected={code === selectedCountry}
                  onClick={() => handleCountryChange(code)}
                  className={`flex w-full items-center gap-2 px-3 py-2 text-[13px] font-medium transition-colors hover:bg-gray-50 ${
                    code === selectedCountry
                      ? "text-gray-900 bg-gray-50"
                      : "text-gray-600"
                  }`}
                >
                  <Image
                    src={cfg.img}
                    alt={`${cfg.label} flag`}
                    width={18}
                    height={13}
                    className="rounded-xs"
                  />
                  {cfg.label}
                  {code === selectedCountry && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#5E7AC4]" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Promo text */}
        <span>{country.promoText}</span>
      </div>

      {/* ── Main navbar ── */}
      <header
        className={`sticky top-0 z-40 w-full border-b border-white/10 bg-black ${urbanist.className}`}
      >
        {/* Nav row */}
        <nav className="mx-auto flex h-17 max-w-350 items-center justify-between px-5 lg:px-10">
          {/* Logo */}
          <Link href={withCountry("/")} className="flex shrink-0 items-center gap-2">
            <Image
              src="/black_logo.png"
              alt="Ethan Duct Cleaning"
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
                    <span
                      className="absolute -bottom-px left-2 right-2 h-0.5 rounded-full bg-[#5E7AC4] transition-opacity duration-200"
                      style={{ opacity: dropdownOpen ? 1 : 0 }}
                    />
                  </button>
                </div>
              ) : link.isAnchor ? (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className="relative flex items-center gap-0.75 px-3.5 py-2 text-[20px] font-medium text-gray-100 transition-colors duration-150 hover:text-[#5E7AC4] cursor-pointer"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={withCountry(link.href)}
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
              href={("/contactus")}
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
        <div
          ref={dropdownWrapRef}
          className="absolute left-0 top-full z-50 w-full"
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
                      href={withCountry(service.href)}
                      className="svc-card group flex items-start gap-4 rounded-xl px-5 py-5 transition-colors duration-150 hover:bg-gray-50"
                      onClick={dismissDropdown}
                    >
                      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white transition-colors duration-150 group-hover:border-[#5E7AC4]/40 group-hover:bg-[#5E7AC4]/5">
                        <Icon
                          className="h-4.5 w-4.5 text-gray-600 transition-colors duration-150 group-hover:text-[#5E7AC4]"
                          strokeWidth={1.5}
                        />
                      </div>
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
                  href={("/contactus")}
                  className="inline-flex items-center rounded-lg border border-gray-900 px-4 py-2.25 text-[13px] font-semibold text-gray-900 transition-all duration-200 hover:border-[#5E7AC4] hover:bg-[#5E7AC4] hover:text-white"
                  onClick={dismissDropdown}
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ── Animated sweep line — absolutely positioned at navbar bottom ── */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "1px",
            overflow: "hidden",
            pointerEvents: "none",
            zIndex: 1,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              height: "100%",
              width: "55%",
              background:
                "linear-gradient(90deg, transparent 0%, #5E7AC4 35%, #7b96d4 50%, #5E7AC4 65%, transparent 100%)",
              boxShadow: "0 0 8px #5E7AC4, 0 0 16px #5E7AC480",
              animation: "navLineSweep 2s linear infinite",
            }}
          />
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
        className={`fixed right-4 top-0 z-50 flex h-full w-75 flex-col bg-[#0d0d0d] shadow-2xl lg:hidden ${urbanist.className}`}
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

        {/* Country selector — mobile */}
        <div
          className="flex items-center gap-2 px-5 py-3"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
        >
          <div className="flex items-center gap-2">
            {Object.entries(COUNTRY_CONFIG).map(([code, cfg]) => (
              <button
                key={code}
                onClick={() => handleCountryChange(code)}
                className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[12px] font-medium uppercase tracking-widest transition-colors ${
                  code === selectedCountry
                    ? "bg-white/10 text-white"
                    : "text-white/40 hover:bg-white/5 hover:text-white/70"
                }`}
                aria-pressed={code === selectedCountry}
              >
                <span className="text-base leading-none">{cfg.flag}</span>
                {cfg.label}
              </button>
            ))}
          </div>
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
                      href={withCountry(service.href)}
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
          {NAV_LINKS.filter((l) => !l.isDropdown).map((link) =>
            link.isAnchor ? (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  handleAnchorClick(e, link.href);
                  setMobileOpen(false);
                }}
                className="flex items-center justify-between rounded-xl px-4 py-3 text-[15px] font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-white cursor-pointer"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={withCountry(link.href)}
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
            ),
          )}
        </div>

        {/* Mobile footer CTA */}
        <div
          className="p-4 space-y-2"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <Link
            href={withCountry("/contact-us")}
            className="flex w-full items-center justify-center rounded-xl bg-white py-3 text-[15px] font-semibold text-black transition-all duration-200 hover:bg-[#5E7AC4] hover:text-white active:scale-[0.98]"
            onClick={() => setMobileOpen(false)}
          >
            Book online
          </Link>
          <Link
            href={withCountry("/contact")}
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