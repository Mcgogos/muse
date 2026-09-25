"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import MenuOverlay from "@/components/MenuOverlay";
import CustomCursor from "@/components/CustomCursor";
import AudioPlayer from "@/components/AudioPlayer";
import Hero from "@/components/Hero";
import Disciplines from "@/components/Disciplines";
import SoundStudio from "@/components/SoundStudio";
import VisualDirection from "@/components/VisualDirection";
import Sessions from "@/components/Sessions";
import MuseLab from "@/components/MuseLab";
import Manifesto from "@/components/Manifesto";
import Contact from "@/components/Contact";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <CustomCursor />
      <AudioPlayer />
      <Header onMenuToggle={() => setIsMenuOpen(true)} />
      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      
      <main className="relative z-10">
        <Hero />
        <Disciplines />
        <SoundStudio />
        <VisualDirection />
        <Sessions />
        <MuseLab />
        <Manifesto />
        <Contact />
      </main>
    </>
  );
}
