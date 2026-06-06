'use client';

import { useEffect, useRef } from 'react';

type Star = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  size: number;
  hue: number;
};

const COLORS = [210, 50, 270]; // blue, yellow, violet

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const mouseRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);
  const lastSpawnRef = useRef(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(pointer: fine)').matches) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const spawnStar = (x: number, y: number) => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 0.6 + 0.2;
      starsRef.current.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 0.3,
        life: 1,
        maxLife: Math.random() * 0.5 + 0.5,
        size: Math.random() * 2.2 + 1.2,
        hue: COLORS[Math.floor(Math.random() * COLORS.length)]!,
      });

      if (starsRef.current.length > 48) {
        starsRef.current.splice(0, starsRef.current.length - 48);
      }
    };

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      const now = performance.now();
      if (now - lastSpawnRef.current > 24) {
        lastSpawnRef.current = now;
        spawnStar(e.clientX, e.clientY);
        if (Math.random() > 0.5) spawnStar(e.clientX + (Math.random() - 0.5) * 8, e.clientY + (Math.random() - 0.5) * 8);
      }
    };

    const drawStar = (cx: number, cy: number, size: number, alpha: number, hue: number) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = `hsl(${hue}, 90%, 82%)`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = `hsla(${hue}, 90%, 75%, ${alpha * 0.8})`;

      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        ctx.rotate(Math.PI / 2);
        ctx.moveTo(0, -size);
        ctx.lineTo(0, -size * 0.25);
      }
      ctx.lineWidth = size * 0.35;
      ctx.strokeStyle = ctx.fillStyle as string;
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 0, size * 0.25, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      starsRef.current = starsRef.current.filter((star) => {
        star.life -= 0.018;
        star.x += star.vx;
        star.y += star.vy;
        star.vy += 0.008;

        if (star.life <= 0) return false;

        const progress = star.life / star.maxLife;
        drawStar(star.x, star.y, star.size * progress, progress * 0.85, star.hue);
        return true;
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[35]"
    />
  );
}
