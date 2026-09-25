"use client";

import React, { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseVx: number;
  baseVy: number;
  color: string;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

export default function MuseLab() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [nodeCount, setNodeCount] = useState(60);
  const [mode, setMode] = useState<"attract" | "repel">("attract");
  const [lastAction, setLastAction] = useState<string>("Fareyi hareket ettirin veya tıklayın");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    const ripples: Ripple[] = [];
    let animationFrameId: number;
    const mouse = { x: -1000, y: -1000, active: false };

    const resizeCanvas = () => {
      if (canvas.parentElement) {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
        initParticles();
      }
    };

    const initParticles = () => {
      particles = [];
      const numParticles = 60;
      for (let i = 0; i < numParticles; i++) {
        const vx = (Math.random() - 0.5) * 1.2;
        const vy = (Math.random() - 0.5) * 1.2;
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx,
          vy,
          baseVx: vx,
          baseVy: vy,
          radius: Math.random() * 2 + 1,
          color: Math.random() > 0.3 ? "rgba(255, 255, 255, 0.6)" : "rgba(255, 59, 0, 0.8)",
        });
      }
      setNodeCount(particles.length);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    const handleClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Dalga efekti
      ripples.push({
        x: clickX,
        y: clickY,
        radius: 5,
        maxRadius: 130,
        alpha: 1,
      });

      // Tıklanan noktaya 5 yeni aktif üretken düğüm (partikül) fırlat
      for (let i = 0; i < 5; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3 + 1;
        particles.push({
          x: clickX,
          y: clickY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          baseVx: (Math.random() - 0.5) * 1.2,
          baseVy: (Math.random() - 0.5) * 1.2,
          radius: Math.random() * 2.5 + 1,
          color: "rgba(255, 59, 0, 0.9)",
        });
      }

      setNodeCount(particles.length);
      setLastAction("+5 Yeni Üretken Düğüm Oluşturuldu!");
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("click", handleClick);

    const animateLab = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Fare Halesi (Glow Attractor Aura)
      if (mouse.active) {
        const gradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          160
        );
        gradient.addColorStop(0, "rgba(255, 59, 0, 0.18)");
        gradient.addColorStop(1, "rgba(255, 59, 0, 0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 160, 0, Math.PI * 2);
        ctx.fill();
      }

      // Tıklama Şok Dalgaları
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += 3.5;
        r.alpha -= 0.025;
        if (r.alpha <= 0 || r.radius >= r.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 59, 0, ${r.alpha})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();
      }

      // Partikülleri Güncelle ve Çiz
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Fare Etkileşimi (Çekim / İtki Kuvveti)
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.hypot(dx, dy);
          const maxDist = 170;

          if (dist < maxDist && dist > 0) {
            const force = (1 - dist / maxDist) * 0.12;
            const dir = mode === "attract" ? 1 : -1;
            p.vx += (dx / dist) * force * dir;
            p.vy += (dy / dist) * force * dir;
          }
        }

        // Hız Sönümleme (Yavaşça orijinal hıza dönme)
        p.vx = p.vx * 0.96 + p.baseVx * 0.04;
        p.vy = p.vy * 0.96 + p.baseVy * 0.04;

        p.x += p.vx;
        p.y += p.vy;

        // Duvar Çarpmaları
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Partikül Çizimi
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Bağlantı Çizgileri (Neural Mesh)
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            const alpha = (1 - dist / 110) * 0.3;
            const isMouseNear = mouse.active && Math.hypot(mouse.x - p.x, mouse.y - p.y) < 140;
            ctx.strokeStyle = isMouseNear
              ? `rgba(255, 59, 0, ${alpha * 2.2})`
              : `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = isMouseNear ? 1.4 : 0.8;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animateLab);
    };

    animateLab();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      canvas.removeEventListener("click", handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, [mode]);

  return (
    <section id="lab" className="py-32 px-6 md:px-14 border-t border-white/10 relative overflow-hidden">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12">
        <div>
          <span className="font-mono text-xs text-muted tracking-[0.3em] uppercase">06 // DENEYSEL & YAPAY ZEKÂ</span>
          <h2 className="font-display text-3xl md:text-6xl font-bold tracking-tight mt-2">MUSE LABORATUVARI</h2>
        </div>
        <div className="flex items-center gap-3 mt-4 md:mt-0">
          <button
            onClick={() => setMode(mode === "attract" ? "repel" : "attract")}
            className="px-4 py-2 rounded-full border border-white/15 bg-void/60 text-softwhite font-mono text-xs hover:border-signal hover:text-signal transition-colors"
          >
            MOD: {mode === "attract" ? "ÇEKİM [MAGNETIC]" : "İTKİ [REPULSIVE]"}
          </button>
        </div>
      </div>

      <div className="relative w-full h-[400px] rounded-2xl bg-charcoal border border-white/10 overflow-hidden cursor-crosshair group">
        {/* Etkileşimli Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0"></canvas>
        
        {/* Bilgi Katmanı */}
        <div className="relative z-10 p-6 flex flex-col justify-between h-full pointer-events-none select-none">
          <div className="flex justify-between items-start">
            <span className="font-mono text-xs tracking-widest uppercase text-signal font-bold bg-void/80 px-3 py-1.5 rounded-full border border-signal/30 backdrop-blur-sm animate-pulse">
              ● [ ÜRETKEN DÜĞÜM AKTİF ]
            </span>
            <div className="font-mono text-[11px] text-muted bg-void/80 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-sm">
              CANLI DÜĞÜM: <span className="text-softwhite font-bold">{nodeCount}</span>
            </div>
          </div>

          <div className="text-center bg-void/60 backdrop-blur-md border border-white/10 p-4 rounded-xl max-w-md mx-auto">
            <p className="font-mono text-xs text-softwhite font-medium">
              Fareyi hareket ettirerek partikül alanını bükün. Tıklayarak yeni düğümler oluşturun.
            </p>
            <span className="font-mono text-[10px] text-signal/80 block mt-1">
              {lastAction}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

