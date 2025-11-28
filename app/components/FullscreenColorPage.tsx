"use client";

import { useEffect, useRef, useState } from "react";

type FullscreenColorPageProps = {
  title: string;
  description?: string;
  baseColor: string; // e.g. "#ffffff"
};

/* ---------- Color helpers ---------- */

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  let cleaned = hex.trim();
  if (cleaned.startsWith("#")) cleaned = cleaned.slice(1);

  // support #fff shorthand
  if (cleaned.length === 3) {
    cleaned = cleaned
      .split("")
      .map((c) => c + c)
      .join("");
  }

  if (!/^[0-9a-fA-F]{6}$/.test(cleaned)) return null;

  const num = parseInt(cleaned, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) => {
    const clamped = Math.min(255, Math.max(0, Math.round(n)));
    return clamped.toString(16).padStart(2, "0");
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

function rgbToHsl(r: number, g: number, b: number) {
  let rN = r / 255;
  let gN = g / 255;
  let bN = b / 255;

  const max = Math.max(rN, gN, bN);
  const min = Math.min(rN, gN, bN);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case rN:
        h = (gN - bN) / d + (gN < bN ? 6 : 0);
        break;
      case gN:
        h = (bN - rN) / d + 2;
        break;
      case bN:
        h = (rN - gN) / d + 4;
        break;
    }
    h /= 6;
  }

  return { h: h * 360, s, l };
}

function hslToRgb(h: number, s: number, l: number) {
  const hN = h / 360;
  let r: number, g: number, b: number;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, hN + 1 / 3);
    g = hue2rgb(p, q, hN);
    b = hue2rgb(p, q, hN - 1 / 3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

/* ---------- Component ---------- */

export default function FullscreenColorPage({
  title,
  description,
  baseColor,
}: FullscreenColorPageProps) {
  // initialise from baseColor
  const initialRgb = hexToRgb(baseColor) ?? { r: 255, g: 255, b: 255 };
  const initialHsl = rgbToHsl(initialRgb.r, initialRgb.g, initialRgb.b);

  const [hsl, setHsl] = useState(initialHsl);
  const { r, g, b } = hslToRgb(hsl.h, hsl.s, hsl.l);
  const hex = rgbToHex(r, g, b);
  const brightness = Math.round(hsl.l * 100);

  const [hexInput, setHexInput] = useState(hex);
  const [rgbInput, setRgbInput] = useState({
    r: String(r),
    g: String(g),
    b: String(b),
  });

  // keep text inputs in sync when color changes from slider / other input
  useEffect(() => {
    setHexInput(hex);
    setRgbInput({ r: String(r), g: String(g), b: String(b) });
  }, [hex, r, g, b]);

  // fullscreen handling – IMPORTANT CHANGE: use the COLOR div, not the whole page
  const colorRef = useRef<HTMLDivElement | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

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

  /* ---------- Input handlers ---------- */

  const handleBrightnessChange = (value: string) => {
    const n = Number(value);
    if (Number.isNaN(n)) return;
    const clamped = Math.min(100, Math.max(0, n));
    setHsl((prev) => ({ ...prev, l: clamped / 100 }));
  };

  const handleHexChange = (value: string) => {
    setHexInput(value);
    let cleaned = value.trim();
    if (cleaned.startsWith("#")) cleaned = cleaned.slice(1);
    if (cleaned.length !== 6 && cleaned.length !== 3) return;

    const rgb = hexToRgb(value);
    if (!rgb) return;
    setHsl(rgbToHsl(rgb.r, rgb.g, rgb.b));
  };

  const handleRgbChange = (channel: "r" | "g" | "b", value: string) => {
    // allow empty while typing
    if (!/^\d{0,3}$/.test(value)) return;

    setRgbInput((prev) => ({ ...prev, [channel]: value }));

    const rVal =
      channel === "r" ? Number(value || 0) : Number(rgbInput.r || 0);
    const gVal =
      channel === "g" ? Number(value || 0) : Number(rgbInput.g || 0);
    const bVal =
      channel === "b" ? Number(value || 0) : Number(rgbInput.b || 0);

    if (rVal > 255 || gVal > 255 || bVal > 255) return;

    setHsl(rgbToHsl(rVal, gVal, bVal));
  };

  return (
    <div className="flex min-h-screen flex-col bg-neutral-950 text-neutral-50">
      {/* Top bar */}
      <header className="flex items-center justify-between border-b border-neutral-800 px-4 py-3 text-sm">
        <div className="flex flex-col gap-1">
          <h1 className="text-base font-semibold">{title}</h1>
          {description && (
            <p className="text-xs text-neutral-400">{description}</p>
          )}
        </div>
        <div className="text-xs text-neutral-400 text-right">
          <div>
            <span className="font-semibold text-neutral-200">F</span> or{" "}
            <span className="font-semibold text-neutral-200">Space</span> –{" "}
            {isFullscreen ? "exit fullscreen" : "enter fullscreen"}
          </div>
          <div>
            <span className="font-semibold text-neutral-200">Esc</span> – exit
            fullscreen
          </div>
        </div>
      </header>

      {/* Color area */}
      <main className="flex flex-1 flex-col gap-4 p-4 lg:flex-row">
        {/* This is the ONLY element that goes fullscreen */}
        <div
          ref={colorRef}
          className="flex-1 cursor-pointer rounded-xl border border-neutral-800 shadow-inner"
          style={{ backgroundColor: hex }}
          onClick={toggleFullscreen}
        />

        {/* Controls */}
        <section className="mt-4 flex w-full flex-col gap-4 text-sm lg:mt-0 lg:w-80">
          {/* Brightness slider */}
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-medium">Light / Dark</span>
              <span className="text-xs text-neutral-400">
                {brightness}% brightness
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={brightness}
              onChange={(e) => handleBrightnessChange(e.target.value)}
              className="w-full"
            />
          </div>

          {/* Hex + RGB inputs */}
          <div className="grid grid-cols-1 gap-4 rounded-xl border border-neutral-800 bg-neutral-900/60 p-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-neutral-300">
                HEX
              </label>
              <input
                className="rounded-md border border-neutral-700 bg-neutral-950 px-2 py-1 text-sm outline-none focus:border-sky-500"
                value={hexInput}
                onChange={(e) => handleHexChange(e.target.value)}
                spellCheck={false}
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              {(["r", "g", "b"] as const).map((channel) => (
                <div key={channel} className="flex flex-col gap-1">
                  <label className="text-xs font-medium uppercase text-neutral-300">
                    {channel}
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={255}
                    className="w-full rounded-md border border-neutral-700 bg-neutral-950 px-2 py-1 text-sm outline-none focus:border-sky-500"
                    value={rgbInput[channel]}
                    onChange={(e) =>
                      handleRgbChange(channel, e.target.value)
                    }
                  />
                </div>
              ))}
            </div>

            <p className="mt-1 text-xs text-neutral-500">
              Click the colour or press <strong>F</strong>/<strong>Space</strong>{" "}
              for fullscreen. HEX and RGB inputs stay in sync with the
              light/dark slider.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
