"use client";

import { useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Star, Quote } from "lucide-react";
import { urbanist, inter } from "../fonts";
import Link from "next/link";

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
// Stars
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
              <span className="absolute inset-0 overflow-hidden" style={{ width: half ? "55%" : "100%" }}>
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
// Card
// ─────────────────────────────────────────────
function TestimonialCard({ name, location, avatar, rating, text }) {
  return (
    <article
      className={`group relative flex w-72.5 shrink-0 select-none flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:border-[#5E7AC4]/30 hover:shadow-[0_4px_24px_rgba(94,122,196,0.1)] xs:w-[310px] sm:w-85 ${urbanist.className}`}
    >
      <Quote className="absolute right-5 top-4 h-6 w-6 text-gray-200 transition-colors duration-300 group-hover:text-[#5E7AC4]/25" strokeWidth={1.5} aria-hidden="true" />
      <StarRating rating={rating} />
      <p className={`text-[13px] leading-relaxed text-gray-500 ${inter.className}`}>&ldquo;{text}&rdquo;</p>
      <div className="mt-auto flex items-center gap-3 border-t border-gray-100 pt-3.5">
        <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-gray-100 ring-1 ring-gray-200 transition-all duration-300 group-hover:ring-[#5E7AC4]/30">
          <Image src={avatar} alt={`${name} profile photo`} fill className="object-cover" onError={(e) => { e.currentTarget.style.display = "none"; }} />
          <span aria-hidden="true" className="absolute inset-0 flex items-center justify-center text-[12px] font-bold text-gray-500">
            {name.split(" ").map((n) => n[0]).join("")}
          </span>
        </div>
        <div className="min-w-0">
          <p className="truncate text-[13px] font-bold text-gray-900">{name}</p>
          <p className={`truncate text-[11px] text-gray-400 ${inter.className}`}>{location}</p>
        </div>
      </div>
      {/* Blue sweep on hover */}
      <div aria-hidden="true" className="absolute bottom-0 left-0 h-0.5 w-0 rounded-b-2xl bg-[#5E7AC4] transition-all duration-500 group-hover:w-full" />
    </article>
  );
}

// ─────────────────────────────────────────────
// useDragScroll — mouse drag + touch swipe
// Works on any scrollable container ref
// ─────────────────────────────────────────────
function useDragScroll(containerRef, onDragStart, onDragEnd) {
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let isDown   = false;
    let startX   = 0;
    let scrollLeft = 0;
    let isDragging = false; // true only after threshold crossed
    const THRESHOLD = 6; // px before we call it a drag

    // ── Mouse ─────────────────────────────────
    const onMouseDown = (e) => {
      isDown = true;
      isDragging = false;
      startX = e.pageX - el.offsetLeft;
      scrollLeft = el.scrollLeft;
      el.style.cursor = "grabbing";
    };

    const onMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x    = e.pageX - el.offsetLeft;
      const walk = x - startX;
      if (!isDragging && Math.abs(walk) > THRESHOLD) {
        isDragging = true;
        onDragStart?.();
      }
      if (isDragging) el.scrollLeft = scrollLeft - walk;
    };

    const onMouseUp = () => {
      if (isDown) {
        isDown = false;
        el.style.cursor = "grab";
        if (isDragging) onDragEnd?.();
        isDragging = false;
      }
    };

    const onMouseLeave = () => {
      if (isDown) {
        isDown = false;
        el.style.cursor = "grab";
        if (isDragging) onDragEnd?.();
        isDragging = false;
      }
    };

    // ── Touch ────────────────────────────────
    let touchStartX   = 0;
    let touchScrollLeft = 0;
    let isTouching = false;

    const onTouchStart = (e) => {
      isTouching = true;
      touchStartX = e.touches[0].pageX - el.offsetLeft;
      touchScrollLeft = el.scrollLeft;
      onDragStart?.();
    };

    const onTouchMove = (e) => {
      if (!isTouching) return;
      const x    = e.touches[0].pageX - el.offsetLeft;
      const walk = x - touchStartX;
      el.scrollLeft = touchScrollLeft - walk;
    };

    const onTouchEnd = () => {
      isTouching = false;
      onDragEnd?.();
    };

    // Prevent click events from firing after a drag
    const onClickCapture = (e) => {
      if (isDragging) e.stopPropagation();
    };

    el.style.cursor = "grab";
    el.addEventListener("mousedown",  onMouseDown);
    el.addEventListener("mousemove",  onMouseMove, { passive: false });
    el.addEventListener("mouseup",    onMouseUp);
    el.addEventListener("mouseleave", onMouseLeave);
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove",  onTouchMove,  { passive: true });
    el.addEventListener("touchend",   onTouchEnd);
    el.addEventListener("click",      onClickCapture, true);

    return () => {
      el.removeEventListener("mousedown",  onMouseDown);
      el.removeEventListener("mousemove",  onMouseMove);
      el.removeEventListener("mouseup",    onMouseUp);
      el.removeEventListener("mouseleave", onMouseLeave);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove",  onTouchMove);
      el.removeEventListener("touchend",   onTouchEnd);
      el.removeEventListener("click",      onClickCapture, true);
    };
  }, [containerRef, onDragStart, onDragEnd]);
}

