"use client";

import React, { useState, useRef } from "react";

interface CardProps {
  aspectClass: string;
  badge: string;
  category: string;
  title: string;
  imgSrc: string;
}

const CinematicCard = ({ aspectClass, badge, category, title, imgSrc }: CardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="group relative rounded-xl overflow-hidden bg-charcoal border border-white/10 h-full" 
      data-cursor="OYNAT"
    >
      <div className={`${aspectClass} w-full relative overflow-hidden flex items-center justify-center p-8 h-full`}>
        {/* Background Image with slow zoom */}
        <img 
          src={imgSrc} 
          alt={title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[3s] ease-out group-hover:scale-[1.15] opacity-60 group-hover:opacity-100 grayscale-[30%] group-hover:grayscale-0"
        />
        
        {/* Interactive Lens Flare / Spotlight effect following mouse */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none mix-blend-screen"
          style={{
            background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(255, 59, 0, 0.45) 0%, transparent 55%)`
          }}
        />

        {/* Badge - appears on hover */}
        <span className="relative z-10 font-mono text-xs tracking-widest text-white border border-white/20 bg-black/60 px-5 py-3 rounded-full backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-4 group-hover:translate-y-0">
          {badge}
        </span>
      </div>
      
      {/* Title Area */}
      <div className="absolute bottom-0 inset-x-0 p-8 bg-gradient-to-t from-[#060607] via-[#060607]/80 to-transparent pointer-events-none z-10">
        <span className="font-mono text-[10px] text-signal uppercase tracking-widest font-bold">{category}</span>
        <h4 className="font-display text-xl md:text-2xl font-bold mt-2 text-softwhite">{title}</h4>
      </div>
    </div>
  );
};

export default function VisualDirection() {
  return (
    <section id="visual" className="py-32 px-6 md:px-14 border-t border-white/10">
      <div className="mb-16">
        <span className="font-mono text-xs text-muted tracking-[0.3em] uppercase">04 // GÖRSEL YÖNETİM</span>
        <h2 className="font-display text-3xl md:text-6xl font-bold tracking-tight mt-2">SİNEMATİK ANLATIM</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
        <div className="md:col-span-8">
          <CinematicCard 
            aspectClass="aspect-[16/9] md:aspect-[21/9]"
            badge="2.39:1 ANAMORPHIC MASTER"
            category="MÜZİK VİDEOSU"
            title="GECE YOLCULUĞU"
            imgSrc="https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?q=80&w=1600&auto=format&fit=crop"
          />
        </div>

        <div className="md:col-span-4">
          <CinematicCard 
            aspectClass="aspect-[9/16]"
            badge="9:16 DİKEY SİNEMA"
            category="EDİTORYAL KESİTLER"
            title="IŞIK & GÖLGE"
            imgSrc="https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=800&auto=format&fit=crop"
          />
        </div>
      </div>
    </section>
  );
}
