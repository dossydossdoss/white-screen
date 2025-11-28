// app/pink/page.tsx
import FullscreenColorPage from "../components/FullscreenColorPage"; // adjust path if needed

export default function PinkPage() {
  return (
    <FullscreenColorPage
      title="Pink Screen"
      description="Vibrant pink screen for cozy lighting and fun backgrounds."
      baseColor="#EC4899"  // ← same as colorTools entry
      hueRange={{ min: 330, max: 330 }}  // lock to pink hue
      showHueControls={false}
      showHueSwatches={false}
      showShadeSwatches={true}
      shadeStops={[8, 20, 32, 44, 56, 68, 80, 92]}
    />
  );
}
