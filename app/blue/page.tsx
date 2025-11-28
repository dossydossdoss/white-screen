import FullscreenColorPage from '../components/FullscreenColorPage';
import { buildRelatedLinks } from '../../lib/links';

export default function BlueScreenPage() {
  const relatedLinks = buildRelatedLinks("en", "blue").slice(0, 6);
  return (
    <FullscreenColorPage
      title="Blue Screen"
      description="Bright blue screen for display testing, chroma work, and ambient lighting."
      baseColor="#3B82F6"  // ← same as colorTools entry
      hueRange={{ min: 220, max: 220 }}  // lock to blue hue
      showHueControls={false}
      showHueSwatches={false}
      showShadeSwatches={true}
      shadeStops={[8, 20, 32, 44, 56, 68, 80, 92]}
      currentSlug="blue"
      relatedLinks={relatedLinks}
    />
  );
}
