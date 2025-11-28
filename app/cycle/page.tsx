import ColorCycleTool from "../components/ColorCycleTool";
import { buildRelatedLinks } from "../../lib/links";

export default function CyclePage() {
  const relatedLinks = buildRelatedLinks("en", "cycle").slice(0, 6);
  return (
    <ColorCycleTool
      copy={{
        title: "Color Cycle",
        subtitle: "Cycle between your selected colours at a speed you choose.",
        colorsTitle: "Colours",
        colorsHelper: "Cycle through these",
        colorLabelPrefix: "Colour",
        frequencyTitle: "Frequency",
        frequencyHelper: "per colour",
        instructions:
          "Click the colour area or press F / Space for fullscreen. Cycle speed is set by the frequency slider; colours blend smoothly.",
        backLabel: "Back",
      }}
      relatedLinks={relatedLinks}
      relatedHeading="Other tools"
    />
  );
}
