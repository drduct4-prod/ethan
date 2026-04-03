"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Wind,
  RefreshCw,
  Thermometer,
  Shirt,
  Fan,
  Gauge,
  ArrowUpRight,
  ChevronRight,
} from "lucide-react";
import { urbanist, inter } from "../fonts";

// ─────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────
const QUICK_LINKS = [
  { label: "Home",          href: "/" },
  { label: "Services",      href: "/services" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "Projects",      href: "/projects" },
  { label: "Reviews",       href: "/reviews" },
  { label: "Contact Us",    href: "/contact" },
];

const SERVICES = [
  { label: "Air Duct Cleaning",        href: "/services/air-duct-cleaning",        icon: Wind },
  { label: "Air Exchanger Cleaning",   href: "/services/air-exchanger-cleaning",   icon: RefreshCw },
  { label: "Heat Pump Cleaning",       href: "/services/heat-pump-cleaning",       icon: Thermometer },
  { label: "Dryer Vent Cleaning",      href: "/services/dryer-vent-cleaning",      icon: Shirt },
  { label: "Furnace Blower Cleaning",  href: "/services/furnace-blower-cleaning",  icon: Fan },
  { label: "Central Vacuum Cleaning",  href: "/services/central-vacuum-cleaning",  icon: Gauge },
];

const SOCIAL = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    imgSrc: "/fb_logo.jpg",
    external: true,
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    imgSrc: "/insta_logo.jpg",
    external: true,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/15144004572",
    icon: MessageCircle,
    external: true,
  },
  {
    label: "Email us",
    href: "mailto:info@impeccableducts.com",
    icon: Mail,
    external: false,
  },
];

