import React from "react";

export default function Disciplines() {
  return (
    <section id="what-we-create" className="py-32 px-6 md:px-14 border-t border-white/10">
      <div className="mb-16 font-mono text-xs text-muted tracking-[0.3em] uppercase">
        02 // NELER ÜRETİYORUZ
      </div>
      <div className="divide-y divide-white/10">
        
        <div className="discipline-item group py-12 flex flex-col md:flex-row justify-between items-start md:items-center transition-all duration-500 hover:px-4" data-cursor="KEŞFET">
          <div className="font-display text-4xl md:text-7xl font-bold tracking-tight group-hover:text-signal transition-colors">
            SES
          </div>
          <div className="font-mono text-xs md:text-sm text-muted mt-4 md:mt-0 max-w-md tracking-wider">
            Müzik Prodüksiyonu · Stüdyo Kayıt · Miks & Mastering · Analog Sentez
          </div>
        </div>

        <div className="discipline-item group py-12 flex flex-col md:flex-row justify-between items-start md:items-center transition-all duration-500 hover:px-4" data-cursor="KEŞFET">
          <div className="font-display text-4xl md:text-7xl font-bold tracking-tight group-hover:text-signal transition-colors">
            GÖRSEL
          </div>
          <div className="font-mono text-xs md:text-sm text-muted mt-4 md:mt-0 max-w-md tracking-wider">
            Müzik Klibi · Sinematik Kurgu · Renk Derecelendirme · Akustik Video
          </div>
        </div>

        <div className="discipline-item group py-12 flex flex-col md:flex-row justify-between items-start md:items-center transition-all duration-500 hover:px-4" data-cursor="KEŞFET">
          <div className="font-display text-4xl md:text-7xl font-bold tracking-tight group-hover:text-signal transition-colors">
            SEANSLAR
          </div>
          <div className="font-mono text-xs md:text-sm text-muted mt-4 md:mt-0 max-w-md tracking-wider">
            20 Dakikalık Akustik Performans & Samimi Söyleşi Formatı · Özgün Medya
          </div>
        </div>

        <div className="discipline-item group py-12 flex flex-col md:flex-row justify-between items-start md:items-center transition-all duration-500 hover:px-4" data-cursor="KEŞFET">
          <div className="font-display text-4xl md:text-7xl font-bold tracking-tight group-hover:text-signal transition-colors">
            DİJİTAL
          </div>
          <div className="font-mono text-xs md:text-sm text-muted mt-4 md:mt-0 max-w-md tracking-wider">
            Premium Web Deneyimleri · Kuruma Özel Yazılım Sistemleri · Mobil Uygulamalar
          </div>
        </div>

        <div className="discipline-item group py-12 flex flex-col md:flex-row justify-between items-start md:items-center transition-all duration-500 hover:px-4" data-cursor="KEŞFET">
          <div className="font-display text-4xl md:text-7xl font-bold tracking-tight group-hover:text-signal transition-colors">
            LABORATUVAR
          </div>
          <div className="font-mono text-xs md:text-sm text-muted mt-4 md:mt-0 max-w-md tracking-wider">
            Yapay Zekâ Projeleri · Üretken Sanat (Generative) · Yaratıcı Kodlama
          </div>
        </div>

      </div>
    </section>
  );
}
