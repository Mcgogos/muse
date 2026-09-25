"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(contentRef.current, {
      scale: 1.4,
      opacity: 0,
      filter: "blur(8px)",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, { scope: heroRef });

  return (
    <section ref={heroRef} id="hero" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Ambient Visual Canvas */}
      <div className="absolute inset-0 z-0 scale-100 flex items-center justify-center pointer-events-none">
        <div className="w-[85vw] h-[85vh] rounded-2xl bg-gradient-to-b from-[#141417] via-charcoal to-void border border-white/5 opacity-60 flex items-center justify-center overflow-hidden">
          <div className="w-[30vw] h-[30vw] rounded-full bg-signal/15 blur-[100px] animate-pulse"></div>
        </div>
      </div>

      {/* Hero Typography */}
      <div ref={contentRef} className="relative z-10 text-center select-none px-4">
        <p className="text-[10px] md:text-xs tracking-[0.5em] uppercase text-muted font-mono mb-4">
          Sanat · Medya · Teknoloji
        </p>
        <h1 className="text-7xl sm:text-9xl md:text-[13rem] font-display font-extrabold tracking-tighter leading-none text-softwhite">
          MUSE
        </h1>
        <p className="text-xs md:text-sm tracking-[0.35em] uppercase text-muted mt-4 font-mono">
          YARATICI STÜDYO
        </p>
      </div>

      {/* Hero Footer Meta */}
      <div className="absolute bottom-8 left-6 md:left-14 right-6 md:right-14 flex justify-between items-end text-[10px] font-mono text-muted tracking-widest uppercase">
        <span>[ 01 / 07 — GİRİŞ ]</span>
        <span className="animate-bounce">KEŞFETMEK İÇİN KAYDIR ↓</span>
      </div>
    </section>
  );
}
