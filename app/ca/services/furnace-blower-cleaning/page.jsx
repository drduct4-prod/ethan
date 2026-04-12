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
  Zap,
  Settings, // Mechanical focus
  Gauge, // Performance
  ShieldCheck,
  RotateCw, // Blower wheel rotation
  Volume2, // Noise reduction
} from "lucide-react";
import { urbanist } from "@/app/fonts";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function FurnaceBlowerCleaningPage() {
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
            <div className="hero-text inline-flex items-center gap-2 rounded-full border border-[#5E7AC4]/20 bg-[#5E7AC4]/5 px-4 py-1.5 mb-8">
              <span className="flex h-2 w-2 rounded-full bg-[#5E7AC4] animate-pulse" />
              <span className="text-[12px] font-bold tracking-[0.15em] uppercase text-[#5E7AC4]">
                Precision Motor Maintenance
              </span>
            </div>

            <h1 className="hero-text text-5xl lg:text-8xl font-bold leading-none tracking-tight text-gray-900 mb-8">
              Quiet Power. <span className="text-[#5E7AC4]">Restored.</span>
              <br />
              Blower Precision.
            </h1>

            <p className="hero-text text-xl lg:text-2xl text-gray-500 leading-relaxed mb-12 max-w-2xl font-medium">
              A dirty blower wheel can reduce airflow by up to 30% and cause
              motor burnout. We perform deep-fin cleaning and lubrication to
              keep your furnace running silently and efficiently.
            </p>

            <div className="hero-text flex flex-col sm:flex-row gap-5">
              <Link
                href="/book"
                className="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#0d0d0d] px-10 py-5 text-lg font-bold text-white transition-all hover:bg-[#5E7AC4] active:scale-[0.98] shadow-xl shadow-black/10"
              >
                Schedule Blower Service <ArrowRight className="h-5 w-5" />
              </Link>
              <div className="flex items-center gap-4 px-2">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-10 w-10 rounded-full border-2 border-white bg-[#5E7AC4]/10 flex items-center justify-center"
                    >
                      <Settings className="h-4 w-4 text-[#5E7AC4]" />
                    </div>
                  ))}
                </div>
                <p className="text-sm font-semibold text-gray-500 italic">
                  Extending Furnace Life by Years
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mechanical Benefits ── */}
      <section className="reveal-section py-24 bg-white">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <h2 className="text-4xl font-bold tracking-tight mb-6">
                The Heart of Your HVAC
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed">
                The blower assembly is responsible for pushing air through your
                entire home. Dirt on the blades creates drag, imbalance, and
                mechanical stress.
              </p>
            </div>
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-8">
              {[
                {
                  icon: RotateCw,
                  t: "CFM Recovery",
                  d: "Cleaning 'squirrel cage' fins restores full Cubic Feet per Minute airflow capacity.",
                },
                {
                  icon: Volume2,
                  t: "Noise Reduction",
                  d: "Eliminates the humming and vibration caused by unbalanced, dust-heavy blower wheels.",
                },
                {
                  icon: Zap,
                  t: "Motor Longevity",
                  d: "Reducing drag lowers the motor's operating temperature, preventing electrical shorts.",
                },
                {
                  icon: Gauge,
                  t: "Static Pressure Fix",
                  d: "Optimizes the pressure across your heat exchanger to prevent system cycling.",
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

      {/* ── Service Steps ── */}
      <section className="reveal-section py-24 bg-[#f9fafb]">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Technical Cleaning Process
            </h2>
            <p className="text-gray-500 text-lg">
              We don't just spray; we disassemble and restore.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-4">
            {[
              {
                n: "01",
                t: "Isolate",
                d: "Full power cut and electrical safety check.",
              },
              {
                n: "02",
                t: "Extract",
                d: "Removing the entire blower assembly unit.",
              },
              {
                n: "03",
                t: "Deep Clean",
                d: "Manual brushing of every single fan blade.",
              },
              {
                n: "04",
                t: "Lube",
                d: "Oiling motor bearings (if applicable) and shafts.",
              },
              {
                n: "05",
                t: "Rebalance",
                d: "Reinstalling and verifying vibration-free spin.",
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

      {/* ── CTA / Comparison ── */}
      <section className="reveal-section py-24 bg-white">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="rounded-[40px] bg-[#0d0d0d] overflow-hidden text-white p-10 lg:p-20 relative">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl lg:text-5xl font-bold mb-8">
                  Stop the <br />
                  <span className="text-[#5E7AC4]">Vibration.</span>
                </h2>
                <div className="space-y-6">
                  {[
                    "Complete blower wheel removal and cleaning",
                    "Motor housing vacuuming & dusting",
                    "Fan belt inspection & tension adjustment",
                    "Capacitor performance testing",
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
                  Book Technical Service
                  <div className="h-10 w-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </button>
              </div>
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-gray-900">
                <div className="absolute inset-0 bg-linear-to-br from-[#5E7AC4]/20 to-transparent" />
                <Image
                  src="/images/furnace-blower-wheel.jpg"
                  alt="Furnace Blower Maintenance"
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