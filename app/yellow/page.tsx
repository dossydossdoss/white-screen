import FullscreenColorPage from "../components/FullscreenColorPage";
import { buildRelatedLinks } from "../../lib/links";

export default function YellowScreenPage() {
  const relatedLinks = buildRelatedLinks("en", "yellow").slice(0, 6);
  return (
    <FullscreenColorPage
      title="Yellow Screen"
      description="Soft yellow screen for warm reading or ambient light."
      baseColor="#EAB308"  // ← same as colorTools entry
      hueRange={{ min: 55, max: 55 }}  // lock to yellow hue
      showHueControls={false}
      showHueSwatches={false}
      showShadeSwatches={true}
      shadeStops={[8, 20, 32, 44, 56, 68, 80, 92]}
      currentSlug="yellow"
      relatedLinks={relatedLinks}
    />
  );
}
