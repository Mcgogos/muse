"use client";

import React, { useEffect, useRef, useState } from "react";

type LabPreset = "neural" | "vortex" | "waveform";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseVx: number;
  baseVy: number;
  color: string;
  angle?: number;
  distance?: number;
  speed?: number;
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
  const [preset, setPreset] = useState<LabPreset>("neural");
  const [nodeCount, setNodeCount] = useState(70);
  const [mode, setMode] = useState<"attract" | "repel">("attract");
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [lastAction, setLastAction] = useState<string>("Fareyi hareket ettirin veya tıklayın");

  // Web Audio Synth for Interactive Generative Tones
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playSynthTone = (freq: number) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.03, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.35);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } catch {
      // Ignore audio synthesis errors
    }
  };

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
      const numParticles = preset === "vortex" ? 110 : 70;
      const colors = [
        "rgba(255, 59, 0, 0.85)",   // Signal Orange
        "rgba(255, 255, 255, 0.7)", // Soft White
        "rgba(0, 220, 255, 0.75)",  // Neon Cyan
        "rgba(180, 70, 255, 0.75)"  // Magenta Pulse
      ];

      for (let i = 0; i < numParticles; i++) {
        const vx = (Math.random() - 0.5) * 1.4;
        const vy = (Math.random() - 0.5) * 1.4;
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx,
          vy,
          baseVx: vx,
          baseVy: vy,
          radius: Math.random() * 2.2 + 0.8,
          color: colors[Math.floor(Math.random() * colors.length)],
          angle: Math.random() * Math.PI * 2,
          distance: Math.random() * 150 + 30,
          speed: (Math.random() * 0.03 + 0.01) * (Math.random() > 0.5 ? 1 : -1),
        });
      }
      setNodeCount(particles.length);
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    let lastSynthTime = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;

      // Play generative pentatonic notes on mouse move
      const now = Date.now();
      if (soundEnabled && now - lastSynthTime > 90) {
        lastSynthTime = now;
        const pentatonic = [220, 261.63, 293.66, 329.63, 392.00, 440, 523.25, 587.33];
        const noteIndex = Math.floor((mouse.x / canvas.width) * pentatonic.length) % pentatonic.length;
        playSynthTone(pentatonic[noteIndex]);
      }
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
        maxRadius: 150,
        alpha: 1,
      });

      // Tıklanan noktada fırlayan partiküller
      for (let i = 0; i < 6; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 3.5 + 1.2;
        particles.push({
          x: clickX,
          y: clickY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          baseVx: (Math.random() - 0.5) * 1.2,
          baseVy: (Math.random() - 0.5) * 1.2,
          radius: Math.random() * 2.8 + 1,
          color: "rgba(255, 59, 0, 0.9)",
          angle,
          distance: 50,
          speed: 0.02,
        });
      }

      setNodeCount(particles.length);
      setLastAction("+6 Yeni Üretken Düğüm Oluşturuldu!");
      playSynthTone(659.25);
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);
    canvas.addEventListener("click", handleClick);

    let wavePhase = 0;

    const animateLab = () => {
      // Mod 2 Vortex trails
      if (preset === "vortex") {
        ctx.fillStyle = "rgba(6, 6, 7, 0.25)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }

      // 1. FARE HALESİ (GLOW AURA)
      if (mouse.active) {
        const gradient = ctx.createRadialGradient(
          mouse.x,
          mouse.y,
          0,
          mouse.x,
          mouse.y,
          180
        );
        gradient.addColorStop(0, "rgba(255, 59, 0, 0.22)");
        gradient.addColorStop(0.5, "rgba(0, 220, 255, 0.08)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 180, 0, Math.PI * 2);
        ctx.fill();
      }

      // 2. TIKLAMA ŞOK DALGALARI
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += 4;
        r.alpha -= 0.025;
        if (r.alpha <= 0 || r.radius >= r.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 59, 0, ${r.alpha})`;
        ctx.lineWidth = 1.8;
        ctx.stroke();
      }

      // 3. PRESET 3: WAVEFORM (ÜRETKEN SES DALGALARI)
      if (preset === "waveform") {
        wavePhase += 0.04;
        ctx.lineWidth = 2;
        for (let w = 0; w < 4; w++) {
          ctx.beginPath();
          const opacity = 0.3 + w * 0.15;
          ctx.strokeStyle = w % 2 === 0 ? `rgba(255, 59, 0, ${opacity})` : `rgba(0, 220, 255, ${opacity})`;
          for (let x = 0; x < canvas.width; x += 6) {
            const distToMouse = mouse.active ? Math.max(0, 1 - Math.abs(x - mouse.x) / 300) : 0;
            const amp = 30 + distToMouse * 70;
            const freq = 0.01 + w * 0.004;
            const y = canvas.height / 2 + Math.sin(x * freq + wavePhase + w) * amp;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
      }

      // 4. PARTİKÜL SİMÜLASYONU (NEURAL / VORTEX)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (preset === "vortex" && mouse.active) {
          // Vortex Spiral Hareketi
          p.angle = (p.angle || 0) + (p.speed || 0.02);
          const targetX = mouse.x + Math.cos(p.angle) * (p.distance || 80);
          const targetY = mouse.y + Math.sin(p.angle) * (p.distance || 80);
          p.x += (targetX - p.x) * 0.08;
          p.y += (targetY - p.y) * 0.08;
        } else {
          // Neural & Standart Hareket
          if (mouse.active) {
            const dx = mouse.x - p.x;
            const dy = mouse.y - p.y;
            const dist = Math.hypot(dx, dy);
            const maxDist = 180;

            if (dist < maxDist && dist > 0) {
              const force = (1 - dist / maxDist) * 0.15;
              const dir = mode === "attract" ? 1 : -1;
              p.vx += (dx / dist) * force * dir;
              p.vy += (dy / dist) * force * dir;
            }
          }

          p.vx = p.vx * 0.96 + p.baseVx * 0.04;
          p.vy = p.vy * 0.96 + p.baseVy * 0.04;

          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        }

        // Partikül Çizimi
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Bağlantı Çizgileri (Neural Mesh)
        if (preset === "neural") {
          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.hypot(dx, dy);

            if (dist < 115) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              const alpha = (1 - dist / 115) * 0.35;
              const isMouseNear = mouse.active && Math.hypot(mouse.x - p.x, mouse.y - p.y) < 150;
              ctx.strokeStyle = isMouseNear
                ? `rgba(255, 59, 0, ${alpha * 2.4})`
                : `rgba(255, 255, 255, ${alpha})`;
              ctx.lineWidth = isMouseNear ? 1.5 : 0.8;
              ctx.stroke();
            }
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
  }, [mode, preset, soundEnabled]);

  return (
    <section id="lab" className="py-32 px-6 md:px-14 border-t border-white/10 relative overflow-hidden">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-6">
        <div>
          <span className="font-mono text-xs text-muted tracking-[0.3em] uppercase">06 // DENEYSEL & YAPAY ZEKÂ</span>
          <h2 className="font-display text-3xl md:text-6xl font-bold tracking-tight mt-2">MUSE LABORATUVARI</h2>
        </div>

        {/* Preset & Control Bar */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center bg-void/80 p-1 rounded-full border border-white/10">
            <button
              onClick={() => setPreset("neural")}
              className={`px-3 py-1.5 rounded-full font-mono text-xs transition-all ${
                preset === "neural" ? "bg-signal text-white font-bold" : "text-muted hover:text-softwhite"
              }`}
            >
              🌐 NÖRAL AĞ
            </button>
            <button
              onClick={() => setPreset("vortex")}
              className={`px-3 py-1.5 rounded-full font-mono text-xs transition-all ${
                preset === "vortex" ? "bg-signal text-white font-bold" : "text-muted hover:text-softwhite"
              }`}
            >
              🌀 KUANTUM VORTEX
            </button>
            <button
              onClick={() => setPreset("waveform")}
              className={`px-3 py-1.5 rounded-full font-mono text-xs transition-all ${
                preset === "waveform" ? "bg-signal text-white font-bold" : "text-muted hover:text-softwhite"
              }`}
            >
              〰️ SES SPEKTRUMU
            </button>
          </div>

          <button
            onClick={() => setMode(mode === "attract" ? "repel" : "attract")}
            className="px-3 py-1.5 rounded-full border border-white/15 bg-void/60 text-softwhite font-mono text-xs hover:border-signal hover:text-signal transition-colors"
          >
            {mode === "attract" ? "🧲 ÇEKİM" : "💥 İTKİ"}
          </button>

          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`px-3 py-1.5 rounded-full border font-mono text-xs transition-colors ${
              soundEnabled
                ? "border-signal text-signal bg-signal/10 font-bold"
                : "border-white/15 bg-void/60 text-muted hover:text-softwhite"
            }`}
          >
            {soundEnabled ? "🔊 SES SENTEZİ: AÇIK" : "🔇 SES SENTEZİ: KAPALI"}
          </button>
        </div>
      </div>

      <div className="relative w-full h-[420px] rounded-2xl bg-charcoal border border-white/10 overflow-hidden cursor-crosshair group shadow-2xl">
        {/* Etkileşimli Canvas */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0"></canvas>
        
        {/* Cyberpunk AI HUD Katmanı */}
        <div className="relative z-10 p-6 flex flex-col justify-between h-full pointer-events-none select-none">
          <div className="flex justify-between items-start">
            <span className="font-mono text-xs tracking-widest uppercase text-signal font-bold bg-void/80 px-3 py-1.5 rounded-full border border-signal/30 backdrop-blur-sm animate-pulse">
              ● [ YATAY DOKU: {preset.toUpperCase()} ]
            </span>
            <div className="flex items-center gap-2 font-mono text-[11px] text-muted bg-void/80 px-3 py-1.5 rounded-full border border-white/10 backdrop-blur-sm">
              <span>CANLI DÜĞÜM: <strong className="text-softwhite">{nodeCount}</strong></span>
              <span>·</span>
              <span>SEED: <strong className="text-signal">0x9F4A</strong></span>
            </div>
          </div>

          <div className="text-center bg-void/70 backdrop-blur-md border border-white/10 p-4 rounded-xl max-w-lg mx-auto shadow-2xl">
            <p className="font-mono text-xs text-softwhite font-medium">
              {preset === "neural" && "Fare ile nöral ağı bükün. Tıklayarak yeni üretken düğümler filizlendirin."}
              {preset === "vortex" && "Fare etrafında dönen kuantum partikül vortexini kontrol edin."}
              {preset === "waveform" && "Üretken algoritmik ses frekansı dalgalarını fare ile biçimlendirin."}
            </p>
            <span className="font-mono text-[10px] text-signal/90 block mt-1">
              {lastAction}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
