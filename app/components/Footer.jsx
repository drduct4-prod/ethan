"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
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

const SUPPORTED_COUNTRIES = ["us", "ca"];

function useCountryPrefix() {
  const pathname = usePathname();
  const firstSegment = pathname?.split("/")?.[1] ?? "";
  return SUPPORTED_COUNTRIES.includes(firstSegment) ? firstSegment : "us";
}

function createWithCountry(country) {
  return function withCountry(href) {
    const firstSegment = href.split("/")?.[1] ?? "";
    if (SUPPORTED_COUNTRIES.includes(firstSegment)) return href;
    return `/${country}${href}`;
  };
}

const QUICK_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Service Areas", href: "/service-areas" },
  { label: "Projects", href: "/projects" },
  { label: "Reviews", href: "/reviews" },
  { label: "Contact Us", href: "/contact" },
];

const SERVICES = [
  { label: "Air Duct Cleaning", href: "/services/air-duct-cleaning", icon: Wind },
  { label: "Air Exchanger Cleaning", href: "/services/air-exchanger-cleaning", icon: RefreshCw },
  { label: "Heat Pump Cleaning", href: "/services/heat-pump-cleaning", icon: Thermometer },
  { label: "Dryer Vent Cleaning", href: "/services/dryer-vent-cleaning", icon: Shirt },
  { label: "Furnace Blower Cleaning", href: "/services/furnace-blower-cleaning", icon: Fan },
  { label: "Central Vacuum Cleaning", href: "/services/central-vacuum-cleaning", icon: Gauge },
];

const SOCIAL = [
  { label: "Facebook", href: "https://facebook.com", imgSrc: "/fb_logo.jpg", external: true },
  { label: "Instagram", href: "https://instagram.com", imgSrc: "/insta_logo.jpg", external: true },
  { label: "WhatsApp", href: "https://wa.me/15144004572", icon: MessageCircle, external: true },
  { label: "Email us", href: "mailto:info@impeccableducts.com", icon: Mail, external: false },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const country = useCountryPrefix();
  const withCountry = createWithCountry(country);

  return (
    <footer aria-label="Site footer" className={`w-full bg-black ${urbanist.className}`}>
      <div className="h-px w-full bg-white/5" />

      <div className="mx-auto max-w-7xl px-5 pt-14 pb-10 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-x-12">
          
          {/* COL 1 — Logo + About */}
          <div className="flex flex-col gap-5">
            <Link href={withCountry("/")} className="inline-block w-fit">
              <Image
                src="/black_logo.png"
                alt="Logo"
                width={180}
                height={36}
                className="brightness-200"
                priority
              />
            </Link>
            <p className={`max-w-xs text-[12.5px] leading-relaxed text-white/45 ${inter.className}`}>
              Breathe easier with Impeccable Solution Duct Cleaning — your trusted experts for professional air duct and vent cleaning across <span className="text-white/60">Montréal</span>.
            </p>
            <div className="flex items-center gap-2.5">
              {SOCIAL.map(({ label, href, icon: Icon, imgSrc, external }) => (
                <a
                  key={label}
                  href={href}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="group flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.07] border border-white/10 transition-all hover:bg-[#5E7AC4]"
                >
                  {imgSrc ? (
                    <Image src={imgSrc} alt={label} width={16} height={16} className="h-4 w-4 object-contain opacity-50 group-hover:opacity-100" />
                  ) : (
                    <Icon className="h-3.5 w-3.5 text-white/50 group-hover:text-white" strokeWidth={1.75} />
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* COL 2 — Quick Links */}
          <div className="flex flex-col gap-5">
            <FooterHeading>Quick Links</FooterHeading>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link href={withCountry(href)} className="group flex items-center gap-1.5 text-[13px] text-white/50 hover:text-[#5E7AC4] transition-colors">
                    <ChevronRight className="h-3 w-3 text-white/20 group-hover:text-[#5E7AC4]" strokeWidth={2.5} />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COL 3 — Services */}
          <div className="flex flex-col gap-5">
            <FooterHeading>Our Services</FooterHeading>
            <ul className="space-y-2.5">
              {SERVICES.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <Link href={withCountry(href)} className="group flex items-center gap-2 text-[13px] text-white/50 hover:text-[#5E7AC4] transition-colors">
                    <Icon className="h-3.5 w-3.5 text-white/20 group-hover:text-[#5E7AC4]" strokeWidth={2} />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COL 4 — Contact */}
          <div className="flex flex-col gap-5">
            <FooterHeading>Contact Info</FooterHeading>
            <div className={`space-y-4 ${inter.className}`}>
              <ContactRow icon={Phone} label="Phone" href="tel:+15144004572" isLink>
                +1 514-400-4572
              </ContactRow>
              
              <div className="space-y-1">
                <ContactRow icon={Mail} label="Email" href="mailto:info@impeccableducts.com" isLink>
                  info@impeccableducts.com
                </ContactRow>
                <a 
                  href="mailto:impeccablesolution0@gmail.com" 
                  className="block pl-7 text-[11px] text-white/30 hover:text-[#5E7AC4] transition-colors"
                >
                  impeccablesolution0@gmail.com
                </a>
              </div>

              <ContactRow icon={MapPin} label="Location">
                Montréal, Quebec, Canada
              </ContactRow>
            </div>

            <Link
              href={withCountry("/quote")}
              className="group mt-2 flex items-center justify-between rounded-xl bg-white/[0.07] border border-white/10 px-4 py-3 hover:bg-[#5E7AC4] transition-all"
            >
              <span className="text-[12.5px] font-bold text-white/80 group-hover:text-white">Get a Free Quote</span>
              <ArrowUpRight className="h-4 w-4 text-white/40 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mx-auto max-w-7xl px-5 border-t border-white/5">
        <div className="flex flex-col items-center justify-between gap-3 py-6 sm:flex-row">
          <p className={`text-[11px] text-white/25 ${inter.className}`}>
            © {year} Air Duct Cleaning Solution. All rights reserved.
          </p>
          <div className={`flex gap-5 ${inter.className}`}>
            <Link href={withCountry("/privacy")} className="text-[11px] text-white/25 hover:text-white/60">Privacy Policy</Link>
            <Link href={withCountry("/terms")} className="text-[11px] text-white/25 hover:text-white/60">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterHeading({ children }) {
  return (
    <div className="space-y-2">
      <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#5E7AC4]">{children}</h3>
      <div className="h-px w-8 bg-[#5E7AC4]/40" />
    </div>
  );
}

function ContactRow({ icon: Icon, label, href, isLink, children }) {
  const content = (
    <span className="text-[12.5px] text-white/50 group-hover:text-[#5E7AC4] transition-colors">
      {children}
    </span>
  );

  return (
    <div className="group flex items-start gap-3">
      <Icon className="h-4 w-4 shrink-0 text-[#5E7AC4]/60 group-hover:text-[#5E7AC4] mt-0.5" strokeWidth={1.75} />
      {isLink ? <a href={href} className="min-w-0">{content}</a> : content}
    </div>
  );
}