import FullscreenColorPage from "../components/FullscreenColorPage";

export default function WhiteScreenPage() {
  return (
    <FullscreenColorPage
      title="White Screen"
      description="Fullscreen white screen for cleaning, testing pixels, or lighting."
      baseColor="#ffffff"
      showHueControls={false}
      showSwatches={true}
      showHueSwatches={false}
      showShadeSwatches={true}
      showHexRgbInputs={false}
      shadeStops={[100, 80, 60, 40, 20, 0]}  // white to black
    />
  );
}
