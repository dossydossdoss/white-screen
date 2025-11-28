// app/black/page.tsx
import FullscreenColorPage from "../components/FullscreenColorPage";

export default function BlackScreenPage() {
  return (
    <FullscreenColorPage
      title="Black Screen"
      description="Perfect for backlight bleed tests and night mode."
      baseColor="#000000"
    />
  );
}
