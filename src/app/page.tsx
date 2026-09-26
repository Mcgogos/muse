"use client";

import React from "react";
import CinematicIntro from "@/components/CinematicIntro";
import CustomCursor from "@/components/CustomCursor";
import AudioPlayer from "@/components/AudioPlayer";
import WhatsAppButton from "@/components/WhatsAppButton";
import Hero from "@/components/Hero";
import Disciplines from "@/components/Disciplines";
import SoundStudio from "@/components/SoundStudio";
import VisualDirection from "@/components/VisualDirection";
import Sessions from "@/components/Sessions";
import MuseLab from "@/components/MuseLab";
import Manifesto from "@/components/Manifesto";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <CinematicIntro />
      <CustomCursor />
      <AudioPlayer />
      <WhatsAppButton phoneNumber="905325579361" />
      
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
