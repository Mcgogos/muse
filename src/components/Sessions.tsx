"use client";

import React, { useRef, useState, useEffect } from "react";
import { createPortal } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

interface SetlistItem {
  track: string;
  duration: string;
}

interface SessionData {
  id: string;
  episode: string;
  duration: string;
  category: string;
  artist: string;
  title: string;
  description: string;
  youtubeId: string;
  youtubeEmbed: string;
  bgImg: string;
  bpmKey: string;
  setlist: SetlistItem[];
  credits: {
    mics: string;
    preamp: string;
    tape: string;
    studio: string;
  };
}

const sessionsData: SessionData[] = [
  {
    id: "session-01",
    episode: "BÖLÜM 01",
    duration: "22:15 DK",
    category: "AKUSTİK REZİDANS",
    artist: "MESUT ÇAKIR",
    title: "AKUSTİK REZİDANS SEANSI",
    description: "Mesut Çakır'ın Studer kasete canlı aktarılan filtrelenmemiş samimi ve sıcak akustik performansı.",
    youtubeId: "KcU1KkGEKQk",
    youtubeEmbed: "https://www.youtube.com/embed/KcU1KkGEKQk",
    bgImg: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1200&auto=format&fit=crop",
    bpmKey: "118 BPM · C MAJ",
    setlist: [
      { track: "01. Mesut Çakır (Canlı Akustik İcra)", duration: "04:12" },
      { track: "02. Akustik İtiraf & Söyleşi", duration: "08:45" },
      { track: "03. Sonik Yanılsama (Improv Take)", duration: "09:18" },
    ],
    credits: {
      mics: "Neumann U87 / Telefunken ELA M251",
      preamp: "Neve 1073 Dual Preamp",
      tape: "Studer A800 2-Inch 24-Track Tape",
      studio: "MUSE Studio A · Akustik Oda",
    },
  },
  {
    id: "session-02",
    episode: "BÖLÜM 02",
    duration: "19:40 DK",
    category: "STÜDYO İKİLİ SEANSLARI",
    artist: "MESUT ÇAKIR",
    title: "CANLI İKİLİ STÜDYO SEANSI",
    description: "Akustik enstrüman ve vokal uyumuyla canlı stüdyo ortamında kaydedilen özel düet ve söyleşi seansı.",
    youtubeId: "kI0-7UcFX_c",
    youtubeEmbed: "https://www.youtube.com/embed/kI0-7UcFX_c",
    bgImg: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop",
    bpmKey: "124 BPM · D MINOR",
    setlist: [
      { track: "01. Mesut Çakır (Canlı İkili Performans)", duration: "04:50" },
      { track: "02. Akustik Söyleşi & İtiraf", duration: "05:10" },
      { track: "03. Enstrümantal Akustik Jam", duration: "09:40" },
    ],
    credits: {
      mics: "AKG C12 VR Tube Mic",
      preamp: "Tube-Tech MP2A",
      tape: "Ampex ATR-102 Stereo Tape",
      studio: "MUSE Studio B · Lab",
    },
  },
];

