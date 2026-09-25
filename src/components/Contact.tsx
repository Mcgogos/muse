"use client";

import React, { useState } from "react";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");

    const formData = new FormData(e.currentTarget);
    
    // Web3Forms Access Key
    formData.append("access_key", "c79013c5-7340-4011-962d-29581082e87d"); 

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: json
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        (e.target as HTMLFormElement).reset(); // Formu temizle
      } else {
        console.error("Web3Forms Error:", data);
        setStatus("error");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-32 px-6 md:px-14 border-t border-white/10 bg-[#060607]">
      <div className="max-w-2xl">
        <span className="font-mono text-xs text-signal tracking-[0.3em] uppercase font-bold">İŞ BİRLİĞİ BAŞLAT</span>
        <h2 className="font-display text-4xl md:text-7xl font-bold tracking-tight mt-2 mb-12">BİR FİKRİN Mİ VAR? BİRLİKTE ÜRETELİM.</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8 font-mono text-xs">
          <div className="border-b border-white/20 pb-2">
            <input 
              type="text" 
              name="name" 
              required 
              placeholder="İSİM / STÜDYO" 
              className="w-full bg-transparent text-softwhite outline-none placeholder:text-muted focus:border-signal" 
            />
          </div>
          <div className="border-b border-white/20 pb-2">
            <input 
              type="email" 
              name="email" 
              required 
              placeholder="E-POSTA ADRESİ" 
              className="w-full bg-transparent text-softwhite outline-none placeholder:text-muted focus:border-signal" 
            />
          </div>
          <div className="border-b border-white/20 pb-2">
            <input 
              type="text" 
              name="project_type" 
              placeholder="PROJE TİPİ [SES / GÖRSEL / DİJİTAL / HİBRİT]" 
              className="w-full bg-transparent text-softwhite outline-none placeholder:text-muted focus:border-signal" 
            />
          </div>
          <div className="border-b border-white/20 pb-2">
            <textarea 
              name="message" 
              required 
              placeholder="MESAJ / DETAYLAR" 
              rows={3} 
              className="w-full bg-transparent text-softwhite outline-none placeholder:text-muted resize-none focus:border-signal"
            ></textarea>
          </div>

          <button 
            type="submit" 
            disabled={status === "loading" || status === "success"}
            className="self-start mt-4 px-8 py-4 bg-softwhite text-void font-bold tracking-widest uppercase hover:bg-signal hover:text-white transition-colors duration-300 rounded-full disabled:opacity-50 disabled:cursor-not-allowed" 
            data-cursor="GÖNDER"
          >
            {status === "idle" && "MESAJI GÖNDER ↗"}
            {status === "loading" && "GÖNDERİLİYOR..."}
            {status === "success" && "MESAJ İLETİLDİ ✓"}
            {status === "error" && "HATA OLUŞTU! TEKRAR DENE"}
          </button>
          
          {status === "success" && (
            <p className="text-signal text-xs mt-2">Mesajınızı aldık. En kısa sürede sizinle iletişime geçeceğiz.</p>
          )}
        </form>
      </div>

      <div className="mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center font-mono text-xs text-muted gap-4">
        <span>MUSE CREATIVE HOUSE</span>
        <div className="flex gap-6">
          <a href="#" className="hover:text-softwhite transition-colors">YOUTUBE</a>
          <a href="#" className="hover:text-softwhite transition-colors">INSTAGRAM</a>
          <a href="#" className="hover:text-softwhite transition-colors">SPOTIFY</a>
          <a href="#" className="hover:text-softwhite transition-colors">GITHUB</a>
        </div>
      </div>
    </section>
  );
}
