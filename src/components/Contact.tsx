import React from "react";

export default function Contact() {
  return (
    <section id="contact" className="py-32 px-6 md:px-14 border-t border-white/10 bg-charcoal/40">
      <div className="max-w-2xl">
        <span className="font-mono text-xs text-signal tracking-[0.3em] uppercase font-bold">İŞ BİRLİĞİ BAŞLAT</span>
        <h2 className="font-display text-4xl md:text-7xl font-bold tracking-tight mt-2 mb-12">BİR FİKRİN Mİ VAR? BİRLİKTE ÜRETELİM.</h2>

        <form className="flex flex-col gap-8 font-mono text-xs">
          <div className="border-b border-white/20 pb-2">
            <input type="text" placeholder="İSİM / STÜDYO" className="w-full bg-transparent text-softwhite outline-none placeholder:text-muted focus:border-signal" />
          </div>
          <div className="border-b border-white/20 pb-2">
            <input type="email" placeholder="E-POSTA ADRESİ" className="w-full bg-transparent text-softwhite outline-none placeholder:text-muted focus:border-signal" />
          </div>
          <div className="border-b border-white/20 pb-2">
            <input type="text" placeholder="PROJE TİPİ [SES / GÖRSEL / DİJİTAL / HİBRİT]" className="w-full bg-transparent text-softwhite outline-none placeholder:text-muted focus:border-signal" />
          </div>
          <div className="border-b border-white/20 pb-2">
            <textarea placeholder="MESAJ / DETAYLAR" rows={2} className="w-full bg-transparent text-softwhite outline-none placeholder:text-muted resize-none focus:border-signal"></textarea>
          </div>

          <button type="button" className="self-start mt-4 px-8 py-4 bg-softwhite text-void font-bold tracking-widest uppercase hover:bg-signal hover:text-white transition-colors duration-300 rounded-full" data-cursor="GÖNDER">
            MESAJI GÖNDER →
          </button>
        </form>
      </div>

      <div className="mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center font-mono text-xs text-muted gap-4">
        <span>MUSE CREATIVE HOUSE</span>
        <div className="flex gap-6">
          <a href="#" className="hover:text-softwhite">YOUTUBE</a>
          <a href="#" className="hover:text-softwhite">INSTAGRAM</a>
          <a href="#" className="hover:text-softwhite">SPOTIFY</a>
          <a href="#" className="hover:text-softwhite">GITHUB</a>
        </div>
      </div>
    </section>
  );
}
