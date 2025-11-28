"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

type Rgb = { r: number; g: number; b: number };

export type ColorCycleCopy = {
  title: string;
  subtitle: string;
  colorsTitle: string;
  colorsHelper: string;
  colorLabelPrefix: string;
  frequencyTitle: string;
  frequencyHelper: string;
  instructions: string;
  backLabel?: string;
  shortcutHint?: string;
};

const DEFAULT_COLORS = ["#EF4444", "#22C55E", "#3B82F6"]; // red → green → blue

function hexToRgb(hex: string): Rgb {
  let cleaned = hex.trim();
  if (cleaned.startsWith("#")) cleaned = cleaned.slice(1);
  if (cleaned.length === 3) {
    cleaned = cleaned
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const num = parseInt(cleaned || "0", 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function lerpRgb(a: Rgb, b: Rgb, t: number): Rgb {
  return {
    r: Math.round(lerp(a.r, b.r, t)),
    g: Math.round(lerp(a.g, b.g, t)),
    b: Math.round(lerp(a.b, b.b, t)),
  };
}

function rgbToHex({ r, g, b }: Rgb) {
  const toHex = (n: number) => Math.min(255, Math.max(0, n)).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

type ColorCycleToolProps = {
  copy: ColorCycleCopy;
  initialColors?: string[];
  initialSecondsPerStep?: number;
  backHref?: string;
  relatedLinks?: { href: string; label: string }[];
  relatedHeading?: string;
};

export default function ColorCycleTool({
  copy,
  initialColors = DEFAULT_COLORS,
  initialSecondsPerStep = 2,
  backHref = "/",
  relatedLinks,
  relatedHeading,
}: ColorCycleToolProps) {
  const [colors, setColors] = useState<string[]>(initialColors);
  const [secondsPerStep, setSecondsPerStep] = useState(initialSecondsPerStep);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const colorRef = useRef<HTMLDivElement | null>(null);

  // animation state
  const stepIndex = useRef(0);
  const stepStart = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  const parsedColors = useMemo(() => colors.map((c) => hexToRgb(c)), [colors]);

  const [liveHex, setLiveHex] = useState(colors[0]);

  const advanceStep = () => {
    stepIndex.current = (stepIndex.current + 1) % parsedColors.length;
    stepStart.current = null;
  };

  useEffect(() => {
    const animate = (ts: number) => {
      if (parsedColors.length === 0) return;
      if (stepStart.current === null) stepStart.current = ts;
      const duration = secondsPerStep * 1000;
      const t = Math.min(1, (ts - stepStart.current) / duration);
      const from = parsedColors[stepIndex.current];
      const to = parsedColors[(stepIndex.current + 1) % parsedColors.length];
      const mixed = lerpRgb(from, to, t);
      setLiveHex(rgbToHex(mixed));
      if (t >= 1) {
        advanceStep();
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [parsedColors, secondsPerStep]);

  const handleColorChange = (idx: number, value: string) => {
    setColors((prev) => {
      const next = [...prev];
      next[idx] = value;
      return next;
    });
  };

  const toggleFullscreen = async () => {
    const el = colorRef.current;
    if (!el) return;
    try {
      if (!document.fullscreenElement) {
        await el.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (err) {
      console.error("Fullscreen error:", err);
    }
  };

  useEffect(() => {
    const onChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "f" || e.code === "Space") {
        e.preventDefault();
        toggleFullscreen();
      }
      if (e.key === "Escape" && document.fullscreenElement) {
        document.exitFullscreen();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-neutral-950 text-neutral-50">
      {/* Top bar */}
      <header className="flex items-center justify-between border-b border-neutral-800 px-4 py-3 text-sm">
        <div className="flex items-center gap-3">
          <Link
            href={backHref}
            className="rounded-md border border-neutral-800 bg-neutral-900 px-2 py-1 text-xs font-medium text-neutral-200 transition hover:border-neutral-600 hover:bg-neutral-800"
          >
            ← {copy.backLabel ?? "Back"}
          </Link>
          <div className="flex flex-col gap-1">
            <h1 className="text-base font-semibold">{copy.title}</h1>
            <p className="text-xs text-neutral-400">{copy.subtitle}</p>
          </div>
        </div>
        <div className="text-xs text-neutral-400 text-right">
          <div>
            <span className="font-semibold text-neutral-200">F</span> /{" "}
            <span className="font-semibold text-neutral-200">Space</span> –{" "}
            {isFullscreen ? "exit fullscreen" : "enter fullscreen"}
          </div>
          <div>
            <span className="font-semibold text-neutral-200">Esc</span> – exit
            fullscreen
          </div>
        </div>
      </header>

      <main className="flex flex-1 flex-col gap-4 p-4 lg:flex-row">
        <div
          ref={colorRef}
          className={`flex-1 cursor-pointer ${
            isFullscreen
              ? "rounded-none border-0 shadow-none"
              : "rounded-xl border border-neutral-800 shadow-inner"
          }`}
          style={{ backgroundColor: liveHex }}
          onClick={toggleFullscreen}
        />

        <section className="mt-4 flex w-full flex-col gap-4 text-sm lg:mt-0 lg:w-96">
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-medium">{copy.colorsTitle}</span>
              <span className="text-xs text-neutral-400">
                {copy.colorsHelper}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {colors.map((color, idx) => (
                <label key={idx} className="flex flex-col gap-2 text-xs font-medium text-neutral-300">
                  {copy.colorLabelPrefix} {idx + 1}
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => handleColorChange(idx, e.target.value)}
                    className="h-10 w-full cursor-pointer rounded border border-neutral-800 bg-neutral-950"
                  />
                  <input
                    type="text"
                    value={color}
                    onChange={(e) => handleColorChange(idx, e.target.value)}
                    className="rounded border border-neutral-700 bg-neutral-950 px-2 py-1 text-xs text-neutral-100"
                    spellCheck={false}
                  />
                </label>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-medium">{copy.frequencyTitle}</span>
              <span className="text-xs text-neutral-400">
                {secondsPerStep}s {copy.frequencyHelper}
              </span>
            </div>
            <input
              type="range"
              min={0.5}
              max={10}
              step={0.5}
              value={secondsPerStep}
              onChange={(e) => setSecondsPerStep(Number(e.target.value))}
              className="w-full"
              style={{
                accentColor: liveHex,
              }}
            />
          </div>

          <div className="rounded-xl border border-neutral-900 bg-neutral-900/80 p-4 text-xs text-neutral-300">
            <p>{copy.instructions}</p>
          </div>
        </section>
      </main>

      {relatedLinks && relatedLinks.length > 0 && (
        <section className="border-t border-neutral-900 px-4 py-6 text-sm">
          <div className="mx-auto max-w-5xl">
            <div className="mb-3 text-xs font-semibold uppercase tracking-wide text-neutral-400">
              {relatedHeading ?? "Other tools"}
            </div>
            <div className="flex flex-wrap gap-2">
              {relatedLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-full border border-neutral-800 px-3 py-1 text-xs text-neutral-100 transition hover:border-sky-500/70 hover:text-sky-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
