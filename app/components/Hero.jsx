"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { CalendarCheck, FileText, ShieldCheck, Star, Wind } from "lucide-react";
import { urbanist, inter } from "../fonts";
import Contact from "./Contact";

const SLIDES = [
  {
    src: "/services_images/s1.png",
    fallback: "linear-gradient(120deg,#0d1117 0%,#1c2333 100%)",
    alt: "Professional air duct cleaning service in Montreal",
  },
  {
    src: "/services_images/s2.png",
    fallback: "linear-gradient(120deg,#0a0f1a 0%,#182030 100%)",
    alt: "HVAC vent cleaning for improved indoor air quality",
  },
  {
    src: "/services_images/s3.png",
    fallback: "linear-gradient(120deg,#080d14 0%,#121c28 100%)",
    alt: "Clean indoor air quality Montreal — Impeccable Solution",
  },
];

const SLIDE_MS  = 3500;
const FADE_SECS = 1.1;

const TRUST = [
  { icon: ShieldCheck, text: "Licensed & Insured" },
  { icon: Star,        text: "500+ Five-Star Reviews" },
  { icon: Wind,        text: "NADCA Certified" },
];

export default function Hero() {
  const [active, setActive] = useState(0);
  const slideRefs = useRef([]);
  const textRef   = useRef(null);
  const formRef   = useRef(null);
  const timerRef  = useRef(null);

  // ── Crossfade init ─────────────────────────────────
  useEffect(() => {
    slideRefs.current.forEach((el, i) => {
      if (el) gsap.set(el, { opacity: i === 0 ? 1 : 0 });
    });
  }, []);

  useEffect(() => {
    slideRefs.current.forEach((el, i) => {
      if (!el) return;
      gsap.to(el, { opacity: i === active ? 1 : 0, duration: FADE_SECS, ease: "power2.inOut" });
    });
    timerRef.current = setTimeout(
      () => setActive((p) => (p + 1) % SLIDES.length),
      SLIDE_MS
    );
    return () => clearTimeout(timerRef.current);
  }, [active]);

  // ── Text reveal ────────────────────────────────────
  useEffect(() => {
    if (!textRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hl",
        { opacity: 0, y: 22 },
        { opacity: 1, y: 0, duration: 0.65, stagger: 0.11, ease: "power3.out", delay: 0.15 }
      );
    }, textRef);
    return () => ctx.revert();
  }, []);

  // ── Form entrance ──────────────────────────────────
  useEffect(() => {
    if (!formRef.current) return;
    gsap.fromTo(
      formRef.current,
      { opacity: 0, x: 32 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power3.out", delay: 0.3 }
    );
  }, []);

  return (
    <div className={`w-full overflow-x-hidden ${urbanist.className}`}>

      {/* ══════════════════════════════════════════════════
          HERO SECTION

          Height scale — all standard Tailwind values:
            xs   h-80        320px  — compact mobile portrait
            sm   h-96        384px  — large mobile / small tablet
            md   h-[28rem]   448px  — tablet landscape
            lg   h-screen    100vh  — full viewport on desktop
            xl   h-screen    100vh  — full viewport on wide desktop

          All text sizes, padding, button sizes, and the
          form card grow in lockstep with the hero height
          so nothing looks cramped or oversized at any size.
      ══════════════════════════════════════════════════ */}
      <section
        aria-label="Hero — Professional Air Duct and Vent Cleaning Montreal"
        className="relative w-full overflow-hidden"
      >
        <div className="relative w-full h-80 sm:h-96 md:h-112 lg:h-screen">

          {/* ── Slide backgrounds ── */}
          <div className="absolute inset-0 z-0">
            {SLIDES.map((s, i) => (
              <div
                key={s.src}
                ref={(el) => (slideRefs.current[i] = el)}
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url('${s.src}'), ${s.fallback}` }}
                role="img"
                aria-label={s.alt}
              />
            ))}

            {/* Left-heavy overlay keeps text legible across all heights */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(105deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.68) 52%, rgba(0,0,0,0.42) 100%)",
              }}
            />
            {/* Bottom vignette */}
            <div
              className="absolute bottom-0 left-0 right-0 h-24"
              style={{ background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.60))" }}
            />
          </div>

          {/* ── Slide dots
              Scale up position and dot size on lg+ ── */}
          <div className="absolute bottom-4 left-5 z-20 flex items-center gap-1.5 lg:bottom-8 lg:left-12 xl:bottom-10 xl:left-16">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Go to slide ${i + 1}`}
                className="flex items-center p-1"
              >
                <span
                  className={`block rounded-full transition-all duration-500 ${
                    i === active
                      ? "h-1.5 w-6 bg-white lg:h-2 lg:w-10"
                      : "h-1.5 w-1.5 bg-white/35 hover:bg-white/60 lg:h-2 lg:w-2"
                  }`}
                />
              </button>
            ))}
          </div>

          {/* ══════════════════════════════════════════════
              CONTENT GRID

              Padding grows with the hero at each breakpoint:
                xs   px-5  py-8    — tight mobile
                sm   px-6  py-10   — comfortable mobile
                md   px-8  py-0    — tablet (flex centres it)
                lg   px-12 py-0    — desktop (flex centres it)
                xl   px-16 py-0    — wide desktop
          ══════════════════════════════════════════════ */}
          <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col items-start justify-center gap-5 px-5 py-8 sm:gap-6 sm:px-6 md:px-8 lg:flex-row lg:items-center lg:gap-12 lg:px-12 lg:py-0 xl:gap-20 xl:px-16">

            {/* ── LEFT — text ── */}
            <div ref={textRef} className="flex w-full min-w-0 flex-1 flex-col justify-center">

              {/* Eyebrow label — grows xs→xl */}
              <p className="hl mb-1.5 text-[9px] font-bold uppercase tracking-[0.22em] text-white/50 sm:text-[10px] lg:mb-3 lg:text-[11px] xl:text-[13px]">
                Our Speciality
              </p>

              {/* H1
                  Size ramp matches the hero height at every breakpoint:
                    xs  20px  (h-80  = 320px)
                    sm  26px  (h-96  = 384px)
                    md  32px  (h-28rem = 448px)
                    lg  46px  (h-screen — large monitor)
                    xl  56px  (h-screen — wide / hi-res)
              */}
              <h1 className="hl min-w-0 wrap-break-words text-[20px] font-extrabold leading-[1.1] tracking-tight text-white sm:text-[26px] md:text-[32px] lg:text-[46px] xl:text-[56px]">
                Professional{" "}
                <span className="text-[#5E7AC4]">Air Duct</span>{" "}
                &amp;{" "}
                <span className="text-[#5E7AC4]">Vent Cleaning</span>{" "}
                <span className="text-white/90">in Montreal</span>
                <span className="mt-1 block text-[0.52em] font-semibold text-white/50 lg:mt-2">
                  and Surrounding Areas
                </span>
              </h1>

              {/* Description
                  Hidden on xs (hero too short for it).
                  Grows from 12px → 16px across sm → xl. */}
              <p
                className={`hl mt-2.5 hidden max-w-xl text-[12px] leading-relaxed text-white/[0.55] sm:block sm:mt-3 sm:text-[12.5px] md:text-[13px] lg:mt-5 lg:max-w-2xl lg:text-[15px] lg:leading-[1.75] xl:text-[16px] ${inter.className}`}
              >
                Your trusted experts for{" "}
                <strong className="font-semibold text-white/80">air duct and vent cleaning</strong>{" "}
                across Montreal. We remove dust, debris &amp; allergens to improve{" "}
                <strong className="font-semibold text-white/80">indoor air quality</strong>{" "}
                and HVAC efficiency — for homes and businesses of every size.
              </p>

              {/* CTA buttons
                  Full-width stacked on xs; auto inline sm+.
                  Padding, text, and icon scale on lg+. */}
              <div className="hl mt-4 flex flex-wrap items-center gap-2 sm:mt-4 md:mt-5 lg:mt-8 lg:gap-3 xl:mt-10">
                <Link
                  href="/contactus"
                  className="group flex w-full items-center justify-center gap-1.5 rounded-lg bg-white px-4 py-2.5 text-[12.5px] font-bold text-gray-900 shadow-md transition-all duration-200 hover:-translate-y-px hover:bg-[#5E7AC4] hover:text-white hover:shadow-lg active:translate-y-0 active:scale-[0.97] sm:w-auto sm:justify-start lg:rounded-xl lg:px-7 lg:py-4 lg:text-[15px] xl:px-8 xl:py-4.5 xl:text-[16px]"
                >
                  <CalendarCheck className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:scale-110 lg:h-5 lg:w-5" strokeWidth={2} />
                  Get an Appointment
                </Link>

                <Link
                  href="/contactus"
                  className="group flex w-full items-center justify-center gap-1.5 rounded-lg border border-white/25 bg-white/8 px-4 py-2.5 text-[12.5px] font-bold text-white backdrop-blur-sm transition-all duration-200 hover:-translate-y-px hover:border-white/50 hover:bg-white/15 active:translate-y-0 active:scale-[0.97] sm:w-auto sm:justify-start lg:rounded-xl lg:px-7 lg:py-4 lg:text-[15px] xl:px-8 xl:py-4.5 xl:text-[16px]"
                >
                  <FileText className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:scale-110 lg:h-5 lg:w-5" strokeWidth={2} />
                  Get a Free Quote
                </Link>
              </div>

              {/* Trust badges — shown from lg where there is enough room */}
              <div className="hl mt-5 hidden items-center gap-5 lg:flex lg:mt-8 xl:mt-10 xl:gap-7">
                {TRUST.map(({ icon: Icon, text }) => (
                  <div key={text} className="flex items-center gap-2">
                    <Icon className="h-4 w-4 shrink-0 text-white/40 xl:h-5 xl:w-5" strokeWidth={2} />
                    <span className="text-[12px] font-medium text-white/45 xl:text-[14px]">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RIGHT — form card (desktop only) ──
                Width and internal spacing grow on xl to match the
                larger hero canvas without feeling sparse. */}
            <div
              ref={formRef}
              className="hidden shrink-0 overflow-hidden lg:block lg:w-[320px] xl:w-100"
            >
              <div
                className="rounded-2xl bg-white lg:p-5 xl:p-7"
                style={{
                  border: "1px solid rgba(0,0,0,0.07)",
                  boxShadow: "0 24px 60px rgba(0,0,0,0.30)",
                }}
              >
                {/* Card header */}
                <div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-4 xl:mb-5 xl:pb-5">
                  <div>
                    <p className="text-[14px] font-bold text-gray-900 xl:text-[16px]">Free Estimate</p>
                    <p className="mt-0.5 text-[11px] text-gray-400 xl:text-[13px]">Response within 24 hours</p>
                  </div>
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gray-900 xl:h-11 xl:w-11">
                    <Wind className="h-4 w-4 text-white xl:h-5 xl:w-5" strokeWidth={1.75} />
                  </div>
                </div>

                <Contact compact />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          TRUST STRIP — always visible below hero
      ══════════════════════════════════════════════ */}
      <div className="w-full border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-3 px-5 py-3 sm:gap-5 lg:justify-start lg:px-12 xl:px-16">
          {TRUST.map(({ icon: Icon, text }, i) => (
            <div key={text} className="flex items-center gap-2">
              {i > 0 && <span className="hidden h-3 w-px bg-gray-200 lg:block" />}
              <Icon className="h-3.5 w-3.5 shrink-0 text-gray-400" strokeWidth={2} />
              <span className="text-[12px] font-semibold text-gray-500">{text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          MOBILE / TABLET FORM — below hero, hidden lg+
      ══════════════════════════════════════════════ */}
      <div className="w-full bg-gray-50 px-5 py-8 sm:px-8 sm:py-10 lg:hidden">
        <div className="mx-auto max-w-md">
          <div className="mb-5 text-center">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
              Get a Free Estimate
            </p>
            <h2 className="mt-1 text-[20px] font-extrabold text-gray-900 sm:text-[22px]">
              Request a Quote
            </h2>
            <p className="mt-1 text-[12px] text-gray-500">
              We&apos;ll respond within 24 hours.
            </p>
          </div>

          <div
            className="rounded-2xl bg-white p-5 shadow-sm sm:p-6"
            style={{ border: "1px solid rgba(0,0,0,0.07)" }}
          >
            <Contact compact={false} />
          </div>
        </div>
      </div>

    </div>
  );
}