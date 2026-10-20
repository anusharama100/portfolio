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
    let disposed = false;
    let last: number | null = null;
    let elapsed = 0;
    let width = 0;
    let height = 0;
    let positionX = .5;
    let positionY = .5;
    let pointerX = 0;
    let pointerY = 0;
    let targetX = 0;
    let targetY = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const draw = () => {
      if (!ready) return;
      // Begin at the exact still-image crop, then ease into the deformation.
      // A local clock also prevents a new page or resumed tab starting mid-wave.
      const progress = reduced.matches ? 0 : Math.min(elapsed / 1800, 1);
      const motion = progress * progress * (3 - 2 * progress);
      const t = elapsed / 1000;
      const scale = Math.max(width / image.width, height / image.height) * (1 + .09 * motion);
      const dw = image.width * scale;
      const dh = image.height * scale;
      const driftX = (Math.sin(t * .21) * 9 + pointerX * 12) * motion;
      const driftY = (Math.cos(t * .17) * 7 + pointerY * 8) * motion;
      const left = (width - dw) * positionX + driftX;
      const top = (height - dh) * positionY + driftY;
      context.clearRect(0, 0, width, height);
      context.drawImage(image, left, top, dw, dh);
      if (!motion) return;
      // A connected image mesh deforms the whole color field, rather than
      // sliding a rigid picture or slicing it into visible horizontal strips.
      const cols = 24;
      const rows = 14;
      const amplitude = Math.min(width, height) * .038 * motion;
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
      // Adjacent triangles share vertices; calculate each point only once.
      const points = Array.from({ length: rows + 1 }, (_, y) =>
        Array.from({ length: cols + 1 }, (_, x) => point(x, y)));
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const a = points[y][x], b = points[y][x + 1], c = points[y + 1][x + 1], d = points[y + 1][x];
          triangle(a, b, d);
          triangle(b, c, d);
        }
      }
    };
    const resize = () => {
      if (!ready) return;
      const box = canvas.getBoundingClientRect();
      if (!box.width || !box.height) return;
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      const artwork = canvas.parentElement?.querySelector(".hero-art");
      const position = artwork ? getComputedStyle(artwork).objectPosition : "50% 50%";
      const [x = "50%", y = "50%"] = position.split(" ");
      const nextX = x.endsWith("%") ? parseFloat(x) / 100 : .5;
      const nextY = y.endsWith("%") ? parseFloat(y) / 100 : .5;
      const pixelWidth = Math.round(box.width * dpr);
      const pixelHeight = Math.round(box.height * dpr);
      if (width === box.width && height === box.height && canvas.width === pixelWidth && canvas.height === pixelHeight && positionX === nextX && positionY === nextY) return;
      width = box.width;
      height = box.height;
      positionX = nextX;
      positionY = nextY;
      // Assigning either dimension clears the bitmap, even if it is unchanged.
      if (canvas.width !== pixelWidth) canvas.width = pixelWidth;
      if (canvas.height !== pixelHeight) canvas.height = pixelHeight;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      last = null;
    };
    const schedule = () => {
      if (!frame && ready && visible && !document.hidden && !reduced.matches) frame = requestAnimationFrame(tick);
    };
    const tick = (time: number) => {
      frame = 0;
      if (!visible || document.hidden || reduced.matches) { last = null; return; }
      const delta = last === null ? 0 : Math.min(Math.max(time - last, 0), 50);
      last = time;
      elapsed += delta;
      const follow = 1 - Math.exp(-delta / 650);
      pointerX += (targetX - pointerX) * follow;
      pointerY += (targetY - pointerY) * follow;
      draw();
      schedule();
    };
    const onMove = (event: PointerEvent) => {
      if (reduced.matches) return;
      const box = canvas.getBoundingClientRect();
      targetX = (event.clientX - box.left) / box.width - 0.5;
      targetY = (event.clientY - box.top) / box.height - 0.5;
    };
    const onLeave = () => { targetX = 0; targetY = 0; };
    const onPreference = () => {
      stop();
      elapsed = 0;
      pointerX = pointerY = targetX = targetY = 0;
      draw();
      schedule();
    };
    const onVisibility = () => { if (document.hidden) stop(); else schedule(); };
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? false;
      if (visible) schedule(); else stop();
    });
    visibility.observe(canvas);
    const parent = canvas.parentElement;
    parent?.addEventListener("pointermove", onMove);
    parent?.addEventListener("pointerleave", onLeave);
    reduced.addEventListener("change", onPreference);
    document.addEventListener("visibilitychange", onVisibility);
    image.decoding = "async";
    image.onload = async () => {
      try { await image.decode?.(); } catch { return; }
      if (disposed) return;
      ready = true;
      resize();
      canvas.classList.add("artwork-ready");
      schedule();
    };
    image.src = src;
    return () => {
      disposed = true;
      stop();
      observer.disconnect();
      visibility.disconnect();
      parent?.removeEventListener("pointermove", onMove);
      parent?.removeEventListener("pointerleave", onLeave);
      reduced.removeEventListener("change", onPreference);
      document.removeEventListener("visibilitychange", onVisibility);
      image.onload = null;
      canvas.classList.remove("artwork-ready");
    };
  }, [src]);
  return <canvas ref={canvasRef} className="flowing-artwork" aria-hidden="true" />;
}
