import FullscreenColorPage from "../components/FullscreenColorPage";

export default function YellowScreenPage() {
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
    />
  );
}