// ─────────────────────────────────────────────────────────────
// Footer
// ─────────────────────────────────────────────────────────────
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      aria-label="Site footer"
      className={`w-full bg-black ${urbanist.className}`}
    >
      {/* Top accent line matching navbar border */}
      <div className="h-px w-full bg-white/[0.08]" />

      {/* ══════════════════════════════════════════════
          MAIN GRID
          xs/sm  : 1 column stacked
          md     : 2 × 2 grid
          lg     : 4 columns
      ══════════════════════════════════════════════ */}
      <div className="mx-auto max-w-7xl px-5 pt-14 pb-10 sm:px-6 sm:pt-16 md:px-8 lg:px-12 lg:pt-20 xl:px-16 xl:pt-24">
        <div className="grid grid-cols-1 gap-10 sm:gap-12 md:grid-cols-2 md:gap-x-10 md:gap-y-12 lg:grid-cols-4 lg:gap-x-8 xl:gap-x-12">

          {/* ── COL 1 — Logo + About ── */}
          <div className="flex flex-col gap-5 lg:col-span-1">
            {/* Logo */}
            <Link href="/" aria-label="Impeccable Solution — Home" className="inline-block w-fit">
              <Image
                src="/black_logo.png"
                alt="Impeccable Solution Duct Cleaning logo"
                width={180}
                height={36}
                className="brightness-200"
                priority
              />
            </Link>

            {/* Description */}
            <p
              className={`max-w-xs text-[12.5px] leading-relaxed text-white/[0.45] lg:text-[13px] ${inter.className}`}
            >
              Breathe easier with Impeccable Solution Duct Cleaning — your trusted
              experts for professional air duct and vent cleaning across{" "}
              <span className="text-white/60">Montréal</span> and nearby areas.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2.5" role="list" aria-label="Social media links">
              {SOCIAL.map(({ label, href, icon: Icon, imgSrc, external }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  role="listitem"
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.07] transition-all duration-200 hover:bg-[#5E7AC4] hover:scale-105"
                  style={{ border: "1px solid rgba(255,255,255,0.10)" }}
                >
                  {imgSrc ? (
                    <Image
                      src={imgSrc}
                      alt={label}
                      width={16}
                      height={16}
                      className="h-8 w-8 object-contain  transition-opacity duration-200 group-hover:opacity-100 "
                    />
                  ) : (
                    <Icon
                      className="h-3.5 w-3.5 text-white/50 transition-colors duration-200 group-hover:text-white"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* ── COL 2 — Quick Links ── */}
          <div className="flex flex-col gap-5">
            <FooterHeading>Quick Links</FooterHeading>
            <nav aria-label="Quick links">
              <ul className="space-y-2.5">
                {QUICK_LINKS.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="group flex items-center gap-1.5 text-[13px] font-medium text-white/50 transition-colors duration-150 hover:text-[#5E7AC4]"
                    >
                      <ChevronRight
                        className="h-3 w-3 shrink-0 text-white/20 transition-colors duration-150 group-hover:text-[#5E7AC4]"
                        strokeWidth={2.5}
                        aria-hidden="true"
                      />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* ── COL 3 — Our Services ── */}
          <div className="flex flex-col gap-5">
            <FooterHeading>Our Services</FooterHeading>
            <nav aria-label="Our services">
              <ul className="space-y-2.5">
                {SERVICES.map(({ label, href, icon: Icon }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="group flex items-center gap-2 text-[13px] font-medium text-white/50 transition-colors duration-150 hover:text-[#5E7AC4]"
                    >
                      <Icon
                        className="h-3 w-3 shrink-0 text-white/20 transition-colors duration-150 group-hover:text-[#5E7AC4]"
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* ── COL 4 — Contact Info ── */}
          <div className="flex flex-col gap-5">
            <FooterHeading>Contact Info</FooterHeading>

            <address
              className={`not-italic space-y-4 ${inter.className}`}
              aria-label="Contact information"
            >
              {/* Phone */}
              <ContactRow
                icon={Phone}
                label="Phone number"
                href="tel:+15144004572"
                isLink
              >
                +1 514-400-4572
              </ContactRow>

              {/* Emails */}
              <div className="flex flex-col gap-2">
                <ContactRow
                  icon={Mail}
                  label="Primary email"
                  href="mailto:info@impeccableducts.com"
                  isLink
                >
                  info@impeccableducts.com
                </ContactRow>
                <div className="flex items-start gap-2.5 pl-[22px]">
                  <a
                    href="mailto:impeccablesolution0@gmail.com"
                    className="text-[12px] text-white/40 transition-colors duration-150 hover:text-[#5E7AC4] break-all"
                    aria-label="Secondary email: impeccablesolution0@gmail.com"
                  >
                    impeccablesolution0@gmail.com
                  </a>
                </div>
              </div>

              {/* Location */}
              <ContactRow
                icon={MapPin}
                label="Office location"
                isLink={false}
              >
                Montréal, Quebec, Canada
              </ContactRow>
            </address>

            {/* CTA button */}
            <Link
              href="/quote"
              className="group mt-1 flex w-full items-center justify-between rounded-xl bg-white/[0.07] px-4 py-3 transition-all duration-200 hover:bg-[#5E7AC4]"
              style={{ border: "1px solid rgba(255,255,255,0.10)" }}
            >
              <span className="text-[12.5px] font-bold text-white/80 group-hover:text-white">
                Get a Free Quote
              </span>
              <ArrowUpRight
                className="h-4 w-4 text-white/40 transition-all duration-200 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2}
                aria-hidden="true"
              />
            </Link>
          </div>

        </div>
      </div>

      {/* ══════════════════════════════════════════════
          BOTTOM BAR
      ══════════════════════════════════════════════ */}
      <div
        className="mx-auto max-w-7xl px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16"
        style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
      >
        <div className="flex flex-col items-center justify-between gap-3 py-5 sm:flex-row sm:gap-0">
          {/* Copyright */}
          <p
            className={`text-center text-[11px] text-white/25 sm:text-left ${inter.className}`}
          >
            © {year} Air Duct Cleaning Solution. All rights reserved.
          </p>

          {/* Legal links */}
          <div className={`flex items-center gap-4 ${inter.className}`}>
            {[
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms of Service", href: "/terms" },
            ].map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className="text-[11px] text-white/25 transition-colors duration-150 hover:text-white/60"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────
// FooterHeading — consistent column title
// ─────────────────────────────────────────────────────────────
function FooterHeading({ children }) {
  return (
    <div>
      <h3 className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#5E7AC4]">
        {children}
      </h3>
      <div className="mt-2 h-px w-8 bg-[#5E7AC4]/40" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ContactRow — icon + text, optionally a link
// ─────────────────────────────────────────────────────────────
function ContactRow({ icon: Icon, label, href, isLink, children }) {
  const content = (
    <span className="text-[12.5px] leading-snug text-white/50 transition-colors duration-150 group-hover:text-[#5E7AC4] break-words">
      {children}
    </span>
  );

  return (
    <div className="group flex items-start gap-2.5">
      <div className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center">
        <Icon
          className="h-3.5 w-3.5 text-[#5E7AC4]/60 transition-colors duration-150 group-hover:text-[#5E7AC4]"
          strokeWidth={1.75}
          aria-hidden="true"
        />
      </div>
      {isLink ? (
        <a href={href} aria-label={label} className="min-w-0">
          {content}
        </a>
      ) : (
        <p aria-label={label} className="min-w-0">
          {content}
        </p>
      )}
    </div>
  );
}