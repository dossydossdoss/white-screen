import FullscreenColorPage from "../components/FullscreenColorPage";

export default function PurpleScreenPage() {
  return (
    <FullscreenColorPage
      title="Purple Screen"
      description="Rich purple screen for relaxing, moody backdrops."
      baseColor="#A855F7"  // ← same as colorTools entry
      hueRange={{ min: 285, max: 285 }}  // lock to purple hue
      showHueControls={false}
      showHueSwatches={false}
      showShadeSwatches={true}
      shadeStops={[8, 20, 32, 44, 56, 68, 80, 92]}
    />
  );
}