// ─────────────────────────────────────────────
// Section
// ─────────────────────────────────────────────
export default function TestimonialsSection() {
  const sectionRef  = useRef(null);
  const headingRef  = useRef(null);

  // We use a SINGLE scrollable row instead of two GSAP tracks,
  // because drag + GSAP x-transform fight each other.
  // The auto-scroll is CSS-based (no conflict with scrollLeft).
  const rowRef      = useRef(null);

  // Auto-scroll state
  const autoScrollRef    = useRef(null);
  const isPausedRef      = useRef(false);
  const SCROLL_SPEED     = 0.6; // px per frame

  // ── Heading reveal ───────────────────────
  useEffect(() => {
    if (typeof window === "undefined") return;
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 28 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 88%", toggleActions: "play none none none" },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // ── Auto-scroll via rAF ──────────────────
  // We scroll the container's scrollLeft each frame.
  // When we reach the halfway point we snap back to 0 (seamless loop).
  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;

    // Wait for layout so scrollWidth is correct
    const raf = requestAnimationFrame(() => {
      const tick = () => {
        if (!isPausedRef.current && el) {
          el.scrollLeft += SCROLL_SPEED;
          // Seamless loop: when we've scrolled one full "set" width, jump back
          const halfWidth = el.scrollWidth / 2;
          if (el.scrollLeft >= halfWidth) {
            el.scrollLeft -= halfWidth;
          }
        }
        autoScrollRef.current = requestAnimationFrame(tick);
      };
      autoScrollRef.current = requestAnimationFrame(tick);
    });

    return () => {
      cancelAnimationFrame(raf);
      if (autoScrollRef.current) cancelAnimationFrame(autoScrollRef.current);
    };
  }, []);

  const pauseScroll  = useCallback(() => { isPausedRef.current = true;  }, []);
  const resumeScroll = useCallback(() => { isPausedRef.current = false; }, []);

  // Attach drag + touch to the row
  useDragScroll(rowRef, pauseScroll, resumeScroll);

  // Duplicate cards for seamless loop
  const allCards = [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section
    id="reviews"
      ref={sectionRef}
      aria-labelledby="testimonials-heading"
      className={`relative w-full overflow-hidden bg-gray-50 py-16 sm:py-20 lg:py-28 ${urbanist.className}`}
    >
      {/* Top border */}
      <div aria-hidden="true" className="absolute left-0 right-0 top-0 h-px bg-gray-200" />

      {/* ── Heading ── */}
      <div ref={headingRef} className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-12">
        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-gray-400">
          Testimonials
        </p>
        <h2
          id="testimonials-heading"
          className="text-[26px] font-extrabold leading-tight tracking-tight text-gray-900 sm:text-[34px] lg:text-[40px]"
        >
          Our{" "}
          <span className="relative inline-block">
            Happy Customers
            <svg aria-hidden="true" className="absolute -bottom-1.5 left-0 w-full" viewBox="0 0 280 6" fill="none">
              <path d="M2 5 C70 1, 210 1, 278 5" stroke="#5E7AC4" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
            </svg>
          </span>
        </h2>
        <p className={`mx-auto mt-5 max-w-xl text-[14px] leading-relaxed text-gray-500 sm:text-[14.5px] ${inter.className}`}>
          Real results, genuine satisfaction, and cleaner air you can feel.
          Here&apos;s what our clients say about their experience.
        </p>

        {/* Drag hint — mobile only */}
        <p className={`mt-3 text-[11px] text-gray-400 sm:hidden ${inter.className}`}>
          ← Swipe or drag to browse →
        </p>
      </div>

      {/* ── Single scrollable row ── */}
      <div className="relative z-10 mt-10 sm:mt-12">

        {/* Edge fade masks */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 sm:w-24"
          style={{ background: "linear-gradient(to right, #f9fafb, transparent)" }} />
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 sm:w-24"
          style={{ background: "linear-gradient(to left, #f9fafb, transparent)" }} />

        {/*
          The scrollable container:
          - overflow-x: scroll for native scrollLeft manipulation
          - scrollbar hidden via CSS
          - cursor: grab applied by useDragScroll hook
        */}
        <div
          ref={rowRef}
          className="flex gap-4 overflow-x-scroll px-6 pb-2 sm:px-10"
          style={{
            scrollbarWidth: "none",      /* Firefox */
            msOverflowStyle: "none",     /* IE/Edge */
            WebkitOverflowScrolling: "touch",
          }}
          // Hide scrollbar in Webkit
          onScroll={() => {}}           /* keep as controlled */
          aria-label="Customer testimonials carousel — drag or swipe to browse"
          onMouseEnter={pauseScroll}
          onMouseLeave={resumeScroll}
          onFocus={pauseScroll}
          onBlur={resumeScroll}
        >
          {allCards.map((t, i) => (
            <TestimonialCard key={`card-${i}`} {...t} />
          ))}
        </div>

        {/* Hide scrollbar globally for this element */}
        <style>{`
          div[aria-label="Customer testimonials carousel — drag or swipe to browse"]::-webkit-scrollbar {
            display: none;
          }
        `}</style>
      </div>

      {/* ── CTA ── */}
      <div className={`relative z-10 mt-10 flex flex-col items-center gap-3 px-4 text-center sm:mt-12 ${inter.className}`}>
        <p className="text-[13px] text-gray-400">
          Join 800+ satisfied homeowners across Greater Montreal
        </p>
        <Link
          href="/contactus"
          className={`inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-5 py-2.5 text-[13px] font-bold text-gray-700 shadow-sm transition-all duration-200 hover:border-[#5E7AC4] hover:text-[#5E7AC4] hover:shadow-[0_0_0_3px_rgba(94,122,196,0.08)] active:scale-[0.98] ${urbanist.className}`}
        >
          Read All Reviews →
        </Link>
      </div>
    </section>
  );
}