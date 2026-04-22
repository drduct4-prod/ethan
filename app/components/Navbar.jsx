"use client";

import { useEffect, useRef, useState, useCallback } from "react";
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
  Globe,
  MapPin,
} from "lucide-react";
import { urbanist, inter } from "../fonts";
import Image from "next/image";
import { useLang } from "../context/LanguageContext";

// ─── Services config ──────────────────────────────────────────
const SERVICE_SLUGS = [
  {
    slug: "air-duct-cleaning",
    href: "/services/air-duct-cleaning",
    icon: Wind,
  },
  {
    slug: "air-exchanger-cleaning",
    href: "/services/air-exchanger-cleaning",
    icon: RefreshCw,
  },
  {
    slug: "heat-pump-cleaning",
    href: "/services/heat-pump-cleaning",
    icon: Thermometer,
  },
  {
    slug: "dryer-vent-cleaning",
    href: "/services/dryer-vent-cleaning",
    icon: Shirt,
  },
  {
    slug: "furnace-blower-cleaning",
    href: "/services/furnace-blower-cleaning",
    icon: Fan,
  },
  {
    slug: "central-vacuum-cleaning",
    href: "/services/central-vacuum-cleaning",
    icon: Gauge,
  },
];

// ─── Areas config ─────────────────────────────────────────────
const AREAS_CONFIG = [
  {
    country: "ca",
    label: "Canada",
    flag: "ca_flag.png",
    provinces: [
      {
        label: "Ontario",
        slug: "ontario",
        cities: [
          "Toronto",
          "Oshawa",
          "Whitby",
          "Ajax",
          "Pickering",
          "New Market",
          "Vaughn",
          "Richmond Hill",
          "Markham",
          "Brampton",
          "Mississauga",
          "North York",
          "Bradford",
          "Keswick",
          "Barrie",
          "Aurora",
          "East Gwillimbury",
          "Oakville",
          "Burlington",
          "Hamilton",
          "Brantford",
          "Kitchener",
          "Cambridge",
          "Waterloo",
          "Guelph",
          "St Catharines",
          "Niagara Falls",
          "Welland",
          "Woodstock",
          "St. Thomas",
          "London",
          "Windsor",
          "Essex",
          "Amherstburg",
          "Kingsville",
          "Lakeshore",
          "LaSalle",
          "Tilbury",
          "Chatham",
          "Ottawa",
        ],
      },
      {
        label: "Quebec",
        slug: "quebec",
        cities: [
          "Montreal",
          "Saint Therese",
          "Saint Jerome",
          "Mascouche",
          "L'Assomption",
          "Sainte-Anne-des-Plaines",
          "Laval",
          "Rosemere",
          "Boisbriand",
          "Saint Eustache",
          "Mirabel",
          "Sainte-Colomban",
          "Brossard",
          "Longueuil",
          "Boucherville",
          "Beloeil",
          "St-Bruno-de-Montarville",
          "Saint Hubert",
          "Saint Lambert",
          "Candiac",
          "Sainte Catherine",
          "Chateauguay",
          "Delson",
          "Saint Constant",
          "Chambly",
          "Kahnawake",
          "Saint Jean Sur Richelieu",
          "Marieville",
          "Sainte Julie",
          "Saint Hyacinthe",
        ],
      },
      {
        label: "British Columbia",
        slug: "british-columbia",
        cities: [
          "Vancouver",
          "North Vancouver",
          "West Vancouver",
          "Surrey",
          "Burnaby",
          "Richmond",
          "Coquitlam",
        ],
      },
      {
        label: "Alberta",
        slug: "alberta",
        cities: ["Calgary", "Edmonton"],
      },
      {
        label: "Manitoba",
        slug: "manitoba",
        cities: ["Winnipeg"],
      },
    ],
  },
  {
    country: "us",
    label: "USA",
    flag: "us_flag.png",
    provinces: [
      {
        label: "Texas",
        slug: "texas",
        cities: ["Dallas", "Austin", "San Antonio", "Houston"],
      },
      {
        label: "Florida",
        slug: "florida",
        cities: [
          "Pensacola",
          "Naples",
          "Sarasota",
          "Tampa",
          "Orlando",
          "Miami",
          "Jacksonville",
          "Palm Beach",
          "Tallahassee",
        ],
      },
      {
        label: "Virginia",
        slug: "virginia",
        cities: ["Alexandria", "Woodbridge", "Richmond", "Norfolk"],
      },
      { label: "Maryland", slug: "maryland", cities: ["Baltimore"] },
      { label: "Arizona", slug: "arizona", cities: ["Phoenix", "Tucson"] },
      {
        label: "Colorado",
        slug: "colorado",
        cities: ["Denver", "Colorado Springs"],
      },
      {
        label: "New Jersey",
        slug: "new-jersey",
        cities: ["Jersey City", "Red Bank"],
      },
      {
        label: "New York",
        slug: "new-york",
        cities: ["New York City", "Long Island"],
      },
      {
        label: "Pennsylvania",
        slug: "pennsylvania",
        cities: ["Philadelphia", "Pittsburgh"],
      },
      {
        label: "California",
        slug: "california",
        cities: [
          "Los Angeles",
          "Sacramento",
          "Fresno",
          "San Diego",
          "San Jose",
        ],
      },
      { label: "Illinois", slug: "illinois", cities: ["Chicago"] },
      {
        label: "Indiana",
        slug: "indiana",
        cities: ["Indianapolis", "South Bend", "Fort Wayne"],
      },
      { label: "Michigan", slug: "michigan", cities: ["Detroit"] },
      { label: "Georgia", slug: "georgia", cities: ["Atlanta"] },
      { label: "Washington", slug: "washington", cities: ["Seattle"] },
      {
        label: "Missouri / Kansas",
        slug: "missouri-kansas",
        cities: ["Kansas City MO", "St. Louis MO", "Kansas City KS"],
      },
      { label: "Utah", slug: "utah", cities: ["Salt Lake City"] },
      { label: "Massachusetts", slug: "massachusetts", cities: ["Boston"] },
      {
        label: "North Carolina / South Carolina",
        slug: "north-south-carolina",
        cities: ["Charlotte", "Raleigh", "Durham"],
      },
    ],
  },
];

