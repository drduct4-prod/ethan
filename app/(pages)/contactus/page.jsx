"use client";

import Contact from "@/app/components/Contact";
import React from "react";
import { urbanist } from "@/app/fonts";
import { Phone, Mail, MapPin } from "lucide-react";

const page = () => {
  return (
    <div className={`w-full bg-white ${urbanist.className}`}>
      
      {/* ───────────── HERO / HEADER ───────────── */}
      <div className="relative border-b border-gray-100">
        <div className="mx-auto max-w-6xl px-5 py-20 text-center">
          
          {/* Small label */}
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-gray-400">
            Get In Touch
          </p>

          {/* Heading */}
          <h1 className="mt-3 text-3xl font-bold text-gray-900 sm:text-4xl">
            Contact Us
          </h1>

          {/* Sub text */}
          <p className="mx-auto mt-3 max-w-md text-[13px] text-gray-500">
            Have questions or need a quote? Fill out the form below and our team
            will get back to you within 24 hours.
          </p>
        </div>
      </div>

      {/* ───────────── MAIN SECTION ───────────── */}
      <div className="mx-auto max-w-6xl px-5 py-14">
        
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">

          {/* ── LEFT: CONTACT INFO ── */}
          <div className="flex flex-col gap-6">

            <div>
              <h2 className="text-[14px] font-bold text-gray-900">
                Contact Information
              </h2>
              <p className="mt-1 text-[12.5px] text-gray-500">
                Reach out directly or use the form — we’re here to help.
              </p>
            </div>

            {/* Info Cards */}
            <div className="flex flex-col gap-3">

              {/* Phone */}
              <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
                <Phone className="h-4 w-4 text-gray-600" />
                <span className="text-[13px] text-gray-700">
                  +1 (438) 619-1084
                </span>
              </div>

              {/* Email */}
              <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
                <Mail className="h-4 w-4 text-gray-600" />
                <span className="text-[13px] text-gray-700">
                ethanductcleaning@gmail.com
                </span>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3 rounded-xl border border-gray-100 bg-gray-50 px-4 py-3">
                <MapPin className="h-4 w-4 text-gray-600" />
                <span className="text-[13px] text-gray-700">
                  Montréal, Quebec, Canada
                </span>
              </div>
            </div>

            {/* Small trust text */}
            <p className="text-[11.5px] text-gray-400">
              Trusted by homeowners across Montréal for reliable duct cleaning
              services.
            </p>
          </div>

          {/* ── RIGHT: FORM ── */}
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <Contact />
          </div>

        </div>
      </div>

      {/* ───────────── CTA STRIP ───────────── */}
      <div className="border-t border-gray-100">
        <div className="mx-auto max-w-6xl px-5 py-10 text-center">

          <p className="text-[13px] text-gray-600">
            Need urgent service?
          </p>

          <a
            href="https://wa.me/15144004572"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-block text-[13px] font-bold text-[#5E7AC4] hover:underline"
          >
            Chat with us on WhatsApp →
          </a>
        </div>
      </div>

    </div>
  );
};

export default page;