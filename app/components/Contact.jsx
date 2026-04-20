"use client";

import { useState } from "react";
import { Send, CheckCircle, Loader2 } from "lucide-react";
import { urbanist } from "../fonts";
import { useLang } from "../context/LanguageContext";

const base    = "w-full min-w-0 rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-[13px] text-gray-900 placeholder:text-gray-400 outline-none transition-all duration-150 focus:border-gray-400 focus:ring-2 focus:ring-gray-200";
const errBase = "border-red-300 focus:border-red-400 focus:ring-red-100";
const labelClass = "text-[11px] font-bold uppercase tracking-widest text-gray-400";

const INITIAL = { name: "", email: "", phone: "", service: "", message: "" };

export default function Contact({ compact = false }) {
  const { t } = useLang();
  const [form, setForm]     = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");

  const validate = () => {
    const e = {};
    if (!form.name.trim())                                   e.name    = t.contact.nameRequired;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))     e.email   = t.contact.emailRequired;
    if (!form.phone.trim())                                  e.phone   = t.contact.phoneRequired;
    if (!form.service)                                       e.service = t.contact.serviceRequired;
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
  if (Object.keys(errs).length) {
    setErrors(errs);
    return;
  }

  setStatus("submitting");

  try {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.success) {
      setStatus("success");
    } else {
      setStatus("idle");
    }
  } catch (error) {
    console.log(error);
    setStatus("idle");
  }
};

  if (status === "success") {
    return (
      <div className={`flex flex-col items-center justify-center gap-3 py-8 text-center ${urbanist.className}`}>
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-900">
          <CheckCircle className="h-6 w-6 text-white" strokeWidth={1.75} />
        </div>
        <div>
          <p className="text-[15px] font-bold text-gray-900">{t.contact.successTitle}</p>
          <p className="mt-0.5 text-[12px] text-gray-500">{t.contact.successSub}</p>
        </div>
        <button onClick={() => { setForm(INITIAL); setErrors({}); setStatus("idle"); }}
          className="mt-1 rounded-lg border border-gray-200 px-4 py-2 text-[12px] font-medium text-gray-500 transition-colors hover:border-gray-400 hover:text-gray-800"
        >
          {t.contact.submitAnother}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Contact and booking form"
      className={`w-full min-w-0 space-y-3 ${urbanist.className}`}
    >
      {/* Name + Phone */}
      <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
        <div className="flex min-w-0 flex-col gap-1">
          <label htmlFor="cf-name" className={labelClass}>
            {t.contact.nameLabel} <span className="text-gray-800">*</span>
          </label>
          <input id="cf-name" name="name" type="text" autoComplete="name"
            placeholder={t.contact.namePlaceholder}
            value={form.name} onChange={handleChange}
            className={`${base} ${errors.name ? errBase : ""}`}
          />
          {errors.name && <span role="alert" className="text-[11px] text-red-500">{errors.name}</span>}
        </div>
        <div className="flex min-w-0 flex-col gap-1">
          <label htmlFor="cf-phone" className={labelClass}>
            {t.contact.phoneLabel} <span className="text-gray-800">*</span>
          </label>
          <input id="cf-phone" name="phone" type="tel" autoComplete="tel"
            placeholder={t.contact.phonePlaceholder}
            value={form.phone} onChange={handleChange}
            className={`${base} ${errors.phone ? errBase : ""}`}
          />
          {errors.phone && <span role="alert" className="text-[11px] text-red-500">{errors.phone}</span>}
        </div>
      </div>

      {/* Email */}
      <div className="flex min-w-0 flex-col gap-1">
        <label htmlFor="cf-email" className={labelClass}>
          {t.contact.emailLabel} <span className="text-gray-800">*</span>
        </label>
        <input id="cf-email" name="email" type="email" autoComplete="email"
          placeholder={t.contact.emailPlaceholder}
          value={form.email} onChange={handleChange}
          className={`${base} ${errors.email ? errBase : ""}`}
        />
        {errors.email && <span role="alert" className="text-[11px] text-red-500">{errors.email}</span>}
      </div>

      {/* Service */}
      <div className="flex min-w-0 flex-col gap-1">
        <label htmlFor="cf-service" className={labelClass}>
          {t.contact.serviceLabel} <span className="text-gray-800">*</span>
        </label>
        <div className="relative min-w-0">
          <select id="cf-service" name="service" value={form.service} onChange={handleChange}
            className={`${base} cursor-pointer appearance-none pr-9 ${form.service === "" ? "text-gray-400" : "text-gray-900"} ${errors.service ? errBase : ""}`}
          >
            <option value="" disabled className="bg-white text-gray-400">
              {t.contact.selectService}
            </option>
            {t.contact.serviceOptions.map((o) => (
              <option key={o.value} value={o.value} className="bg-white text-gray-900">
                {o.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
            <svg className="h-3.5 w-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {errors.service && <span role="alert" className="text-[11px] text-red-500">{errors.service}</span>}
      </div>

      {/* Message */}
      {!compact && (
        <div className="flex min-w-0 flex-col gap-1">
          <label htmlFor="cf-message" className={labelClass}>
            {t.contact.messageLabel}{" "}
            <span className="normal-case tracking-normal font-normal text-gray-400">({t.contact.optional})</span>
          </label>
          <textarea id="cf-message" name="message" rows={3}
            placeholder={t.contact.messagePlaceholder}
            value={form.message} onChange={handleChange}
            className={`${base} resize-none`}
          />
        </div>
      )}

      {/* Submit */}
      <button type="submit" disabled={status === "submitting"}
        className="group relative w-full overflow-hidden rounded-lg bg-gray-900 py-3 text-[13.5px] font-bold text-white transition-all duration-200 hover:bg-[#5E7AC4] active:scale-[0.98] disabled:cursor-not-allowed disabled:pointer-events-none disabled:opacity-60"
      >
        <span className={`flex items-center justify-center gap-2 transition-opacity duration-150 ${status === "submitting" ? "opacity-0" : "opacity-100"}`}>
          <Send className="h-3.5 w-3.5" aria-hidden="true" />
          {t.contact.submit}
        </span>
        {status === "submitting" && (
          <span className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          </span>
        )}
      </button>

      <p className="text-center text-[11px] text-gray-400">{t.contact.noSpam}</p>
    </form>
  );
}