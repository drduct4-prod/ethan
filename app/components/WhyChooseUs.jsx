"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  BadgeCheck,
  Wrench,
  CalendarClock,
  Headset,
  Tag,
  Zap,
} from "lucide-react";
import { urbanist, inter } from "../fonts";

// ─────────────────────────────────────────────
// Register GSAP plugin (safe for SSR)
// ─────────────────────────────────────────────
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────
const REASONS = [
  {
    icon: BadgeCheck,
    title: "100% Certified",
    desc: "Our team is fully certified and insured, ensuring safe and professional service every time — no shortcuts, ever.",
    keyword: "Professional cleaning services",
  },
  {
    icon: Wrench,
    title: "Expert Technicians",
    desc: "Our skilled HVAC experts use advanced tools and proven methods for deep, effective cleaning on every job.",
    keyword: "Trusted HVAC experts",
  },
  {
    icon: CalendarClock,
    title: "Flexible Scheduling",
    desc: "Same-day, evening, and weekend appointments available so service fits your schedule — not the other way around.",
    keyword: "Home services reliability",
  },
  {
    icon: Headset,
    title: "Customer Support",
    desc: "Our friendly support team is always ready to assist you before, during, and after your service.",
    keyword: "Home services reliability",
  },
  {
    icon: Tag,
    title: "Enjoy Discounts",
    desc: "Transparent pricing with no hidden fees, plus exclusive seasonal deals and referral discounts for loyal customers.",
    keyword: "Professional cleaning services",
  },
  {
    icon: Zap,
    title: "Emergency Services",
    desc: "Fast-response emergency cleaning available around the clock — whenever you need urgent help, we're there.",
    keyword: "Trusted HVAC experts",
  },
];

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────
export default function WhyChooseUs() {
  const sectionRef  = useRef(null);
  const headingRef  = useRef(null);
  const cardsRef    = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {

      // ── Heading block fades in ────────────
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );

      // ── Cards stagger in ──────────────────
      const cards = cardsRef.current?.querySelectorAll(".why-card");
      if (cards?.length) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 44 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="why-choose-heading"
      className={`relative w-full overflow-hidden bg-white py-20 lg:py-28 ${urbanist.className}`}
    >
      {/* ── Subtle grid texture ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(94,122,196,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(94,122,196,0.035) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* ── Top edge glow ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 z-0 h-px w-2/3 -translate-x-1/2"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(94,122,196,0.4), transparent)",
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-12">

        {/* ── Heading block ── */}
        <div ref={headingRef} className="mx-auto max-w-2xl text-center">
          {/* Eyebrow */}
          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#5E7AC4]">
            Top 6 Reasons
          </p>

          {/* H2 */}
          <h2
            id="why-choose-heading"
            className="text-[30px] font-extrabold leading-tight tracking-tight text-black sm:text-[36px] lg:text-[42px]"
          >
            Why Choose{" "}
            <span className="relative inline-block">
              Us
              {/* Underline accent */}
              <svg
                aria-hidden="true"
                className="absolute -bottom-1 left-0 w-full"
                viewBox="0 0 60 6"
                fill="none"
              >
                <path
                  d="M1 5 C15 1, 45 1, 59 5"
                  stroke="#5E7AC4"
                  strokeWidth="2"
                  strokeLinecap="round"
                  opacity="0.7"
                />
              </svg>
            </span>
          </h2>

          {/* Description */}
          <p
            className={`mt-5 text-[14.5px] leading-relaxed text-black/50 lg:text-[15px] ${inter.className}`}
          >
            At{" "}
            <strong className="font-semibold text-black/75">
              Impeccable Solution Duct Cleaning
            </strong>
            , we believe in delivering quality, reliability, and customer
            satisfaction every time. Here&apos;s why homeowners trust us{" "}
            <span aria-hidden="true">👇</span>
          </p>
        </div>

        {/* ── Card grid ── */}
        <div
          ref={cardsRef}
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6"
        >
          {REASONS.map((reason, i) => {
            const Icon = reason.icon;
            return (
              <article
                key={reason.title}
                // GSAP targets this class; hover styles are pure CSS
                className="why-card group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#5E7AC4]/35 hover:bg-white/[0.06] hover:shadow-[0_0_32px_rgba(94,122,196,0.12)]"
              >
                {/* Card number watermark */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-5 top-4 select-none text-[52px] font-black leading-none text-black/[0.04] transition-colors duration-300 group-hover:text-[#5E7AC4]/[0.07]"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Icon bubble */}
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.05] transition-all duration-300 group-hover:border-[#5E7AC4]/40 group-hover:bg-[#5E7AC4]/10">
                  <Icon
                    className="h-5 w-5 text-black/50 transition-colors duration-300 group-hover:text-[#5E7AC4]"
                    strokeWidth={1.75}
                  />
                </div>

                {/* Text */}
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-[15px] font-bold leading-snug text-black">
                    {reason.title}
                  </h3>
                  <p
                    className={`text-[13.5px] leading-relaxed text-black/45 ${inter.className}`}
                  >
                    {reason.desc}
                  </p>
                </div>

                {/* Bottom accent line — animates in on hover */}
                <div
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-[2px] w-0 rounded-full bg-[#5E7AC4] transition-all duration-500 group-hover:w-full"
                />
              </article>
            );
          })}
        </div>

        {/* ── Bottom CTA strip ── */}
        <div className="mt-14 flex flex-col items-center gap-3 text-center sm:flex-row sm:justify-center sm:gap-4">
          <p className={`text-[13px] text-black/40 ${inter.className}`}>
            Ready to experience the difference?
          </p>
          <a
            href="/book"
            className="inline-flex items-center gap-2 rounded-xl bg-black px-5 py-2.5 text-[13px] font-bold text-white shadow-lg shadow-[#5E7AC4]/20 transition-all duration-200 hover:-translate-y-px hover:bg-[#4a63a8] hover:shadow-[#5E7AC4]/35 active:translate-y-0 active:scale-[0.98]"
          >
            Book Appointment →
          </a>
        </div>

      </div>
    </section>
  );
}