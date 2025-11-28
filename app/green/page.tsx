import FullscreenColorPage from '../components/FullscreenColorPage';

export default function GreenScreenPage() {
  return (
    <FullscreenColorPage
      title="Green Screen"
      description="Clean green background, useful for basic chroma key tests and monitor checks."
      baseColor="#22C55E"  // ← same as colorTools entry
    />
  );
}
