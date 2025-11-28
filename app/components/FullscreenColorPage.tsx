"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

type FullscreenColorPageProps = {
  title: string;
  description?: string;
  baseColor: string; // e.g. "#ffffff"
  // Optional: limit hue slider to a specific band (supports wrap, e.g. 330–30 for reds)
  hueRange?: {
    min: number;
    max: number;
  };
  showHueControls?: boolean;
  showSwatches?: boolean;
  showHueSwatches?: boolean;
  showShadeSwatches?: boolean;
  showHexRgbInputs?: boolean;
  shadeStops?: number[]; // 0–100 lightness percentages for shade swatches
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

type HueRangeMeta = {
  min: number;
  max: number;
  span: number;
  wraps: boolean;
  locked: boolean;
};

function normalizeHue(value: number) {
  const mod = value % 360;
  return mod < 0 ? mod + 360 : mod;
}

function buildHueRangeMeta(range?: { min: number; max: number }): HueRangeMeta | null {
  if (!range) return null;
  const min = normalizeHue(range.min);
  const max = normalizeHue(range.max);
  const wraps = min > max;
  let span = wraps ? 360 - (min - max) : max - min;
  const locked = span === 0;
  if (locked) span = 0;
  return { min, max, span, wraps, locked };
}

function hueToSliderValue(hue: number, meta: HueRangeMeta | null) {
  if (!meta) return (normalizeHue(hue) / 360) * 100; // full wheel maps to 0–100 slider
  if (meta.locked || meta.span === 0) return 0;
  const h = normalizeHue(hue);
  const distance = (() => {
    if (!meta.wraps) {
      if (h < meta.min) return 0;
      if (h > meta.max) return meta.span;
      return h - meta.min;
    }
    const forward = h >= meta.min ? h - meta.min : 360 - meta.min + h;
    return Math.min(forward, meta.span);
  })();
  return (distance / meta.span) * 100;
}

function sliderValueToHue(sliderValue: number, meta: HueRangeMeta | null) {
  const pct = Math.min(100, Math.max(0, sliderValue)) / 100;
  if (!meta) return pct * 360;
  if (meta.locked || meta.span === 0) return meta.min;
  return normalizeHue(meta.min + pct * meta.span);
}

function hueGradient(meta: HueRangeMeta | null) {
  const stops = Array.from({ length: 7 }, (_, i) => {
    const pct = i / 6;
    const hue = meta
      ? normalizeHue(meta.min + (meta.span === 0 ? 0 : pct * meta.span))
      : pct * 360;
    const { r, g, b } = hslToRgb(hue, 0.75, 0.5);
    return `rgb(${r}, ${g}, ${b}) ${pct * 100}%`;
  }).join(", ");
  return `linear-gradient(90deg, ${stops})`;
}

function clampHueToRange(hue: number, meta: HueRangeMeta | null) {
  const h = normalizeHue(hue);
  if (!meta || meta.locked) return h;
  if (!meta.wraps) {
    if (h < meta.min) return meta.min;
    if (h > meta.max) return meta.max;
    return h;
  }
  const distance = h >= meta.min ? h - meta.min : 360 - meta.min + h;
  return distance > meta.span ? normalizeHue(meta.min + meta.span) : h;
}

export default function FullscreenColorPage({
  title,
  description,
  baseColor,
  hueRange,
  showHueControls = true,
  showSwatches = true,
  showHueSwatches = true,
  showShadeSwatches = true,
  showHexRgbInputs = true,
  shadeStops,
}: FullscreenColorPageProps) {
  // initialise from baseColor
  const hueMeta = buildHueRangeMeta(hueRange);
  const initialRgb = hexToRgb(baseColor) ?? { r: 255, g: 255, b: 255 };
  const initialHslRaw = rgbToHsl(initialRgb.r, initialRgb.g, initialRgb.b);
  const initialHsl = {
    ...initialHslRaw,
    h: clampHueToRange(initialHslRaw.h, hueMeta),
  };
  const baseS = initialHsl.s;

  const [hsl, setHsl] = useState(initialHsl);
  const { r, g, b } = hslToRgb(hsl.h, hsl.s, hsl.l);
  const hex = rgbToHex(r, g, b);
  const hue = Math.round(hsl.h);
  const brightness = Math.round(hsl.l * 100);
  const hueSliderValue = hueToSliderValue(hue, hueMeta);
  const swatches = useMemo(() => {
    const count =
      showHueSwatches && hueMeta && !hueMeta.locked && hueMeta.span > 0 ? 8 : 1; // if hue swatches hidden or locked, stick to one hue
    const spanMeta =
      hueMeta && hueMeta.span > 0
        ? hueMeta
        : {
            min: initialHsl.h,
            span: 0,
            wraps: false,
            locked: true,
            max: initialHsl.h,
          };
    return Array.from({ length: count }, (_, i) => {
      const pct = count === 1 ? 0.5 : i / (count - 1);
      const swatchHue = normalizeHue(spanMeta.min + pct * spanMeta.span);
      const { r, g, b } = hslToRgb(swatchHue, baseS, initialHsl.l);
      return { hue: swatchHue, hex: rgbToHex(r, g, b), l: initialHsl.l };
    });
  }, [baseS, hueMeta, initialHsl.h, initialHsl.l, showHueSwatches]);
  const shadeSwatches = useMemo(() => {
    const lightnessSteps =
      shadeStops?.length && shadeStops
        ? shadeStops.map((n) => Math.min(1, Math.max(0, n / 100)))
        : [0.2, 0.35, 0.5, 0.65, 0.8];
    const count =
      shadeStops?.length && shadeStops.length > 0
        ? shadeStops.length
        : showHueSwatches
        ? swatches.length
        : 6;
    const fallbackHue = swatches[0]?.hue ?? initialHsl.h;

    return Array.from({ length: count }, (_, idx) => {
      const rawL = lightnessSteps[idx % lightnessSteps.length];
      const l =
        shadeStops?.length && shadeStops
          ? rawL
          : Math.min(0.92, Math.max(0.08, rawL));
      const hueForSwatch =
        swatches[idx % swatches.length]?.hue ?? fallbackHue;
      const { r, g, b } = hslToRgb(hueForSwatch, baseS, l);
      return { hue: hueForSwatch, hex: rgbToHex(r, g, b), l };
    });
  }, [baseS, initialHsl.h, shadeStops, swatches]);

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
    const newHsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    setHsl({ ...newHsl, h: clampHueToRange(newHsl.h, hueMeta) });
  };

  const handleHueChange = (value: string) => {
    const n = Number(value);
    if (Number.isNaN(n)) return;
    const newHue = sliderValueToHue(n, hueMeta);
    setHsl((prev) => ({ ...prev, h: newHue }));
  };

  const handleSwatchSelect = (swatchHue: number, lightness: number) => {
    setHsl((prev) => ({
      ...prev,
      h: swatchHue,
      s: baseS, // reset saturation to the base colour's saturation
      l: lightness,
    }));
  };

  const handleShadeSelect = (swatchHue: number, lightness: number) => {
    setHsl((prev) => ({
      ...prev,
      h: swatchHue,
      s: baseS,
      l: lightness,
    }));
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

    const newHsl = rgbToHsl(rVal, gVal, bVal);
    setHsl({ ...newHsl, h: clampHueToRange(newHsl.h, hueMeta) });
  };

  return (
    <div className="flex min-h-screen flex-col bg-neutral-950 text-neutral-50">
      {/* Top bar */}
      <header className="flex items-center justify-between border-b border-neutral-800 px-4 py-3 text-sm">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="rounded-md border border-neutral-800 bg-neutral-900 px-2 py-1 text-xs font-medium text-neutral-200 transition hover:border-neutral-600 hover:bg-neutral-800"
          >
            ← Back
          </Link>
          <div className="flex flex-col gap-1">
            <h1 className="text-base font-semibold">{title}</h1>
            {description && (
              <p className="text-xs text-neutral-400">{description}</p>
            )}
          </div>
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
          className={`flex-1 cursor-pointer ${
            isFullscreen
              ? "rounded-none border-0 shadow-none"
              : "rounded-xl border border-neutral-800 shadow-inner"
          }`}
          style={{ backgroundColor: hex }}
          onClick={toggleFullscreen}
        />

        {/* Controls */}
        <section className="mt-4 flex w-full flex-col gap-4 text-sm lg:mt-0 lg:w-80">
          {/* Hue slider */}
          {showHueControls && (
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-medium">Colour</span>
                <span className="text-xs text-neutral-400">{hue}° hue</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={hueSliderValue}
                onChange={(e) => handleHueChange(e.target.value)}
                className="w-full"
                style={{
                  background: hueGradient(hueMeta),
                  accentColor: hex,
                }}
                disabled={hueMeta?.locked}
              />
            </div>
          )}

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
              style={{
                accentColor: hex,
                background: `linear-gradient(90deg, ${(() => {
                  const dark = hslToRgb(hsl.h, hsl.s, 0);
                  const mid = hslToRgb(hsl.h, hsl.s, 0.5);
                  const light = hslToRgb(hsl.h, hsl.s, 1);
                  return [
                    `rgb(${dark.r}, ${dark.g}, ${dark.b}) 0%`,
                    `rgb(${mid.r}, ${mid.g}, ${mid.b}) 50%`,
                    `rgb(${light.r}, ${light.g}, ${light.b}) 100%`,
                  ].join(", ");
                })()})`,
              }}
            />
          </div>

          {/* Quick pick swatches */}
          {showSwatches && (showHueSwatches || showShadeSwatches) && (
            <div className="rounded-xl border border-neutral-800 bg-neutral-900/60 p-4">
              {showHueSwatches && (
                <>
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-medium">Quick picks</span>
                    <span className="text-xs text-neutral-400">
                      In this colour family
                    </span>
                  </div>
              <div
                className="grid gap-2"
                style={{ gridTemplateColumns: "repeat(auto-fit, minmax(44px, 1fr))" }}
              >
                {swatches.map((swatch, idx) => (
                  <button
                    key={`${swatch.hex}-${idx}`}
                    type="button"
                    onClick={() => handleSwatchSelect(swatch.hue, swatch.l)}
                        className="h-9 rounded-md border border-neutral-700 transition hover:scale-[1.02] hover:border-neutral-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        style={{ backgroundColor: swatch.hex }}
                        aria-label={`Pick ${swatch.hex}`}
                      />
                    ))}
                  </div>
                </>
              )}

              {showShadeSwatches && (
                <>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs font-medium text-neutral-300">
                      Shade picks
                    </span>
                    <span className="text-[11px] text-neutral-500">
                      Light + dark variants
                    </span>
                  </div>
              <div
                className="mt-2 grid gap-2"
                style={{
                  gridTemplateColumns: `repeat(${Math.max(
                    1,
                    shadeSwatches.length || 1,
                  )}, minmax(0, 1fr))`,
                }}
              >
                {shadeSwatches.map((swatch, idx) => (
                  <button
                    key={`${swatch.hex}-shade-${idx}`}
                    type="button"
                    onClick={() => handleShadeSelect(swatch.hue, swatch.l)}
                        className="h-9 rounded-md border border-neutral-700 transition hover:scale-[1.02] hover:border-neutral-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
                        style={{ backgroundColor: swatch.hex }}
                        aria-label={`Pick ${swatch.hex} shade`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Hex + RGB inputs */}
          {showHexRgbInputs && (
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
                for fullscreen. HEX and RGB inputs stay in sync with the hue and
                light/dark sliders.
              </p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
