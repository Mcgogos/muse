"use client";

import React from "react";

interface HeaderProps {
  onMenuToggle: () => void;
}

export default function Header({ onMenuToggle }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-14 py-7 mix-blend-difference">
      <a href="#" className="font-display font-bold text-lg md:text-xl tracking-tighter relative z-10" data-cursor="MUSE">
        MUSE
      </a>
      
      {/* Ekranın tam ortasında yer alan metin */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden sm:block text-[10px] md:text-[11px] font-mono tracking-[0.3em] uppercase text-muted whitespace-nowrap pointer-events-none">
        Sanat · Medya · Teknoloji
      </div>

      <button 
        onClick={onMenuToggle}
        className="text-xs font-mono tracking-[0.2em] uppercase hover:text-signal transition-colors relative z-10" 
        data-cursor="MENÜ"
      >
        [ DİZİN + ]
      </button>
    </header>
  );
}
