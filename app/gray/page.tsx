import FullscreenColorPage from "../components/FullscreenColorPage";
import { buildRelatedLinks } from "../../lib/links";

export default function GrayScreenPage() {
  const relatedLinks = buildRelatedLinks("en", "gray").slice(0, 6);
  return (
    <FullscreenColorPage
      title="Gray Screen"
      description="Neutral gray screen for calibration and eye comfort."
      baseColor="#6B7280"  // ← same as colorTools entry
      hueRange={{ min: 210, max: 210 }}  // lock to gray hue (blue-gray base)
      showHueControls={false}
      showHueSwatches={false}
      showShadeSwatches={true}
      shadeStops={[8, 20, 32, 44, 56, 68, 80, 92]}
      currentSlug="gray"
      relatedLinks={relatedLinks}
    />
  );
}
