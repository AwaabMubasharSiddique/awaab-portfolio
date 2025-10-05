"use client";

import { useEffect, useRef } from "react";

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastFrameTimeRef = useRef<number>(0);
  const isPausedRef = useRef<boolean>(false);
  const resizeTimeoutRef = useRef<number | null>(null);
  const gradientRef = useRef<CanvasGradient | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    // Detect device memory to scale workload on low-memory devices
    const deviceMemoryGb = (navigator as unknown as { deviceMemory?: number }).deviceMemory || 4;
    const isLowMemoryDevice = deviceMemoryGb <= 2;
    // Cap device pixel ratio to reduce memory/CPU usage (more aggressive on low-memory devices)
    const devicePixelRatioCapped = isLowMemoryDevice
      ? 1
      : Math.min(window.devicePixelRatio || 1, 1.3);
    let width = window.innerWidth;
    let height = window.innerHeight;

    const applyCanvasSize = () => {
      const displayWidth = Math.max(1, Math.floor(width));
      const displayHeight = Math.max(1, Math.floor(height));
      canvas.width = Math.floor(displayWidth * devicePixelRatioCapped);
      canvas.height = Math.floor(displayHeight * devicePixelRatioCapped);
      canvas.style.width = `${displayWidth}px`;
      canvas.style.height = `${displayHeight}px`;
      ctx.setTransform(devicePixelRatioCapped, 0, 0, devicePixelRatioCapped, 0, 0);
      // Recreate gradient when canvas size changes
      gradientRef.current = createVignetteGradient(ctx, displayWidth, displayHeight);
    };
    applyCanvasSize();

    const onResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      if (resizeTimeoutRef.current) window.clearTimeout(resizeTimeoutRef.current);
      resizeTimeoutRef.current = window.setTimeout(() => {
        applyCanvasSize();
      }, 100);
    };
    window.addEventListener("resize", onResize, { passive: true });

    // Grid configuration: large squares with subtle lines, slow diagonal drift
    const cellSize = 140; // big squares
    const lineColor = "rgba(255,255,255,0.06)";
    const boldLineColor = "rgba(255,255,255,0.10)";
    const backgroundColor = "rgba(11,11,18,1)"; // matches site bg
    const speed = 0.008; // pixels per ms
    const boldEvery = 4; // every 4th line slightly bolder

    const startTime = performance.now();
    const targetFrameDurationMs = 1000 / (isLowMemoryDevice ? 20 : 30); // lower FPS on low-memory devices

    function createVignetteGradient(
      context: CanvasRenderingContext2D,
      logicalWidth: number,
      logicalHeight: number
    ) {
      const grd = context.createRadialGradient(
        logicalWidth * 0.5,
        logicalHeight * 0.5,
        Math.min(logicalWidth, logicalHeight) * 0.2,
        logicalWidth * 0.5,
        logicalHeight * 0.5,
        Math.max(logicalWidth, logicalHeight) * 0.8
      );
      grd.addColorStop(0, "rgba(0,0,0,0)");
      grd.addColorStop(1, "rgba(0,0,0,0.25)");
      return grd;
    }

    const render = () => {
      if (isPausedRef.current) return; // don't schedule new frames while paused

      const now = performance.now();
      const sinceLast = now - lastFrameTimeRef.current;
      if (sinceLast < targetFrameDurationMs) {
        rafRef.current = requestAnimationFrame(render);
        return;
      }
      lastFrameTimeRef.current = now;
      const elapsed = now - startTime;

      // Compute slow diagonal offset
      const offset = (elapsed * speed) % cellSize;
      const offsetX = offset;
      const offsetY = offset * 0.85; // slight angle

      // clear and base
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

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

      // super subtle vignette (reuse gradient)
      if (!gradientRef.current) {
        gradientRef.current = createVignetteGradient(ctx, width, height);
      }
      ctx.fillStyle = gradientRef.current;
      ctx.fillRect(0, 0, width, height);

      rafRef.current = requestAnimationFrame(render);
    };

    const onVisibility = () => {
      const hidden = document.hidden;
      if (hidden) {
        isPausedRef.current = true;
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      } else {
        isPausedRef.current = false;
        lastFrameTimeRef.current = 0;
        rafRef.current = requestAnimationFrame(render);
      }
    };
    document.addEventListener("visibilitychange", onVisibility, { passive: true });

    isPausedRef.current = false;
    lastFrameTimeRef.current = 0;
    rafRef.current = requestAnimationFrame(render);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("resize", onResize);
      if (resizeTimeoutRef.current) window.clearTimeout(resizeTimeoutRef.current);
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



