import React from "react";

export default function Sessions() {
  return (
    <section id="sessions" className="py-32 px-6 md:px-14 border-t border-white/10 bg-charcoal/20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16">
        <div>
          <span className="font-mono text-xs text-signal tracking-[0.3em] uppercase font-bold">ÖZGÜN FORMAT</span>
          <h2 className="font-display text-3xl md:text-6xl font-bold tracking-tight mt-2">MUSE SEANSLARI</h2>
          <p className="font-mono text-xs text-muted tracking-widest mt-1">20 DAKİKALIK SES & HİKAYE</p>
        </div>
      </div>

      {/* Sessions Poster Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div className="group relative rounded-2xl overflow-hidden border border-white/10 bg-surface/50 p-8 flex flex-col justify-between h-[420px]" data-cursor="İZLE">
          <div className="flex justify-between items-start">
            <span className="font-mono text-xs text-muted tracking-widest">BÖLÜM 01</span>
            <span className="font-mono text-[10px] bg-white/10 px-3 py-1 rounded-full text-softwhite">22:15 DK</span>
          </div>
          <div>
            <p className="font-mono text-xs text-signal tracking-widest mb-1">AKUSTİK REZİDANS</p>
            <h3 className="font-display text-3xl md:text-4xl font-bold">KORHAN ARAS // LIVE AT STUDIO A</h3>
            <p className="font-sans text-xs text-muted mt-2 max-w-sm">Dört mikrofon, tek bir oda ve filtrelenmemiş müzikal itiraflar.</p>
          </div>
        </div>

        <div className="group relative rounded-2xl overflow-hidden border border-white/10 bg-surface/50 p-8 flex flex-col justify-between h-[420px]" data-cursor="İZLE">
          <div className="flex justify-between items-start">
            <span className="font-mono text-xs text-muted tracking-widest">BÖLÜM 02</span>
            <span className="font-mono text-[10px] bg-white/10 px-3 py-1 rounded-full text-softwhite">19:40 DK</span>
          </div>
          <div>
            <p className="font-mono text-xs text-signal tracking-widest mb-1">SES ÜZERİNE DİYALOGLAR</p>
            <h3 className="font-display text-3xl md:text-4xl font-bold">CAN BORA // DİJİTAL HARMONİ</h3>
            <p className="font-sans text-xs text-muted mt-2 max-w-sm">Müzik teknolojisi ve yapay zekânın ses prodüksiyonundaki geleceği.</p>
          </div>
        </div>

      </div>
    </section>
  );
}
