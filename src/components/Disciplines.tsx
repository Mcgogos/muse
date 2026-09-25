"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

const disciplinesData = [
  {
    id: "ses",
    title: "SES",
    subtitle: "Müzik Prodüksiyonu · Stüdyo Kayıt · Miks & Mastering · Analog Sentez",
    hasWaveform: true,
    details: (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 pt-8 border-t border-white/10 font-sans">
        <div>
          <h4 className="font-mono text-signal text-xs tracking-widest mb-2 font-bold">01 / PRODÜKSİYON & BEAT</h4>
          <p className="text-xs md:text-sm text-muted">Sıfırdan aranje, beste ve beat yapımı. Fikrinizi tam teşekküllü bir hit şarkıya dönüştürüyor, projenizin müzikal altyapısını inşa ediyoruz.</p>
        </div>
        <div>
          <h4 className="font-mono text-signal text-xs tracking-widest mb-2 font-bold">02 / MİKS & MASTERING</h4>
          <p className="text-xs md:text-sm text-muted">Analog ekipmanlar (Neve 1073, Tube-Tech) ve endüstri standardı dijital araçlarla şarkınızı tüm listelere hazır hale getiriyoruz.</p>
        </div>
        <div>
          <h4 className="font-mono text-signal text-xs tracking-widest mb-2 font-bold">03 / VOKAL & KAYIT</h4>
          <p className="text-xs md:text-sm text-muted">Neumann ve Telefunken mikrofon parkuruyla, tamamen akustik yalıtımlı odamızda sıfır dip gürültüsü ve maksimum berraklıkla kayıt imkanı.</p>
        </div>
        <div>
          <h4 className="font-mono text-signal text-xs tracking-widest mb-2 font-bold">04 / SES TASARIMI</h4>
          <p className="text-xs md:text-sm text-muted">Film, reklam ve dijital medya için foley, SFX ve sinematik ses dokularının sıfırdan yaratılması.</p>
        </div>
        <div>
          <h4 className="font-mono text-signal text-xs tracking-widest mb-2 font-bold">05 / PODCAST & BROADCAST</h4>
          <p className="text-xs md:text-sm text-muted">Profesyonel yayın standartlarında, yüksek kaliteli ekipmanlarla kesintisiz ve kristal netliğinde podcast ve sesli içerik kaydı.</p>
        </div>
        <div>
          <h4 className="font-mono text-signal text-xs tracking-widest mb-2 font-bold">06 / YAPAY ZEKA LAB</h4>
          <p className="text-xs md:text-sm text-muted">Sınırları zorlayan üretken yapay zeka destekli ses tasarımı ve algoritmik prodüksiyonla geleceğin seslerini inşa ediyoruz.</p>
        </div>
      </div>
    )
  },
  {
    id: "gorsel",
    title: "GÖRSEL",
    subtitle: "Müzik Klibi · Sinematik Kurgu · Renk Derecelendirme · Akustik Video",
    hasWaveform: false,
    details: (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 pt-8 border-t border-white/10 font-sans">
        <div>
          <h4 className="font-mono text-signal text-xs tracking-widest mb-2 font-bold">SİNEMATOGRAFİ</h4>
          <p className="text-xs md:text-sm text-muted">RED ve ARRI kamera sistemleriyle müzik klipleri ve belgeseller için üst düzey sinematik görüntüler.</p>
        </div>
        <div>
          <h4 className="font-mono text-signal text-xs tracking-widest mb-2 font-bold">RENK (COLOR GRADING)</h4>
          <p className="text-xs md:text-sm text-muted">DaVinci Resolve ile projenizin duygusuna özel renk paletleri ve endüstri standardı derecelendirme.</p>
        </div>
      </div>
    )
  },
  {
    id: "seanslar",
    title: "SEANSLAR",
    subtitle: "20 Dakikalık Akustik Performans & Samimi Söyleşi Formatı · Özgün Medya",
    hasWaveform: false,
    details: (
      <div className="mt-8 pt-8 border-t border-white/10 font-sans">
        <p className="text-xs md:text-sm text-muted max-w-2xl">MUSE Sessions, sanatçıların en saf halleriyle, hiçbir filtre olmadan müziklerini icra ettikleri tescilli formatımızdır. Performans ve söyleşiyi tek bir akışta birleştirir.</p>
      </div>
    )
  },
  {
    id: "dijital",
    title: "DİJİTAL",
    subtitle: "Premium Web Deneyimleri · Kuruma Özel Yazılım Sistemleri · Mobil Uygulamalar",
    hasWaveform: false,
    details: (
      <div className="mt-8 pt-8 border-t border-white/10 font-sans">
        <p className="text-xs md:text-sm text-muted max-w-2xl">Next.js ve React teknolojileri kullanılarak 3D etkileşimli, yüksek performanslı premium web platformları ve uygulamalar tasarlıyoruz.</p>
      </div>
    )
  },
  {
    id: "lab",
    title: "LABORATUVAR",
    subtitle: "Yapay Zeka Projeleri · Üretken Sanat (Generative) · Yaratıcı Kodlama",
    hasWaveform: false,
    details: (
      <div className="mt-8 pt-8 border-t border-white/10 font-sans">
        <p className="text-xs md:text-sm text-muted max-w-2xl">MUSE Lab, sanat ve teknolojinin sınırlarının zorlandığı deneysel oyun alanımızdır. LLM entegrasyonları, Three.js ve algoritmik ses sentezi.</p>
      </div>
    )
  }
];

