"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, Quote } from "lucide-react";
import { urbanist, inter } from "../fonts";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────
const TESTIMONIALS = [
  {
    name: "Michael Carter",
    location: "Montreal, QC",
    avatar: "/avatars/michael.jpg",
    rating: 5,
    text: "Absolutely incredible service. The technician was professional, punctual, and thorough. Our home air quality improved noticeably the very next day. Highly recommend Impeccable Solution!",
  },
  {
    name: "Sarah Thompson",
    location: "Laval, QC",
    avatar: "/avatars/sarah.jpg",
    rating: 5,
    text: "I was skeptical at first, but after the air duct cleaning I could literally feel the difference. No more dust buildup on our vents and our HVAC runs so much quieter now.",
  },
  {
    name: "David Rodriguez",
    location: "Longueuil, QC",
    avatar: "/avatars/david.jpg",
    rating: 5,
    text: "Booked a same-day appointment and they were there within hours. The team was knowledgeable, clean, and efficient. Best home service experience I've had in years.",
  },
  {
    name: "Emily Johnson",
    location: "Brossard, QC",
    avatar: "/avatars/emily.jpg",
    rating: 4.5,
    text: "Great value for the quality of work. They explained everything step by step and showed me before/after photos. Transparent, honest, and thorough — exactly what I was looking for.",
  },
  {
    name: "James Williams",
    location: "Saint-Laurent, QC",
    avatar: "/avatars/james.jpg",
    rating: 5,
    text: "I've used two other duct cleaning companies before, and Impeccable Solution is by far the best. No upselling, no hidden fees — just excellent, professional work.",
  },
  {
    name: "Ashley Martinez",
    location: "Verdun, QC",
    avatar: "/avatars/ashley.jpg",
    rating: 5,
    text: "My allergies have been so much better since the cleaning. The technician was respectful of our home and even wore protective shoe covers. Will definitely book again annually.",
  },
];

