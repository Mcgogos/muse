import React from "react";

export default function VisualDirection() {
  return (
    <section id="visual" className="py-32 px-6 md:px-14 border-t border-white/10">
      <div className="mb-16">
        <span className="font-mono text-xs text-muted tracking-[0.3em] uppercase">04 // GÖRSEL YÖNETİM</span>
        <h2 className="font-display text-3xl md:text-6xl font-bold tracking-tight mt-2">SİNEMATİK ANLATIM</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        {/* Büyük Sinemaskop Çalışma */}
        <div className="md:col-span-8 group relative rounded-xl overflow-hidden bg-charcoal border border-white/10" data-cursor="GÖRÜNTÜLE">
          <div className="aspect-[16/9] w-full bg-gradient-to-tr from-void via-surface to-charcoal flex items-center justify-center p-8 group-hover:scale-105 transition-transform duration-700">
            <span className="font-mono text-xs tracking-widest text-muted border border-white/20 px-4 py-2 rounded-full backdrop-blur-sm">2.39:1 ANAMORPHIC MASTER</span>
          </div>
          <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-void to-transparent">
            <span className="font-mono text-[10px] text-signal uppercase tracking-widest font-bold">MÜZİK VİDEOSU</span>
            <h4 className="font-display text-xl font-bold mt-1">GECE YOLCULUĞU</h4>
          </div>
        </div>

        {/* Portre / Dikey Format */}
        <div className="md:col-span-4 group relative rounded-xl overflow-hidden bg-charcoal border border-white/10" data-cursor="GÖRÜNTÜLE">
          <div className="aspect-[9/16] w-full bg-gradient-to-b from-charcoal via-surface to-void flex items-center justify-center p-8 group-hover:scale-105 transition-transform duration-700">
            <span className="font-mono text-xs tracking-widest text-muted border border-white/20 px-4 py-2 rounded-full backdrop-blur-sm">9:16 DİKEY SİNEMA</span>
          </div>
          <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-void to-transparent">
            <span className="font-mono text-[10px] text-signal uppercase tracking-widest font-bold">EDİTORYAL KESİTLER</span>
            <h4 className="font-display text-xl font-bold mt-1">IŞIK & GÖLGE</h4>
          </div>
        </div>
      </div>
    </section>
  );
}
