// app/black/page.tsx
import FullscreenColorPage from "../components/FullscreenColorPage";

export default function BlackScreenPage() {
  return (
    <FullscreenColorPage
      title="Black Screen"
      description="Perfect for backlight bleed tests and night mode."
      baseColor="#000000"
      showHueControls={false}
      showSwatches={true}
      showHueSwatches={false}
      showShadeSwatches={true}
      showHexRgbInputs={false}
      shadeStops={[0, 20, 40, 60, 80, 100]}  // from pure black to white
    />
  );
}
