import { notFound } from "next/navigation";
import type { Metadata } from "next";
import FullscreenColorPage from "../../components/FullscreenColorPage";
import ColorCycleTool from "../../components/ColorCycleTool";
import {
  baseToolData,
  translations,
  type ToolSlug,
} from "../../../lib/i18n";
import { buildRelatedLinks } from "../../../lib/links";

type Params = { tool: ToolSlug };
const lang = "ja";
const t = translations.ja;

export function generateStaticParams() {
  return (Object.keys(baseToolData) as ToolSlug[]).map((tool) => ({ tool }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { tool } = await params;
  const toolMeta = t.tools[tool];
  if (!toolMeta) return {};
  return {
    title: toolMeta.title,
    description: toolMeta.description,
    openGraph: {
      title: toolMeta.title,
      description: toolMeta.description,
      locale: lang,
    },
    twitter: {
      title: toolMeta.title,
      description: toolMeta.description,
    },
  };
}

export default async function ToolJa({
  params,
}: {
  params: Promise<Params>;
}) {
  const { tool } = await params;
  const toolBase = baseToolData[tool];
  if (!toolBase) return notFound();

  if (toolBase.type === "cycle") {
    const related = buildRelatedLinks(lang as any, tool).slice(0, 6);
    return (
      <ColorCycleTool
        backHref={`/${lang}`}
        copy={{
          title: t.tools[tool].h1,
          subtitle: t.ui.cycle.subtitle,
          colorsTitle: t.ui.cycle.colorsTitle,
          colorsHelper: t.ui.cycle.colorsHelper,
          colorLabelPrefix: t.ui.cycle.colorLabelPrefix,
          frequencyTitle: t.ui.cycle.frequencyTitle,
          frequencyHelper: t.ui.cycle.frequencyHelper,
          instructions: t.ui.cycle.instructions,
          backLabel: t.ui.relatedTools,
        }}
        relatedLinks={related}
        relatedHeading={t.ui.relatedTools}
      />
    );
  }

  const related = buildRelatedLinks(lang as any, tool).slice(0, 6);

  return (
    <FullscreenColorPage
      title={t.tools[tool].h1}
      description={t.tools[tool].description}
      baseColor={toolBase.baseColor ?? "#ffffff"}
      hueRange={toolBase.hueRange}
      showHueControls={toolBase.showHueControls ?? true}
      showHueSwatches={toolBase.showHueSwatches ?? true}
      showShadeSwatches={toolBase.showShadeSwatches ?? true}
      showHexRgbInputs={toolBase.showHexRgbInputs ?? true}
      shadeStops={toolBase.shadeStops}
      currentSlug={tool}
      relatedHeading={t.ui.relatedTools}
      relatedLinks={related}
    />
  );
}