const WaveformBackground = () => (
  <div className="absolute inset-0 overflow-hidden flex items-center justify-around opacity-0 group-hover:opacity-15 transition-opacity duration-700 pointer-events-none z-0">
    {Array.from({ length: 50 }).map((_, i) => {
      const delay = ((i * 0.17) % 2) * -1;
      const duration = 0.6 + ((i * 0.23) % 0.8);
      return (
        <div
          key={i}
          className="w-1 md:w-[6px] bg-signal/60 rounded-full"
          style={{
            height: '100%',
            animation: `waveBgMove ${duration}s ease-in-out ${delay}s infinite alternate`,
            transformOrigin: 'center'
          }}
        />
      );
    })}
    <style>{`
      @keyframes waveBgMove {
        0% { transform: scaleY(0.05); }
        100% { transform: scaleY(0.9); }
      }
    `}</style>
  </div>
);

export default function Disciplines() {
  const containerRef = useRef<HTMLElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  const xTo = useRef<Function | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  const yTo = useRef<Function | null>(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      ".discipline-item-anim",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      }
    );

    if (videoContainerRef.current) {
      xTo.current = gsap.quickTo(videoContainerRef.current, "x", { duration: 0.5, ease: "power3" });
      yTo.current = gsap.quickTo(videoContainerRef.current, "y", { duration: 0.5, ease: "power3" });
    }
  }, { scope: containerRef });

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (xTo.current && yTo.current && hoveredId === "gorsel") {
      xTo.current(e.clientX + 20);
      yTo.current(e.clientY + 20);
    }
  };

  return (
    <section ref={containerRef} id="what-we-create" className="py-32 px-6 md:px-14 border-t border-white/10 relative">
      <div className="mb-16 font-mono text-xs text-muted tracking-[0.3em] uppercase">
        02 // NELER ÜRETİYORUZ
      </div>
      
      <div 
        ref={videoContainerRef}
        className="fixed top-0 left-0 w-64 h-36 md:w-80 md:h-44 pointer-events-none z-[100]"
      >
        <div className={`w-full h-full rounded-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/20 transition-all duration-500 origin-top-left bg-[#060607] ${
            hoveredId === 'gorsel' ? 'opacity-100 scale-100' : 'opacity-0 scale-50'
        }`}>
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="w-full h-full object-cover"
            src="https://videos.pexels.com/video-files/5888894/5888894-uhd_2560_1440_24fps.mp4"
          />
        </div>
      </div>

      <div className="divide-y divide-white/10">
        
        {disciplinesData.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div 
              key={item.id}
              onClick={() => toggleAccordion(index)}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              onMouseMove={handleMouseMove}
              className="discipline-item-anim group py-12 relative cursor-pointer transition-all duration-500 hover:px-4"
              data-cursor={isOpen ? "KAPAT" : "KEŞFET"}
            >
              {item.hasWaveform && <WaveformBackground />}
              
              <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="font-display text-4xl md:text-7xl font-bold tracking-tight group-hover:text-signal transition-colors flex items-center gap-4">
                  {item.title}
                  <span className={`text-2xl md:text-4xl text-white/20 transition-transform duration-500 ${isOpen ? "rotate-45 text-signal" : ""}`}>
                    +
                  </span>
                </div>
                <div className="font-mono text-xs md:text-sm text-muted mt-4 md:mt-0 max-w-md tracking-wider">
                  {item.subtitle}
                </div>
              </div>

              <div 
                className={`grid transition-all duration-700 ease-[cubic-bezier(0.87,0,0.13,1)] ${
                  isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden relative z-10">
                  {item.details}
                </div>
              </div>
            </div>
          );
        })}

      </div>
    </section>
  );
}
