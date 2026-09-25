"use client";

import React, { useState, useEffect, useRef } from 'react';

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Auto-play attempt on mount and first interaction
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // Optional: Lower the volume so it's pleasant background music
    audio.volume = 0.4;

    // Try to autoplay
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Autoplay blocked by browser. We wait for user interaction.
      });
    }

    const handleFirstInteraction = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {});
      }
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent trigger first interaction twice
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/bg-music.mp3" loop preload="auto" />
      
      <button 
        onClick={togglePlay}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-charcoal/50 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full hover:border-signal/50 transition-colors group"
        data-cursor={isPlaying ? "DURDUR" : "OYNAT"}
      >
        <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-softwhite group-hover:text-signal transition-colors">
          AUDIO {isPlaying ? 'ON' : 'OFF'}
        </span>
        
        {/* Ses dalgası animasyonu */}
        <div className="flex items-end gap-[2px] h-3">
          <div className={`w-[2px] bg-white transition-all duration-300 ${isPlaying ? 'h-full animate-[soundWave_1s_ease-in-out_infinite]' : 'h-[2px]'}`} style={{ animationDelay: '0s' }} />
          <div className={`w-[2px] bg-white transition-all duration-300 ${isPlaying ? 'h-full animate-[soundWave_1.2s_ease-in-out_infinite]' : 'h-[2px]'}`} style={{ animationDelay: '0.2s' }} />
          <div className={`w-[2px] bg-white transition-all duration-300 ${isPlaying ? 'h-full animate-[soundWave_0.8s_ease-in-out_infinite]' : 'h-[2px]'}`} style={{ animationDelay: '0.4s' }} />
          <div className={`w-[2px] bg-white transition-all duration-300 ${isPlaying ? 'h-full animate-[soundWave_1.4s_ease-in-out_infinite]' : 'h-[2px]'}`} style={{ animationDelay: '0.1s' }} />
        </div>
      </button>

      <style>{`
        @keyframes soundWave {
          0%, 100% { height: 2px; }
          50% { height: 12px; }
        }
      `}</style>
    </>
  );
}