export default function Sessions() {
  const sectionRef = useRef<HTMLElement>(null);
  const [playingSessionId, setPlayingSessionId] = useState<string | null>(null);
  const [activeModal, setActiveModal] = useState<SessionData | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      ".session-card",
      { y: 50, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      }
    );
  }, { scope: sectionRef });

  const stopAllBackgroundMusic = () => {
    window.dispatchEvent(new CustomEvent("pause-bg-music"));
    if (typeof document !== "undefined") {
      document.querySelectorAll("audio").forEach((a) => {
        try {
          a.pause();
        } catch {}
      });
    }
  };

  const resumeBackgroundMusic = () => {
    window.dispatchEvent(new CustomEvent("resume-bg-music"));
  };

  // Handle Play/Pause YouTube Teaser Audio
  const togglePlayAudio = (session: SessionData, e: React.MouseEvent) => {
    e.stopPropagation();

    if (playingSessionId === session.id) {
      setPlayingSessionId(null);
      resumeBackgroundMusic();
    } else {
      stopAllBackgroundMusic();
      setPlayingSessionId(session.id);
    }
  };

  const openModal = (session: SessionData, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setPlayingSessionId(null);
    stopAllBackgroundMusic();
    setActiveModal(session);
  };

  const closeModal = (e?: React.MouseEvent | React.TouchEvent | React.PointerEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setActiveModal(null);
    resumeBackgroundMusic();
  };

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveModal(null);
        resumeBackgroundMusic();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section ref={sectionRef} id="sessions" className="py-32 px-6 md:px-14 border-t border-white/10 bg-charcoal/20 relative">
      {/* Hidden YouTube Audio Streamer for 'CANLI KESİTİ DİNLE' */}
      {playingSessionId && (
        <div className="sr-only opacity-0 pointer-events-none w-0 h-0 overflow-hidden">
          <iframe
            src={`https://www.youtube.com/embed/${
              playingSessionId === "session-01" ? "KcU1KkGEKQk" : "kI0-7UcFX_c"
            }?autoplay=1&enablejsapi=1&playsinline=1`}
            title="YouTube Audio Teaser Stream"
            allow="autoplay"
          />
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
        <div>
          <span className="font-mono text-xs text-signal tracking-[0.3em] uppercase font-bold">ÖZGÜN FORMAT</span>
          <h2 className="font-display text-3xl md:text-6xl font-bold tracking-tight mt-2">MUSE SEANSLARI</h2>
          <p className="font-mono text-xs text-muted tracking-widest mt-1">20 DAKİKALIK SES & HİKAYE · CANLI AKUSTİK KASET KAYITLARI</p>
        </div>
      </div>

      {/* Sessions Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sessionsData.map((session) => {
          const isPlaying = playingSessionId === session.id;

          return (
            <div
              key={session.id}
              className="session-card group relative rounded-2xl overflow-hidden border border-white/10 bg-surface/60 p-8 flex flex-col justify-between h-[460px] transition-all duration-500 hover:border-signal/40 shadow-2xl"
              data-cursor="SEANS"
            >
              {/* Card Background Image with Subtle Zoom */}
              <img
                src={session.bgImg}
                alt={session.title}
                className="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none grayscale-[40%]"
              />

              {/* Animated Reel-to-Reel Tape Deck Overlay */}
              <div className="absolute top-6 right-6 flex items-center gap-3 z-10 pointer-events-none">
                <div className={`w-14 h-14 rounded-full border-2 border-white/20 bg-void/80 flex items-center justify-center transition-transform duration-1000 ${isPlaying ? "animate-[spin_4s_linear_infinite] border-signal shadow-[0_0_20px_rgba(255,59,0,0.6)]" : "group-hover:rotate-45"}`}>
                  <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-signal"></div>
                  </div>
                </div>
              </div>

              {/* Top Meta info */}
              <div className="relative z-10 flex justify-between items-start">
                <span className="font-mono text-xs text-muted tracking-widest bg-void/70 px-3 py-1 rounded-full border border-white/10 backdrop-blur-md">
                  {session.episode}
                </span>
                <span className="font-mono text-[10px] bg-signal/20 border border-signal/40 px-3 py-1 rounded-full text-signal font-bold mr-16">
                  {session.duration}
                </span>
              </div>

              {/* Bottom Content Area */}
              <div className="relative z-10 mt-auto">
                <span className="font-mono text-xs text-signal tracking-widest block font-bold mb-1">
                  {session.category}
                </span>
                <h3 className="font-display text-2xl md:text-4xl font-bold tracking-tight text-softwhite">
                  {session.artist} <span className="text-white/40">// {session.title}</span>
                </h3>
                <p className="font-sans text-xs text-muted mt-2 max-w-md line-clamp-2">
                  {session.description}
                </p>

                {/* Interactive Action Controls */}
                <div className="flex flex-wrap items-center gap-3 mt-6 pt-6 border-t border-white/10">
                  {/* Play Teaser Audio Button */}
                  <button
                    type="button"
                    onClick={(e) => togglePlayAudio(session, e)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs transition-all ${
                      isPlaying
                        ? "bg-signal text-white font-bold shadow-[0_0_15px_rgba(255,59,0,0.6)] animate-pulse"
                        : "bg-void/80 text-softwhite hover:border-signal border border-white/15"
                    }`}
                  >
                    <span>{isPlaying ? "■ KESİTİ DURDUR" : "▶ YOUTUBE CANLI KESİTİ DİNLE"}</span>
                  </button>

                  {/* Open Video Player & Setlist Modal */}
                  <button
                    type="button"
                    onClick={(e) => openModal(session, e)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-softwhite/10 hover:bg-softwhite hover:text-void border border-white/15 font-mono text-xs text-softwhite transition-all font-bold cursor-pointer"
                  >
                    🎬 SEANSI İZLE & SETLIST
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Video Player & Setlist Modal via React Portal on document.body */}
      {mounted && activeModal && createPortal(
        <div
          id="session-modal-overlay"
          className="fixed inset-0 z-[999999] flex items-center justify-center p-4 md:p-10 bg-black/90 backdrop-blur-3xl animate-fadeIn cursor-pointer"
          onClick={closeModal}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeModal(e);
          }}
          data-cursor="KAPAT"
        >
          <div
            className="relative w-full max-w-5xl bg-[#060607] border border-white/20 rounded-2xl overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.9)] flex flex-col max-h-[90vh] z-[1000000] cursor-default"
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
          >
            {/* Modal Header Bar with single, prominent Close Button */}
            <div className="flex justify-between items-center px-6 py-4 border-b border-white/10 bg-[#0c0c0e] relative z-[1000001]">
              <div className="flex items-center gap-3 font-mono text-xs">
                <span className="text-signal font-bold">● MUSE SEANSLARI</span>
                <span className="text-muted">|</span>
                <span className="text-softwhite font-bold">{activeModal.artist} // {activeModal.title}</span>
              </div>
              <button
                type="button"
                onClick={closeModal}
                onMouseDown={closeModal}
                onTouchEnd={closeModal}
                className="font-mono text-xs text-white bg-signal hover:bg-signal/80 transition-all font-bold px-6 py-2.5 rounded-full border border-white/20 cursor-pointer shadow-2xl z-[1000002] pointer-events-auto"
                data-cursor="KAPAT"
              >
                [ KAPAT × ]
              </button>
            </div>

            {/* Modal Body: YouTube Video Player & Setlist / Credits */}
            <div className="overflow-y-auto p-6 space-y-6">
              
              {/* High Definition YouTube Video Player */}
              <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black border border-white/10 shadow-2xl">
                <iframe
                  src={`${activeModal.youtubeEmbed}?autoplay=1&rel=0`}
                  title={activeModal.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              </div>

              {/* Session Setlist & Equipment Specs Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                
                {/* Track Setlist */}
                <div className="bg-void/60 p-6 rounded-xl border border-white/10">
                  <h4 className="font-mono text-xs text-signal uppercase tracking-widest font-bold mb-4">
                    📋 SEANS SETLIST & İÇERİK
                  </h4>
                  <div className="space-y-3 font-mono text-xs">
                    {activeModal.setlist.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center border-b border-white/5 pb-2 text-softwhite">
                        <span>{item.track}</span>
                        <span className="text-muted">{item.duration}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Studio Equipment & Credits */}
                <div className="bg-void/60 p-6 rounded-xl border border-white/10 font-mono text-xs space-y-3">
                  <h4 className="font-mono text-xs text-signal uppercase tracking-widest font-bold mb-4">
                    🎙️ TEKNİK STÜDYO KÜNYESİ
                  </h4>
                  <div>
                    <span className="text-white/40 block text-[10px]">MİKROFON PARKURU:</span>
                    <span className="text-softwhite">{activeModal.credits.mics}</span>
                  </div>
                  <div>
                    <span className="text-white/40 block text-[10px]">PREAMP & ANALOG ZİNCİR:</span>
                    <span className="text-softwhite">{activeModal.credits.preamp}</span>
                  </div>
                  <div>
                    <span className="text-white/40 block text-[10px]">MAKARALI KASET KAYITÇI:</span>
                    <span className="text-softwhite">{activeModal.credits.tape}</span>
                  </div>
                  <div>
                    <span className="text-white/40 block text-[10px]">LOKASYON:</span>
                    <span className="text-softwhite">{activeModal.credits.studio}</span>
                  </div>
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
