"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Plus, Minus, ArrowRight, MessageCircle } from "lucide-react";
import { urbanist, inter } from "../fonts";

gsap.registerPlugin(ScrollTrigger);

// ─────────────────────────────────────────────────────────────
// FAQ data — crawlable plain text, great for SEO & rich results
// ─────────────────────────────────────────────────────────────
const FAQS = [
  {
    id: "faq-1",
    question: "How often should I get my air ducts cleaned?",
    answer:
      "Typically every 2–3 years, depending on usage, pets, and indoor air quality. Homes with pets, smokers, or allergy sufferers benefit from more frequent cleaning to maintain a healthy environment.",
  },
  {
    id: "faq-2",
    question: "How long does a duct cleaning service take?",
    answer:
      "Usually between 2 to 4 hours depending on the size of your home and the number of vents. Our team works efficiently so you can get back to your routine as quickly as possible.",
  },
  {
    id: "faq-3",
    question: "Do you offer free estimates?",
    answer:
      "Yes! We provide free quotes with no hidden charges. You can easily request one through our online form or by phone — we'll get back to you within 24 hours.",
  },
  {
    id: "faq-4",
    question: "Is duct cleaning messy or disruptive?",
    answer:
      "Not at all. We use advanced negative-pressure equipment and protective coverings to ensure a completely clean, mess-free process. Your home will look exactly as you left it.",
  },
  {
    id: "faq-5",
    question: "Do you also clean dryer vents or furnaces?",
    answer:
      "Yes — we offer complete HVAC cleaning including dryer vents, furnace blowers, heat pumps, air exchangers, and central vacuum systems. One call covers your entire home.",
  },
  {
    id: "faq-6",
    question: "Are your cleaning products safe for kids and pets?",
    answer:
      "Absolutely. We use eco-friendly, non-toxic, and certified-safe cleaning solutions throughout every job. Your family's health and safety is always our top priority.",
  },
];

