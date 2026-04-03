"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, CheckCircle, Flame, Snowflake, Wind } from "lucide-react";
import { urbanist, inter } from "../fonts";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─────────────────────────────────────────────
// Images — replace src values with real photos
// Recommended: 800×600 JPG, <200 KB each
// ─────────────────────────────────────────────
const IMAGES = {
  large: {
    src: "/services_images/s2.png",
    alt: "Professional HVAC cleaning technician working on air duct system",
    fallback: "linear-gradient(135deg,#0d1117 0%,#1c2c44 100%)",
  },
  topSmall: {
        src: "/services_images/s3.png",

    alt: "Furnace and heat pump maintenance service",
    fallback: "linear-gradient(135deg,#0a1020 0%,#162035 100%)",
  },
  bottomSmall: {
        src: "/services_images/s4.png",

    alt: "Air exchanger cleaning and ventilation service",
    fallback: "linear-gradient(135deg,#060c18 0%,#0e1c30 100%)",
  },
};

// ─────────────────────────────────────────────
// Service highlights shown below description
// ─────────────────────────────────────────────
const HIGHLIGHTS = [
  { icon: Snowflake, label: "Air Conditioning" },
  { icon: Flame,     label: "Furnace & Heat Pump" },
  { icon: Wind,      label: "Air Exchangers & Vents" },
];

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────
export default function HVACBentoSection() {
  const sectionRef = useRef(null);
  const imagesRef  = useRef(null);
  const textRef    = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const ctx = gsap.context(() => {
      // ── Left: image grid scales + fades in ──
      const imgs = imagesRef.current?.querySelectorAll(".bento-img");
      if (imgs?.length) {
        gsap.fromTo(
          imgs,
          { opacity: 0, scale: 0.94 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.72,
            stagger: 0.14,
            ease: "power3.out",
            scrollTrigger: {
              trigger: imagesRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // ── Stat badge pops in slightly after ──
      const badge = sectionRef.current?.querySelector(".stat-badge");
      if (badge) {
        gsap.fromTo(
          badge,
          { opacity: 0, scale: 0.8, y: 8 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.55,
            ease: "back.out(1.4)",
            delay: 0.45,
            scrollTrigger: {
              trigger: imagesRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // ── Right: text slides in from right ──
      const textEls = textRef.current?.querySelectorAll(".text-el");
      if (textEls?.length) {
        gsap.fromTo(
          textEls,
          { opacity: 0, x: 36 },
          {
            opacity: 1,
            x: 0,
            duration: 0.65,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: textRef.current,
              start: "top 82%",
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
      aria-label="HVAC Cleaning and Maintenance Specialists"
      className={`relative w-full overflow-hidden bg-black/90 py-20 lg:py-28 ${urbanist.className}`}
    >
      {/* Subtle dot texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          backgroundImage: "radial-gradient(rgba(94,122,196,0.06) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 lg:px-12">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-stretch lg:gap-14">

          {/* ══════════════════════════
              LEFT — Bento image grid
          ══════════════════════════ */}
          <div
            ref={imagesRef}
            className="relative w-full shrink-0 lg:w-[52%]"
          >
            {/* 
              Bento grid:
              [  Large image  ] [ Top small ]
              [  Large image  ] [ Bot small ]
            */}
            <div className="grid h-full grid-cols-[1fr_0.52fr] grid-rows-[1fr_1fr] gap-3 sm:gap-4" style={{ minHeight: 420 }}>

              {/* Large image — spans 2 rows */}
              <div className="bento-img relative row-span-2 overflow-hidden rounded-2xl bg-gray-900">
                <Image
                  src={IMAGES.large.src}
                  alt={IMAGES.large.alt}
                  fill
                  sizes="(max-width: 768px) 60vw, 30vw"
                  className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                  style={{ background: IMAGES.large.fallback }}
                />
                {/* Subtle bottom gradient on large image */}
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
                  style={{ background: "linear-gradient(to top,rgba(0,0,0,0.45),transparent)" }}
                />
              </div>

              {/* Top small */}
              <div className="bento-img relative overflow-hidden rounded-2xl bg-gray-900">
                <Image
                  src={IMAGES.topSmall.src}
                  alt={IMAGES.topSmall.alt}
                  fill
                  sizes="(max-width: 768px) 35vw, 18vw"
                  className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                  style={{ background: IMAGES.topSmall.fallback }}
                />
              </div>

              {/* Bottom small */}
              <div className="bento-img relative overflow-hidden rounded-2xl bg-gray-900">
                <Image
                  src={IMAGES.bottomSmall.src}
                  alt={IMAGES.bottomSmall.alt}
                  fill
                  sizes="(max-width: 768px) 35vw, 18vw"
                  className="object-cover transition-transform duration-700 ease-out hover:scale-105"
                  style={{ background: IMAGES.bottomSmall.fallback }}
                />
              </div>
            </div>

            {/* ── Stat badge — glassmorphism ── */}
            <div
              className="stat-badge pointer-events-none absolute -bottom-4 -right-2 z-10 sm:bottom-0 sm:right-2"
              style={{
                background: "rgba(8, 12, 28, 0.9)",
                border: "1px solid rgba(94,122,196,0.3)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                borderRadius: "16px",
                padding: "14px 20px",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.04) inset",
              }}
            >
              <p className="text-[26px] font-extrabold leading-none text-white">
                800<span className="text-[#5E7AC4]">+</span>
              </p>
              <p className={`mt-0.5 text-[11px] font-semibold uppercase tracking-widest text-white/50 ${inter.className}`}>
                Projects Completed
              </p>
            </div>
          </div>

          {/* ══════════════════════════
              RIGHT — Text content
          ══════════════════════════ */}
          <div
            ref={textRef}
            className="flex w-full flex-col justify-center lg:w-[48%]"
          >
            {/* Eyebrow */}
            <p className="text-el mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#5E7AC4]">
              Our Speciality
            </p>

            {/* H2 */}
            <h2 className="text-el text-[26px] font-extrabold leading-tight tracking-tight text-white sm:text-[32px] lg:text-[38px]">
              Your Complete HVAC{" "}
              <span className="text-[#5E7AC4]">Cleaning</span> &amp;{" "}
              Maintenance Experts
            </h2>

            {/* Divider */}
            <div className="text-el mt-5 h-px w-12 rounded-full bg-[#5E7AC4]/40" />

            {/* Description */}
            <p className={`text-el mt-5 text-[14.5px] leading-relaxed text-white/50 lg:text-[15px] ${inter.className}`}>
              Whether it&apos;s summer heat or winter chill, our team keeps your
              HVAC system running efficiently year-round. From air conditioning
              and furnaces to air exchangers and heat pumps — we specialize in
              maintaining{" "}
              <strong className="font-semibold text-white/75">
                clean, safe, and energy-efficient
              </strong>{" "}
              systems for your comfort.
            </p>

            {/* Highlight chips */}
            <ul className="text-el mt-6 flex flex-wrap gap-2.5" aria-label="Services included">
              {HIGHLIGHTS.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-2 rounded-full border border-white/9 bg-white/4 px-4 py-2"
                >
                  <Icon className="h-3.5 w-3.5 shrink-0 text-[#5E7AC4]" strokeWidth={1.75} />
                  <span className="text-[12.5px] font-semibold text-white/70">{label}</span>
                </li>
              ))}
            </ul>

            {/* Checklist */}
            <ul className={`text-el mt-6 space-y-2.5 ${inter.className}`} aria-label="Key benefits">
              {[
                "Fully certified & insured technicians",
                "Same-day and emergency appointments",
                "Transparent pricing — no hidden fees",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#5E7AC4]" strokeWidth={2} />
                  <span className="text-[13.5px] text-white/55">{item}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="text-el mt-8 flex flex-wrap gap-3">
              <Link
                href="/services"
                className="group flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-[13.5px] font-bold text-gray-900 shadow-md transition-all duration-200 hover:-translate-y-px hover:bg-[#5E7AC4] hover:text-white hover:shadow-[#5E7AC4]/25 active:translate-y-0 active:scale-[0.98]"
              >
                Explore All Services
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" strokeWidth={2.25} />
              </Link>
              <Link
                href="/book"
                className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-[13.5px] font-bold text-white transition-all duration-200 hover:-translate-y-px hover:border-white/30 hover:bg-white/10 active:translate-y-0 active:scale-[0.98]"
              >
                Book a Free Estimate
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}