export type Category = {
  slug: string;
  name: string;
  tagline: string;
  icon: string;
  description: string;
  image: string;
};

export type Product = {
  id: string;
  name: string;
  categorySlug: string;
  tagline: string;
  description: string;
  price: number;
  energyRating: "A+++" | "A++" | "A+";
  finish: string[];
  features: string[];
  specs: Record<string, string>;
  accent: string;
  image: string;
};

export const categories: Category[] = [
  {
    slug: "refrigeration",
    name: "Smart Refrigeration",
    tagline: "Freshness, intelligently preserved",
    icon: "snowflake",
    description:
      "AI-driven climate zones and internal cameras keep every shelf at the perfect temperature, while the Atlanteos app tells you what's inside before you open the door.",
    image: "/images/refrigeration.png",
  },
  {
    slug: "induction-cooking",
    name: "Induction Cooktops",
    tagline: "Precision heat, zero flame",
    icon: "flame",
    description:
      "Magnetic induction zones that sense pan size automatically and respond to touch, voice, or app control in milliseconds.",
    image: "/images/induction-cooking.png",
  },
  {
    slug: "built-in-ovens",
    name: "Built-In Ovens",
    tagline: "Chef-grade cooking, self-learning",
    icon: "oven",
    description:
      "Multi-sensor ovens that recognize your dish, auto-adjust humidity and convection, and notify you the instant it's perfectly done.",
    image: "/images/built-in-ovens.png",
  },
  {
    slug: "range-hoods",
    name: "Range Hoods",
    tagline: "Silent air, sensed automatically",
    icon: "wind",
    description:
      "Air-quality sensors trigger adaptive extraction speed automatically, with whisper-quiet brushless motors.",
    image: "/images/range-hoods.png",
  },
  {
    slug: "dishwashers",
    name: "Dishwashers",
    tagline: "Wash cycles that read the load",
    icon: "droplets",
    description:
      "Turbidity sensors calculate exact water, time, and detergent needed per cycle — saving up to 40% water versus standard cycles.",
    image: "/images/dishwashers.png",
  },
  {
    slug: "wine-beverage",
    name: "Wine & Beverage",
    tagline: "Curated climates for every bottle",
    icon: "wine",
    description:
      "Dual-zone vibration-free cooling with UV-filtered glass, tuned for long-term cellaring or quick-chill entertaining.",
    image: "/images/wine-beverage.png",
  },
];

function categoryImage(slug: string): string {
  return categories.find((c) => c.slug === slug)?.image ?? "/images/refrigeration.png";
}