// ─────────────────────────────────────────────────────────────
// FAQSection
// ─────────────────────────────────────────────────────────────
export default function FAQSection() {
  const sectionRef  = useRef(null);
  const headingRef  = useRef(null);
  const listRef     = useRef(null);
  const imageRef    = useRef(null);
  const [openId, setOpenId] = useState("faq-1"); // first open by default

  // ── Scroll-triggered entrance animations ──────────────────
  useEffect(() => {
    const ctx = gsap.context(() => {

      // Heading fade-up
      gsap.fromTo(
        headingRef.current?.querySelectorAll(".anim-h"),
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 84%",
            once: true,
          },
        }
      );

      // FAQ items stagger
      gsap.fromTo(
        listRef.current?.querySelectorAll(".faq-item"),
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 82%",
            once: true,
          },
        }
      );

      // Image slides in from right — lightweight translateX only
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: 48 },
        {
          opacity: 1,
          x: 0,
          duration: 0.75,
          ease: "power3.out",
          scrollTrigger: {
            trigger: imageRef.current,
            start: "top 80%",
            once: true,
          },
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggle = useCallback((id) => {
    setOpenId((prev) => (prev === id ? null : id));
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="faq-heading"
      className={`w-full bg-white ${urbanist.className}`}
    >
      <div className="h-px w-full bg-gray-100" />

      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 md:px-8 lg:px-12 lg:py-24 xl:px-16 xl:py-28">

        {/* ── Section heading ── */}
        <div ref={headingRef} className="mb-10 lg:mb-14">
          <div className="anim-h mb-3 flex items-center gap-3">
            <span className="h-px w-8 bg-[#5E7AC4]" />
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#5E7AC4]">
              FAQ
            </p>
          </div>
          <h2
            id="faq-heading"
            className="anim-h max-w-xl text-[26px] font-extrabold leading-[1.1] tracking-tight text-gray-900 sm:text-[32px] md:text-[36px] lg:text-[42px] xl:text-[48px]"
          >
            Do You Have{" "}
            <span className="text-[#5E7AC4]">Any Questions?</span>
          </h2>
          <p
            className={`anim-h mt-3 max-w-lg text-[13px] leading-relaxed text-gray-500 sm:text-[14px] lg:mt-4 lg:text-[15px] ${inter.className}`}
          >
            Everything you need to know about our HVAC cleaning and home services.
            Can&apos;t find your answer?{" "}
            <Link
              href="/contact"
              className="font-semibold text-gray-700 underline underline-offset-2 hover:text-[#5E7AC4] transition-colors"
            >
              Talk to us free.
            </Link>
          </p>
        </div>

        {/* ── Two-column layout ── */}
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-14 xl:gap-20">

          {/* ── LEFT — FAQ accordion ── */}
          <div ref={listRef} className="w-full min-w-0 flex-1">

            {/*
              JSON-LD schema — invisible to users, crawlable by Google.
              Enables FAQ rich results in search.
            */}
            <script
              type="application/ld+json"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  "@context": "https://schema.org",
                  "@type": "FAQPage",
                  mainEntity: FAQS.map((f) => ({
                    "@type": "Question",
                    name: f.question,
                    acceptedAnswer: { "@type": "Answer", text: f.answer },
                  })),
                }),
              }}
            />

            <div className="space-y-3" role="list">
              {FAQS.map((faq, i) => (
                <FAQItem
                  key={faq.id}
                  faq={faq}
                  index={i}
                  isOpen={openId === faq.id}
                  onToggle={toggle}
                />
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Link
                href="/quote"
                className="group flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-6 py-3 text-[13px] font-bold text-white transition-all duration-200 hover:bg-[#5E7AC4] sm:justify-start lg:px-7 lg:py-3.5 lg:text-[14px]"
              >
                Get a Free Quote
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/contact"
                className={`flex items-center justify-center gap-2 text-[13px] font-semibold text-gray-500 transition-colors hover:text-gray-900 sm:justify-start ${inter.className}`}
              >
                <MessageCircle className="h-4 w-4" strokeWidth={1.75} />
                Or contact us directly
              </Link>
            </div>
          </div>

          {/* ── RIGHT — image panel ── */}
          <div
            ref={imageRef}
            className="w-full shrink-0 lg:w-[42%] xl:w-[44%]"
          >
            <div
              className="relative w-full overflow-hidden rounded-2xl bg-gray-100"
              style={{
                aspectRatio: "4/5",
                boxShadow: "0 2px 4px rgba(0,0,0,0.06), 0 16px 48px rgba(0,0,0,0.10)",
              }}
            >
              {/* Replace /faq-image.jpg with your actual image */}
              <Image
                src="/services_images/faq_image.jpg"
                alt="Professional HVAC and duct cleaning service technician — Impeccable Solution Montreal"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 44vw"
                onError={(e) => { e.currentTarget.style.display = "none"; }}
              />

              {/* Fallback gradient shown when image not yet added */}
              <div
                className="absolute inset-0 -z-10"
                style={{
                  background: "linear-gradient(145deg,#0d1117 0%,#1c2b42 60%,#2a3f60 100%)",
                }}
                aria-hidden="true"
              />

              {/* Floating glass card — bottom-left */}
              <div
                className="absolute bottom-5 left-5 right-5 rounded-xl p-4 sm:bottom-6 sm:left-6 sm:right-6 sm:p-5"
                style={{
                  background: "rgba(255,255,255,0.10)",
                  backdropFilter: "blur(16px)",
                  WebkitBackdropFilter: "blur(16px)",
                  border: "1px solid rgba(255,255,255,0.18)",
                }}
              >
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/60 sm:text-[12px]">
                  Why choose us?
                </p>
                <div className="mt-3 grid grid-cols-2 gap-y-2 gap-x-4">
                  {[
                    "NADCA Certified",
                    "Licensed & Insured",
                    "Eco-safe products",
                    "24 hr response",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-1.5">
                      <span className="h-1 w-1 rounded-full bg-[#5E7AC4] shrink-0" />
                      <span className={`text-[11px] font-medium text-white/80 sm:text-[12px] ${inter.className}`}>
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────
// FAQItem — isolated accordion item with CSS height transition
// Using CSS max-height for the smoothest possible performance
// (no GSAP per-item to keep mobile fast & lag-free)
// ─────────────────────────────────────────────────────────────
function FAQItem({ faq, index, isOpen, onToggle }) {
  const answerRef = useRef(null);

  // Animate height with GSAP for pixel-perfect smoothness
  useEffect(() => {
    const el = answerRef.current;
    if (!el) return;

    if (isOpen) {
      // Measure real height then animate to it
      gsap.set(el, { height: "auto", overflow: "hidden" });
      const h = el.offsetHeight;
      gsap.fromTo(
        el,
        { height: 0 },
        { height: h, duration: 0.36, ease: "power3.out", clearProps: "height,overflow" }
      );
    } else {
      gsap.to(el, {
        height: 0,
        duration: 0.28,
        ease: "power2.in",
        overwrite: true,
        onComplete: () => gsap.set(el, { overflow: "hidden" }),
      });
    }
  }, [isOpen]);

  return (
    <div
      className="faq-item"
      role="listitem"
      itemScope
      itemProp="mainEntity"
      itemType="https://schema.org/Question"
    >
      <div
        className="overflow-hidden rounded-xl transition-shadow duration-200"
        style={{
          boxShadow: isOpen
            ? "0 0 0 1.5px #5E7AC4, 0 8px 24px rgba(94,122,196,0.10)"
            : "0 0 0 1px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)",
          background: isOpen ? "#fafbff" : "#ffffff",
          transition: "box-shadow 0.25s ease, background 0.25s ease",
        }}
      >
        {/* Question button — fully accessible */}
        <button
          onClick={() => onToggle(faq.id)}
          aria-expanded={isOpen}
          aria-controls={`${faq.id}-answer`}
          id={`${faq.id}-btn`}
          className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-4.5 lg:py-5"
        >
          <h3
            className="text-[13.5px] font-bold leading-snug text-gray-900 sm:text-[14px] lg:text-[15px]"
            itemProp="name"
          >
            {faq.question}
          </h3>

          {/* Rotating icon — CSS only, no GSAP, max performance */}
          <span
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors duration-200"
            style={{
              background: isOpen ? "#5E7AC4" : "rgba(0,0,0,0.05)",
            }}
            aria-hidden="true"
          >
            {isOpen ? (
              <Minus className="h-3.5 w-3.5 text-white" strokeWidth={2.5} />
            ) : (
              <Plus className="h-3.5 w-3.5 text-gray-600" strokeWidth={2.5} />
            )}
          </span>
        </button>

        {/* Answer — height animated by GSAP */}
        <div
          ref={answerRef}
          id={`${faq.id}-answer`}
          role="region"
          aria-labelledby={`${faq.id}-btn`}
          style={{ height: isOpen ? "auto" : 0, overflow: "hidden" }}
          itemScope
          itemProp="acceptedAnswer"
          itemType="https://schema.org/Answer"
        >
          <p
            className={`px-5 pb-5 text-[13px] leading-relaxed text-gray-500 sm:px-6 sm:pb-5 lg:text-[13.5px] ${inter.className}`}
            itemProp="text"
          >
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  );
}