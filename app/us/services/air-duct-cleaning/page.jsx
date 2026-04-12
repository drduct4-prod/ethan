"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import {
  Wind,
  CheckCircle2,
  ShieldCheck,
  Zap,
  ArrowRight,
  ShieldAlert,
  Droplets,
  Activity,
  Waves,
} from "lucide-react";
import { urbanist, inter } from "@/app/fonts";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AirDuctCleaningPage() {
  const mainRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Smooth Fade In for Hero
      gsap.from(".hero-text", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "expo.out",
      });

      // Scroll animations for sections
      gsap.utils.toArray(".reveal-section").forEach((section) => {
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      });
    }, mainRef);
    return () => ctx.revert();
  }, []);

  return (
    <main
      ref={mainRef}
      className={`min-h-screen bg-white text-gray-900 ${urbanist.className}`}
    >
      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden pt-28 pb-20 lg:pt-40 lg:pb-32 bg-[#fcfcfc]">
        {/* Soft Mesh Gradient Overlay */}
        <div className="absolute top-0 right-0 w-150 h-150 bg-[#5E7AC4]/5 blur-[120px] rounded-full -mr-40 -mt-40" />

        <div className="mx-auto max-w-7xl px-5 lg:px-10 relative z-10">
          <div className="max-w-4xl">
            <div className="hero-text inline-flex items-center gap-2 rounded-full border border-[#5E7AC4]/20 bg-[#5E7AC4]/5 px-4 py-1.5 mb-8">
              <span className="flex h-2 w-2 rounded-full bg-[#5E7AC4] animate-pulse" />
              <span className="text-[12px] font-bold tracking-[0.15em] uppercase text-[#5E7AC4]">
                NADCA Certified Duct Specialists
              </span>
            </div>

            <h1 className="hero-text text-5xl lg:text-8xl font-bold leading-none tracking-tight text-gray-900 mb-8">
              Pure Air. <span className="text-[#5E7AC4]">Purified.</span>
              <br />
              Premium Duct Care.
            </h1>

            <p className="hero-text text-xl lg:text-2xl text-gray-500 leading-relaxed mb-12 max-w-2xl font-medium">
              We go beyond surface cleaning. Using industrial-grade HEPA filtration, 
              we eliminate 99.9% of pollutants to ensure your family breathes 
              cleaner, healthier indoor air.
            </p>

            <div className="hero-text flex flex-col sm:flex-row gap-5">
              <Link
                href="/book"
                className="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#0d0d0d] px-10 py-5 text-lg font-bold text-white transition-all hover:bg-[#5E7AC4] active:scale-[0.98] shadow-xl shadow-black/10"
              >
                Get a Free Quote <ArrowRight className="h-5 w-5" />
              </Link>
              <div className="flex items-center gap-4 px-2">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-10 w-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden"
                    >
                      <div className="h-full w-full bg-[#5E7AC4]/20" />
                    </div>
                  ))}
                </div>
                <p className="text-sm font-semibold text-gray-500 italic">
                  Top-Rated Service in Your Area
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── The Health Impact (Details Section) ── */}
      <section className="reveal-section py-24 bg-white">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <h2 className="text-4xl font-bold tracking-tight mb-6">
                What's Hiding in Your Air Vents?
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed">
                The average American home accumulates up to 40lbs of dust and 
                allergens annually. Your HVAC system could be circulating 
                harmful particles throughout your living space.
              </p>
            </div>
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-8">
              {[
                {
                  icon: Droplets,
                  t: "Mold & Bacteria",
                  d: "Moisture in ducts creates a breeding ground for biological growth that spreads whenever your AC runs.",
                },
                {
                  icon: Activity,
                  t: "Allergen Control",
                  d: "Drastically reduce common triggers for asthma, pet dander, and seasonal pollen allergies.",
                },
                {
                  icon: Waves,
                  t: "Odor Removal",
                  d: "Neutralize persistent smells from pets, cooking, or smoke trapped within built-up debris.",
                },
                {
                  icon: Zap,
                  t: "Lower Energy Bills",
                  d: "Clean systems run more efficiently, potentially reducing your monthly heating and cooling costs by 15%.",
                },
              ].map((item, i) => (
                <div key={i} className="group">
                  <item.icon className="h-8 w-8 text-[#5E7AC4] mb-4 transition-transform group-hover:scale-110" />
                  <h4 className="text-xl font-bold mb-2">{item.t}</h4>
                  <p className="text-gray-500 leading-snug">{item.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Process Section ── */}
      <section className="reveal-section py-24 bg-[#f9fafb]">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Our Professional Process
            </h2>
            <p className="text-gray-500 text-lg">
              We strictly adhere to NADCA standards to restore your HVAC system to like-new condition.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-4">
            {[
              { n: "01", t: "Inspection", d: "Full video diagnostic of your main trunk lines." },
              { n: "02", t: "Pressurize", d: "Creating negative pressure for maximum suction." },
              { n: "03", t: "Agitate", d: "Using specialized brushes to dislodge debris." },
              { n: "04", t: "Vacuum", d: "High-powered HEPA collection of all dust." },
              { n: "05", t: "Sanitize", d: "Optional EPA-registered antimicrobial fogging." },
            ].map((step, i) => (
              <div
                key={i}
                className="relative bg-white border border-gray-100 p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow"
              >
                <span className="text-[40px] font-black text-[#5E7AC4]/10 absolute top-4 right-6 leading-none">
                  {step.n}
                </span>
                <h4 className="text-xl font-bold mb-3 relative z-10">
                  {step.t}
                </h4>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {step.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Visual Comparison Section ── */}
      <section className="reveal-section py-24 bg-white">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="rounded-[40px] bg-[#0d0d0d] overflow-hidden text-white p-10 lg:p-20 relative">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl lg:text-5xl font-bold mb-8">
                  Ready for a <br />
                  <span className="text-[#5E7AC4]">Fresh Start?</span>
                </h2>
                <div className="space-y-6">
                  {[
                    "Licensed, insured, and background-checked",
                    "Complete floor and wall protection used",
                    "Real-time Before & After photo proof",
                    "Transparent pricing—no hidden 'per-vent' fees",
                  ].map((text, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="h-6 w-6 rounded-full bg-[#5E7AC4]/20 flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-[#5E7AC4]" />
                      </div>
                      <span className="text-lg text-gray-300">{text}</span>
                    </div>
                  ))}
                </div>
                <button className="mt-12 group flex items-center gap-3 text-xl font-bold">
                  Learn about our equipment
                  <div className="h-10 w-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </button>
              </div>
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gray-800 animate-pulse" />
                <Image
                  src="/images/duct-cleaning-action.jpg"
                  alt="Professional Duct Cleaning in Progress"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}