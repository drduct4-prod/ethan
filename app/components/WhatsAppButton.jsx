"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const buttonRef = useRef(null);

  // GSAP fade-in animation on mount
  useEffect(() => {
    if (buttonRef.current) {
      gsap.fromTo(
        buttonRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
      );
    }
  }, []);

  // Pulse animation loop
  useEffect(() => {
    if (buttonRef.current) {
      gsap.to(buttonRef.current, {
        boxShadow: "0 0 0 12px rgba(37, 211, 102, 0.1)",
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  }, []);

  return (
    <div
      ref={buttonRef}
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50"
      aria-label="WhatsApp contact"
    >
      <Link
        href="https://wa.me/+923422825143?text=Hello%20Ethan%20Ducts%20Cleaining%20I%20want%20service"
        target="_blank"
        rel="noopener noreferrer"
        className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-[#25D366] text-white transition-all duration-300 hover:scale-110 hover:bg-[#1ebe5d] shadow-lg hover:shadow-xl"
        title="Chat with us on WhatsApp"
      >
        <MessageCircle className="h-7 w-7 sm:h-8 sm:w-8" strokeWidth={1.5} />
      </Link>
    </div>
  );
}
