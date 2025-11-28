export const languages = ["en", "es", "de", "fr", "ja"] as const;
export type Language = (typeof languages)[number];

export type ToolSlug =
  | "white"
  | "black"
  | "cycle"
  | "red"
  | "green"
  | "blue"
  | "yellow"
  | "pink"
  | "purple"
  | "orange"
  | "gray";

export type ToolType = "color" | "cycle";

export type ToolMeta = {
  title: string;
  description: string;
  h1: string;
  cardTitle?: string;
  cardDescription?: string;
};

export type LocaleContent = {
  home: {
    title: string;
    description: string;
    h1: string;
    heroCopy: string;
    toolSectionLabel: string;
    toolSectionHelper: string;
  };
  tools: Record<ToolSlug, ToolMeta>;
  ui: {
    relatedTools: string;
    openTool: (toolName: string) => string;
    cycle: {
      subtitle: string;
      colorsTitle: string;
      colorsHelper: string;
      colorLabelPrefix: string;
      frequencyTitle: string;
      frequencyHelper: string;
      instructions: string;
    };
  };
};

export const baseToolData: Record<
  ToolSlug,
  { type: ToolType; baseColor?: string; hueRange?: { min: number; max: number }; showHueControls?: boolean; showHueSwatches?: boolean; showShadeSwatches?: boolean; showHexRgbInputs?: boolean; shadeStops?: number[] }
> = {
  white: { type: "color", baseColor: "#ffffff" },
  black: { type: "color", baseColor: "#000000", showHueControls: false, showHueSwatches: false, showShadeSwatches: true, showHexRgbInputs: false, shadeStops: [0, 20, 40, 60, 80, 100] },
  red: { type: "color", baseColor: "#EF4444", hueRange: { min: 0, max: 0 }, showHueControls: false, showHueSwatches: false, showShadeSwatches: true, shadeStops: [8, 20, 32, 44, 56, 68, 80, 92] },
  green: { type: "color", baseColor: "#22C55E", hueRange: { min: 120, max: 120 }, showHueControls: false, showHueSwatches: false, showShadeSwatches: true, shadeStops: [8, 20, 32, 44, 56, 68, 80, 92] },
  blue: { type: "color", baseColor: "#3B82F6", hueRange: { min: 220, max: 220 }, showHueControls: false, showHueSwatches: false, showShadeSwatches: true, shadeStops: [8, 20, 32, 44, 56, 68, 80, 92] },
  yellow: { type: "color", baseColor: "#EAB308", hueRange: { min: 55, max: 55 }, showHueControls: false, showHueSwatches: false, showShadeSwatches: true, shadeStops: [8, 20, 32, 44, 56, 68, 80, 92] },
  pink: { type: "color", baseColor: "#EC4899", hueRange: { min: 330, max: 330 }, showHueControls: false, showHueSwatches: false, showShadeSwatches: true, shadeStops: [8, 20, 32, 44, 56, 68, 80, 92] },
  purple: { type: "color", baseColor: "#A855F7", hueRange: { min: 285, max: 285 }, showHueControls: false, showHueSwatches: false, showShadeSwatches: true, shadeStops: [8, 20, 32, 44, 56, 68, 80, 92] },
  orange: { type: "color", baseColor: "#F97316", hueRange: { min: 30, max: 30 }, showHueControls: false, showHueSwatches: false, showShadeSwatches: true, shadeStops: [8, 20, 32, 44, 56, 68, 80, 92] },
  gray: { type: "color", baseColor: "#6B7280", hueRange: { min: 210, max: 210 }, showHueControls: false, showHueSwatches: false, showShadeSwatches: true, shadeStops: [8, 20, 32, 44, 56, 68, 80, 92] },
  cycle: { type: "cycle" },
};

