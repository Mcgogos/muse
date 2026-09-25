"use client";

import React, { useState } from "react";

export default function SoundStudio() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section id="sound" className="py-32 px-6 md:px-14 border-t border-white/10 bg-charcoal/30 relative">
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
          Analog sıcaklık, dijital kusursuzluk. Stüdyo kayıtlarından Dolby Atmos mastering'e uzanan sonik evren.
        </p>
      </div>

      {/* Stüdyo Audio Oynatıcı Modülü */}
      <div className="p-8 md:p-12 rounded-2xl bg-surface/70 border border-white/10 relative overflow-hidden z-10 backdrop-blur-md">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          
          <div className="flex items-center gap-6 w-full lg:w-auto">
            {/* Play/Pause Butonu */}
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-16 h-16 rounded-full bg-softwhite text-void flex items-center justify-center font-mono text-xs font-bold hover:bg-signal hover:text-white transition-all duration-300 shrink-0" 
              data-cursor="ÇAL/DURDUR"
            >
              <span>{isPlaying ? '❚❚' : '▶'}</span>
            </button>
            <div>
              <div className="font-mono text-[10px] text-signal uppercase tracking-widest font-bold">ŞU AN ÇALAN</div>
              <h3 className="font-display text-2xl font-bold tracking-tight mt-0.5">YARININ YANKILARI</h3>
              <p className="font-mono text-xs text-muted mt-1">Prod: MUSE Studio A · 48kHz / 24-bit Flac</p>
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
      </div>
    </section>
  );
}
