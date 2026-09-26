"use client";

import React, { useState, useEffect } from "react";

interface CinematicIntroProps {
  onComplete?: () => void;
}

export default function CinematicIntro({ onComplete }: CinematicIntroProps) {
  const [stage, setStage] = useState<"init" | "slide" | "collide" | "rotate_vertical" | "dot_expand" | "dot_implode" | "exit">("init");
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Splash Screen başladığı anda (t=0) müziği başlat
    window.dispatchEvent(new CustomEvent("start-bg-music"));

    // Harekete hassas kullanıcılar için kontrol
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      setIsVisible(false);
      if (onComplete) onComplete();
      return;
    }

    // Yatay geliş -> Çarpışma -> Dikey dönme -> Kırmızı ışık parlaması -> İmplüzyon -> Geçiş akışı:
    const t1 = setTimeout(() => setStage("slide"), 100);            // 1. Ekranın sağından ve solundan yatay gelme
    const t2 = setTimeout(() => setStage("collide"), 800);           // 2. Ortada yatay olarak birbirine çarpışma
    const t3 = setTimeout(() => setStage("rotate_vertical"), 1400); // 3. Çarptıktan sonra DİKEY konuma geçme & aralık açılması
    const t4 = setTimeout(() => setStage("dot_expand"), 2000);      // 4. Kırmızı noktanın belirmesi & devasa parlaması
    const t5 = setTimeout(() => setStage("dot_implode"), 2900);     // 5. Kırmızı ışığın merkeze/noktaya toplanması (Implode)
    const t6 = setTimeout(() => setStage("exit"), 3700);            // 6. Noktaya odaklandığı anda ipeksi yumuşak erime geçişi
    const t7 = setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, 5000);                                                      // 1300ms tam yumuşak süzülme süresi

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
      clearTimeout(t7);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setStage("exit");
    window.dispatchEvent(new CustomEvent("start-bg-music"));
    setTimeout(() => {
      setIsVisible(false);
      if (onComplete) onComplete();
    }, 1000);
  };

  if (!isVisible) return null;

  const isDotVisible = stage === "dot_expand" || stage === "dot_implode" || stage === "exit";

  return (
    <div
      onClick={handleSkip}
      className={`fixed inset-0 z-[99999999] bg-[#060607] flex items-center justify-center select-none overflow-hidden transition-all duration-[1300ms] ease-[cubic-bezier(0.25,1,0.5,1)] ${
        stage === "exit" ? "opacity-0 scale-[1.03] pointer-events-none backdrop-blur-2xl" : "opacity-100 scale-100"
      }`}
      data-cursor="GEÇ"
    >
      {/* Kırmızı Işığın Parlayıp Büyümesi ve Noktaya Geri Toplanması (Implosion Effect) */}
      <div
        className={`absolute rounded-full bg-[#8B0000] blur-[120px] pointer-events-none transition-all duration-800 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          stage === "dot_expand"
            ? "w-[600px] h-[600px] md:w-[800px] md:h-[800px] opacity-90 scale-125 shadow-[0_0_120px_#8B0000]"
            : stage === "dot_implode"
            ? "w-[30px] h-[30px] opacity-100 scale-100 shadow-[0_0_40px_#8B0000]"
            : "w-[0px] h-[0px] opacity-0 scale-0"
        }`}
      />

      {/* 8K Vektörel Orijinal MUSE Logosu */}
      <div className="relative flex items-center justify-center">
        
        <svg
          width="180"
          height="180"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ overflow: "visible" }}
          className="w-[165px] h-[165px] md:w-[245px] md:h-[245px] drop-shadow-[0_15px_40px_rgba(0,0,0,0.9)]"
        >
          {/* Logo Dış Çerçevesi (Kırmızı ışık belirdiğinde görünür) */}
          <rect
            x="2"
            y="2"
            width="96"
            height="96"
            rx="28"
            fill="#060607"
            stroke="rgba(255,255,255,0.22)"
            strokeWidth="1.8"
            className={`transition-opacity duration-700 ${
              isDotVisible ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* PARÇA 1: Sol Çubuk - Tarayıcının tamamen dışından (-120vw) YATAY kayar, ortada çarpar, DİKEY konuma döner */}
          <rect
            x="30"
            y="22"
            width="17"
            height="56"
            rx="8.5"
            fill="#141418"
            stroke="rgba(255,255,255,0.45)"
            strokeWidth="1.8"
            className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              transformOrigin: "38.5px 50px",
              transform:
                stage === "init"
                  ? "translate3d(-120vw, 0, 0) rotate(90deg)"
                  : stage === "slide"
                  ? "translate3d(-35vw, 0, 0) rotate(90deg)"
                  : stage === "collide"
                  ? "translate3d(11.5px, 0, 0) rotate(90deg)" // Ortada YATAY olarak temas/çarpışma
                  : "translate3d(0px, 0, 0) rotate(0deg)"     // Çarptıktan sonra DİKEY konuma döner & aralık açılır
            }}
          />

          {/* PARÇA 2: Sağ Çubuk - Tarayıcının tamamen dışından (+120vw) YATAY kayar, ortada çarpar, DİKEY konuma döner */}
          <rect
            x="53"
            y="22"
            width="17"
            height="56"
            rx="8.5"
            fill="#141418"
            stroke="rgba(255,255,255,0.45)"
            strokeWidth="1.8"
            className="transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              transformOrigin: "61.5px 50px",
              transform:
                stage === "init"
                  ? "translate3d(120vw, 0, 0) rotate(-90deg)"
                  : stage === "slide"
                  ? "translate3d(35vw, 0, 0) rotate(-90deg)"
                  : stage === "collide"
                  ? "translate3d(-11.5px, 0, 0) rotate(-90deg)" // Ortada YATAY olarak temas/çarpışma
                  : "translate3d(0px, 0, 0) rotate(0deg)"       // Çarptıktan sonra DİKEY konuma döner & aralık açılır
            }}
          />

          {/* PARÇA 3: Merkezdeki Koyu Kırmızı Kayıt Noktası ve Beyaz Çekirdek */}
          <g
            className={`transition-all duration-700 ease-out transform ${
              isDotVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
            }`}
            style={{ transformOrigin: "50px 50px" }}
          >
            <circle
              cx="50"
              cy="50"
              r="6.5"
              fill="#8B0000"
              className="drop-shadow-[0_0_18px_#8B0000]"
            />
            <circle cx="50" cy="50" r="2.5" fill="#FFFFFF" />
          </g>
        </svg>

      </div>
    </div>
  );
}
