import Image from "next/image";
import Link from "next/link";
import {
  RefreshCw,
  CheckCircle2,
  ArrowRight,
  ThermometerSnowflake,
  Filter,
  Gauge,
  Sparkles,
} from "lucide-react";
import { urbanist } from "@/app/fonts";

// ── SEO Metadata ──
export const metadata = {
  title: "Air Exchanger (HRV/ERV) Cleaning Montreal | Fresh Air Specialists",
  description:
    "Professional HRV & ERV air exchanger cleaning in Montreal. Decontaminate cores, replace filters, and balance airflow for peak indoor air quality and energy savings.",
  keywords: [
    "air exchanger cleaning Montreal",
    "HRV maintenance Canada",
    "ERV core cleaning",
    "ventilation system sanitizing",
    "indoor air quality",
  ],
  alternates: {
    canonical: "https://www.ethanductscleaning.com/services/air-exchanger-cleaning",
  },
};

export default function AirExchangerCleaningCA() {
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
                Canadian HRV & ERV Specialists
              </span>
            </div>

            <h1 className="text-5xl lg:text-8xl font-bold leading-none tracking-tight text-gray-900 mb-8">
              Breathe Deep. <span className="text-[#5E7AC4]">Balanced.</span>
              <br />
              Total Core Recovery.
            </h1>

            <p className="text-xl lg:text-2xl text-gray-500 leading-relaxed mb-12 max-w-2xl font-medium">
              In modern Canadian homes, your Air Exchanger is your lifeline to
              fresh air. We provide expert decontamination of HRV/ERV cores and
              filters to ensure your indoor air is fresh, crisp, and properly
              humidified.
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <Link
                href="/contactus"
                className="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#0d0d0d] px-10 py-5 text-lg font-bold text-white transition-all hover:bg-[#5E7AC4] active:scale-[0.98] shadow-xl shadow-black/10"
              >
                Schedule HRV Service <ArrowRight className="h-5 w-5" />
              </Link>
              <div className="flex items-center gap-4 px-2">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="h-10 w-10 rounded-full border-2 border-white bg-[#5E7AC4]/10 flex items-center justify-center"
                    >
                      <RefreshCw className="h-4 w-4 text-[#5E7AC4]" />
                    </div>
                  ))}
                </div>
                <p className="text-sm font-semibold text-gray-500 italic">
                  Ensuring Year-Round Efficiency
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Technical Details ── */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <h2 className="text-4xl font-bold tracking-tight mb-6">
                Optimising Your Thermal Core
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed">
                Neglected air exchangers often become breeding grounds for
                bacteria and excess humidity. Our restoration process ensures
                your unit operates at peak thermal efficiency.
              </p>
            </div>
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-8">
              {[
                {
                  icon: ThermometerSnowflake,
                  t: "Heat Recovery",
                  d: "Cleaning the exchanger core restores up to 30% of heat transfer effectiveness in winter.",
                },
                {
                  icon: Filter,
                  t: "Advanced Filtration",
                  d: "Deep cleaning of external intake hoods and internal filter replacement for maximum purity.",
                },
                {
                  icon: Gauge,
                  t: "Pressure Balancing",
                  d: "We recalibrate intake and exhaust fans to ensure your home maintains neutral air pressure.",
                },
                {
                  icon: Sparkles,
                  t: "Odour Neutralisation",
                  d: "Anti-microbial flushing of the drainage system to remove stagnant water and musty odours.",
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

      {/* ── 5-Step Process ── */}
      <section className="py-24 bg-[#f9fafb]">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              The Canadian Service Standard
            </h2>
            <p className="text-gray-500 text-lg">
              We follow a rigorous protocol to reset your ventilation system to
              factory-spec.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-4">
            {[
              {
                n: "01",
                t: "Inspection",
                d: "Testing motor amp draw and external intake screens.",
              },
              {
                n: "02",
                t: "Core Sanitation",
                d: "Deep-wash of the HRV/ERV core to remove fine dust and spores.",
              },
              {
                n: "03",
                t: "Hood Clearance",
                d: "Removing debris from outside intake and exhaust hoods.",
              },
              {
                n: "04",
                t: "Cabinet Fog",
                d: "EPA-approved sanitising of the unit's internal cabinet.",
              },
              {
                n: "05",
                t: "Calibration",
                d: "Final balancing of airflow for optimal air change rates.",
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
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="rounded-[40px] bg-[#0d0d0d] overflow-hidden text-white p-10 lg:p-20 relative">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl lg:text-5xl font-bold mb-8">
                  Efficiency <br />
                  <span className="text-[#5E7AC4]">Redefined.</span>
                </h2>
                <div className="space-y-6">
                  {[
                    "Professional HRV/ERV core decontamination",
                    "Cleaning of all supply and exhaust registers",
                    "Detailed airflow and balancing report",
                    "Indoor humidity level verification",
                  ].map((text, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="h-6 w-6 rounded-full bg-[#5E7AC4]/20 flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-[#5E7AC4]" />
                      </div>
                      <span className="text-lg text-gray-300">{text}</span>
                    </div>
                  ))}
                </div>
                {/* Changed to Link for SEO and Server Component compatibility */}
                <Link
                  href="/contactus"
                  className="mt-12 group inline-flex items-center gap-3 text-xl font-bold"
                >
                  Book Professional Service
                  <div className="h-10 w-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </Link>
              </div>
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gray-800" />
                <Image
                  src="/services_images/s2.png"
                  alt="Professional Canadian HRV/ERV Air Exchanger Service"
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