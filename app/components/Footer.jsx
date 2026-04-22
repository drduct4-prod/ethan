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
import { useLang } from "../context/LanguageContext";

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
    href: "mailto:info@ethanductscleaning.com",
    icon: Mail,
    external: false,
  },
];

export default function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  const QUICK_LINKS = [
    { label: t.footer.links.home, href: "/" },
    { label: t.footer.links.services, href: "#what-we-do" },
    { label: t.footer.links.reviews, href: "#reviews" },
    { label: t.footer.links.contact, href: "/contactus" },
  ];

  return (
    <footer
      aria-label="Site footer"
      className={`w-full bg-black ${urbanist.className}`}
    >
      <div className="h-px w-full bg-white/5" />

      <div className="mx-auto max-w-7xl px-5 pt-14 pb-10 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-x-12">
          {/* COL 1 — Logo + About */}
          <div className="flex flex-col gap-5">
            <Link href="/" className="inline-block w-fit">
              <Image
                src="/black_logo.png"
                alt="Logo"
                width={180}
                height={36}
                className="brightness-200"
                priority
              />
            </Link>
            <p
              className={`max-w-xs text-[12.5px] leading-relaxed text-white/45 ${inter.className}`}
            >
              {t.footer.tagline}
            </p>
            <div className="flex items-center gap-2.5">
              {SOCIAL.map(({ label, href, icon: Icon, imgSrc, external }) => (
                <a
                  key={label}
                  href={href}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.07] border border-white/10 transition-all hover:bg-[#5E7AC4]"
                >
                  {imgSrc ? (
                    <Image
                      src={imgSrc}
                      alt={label}
                      width={16}
                      height={16}
                      className="h-4 w-4 object-contain opacity-50 group-hover:opacity-100"
                    />
                  ) : (
                    <Icon
                      className="h-3.5 w-3.5 text-white/50 group-hover:text-white"
                      strokeWidth={1.75}
                    />
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* COL 2 — Quick Links */}
          <div className="flex flex-col gap-5">
            <FooterHeading>{t.footer.quickLinks}</FooterHeading>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="group flex items-center gap-1.5 text-[13px] text-white/50 hover:text-[#5E7AC4] transition-colors"
                  >
                    <ChevronRight
                      className="h-3 w-3 text-white/20 group-hover:text-[#5E7AC4]"
                      strokeWidth={2.5}
                    />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COL 3 — Services */}
          <div className="flex flex-col gap-5">
            <FooterHeading>{t.footer.ourServices}</FooterHeading>
            <ul className="space-y-2.5">
              {SERVICE_SLUGS.map(({ slug, href, icon: Icon }) => (
                <li key={slug}>
                  <Link
                    href={href}
                    className="group flex items-center gap-2 text-[13px] text-white/50 hover:text-[#5E7AC4] transition-colors"
                  >
                    <Icon
                      className="h-3.5 w-3.5 text-white/20 group-hover:text-[#5E7AC4]"
                      strokeWidth={2}
                    />
                    {t.servicesSection.list[slug].title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COL 4 — Contact */}
          <div className="flex flex-col gap-5">
            <FooterHeading>{t.footer.contactInfo}</FooterHeading>
            <div className={`space-y-4 ${inter.className}`}>
              <ContactRow icon={Phone} href="tel:+15144004572" isLink>
                +1 514-400-4572
              </ContactRow>
              <div className="space-y-1">
                <ContactRow
                  icon={Mail}
                  href="mailto:info@ethanductscleaning.com"
                  isLink
                >
                  info@ethanductscleaning.com
                </ContactRow>
                <a
                  href="mailto:impeccablesolution0@gmail.com"
                  className="block pl-7 text-[11px] text-white/30 hover:text-[#5E7AC4] transition-colors"
                >
                  impeccablesolution0@gmail.com
                </a>
              </div>
              <ContactRow icon={MapPin}>Montréal, Quebec, Canada</ContactRow>
            </div>
            <Link
              href="/contactus"
              className="group mt-2 flex items-center justify-between rounded-xl bg-white/[0.07] border border-white/10 px-4 py-3 hover:bg-[#5E7AC4] transition-all"
            >
              <span className="text-[12.5px] font-bold text-white/80 group-hover:text-white">
                {t.footer.getFreeQuote}
              </span>
              <ArrowUpRight className="h-4 w-4 text-white/40 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mx-auto max-w-7xl px-5 border-t border-white/5">
        <div className="flex flex-col items-center justify-between gap-3 py-6 sm:flex-row">
          <p className={`text-[11px] text-white/25 ${inter.className}`}>
            © {year} {t.footer.copyright}
          </p>
          <div className={`flex gap-5 ${inter.className}`}>
            <Link
              href="/privacy"
              className="text-[11px] text-white/25 hover:text-white/60"
            >
              {t.footer.privacy}
            </Link>
            <Link
              href="/terms"
              className="text-[11px] text-white/25 hover:text-white/60"
            >
              {t.footer.terms}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterHeading({ children }) {
  return (
    <div className="space-y-2">
      <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#5E7AC4]">
        {children}
      </h3>
      <div className="h-px w-8 bg-[#5E7AC4]/40" />
    </div>
  );
}

function ContactRow({ icon: Icon, href, isLink, children }) {
  const content = (
    <span className="text-[12.5px] text-white/50 group-hover:text-[#5E7AC4] transition-colors">
      {children}
    </span>
  );
  return (
    <div className="group flex items-start gap-3">
      <Icon
        className="h-4 w-4 shrink-0 text-[#5E7AC4]/60 group-hover:text-[#5E7AC4] mt-0.5"
        strokeWidth={1.75}
      />
      {isLink ? (
        <a href={href} className="min-w-0">
          {content}
        </a>
      ) : (
        content
      )}
    </div>
  );
}
