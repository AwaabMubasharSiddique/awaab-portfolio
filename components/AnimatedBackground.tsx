"use client";

import { useEffect, useRef } from "react";

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    // Grid configuration: large squares with subtle lines, slow diagonal drift
    const cellSize = 140; // big squares
    const lineColor = "rgba(255,255,255,0.06)";
    const boldLineColor = "rgba(255,255,255,0.10)";
    const backgroundColor = "rgba(11,11,18,1)"; // matches site bg
    const speed = 0.008; // pixels per ms
    const boldEvery = 4; // every 4th line slightly bolder

    const startTime = performance.now();

    const render = () => {
      const now = performance.now();
      const elapsed = now - startTime;

      // Compute slow diagonal offset
      const offset = (elapsed * speed) % cellSize;
      const offsetX = offset;
      const offsetY = offset * 0.85; // slight angle

      // clear and base
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);

      ctx.save();
      ctx.translate(offsetX, offsetY);

      // draw vertical lines
      for (let x = -cellSize * 2; x <= width + cellSize * 2; x += cellSize) {
        const index = Math.round((x + width) / cellSize);
        const isBold = index % boldEvery === 0;
        ctx.beginPath();
        ctx.moveTo(x, -cellSize * 2);
        ctx.lineTo(x, height + cellSize * 2);
        ctx.strokeStyle = isBold ? boldLineColor : lineColor;
        ctx.lineWidth = isBold ? 1.25 : 1;
        ctx.stroke();
      }

      // draw horizontal lines
      for (let y = -cellSize * 2; y <= height + cellSize * 2; y += cellSize) {
        const index = Math.round((y + height) / cellSize);
        const isBold = index % boldEvery === 0;
        ctx.beginPath();
        ctx.moveTo(-cellSize * 2, y);
        ctx.lineTo(width + cellSize * 2, y);
        ctx.strokeStyle = isBold ? boldLineColor : lineColor;
        ctx.lineWidth = isBold ? 1.25 : 1;
        ctx.stroke();
      }

      ctx.restore();

      // super subtle vignette
      const grd = ctx.createRadialGradient(
        width * 0.5,
        height * 0.5,
        Math.min(width, height) * 0.2,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.8
      );
      grd.addColorStop(0, "rgba(0,0,0,0)");
      grd.addColorStop(1, "rgba(0,0,0,0.25)");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, width, height);

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 pointer-events-none"
      aria-hidden
    />
  );
}



