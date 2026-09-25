"use client";

import React, { useState, useRef } from "react";

interface WhatsAppButtonProps {
  phoneNumber?: string; // Format: "905000000000"
  message?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
}

export default function WhatsAppButton({
  phoneNumber = "905000000000",
  message = "Merhaba, MUSE HOUSE hakkında bilgi almak ve projem hakkında görüşmek istiyorum.",
}: WhatsAppButtonProps) {
  const [isExploding, setIsExploding] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  const triggerExplosion = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isExploding) return;

    setIsExploding(true);

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        canvas.width = 240;
        canvas.height = 240;

        const particles: Particle[] = [];
        const colors = ["#FF3B00", "#FFFFFF", "rgba(255, 255, 255, 0.8)", "rgba(255, 59, 0, 0.6)"];
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;

        // Generate 28 exploding particles
        for (let i = 0; i < 28; i++) {
          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 6 + 2;
          particles.push({
            x: centerX,
            y: centerY,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed,
            size: Math.random() * 4.5 + 2,
            alpha: 1,
            color: colors[Math.floor(Math.random() * colors.length)],
          });
        }

        const animateBurst = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          let alive = false;

          for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            if (p.alpha > 0) {
              alive = true;
              p.x += p.vx;
              p.y += p.vy;
              p.alpha -= 0.035;
              p.size = Math.max(0, p.size - 0.06);

              ctx.beginPath();
              ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
              ctx.fillStyle = p.color;
              ctx.globalAlpha = Math.max(0, p.alpha);
              ctx.fill();
            }
          }

          if (alive) {
            requestAnimationFrame(animateBurst);
          }
        };

        animateBurst();
      }
    }

    // Delay redirection until particle burst completes (~450ms)
    setTimeout(() => {
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    }, 450);

    // Reset button state after 2.5 seconds
    setTimeout(() => {
      setIsExploding(false);
    }, 2500);
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex items-center justify-center">
      {/* Explosion Canvas Overlay */}
      <canvas
        ref={canvasRef}
        className={`pointer-events-none absolute -inset-20 z-10 ${
          isExploding ? "opacity-100" : "opacity-0"
        }`}
      />

      <a
        ref={buttonRef}
        href={whatsappUrl}
        onClick={triggerExplosion}
        className={`flex items-center gap-3 bg-void/80 backdrop-blur-md border border-white/15 px-4 py-2.5 rounded-full hover:border-signal transition-all duration-500 group shadow-2xl hover:bg-surface/80 ${
          isExploding
            ? "scale-0 opacity-0 rotate-12 duration-300 pointer-events-none"
            : "scale-100 opacity-100"
        }`}
        data-cursor="WHATSAPP"
      >
        {/* Site Palette Icon (Signal Orange & Softwhite) */}
        <div className="relative flex items-center justify-center w-7 h-7 rounded-full bg-softwhite/10 text-softwhite group-hover:bg-signal group-hover:text-white transition-all duration-300">
          <svg
            className="w-3.5 h-3.5 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-0.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>
        </div>

        <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-softwhite group-hover:text-signal transition-colors font-bold hidden sm:inline">
          WHATSAPP
        </span>

        {/* Signal Beacon */}
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-signal opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-signal"></span>
        </span>
      </a>
    </div>
  );
}
