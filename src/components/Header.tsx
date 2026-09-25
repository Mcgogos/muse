"use client";

import React from "react";

interface HeaderProps {
  onMenuToggle: () => void;
}

export default function Header({ onMenuToggle }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-14 py-7 mix-blend-difference">
      <a href="#" className="font-display font-bold text-lg md:text-xl tracking-tighter" data-cursor="MUSE">
        MUSE
      </a>
      <button 
        onClick={onMenuToggle}
        className="text-xs font-mono tracking-[0.2em] uppercase hover:text-signal transition-colors" 
        data-cursor="MENÜ"
      >
        [ DİZİN + ]
      </button>
    </header>
  );
}
