import Image from "next/image";
import Link from "next/link";
import {
  CheckCircle2,
  ArrowRight,
  Zap,
  Activity,
  Search,
  Trash2,
  Focus,
} from "lucide-react";
import { urbanist } from "@/app/fonts";

// ── SEO Metadata ──
export const metadata = {
  title: "Central Vacuum Pipe Cleaning Montreal | Restore Suction Power",
  description:
    "Professional central vacuum system purging in Montreal. We remove hidden blockages and dust buildup from in-wall piping to restore factory-grade suction and air quality.",
  keywords: [
    "central vacuum cleaning Montreal",
    "central vac suction repair",
    "in-wall pipe cleaning",
    "central vacuum maintenance Canada",
    "blocked central vacuum pipes",
  ],
  alternates: {
    canonical: "https://www.ethanductscleaning.com/services/central-vacuum-cleaning",
  },
};

export default function CentralVacuumCleaningPageCA() {
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
                In-Wall Piping Specialists
              </span>
            </div>

            <h1 className="text-5xl lg:text-8xl font-bold leading-none tracking-tight text-gray-900 mb-8">
              Maximum <span className="text-[#5E7AC4]">Suction.</span>
              <br />
              Wall-to-Wall Clean.
            </h1>

            <p className="text-xl lg:text-2xl text-gray-500 leading-relaxed mb-12 max-w-2xl font-medium">
              Hidden dust buildup inside your central vacuum pipes reduces
              airflow and spreads allergens. We perform a complete system purge
              to restore factory-grade suction to every inlet in your home.
            </p>

            <div className="flex flex-col sm:flex-row gap-5">
              <Link
                href="/contactus"
                className="inline-flex items-center justify-center gap-3 rounded-2xl bg-[#0d0d0d] px-10 py-5 text-lg font-bold text-white transition-all hover:bg-[#5E7AC4] active:scale-[0.98] shadow-xl shadow-black/10"
              >
                Restore Suction Power <ArrowRight className="h-5 w-5" />
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
                  Certified Central Vac Maintenance
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Technical Insights ── */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-1">
              <h2 className="text-4xl font-bold tracking-tight mb-6">
                Hidden Pipes, Hidden Dust
              </h2>
              <p className="text-gray-500 text-lg leading-relaxed">
                Most homeowners forget the kilometres of piping behind their
                walls. Static electricity causes fine dust to cling to these
                surfaces, creating &quot;slugs&quot; that eventually obstruct your
                cleaning power and strain the motor.
              </p>
            </div>
            <div className="lg:col-span-2 grid sm:grid-cols-2 gap-8">
              {[
                {
                  icon: Activity,
                  t: "Suction Restoration",
                  d: "Removing internal pipe friction allows your motor to pull debris from the furthest inlet with ease.",
                },
                {
                  icon: Search,
                  t: "Blockage Removal",
                  d: "Professional camera inspection to find and extract toys, hair clogs, or construction debris.",
                },
                {
                  icon: Trash2,
                  t: "Unit Sanitisation",
                  d: "Deep cleaning and disinfecting the main power unit and HEPA filtration assembly.",
                },
                {
                  icon: Focus,
                  t: "Seal Optimization",
                  d: "Testing and sealing every wall valve to ensure zero vacuum pressure loss across the system.",
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

      {/* ── Protocol ── */}
      <section className="py-24 bg-[#f9fafb]">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              The System Purge Process
            </h2>
            <p className="text-gray-500 text-lg">
              We use specialized &quot;tornado&quot; nozzles to scrub your pipes from the
              inside out without damaging your walls.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-4">
            {[
              {
                n: "01",
                t: "Mapping",
                d: "Locating all inlets and the main trunk line path.",
              },
              {
                n: "02",
                t: "Pressure Test",
                d: "Digital vacuum pressure reading at every port.",
              },
              {
                n: "03",
                t: "Pipe Purge",
                d: "High-pressure mechanical scrubbing of in-wall pipes.",
              },
              {
                n: "04",
                t: "HEPA Service",
                d: "Deep cleaning or replacing the power unit filters.",
              },
              {
                n: "05",
                t: "Certification",
                d: "Final airflow verification and performance report.",
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

      {/* ── Final CTA ── */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-5 lg:px-10">
          <div className="rounded-[40px] bg-[#0d0d0d] overflow-hidden text-white p-10 lg:p-20 relative">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl lg:text-5xl font-bold mb-8">
                  Bring Back <br />
                  <span className="text-[#5E7AC4]">The Power.</span>
                </h2>
                <div className="space-y-6">
                  {[
                    "Complete internal pipe decontamination",
                    "Motor housing vacuuming and debris removal",
                    "WSIB compliant and fully insured technicians",
                    "Disinfection of hoses and tool attachments",
                  ].map((text, i) => (
                    <div key={i} className="flex items-center gap-4">
                      <div className="h-6 w-6 rounded-full bg-[#5E7AC4]/20 flex items-center justify-center">
                        <CheckCircle2 className="h-4 w-4 text-[#5E7AC4]" />
                      </div>
                      <span className="text-lg text-gray-300">{text}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/contactus"
                  className="mt-12 group inline-flex items-center gap-3 text-xl font-bold"
                >
                  Book System Purge
                  <div className="h-10 w-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </Link>
              </div>
              <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-gray-900">
                <Image
                  src="/services_images/s3.png"
                  alt="Professional Central Vacuum System Purge and Pipe Cleaning"
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