"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Wind,
  RefreshCw,
  Thermometer,
  Shirt,
  Fan,
  Gauge,
  ArrowUpRight,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { urbanist, inter } from "../fonts";
import { useLang } from "../context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

// Static data (slug, image, icon) — text comes from translations
const SERVICE_META = [
  {
    slug: "air-duct-cleaning",
    number: "01",
    icon: Wind,
    image: "/services_images/s1.png",
    fallback: "linear-gradient(135deg,#0d1117 0%,#1c2333 100%)",
  },
  {
    slug: "air-exchanger-cleaning",
    number: "02",
    icon: RefreshCw,
    image: "/services_images/s3.png",
    fallback: "linear-gradient(135deg,#0a0f1a 0%,#182030 100%)",
  },
  {
    slug: "heat-pump-cleaning",
    number: "03",
    icon: Thermometer,
    image: "/services_images/s6.png",
    fallback: "linear-gradient(135deg,#080d14 0%,#121c28 100%)",
  },
  {
    slug: "dryer-vent-cleaning",
    number: "04",
    icon: Shirt,
    image: "/services_images/s4.png",
    fallback: "linear-gradient(135deg,#0d1117 0%,#1c2333 100%)",
  },
  {
    slug: "furnace-blower-cleaning",
    number: "05",
    icon: Fan,
    image: "/services_images/s5.png",
    fallback: "linear-gradient(135deg,#0a0f1a 0%,#182030 100%)",
  },
  {
    slug: "central-vacuum-cleaning",
    number: "06",
    icon: Gauge,
    image: "/services_images/s2.png",
    fallback: "linear-gradient(135deg,#080d14 0%,#121c28 100%)",
  },
];

export default function ServicesSection() {
  const { t } = useLang();
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const gridRef = useRef(null);
  const ctaRef = useRef(null);

  const ts = t.servicesSection;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current?.querySelectorAll(".anim-heading"),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 82%",
            once: true,
          },
        },
      );
      gsap.fromTo(
        gridRef.current?.querySelectorAll(".service-card"),
        { opacity: 0, y: 56, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: { each: 0.1, from: "start" },
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            once: true,
          },
        },
      );
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 90%",
            once: true,
          },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="what-we-do"
      ref={sectionRef}
      aria-labelledby="services-heading"
      className={`w-full bg-white ${urbanist.className}`}
    >
      <div className="h-px w-full bg-gray-100" />

      {/* Header */}
      <div
        ref={headingRef}
        className="mx-auto max-w-7xl px-5 pt-16 pb-12 sm:px-6 sm:pt-20 sm:pb-14 md:px-8 lg:px-12 lg:pt-24 lg:pb-16 xl:px-16 xl:pt-28 xl:pb-20"
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="max-w-2xl">
            <div className="anim-heading mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-[#5E7AC4]" />
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#5E7AC4]">
                {ts.eyebrow}
              </p>
            </div>
            <h2
              id="services-heading"
              className="anim-heading text-[28px] font-extrabold leading-[1.1] tracking-tight text-gray-900 sm:text-[36px] md:text-[40px] lg:text-[46px] xl:text-[52px]"
            >
              {ts.heading1}{" "}
              <span className="text-[#5E7AC4]">{ts.heading2}</span>
              <br className="hidden sm:block" />
              {ts.heading3}
            </h2>
          </div>

          <div className="anim-heading max-w-md lg:pb-1">
            <p
              className={`text-[13px] leading-relaxed text-gray-500 sm:text-[14px] lg:text-[15px] ${inter.className}`}
            >
              {ts.desc}
            </p>
            <div className="mt-5 flex flex-wrap gap-4">
              {[
                { value: ts.stat1Val, label: ts.stat1Label },
                { value: ts.stat2Val, label: ts.stat2Label },
                { value: ts.stat3Val, label: ts.stat3Label },
              ].map((s) => (
                <div key={s.label} className="flex flex-col">
                  <span className="text-[20px] font-extrabold text-gray-900 lg:text-[22px]">
                    {s.value}
                  </span>
                  <span
                    className={`text-[11px] text-gray-400 ${inter.className}`}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Cards grid */}
      <div
        ref={gridRef}
        className="mx-auto max-w-7xl px-5 sm:px-6 md:px-8 lg:px-12 xl:px-16"
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 lg:gap-7">
          {SERVICE_META.map((meta) => {
            const info = ts.list[meta.slug];
            return (
              <ServiceCard
                key={meta.slug}
                meta={meta}
                info={info}
                getQuoteLabel={ts.getQuote}
              />
            );
          })}
        </div>
      </div>

      {/* Bottom CTA */}
      <div
        ref={ctaRef}
        className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 pt-12 pb-16 sm:flex-row sm:px-6 sm:pt-14 sm:pb-20 md:px-8 lg:px-12 lg:pt-16 lg:pb-24 xl:px-16 xl:pb-28"
      >
        <p className={`text-[13px] text-gray-400 ${inter.className}`}>
          {ts.notSure}{" "}
          <Link
            href="/contactus"
            className="font-semibold text-gray-700 underline underline-offset-2 hover:text-[#5E7AC4] transition-colors"
          >
            {ts.talkFree}
          </Link>
        </p>
        <Link
          href="/contactus"
          className="group tracking-wide flex items-center gap-2.5 rounded-xl border-2 border-gray-900 bg-gray-900 px-6 py-3.5 text-[13.5px] font-bold text-white transition-all duration-200 hover:bg-white hover:text-gray-900 lg:px-8 lg:py-4 lg:text-[16px]"
        >
          {ts.bookOnline}
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  );
}