// ─── Nav links ────────────────────────────────────────────────
const NAV_LINKS = [
  { key: "services", href: "#", isDropdown: true },
  { key: "areas", href: "#", isAreasDropdown: true },
  { key: "whatWeDo", href: "#what-we-do", isAnchor: true },
  { key: "reviews", href: "#reviews", isAnchor: true },
];

const LANG_OPTIONS = [
  { code: "en", label: "EN" },
  { code: "es", label: "SP" },
  { code: "fr", label: "FR" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { lang, t, setLang } = useLang();

  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  const handleAnchorClick = useCallback((e, href) => {
    e.preventDefault();
    const el = document.getElementById(href.replace("#", ""));
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  // ── UI state ──────────────────────────────
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [areasDropdownOpen, setAreasDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileAreasOpen, setMobileAreasOpen] = useState(false);

  // ── Refs: services dropdown ───────────────
  const dropdownWrapRef = useRef(null);
  const dropdownPanelRef = useRef(null);
  const dropdownCardsRef = useRef(null);
  const leaveTimerRef = useRef(null);
  const dropdownInitRef = useRef(false);

  // ── Refs: areas dropdown ──────────────────
  const areasWrapRef = useRef(null);
  const areasPanelRef = useRef(null);
  const areasLeaveTimer = useRef(null);
  const areasInitRef = useRef(false);

  // ── Refs: mobile ──────────────────────────
  const mobileMenuRef = useRef(null);
  const mobileOverlayRef = useRef(null);
  const mobileServicesRef = useRef(null);
  const mobileAreasRef = useRef(null);

  // ── Refs: header dropdowns ────────────────
  const langDropdownRef = useRef(null);

  // ── Close dropdowns on outside click ──────
  useEffect(() => {
    if (!langDropdownOpen) return;
    const handler = (e) => {
      if (
        langDropdownRef.current &&
        !langDropdownRef.current.contains(e.target)
      )
        setLangDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [langDropdownOpen]);

  // ── Desktop: services dropdown GSAP init ──
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

  // ── Desktop: areas dropdown GSAP init ─────
  useEffect(() => {
    if (!areasWrapRef.current || !areasPanelRef.current) return;
    gsap.set(areasWrapRef.current, { height: 0, overflow: "hidden" });
    gsap.set(areasPanelRef.current, { y: "-100%" });
    areasInitRef.current = true;
  }, []);

  const openAreasDropdown = () => {
    if (!areasInitRef.current) return;
    clearTimeout(areasLeaveTimer.current);
    setAreasDropdownOpen(true);
    gsap.killTweensOf(areasWrapRef.current);
    gsap.killTweensOf(areasPanelRef.current);
    gsap.to(areasWrapRef.current, {
      height: "auto",
      duration: 0.38,
      ease: "power3.out",
    });
    gsap.to(areasPanelRef.current, {
      y: "0%",
      duration: 0.38,
      ease: "power3.out",
    });
  };

  const closeAreasDropdown = () => {
    if (!areasInitRef.current) return;
    areasLeaveTimer.current = setTimeout(() => {
      setAreasDropdownOpen(false);
      gsap.killTweensOf(areasWrapRef.current);
      gsap.killTweensOf(areasPanelRef.current);
      gsap.to(areasPanelRef.current, {
        y: "-100%",
        duration: 0.26,
        ease: "power2.in",
      });
      gsap.to(areasWrapRef.current, {
        height: 0,
        duration: 0.28,
        ease: "power2.in",
        delay: 0.04,
      });
    }, 90);
  };

  const dismissAreasDropdown = () => {
    if (!areasInitRef.current) return;
    setAreasDropdownOpen(false);
    gsap.killTweensOf(areasWrapRef.current);
    gsap.killTweensOf(areasPanelRef.current);
    gsap.set(areasWrapRef.current, { height: 0 });
    gsap.set(areasPanelRef.current, { y: "-100%" });
  };

  // ── Mobile GSAP ───────────────────────────
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

  useEffect(() => {
    if (!mobileServicesRef.current) return;
    if (mobileServicesOpen) {
      gsap.fromTo(
        mobileServicesRef.current,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.32, ease: "power3.out" },
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

  useEffect(() => {
    if (!mobileAreasRef.current) return;
    if (mobileAreasOpen) {
      gsap.fromTo(
        mobileAreasRef.current,
        { height: 0, opacity: 0 },
        { height: "auto", opacity: 1, duration: 0.32, ease: "power3.out" },
      );
    } else {
      gsap.to(mobileAreasRef.current, {
        height: 0,
        opacity: 0,
        duration: 0.22,
        ease: "power2.in",
      });
    }
  }, [mobileAreasOpen]);

  return (
    <>
      <style>{`
        @keyframes navLineSweep { 0% { left: -55%; } 100% { left: 160%; } }
      `}</style>

      {/* ── Announcement bar ── */}
      <div
        className={`relative z-50 flex items-center justify-center gap-2 py-2.25 px-4 text-[13px] text-gray-800 ${inter.className}`}
        style={{ backgroundColor: "#dff0ea" }}
      >
        {/* ── Language switcher ── */}
        <div ref={langDropdownRef} className="relative">
          <button
            onClick={() => setLangDropdownOpen((v) => !v)}
            className="flex items-center gap-1 rounded-md px-1.5 py-0.5 transition-colors hover:bg-black/5"
            aria-label="Select language"
            aria-expanded={langDropdownOpen}
          >
            <Globe className="h-3.5 w-3.5 text-gray-500" />
            <span className="text-[12px] font-semibold text-gray-700 uppercase tracking-wide">
              {lang}
            </span>
            <ChevronDown
              className={`h-3 w-3 text-gray-500 transition-transform duration-200 ${langDropdownOpen ? "rotate-180" : ""}`}
            />
          </button>
          {langDropdownOpen && (
            <div
              className="absolute left-0 top-full z-50 mt-1.5 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg"
              role="listbox"
            >
              {LANG_OPTIONS.map(({ code, label }) => (
                <button
                  key={code}
                  role="option"
                  aria-selected={code === lang}
                  onClick={() => {
                    setLang(code);
                    setLangDropdownOpen(false);
                  }}
                  className={`flex w-full items-center gap-2 px-4 py-2 text-[13px] font-medium transition-colors hover:bg-gray-50 ${code === lang ? "text-gray-900 bg-gray-50" : "text-gray-600"}`}
                >
                  {label}
                  {code === lang && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[#5E7AC4]" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Promo */}
        <span className="text-[0.6rem] lg:text-[0.9rem]">
          <strong className="font-bold">{t.nav.promoStrong}</strong>{" "}
          {t.nav.promoRest}
        </span>
      </div>

      {/* ── Main navbar ── */}
      <header
        className={`sticky top-0 z-40 w-full border-b border-white/10 bg-black ${urbanist.className}`}
      >
        <nav className="mx-auto flex h-17 max-w-350 items-center justify-between px-5 lg:px-10">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center gap-2">
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
            {NAV_LINKS.map((link) => {
              if (link.isDropdown) {
                return (
                  <div
                    key="services-dd"
                    className="relative"
                    onMouseEnter={openDropdown}
                    onMouseLeave={closeDropdown}
                  >
                    <button
                      className="relative flex items-center gap-1 px-3.5 py-2 text-[20px] font-medium text-gray-100 transition-colors duration-150 hover:text-[#5E7AC4]"
                      aria-expanded={dropdownOpen}
                    >
                      {t.nav.services}
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
                );
              }

              if (link.isAreasDropdown) {
                return (
                  <div
                    key="areas-dd"
                    className="relative"
                    onMouseEnter={openAreasDropdown}
                    onMouseLeave={closeAreasDropdown}
                  >
                    <button
                      className="relative flex items-center gap-1 px-3.5 py-2 text-[20px] font-medium text-gray-100 transition-colors duration-150 hover:text-[#5E7AC4]"
                      aria-expanded={areasDropdownOpen}
                    >
                      {t.nav?.areas ?? "Areas"}
                      {areasDropdownOpen ? (
                        <ChevronUp className="h-3.5 w-3.5 text-gray-400 transition-transform duration-200" />
                      ) : (
                        <ChevronDown className="h-3.5 w-3.5 text-gray-400 transition-transform duration-200" />
                      )}
                      <span
                        className="absolute -bottom-px left-2 right-2 h-0.5 rounded-full bg-[#5E7AC4] transition-opacity duration-200"
                        style={{ opacity: areasDropdownOpen ? 1 : 0 }}
                      />
                    </button>
                  </div>
                );
              }

              if (link.isAnchor) {
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className="relative flex items-center gap-0.75 px-3.5 py-2 text-[20px] font-medium text-gray-100 transition-colors duration-150 hover:text-[#5E7AC4] cursor-pointer"
                  >
                    {t.nav[link.key]}
                  </a>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative flex items-center gap-0.75 px-3.5 py-2 text-[20px] font-medium text-gray-100 transition-colors duration-150 hover:text-[#5E7AC4]"
                >
                  {t.nav[link.key]}
                </Link>
              );
            })}
          </div>

          {/* Right side */}
          <div className="hidden items-center gap-4 lg:flex">
            <Link
              href="/contactus"
              className="rounded-lg bg-white px-4.5 py-2 text-[18px] font-semibold text-black transition-all duration-200 hover:bg-[#5E7AC4] hover:text-white active:scale-[0.97] active:bg-[#4a63a8]"
            >
              {t.nav.bookOnline}
            </Link>
          </div>

          {/* Mobile right */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              className="flex h-9 w-9 items-center justify-center rounded-md text-white hover:bg-white/10 transition-colors"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>

        {/* ── Desktop Services Dropdown ── */}
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
              <div
                ref={dropdownCardsRef}
                className="grid grid-cols-3 gap-x-10 gap-y-6"
              >
                {SERVICE_SLUGS.map((svc) => {
                  const Icon = svc.icon;
                  const info = t.servicesSection.list[svc.slug];
                  return (
                    <Link
                      key={svc.slug}
                      href={svc.href}
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
                          {info.title}
                        </p>
                        <p className="mt-1 text-[13px] leading-snug text-gray-500">
                          {info.description}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
              <div className="mt-7 border-t border-gray-100 pt-5">
                <Link
                  href="/contactus"
                  className="inline-flex items-center rounded-lg border border-gray-900 px-4 py-2.25 text-[13px] font-semibold text-gray-900 transition-all duration-200 hover:border-[#5E7AC4] hover:bg-[#5E7AC4] hover:text-white"
                  onClick={dismissDropdown}
                >
                  {t.nav.contactUs}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* ── Desktop Areas Dropdown ── */}
        <div
          ref={areasWrapRef}
          className="absolute left-0 top-full z-50 w-full"
          onMouseEnter={() => clearTimeout(areasLeaveTimer.current)}
          onMouseLeave={closeAreasDropdown}
          aria-hidden={!areasDropdownOpen}
        >
          <div
            ref={areasPanelRef}
            className="w-full border-t border-gray-100 bg-white shadow-lg"
          >
            <div className="mx-auto max-w-7xl px-5 py-8 lg:px-10">
              <div
                className="grid grid-cols-2 gap-x-14"
                style={{ maxHeight: "65vh", overflowY: "auto" }}
              >
                {AREAS_CONFIG.map((region) => (
                  <div key={region.country}>
                    {/* Country heading */}
                    <div className="mb-5 flex items-center gap-2">
                      <MapPin
                        className="h-4 w-4 text-[#5E7AC4]"
                        strokeWidth={2}
                      />
                      <h3 className="text-[11px] font-bold uppercase tracking-widest text-[#5E7AC4]">
                        {region.label}{" "}
                        <img
                          className="h-5"
                          src={`/${region.flag}`}
                          alt={`${region.label} flag`}
                        />
                      </h3>
                    </div>
                    <div className="space-y-5">
                      {region.provinces.map((province) => (
                        <div key={province.slug}>
                          {/* Province heading */}
                          <p className="mb-2 text-[12px] font-bold uppercase tracking-wider text-gray-700 border-b border-gray-100 pb-1">
                            {province.label}
                          </p>
                          {/* Cities */}
                          <div className="flex flex-wrap gap-x-2 gap-y-1.5">
                            {province.cities.map((city) => (
                              <Link
                                key={city}
                                // href={`/${region.country}/areas/${province.slug}/${toCitySlug(city)}`}
                                href={`#`}
                                onClick={dismissAreasDropdown}
                                className="text-[12px] text-gray-500 transition-colors duration-150 hover:text-[#5E7AC4] whitespace-nowrap"
                              >
                                {city}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-7 border-t border-gray-100 pt-5">
                <Link
                  href="/contactus"
                  className="inline-flex items-center rounded-lg border border-gray-900 px-4 py-2.25 text-[13px] font-semibold text-gray-900 transition-all duration-200 hover:border-[#5E7AC4] hover:bg-[#5E7AC4] hover:text-white"
                  onClick={dismissAreasDropdown}
                >
                  {t.nav.contactUs}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Sweep line */}
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

      {/* ── Mobile panel ── */}
      <div
        ref={mobileMenuRef}
        className={`fixed right-0 top-0 z-50 flex h-full w-75 flex-col bg-[#0d0d0d] shadow-2xl lg:hidden ${urbanist.className}`}
        style={{ borderLeft: "1px solid rgba(255,255,255,0.08)" }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-4"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
        >
          <Image
            src="/black_logo.png"
            alt="Logo"
            width={120}
            height={28}
            className="brightness-200"
          />
          <button
            onClick={() => setMobileOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-white/50 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Language selector */}
        <div
          className="flex items-center justify-between gap-2 px-5 py-3"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}
        >
          <div className="flex items-center gap-1">
            {LANG_OPTIONS.map(({ code, label }) => (
              <button
                key={code}
                onClick={() => setLang(code)}
                className={`rounded-lg px-2 py-1.5 text-[11px] font-bold uppercase tracking-widest transition-colors ${code === lang ? "bg-[#5E7AC4]/20 text-[#5E7AC4]" : "text-white/40 hover:bg-white/5 hover:text-white/70"}`}
                aria-pressed={code === lang}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="flex-1 overflow-y-auto px-3 py-3">
          {/* Services accordion */}
          <div>
            <button
              className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-[15px] font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-white"
              onClick={() => setMobileServicesOpen((v) => !v)}
            >
              {t.nav.services}
              <ChevronDown
                className={`h-4 w-4 text-white/40 transition-transform duration-300 ${mobileServicesOpen ? "rotate-180 text-[#5E7AC4]" : ""}`}
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
                {SERVICE_SLUGS.map((svc) => {
                  const Icon = svc.icon;
                  const info = t.servicesSection.list[svc.slug];
                  return (
                    <Link
                      key={svc.slug}
                      href={svc.href}
                      className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[13px] text-white/60 transition-colors hover:bg-white/5 hover:text-white"
                      onClick={() => setMobileOpen(false)}
                    >
                      <Icon
                        className="h-4 w-4 shrink-0 text-[#5E7AC4]"
                        strokeWidth={1.5}
                      />
                      {info.title}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Areas accordion */}
          <div>
            <button
              className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-[15px] font-medium text-white/80 transition-colors hover:bg-white/5 hover:text-white"
              onClick={() => setMobileAreasOpen((v) => !v)}
            >
              {t.nav?.areas ?? "Areas"}
              <ChevronDown
                className={`h-4 w-4 text-white/40 transition-transform duration-300 ${mobileAreasOpen ? "rotate-180 text-[#5E7AC4]" : ""}`}
              />
            </button>
            <div
              ref={mobileAreasRef}
              className="overflow-hidden"
              style={{ height: 0, opacity: 0 }}
            >
              <div
                className="ml-3 pb-2 pl-3"
                style={{ borderLeft: "1px solid rgba(255,255,255,0.1)" }}
              >
                {AREAS_CONFIG.map((region) => (
                  <div key={region.country} className="mb-3">
                    {/* Country label */}
                    <div className="flex items-center gap-1.5 px-3 py-1.5">
                      <MapPin
                        className="h-3 w-3 text-[#5E7AC4]"
                        strokeWidth={2}
                      />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#5E7AC4]">
                        {region.label}
                      </span>
                    </div>
                    {region.provinces.map((province) => (
                      <div key={province.slug} className="mb-2">
                        {/* Province label */}
                        <p className="px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white/30">
                          {province.label}
                        </p>
                        {/* Cities */}
                        <div className="flex flex-wrap gap-1.5 px-3 pb-1">
                          {province.cities.map((city) => (
                            <Link
                              key={city}
                              // href={`/${region.country}/areas/${province.slug}/${toCitySlug(city)}`}
                              href={`#`}
                              onClick={() => setMobileOpen(false)}
                              className="rounded-md bg-white/5 px-2 py-1 text-[11px] text-white/55 transition-colors hover:bg-[#5E7AC4]/15 hover:text-[#5E7AC4]"
                            >
                              {city}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Other links */}
          {NAV_LINKS.filter((l) => !l.isDropdown && !l.isAreasDropdown).map(
            (link) =>
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
                  {t.nav[link.key]}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className="flex items-center justify-between rounded-xl px-4 py-3 text-[15px] font-medium transition-colors text-white/80 hover:bg-white/5 hover:text-white"
                  onClick={() => setMobileOpen(false)}
                >
                  {t.nav[link.key]}
                </Link>
              ),
          )}
        </div>

        {/* Footer CTA */}
        <div
          className="p-4 space-y-2"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <Link
            href="/contactus"
            className="flex w-full items-center justify-center rounded-xl bg-white py-3 text-[15px] font-semibold text-black transition-all duration-200 hover:bg-[#5E7AC4] hover:text-white active:scale-[0.98]"
            onClick={() => setMobileOpen(false)}
          >
            {t.nav.bookOnline}
          </Link>
          <Link
            href="/contactus"
            className="flex w-full items-center justify-center rounded-xl py-3 text-[14px] font-medium text-white/50 transition-colors hover:text-white"
            onClick={() => setMobileOpen(false)}
            style={{ border: "1px solid rgba(255,255,255,0.1)" }}
          >
            {t.nav.contactUs}
          </Link>
        </div>
      </div>
    </>
  );
}
