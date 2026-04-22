import Image from "next/image";
import Link from "next/link";
import {
  Wind,
  CheckCircle2,
  ArrowRight,
  Zap,
  Droplets,
  Settings2,
  Activity,
} from "lucide-react";
import { urbanist } from "@/app/fonts";

// ── SEO Metadata ──
export const metadata = {
  title: "Heat Pump Cleaning Montreal | Restore Efficiency & Save Energy",
  description:
    "Professional heat pump deep-coil cleaning in Montreal. Improve airflow, reduce hydro bills, and extend the life of your unit with our certified technicians.",
  keywords: [
    "heat pump cleaning Montreal",
    "HVAC maintenance Canada",
    "coil cleaning service",
    "heat pump efficiency",
  ],
  alternates: {
    canonical: "https://www.ethanductscleaning.com/services/heat-pump-cleaning",
  },
};

export default function HeatPumpCleaningPageCA() {
  return (
    <main className={`min-h-screen bg-white text-gray-900 ${urbanist.className}`}>
      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden pt-28 pb-20 lg:pt-40 lg:pb-32 bg-[#fcfcfc]">
        <div className="absolute top-0 right-0 w-150 h-150 bg-[#5E7AC4]/5 blur-[120px] rounded-full -mr-40 -mt-40" />

        <div className="mx-auto max-w-7xl px-5 lg:px-10 relative z-10">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#5E7AC4]/20 bg-[#5E7AC4]/5 px-4 py-1.5 mb-8">
              <span className="flex h-2 w-2 rounded-full bg-[#5E7AC4] animate-pulse" />
              <span className="text-[12px] font-bold tracking-[0.15em] uppercase text-[#5E7AC4]">
                Cold-Climate Performance Specialists
              </span>
            </div>

            <h1 className="text-5xl lg:text-8xl font-bold leading-none tracking-tight text-gray-900 mb-8">
              Peak <span className="text-[#5E7AC4]">Efficiency.</span>
              <br />
              Canadian Comfort.
            </h1>

            <p className="text-xl lg:text-2xl text-gray-500 leading-relaxed mb-12 max-w-2xl font-medium">
              Don't let ice or debris drive up your hydro bills. Our specialist
              deep-coil cleaning ensures your heat pump maintains maximum
              thermal output even during the harshest Canadian winters.
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <Link
                href="/contactus"
                className="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#0d0d0d] px-10 py-5 text-lg font-bold text-white transition-all hover:bg-[#5E7AC4] active:scale-[0.98] shadow-xl shadow-black/10"
              >
                Book Your Tune-Up <ArrowRight className="h-5 w-5" />
              </Link>
              <div className="flex items-center gap-4 px-2">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-10 w-10 rounded-full border-2 border-white bg-[#5E7AC4]/10 flex items-center justify-center"
                    >
                      <Zap className="h-4 w-4 text-[#5E7AC4]" />
                    </div>
                  ))}
                </div>
                <p className="text-sm font-semibold text-gray-500 italic">
                  Save up to 25% on Heating Costs
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Impact Section ── */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <h2 className="text-4xl font-bold tracking-tight mb-6">
                Maximising Heat Exchange
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed">
                Heat pumps rely on efficient air flow. Even a minor buildup of
                grime or oxidation on your coils can force your compressor to
                overwork, leading to high bills and system stress.
              </p>
            </div>
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-8">
              {[
                {
                  icon: Droplets,
                  t: "Deep Coil Wash",
                  d: "Removing oxidation and environmental buildup from evaporator coils for superior heat transfer.",
                },
                {
                  icon: Wind,
                  t: "Airflow Optimisation",
                  d: "Precision cleaning of blower wheels and fans to ensure consistent temperature distribution.",
                },
                {
                  icon: Activity,
                  t: "Diagnostic Testing",
                  d: "Proactive checking of capacitors and electrical contactors to prevent winter breakdowns.",
                },
                {
                  icon: Settings2,
                  t: "Fin Straightening",
                  d: "Repairing bent condenser fins to restore aerodynamic cooling and defrosting efficiency.",
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

      {/* ── Process ── */}
      <section className="py-24 bg-[#f9fafb]">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              The 5-Point Tune-Up
            </h2>
            <p className="text-gray-500 text-lg">
              A comprehensive service protocol designed for year-round
              reliability.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-4">
            {[
              {
                n: "01",
                t: "Thermal Scan",
                d: "Using infrared imaging to detect blockages in the coils.",
              },
              {
                n: "02",
                t: "De-Greasing",
                d: "Applying specialised foaming cleaners to break down bio-film.",
              },
              {
                n: "03",
                t: "Sanitise",
                d: "Clearing condensate drains and pans of microbial growth.",
              },
              {
                n: "04",
                t: "Verification",
                d: "Testing defrost cycles and refrigerant pressures for accuracy.",
              },
              {
                n: "05",
                t: "Calibrate",
                d: "Optimising thermostat settings for better cycle management.",
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

      {/* ── CTA ── */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="rounded-[40px] bg-[#0d0d0d] overflow-hidden text-white p-10 lg:p-20 relative">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl lg:text-5xl font-bold mb-8">
                  Extend Your <br />
                  <span className="text-[#5E7AC4]">Unit's Life.</span>
                </h2>
                <div className="space-y-6">
                  {[
                    "Priority scheduling for pre-winter maintenance",
                    "Multi-point electrical and safety inspection",
                    "Before/After efficiency benchmark report",
                    "WSIB compliant and fully insured technicians",
                  ].map((text, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="h-6 w-6 rounded-full bg-[#5E7AC4]/20 flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-[#5E7AC4]" />
                      </div>
                      <span className="text-lg text-gray-300">{text}</span>
                    </div>
                  ))}
                </div>
                {/* Fixed: Swapped button for Link component */}
                <Link 
                  href="/contactus"
                  className="mt-12 group inline-flex items-center gap-3 text-xl font-bold"
                >
                  View Maintenance Packages
                  <div className="h-10 w-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </Link>
              </div>
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/services_images/s6.png"
                  alt="Certified Heat Pump Coil Cleaning Montreal"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover opacity-90"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}