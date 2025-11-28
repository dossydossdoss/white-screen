// app/page.tsx
import Link from "next/link";

type ColorTool = {
  name: string;
  slug: string;
  description: string;
  baseColor: string; // HEX used both here and on the sub-page
};

type UtilityTool = {
  name: string;
  slug: string;
  description: string;
};

const colorTools: ColorTool[] = [
  {
    name: "White Screen",
    slug: "white",
    description: "Pure white full screen for lighting, cleaning, and stuck pixels.",
    baseColor: "#FFFFFF", // white
  },
  {
    name: "Black Screen",
    slug: "black",
    description: "Pure black screen for contrast, dead pixel checks, or night use.",
    baseColor: "#000000", // black
  },
  {
    name: "Red Screen",
    slug: "red",
    description: "Solid red screen for pixel testing and ambient lighting.",
    baseColor: "#EF4444", // Tailwind red-500
  },
  {
    name: "Green Screen",
    slug: "green",
    description: "Solid green screen for chroma key or pixel testing.",
    baseColor: "#22C55E", // Tailwind green-500
  },
  {
    name: "Blue Screen",
    slug: "blue",
    description: "Solid blue screen for focus, ambiance, or pixel tests.",
    baseColor: "#3B82F6", // Tailwind blue-500
  },
  {
    name: "Yellow Screen",
    slug: "yellow",
    description: "Soft yellow screen for warm reading or ambient light.",
    baseColor: "#EAB308", // Tailwind yellow-500
  },
  {
    name: "Pink Screen",
    slug: "pink",
    description: "Vibrant pink screen for cozy lighting and fun backgrounds.",
    baseColor: "#EC4899", // Tailwind pink-500
  },
  {
    name: "Purple Screen",
    slug: "purple",
    description: "Rich purple screen for relaxing, moody backdrops.",
    baseColor: "#A855F7", // Tailwind purple-500
  },
  {
    name: "Orange Screen",
    slug: "orange",
    description: "Warm orange screen for sunset-style ambient light.",
    baseColor: "#F97316", // Tailwind orange-500
  },
  {
    name: "Gray Screen",
    slug: "gray",
    description: "Neutral gray screen for calibration and eye comfort.",
    baseColor: "#6B7280", // Tailwind gray-500
  },
];

const utilityTools: UtilityTool[] = [
  {
    name: "Zoom Lighting",
    slug: "zoom-lighting",
    description: "Adjustable soft light screen for video calls and streaming.",
  },
  {
    name: "Tip Screen",
    slug: "tip-screen",
    description: "Fake POS tipping screen for pranks, skits, or demos.",
  },
  {
    name: "Signature Screen",
    slug: "signature-screen",
    description: "Full-screen signature pad style screen for videos or jokes.",
  },
  {
    name: "DVD Screensaver",
    slug: "dvd-screen",
    description: "Classic bouncing DVD logo recreating the nostalgic screensaver.",
  },
  {
    name: "Broken Screen",
    slug: "broken-screen",
    description: "Hyper realistic cracked-screen effect for harmless pranks.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:py-16">
        {/* Hero */}
        <header className="mb-10 sm:mb-14">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
            Simple full-screen colour tools for{" "}
            <span className="text-sky-400">lighting, testing, and focus</span>
          </h1>
          <p className="mt-4 max-w-2xl text-sm sm:text-base text-slate-300">
            Open a pure colour screen in one click. Use it as a softbox, pixel
            tester, background, or prank tool. No login, no clutter—just clean
            full-screen colour.
          </p>
        </header>



        {/* Colour screens */}
        <section id="colour-tools" className="mb-10 sm:mb-14">
          <div className="mb-4 flex items-center justify-between gap-2">
            <h2 className="text-lg sm:text-xl font-semibold text-slate-50">
              Colour Screen Tools
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Click any colour to open its full-screen tool.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {colorTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/${tool.slug}`}
                className="group flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-3 sm:p-4 hover:border-sky-500/70 hover:bg-slate-900 transition-colors"
              >
                <div>
                  <div
                    className="mb-3 aspect-video w-full overflow-hidden rounded-xl border border-slate-800 shadow-inner"
                    style={{ backgroundColor: tool.baseColor }}
                  />
                  <h3 className="text-sm sm:text-base font-semibold text-slate-50">
                    {tool.name}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-slate-300">
                    {tool.description}
                  </p>
                </div>
                <span className="mt-3 text-[11px] text-sky-400 group-hover:text-sky-300">
                  Open {tool.name.toLowerCase()} →
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Utility / fun tools */}
        <section className="mb-10 sm:mb-16">
          <div className="mb-4 flex items-center justify-between gap-2">
            <h2 className="text-lg sm:text-xl font-semibold text-slate-50">
              Extra Tools
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Small, single-purpose tools built on top of the colour screens.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {utilityTools.map((tool) => (
              <Link
                key={tool.slug}
                href={`/${tool.slug}`}
                className="group flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-3 sm:p-4 hover:border-sky-500/70 hover:bg-slate-900 transition-colors"
              >
                <div>
                  <h3 className="text-sm sm:text-base font-semibold text-slate-50">
                    {tool.name}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm text-slate-300">
                    {tool.description}
                  </p>
                </div>
                <span className="mt-3 text-[11px] text-sky-400 group-hover:text-sky-300">
                  Open {tool.name.toLowerCase()} →
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-900 pt-6 text-xs sm:text-sm text-slate-500 flex flex-wrap items-center justify-between gap-3">
          <span>© {new Date().getFullYear()} White Screen Tools.</span>
          <div className="flex flex-wrap gap-4">
            <Link href="/about" className="hover:text-slate-300">
              About
            </Link>
            <Link href="/contact" className="hover:text-slate-300">
              Contact
            </Link>
            <Link href="/privacy" className="hover:text-slate-300">
              Privacy
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