// ─────────────────────────────────────────────
// Star rating — gold fill, gray empty
// ─────────────────────────────────────────────
function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => {
        const filled = rating >= n;
        const half   = !filled && rating >= n - 0.5;
        return (
          <span key={n} className="relative inline-block h-4 w-4">
            <Star className="h-4 w-4 text-gray-200" strokeWidth={0} fill="currentColor" />
            {(filled || half) && (
              <span
                className="absolute inset-0 overflow-hidden"
                style={{ width: half ? "55%" : "100%" }}
              >
                <Star className="h-4 w-4 text-amber-400" strokeWidth={0} fill="currentColor" />
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}

// ─────────────────────────────────────────────
// Card — white bg, black text, blue on hover
// ─────────────────────────────────────────────
function TestimonialCard({ name, location, avatar, rating, text }) {
  return (
    <article
      className={`
        group relative flex w-77.5 shrink-0 flex-col gap-4 rounded-2xl p-5
        bg-white border border-gray-100
        shadow-sm transition-all duration-300
        hover:border-[#5E7AC4]/30 hover:shadow-[0_4px_24px_rgba(94,122,196,0.1)]
        sm:w-85
        ${urbanist.className}
      `}
    >
      {/* Quote icon — light gray, turns blue on hover */}
      <Quote
        className="absolute right-5 top-4 h-7 w-7 text-gray-200 transition-colors duration-300 group-hover:text-[#5E7AC4]/25"
        strokeWidth={1.5}
        aria-hidden="true"
      />

      {/* Stars */}
      <StarRating rating={rating} />

      {/* Review text */}
      <p className={`text-[13px] leading-relaxed text-gray-500 ${inter.className}`}>
        &ldquo;{text}&rdquo;
      </p>

      {/* Author row */}
      <div className="mt-auto flex items-center gap-3 border-t border-gray-100 pt-3.5">
        {/* Avatar */}
        <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-gray-100 ring-1 ring-gray-200 transition-all duration-300 group-hover:ring-[#5E7AC4]/30">
          <Image
            src={avatar}
            alt={`${name} profile photo`}
            fill
            className="object-cover"
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          />
          {/* Initials fallback */}
          <span
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center text-[13px] font-bold text-gray-500"
          >
            {name.split(" ").map((n) => n[0]).join("")}
          </span>
        </div>

        <div className="min-w-0">
          <p className="truncate text-[13px] font-bold text-gray-900">{name}</p>
          <p className={`truncate text-[11px] text-gray-400 ${inter.className}`}>{location}</p>
        </div>
      </div>

      {/* Bottom accent line — slides in on hover */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-0.5 w-0 rounded-b-2xl bg-[#5E7AC4] transition-all duration-500 group-hover:w-full"
      />
    </article>
  );
}

// ─────────────────────────────────────────────
// Section
// ─────────────────────────────────────────────
export default function TestimonialsSection() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const track1Ref  = useRef(null);
  const track2Ref  = useRef(null);
  const tl1Ref     = useRef(null);
  const tl2Ref     = useRef(null);

  // ── Heading scroll reveal ─────────────────
  useEffect(() => {
    if (typeof window === "undefined") return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 28 },
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
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // ── Infinite scroll ticker ────────────────
  useEffect(() => {
    if (typeof window === "undefined") return;

    const setupTicker = (trackEl, direction, tlRef) => {
      if (!trackEl) return;
      const setWidth = trackEl.scrollWidth / 2;

      if (direction === "left") {
        gsap.set(trackEl, { x: 0 });
        const tl = gsap.to(trackEl, {
          x: -setWidth,
          duration: 34,
          ease: "none",
          repeat: -1,
          onRepeat: () => gsap.set(trackEl, { x: 0 }),
        });
        tl.restart(true);
        tlRef.current = tl;
      } else {
        gsap.set(trackEl, { x: -setWidth });
        const tl = gsap.to(trackEl, {
          x: 0,
          duration: 34,
          ease: "none",
          repeat: -1,
          onRepeat: () => gsap.set(trackEl, { x: -setWidth }),
        });
        tl.restart(true);
        tlRef.current = tl;
      }
    };

    setupTicker(track1Ref.current, "left",  tl1Ref);
    setupTicker(track2Ref.current, "right", tl2Ref);

    return () => {
      tl1Ref.current?.kill();
      tl2Ref.current?.kill();
    };
  }, []);

  const pause  = () => { tl1Ref.current?.pause();  tl2Ref.current?.pause();  };
  const resume = () => { tl1Ref.current?.resume(); tl2Ref.current?.resume(); };

  const row1 = [...TESTIMONIALS, ...TESTIMONIALS];
  const row2 = [...[...TESTIMONIALS].reverse(), ...[...TESTIMONIALS].reverse()];

  return (
    <section
      ref={sectionRef}
      aria-labelledby="testimonials-heading"
      className={`relative w-full overflow-hidden bg-gray-50 py-20 lg:py-28 ${urbanist.className}`}
    >
      {/* Top border accent line */}
      <div
        aria-hidden="true"
        className="absolute left-0 right-0 top-0 h-px bg-gray-200"
      />

      {/* ── Heading ── */}
      <div ref={headingRef} className="relative z-10 mx-auto max-w-7xl px-5 text-center lg:px-12">

        {/* Eyebrow */}
        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-gray-400">
          Testimonials
        </p>

        {/* H2 */}
        <h2
          id="testimonials-heading"
          className="text-[28px] font-extrabold leading-tight tracking-tight text-gray-900 sm:text-[34px] lg:text-[40px]"
        >
          Our{" "}
          <span className="relative inline-block">
            Happy Customers
            {/* Blue underline accent — only touch of blue in heading */}
            <svg
              aria-hidden="true"
              className="absolute -bottom-1.5 left-0 w-full"
              viewBox="0 0 280 6"
              fill="none"
            >
              <path
                d="M2 5 C70 1, 210 1, 278 5"
                stroke="#5E7AC4"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.5"
              />
            </svg>
          </span>
        </h2>

        {/* Description */}
        <p className={`mx-auto mt-5 max-w-xl text-[14.5px] leading-relaxed text-gray-500 ${inter.className}`}>
          Real results, genuine satisfaction, and cleaner air you can feel.
          Here&apos;s what our clients say about their experience.
        </p>
      </div>

      {/* ── Ticker tracks ── */}
      <div
        className="relative z-10 mt-12 flex flex-col gap-4 overflow-hidden"
        onMouseEnter={pause}
        onMouseLeave={resume}
        onFocus={pause}
        onBlur={resume}
        aria-label="Customer testimonials carousel"
      >
        {/* Edge fade masks — match bg-gray-50 */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 z-20 w-24"
          style={{ background: "linear-gradient(to right, #f9fafb, transparent)" }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 z-20 w-24"
          style={{ background: "linear-gradient(to left, #f9fafb, transparent)" }}
        />

        {/* Row 1 — left */}
        <div
          ref={track1Ref}
          className="flex gap-4 will-change-transform"
          style={{ width: "max-content" }}
        >
          {row1.map((t, i) => (
            <div key={`r1-${i}`} className="t-card">
              <TestimonialCard {...t} />
            </div>
          ))}
        </div>

        {/* Row 2 — right */}
        <div
          ref={track2Ref}
          className="flex gap-4 will-change-transform"
          style={{ width: "max-content" }}
        >
          {row2.map((t, i) => (
            <div key={`r2-${i}`} className="t-card">
              <TestimonialCard {...t} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Bottom CTA ── */}
      <div className={`relative z-10 mt-12 flex flex-col items-center gap-3 text-center ${inter.className}`}>
        <p className="text-[13px] text-gray-400">
          Join 800+ satisfied homeowners across Greater Montreal
        </p>
        <a
          href="/reviews"
          className={`
            inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white
            px-5 py-2.5 text-[13px] font-bold text-gray-700 shadow-sm
            transition-all duration-200
            hover:border-[#5E7AC4] hover:text-[#5E7AC4] hover:shadow-[0_0_0_3px_rgba(94,122,196,0.08)]
            active:scale-[0.98]
            ${urbanist.className}
          `}
        >
          Read All Reviews →
        </a>
      </div>
    </section>
  );
}