function ServiceCard({ meta, info, getQuoteLabel }) {
  const { icon: Icon, number, slug, image, fallback } = meta;
  const cardRef = useRef(null);
  const imgRef = useRef(null);
  const overlayRef = useRef(null);
  const accentRef = useRef(null);

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, { y: -6, duration: 0.32, ease: "power2.out" });
    gsap.to(imgRef.current, {
      scale: 1.06,
      duration: 0.55,
      ease: "power2.out",
    });
    gsap.to(overlayRef.current, {
      opacity: 0.55,
      duration: 0.35,
      ease: "power2.out",
    });
    gsap.to(accentRef.current, {
      scaleX: 1,
      duration: 0.35,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, { y: 0, duration: 0.32, ease: "power2.out" });
    gsap.to(imgRef.current, { scale: 1, duration: 0.55, ease: "power2.out" });
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.35,
      ease: "power2.out",
    });
    gsap.to(accentRef.current, { scaleX: 0, duration: 0.3, ease: "power2.in" });
  };

  return (
    <article
      ref={cardRef}
      className="service-card group flex flex-col overflow-hidden rounded-2xl bg-white will-change-transform"
      style={{
        boxShadow: "0 1px 3px rgba(0,0,0,0.08), 0 8px 24px rgba(0,0,0,0.06)",
        border: "1px solid rgba(0,0,0,0.07)",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative h-48 w-full overflow-hidden bg-gray-900 sm:h-52 lg:h-56">
        <div ref={imgRef} className="absolute inset-0 will-change-transform">
          <Image
            src={image}
            alt={`${info.title} — professional service in Montreal`}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <div
            className="absolute inset-0 -z-10"
            style={{ background: fallback }}
            aria-hidden="true"
          />
        </div>
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-[#5E7AC4]"
          style={{ opacity: 0 }}
          aria-hidden="true"
        />
        <div className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg bg-black/60 backdrop-blur-sm">
          <span className="text-[11px] font-black tracking-tight text-white">
            {number}
          </span>
        </div>
        <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg bg-black/60 backdrop-blur-sm">
          <Icon className="h-4 w-4 text-white" strokeWidth={1.75} />
        </div>
        <div
          ref={accentRef}
          className="absolute bottom-0 left-0 h-0.75 w-full origin-left bg-[#5E7AC4]"
          style={{ scaleX: 0 }}
          aria-hidden="true"
        />
      </div>

      <div className="flex flex-1 flex-col p-5 lg:p-6">
        <h3 className="text-[16px] font-extrabold leading-snug tracking-tight text-gray-900 transition-colors duration-200 group-hover:text-[#5E7AC4] lg:text-[17px]">
          {info.title}
        </h3>
        <p
          className={`mt-2 text-[12.5px] leading-relaxed text-gray-500 lg:text-[13px] ${inter.className}`}
        >
          {info.description}
        </p>
        <ul className="mt-3.5 space-y-1.5">
          {info.bullets.map((b) => (
            <li key={b} className="flex items-center gap-2">
              <CheckCircle2
                className="h-3.5 w-3.5 shrink-0 text-[#5E7AC4]"
                strokeWidth={2}
                aria-hidden="true"
              />
              <span
                className={`text-[11.5px] font-medium text-gray-600 ${inter.className}`}
              >
                {b}
              </span>
            </li>
          ))}
        </ul>
        <div className="flex-1" />
        <Link
          href={`/services/${slug}`}
          className="group/btn mt-5 flex w-full items-center justify-between rounded-xl border border-gray-900 px-4 py-2.5 text-[12.5px] font-bold text-gray-900 transition-all duration-200 hover:border-[#5E7AC4] hover:bg-[#5E7AC4] hover:text-white lg:px-5"
        >
          <span>{getQuoteLabel}</span>
          <ArrowUpRight
            className="h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
            strokeWidth={2.5}
          />
        </Link>
      </div>
    </article>
  );
}