export const translations: Record<Language, LocaleContent> = {
  en: {
    home: {
      title: "Full-screen colour tools for lighting, testing, and focus",
      description:
        "Open a pure colour screen in one click. Use it as a softbox, pixel tester, or clean backdrop. No login, no clutter.",
      h1: "Full-screen colour tools for lighting, testing, and focus",
      heroCopy:
        "Open a pure colour screen in one click. Use it as a softbox, pixel tester, or clean backdrop. No login, no clutter—just fullscreen colour.",
      toolSectionLabel: "Colour Screen Tools",
      toolSectionHelper: "Click any colour to open its full-screen tool.",
    },
    tools: {
      white: {
        title:
          "White Screen – Fullscreen Bright White Background for Cleaning & Dead Pixel Testing",
        description:
          "Open a fullscreen white screen for cleaning, testing, lighting, dead pixels, and monitor tools.",
        h1: "White Screen – Fullscreen Bright White Background for Cleaning & Dead Pixel Testing",
        cardTitle: "White Screen",
        cardDescription: "Pure white full screen for lighting, cleaning, and stuck pixels.",
      },
      black: {
        title:
          "Black Screen – Fullscreen Pure Black Background for Display Testing & Eye Comfort",
        description:
          "Use a fullscreen black screen for cleaning, testing, lighting, dead pixels, and monitor tools.",
        h1: "Black Screen – Fullscreen Pure Black Background for Display Testing & Eye Comfort",
        cardTitle: "Black Screen",
        cardDescription: "Pure black screen for contrast checks, dead pixels, and eye comfort.",
      },
      red: {
        title:
          "Red Screen – Fullscreen Red Color for Dead Pixel Detection & Monitor Calibration",
        description:
          "Fullscreen red for cleaning, testing, lighting, dead pixels, and monitor tools.",
        h1: "Red Screen – Fullscreen Red Color for Dead Pixel Detection & Monitor Calibration",
        cardTitle: "Red Screen",
        cardDescription: "Fullscreen red for pixel testing and calibration.",
      },
      green: {
        title:
          "Green Screen – Fullscreen Green Color for Pixel Testing & Chroma Checks",
        description:
          "Fullscreen green for cleaning, testing, lighting, dead pixels, and monitor tools.",
        h1: "Green Screen – Fullscreen Green Color for Pixel Testing & Chroma Checks",
        cardTitle: "Green Screen",
        cardDescription: "Solid green screen for chroma and pixel tests.",
      },
      blue: {
        title:
          "Blue Screen – Fullscreen Blue Background for Pixel Testing & Focus",
        description:
          "Fullscreen blue for cleaning, testing, lighting, dead pixels, and monitor tools.",
        h1: "Blue Screen – Fullscreen Blue Background for Pixel Testing & Focus",
        cardTitle: "Blue Screen",
        cardDescription: "Bright blue screen for focus and pixel checks.",
      },
      yellow: {
        title:
          "Yellow Screen – Fullscreen Warm Yellow Background for Lighting & Testing",
        description:
          "Fullscreen yellow for cleaning, testing, lighting, dead pixels, and monitor tools.",
        h1: "Yellow Screen – Fullscreen Warm Yellow Background for Lighting & Testing",
        cardTitle: "Yellow Screen",
        cardDescription: "Warm yellow screen for ambient light and testing.",
      },
      pink: {
        title:
          "Pink Screen – Fullscreen Pink Background for Lighting & Pixel Checks",
        description:
          "Fullscreen pink for cleaning, testing, lighting, dead pixels, and monitor tools.",
        h1: "Pink Screen – Fullscreen Pink Background for Lighting & Pixel Checks",
        cardTitle: "Pink Screen",
        cardDescription: "Cozy pink screen for soft light and pixel checks.",
      },
      purple: {
        title:
          "Purple Screen – Fullscreen Purple Background for Lighting & Monitor Testing",
        description:
          "Fullscreen purple for cleaning, testing, lighting, dead pixels, and monitor tools.",
        h1: "Purple Screen – Fullscreen Purple Background for Lighting & Monitor Testing",
        cardTitle: "Purple Screen",
        cardDescription: "Moody purple screen for relaxing backdrops.",
      },
      orange: {
        title:
          "Orange Screen – Fullscreen Orange Background for Warm Lighting & Testing",
        description:
          "Fullscreen orange for cleaning, testing, lighting, dead pixels, and monitor tools.",
        h1: "Orange Screen – Fullscreen Orange Background for Warm Lighting & Testing",
        cardTitle: "Orange Screen",
        cardDescription: "Warm orange screen for sunset-style lighting.",
      },
      gray: {
        title:
          "Gray Screen – Fullscreen Neutral Gray for Monitor Calibration & Eye Comfort",
        description:
          "Fullscreen gray for cleaning, testing, lighting, dead pixels, and monitor tools.",
        h1: "Gray Screen – Fullscreen Neutral Gray for Monitor Calibration & Eye Comfort",
        cardTitle: "Gray Screen",
        cardDescription: "Neutral gray screen for calibration and comfort.",
      },
      cycle: {
        title:
          "Color Cycle – Fullscreen Cycling Colours for Testing, Lighting & Dead Pixel Checks",
        description:
          "Cycle fullscreen colours for cleaning, testing, lighting, dead pixels, and monitor tools.",
        h1: "Color Cycle – Fullscreen Cycling Colours for Testing, Lighting & Dead Pixel Checks",
        cardTitle: "Color Cycle",
        cardDescription: "Cycle colours at your chosen speed.",
      },
    },
    ui: {
      relatedTools: "Other tools",
      openTool: (toolName: string) => `Open ${toolName.toLowerCase()} →`,
      cycle: {
        subtitle: "Cycle between your selected colours at a speed you choose.",
        colorsTitle: "Colours",
        colorsHelper: "Cycle through these",
        colorLabelPrefix: "Colour",
        frequencyTitle: "Frequency",
        frequencyHelper: "Seconds per colour",
        instructions:
          "Click the colour area or press F / Space for fullscreen. Cycle speed is set by the frequency slider; colours blend smoothly.",
      },
    },
  },
  es: {
    home: {
      title: "Pantallas de color a pantalla completa para luz y pruebas",
      description:
        "Abre una pantalla de color puro con un clic. Úsala como softbox, para probar píxeles o como fondo limpio.",
      h1: "Pantallas de color para iluminación y pruebas",
      heroCopy:
        "Abre una pantalla de color puro con un clic. Úsala como softbox, para probar píxeles o como fondo limpio. Sin registro ni distracciones.",
      toolSectionLabel: "Herramientas de pantalla de color",
      toolSectionHelper: "Haz clic en cualquier color para abrirlo a pantalla completa.",
    },
    tools: {
      white: {
        title:
          "Pantalla blanca – Fondo blanco en pantalla completa para limpieza y píxeles muertos",
        description:
          "Pantalla blanca en pantalla completa para limpieza, pruebas, iluminación, píxeles muertos y herramientas de monitor.",
        h1: "Pantalla blanca – Fondo blanco en pantalla completa para limpieza y píxeles muertos",
        cardTitle: "Pantalla blanca",
        cardDescription: "Pantalla blanca pura para iluminación, limpieza y píxeles atascados.",
      },
      black: {
        title:
          "Pantalla negra – Fondo negro puro en pantalla completa para pruebas y descanso visual",
        description:
          "Pantalla negra en pantalla completa para limpieza, pruebas, iluminación, píxeles muertos y herramientas de monitor.",
        h1: "Pantalla negra – Fondo negro puro en pantalla completa para pruebas y descanso visual",
        cardTitle: "Pantalla negra",
        cardDescription: "Pantalla negra pura para contraste y píxeles muertos.",
      },
      red: {
        title:
          "Pantalla roja – Color rojo en pantalla completa para detección de píxeles muertos",
        description:
          "Pantalla roja en pantalla completa para limpieza, pruebas, iluminación, píxeles muertos y herramientas de monitor.",
        h1: "Pantalla roja – Color rojo en pantalla completa para detección de píxeles muertos",
        cardTitle: "Pantalla roja",
        cardDescription: "Pantalla roja para pruebas de píxeles.",
      },
      green: {
        title:
          "Pantalla verde – Color verde en pantalla completa para píxeles y croma",
        description:
          "Pantalla verde en pantalla completa para limpieza, pruebas, iluminación, píxeles muertos y herramientas de monitor.",
        h1: "Pantalla verde – Color verde en pantalla completa para píxeles y croma",
        cardTitle: "Pantalla verde",
        cardDescription: "Pantalla verde para croma y píxeles.",
      },
      blue: {
        title:
          "Pantalla azul – Fondo azul en pantalla completa para enfoque y pruebas de píxeles",
        description:
          "Pantalla azul en pantalla completa para limpieza, pruebas, iluminación, píxeles muertos y herramientas de monitor.",
        h1: "Pantalla azul – Fondo azul en pantalla completa para enfoque y pruebas de píxeles",
        cardTitle: "Pantalla azul",
        cardDescription: "Pantalla azul para enfoque y pruebas.",
      },
      yellow: {
        title:
          "Pantalla amarilla – Fondo amarillo cálido en pantalla completa para luz y pruebas",
        description:
          "Pantalla amarilla en pantalla completa para limpieza, pruebas, iluminación, píxeles muertos y herramientas de monitor.",
        h1: "Pantalla amarilla – Fondo amarillo cálido en pantalla completa para luz y pruebas",
        cardTitle: "Pantalla amarilla",
        cardDescription: "Pantalla amarilla cálida para luz y lectura.",
      },
      pink: {
        title:
          "Pantalla rosa – Fondo rosa en pantalla completa para iluminación y revisión de píxeles",
        description:
          "Pantalla rosa en pantalla completa para limpieza, pruebas, iluminación, píxeles muertos y herramientas de monitor.",
        h1: "Pantalla rosa – Fondo rosa en pantalla completa para iluminación y revisión de píxeles",
        cardTitle: "Pantalla rosa",
        cardDescription: "Pantalla rosa acogedora para luz suave.",
      },
      purple: {
        title:
          "Pantalla morada – Fondo púrpura en pantalla completa para iluminación y pruebas",
        description:
          "Pantalla morada en pantalla completa para limpieza, pruebas, iluminación, píxeles muertos y herramientas de monitor.",
        h1: "Pantalla morada – Fondo púrpura en pantalla completa para iluminación y pruebas",
        cardTitle: "Pantalla morada",
        cardDescription: "Pantalla morada para fondos relajantes.",
      },
      orange: {
        title:
          "Pantalla naranja – Fondo naranja en pantalla completa para luz cálida y pruebas",
        description:
          "Pantalla naranja en pantalla completa para limpieza, pruebas, iluminación, píxeles muertos y herramientas de monitor.",
        h1: "Pantalla naranja – Fondo naranja en pantalla completa para luz cálida y pruebas",
        cardTitle: "Pantalla naranja",
        cardDescription: "Pantalla naranja para luz tipo atardecer.",
      },
      gray: {
        title:
          "Pantalla gris – Fondo gris neutro en pantalla completa para calibración y descanso",
        description:
          "Pantalla gris en pantalla completa para limpieza, pruebas, iluminación, píxeles muertos y herramientas de monitor.",
        h1: "Pantalla gris – Fondo gris neutro en pantalla completa para calibración y descanso",
        cardTitle: "Pantalla gris",
        cardDescription: "Pantalla gris neutra para calibrar y descansar.",
      },
      cycle: {
        title:
          "Ciclo de color – Colores en pantalla completa para pruebas, iluminación y píxeles muertos",
        description:
          "Cicla colores en pantalla completa para limpieza, pruebas, iluminación, píxeles muertos y herramientas de monitor.",
        h1: "Ciclo de color – Colores en pantalla completa para pruebas, iluminación y píxeles muertos",
        cardTitle: "Ciclo de color",
        cardDescription: "Cicla colores en pantalla completa.",
      },
    },
    ui: {
      relatedTools: "Otras herramientas",
      openTool: (toolName: string) => `Abrir ${toolName.toLowerCase()} →`,
      cycle: {
        subtitle: "Cambia entre tus colores a la velocidad que elijas.",
        colorsTitle: "Colores",
        colorsHelper: "Se ciclarán en este orden",
        colorLabelPrefix: "Color",
        frequencyTitle: "Frecuencia",
        frequencyHelper: "Segundos por color",
        instructions:
          "Haz clic en el área de color o pulsa F / Espacio para pantalla completa. La velocidad se ajusta con el control de frecuencia.",
      },
    },
  },
  de: {
    home: {
      title: "Vollbild-Farbbildschirme für Licht und Tests",
      description:
        "Öffne mit einem Klick einen reinen Farbbildschirm. Nutze ihn als Softbox, für Pixeltests oder als sauberen Hintergrund.",
      h1: "Farbbildschirme für Beleuchtung und Tests",
      heroCopy:
        "Öffne mit einem Klick einen reinen Farbbildschirm. Keine Anmeldung, kein Schnickschnack – nur Vollbildfarbe.",
      toolSectionLabel: "Farbbildschirm-Tools",
      toolSectionHelper: "Klicke auf eine Farbe, um sie im Vollbild zu öffnen.",
    },
    tools: {
      white: {
        title:
          "Weißer Bildschirm – Vollbild helles Weiß für Reinigung und Pixelfehler-Tests",
        description:
          "Weißer Vollbildschirm für Reinigung, Tests, Beleuchtung, Pixelfehler und Monitortools.",
        h1: "Weißer Bildschirm – Vollbild helles Weiß für Reinigung und Pixelfehler-Tests",
        cardTitle: "Weißer Bildschirm",
        cardDescription: "Helles Weiß im Vollbild für Licht, Reinigung und Pixeltests.",
      },
      black: {
        title:
          "Schwarzer Bildschirm – Vollbild reines Schwarz für Tests und Augenkomfort",
        description:
          "Schwarzer Vollbildschirm für Reinigung, Tests, Beleuchtung, Pixelfehler und Monitortools.",
        h1: "Schwarzer Bildschirm – Vollbild reines Schwarz für Tests und Augenkomfort",
        cardTitle: "Schwarzer Bildschirm",
        cardDescription: "Reines Schwarz für Kontrast und Pixelfehler.",
      },
      red: {
        title:
          "Roter Bildschirm – Vollbild Rot für Pixelfehler-Erkennung und Kalibrierung",
        description:
          "Roter Vollbildschirm für Reinigung, Tests, Beleuchtung, Pixelfehler und Monitortools.",
        h1: "Roter Bildschirm – Vollbild Rot für Pixelfehler-Erkennung und Kalibrierung",
        cardTitle: "Roter Bildschirm",
        cardDescription: "Roter Bildschirm für Pixeltests.",
      },
      green: {
        title:
          "Grüner Bildschirm – Vollbild Grün für Pixeltests und Chroma-Checks",
        description:
          "Grüner Vollbildschirm für Reinigung, Tests, Beleuchtung, Pixelfehler und Monitortools.",
        h1: "Grüner Bildschirm – Vollbild Grün für Pixeltests und Chroma-Checks",
        cardTitle: "Grüner Bildschirm",
        cardDescription: "Grüner Bildschirm für Chroma und Pixel.",
      },
      blue: {
        title:
          "Blauer Bildschirm – Vollbild Blau für Fokus und Monitor-Tests",
        description:
          "Blauer Vollbildschirm für Reinigung, Tests, Beleuchtung, Pixelfehler und Monitortools.",
        h1: "Blauer Bildschirm – Vollbild Blau für Fokus und Monitor-Tests",
        cardTitle: "Blauer Bildschirm",
        cardDescription: "Blauer Bildschirm für Fokus und Tests.",
      },
      yellow: {
        title:
          "Gelber Bildschirm – Vollbild warmes Gelb für Beleuchtung und Tests",
        description:
          "Gelber Vollbildschirm für Reinigung, Tests, Beleuchtung, Pixelfehler und Monitortools.",
        h1: "Gelber Bildschirm – Vollbild warmes Gelb für Beleuchtung und Tests",
        cardTitle: "Gelber Bildschirm",
        cardDescription: "Warmes Gelb für Licht und Lesen.",
      },
      pink: {
        title:
          "Rosa Bildschirm – Vollbild Rosa für Beleuchtung und Pixelchecks",
        description:
          "Rosa Vollbildschirm für Reinigung, Tests, Beleuchtung, Pixelfehler und Monitortools.",
        h1: "Rosa Bildschirm – Vollbild Rosa für Beleuchtung und Pixelchecks",
        cardTitle: "Rosa Bildschirm",
        cardDescription: "Rosa Bildschirm für weiches Licht.",
      },
      purple: {
        title:
          "Violetter Bildschirm – Vollbild Violett für Beleuchtung und Monitor-Tests",
        description:
          "Violetter Vollbildschirm für Reinigung, Tests, Beleuchtung, Pixelfehler und Monitortools.",
        h1: "Violetter Bildschirm – Vollbild Violett für Beleuchtung und Monitor-Tests",
        cardTitle: "Violetter Bildschirm",
        cardDescription: "Violett für entspannte Hintergründe.",
      },
      orange: {
        title:
          "Oranger Bildschirm – Vollbild Orange für warmes Licht und Tests",
        description:
          "Oranger Vollbildschirm für Reinigung, Tests, Beleuchtung, Pixelfehler und Monitortools.",
        h1: "Oranger Bildschirm – Vollbild Orange für warmes Licht und Tests",
        cardTitle: "Oranger Bildschirm",
        cardDescription: "Orange für warmes Ambiente.",
      },
      gray: {
        title:
          "Grauer Bildschirm – Neutraler Vollbild-Grauton für Kalibrierung und Augenkomfort",
        description:
          "Grauer Vollbildschirm für Reinigung, Tests, Beleuchtung, Pixelfehler und Monitortools.",
        h1: "Grauer Bildschirm – Neutraler Vollbild-Grauton für Kalibrierung und Augenkomfort",
        cardTitle: "Grauer Bildschirm",
        cardDescription: "Grauer Bildschirm für Kalibrierung und Komfort.",
      },
      cycle: {
        title:
          "Farbwechsel – Vollbild Farbzyklus für Tests, Beleuchtung und Pixelfehler",
        description:
          "Farbwechsel im Vollbild für Reinigung, Tests, Beleuchtung, Pixelfehler und Monitortools.",
        h1: "Farbwechsel – Vollbild Farbzyklus für Tests, Beleuchtung und Pixelfehler",
        cardTitle: "Farbwechsel",
        cardDescription: "Wechselnde Farben im Vollbild.",
      },
    },
    ui: {
      relatedTools: "Weitere Tools",
      openTool: (toolName: string) => `Öffne ${toolName.toLowerCase()} →`,
      cycle: {
        subtitle: "Wechsle zwischen deinen Farben in deiner Geschwindigkeit.",
        colorsTitle: "Farben",
        colorsHelper: "Diese Farben werden durchlaufen",
        colorLabelPrefix: "Farbe",
        frequencyTitle: "Frequenz",
        frequencyHelper: "Sekunden pro Farbe",
        instructions:
          "Klicke auf die Farbfäche oder drücke F / Leertaste für Vollbild. Die Geschwindigkeit stellst du mit dem Frequenzregler ein.",
      },
    },
  },
  fr: {
    home: {
      title: "Écrans couleur plein écran pour lumière et tests",
      description:
        "Ouvre un écran de couleur pure en un clic. Utilise-le comme boîte à lumière, pour tester les pixels ou comme fond propre.",
      h1: "Outils d’écran couleur pour éclairage et tests",
      heroCopy:
        "Ouvre un écran de couleur pure en un clic. Pas de compte, pas d’encombrement — juste de la couleur en plein écran.",
      toolSectionLabel: "Outils d’écran couleur",
      toolSectionHelper: "Clique sur une couleur pour l’ouvrir en plein écran.",
    },
    tools: {
      white: {
        title:
          "Écran blanc – Fond blanc plein écran pour nettoyage et pixels morts",
        description:
          "Écran blanc en plein écran pour nettoyage, tests, éclairage, pixels morts et outils de moniteur.",
        h1: "Écran blanc – Fond blanc plein écran pour nettoyage et pixels morts",
        cardTitle: "Écran blanc",
        cardDescription: "Écran blanc pur pour éclairage, nettoyage et pixels bloqués.",
      },
      black: {
        title:
          "Écran noir – Fond noir pur plein écran pour tests et confort visuel",
        description:
          "Écran noir en plein écran pour nettoyage, tests, éclairage, pixels morts et outils de moniteur.",
        h1: "Écran noir – Fond noir pur plein écran pour tests et confort visuel",
        cardTitle: "Écran noir",
        cardDescription: "Écran noir pur pour contraste et pixels morts.",
      },
      red: {
        title:
          "Écran rouge – Couleur rouge plein écran pour détection de pixels morts",
        description:
          "Écran rouge en plein écran pour nettoyage, tests, éclairage, pixels morts et outils de moniteur.",
        h1: "Écran rouge – Couleur rouge plein écran pour détection de pixels morts",
        cardTitle: "Écran rouge",
        cardDescription: "Écran rouge pour tests de pixels.",
      },
      green: {
        title:
          "Écran vert – Couleur verte plein écran pour chroma et tests de pixels",
        description:
          "Écran vert en plein écran pour nettoyage, tests, éclairage, pixels morts et outils de moniteur.",
        h1: "Écran vert – Couleur verte plein écran pour chroma et tests de pixels",
        cardTitle: "Écran vert",
        cardDescription: "Écran vert pour chroma et pixels.",
      },
      blue: {
        title:
          "Écran bleu – Fond bleu plein écran pour focus et tests d’affichage",
        description:
          "Écran bleu en plein écran pour nettoyage, tests, éclairage, pixels morts et outils de moniteur.",
        h1: "Écran bleu – Fond bleu plein écran pour focus et tests d’affichage",
        cardTitle: "Écran bleu",
        cardDescription: "Écran bleu pour focus et tests.",
      },
      yellow: {
        title:
          "Écran jaune – Fond jaune chaud plein écran pour éclairage et tests",
        description:
          "Écran jaune en plein écran pour nettoyage, tests, éclairage, pixels morts et outils de moniteur.",
        h1: "Écran jaune – Fond jaune chaud plein écran pour éclairage et tests",
        cardTitle: "Écran jaune",
        cardDescription: "Écran jaune chaud pour éclairage et lecture.",
      },
      pink: {
        title:
          "Écran rose – Fond rose plein écran pour éclairage et contrôle de pixels",
        description:
          "Écran rose en plein écran pour nettoyage, tests, éclairage, pixels morts et outils de moniteur.",
        h1: "Écran rose – Fond rose plein écran pour éclairage et contrôle de pixels",
        cardTitle: "Écran rose",
        cardDescription: "Écran rose cosy pour lumière douce.",
      },
      purple: {
        title:
          "Écran violet – Fond violet plein écran pour éclairage et tests de moniteur",
        description:
          "Écran violet en plein écran pour nettoyage, tests, éclairage, pixels morts et outils de moniteur.",
        h1: "Écran violet – Fond violet plein écran pour éclairage et tests de moniteur",
        cardTitle: "Écran violet",
        cardDescription: "Écran violet pour fonds relaxants.",
      },
      orange: {
        title:
          "Écran orange – Fond orange plein écran pour lumière chaleureuse et tests",
        description:
          "Écran orange en plein écran pour nettoyage, tests, éclairage, pixels morts et outils de moniteur.",
        h1: "Écran orange – Fond orange plein écran pour lumière chaleureuse et tests",
        cardTitle: "Écran orange",
        cardDescription: "Écran orange pour ambiance chaleureuse.",
      },
      gray: {
        title:
          "Écran gris – Gris neutre plein écran pour calibration et confort visuel",
        description:
          "Écran gris en plein écran pour nettoyage, tests, éclairage, pixels morts et outils de moniteur.",
        h1: "Écran gris – Gris neutre plein écran pour calibration et confort visuel",
        cardTitle: "Écran gris",
        cardDescription: "Écran gris neutre pour calibration et repos.",
      },
      cycle: {
        title:
          "Cycle de couleur – Couleurs en plein écran pour tests, éclairage et pixels morts",
        description:
          "Cycle de couleurs en plein écran pour nettoyage, tests, éclairage, pixels morts et outils de moniteur.",
        h1: "Cycle de couleur – Couleurs en plein écran pour tests, éclairage et pixels morts",
        cardTitle: "Cycle de couleur",
        cardDescription: "Cycle de couleurs en plein écran.",
      },
    },
    ui: {
      relatedTools: "Autres outils",
      openTool: (toolName: string) => `Ouvrir ${toolName.toLowerCase()} →`,
      cycle: {
        subtitle: "Fais défiler tes couleurs à la vitesse que tu choisis.",
        colorsTitle: "Couleurs",
        colorsHelper: "Cycle dans cet ordre",
        colorLabelPrefix: "Couleur",
        frequencyTitle: "Fréquence",
        frequencyHelper: "Secondes par couleur",
        instructions:
          "Clique sur la zone colorée ou appuie sur F / Espace pour le plein écran. Ajuste la vitesse avec le curseur de fréquence.",
      },
    },
  },
  ja: {
    home: {
      title: "全画面カラーで照明とテスト",
      description:
        "ワンクリックで純色の画面を開く。ライト、ピクセルチェック、背景に。",
      h1: "照明・テスト向け全画面カラー",
      heroCopy:
        "ワンクリックで純色の画面を開けます。ログイン不要でシンプル、全画面カラーだけ。",
      toolSectionLabel: "カラー画面ツール",
      toolSectionHelper: "色をクリックして全画面で開きます。",
    },
    tools: {
      white: {
        title:
          "白画面 – 清掃とドット抜けチェックのための全画面ホワイト",
        description:
          "全画面の白で清掃、テスト、照明、ドット抜け、モニター用ツールに使えます。",
        h1: "白画面 – 清掃とドット抜けチェックのための全画面ホワイト",
        cardTitle: "白画面",
        cardDescription: "照明・清掃・ドット抜けに使える白い全画面。",
      },
      black: {
        title:
          "黒画面 – テストと目の休憩のための全画面ブラック",
        description:
          "全画面の黒で清掃、テスト、照明、ドット抜け、モニター用ツールに使えます。",
        h1: "黒画面 – テストと目の休憩のための全画面ブラック",
        cardTitle: "黒画面",
        cardDescription: "コントラストやドット抜け確認に使える黒い全画面。",
      },
      red: {
        title:
          "赤画面 – ドット抜け検知とモニター校正のための全画面レッド",
        description:
          "全画面の赤で清掃、テスト、照明、ドット抜け、モニター用ツールに使えます。",
        h1: "赤画面 – ドット抜け検知とモニター校正のための全画面レッド",
        cardTitle: "赤画面",
        cardDescription: "ピクセルテスト用の赤い全画面。",
      },
      green: {
        title:
          "緑画面 – クロマとピクセルテストのための全画面グリーン",
        description:
          "全画面の緑で清掃、テスト、照明、ドット抜け、モニター用ツールに使えます。",
        h1: "緑画面 – クロマとピクセルテストのための全画面グリーン",
        cardTitle: "緑画面",
        cardDescription: "クロマやピクセル確認に使える緑の全画面。",
      },
      blue: {
        title:
          "青画面 – ピクセルテストと集中用の全画面ブルー",
        description:
          "全画面の青で清掃、テスト、照明、ドット抜け、モニター用ツールに使えます。",
        h1: "青画面 – ピクセルテストと集中用の全画面ブルー",
        cardTitle: "青画面",
        cardDescription: "集中やテストに使える青い全画面。",
      },
      yellow: {
        title:
          "黄画面 – 暖かい照明とテスト向けの全画面イエロー",
        description:
          "全画面の黄色で清掃、テスト、照明、ドット抜け、モニター用ツールに使えます。",
        h1: "黄画面 – 暖かい照明とテスト向けの全画面イエロー",
        cardTitle: "黄画面",
        cardDescription: "暖色ライトや読書に使える黄色の全画面。",
      },
      pink: {
        title:
          "ピンク画面 – 照明とピクセル確認のための全画面ピンク",
        description:
          "全画面のピンクで清掃、テスト、照明、ドット抜け、モニター用ツールに使えます。",
        h1: "ピンク画面 – 照明とピクセル確認のための全画面ピンク",
        cardTitle: "ピンク画面",
        cardDescription: "柔らかい照明に使えるピンクの全画面。",
      },
      purple: {
        title:
          "紫画面 – 照明とモニターテストのための全画面パープル",
        description:
          "全画面の紫で清掃、テスト、照明、ドット抜け、モニター用ツールに使えます。",
        h1: "紫画面 – 照明とモニターテストのための全画面パープル",
        cardTitle: "紫画面",
        cardDescription: "落ち着いた背景に使える紫の全画面。",
      },
      orange: {
        title:
          "オレンジ画面 – 暖色ライティングとテストのための全画面オレンジ",
        description:
          "全画面のオレンジで清掃、テスト、照明、ドット抜け、モニター用ツールに使えます。",
        h1: "オレンジ画面 – 暖色ライティングとテストのための全画面オレンジ",
        cardTitle: "オレンジ画面",
        cardDescription: "夕焼け風の照明に使えるオレンジの全画面。",
      },
      gray: {
        title:
          "グレー画面 – キャリブレーションと目の休憩に使える全画面グレー",
        description:
          "全画面のグレーで清掃、テスト、照明、ドット抜け、モニター用ツールに使えます。",
        h1: "グレー画面 – キャリブレーションと目の休憩に使える全画面グレー",
        cardTitle: "グレー画面",
        cardDescription: "キャリブレーションや目の休憩に使える灰色の全画面。",
      },
      cycle: {
        title:
          "カラーサイクル – テストと照明に使える全画面色替え",
        description:
          "全画面で色を切り替えて清掃、テスト、照明、ドット抜け、モニター用ツールに使えます。",
        h1: "カラーサイクル – テストと照明に使える全画面色替え",
        cardTitle: "カラーサイクル",
        cardDescription: "全画面で色を切り替えます。",
      },
    },
    ui: {
      relatedTools: "他のツール",
      openTool: (toolName: string) => `${toolName} を開く →`,
      cycle: {
        subtitle: "選んだ色を好きな速度で切り替えます。",
        colorsTitle: "カラー",
        colorsHelper: "この順番で切り替え",
        colorLabelPrefix: "カラー",
        frequencyTitle: "速度",
        frequencyHelper: "1色あたりの秒数",
        instructions:
          "色エリアをクリック、または F / Space で全画面。速度はスライダーで調整できます。",
      },
    },
  },
};

export const toolOrder: ToolSlug[] = [
  "white",
  "black",
  "cycle",
  "red",
  "green",
  "blue",
  "yellow",
  "pink",
  "purple",
  "orange",
  "gray",
];
