"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import {
  Wind,
  CheckCircle2,
  ArrowRight,
  FlameKindling,
  Clock,
  ShieldAlert,
  Zap,
  Trash2,
  Sparkles,
} from "lucide-react";
import { urbanist } from "@/app/fonts";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function DryerVentCleaningPageCA() {
  const mainRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero Animation
      gsap.from(".hero-text", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "expo.out",
      });

      // Section Reveal
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
        <div className="absolute top-0 right-0 w-150 h-150 bg-[#5E7AC4]/5 blur-[120px] rounded-full -mr-40 -mt-40" />

        <div className="mx-auto max-w-7xl px-5 lg:px-10 relative z-10">
          <div className="max-w-4xl">
            <div className="hero-text inline-flex items-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-1.5 mb-8">
              <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[12px] font-bold tracking-[0.15em] uppercase text-red-600">
                Canadian Home Safety Standard
              </span>
            </div>

            <h1 className="hero-text text-5xl lg:text-8xl font-bold leading-none tracking-tight text-gray-900 mb-8">
              Fast Drying. <span className="text-[#5E7AC4]">Safe Home.</span>
              <br />
              Total Lint Removal.
            </h1>

            <p className="hero-text text-xl lg:text-2xl text-gray-500 leading-relaxed mb-12 max-w-2xl font-medium">
              A clogged dryer vent is one of the leading causes of residential
              fires in Canada. We use industrial-grade suction and mechanical
              brushing to clear flammable lint buildup and restore your dryer's
              efficiency.
            </p>

            <div className="hero-text flex flex-col sm:flex-row gap-5">
              <Link
                href="/contactus"
                className="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#0d0d0d] px-10 py-5 text-lg font-bold text-white transition-all hover:bg-[#5E7AC4] active:scale-[0.98] shadow-xl shadow-black/10"
              >
                Schedule Vent Cleaning <ArrowRight className="h-5 w-5" />
              </Link>
              <div className="flex items-center gap-4 px-2">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-10 w-10 rounded-full border-2 border-white bg-[#5E7AC4]/10 flex items-center justify-center"
                    >
                      <FlameKindling className="h-4 w-4 text-[#5E7AC4]" />
                    </div>
                  ))}
                </div>
                <p className="text-sm font-semibold text-gray-500 italic">
                  Certified Fire Prevention Techs
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Technical Impact ── */}
      <section className="reveal-section py-24 bg-white">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <h2 className="text-4xl font-bold tracking-tight mb-6">
                Beyond Just Lint
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed">
                Moisture trapped by lint can lead to mould growth inside your
                walls. Our service ensures a clear path for hot air and humidity
                to exit your home safely.
              </p>
            </div>
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-8">
              {[
                {
                  icon: ShieldAlert,
                  t: "Risk Mitigation",
                  d: "Eliminating flammable debris to prevent thermostat overheating and potential ignition.",
                },
                {
                  icon: Clock,
                  t: "Cycle Optimisation",
                  d: "Clothes dry in a single cycle, saving you time and reducing appliance wear.",
                },
                {
                  icon: Zap,
                  t: "Hydro Savings",
                  d: "Improved airflow reduces electricity consumption by allowing the motor to run at lower stress levels.",
                },
                {
                  icon: Trash2,
                  t: "Obstruction Removal",
                  d: "Clearing bird nests, rodent debris, or crushed pipes that commonly block exterior outlets.",
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

      {/* ── 5-Point Protocol ── */}
      <section className="reveal-section py-24 bg-[#f9fafb]">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Our Multi-Step Protocol
            </h2>
            <p className="text-gray-500 text-lg">
              We clean from both the interior and exterior for a 100% clear
              passage.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-4">
            {[
              {
                n: "01",
                t: "Velocity Test",
                d: "Measuring airflow speed in metres per second to find blockages.",
              },
              {
                n: "02",
                t: "Transition",
                d: "Disconnecting and vacuuming the back of the dryer unit.",
              },
              {
                n: "03",
                t: "Scrubbing",
                d: "Using high-speed rotary brushes to dislodge packed lint.",
              },
              {
                n: "04",
                t: "Extraction",
                d: "HEPA-certified vacuuming of the entire vent length.",
              },
              {
                n: "05",
                t: "Exterior Check",
                d: "Ensuring the outside flap or bird-guard is fully functional.",
              },
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

      {/* ── CTA Section ── */}
      <section className="reveal-section py-24 bg-white">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="rounded-[40px] bg-[#0d0d0d] overflow-hidden text-white p-10 lg:p-20 relative">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl lg:text-5xl font-bold mb-8">
                  Is your dryer <br />
                  <span className="text-[#5E7AC4]">Too Hot?</span>
                </h2>
                <div className="space-y-6">
                  {[
                    "Full sanitisation of the lint trap housing",
                    "Exterior wall cap and bird guard inspection",
                    "WSIB compliant and fully insured technicians",
                    "Before/After airflow performance report",
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
                  Book Professional Service
                  <div className="h-10 w-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </button>
              </div>
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-gray-900">
                <Image
                  src="/services_images/s4.png"
                  alt="Dryer Vent Service Canada"
                  fill
                  className="object-cover opacity-80"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
