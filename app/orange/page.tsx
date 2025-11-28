import FullscreenColorPage from "../components/FullscreenColorPage";

export default function OrangeScreenPage() {
  return (
    <FullscreenColorPage
      title="Orange Screen"
      description="Warm orange screen for sunset-style ambient light."
      baseColor="#F97316"  // ← same as colorTools entry
      hueRange={{ min: 30, max: 30 }}  // lock to orange hue
      showHueControls={false}
      showHueSwatches={false}
      showShadeSwatches={true}
      shadeStops={[8, 20, 32, 44, 56, 68, 80, 92]}
    />
  );
}
