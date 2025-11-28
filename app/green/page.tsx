import FullscreenColorPage from '../components/FullscreenColorPage';

export default function GreenScreenPage() {
  return (
    <FullscreenColorPage
      title="Green Screen"
      description="Clean green background, useful for basic chroma key tests and monitor checks."
      baseColor="#22C55E"  // ← same as colorTools entry
      hueRange={{ min: 120, max: 120 }}  // lock to green hue
      showHueControls={false}
      showHueSwatches={false}
      showShadeSwatches={true}
      shadeStops={[8, 20, 32, 44, 56, 68, 80, 92]}
    />
  );
}
