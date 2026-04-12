"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const S = 64;
const BASE_ALPHA = 0.13;
const WAVE_PEAK = 0.82;

interface Wave {
  x: number;
  y: number;
  start: number;
}

export const BackgroundRippleEffect = ({ className }: { className?: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wavesRef = useRef<Wave[]>([]);
  const hoverRef = useRef<{ x: number; y: number } | null>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0, COLS = 0, ROWS = 0;

    const resize = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      const dpr = window.devicePixelRatio || 1;
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.scale(dpr, dpr);
      COLS = Math.ceil(W / S);
      ROWS = Math.ceil(H / S);
    };

    const getGlow = (x: number, y: number, now: number): number => {
      let g = 0;
      for (const w of wavesRef.current) {
        const age = (now - w.start) / 1000;
        const dist = Math.hypot(w.x - x, w.y - y) / S;
        const front = age * 5;
        const diff = Math.abs(front - dist);
        if (diff < 0.9) {
          const intensity = Math.max(0, 1 - diff / 0.9);
          const fade = Math.max(0, 1 - age / 1.8);
          g = Math.max(g, intensity * fade);
        }
      }
      return g;
    };

    const drawLine = (
      x1: number, y1: number,
      x2: number, y2: number,
      glow: number
    ) => {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      if (glow > 0.003) {
        ctx.strokeStyle = `rgba(218,224,240,${(BASE_ALPHA + glow * WAVE_PEAK).toFixed(3)})`;
        ctx.lineWidth = 0.6 + glow * 1.6;
      } else {
        ctx.strokeStyle = `rgba(180,190,210,${BASE_ALPHA})`;
        ctx.lineWidth = 0.6;
      }
      ctx.stroke();
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const now = performance.now();

      // horizontal lines
      for (let r = 0; r <= ROWS; r++)
        for (let c = 0; c < COLS; c++)
          drawLine(c * S, r * S, (c + 1) * S, r * S, getGlow(c * S + S / 2, r * S, now));

      // vertical lines
      for (let c = 0; c <= COLS; c++)
        for (let r = 0; r < ROWS; r++)
          drawLine(c * S, r * S, c * S, (r + 1) * S, getGlow(c * S, r * S + S / 2, now));

      // hover — 4 borders of hovered cell only
      const h = hoverRef.current;
      if (h) {
        const hc = Math.floor(h.x / S);
        const hr = Math.floor(h.y / S);
        ctx.strokeStyle = "rgba(210,220,240,0.55)";
        ctx.lineWidth = 0.9;
        const sides: [number, number, number, number][] = [
          [hc * S, hr * S, (hc + 1) * S, hr * S],
          [hc * S, (hr + 1) * S, (hc + 1) * S, (hr + 1) * S],
          [hc * S, hr * S, hc * S, (hr + 1) * S],
          [(hc + 1) * S, hr * S, (hc + 1) * S, (hr + 1) * S],
        ];
        for (const [x1, y1, x2, y2] of sides) {
          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
      }

      wavesRef.current = wavesRef.current.filter(
        (w) => performance.now() - w.start < 2200
      );

      rafRef.current = requestAnimationFrame(draw);
    };

    // ✅ Listen on the parent container (whole page), not just canvas
    // so hover + click work even when cursor is over the card/content
    const parent = canvas.parentElement;

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      hoverRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const onMouseLeave = () => {
      hoverRef.current = null;
    };

    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      wavesRef.current.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        start: performance.now(),
      });
    };

    parent?.addEventListener("mousemove", onMouseMove);
    parent?.addEventListener("mouseleave", onMouseLeave);
    parent?.addEventListener("click", onClick);

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      ro.disconnect();
      cancelAnimationFrame(rafRef.current);
      parent?.removeEventListener("mousemove", onMouseMove);
      parent?.removeEventListener("mouseleave", onMouseLeave);
      parent?.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={cn("absolute inset-0 z-0", className)}
      style={{ width: "100%", height: "100%" }}
    />
  );
};