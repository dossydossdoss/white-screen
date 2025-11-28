// app/pink/page.tsx
import FullscreenColorPage from "../components/FullscreenColorPage"; // adjust path if needed

export default function PinkPage() {
  return (
    <FullscreenColorPage
      title="Pink Screen"
      description="Vibrant pink screen for cozy lighting and fun backgrounds."
      baseColor="#EC4899"  // ← same as colorTools entry
    />
  );
}
