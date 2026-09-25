"use client";

import React, { useEffect, useRef } from "react";

export default function MuseLab() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles: Particle[] = [];
    let animationFrameId: number;

    const resizeCanvas = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
      }
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      cvs: HTMLCanvasElement;

      constructor(c: HTMLCanvasElement) {
        this.cvs = c;
        this.x = Math.random() * c.width;
        this.y = Math.random() * c.height;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.radius = Math.random() * 1.5 + 0.5;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > this.cvs.width) this.vx *= -1;
        if (this.y < 0 || this.y > this.cvs.height) this.vy *= -1;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
        ctx.fill();
      }
    }

    // Initialize particles
    for (let i = 0; i < 45; i++) {
      particles.push(new Particle(canvas));
    }

    const animateLab = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < 90) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(255, 59, 0, ${0.15 * (1 - dist / 90)})`;
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(animateLab);
    };

    animateLab();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section id="lab" className="py-32 px-6 md:px-14 border-t border-white/10 relative overflow-hidden">
      <div className="mb-12">
        <span className="font-mono text-xs text-muted tracking-[0.3em] uppercase">06 // DENEYSEL & YAPAY ZEKÂ</span>
        <h2 className="font-display text-3xl md:text-6xl font-bold tracking-tight mt-2">MUSE LABORATUVARI</h2>
      </div>

      <div className="relative w-full h-[360px] rounded-2xl bg-charcoal border border-white/10 overflow-hidden flex items-center justify-center" data-cursor="ETKİLEŞİM">
        {/* Hafif Etkileşimli Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full"></canvas>
        <div className="relative z-10 text-center pointer-events-none">
          <span className="font-mono text-xs tracking-widest uppercase text-signal font-bold">[ ÜRETKEN DÜĞÜM AKTİF ]</span>
          <p className="font-mono text-xs text-muted mt-2">Fareyi hareket ettirerek partikül alanını bükün.</p>
        </div>
      </div>
    </section>
  );
}
