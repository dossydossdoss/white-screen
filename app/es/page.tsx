import Link from "next/link";
import { baseToolData, toolOrder, translations } from "../../lib/i18n";
import type { Metadata } from "next";

const lang = "es";
const t = translations.es;

export const metadata: Metadata = {
  title: t.home.title,
  description: t.home.description,
  openGraph: {
    title: t.home.title,
    description: t.home.description,
    locale: lang,
  },
  twitter: {
    title: t.home.title,
    description: t.home.description,
  },
};

export default function HomeEs() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-50">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:py-16">
        <header className="mb-10 sm:mb-14">
          <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-slate-400">
            <span className="font-semibold text-slate-200">Languages:</span>
            <div className="flex flex-wrap gap-2">
              {["en", "es", "de", "fr", "ja"].map((lng) => {
                const href = lng === "en" ? "/" : `/${lng}`;
                const label =
                  lng === "en"
                    ? "English"
                    : lng === "es"
                    ? "Español"
                    : lng === "de"
                    ? "Deutsch"
                    : lng === "fr"
                    ? "Français"
                    : lng === "ja"
                    ? "日本語"
                    : lng;
                return (
                  <Link
                    key={lng}
                    href={href}
                    className="rounded-full border border-slate-800 px-2 py-1 transition hover:border-sky-500/70 hover:text-sky-200"
                  >
                    {label}
                  </Link>
                );
              })}
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight">
            {t.home.h1}
          </h1>
          <p className="mt-4 max-w-2xl text-sm sm:text-base text-slate-300">
            {t.home.heroCopy}
          </p>
        </header>

        <section id="colour-tools" className="mb-10 sm:mb-14">
          <div className="mb-4 flex items-center justify-between gap-2">
            <h2 className="text-lg sm:text-xl font-semibold text-slate-50">
              {t.home.toolSectionLabel}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              {t.home.toolSectionHelper}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
            {toolOrder.map((slug) => {
              const tool = t.tools[slug];
              const base = baseToolData[slug];
              const href = `/${lang}/${slug}`;
              const isCycle = slug === "cycle";
              return (
                <Link
                  key={slug}
                  href={href}
                  className="group flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/60 p-3 sm:p-4 hover:border-sky-500/70 hover:bg-slate-900 transition-colors"
                >
                  <div>
                    <div
                      className={`mb-3 aspect-video w-full overflow-hidden rounded-xl border border-slate-800 shadow-inner ${
                        isCycle ? "cycle-preview" : ""
                      }`}
                      style={
                        isCycle
                          ? undefined
                          : { backgroundColor: base.baseColor ?? "#0ea5e9" }
                      }
                    />
                    <h3 className="text-sm sm:text-base font-semibold text-slate-50">
                      {tool.cardTitle ?? tool.h1}
                    </h3>
                    <p className="mt-1 text-xs sm:text-sm text-slate-300">
                      {tool.cardDescription ?? tool.description}
                    </p>
                  </div>
                  <span className="mt-3 text-[11px] text-sky-400 group-hover:text-sky-300">
                    {t.ui.openTool(tool.cardTitle ?? tool.h1)}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
