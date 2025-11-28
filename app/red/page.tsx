import FullscreenColorPage from "../components/FullscreenColorPage";
import { buildRelatedLinks } from "../../lib/links";

export default function RedScreenPage() {
  const relatedLinks = buildRelatedLinks("en", "red").slice(0, 6);
  return (
    <FullscreenColorPage
      title="Red Screen"
      description="Fullscreen red screen for dead pixel tests and calibration."
      baseColor="#EF4444"  // ← same as colorTools entry
      hueRange={{ min: 0, max: 0 }}  // lock to red hue
      showHueControls={false}
      showHueSwatches={false}
      showShadeSwatches={true}
      shadeStops={[8, 20, 32, 44, 56, 68, 80, 92]}  // dark → light reds
      currentSlug="red"
      relatedLinks={relatedLinks}
    />
  );
}
