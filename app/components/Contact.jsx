"use client";

import { useState } from "react";
import { Send, CheckCircle, Loader2 } from "lucide-react";
import { urbanist } from "../fonts";

const SERVICE_OPTIONS = [
  { value: "", label: "Select a service…" },
  { value: "air-duct-cleaning", label: "Air Duct Cleaning" },
  { value: "air-exchanger-cleaning", label: "Air Exchanger Cleaning" },
  { value: "heat-pump-cleaning", label: "Heat Pump Cleaning" },
  { value: "dryer-vent-cleaning", label: "Dryer Vent Cleaning" },
  { value: "furnace-blower-cleaning", label: "Furnace Blower Cleaning" },
  { value: "central-vacuum-cleaning", label: "Central Vacuum Cleaning" },
  { value: "other", label: "Other / Not Sure" },
];

const INITIAL = { name: "", email: "", phone: "", service: "", message: "" };

// Shared input styles — min-w-0 prevents flex children from overflowing
const base =
  "w-full min-w-0 rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-[13px] text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-150 focus:border-gray-400 focus:ring-2 focus:ring-gray-200";

const errBase = "border-red-300 focus:border-red-400 focus:ring-red-100";

// Shared label style
// FIX: `text-[10.5px]` is non-standard in Tailwind v3 without a custom config.
// Changed to `text-[11px]` which is valid arbitrary sizing.
const labelClass =
  "text-[11px] font-bold uppercase tracking-widest text-gray-400";

export default function Contact({ compact = false }) {
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Valid email required.";
    if (!form.phone.trim()) e.phone = "Required.";
    if (!form.service) e.service = "Please select a service.";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStatus("submitting");
    await new Promise((r) => setTimeout(r, 1400));
    setStatus("success");
  };

  // ── Success state ──────────────────────────
  if (status === "success") {
    return (
      <div className={`flex flex-col items-center justify-center gap-3 py-8 text-center ${urbanist.className}`}>
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-900">
          <CheckCircle className="h-6 w-6 text-white" strokeWidth={1.75} />
        </div>
        <div>
          <p className="text-[15px] font-bold text-gray-900">Request received!</p>
          <p className="mt-0.5 text-[12px] text-gray-500">We&apos;ll reach out within 24 hours.</p>
        </div>
        <button
          onClick={() => { setForm(INITIAL); setErrors({}); setStatus("idle"); }}
          className="mt-1 rounded-lg border border-gray-200 px-4 py-2 text-[12px] font-medium text-gray-500 transition-colors hover:border-gray-400 hover:text-gray-800"
        >
          Submit another
        </button>
      </div>
    );
  }

  // ── Form ───────────────────────────────────
  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-label="Contact and booking form"
      className={`w-full min-w-0 space-y-3 ${urbanist.className}`}
    >
      {/* Name + Phone row
          FIX: The original had a ternary where both branches were identical
               (`grid-cols-1 sm:grid-cols-2` in both compact and non-compact).
               The conditional was dead code — removed entirely.
          Both modes: single column on xs, two columns from sm up. */}
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">

        {/* Name */}
        <div className="flex min-w-0 flex-col gap-1">
          <label htmlFor="cf-name" className={labelClass}>
            Name <span className="text-gray-800">*</span>
          </label>
          <input
            id="cf-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="John Smith"
            value={form.name}
            onChange={handleChange}
            className={`${base} ${errors.name ? errBase : ""}`}
          />
          {errors.name && (
            <span role="alert" className="text-[11px] text-red-500">{errors.name}</span>
          )}
        </div>

        {/* Phone */}
        <div className="flex min-w-0 flex-col gap-1">
          <label htmlFor="cf-phone" className={labelClass}>
            Phone <span className="text-gray-800">*</span>
          </label>
          <input
            id="cf-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+1 (514) 000-0000"
            value={form.phone}
            onChange={handleChange}
            className={`${base} ${errors.phone ? errBase : ""}`}
          />
          {errors.phone && (
            <span role="alert" className="text-[11px] text-red-500">{errors.phone}</span>
          )}
        </div>
      </div>

      {/* Email */}
      <div className="flex min-w-0 flex-col gap-1">
        <label htmlFor="cf-email" className={labelClass}>
          Email <span className="text-gray-800">*</span>
        </label>
        <input
          id="cf-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="john@example.com"
          value={form.email}
          onChange={handleChange}
          className={`${base} ${errors.email ? errBase : ""}`}
        />
        {errors.email && (
          <span role="alert" className="text-[11px] text-red-500">{errors.email}</span>
        )}
      </div>

      {/* Service select
          FIX: added `cursor-pointer` — the native select was missing it,
          making the dropdown feel unclickable on desktop. */}
      <div className="flex min-w-0 flex-col gap-1">
        <label htmlFor="cf-service" className={labelClass}>
          Service <span className="text-gray-800">*</span>
        </label>
        <div className="relative min-w-0">
          <select
            id="cf-service"
            name="service"
            value={form.service}
            onChange={handleChange}
            className={`${base} cursor-pointer appearance-none pr-9 ${
              form.service === "" ? "text-gray-400" : "text-gray-900"
            } ${errors.service ? errBase : ""}`}
          >
            {SERVICE_OPTIONS.map((o) => (
              <option
                key={o.value}
                value={o.value}
                disabled={o.value === ""}
                className="bg-white text-gray-900"
              >
                {o.label}
              </option>
            ))}
          </select>
          {/* Custom chevron */}
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
            <svg
              className="h-3.5 w-3.5 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {errors.service && (
          <span role="alert" className="text-[11px] text-red-500">{errors.service}</span>
        )}
      </div>

      {/* Message textarea — hidden in compact mode */}
      {!compact && (
        <div className="flex min-w-0 flex-col gap-1">
          <label htmlFor="cf-message" className={labelClass}>
            Message{" "}
            <span className="normal-case tracking-normal font-normal text-gray-400">(optional)</span>
          </label>
          <textarea
            id="cf-message"
            name="message"
            rows={3}
            placeholder="Any details about your home or last cleaning…"
            value={form.message}
            onChange={handleChange}
            className={`${base} resize-none`}
          />
        </div>
      )}

      {/* Submit button
          FIX: relative + overflow-hidden required for the absolute spinner
               to not expand the button height.
               disabled:pointer-events-none prevents double-submit on slow networks. */}
      <button
        type="submit"
        disabled={status === "submitting"}
        className="group relative w-full overflow-hidden rounded-lg bg-gray-900 py-3 text-[13.5px] font-bold text-white transition-all duration-200 hover:bg-[#5E7AC4] active:scale-[0.98] disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-60"
      >
        <span
          className={`flex items-center justify-center gap-2 transition-opacity duration-150 ${
            status === "submitting" ? "opacity-0" : "opacity-100"
          }`}
        >
          <Send className="h-3.5 w-3.5" aria-hidden="true" />
          Get Free Quote
        </span>

        {/* Loading spinner — absolutely centred over the button */}
        {status === "submitting" && (
          <span className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          </span>
        )}
      </button>

      <p className="text-center text-[11px] text-gray-400">
        No spam — we&apos;ll only contact you about your request.
      </p>
    </form>
  );
}