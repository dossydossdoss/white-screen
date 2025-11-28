import FullscreenColorPage from "../components/FullscreenColorPage";

export default function RedScreenPage() {
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
    />
  );
}
