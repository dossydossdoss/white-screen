// app/black/page.tsx
import FullscreenColorPage from "../components/FullscreenColorPage";
import { buildRelatedLinks } from "../../lib/links";

export default function BlackScreenPage() {
  const relatedLinks = buildRelatedLinks("en", "black").slice(0, 6);
  return (
    <FullscreenColorPage
      title="Black Screen"
      description="Perfect for backlight bleed tests and night mode."
      baseColor="#000000"
      showHueControls={false}
      showSwatches={true}
      showHueSwatches={false}
      showShadeSwatches={true}
      showHexRgbInputs={false}
      shadeStops={[0, 20, 40, 60, 80, 100]}  // from pure black to white
      currentSlug="black"
      relatedLinks={relatedLinks}
    />
  );
}
