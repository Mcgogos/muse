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
    subtitle: "Müzik Klibi · Sinematik Kurgu · Renk Derecelendirme · 3D VFX & Dikey Sinema",
    hasWaveform: false,
    details: (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 pt-8 border-t border-white/10 font-sans">
        <div>
          <h4 className="font-mono text-signal text-xs tracking-widest mb-2 font-bold">01 / SİNEMATOGRAFİK MÜZİK KLİBİ</h4>
          <p className="text-xs md:text-sm text-muted">RED ve ARRI sinema kamera sistemleri, anamorfik lensler ve profesyonel ekiple hikaye anlatımlı üst düzey klip prodüksiyonu.</p>
        </div>
        <div>
          <h4 className="font-mono text-signal text-xs tracking-widest mb-2 font-bold">02 / AKUSTİK & CANLI PERFORMANS</h4>
          <p className="text-xs md:text-sm text-muted">Stüdyo ortamında canlı performans kayıtları, samimi akustik seanslar ve çoklu kamera açılarıyla sanatçının en saf halini yansıtan görseller.</p>
        </div>
        <div>
          <h4 className="font-mono text-signal text-xs tracking-widest mb-2 font-bold">03 / RENK DERECELENDİRME</h4>
          <p className="text-xs md:text-sm text-muted">DaVinci Resolve Studio ile projenin duygusuna özel renk paletleri, analog film greni (Film Grain) ve 2.39:1 sinematik doku.</p>
        </div>
        <div>
          <h4 className="font-mono text-signal text-xs tracking-widest mb-2 font-bold">04 / KURGU & POST-PRODÜKSİYON</h4>
          <p className="text-xs md:text-sm text-muted">Ritmik kurgu, tempo takibi, sinematik geçişler, ses-görüntü senkronizasyonu ve yüksek tempolu kurgu tasarımı.</p>
        </div>
        <div>
          <h4 className="font-mono text-signal text-xs tracking-widest mb-2 font-bold">05 / 3D VFX & YAPAY ZEKÂ SANATI</h4>
          <p className="text-xs md:text-sm text-muted">Unreal Engine, 3D animasyon ve üretken yapay zekâ (Generative Video) araçlarıyla şarkınıza gerçeküstü atmosferler ve efektler ekleme.</p>
        </div>
        <div>
          <h4 className="font-mono text-signal text-xs tracking-widest mb-2 font-bold">06 / DİKEY SİNEMA (9:16)</h4>
          <p className="text-xs md:text-sm text-muted">Reels, TikTok ve Shorts için ana klip ile eşzamanlı çekilen 9:16 dikey editoryal teaser&apos;lar ve yüksek kaliteli sosyal medya kesitleri.</p>
        </div>
      </div>
    )
  },
  {
    id: "seanslar",
    title: "SEANSLAR",
    subtitle: "20 Dakikalık Akustik Performans · Samimi Söyleşi · Analog Kaset Rezidansı",
    hasWaveform: false,
    details: (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 pt-8 border-t border-white/10 font-sans">
        <div>
          <h4 className="font-mono text-signal text-xs tracking-widest mb-2 font-bold">01 / LIVE AT MUSE STUDIO</h4>
          <p className="text-xs md:text-sm text-muted">20 dakikalık tek çekim, filtrelenmemiş canlı enstrüman ve vokal kayıtları. Sanatçının en ham ve samimi icrası.</p>
        </div>
        <div>
          <h4 className="font-mono text-signal text-xs tracking-widest mb-2 font-bold">02 / SES ÜZERİNE DİYALOGLAR</h4>
          <p className="text-xs md:text-sm text-muted">Müzikal üretim süreci, ilham kaynakları ve beste hikayeleri üzerine derinlemesine stüdyo içi söyleşiler.</p>
        </div>
        <div>
          <h4 className="font-mono text-signal text-xs tracking-widest mb-2 font-bold">03 / ANALOG KASET REZİDANSI</h4>
          <p className="text-xs md:text-sm text-muted">Dijital yazılımlar olmadan doğrudan Studer 2 inç analog makaralı kasete aktarılan sıcak ve organik akustik doku.</p>
        </div>
        <div>
          <h4 className="font-mono text-signal text-xs tracking-widest mb-2 font-bold">04 / AKUSTİK YENİDEN YORUM</h4>
          <p className="text-xs md:text-sm text-muted">Sanatçının popüler parçalarının stüdyomuzda tamamen akustik enstrümanlarla sıfırdan düzenlenmesi (Unplugged).</p>
        </div>
        <div>
          <h4 className="font-mono text-signal text-xs tracking-widest mb-2 font-bold">05 / MULTI-CAM SİNEMATİK ÇEKİM</h4>
          <p className="text-xs md:text-sm text-muted">4K sinema kameraları ve özel ışık atmosferi ile kesintisiz sahne ve yakın plan performans açıları.</p>
        </div>
        <div>
          <h4 className="font-mono text-signal text-xs tracking-widest mb-2 font-bold">06 / DİJİTAL & FİZİKSEL DAĞITIM</h4>
          <p className="text-xs md:text-sm text-muted">YouTube, Spotify ve Apple Music platformlarında tescilli MUSE Sessions formatıyla resmi yayın ve medya dağıtımı.</p>
        </div>
      </div>
    )
  },
  {
    id: "dijital",
    title: "DİJİTAL",
    subtitle: "Premium Web Deneyimleri · Kuruma Özel Yazılım Sistemleri · Mobil Uygulamalar",
    hasWaveform: false,
    details: (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 pt-8 border-t border-white/10 font-sans">
        <div>
          <h4 className="font-mono text-signal text-xs tracking-widest mb-2 font-bold">01 / PREMIUM WEB PLATFORMLARI</h4>
          <p className="text-xs md:text-sm text-muted">Next.js ve React altyapısıyla 3D etkileşimli, ultra hızlı ve markaya özel prestijli web deneyimleri.</p>
        </div>
        <div>
          <h4 className="font-mono text-signal text-xs tracking-widest mb-2 font-bold">02 / KURUMSAL YAZILIM SİSTEMLERİ</h4>
          <p className="text-xs md:text-sm text-muted">Özel yönetim panelleri (CMS), veri analitiği araçları ve ölçeklenebilir bulut yazılım mimarileri.</p>
        </div>
        <div>
          <h4 className="font-mono text-signal text-xs tracking-widest mb-2 font-bold">03 / MOBİL UYGULAMA GELİŞTİRME</h4>
          <p className="text-xs md:text-sm text-muted">iOS ve Android için akıcı kullanıcı arayüzüne (UI/UX) sahip yüksek performanslı mobil çözümler.</p>
        </div>
        <div>
          <h4 className="font-mono text-signal text-xs tracking-widest mb-2 font-bold">04 / 3D ETKİLEŞİM & WEBGL SANATI</h4>
          <p className="text-xs md:text-sm text-muted">Three.js ve WebGL teknolojileriyle tarayıcıda çalışan etkileşimli 3D ürün sergileme ve sanal alanlar.</p>
        </div>
        <div>
          <h4 className="font-mono text-signal text-xs tracking-widest mb-2 font-bold">05 / E-TİCARET & MİKRO SİTELER</h4>
          <p className="text-xs md:text-sm text-muted">Yüksek dönüşüm odaklı, güvenli ödeme entegrasyonlu özel e-ticaret platformları ve lansman siteleri.</p>
        </div>
        <div>
          <h4 className="font-mono text-signal text-xs tracking-widest mb-2 font-bold">06 / SİBER GÜVENLİK & SEO</h4>
          <p className="text-xs md:text-sm text-muted">Milisaniyelik sayfa açılış hızları, A+ SEO optimizasyonu ve uçtan uca korumalı siber güvenlik standartları.</p>
        </div>
      </div>
    )
  },
  {
    id: "lab",
    title: "LABORATUVAR",
    subtitle: "Yapay Zeka Projeleri · Üretken Sanat (Generative) · Yaratıcı Kodlama",
    hasWaveform: false,
    details: (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 pt-8 border-t border-white/10 font-sans">
        <div>
          <h4 className="font-mono text-signal text-xs tracking-widest mb-2 font-bold">01 / YAPAY ZEKÂ DESTEKLİ SES SENTEZİ</h4>
          <p className="text-xs md:text-sm text-muted">Üretken yapay zekâ modelleri (Neural Audio) ile sıfırdan algoritmik ses tasarımı ve dinamik stem ayrıştırma.</p>
        </div>
        <div>
          <h4 className="font-mono text-signal text-xs tracking-widest mb-2 font-bold">02 / ÜRETKEN GÖRSEL & VİDEO SANATI</h4>
          <p className="text-xs md:text-sm text-muted">Runway ve Stable Diffusion ile gerçeküstü konsept tasarımları, Yapay Zekâ klip üretimi ve 3D doku haritalama.</p>
        </div>
        <div>
          <h4 className="font-mono text-signal text-xs tracking-widest mb-2 font-bold">03 / YARATICI KODLAMA & CANVAS</h4>
          <p className="text-xs md:text-sm text-muted">Shader (GLSL), Three.js ve p5.js ile canlı müzikle eşzamanlı tepki veren interaktif üretken görsel sistemler.</p>
        </div>
        <div>
          <h4 className="font-mono text-signal text-xs tracking-widest mb-2 font-bold">04 / SPATIAL AUDIO & 3D BINAURAL</h4>
          <p className="text-xs md:text-sm text-muted">Dolby Atmos, 360 binaural ses tasarımı ve Apple Vision Pro / VR donanımları için uzamsal işitsel deneyimler.</p>
        </div>
        <div>
          <h4 className="font-mono text-signal text-xs tracking-widest mb-2 font-bold">05 / İNTERAKTİF SAHNE ENSTALASYONU</h4>
          <p className="text-xs md:text-sm text-muted">Konser ve sergiler için sensör odaklı (Kinect/MIDI) beden hareketleriyle yönlendirilen ses ve ışık gösterileri.</p>
        </div>
        <div>
          <h4 className="font-mono text-signal text-xs tracking-widest mb-2 font-bold">06 / DENEYSEL YAZILIM AR-GE</h4>
          <p className="text-xs md:text-sm text-muted">Sanatçı ve markalara özel yapay zekâ ses eklentileri (VST/AudioUnit) ve deneysel web-audio kütüphaneleri.</p>
        </div>
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
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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
  }, { scope: containerRef });

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section ref={containerRef} id="what-we-create" className="py-32 px-6 md:px-14 border-t border-white/10 relative">
      <div className="mb-16 font-mono text-xs text-muted tracking-[0.3em] uppercase">
        02 // NELER ÜRETİYORUZ
      </div>

      <div className="divide-y divide-white/10">
        
        {disciplinesData.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div 
              key={item.id}
              className="discipline-item-anim group py-12 relative transition-all duration-500 hover:px-4"
            >
              {item.hasWaveform && <WaveformBackground />}
              
              {/* Accordion Header Bar */}
              <div 
                onClick={() => toggleAccordion(index)}
                className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center cursor-pointer select-none"
                data-cursor={isOpen ? "KAPAT" : "KEŞFET"}
              >
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

              {/* Accordion Expanded Details */}
              <div 
                className={`grid transition-all duration-700 ease-[cubic-bezier(0.87,0,0.13,1)] ${
                  isOpen ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden relative z-10">
                  {item.details}

                  {/* Explicit Accordion Close Button */}
                  <div className="flex justify-end mt-6 pt-4 border-t border-white/10">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleAccordion(index);
                      }}
                      className="font-mono text-xs text-signal hover:text-white bg-signal/10 hover:bg-signal px-5 py-2 rounded-full border border-signal/30 transition-all font-bold cursor-pointer"
                      data-cursor="KAPAT"
                    >
                      [ BÖLÜMÜ KAPAT × ]
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

      </div>
    </section>
  );
}
