"use client"

import { useEffect, useRef } from "react";

/** Image-backed flowing artwork; browser work stays inside the effect. */
export function FlowingArtwork({ src }: { src: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;
    const image = new Image();
    let frame = 0;
    let visible = true;
    let ready = false;
    let last = 0;
    let width = 1;
    let height = 1;
    let pointerX = 0;
    let pointerY = 0;
    let targetX = 0;
    let targetY = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const draw = (time: number) => {
      if (!ready) return;
      pointerX += (targetX - pointerX) * 0.025;
      pointerY += (targetY - pointerY) * 0.025;
      const t = reduced.matches ? 0 : time / 1000;
      const scale = Math.max(width / image.width, height / image.height) * 1.09;
      const dw = image.width * scale;
      const dh = image.height * scale;
      const driftX = reduced.matches ? 0 : Math.sin(t * 0.21) * 9 + pointerX * 12;
      const driftY = reduced.matches ? 0 : Math.cos(t * 0.17) * 7 + pointerY * 8;
      const left = (width - dw) / 2 + driftX;
      const top = (height - dh) / 2 + driftY;
      context.clearRect(0, 0, width, height);
      context.drawImage(image, left, top, dw, dh);
      if (reduced.matches) return;
      // A connected image mesh deforms the whole color field, rather than
      // sliding a rigid picture or slicing it into visible horizontal strips.
      const cols = 24;
      const rows = 14;
      const amplitude = Math.min(width, height) * 0.038;
      const point = (x: number, y: number) => {
        const u = x / cols;
        const v = y / rows;
        return {
          x: left + u * dw + Math.sin(v * 5.2 + u * 2.8 + t * .38) * amplitude + Math.sin(v * 3.1 - t * .23) * amplitude * .4,
          y: top + v * dh + Math.sin(u * 5.4 - v * 2.2 - t * .32) * amplitude * .75,
          sx: u * image.width,
          sy: v * image.height,
        };
      };
      type Point = ReturnType<typeof point>;
      const triangle = (a: Point, b: Point, c: Point) => {
        const det = a.sx * (b.sy - c.sy) + b.sx * (c.sy - a.sy) + c.sx * (a.sy - b.sy);
        if (!det) return;
        const coefficient = (av: number, bv: number, cv: number): [number, number, number] => [
          (av * (b.sy - c.sy) + bv * (c.sy - a.sy) + cv * (a.sy - b.sy)) / det,
          (av * (c.sx - b.sx) + bv * (a.sx - c.sx) + cv * (b.sx - a.sx)) / det,
          (av * (b.sx * c.sy - c.sx * b.sy) + bv * (c.sx * a.sy - a.sx * c.sy) + cv * (a.sx * b.sy - b.sx * a.sy)) / det,
        ];
        const [ax, bx, cx] = coefficient(a.x, b.x, c.x);
        const [ay, by, cy] = coefficient(a.y, b.y, c.y);
        const centerX = (a.x + b.x + c.x) / 3;
        const centerY = (a.y + b.y + c.y) / 3;
        context.save();
        context.beginPath();
        [a, b, c].forEach((p, i) => {
          const length = Math.hypot(p.x - centerX, p.y - centerY);
          const expand = 1 + .65 / Math.max(length, 1);
          const px = centerX + (p.x - centerX) * expand;
          const py = centerY + (p.y - centerY) * expand;
          if (i === 0) context.moveTo(px, py); else context.lineTo(px, py);
        });
        context.closePath();
        context.clip();
        context.transform(ax, ay, bx, by, cx, cy);
        context.drawImage(image, 0, 0);
        context.restore();
      };
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const a = point(x, y), b = point(x + 1, y), c = point(x + 1, y + 1), d = point(x, y + 1);
          triangle(a, b, d);
          triangle(b, c, d);
        }
      }
    };
    const resize = () => {
      const box = canvas.getBoundingClientRect();
      width = box.width;
      height = box.height;
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(performance.now());
    };
    const tick = (time: number) => {
      if (visible && !document.hidden && time - last > 32) {
        draw(time);
        last = time;
      }
      if (!reduced.matches) frame = requestAnimationFrame(tick);
    };
    const onMove = (event: PointerEvent) => {
      if (reduced.matches) return;
      const box = canvas.getBoundingClientRect();
      targetX = (event.clientX - box.left) / box.width - 0.5;
      targetY = (event.clientY - box.top) / box.height - 0.5;
    };
    const onLeave = () => { targetX = 0; targetY = 0; };
    const onPreference = () => {
      cancelAnimationFrame(frame);
      draw(performance.now());
      if (!reduced.matches) frame = requestAnimationFrame(tick);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    const visibility = new IntersectionObserver(([entry]) => { visible = entry?.isIntersecting ?? false; });
    visibility.observe(canvas);
    const parent = canvas.parentElement;
    parent?.addEventListener("pointermove", onMove);
    parent?.addEventListener("pointerleave", onLeave);
    reduced.addEventListener("change", onPreference);
    image.onload = () => {
      ready = true;
      resize();
      canvas.classList.add("artwork-ready");
      if (!reduced.matches) frame = requestAnimationFrame(tick);
    };
    image.src = src;
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      visibility.disconnect();
      parent?.removeEventListener("pointermove", onMove);
      parent?.removeEventListener("pointerleave", onLeave);
      reduced.removeEventListener("change", onPreference);
      image.onload = null;
    };
  }, [src]);
  return <canvas ref={canvasRef} className="flowing-artwork" aria-hidden="true" />;
}
