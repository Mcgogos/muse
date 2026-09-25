"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import AbstractShape from "./AbstractShape";

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
      {/* Ambient Visual Canvas (3D & Background) */}
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <div className="w-[85vw] h-[85vh] rounded-2xl bg-gradient-to-b from-[#141417] via-charcoal to-void border border-white/5 opacity-80 flex items-center justify-center overflow-hidden relative">
          <div className="absolute w-[30vw] h-[30vw] rounded-full bg-signal/10 blur-[120px] animate-pulse"></div>
          <AbstractShape />
        </div>
      </div>

      {/* Hero Typography */}
      <div ref={contentRef} className="relative z-10 text-center select-none px-4">
        <h1 className="text-7xl sm:text-9xl md:text-[13rem] font-display font-extrabold tracking-tighter leading-none text-softwhite">
          MUSE
        </h1>
        <p className="text-xs md:text-sm tracking-[0.35em] uppercase text-muted mt-4 font-mono">
          CREATIVE HOUSE
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
