"use client";

import React, { useEffect, useState, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
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
      
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
      }
      
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
      ref={cursorRef}
      id="custom-cursor"
      className={`hidden md:flex items-center justify-center rounded-full border bg-softwhite/10 backdrop-blur-[2px] transition-[width,height,background-color,border-color,opacity] duration-300 ${
        isHovered ? "w-20 h-20 bg-signal border-transparent" : "w-6 h-6 border-softwhite/40"
      }`}
      style={{ top: 0, left: 0, willChange: 'transform' }}
    >
      <span
        className={`text-[9px] font-mono tracking-widest uppercase text-white font-bold transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        {hoverText}
      </span>
    </div>
  );
}