export const products: Product[] = [
  {
    id: "atl-fridge-rs900",
    name: "RS900 French-Door Refrigerator",
    categorySlug: "refrigeration",
    tagline: "See inside without opening the door",
    description:
      "A 36-inch counter-depth French-door refrigerator with internal AI cameras, four independent climate zones, and a 21-inch interactive glass panel.",
    price: 6499,
    energyRating: "A+++",
    finish: ["Brushed Titanium", "Obsidian Black", "Arctic White"],
    features: [
      "Internal AI cameras with food-recognition inventory",
      "4 independent humidity & temperature zones",
      "21\" interactive smart glass display",
      "Voice + app control, auto-reorder integration",
    ],
    specs: {
      Capacity: "26.8 cu. ft.",
      Dimensions: "36\" W x 70\" H x 29\" D",
      Connectivity: "Wi-Fi 6, Matter, Bluetooth 5.3",
      Warranty: "5-year smart systems warranty",
    },
    accent: "#3fd0c9",
    image: categoryImage("refrigeration"),
  },
  {
    id: "atl-fridge-rs500",
    name: "RS500 Column Refrigerator",
    categorySlug: "refrigeration",
    tagline: "Modular columns, seamless panels",
    description:
      "Fully integrated column refrigeration designed to pair with matching freezer columns behind custom cabinetry panels.",
    price: 5299,
    energyRating: "A++",
    finish: ["Panel-Ready", "Brushed Titanium"],
    features: [
      "Panel-ready integrated design",
      "Triple-zone climate control",
      "Self-closing soft-glide drawers",
      "Auto-humidity crisper sensing",
    ],
    specs: {
      Capacity: "16.2 cu. ft.",
      Dimensions: "30\" W x 84\" H x 24\" D",
      Connectivity: "Wi-Fi 6, Matter",
      Warranty: "5-year smart systems warranty",
    },
    accent: "#3fd0c9",
    image: categoryImage("refrigeration"),
  },
  {
    id: "atl-induction-ic76",
    name: "IC76 Induction Cooktop",
    categorySlug: "induction-cooking",
    tagline: "Five zones, one intelligent surface",
    description:
      "A 36-inch flush-mount induction cooktop with auto pan-detection, flexible bridge zones, and precision simmer control to 1°.",
    price: 3199,
    energyRating: "A+++",
    finish: ["Obsidian Glass"],
    features: [
      "Auto pan-size detection across 5 zones",
      "Bridge-zone flexibility for large cookware",
      "Precision simmer in 1° increments",
      "Auto pan-empty & boil-dry shutoff",
    ],
    specs: {
      Zones: "5 induction zones, 2 bridgeable",
      Dimensions: "36\" W x 2.1\" H x 21\" D",
      Connectivity: "Wi-Fi 6, app recipe sync",
      Warranty: "3-year smart systems warranty",
    },
    accent: "#ff7849",
    image: categoryImage("induction-cooking"),
  },
  {
    id: "atl-induction-ic48",
    name: "IC48 Compact Induction Cooktop",
    categorySlug: "induction-cooking",
    tagline: "Full power in a compact footprint",
    description:
      "A 30-inch four-zone induction cooktop built for smaller kitchens without compromising on responsiveness or precision.",
    price: 2399,
    energyRating: "A++",
    finish: ["Obsidian Glass", "Brushed Titanium Frame"],
    features: [
      "4 independent induction zones",
      "Touch + voice activation",
      "Child-lock with auto-detect",
      "Residual heat indicators",
    ],
    specs: {
      Zones: "4 induction zones",
      Dimensions: "30\" W x 2.1\" H x 21\" D",
      Connectivity: "Wi-Fi 6",
      Warranty: "3-year smart systems warranty",
    },
    accent: "#ff7849",
    image: categoryImage("induction-cooking"),
  },
  {
    id: "atl-oven-bo90",
    name: "BO90 Combi-Steam Oven",
    categorySlug: "built-in-ovens",
    tagline: "Steam, convection, and AI doneness sensing",
    description:
      "A 30-inch combination steam and convection oven with a core temperature probe and camera-based doneness recognition for over 90 dishes.",
    price: 4899,
    energyRating: "A+++",
    finish: ["Brushed Titanium", "Obsidian Black"],
    features: [
      "AI camera doneness recognition for 90+ dishes",
      "Combi steam + convection, 30 auto-programs",
      "Wireless core temperature probe",
      "Self-clean pyrolytic + steam descale",
    ],
    specs: {
      Capacity: "4.9 cu. ft.",
      Dimensions: "30\" W x 24\" H x 24\" D",
      Connectivity: "Wi-Fi 6, app remote start",
      Warranty: "5-year smart systems warranty",
    },
    accent: "#3fd0c9",
    image: categoryImage("built-in-ovens"),
  },
  {
    id: "atl-oven-bo60",
    name: "BO60 Single Wall Oven",
    categorySlug: "built-in-ovens",
    tagline: "Reliable precision, smart from the start",
    description:
      "A 30-inch single wall oven with 12 cooking modes, true European convection, and remote preheat from the Atlanteos app.",
    price: 3299,
    energyRating: "A++",
    finish: ["Brushed Titanium", "Arctic White"],
    features: [
      "12 cooking modes with true convection",
      "Remote preheat & monitoring",
      "Triple-pane cool-touch door",
      "Sabbath mode compatible",
    ],
    specs: {
      Capacity: "5.1 cu. ft.",
      Dimensions: "30\" W x 28\" H x 24\" D",
      Connectivity: "Wi-Fi 6",
      Warranty: "4-year smart systems warranty",
    },
    accent: "#3fd0c9",
    image: categoryImage("built-in-ovens"),
  },
  {
    id: "atl-hood-rh48",
    name: "RH48 Adaptive Range Hood",
    categorySlug: "range-hoods",
    tagline: "Air quality sensed, not guessed",
    description:
      "A 48-inch under-cabinet hood with onboard air-quality sensors that auto-adjust extraction across 4 speeds, plus whisper-quiet brushless motors.",
    price: 2199,
    energyRating: "A++",
    finish: ["Brushed Titanium", "Obsidian Black"],
    features: [
      "Real-time air-quality auto-speed control",
      "Brushless motor, 1.2 sone at low speed",
      "Auto-delay shutoff after cooking ends",
      "Recirculating or ducted configurations",
    ],
    specs: {
      Airflow: "650 CFM peak",
      Dimensions: "48\" W x 8\" H x 19\" D",
      Connectivity: "Wi-Fi 6",
      Warranty: "3-year smart systems warranty",
    },
    accent: "#8a8fff",
    image: categoryImage("range-hoods"),
  },
  {
    id: "atl-dish-dw24",
    name: "DW24 Sensing Dishwasher",
    categorySlug: "dishwashers",
    tagline: "Reads the load, saves the water",
    description:
      "A fully integrated 24-inch dishwasher with turbidity sensing that tailors every wash to the exact soil level, cutting water use by up to 40%.",
    price: 1899,
    energyRating: "A+++",
    finish: ["Panel-Ready", "Brushed Titanium"],
    features: [
      "Turbidity sensing, auto-cycle selection",
      "42 dB ultra-quiet operation",
      "Third rack for utensils & small items",
      "Auto-dispense detergent & rinse aid sensing",
    ],
    specs: {
      Capacity: "16 place settings",
      Dimensions: "24\" W x 34\" H x 24\" D",
      Connectivity: "Wi-Fi 6, cycle-end notifications",
      Warranty: "4-year smart systems warranty",
    },
    accent: "#3fd0c9",
    image: categoryImage("dishwashers"),
  },
  {
    id: "atl-wine-wc48",
    name: "WC48 Dual-Zone Wine Column",
    categorySlug: "wine-beverage",
    tagline: "Two climates, zero vibration",
    description:
      "A 24-inch dual-zone wine column with vibration-free compressor cooling, UV-filtered glass, and humidity control tuned for long-term cellaring.",
    price: 3699,
    energyRating: "A++",
    finish: ["Panel-Ready", "Obsidian Black"],
    features: [
      "Dual independently controlled zones",
      "Vibration-free compressor cooling",
      "UV-filtered tempered glass door",
      "Humidity-controlled cellaring mode",
    ],
    specs: {
      Capacity: "92 bottles",
      Dimensions: "24\" W x 84\" H x 24\" D",
      Connectivity: "Wi-Fi 6, zone alerts",
      Warranty: "4-year smart systems warranty",
    },
    accent: "#c084fc",
    image: categoryImage("wine-beverage"),
  },
];

export function getProductsByCategory(slug: string): Product[] {
  return products.filter((p) => p.categorySlug === slug);
}
