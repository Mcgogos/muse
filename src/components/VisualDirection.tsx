"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface ReelCategory {
  id: string;
  tag: string;
  title: string;
  aspectRatio: string;
  cameraSpec: string;
  lensSpec: string;
  colorGrade: string;
  description: string;
  youtubeId: string;
  youtubeEmbed: string;
  bgRawImg: string;
  bgGradedImg: string;
}

const cinematicData: ReelCategory[] = [
  {
    id: "clip",
    tag: "01 // SİNEMATİK MÜZİK KLİBİ",
    title: "ANAMORFİK HİKÂYE ANLATIMI",
    aspectRatio: "2.39:1 CINEMASCOPE",
    cameraSpec: "RED V-RAPTOR 8K VV",
    lensSpec: "Cooke Anamorphic /i Full Frame 50mm T2.3",
    colorGrade: "Kodak Vision3 250D Grain & Teal/Orange",
    description: "2.39:1 sinematik geniş açı, anamorfik mercek parlamaları ve yüksek duygusal yoğunlukta ritmik hikaye kurgusu.",
    youtubeId: "Vpg7JucFlVQ",
    youtubeEmbed: "https://www.youtube.com/embed/Vpg7JucFlVQ",
    bgRawImg: "https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=1200&auto=format&fit=crop",
    bgGradedImg: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "live",
    tag: "02 // STÜDYO CANLI PERFORMANS",
    title: "CANLI STÜDYO İCRA KAYDI",
    aspectRatio: "16:9 WIDESCREEN 4K",
    cameraSpec: "ARRI ALEXA Mini LF",
    lensSpec: "ARRI Signature Prime 35mm T1.8",
    colorGrade: "Warm Vintage Tungsten 3200K Film Look",
    description: "Stüdyo ortamında canlı performans kaydı, çoklu kamera açısı ve yüksek kaliteli canlı akustik ses zinciri.",
    youtubeId: "2SnCSuEeeY0",
    youtubeEmbed: "https://www.youtube.com/embed/2SnCSuEeeY0",
    bgRawImg: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop",
    bgGradedImg: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: "vertical",
    tag: "03 // DİKEY SİNEMA (9:16)",
    title: "SİNEMATİK DİZİ & FİLM FRAGMANI 4K",
    aspectRatio: "9:16 VERTICAL CINEMA",
    cameraSpec: "Sony FX6 4K High-Frame Rate",
    lensSpec: "Sony G Master 24-70mm f/2.8 II",
    colorGrade: "Punchy Dynamic Contrast & Neon Highlights",
    description: "4K Ultra HD sinematik dizi ve film fragmanı kurgusu, 9:16 editoryal dikey sinema çalışması.",
    youtubeId: "ZDgWKSfpWS0",
    youtubeEmbed: "https://www.youtube.com/embed/ZDgWKSfpWS0",
    bgRawImg: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=800&auto=format&fit=crop",
    bgGradedImg: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=800&auto=format&fit=crop",
  },
  {
    id: "color",
    tag: "04 // RENK DERECELENDİRME",
    title: "4K/8K VAHŞİ YAŞAM & HAYVAN BELGESELİ",
    aspectRatio: "COLOR GRADE A/B SPLIT",
    cameraSpec: "RED MONSTRO 8K VV / ARRI ALEXA 65",
    lensSpec: "Canon Cine-Servo 50-1000mm T5.0-8.9",
    colorGrade: "Natural HDR Color Volume & 8K Fine Detail Roll-off",
    description: "4K/8K Ultra HD doğa ve hayvan belgeseli sinematik renk derecelendirme (Color Grade) ve doku çalışması.",
    youtubeId: "LXb3EKWsInQ",
    youtubeEmbed: "https://www.youtube.com/embed/LXb3EKWsInQ",
    bgRawImg: "https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?q=80&w=1200&auto=format&fit=crop",
    bgGradedImg: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef9?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function VisualDirection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isGraded, setIsGraded] = useState(true);
  const [activeVideoModal, setActiveVideoModal] = useState<ReelCategory | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Pause site background music when video modal opens, resume when closed
  useEffect(() => {
    if (activeVideoModal) {
      window.dispatchEvent(new CustomEvent("pause-bg-music"));
    } else if (mounted) {
      window.dispatchEvent(new CustomEvent("resume-bg-music"));
    }
  }, [activeVideoModal, mounted]);

  const activeReel = cinematicData[activeIndex];

  const closeModal = (e?: React.MouseEvent | React.TouchEvent | React.PointerEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setActiveVideoModal(null);
  };

  return (
    <section id="visual" className="py-20 px-6 md:px-14 border-t border-white/10 bg-[#060607]/40 relative">
      
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10">
        <div>
          <span className="font-mono text-xs text-signal tracking-[0.3em] uppercase font-bold">04 // GÖRSEL YÖNETİM</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight mt-1">SİNEMATİK ANLATIM</h2>
        </div>
        <p className="font-mono text-xs text-muted tracking-widest mt-2 md:mt-0">
          SİNEMA KAMERA SİSTEMLERİ · ANAMORFİK LENS · COLOR GRADING
        </p>
      </div>

      {/* Category Tab Selector Bar */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-white/10 pb-4">
        {cinematicData.map((item, idx) => {
          const isActive = activeIndex === idx;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveIndex(idx)}
              className={`px-5 py-2.5 rounded-full font-mono text-xs transition-all duration-300 font-bold cursor-pointer ${
                isActive
                  ? "bg-signal text-white shadow-[0_0_20px_rgba(255,59,0,0.5)] border border-signal"
                  : "bg-surface/60 text-muted hover:text-softwhite hover:bg-surface border border-white/10"
              }`}
              data-cursor="GÖRSEL"
            >
              {item.tag}
            </button>
          );
        })}
      </div>

      {/* Compact Cinematic Viewport Card (Max height ~380px) */}
      <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-surface/80 h-[380px] md:h-[420px] flex flex-col justify-between p-6 md:p-8 shadow-2xl group transition-all duration-700">
        
        {/* Frame Background Image with Smooth Fade */}
        <img
          src={isGraded ? activeReel.bgGradedImg : activeReel.bgRawImg}
          alt={activeReel.title}
          className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-75 transition-all duration-700 grayscale-[20%] group-hover:scale-105 pointer-events-none"
        />

        {/* Anamorphic 2.39:1 Letterbox Overlay Crop Lines */}
        <div className="absolute top-0 inset-x-0 h-4 bg-black/80 pointer-events-none border-b border-white/10 flex items-center justify-between px-6 font-mono text-[9px] text-white/40">
          <span>CINEMATIC SCOPE 2.39:1</span>
          <span>REC 709 / LOG-C</span>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-4 bg-black/80 pointer-events-none border-t border-white/10 flex items-center justify-between px-6 font-mono text-[9px] text-white/40">
          <span>FPS: 24.00</span>
          <span>SHUTTER: 180°</span>
        </div>

        {/* Top Info Bar */}
        <div className="relative z-10 flex justify-between items-center mt-3">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] font-bold bg-signal/20 border border-signal/40 text-signal px-3 py-1 rounded-full uppercase">
              {activeReel.aspectRatio}
            </span>
            <span className="font-mono text-[10px] text-muted hidden sm:inline-block">
              {activeReel.cameraSpec}
            </span>
          </div>

          {/* LUT Color Grade Switcher */}
          <button
            type="button"
            onClick={() => setIsGraded(!isGraded)}
            className="font-mono text-[10px] bg-void/80 hover:bg-void border border-white/20 px-4 py-1.5 rounded-full text-softwhite transition-all font-bold cursor-pointer backdrop-blur-md flex items-center gap-2"
            data-cursor="RENK"
          >
            <span className={`w-2 h-2 rounded-full ${isGraded ? "bg-signal shadow-[0_0_8px_#FF3B00]" : "bg-white/40"}`}></span>
            <span>{isGraded ? "COLOR GRADED (LUT ON)" : "RAW LOG (COLOR OFF)"}</span>
          </button>
        </div>

        {/* Bottom Content Area */}
        <div className="relative z-10 mb-2">
          <span className="font-mono text-xs text-signal tracking-widest font-bold block mb-1">
            {activeReel.tag}
          </span>
          <h3 className="font-display text-2xl md:text-4xl font-bold tracking-tight text-softwhite">
            {activeReel.title}
          </h3>
          <p className="font-sans text-xs md:text-sm text-muted mt-2 max-w-2xl line-clamp-2">
            {activeReel.description}
          </p>

          {/* Specs & Play Action Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-4 border-t border-white/10">
            <div className="font-mono text-[11px] text-white/70 space-x-4 hidden md:block">
              <span>📷 MERCEK: <strong className="text-softwhite">{activeReel.lensSpec}</strong></span>
              <span>🎨 PALET: <strong className="text-softwhite">{activeReel.colorGrade}</strong></span>
            </div>

            <button
              type="button"
              onClick={() => setActiveVideoModal(activeReel)}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-signal text-white hover:bg-signal/80 font-mono text-xs font-bold transition-all shadow-[0_0_20px_rgba(255,59,0,0.6)] cursor-pointer ml-auto"
              data-cursor="İZLE"
            >
              🎬 SİNEMATİK FRAGMANI İZLE
            </button>
          </div>
        </div>

      </div>

      {/* Video Modal Preview via React Portal */}
      {mounted && activeVideoModal && createPortal(
        <div
          id="visual-modal-overlay"
          className="fixed inset-0 z-[999999] flex items-center justify-center p-4 md:p-10 bg-black/90 backdrop-blur-3xl animate-fadeIn cursor-pointer"
          onClick={closeModal}
          data-cursor="KAPAT"
        >
          <div
            className="relative w-full max-w-5xl bg-[#060607] border border-white/20 rounded-2xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.9)] flex flex-col max-h-[90vh] z-[1000000] cursor-default"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-white/10 bg-[#0c0c0e] relative z-[1000001]">
              <div className="flex items-center gap-3 font-mono text-xs">
                <span className="text-signal font-bold">● MUSE GÖRSEL DEMO</span>
                <span className="text-muted">|</span>
                <span className="text-softwhite font-bold">{activeVideoModal.title}</span>
              </div>
              <button
                type="button"
                onClick={closeModal}
                className="font-mono text-xs text-white bg-signal hover:bg-signal/80 transition-all font-bold px-6 py-2.5 rounded-full border border-white/20 cursor-pointer shadow-2xl z-[1000002] pointer-events-auto"
                data-cursor="KAPAT"
              >
                [ KAPAT × ]
              </button>
            </div>

            {/* Video Player */}
            <div className="p-6">
              <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black border border-white/10 shadow-2xl">
                <iframe
                  src={`${activeVideoModal.youtubeEmbed}?autoplay=1&rel=0`}
                  title={activeVideoModal.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>

              {/* Technical Specs Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 font-mono text-xs bg-void/60 p-4 rounded-xl border border-white/10">
                <div>
                  <span className="text-white/40 block text-[10px]">KAMERA PARKURU:</span>
                  <span className="text-softwhite font-bold">{activeVideoModal.cameraSpec}</span>
                </div>
                <div>
                  <span className="text-white/40 block text-[10px]">ANAMORFİK MERCEK:</span>
                  <span className="text-softwhite font-bold">{activeVideoModal.lensSpec}</span>
                </div>
                <div>
                  <span className="text-white/40 block text-[10px]">COLOR GRADE:</span>
                  <span className="text-softwhite font-bold">{activeVideoModal.colorGrade}</span>
                </div>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

    </section>
  );
}
