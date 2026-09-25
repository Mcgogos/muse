"use client";

import React, { useState, useRef, useEffect } from "react";

export default function SoundStudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [mixRatio, setMixRatio] = useState(1); // 0: HAM (RAW), 1: MİXLENMİŞ (MASTERED)
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Web Audio API refs for real-time sound processing
  const audioCtxRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null);
  const rawGainRef = useRef<GainNode | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);

  // Initialize Web Audio API for extreme Ham vs Mixli contrast
  const initWebAudio = () => {
    if (audioCtxRef.current || !audioRef.current) return;

    try {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioContextClass();
      audioCtxRef.current = ctx;

      const source = ctx.createMediaElementSource(audioRef.current);
      sourceNodeRef.current = source;

      // 1. HAM SES ZİNCİRİ (RAW / UNMIXED - Mat, bassız, ham oda kaydı hissi)
      const rawHighpass = ctx.createBiquadFilter();
      rawHighpass.type = "highpass";
      rawHighpass.frequency.value = 280;

      const rawLowpass = ctx.createBiquadFilter();
      rawLowpass.type = "lowpass";
      rawLowpass.frequency.value = 1400;

      const rawGain = ctx.createGain();
      rawGain.gain.value = (1 - mixRatio) * 0.7;
      rawGainRef.current = rawGain;

      source.connect(rawHighpass);
      rawHighpass.connect(rawLowpass);
      rawLowpass.connect(rawGain);
      rawGain.connect(ctx.destination);

      // 2. MİXLENMİŞ ZİNCİR (MASTERED / DOLBY ATMOS - Derin bass, kristal tizler & stüdyo kompresörü)
      const masterLowShelf = ctx.createBiquadFilter();
      masterLowShelf.type = "lowshelf";
      masterLowShelf.frequency.value = 100;
      masterLowShelf.gain.value = 6;

      const masterHighShelf = ctx.createBiquadFilter();
      masterHighShelf.type = "highshelf";
      masterHighShelf.frequency.value = 5500;
      masterHighShelf.gain.value = 7;

      const compressor = ctx.createDynamicsCompressor();
      compressor.threshold.value = -14;
      compressor.knee.value = 10;
      compressor.ratio.value = 4.5;
      compressor.attack.value = 0.003;
      compressor.release.value = 0.2;

      const masterGain = ctx.createGain();
      masterGain.gain.value = mixRatio * 1.25;
      masterGainRef.current = masterGain;

      source.connect(masterLowShelf);
      masterLowShelf.connect(masterHighShelf);
      masterHighShelf.connect(compressor);
      compressor.connect(masterGain);
      masterGain.connect(ctx.destination);
    } catch (err) {
      console.log("Web Audio API fallback:", err);
    }
  };

  const updateMixRatio = (val: number) => {
    setMixRatio(val);
    if (rawGainRef.current && masterGainRef.current) {
      rawGainRef.current.gain.value = (1 - val) * 0.7;
      masterGainRef.current.gain.value = val * 1.25;
    }
  };

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      // Manuel durdurulduğunda site arka plan müziğini geri aç
      window.dispatchEvent(new CustomEvent("resume-bg-music"));
    } else {
      initWebAudio();

      if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
      }

      // Stüdyo sesi başladığında site arka plan müziğini sustur
      window.dispatchEvent(new CustomEvent("pause-bg-music"));

      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.error("Audio playback error:", err);
      });
    }
  };

  // Aşağı/Yukarı Scroll Takibi: Kullanıcı ses stüdyosundan uzaklaşırsa müziği durdur ve arka plan müziğini devam ettir
  useEffect(() => {
    const handleScroll = () => {
      if (!isPlaying) return;

      const section = document.getElementById("sound");
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;

      // Eğer ses stüdyosu ekrandan tamamen çıkarsa
      if (rect.bottom < 100 || rect.top > windowHeight - 100) {
        if (audioRef.current) {
          audioRef.current.pause();
        }
        setIsPlaying(false);
        window.dispatchEvent(new CustomEvent("resume-bg-music"));
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isPlaying]);

  return (
    <section id="sound" className="py-32 px-6 md:px-14 border-t border-white/10 bg-charcoal/30 relative">
      <audio 
        ref={audioRef} 
        src="/studio-track.mp3" 
        preload="auto" 
        onEnded={() => {
          setIsPlaying(false);
          window.dispatchEvent(new CustomEvent("resume-bg-music"));
        }} 
      />

      {/* Ambient Light Sızıntısı (Glow) for Audio Player */}
      <div 
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full bg-gradient-to-tr from-signal/10 via-white/5 to-transparent blur-[140px] pointer-events-none z-0 transition-opacity duration-1000 ${isPlaying ? 'opacity-70' : 'opacity-30'}`}
      />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 relative z-10">
        <div>
          <span className="font-mono text-xs text-muted tracking-[0.3em] uppercase">03 // SES STÜDYOSU</span>
          <h2 className="font-display text-3xl md:text-6xl font-bold tracking-tight mt-2">AKUSTİK HASSASİYET</h2>
        </div>
        <p className="font-mono text-xs text-muted max-w-xs mt-4 md:mt-0">
          Analog sıcaklık, dijital kusursuzluk. Stüdyo kayıtlarından Dolby Atmos mastering&apos;e uzanan sonik evren.
        </p>
      </div>

      {/* Stüdyo Audio Oynatıcı Modülü */}
      <div className="p-8 md:p-12 rounded-2xl bg-surface/70 border border-white/10 relative overflow-hidden z-10 backdrop-blur-md">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          
          <div className="flex items-center gap-6 w-full lg:w-auto">
            {/* Play/Pause Butonu */}
            <button 
              onClick={togglePlay}
              className="w-16 h-16 rounded-full bg-softwhite text-void flex items-center justify-center font-mono text-xs font-bold hover:bg-signal hover:text-white transition-all duration-300 shrink-0 shadow-lg" 
              data-cursor="ÇAL/DURDUR"
            >
              <span>{isPlaying ? '■■' : '▶'}</span>
            </button>
            <div>
              <div className="font-mono text-[10px] text-signal uppercase tracking-widest font-bold">ŞU AN ÇALAN STÜDYO DEMOSU</div>
              <h3 className="font-display text-2xl font-bold tracking-tight mt-0.5">YARININ YANKILARI</h3>
              <p className="font-mono text-xs text-muted mt-1">Prod: MUSE Studio A · Özel Akustik Demo Parça</p>
            </div>
          </div>

          {/* Waveform Görselleştirici */}
          <div className={`flex items-center gap-1.5 h-12 w-full lg:w-1/2 justify-center px-4 bg-void/50 rounded-xl border border-white/5 py-2 ${isPlaying ? 'playing' : ''}`}>
            <span className="wave-bar w-1 bg-softwhite/40 rounded-full h-2 transition-all"></span>
            <span className="wave-bar w-1 bg-softwhite/40 rounded-full h-4 transition-all"></span>
            <span className="wave-bar w-1 bg-softwhite/40 rounded-full h-8 transition-all"></span>
            <span className="wave-bar w-1 bg-softwhite/60 rounded-full h-3 transition-all"></span>
            <span className="wave-bar w-1 bg-signal rounded-full h-10 transition-all"></span>
            <span className="wave-bar w-1 bg-softwhite/60 rounded-full h-6 transition-all"></span>
            <span className="wave-bar w-1 bg-softwhite/40 rounded-full h-3 transition-all"></span>
            <span className="wave-bar w-1 bg-softwhite/30 rounded-full h-7 transition-all"></span>
            <span className="wave-bar w-1 bg-softwhite/40 rounded-full h-5 transition-all"></span>
            <span className="wave-bar w-1 bg-softwhite/20 rounded-full h-2 transition-all"></span>
          </div>

          {/* Teknik Stüdyo Künyesi */}
          <div className="grid grid-cols-2 gap-4 font-mono text-[11px] text-muted w-full lg:w-auto border-t lg:border-t-0 lg:border-l border-white/10 pt-4 lg:pt-0 lg:pl-8">
            <div>
              <span className="block text-white/40">BPM / ANAHTAR</span>
              <span className="text-softwhite">124 BPM · D MİNÖR</span>
            </div>
            <div>
              <span className="block text-white/40">ANALOG ZİNCİR</span>
              <span className="text-softwhite">NEVE 1073 / TUBE-TECH</span>
            </div>
          </div>

        </div>

        {/* Gerçek Zamanlı A/B Mix Crossfader Kontrolü */}
        <div className="mt-8 pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => updateMixRatio(0)}
                className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-all ${
                  mixRatio === 0 
                    ? "bg-signal text-white font-bold shadow-[0_0_15px_rgba(255,59,0,0.5)]" 
                    : "bg-void/60 text-muted hover:text-softwhite border border-white/10"
                }`}
              >
                🎛️ HAM SES (RAW)
              </button>
              <button 
                onClick={() => updateMixRatio(0.5)}
                className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-all ${
                  mixRatio === 0.5 
                    ? "bg-signal text-white font-bold shadow-[0_0_15px_rgba(255,59,0,0.5)]" 
                    : "bg-void/60 text-muted hover:text-softwhite border border-white/10"
                }`}
              >
                ⚖️ %50 HYBRID
              </button>
              <button 
                onClick={() => updateMixRatio(1)}
                className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-all ${
                  mixRatio === 1 
                    ? "bg-signal text-white font-bold shadow-[0_0_15px_rgba(255,59,0,0.5)]" 
                    : "bg-void/60 text-muted hover:text-softwhite border border-white/10"
                }`}
              >
                🎚️ MİXLENMİŞ (ATMOS)
              </button>
            </div>

            <div className="font-mono text-xs text-softwhite">
              <span className="text-muted">KALİTE / MİX DENGE: </span>
              <span className="text-signal font-bold">%{Math.round(mixRatio * 100)}</span>{" "}
              <span className="text-white/40 text-[10px]">
                {mixRatio < 0.3 ? "[HAM - MAT ODA KAYDI]" : mixRatio > 0.7 ? "[MASTERED - DOLBY ATMOS]" : "[DENGELİ GEÇİŞ]"}
              </span>
            </div>
          </div>

          {/* Etkileşimli Slider Bar */}
          <div className="relative flex items-center bg-void/50 p-4 rounded-xl border border-white/10">
            <span className="font-mono text-[11px] text-muted mr-4 uppercase tracking-widest font-bold shrink-0">
              HAM SES (RAW)
            </span>
            <input 
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={mixRatio}
              onChange={(e) => updateMixRatio(parseFloat(e.target.value))}
              className="w-full accent-signal cursor-pointer h-3 bg-charcoal rounded-lg border border-white/20"
            />
            <span className="font-mono text-[11px] text-signal font-bold ml-4 uppercase tracking-widest shrink-0">
              MİXLİ (MASTERED)
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}


