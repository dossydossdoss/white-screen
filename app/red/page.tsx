import FullscreenColorPage from "../components/FullscreenColorPage";

export default function RedScreenPage() {
  return (
    <FullscreenColorPage
      title="Red Screen"
      description="Fullscreen red screen for dead pixel tests and calibration."
      baseColor="#EF4444"  // ← same as colorTools entry
    />
  );
}
