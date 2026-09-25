"use client";

import React, { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hoverText, setHoverText] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let cursorX = mouseX;
    let cursorY = mouseY;
    let requestRef: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const updateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      setPosition({ x: cursorX, y: cursorY });
      requestRef = requestAnimationFrame(updateCursor);
    };

    window.addEventListener("mousemove", onMouseMove);
    requestRef = requestAnimationFrame(updateCursor);

    // Event delegation for data-cursor elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorEl = target.closest('[data-cursor]');
      if (cursorEl) {
        setIsHovered(true);
        setHoverText(cursorEl.getAttribute('data-cursor') || "");
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('[data-cursor]')) {
        setIsHovered(false);
        setHoverText("");
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(requestRef);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <div
      id="custom-cursor"
      style={{ left: `${position.x}px`, top: `${position.y}px` }}
      className={`hidden md:flex items-center justify-center rounded-full border bg-softwhite/10 backdrop-blur-[2px] transition-all duration-250 ${
        isHovered ? "w-20 h-20 bg-signal border-transparent" : "w-6 h-6 border-softwhite/40"
      }`}
    >
      <span
        className={`text-[9px] font-mono tracking-widest uppercase text-white font-bold transition-opacity ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        {hoverText}
      </span>
    </div>
  );
}
