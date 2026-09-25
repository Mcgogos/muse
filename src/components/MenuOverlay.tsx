"use client";

import React from "react";

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MenuOverlay({ isOpen, onClose }: MenuOverlayProps) {
  return (
    <div 
      className={`fixed inset-0 bg-void/95 backdrop-blur-2xl z-40 flex flex-col justify-between p-8 md:p-20 transition-all duration-500 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="flex justify-between items-center border-b border-white/10 pb-6">
        <span className="font-mono text-xs text-muted tracking-widest">EVİ KEŞFET</span>
        <button 
          onClick={onClose}
          className="font-mono text-xs text-softwhite tracking-widest hover:text-signal"
        >
          [ KAPAT × ]
        </button>
      </div>
      
      <nav className="flex flex-col gap-2 my-auto">
        <a href="#what-we-create" onClick={onClose} className="font-display text-4xl md:text-7xl font-bold hover:italic hover:translate-x-4 transition-all duration-300">01 NELER ÜRETİYORUZ</a>
        <a href="#sound" onClick={onClose} className="font-display text-4xl md:text-7xl font-bold hover:italic hover:translate-x-4 transition-all duration-300">02 SES</a>
        <a href="#visual" onClick={onClose} className="font-display text-4xl md:text-7xl font-bold hover:italic hover:translate-x-4 transition-all duration-300">03 GÖRSEL</a>
        <a href="#sessions" onClick={onClose} className="font-display text-4xl md:text-7xl font-bold hover:italic hover:translate-x-4 transition-all duration-300">04 SEANSLAR</a>
        <a href="#digital" onClick={onClose} className="font-display text-4xl md:text-7xl font-bold hover:italic hover:translate-x-4 transition-all duration-300">05 DİJİTAL</a>
        <a href="#lab" onClick={onClose} className="font-display text-4xl md:text-7xl font-bold hover:italic hover:translate-x-4 transition-all duration-300">06 LABORATUVAR</a>
        <a href="#contact" onClick={onClose} className="font-display text-4xl md:text-7xl font-bold hover:italic hover:translate-x-4 transition-all duration-300">07 İLETİŞİM</a>
      </nav>
      
      <div className="flex justify-between text-xs font-mono text-muted">
        <span>İSTANBUL / ÜRETİM MERKEZİ</span>
        <span>© 2026 MUSE HOUSE</span>
      </div>
    </div>
  );
}
