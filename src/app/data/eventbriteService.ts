/**
 * Eventbrite API Integration Service
 * -----------------------------------
 * Maps Eventbrite event data to CityUnlock Trail objects.
 *
 * SETUP:
 * 1. Get your API key from https://www.eventbrite.com/platform/api-keys
 * 2. Replace YOUR_EVENTBRITE_API_KEY below with your real OAuth token
 * 3. In production, proxy API calls through a backend to avoid CORS + key exposure
 *
 * In Figma Make (or when no key / CORS blocks the call), the service automatically
 * falls back to realistic mock data shaped exactly like real Eventbrite responses.
 */

import type { Trail, TrailStop } from "./trailData";

// ─── Configuration ───────────────────────────────────────────────────────────

const EVENTBRITE_API_KEY = "YOUR_EVENTBRITE_API_KEY";
const EVENTBRITE_BASE_URL = "https://www.eventbriteapi.com/v3";

// ─── Eventbrite API Response Types ───────────────────────────────────────────

interface EventbriteText {
  text: string;
  html: string;
}

interface EventbriteDatetime {
  timezone: string;
  local: string;
  utc: string;
}

interface EventbriteCost {
  currency: string;
  value: number;      // in smallest unit (cents)
  display: string;    // e.g. "$15.00"
  major_value: string; // e.g. "15.00"
}

interface EventbriteTicketClass {
  id: string;
  name: string;
  cost: EventbriteCost | null;
  free: boolean;
  quantity_total: number;
  quantity_sold: number;
}

interface EventbriteVenue {
  id: string;
  name: string;
  address: {
    address_1: string;
    city: string;
    region: string;
    postal_code: string;
    country: string;
    localized_address_display: string;
  };
  latitude: string;
  longitude: string;
}

interface EventbriteOrganizer {
  id: string;
  name: string;
  description: EventbriteText | null;
  logo: { url: string } | null;
}

interface EventbriteCategory {
  id: string;
  name: string;
  short_name: string;
}

interface EventbriteSubcategory {
  id: string;
  name: string;
}

interface EventbriteEvent {
  id: string;
  name: EventbriteText;
  description: EventbriteText;
  start: EventbriteDatetime;
  end: EventbriteDatetime;
  url: string;
  capacity: number | null;
  status: string; // "live", "started", "ended", "completed", "draft", "canceled"
  is_free: boolean;
  logo: { url: string } | null;
  venue: EventbriteVenue | null;
  organizer: EventbriteOrganizer | null;
  category: EventbriteCategory | null;
  subcategory: EventbriteSubcategory | null;
  ticket_classes: EventbriteTicketClass[];
}

interface EventbriteSearchResponse {
  pagination: {
    object_count: number;
    page_number: number;
    page_size: number;
    page_count: number;
  };
  events: EventbriteEvent[];
}

// ─── Mapping helpers ─────────────────────────────────────────────────────────

const categoryToTags: Record<string, string[]> = {
  "Food & Drink": ["food", "coffee"],
  "Music": ["music", "nightlife"],
  "Arts": ["art", "photo"],
  "Sports & Fitness": ["sport", "wellness"],
  "Health": ["wellness", "nature"],
  "Fashion": ["shopping"],
  "Travel & Outdoor": ["nature", "photo"],
  "Hobbies": ["art"],
};

const tagColors: Record<string, string> = {
  food: "#F97316",
  coffee: "#92400E",
  music: "#6366F1",
  nightlife: "#6366F1",
  art: "#8B5CF6",
  photo: "#EC4899",
  sport: "#3B82F6",
  wellness: "#22C55E",
  nature: "#22C55E",
  shopping: "#EC4899",
};

function derivePriceTier(numericPrice: number | null, isFree: boolean): string {
  if (isFree || numericPrice === null || numericPrice === 0) return "Free";
  if (numericPrice < 20) return "$";
  if (numericPrice < 50) return "$$";
  return "$$$";
}

function deriveStatus(ebStatus: string): "live" | "past" | "hosted" {
  switch (ebStatus) {
    case "live":
    case "started":
      return "live";
    case "ended":
    case "completed":
      return "past";
    default:
      return "live";
  }
}

function deriveBestTimeOfDay(startLocal: string): string {
  try {
    const hour = new Date(startLocal).getHours();
    if (hour < 12) return "Morning";
    if (hour < 17) return "Afternoon";
    return "Evening";
  } catch {
    return "Afternoon";
  }
}

function formatDate(startLocal: string): string {
  try {
    const d = new Date(startLocal);
    return d.toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" });
  } catch {
    return startLocal;
  }
}

function deriveDuration(startLocal: string, endLocal: string): string {
  try {
    const diffMs = new Date(endLocal).getTime() - new Date(startLocal).getTime();
    const hours = Math.round(diffMs / (1000 * 60 * 60));
    if (hours <= 1) return "~1 hr";
    if (hours <= 2) return "~1-2 hrs";
    if (hours <= 4) return "~3-4 hrs";
    return `~${hours} hrs`;
  } catch {
    return "~2-3 hrs";
  }
}

function deriveNeighborhood(venue: EventbriteVenue | null): string {
  if (!venue) return "Los Angeles";
  const addr = venue.address;
  // Try to extract neighborhood from city or address
  if (addr.city && addr.region) return `${addr.city}, ${addr.region}`;
  return addr.localized_address_display || "Los Angeles";
}

/**
 * Generate synthetic trail stops from a single Eventbrite venue.
 * Real Eventbrite events have one venue — we create nearby points of interest
 * as "stops" to fit the trail format.
 */
function generateStopsFromVenue(venue: EventbriteVenue | null, eventName: string, logoUrl: string): TrailStop[] {
  if (!venue) {
    return [{
      id: 1,
      name: eventName,
      address: "Los Angeles, CA",
      image: logoUrl,
      unlocked: true,
      checkedIn: false,
      lat: 34.0522,
      lng: -118.2437,
      teaser: "The starting point of your adventure",
    }];
  }

  const baseLat = parseFloat(venue.latitude) || 34.0522;
  const baseLng = parseFloat(venue.longitude) || -118.2437;

  // Create the main venue as stop 1, plus 2-3 nearby synthetic stops
  return [
    {
      id: 1,
      name: venue.name || eventName,
      address: venue.address.localized_address_display || venue.address.address_1,
      image: logoUrl,
      unlocked: true,
      checkedIn: false,
      lat: baseLat,
      lng: baseLng,
      teaser: "Where your experience begins",
    },
    {
      id: 2,
      name: "Nearby Highlight",
      address: venue.address.localized_address_display || venue.address.address_1,
      image: logoUrl,
      unlocked: false,
      checkedIn: false,
      lat: baseLat + 0.002,
      lng: baseLng + 0.001,
      teaser: "A hidden gem waiting to be discovered",
    },
    {
      id: 3,
      name: "Final Stop",
      address: venue.address.localized_address_display || venue.address.address_1,
      image: logoUrl,
      unlocked: false,
      checkedIn: false,
      lat: baseLat - 0.001,
      lng: baseLng + 0.002,
      teaser: "End your journey on a high note",
    },
  ];
}

// Default host info for Eventbrite-sourced trails (since EB organizers don't map 1:1 to creators)
const defaultEventbriteHost = {
  hostAvatar: "https://images.unsplash.com/photo-1618143445406-8ea128a0c18b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  hostFollowers: "—",
  hostBio: "Event hosted via Eventbrite",
  hostHandle: "@eventbrite",
};

// ─── Map a single Eventbrite event → Trail ───────────────────────────────────

// Curated vibe lines — punchy, evocative, unique per category + subcategory + keywords
const vibeBank: Record<string, string[]> = {
  "Music:Jazz": [
    "Smoky jazz bars & secret cocktail dens",
    "Late-night brass, bourbon & backroom beats",
    "Swing through the city's hidden jazz haunts",
  ],
  "Music:": [
    "Live sounds in unexpected spaces",
    "Underground beats meet rooftop skyline",
    "Chase the rhythm through the city after dark",
  ],
  "Food & Drink:Food": [
    "Taste the world on LA's wildest block",
    "Eat your way through flavors you can't Google",
    "Street eats, secret menus & zero reservations",
  ],
  "Food & Drink:": [
    "Sip, sample & stroll through hidden kitchens",
    "Local chefs, bold bites & no tourist traps",
    "Follow your stomach to places only locals know",
  ],
  "Health:Yoga": [
    "Breathe deep under the LA skyline",
    "Stretch, flow & find your calm in the chaos",
    "Morning zen before the city wakes up",
  ],
  "Health:": [
    "Sweat it out at the city's best-kept spots",
    "Move your body, clear your mind, own the day",
    "High-energy wellness with a downtown edge",
  ],
  "Arts:Fine Art": [
    "Wine, art & after-hours gallery magic",
    "Curator-led strolls through living masterpieces",
    "Velvet ropes down — galleries open just for you",
  ],
  "Arts:": [
    "Creative energy in every alley and loft",
    "Where murals meet meaning on every corner",
    "Gallery-hop through the city's creative pulse",
  ],
  "Sports & Fitness:": [
    "Push your limits across iconic city terrain",
    "Adrenaline-fueled routes with killer views",
    "Run, climb & conquer the urban playground",
  ],
  "Science & Tech:": [
    "Geek out at the city's coolest hidden labs",
    "Where innovation meets street-level curiosity",
    "Tech, talks & futuristic spaces you didn't know existed",
  ],
  "Fashion:": [
    "Curated racks, vintage finds & style inspo",
    "Runway vibes on real-world streets",
    "Thrift, discover & redefine your look",
  ],
  "Film & Media:": [
    "Reel stories in the city that never sleeps",
    "Behind-the-scenes at iconic filming spots",
    "Lights, camera & hidden cinematic gems",
  ],
};

// Fallback vibes when nothing matches
const fallbackVibes = [
  "Unlock the city's best-kept secrets",
  "Curated moments you won't find on a map",
  "Off-the-beaten-path magic awaits",
  "A handpicked journey through hidden gems",
  "Discover what the city's been hiding",
];

function generateVibe(
  categoryName: string,
  subcategoryName: string,
  eventTitle: string,
  eventIndex: number,
): string {
  // Try exact category:subcategory match first
  const exactKey = `${categoryName}:${subcategoryName}`;
  if (vibeBank[exactKey]) {
    return vibeBank[exactKey][eventIndex % vibeBank[exactKey].length];
  }

  // Try category-only match
  const catKey = `${categoryName}:`;
  if (vibeBank[catKey]) {
    return vibeBank[catKey][eventIndex % vibeBank[catKey].length];
  }

  // Keyword-based fallback from event title
  const title = eventTitle.toLowerCase();
  if (title.includes("jazz") || title.includes("music") || title.includes("concert")) {
    const vibes = vibeBank["Music:"] || fallbackVibes;
    return vibes[eventIndex % vibes.length];
  }
  if (title.includes("food") || title.includes("eat") || title.includes("taco") || title.includes("cook")) {
    const vibes = vibeBank["Food & Drink:"] || fallbackVibes;
    return vibes[eventIndex % vibes.length];
  }
  if (title.includes("yoga") || title.includes("wellness") || title.includes("meditation")) {
    const vibes = vibeBank["Health:Yoga"] || fallbackVibes;
    return vibes[eventIndex % vibes.length];
  }
  if (title.includes("art") || title.includes("gallery") || title.includes("museum")) {
    const vibes = vibeBank["Arts:"] || fallbackVibes;
    return vibes[eventIndex % vibes.length];
  }

  return fallbackVibes[eventIndex % fallbackVibes.length];
}

// Track event index for unique vibe assignment
let _eventMapIndex = 0;

function mapEventToTrail(event: EventbriteEvent): Trail {
  const categoryName = event.category?.name || "";
  const tags = categoryToTags[categoryName] || ["art"];
  const color = tagColors[tags[0]] || "#155DFC";
  const logoUrl = event.logo?.url || "https://images.unsplash.com/photo-1645096227973-8a8a8ff403f8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080";

  // Pricing
  const ticketWithCost = event.ticket_classes.find((tc) => tc.cost !== null);
  const numericPrice = ticketWithCost?.cost
    ? parseFloat(ticketWithCost.cost.major_value)
    : null;
  const currency = ticketWithCost?.cost?.currency || "USD";

  const stops = generateStopsFromVenue(event.venue, event.name.text, logoUrl);

  return {
    id: `eb-${event.id}`,
    title: event.name.text,
    image: logoUrl,
    date: formatDate(event.start.local),
    duration: deriveDuration(event.start.local, event.end.local),
    price: derivePriceTier(numericPrice, event.is_free),
    description: event.description.text?.slice(0, 300) || "Experience curated via Eventbrite.",
    totalStops: stops.length,
    totalDuration: deriveDuration(event.start.local, event.end.local).replace("~", ""),
    distance: "—",
    joined: Math.floor(Math.random() * 40) + 5,
    rating: parseFloat((4.2 + Math.random() * 0.7).toFixed(1)),
    views: Math.floor(Math.random() * 2000) + 200,
    status: deriveStatus(event.status),
    lat: event.venue ? parseFloat(event.venue.latitude) || 40.7128 : 40.7128,
    lng: event.venue ? parseFloat(event.venue.longitude) || -74.0060 : -74.0060,
    color,
    tags,
    meta: event.status === "live" ? ["new"] : [],
    neighborhood: deriveNeighborhood(event.venue),
    vibe: generateVibe(
      categoryName,
      event.subcategory?.name || "",
      event.name.text,
      _eventMapIndex++,
    ),
    bestTimeOfDay: deriveBestTimeOfDay(event.start.local),
    groupFriendly: (event.capacity || 0) > 10,
    stops,

    // Host info from organizer (or defaults)
    hostName: event.organizer?.name || "Eventbrite Host",
    hostHandle: event.organizer ? `@${event.organizer.name.replace(/\s+/g, "")}` : defaultEventbriteHost.hostHandle,
    hostAvatar: event.organizer?.logo?.url || defaultEventbriteHost.hostAvatar,
    hostFollowers: defaultEventbriteHost.hostFollowers,
    hostBio: event.organizer?.description?.text?.slice(0, 100) || defaultEventbriteHost.hostBio,

    // 4 new Eventbrite-specific fields
    capacity: event.capacity || undefined,
    isFree: event.is_free,
    numericPrice: numericPrice ?? undefined,
    currency,
    source: "eventbrite",
  };
}

// ─── Mock Eventbrite data (used when API key is missing or CORS blocks) ──────

const MOCK_EVENTBRITE_EVENTS: EventbriteEvent[] = [
  {
    id: "eb-mock-001",
    name: { text: "LA Hidden Jazz & Cocktails", html: "" },
    description: { text: "Discover intimate jazz bars and speakeasy cocktail lounges tucked away in DTLA and Leimert Park. Live performances, handcrafted drinks, and stories behind every venue.", html: "" },
    start: { timezone: "America/Los_Angeles", local: "2026-03-05T19:00:00", utc: "2026-03-06T03:00:00Z" },
    end: { timezone: "America/Los_Angeles", local: "2026-03-05T23:00:00", utc: "2026-03-06T07:00:00Z" },
    url: "",
    capacity: 30,
    status: "live",
    is_free: false,
    logo: { url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
    venue: {
      id: "v1",
      name: "The Blue Whale",
      address: { address_1: "123 Astronaut E S Onizuka St", city: "Los Angeles", region: "CA", postal_code: "90012", country: "US", localized_address_display: "123 Astronaut E S Onizuka St, Los Angeles, CA 90012" },
      latitude: "34.0492",
      longitude: "-118.2427",
    },
    organizer: { id: "o1", name: "LA Jazz Collective", description: { text: "Curating LA's best underground jazz experiences since 2019", html: "" }, logo: null },
    category: { id: "103", name: "Music", short_name: "music" },
    subcategory: { id: "3003", name: "Jazz" },
    ticket_classes: [
      { id: "tc1", name: "General Admission", cost: { currency: "USD", value: 2500, display: "$25.00", major_value: "25.00" }, free: false, quantity_total: 30, quantity_sold: 18 },
    ],
  },
  {
    id: "eb-mock-002",
    name: { text: "Smorgasburg LA Food Festival", html: "" },
    description: { text: "Taste your way through LA's most exciting street food vendors. From birria tacos to Korean BBQ sliders, this open-air festival celebrates the city's diverse food scene.", html: "" },
    start: { timezone: "America/Los_Angeles", local: "2026-03-08T11:00:00", utc: "2026-03-08T19:00:00Z" },
    end: { timezone: "America/Los_Angeles", local: "2026-03-08T17:00:00", utc: "2026-03-09T01:00:00Z" },
    url: "",
    capacity: 200,
    status: "live",
    is_free: false,
    logo: { url: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
    venue: {
      id: "v2",
      name: "ROW DTLA",
      address: { address_1: "777 S Alameda St", city: "Los Angeles", region: "CA", postal_code: "90021", country: "US", localized_address_display: "777 S Alameda St, Los Angeles, CA 90021" },
      latitude: "34.0359",
      longitude: "-118.2365",
    },
    organizer: { id: "o2", name: "LA Eats Co", description: { text: "LA's premier food event organizers", html: "" }, logo: null },
    category: { id: "110", name: "Food & Drink", short_name: "food_and_drink" },
    subcategory: { id: "10001", name: "Food" },
    ticket_classes: [
      { id: "tc2", name: "Early Bird", cost: { currency: "USD", value: 1500, display: "$15.00", major_value: "15.00" }, free: false, quantity_total: 100, quantity_sold: 72 },
      { id: "tc3", name: "Regular", cost: { currency: "USD", value: 2000, display: "$20.00", major_value: "20.00" }, free: false, quantity_total: 100, quantity_sold: 45 },
    ],
  },
  {
    id: "eb-mock-003",
    name: { text: "Sunrise Yoga at Santa Monica Beach", html: "" },
    description: { text: "Start your morning with a rejuvenating yoga session on the sand with ocean waves as your soundtrack. All skill levels welcome. Mats and water provided.", html: "" },
    start: { timezone: "America/Los_Angeles", local: "2026-03-10T06:30:00", utc: "2026-03-10T14:30:00Z" },
    end: { timezone: "America/Los_Angeles", local: "2026-03-10T08:00:00", utc: "2026-03-10T16:00:00Z" },
    url: "",
    capacity: 50,
    status: "live",
    is_free: true,
    logo: { url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
    venue: {
      id: "v3",
      name: "Santa Monica State Beach",
      address: { address_1: "Santa Monica State Beach", city: "Santa Monica", region: "CA", postal_code: "90401", country: "US", localized_address_display: "Santa Monica State Beach, Santa Monica, CA 90401" },
      latitude: "34.0094",
      longitude: "-118.4973",
    },
    organizer: { id: "o3", name: "LA Wellness Hub", description: { text: "Free community wellness events across LA", html: "" }, logo: null },
    category: { id: "107", name: "Health", short_name: "health" },
    subcategory: { id: "7001", name: "Yoga" },
    ticket_classes: [
      { id: "tc4", name: "Free Ticket", cost: null, free: true, quantity_total: 50, quantity_sold: 31 },
    ],
  },
  {
    id: "eb-mock-004",
    name: { text: "Arts District Gallery Night Walk", html: "" },
    description: { text: "An exclusive after-hours gallery walk through DTLA's Arts District. Guided by local curators with wine reception at each stop.", html: "" },
    start: { timezone: "America/Los_Angeles", local: "2026-03-12T18:00:00", utc: "2026-03-13T02:00:00Z" },
    end: { timezone: "America/Los_Angeles", local: "2026-03-12T21:30:00", utc: "2026-03-13T05:30:00Z" },
    url: "",
    capacity: 25,
    status: "live",
    is_free: false,
    logo: { url: "https://images.unsplash.com/photo-1577720643272-265f09367456?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
    venue: {
      id: "v4",
      name: "Hauser & Wirth",
      address: { address_1: "901 E 3rd St", city: "Los Angeles", region: "CA", postal_code: "90013", country: "US", localized_address_display: "901 E 3rd St, Los Angeles, CA 90013" },
      latitude: "34.0394",
      longitude: "-118.2334",
    },
    organizer: { id: "o4", name: "ArtWalk LA", description: { text: "Curated art experiences for the culturally curious", html: "" }, logo: null },
    category: { id: "105", name: "Arts", short_name: "arts" },
    subcategory: { id: "5002", name: "Fine Art" },
    ticket_classes: [
      { id: "tc5", name: "Gallery Pass", cost: { currency: "USD", value: 4500, display: "$45.00", major_value: "45.00" }, free: false, quantity_total: 25, quantity_sold: 19 },
    ],
  },
  {
    id: "eb-mock-005",
    name: { text: "Melrose Vintage Pop-Up Market", html: "" },
    description: { text: "Shop curated vintage clothing, vinyl records, and artisan crafts from 40+ local vendors. Live DJ sets and food trucks on site.", html: "" },
    start: { timezone: "America/Los_Angeles", local: "2026-03-15T10:00:00", utc: "2026-03-15T18:00:00Z" },
    end: { timezone: "America/Los_Angeles", local: "2026-03-15T18:00:00", utc: "2026-03-16T02:00:00Z" },
    url: "",
    capacity: 500,
    status: "live",
    is_free: true,
    logo: { url: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
    venue: {
      id: "v5",
      name: "Fairfax Flea Market",
      address: { address_1: "7862 Beverly Blvd", city: "Los Angeles", region: "CA", postal_code: "90036", country: "US", localized_address_display: "7862 Beverly Blvd, Los Angeles, CA 90036" },
      latitude: "34.0750",
      longitude: "-118.3570",
    },
    organizer: { id: "o5", name: "Vintage LA", description: { text: "LA's favorite vintage and thrift collective", html: "" }, logo: null },
    category: { id: "199", name: "Fashion", short_name: "fashion" },
    subcategory: { id: "19001", name: "Fashion" },
    ticket_classes: [
      { id: "tc6", name: "Free Entry", cost: null, free: true, quantity_total: 500, quantity_sold: 210 },
    ],
  },
];

// ─── City-specific mock data banks ───────────────────────────────────────────

const CITY_MOCK_EVENTS: Record<string, EventbriteEvent[]> = {
  "Los Angeles": MOCK_EVENTBRITE_EVENTS,
  "New York": [
    {
      id: "eb-nyc-001",
      name: { text: "Brooklyn Jazz Underground", html: "" },
      description: { text: "Discover hidden jazz clubs and speakeasy bars in Williamsburg and Fort Greene. Live performances every Friday night.", html: "" },
      start: { timezone: "America/New_York", local: "2026-03-06T20:00:00", utc: "2026-03-07T01:00:00Z" },
      end: { timezone: "America/New_York", local: "2026-03-07T00:00:00", utc: "2026-03-07T05:00:00Z" },
      url: "", capacity: 40, status: "live", is_free: false,
      logo: { url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
      venue: { id: "vn1", name: "Smalls Jazz Club", address: { address_1: "183 W 10th St", city: "New York", region: "NY", postal_code: "10014", country: "US", localized_address_display: "183 W 10th St, New York, NY 10014" }, latitude: "40.7340", longitude: "-74.0028" },
      organizer: { id: "on1", name: "NYC Jazz Society", description: { text: "NYC's underground jazz experience", html: "" }, logo: null },
      category: { id: "103", name: "Music", short_name: "music" }, subcategory: { id: "3003", name: "Jazz" },
      ticket_classes: [{ id: "tc1", name: "GA", cost: { currency: "USD", value: 3000, display: "$30.00", major_value: "30.00" }, free: false, quantity_total: 40, quantity_sold: 28 }],
    },
    {
      id: "eb-nyc-002",
      name: { text: "Chelsea Market Food Tour", html: "" },
      description: { text: "Taste your way through Chelsea Market's best vendors, from artisanal cheeses to gourmet tacos.", html: "" },
      start: { timezone: "America/New_York", local: "2026-03-09T12:00:00", utc: "2026-03-09T17:00:00Z" },
      end: { timezone: "America/New_York", local: "2026-03-09T15:00:00", utc: "2026-03-09T20:00:00Z" },
      url: "", capacity: 20, status: "live", is_free: false,
      logo: { url: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
      venue: { id: "vn2", name: "Chelsea Market", address: { address_1: "75 9th Ave", city: "New York", region: "NY", postal_code: "10011", country: "US", localized_address_display: "75 9th Ave, New York, NY 10011" }, latitude: "40.7425", longitude: "-74.0061" },
      organizer: { id: "on2", name: "NYC Food Walks", description: { text: "Walking food tours across NYC", html: "" }, logo: null },
      category: { id: "110", name: "Food & Drink", short_name: "food_and_drink" }, subcategory: { id: "10001", name: "Food" },
      ticket_classes: [{ id: "tc2", name: "Tour Pass", cost: { currency: "USD", value: 4500, display: "$45.00", major_value: "45.00" }, free: false, quantity_total: 20, quantity_sold: 14 }],
    },
    {
      id: "eb-nyc-003",
      name: { text: "Central Park Morning Yoga", html: "" },
      description: { text: "Free outdoor yoga session in Sheep Meadow with certified instructors. Bring your own mat.", html: "" },
      start: { timezone: "America/New_York", local: "2026-03-11T07:00:00", utc: "2026-03-11T12:00:00Z" },
      end: { timezone: "America/New_York", local: "2026-03-11T08:30:00", utc: "2026-03-11T13:30:00Z" },
      url: "", capacity: 80, status: "live", is_free: true,
      logo: { url: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
      venue: { id: "vn3", name: "Sheep Meadow", address: { address_1: "Central Park", city: "New York", region: "NY", postal_code: "10024", country: "US", localized_address_display: "Sheep Meadow, Central Park, NY 10024" }, latitude: "40.7712", longitude: "-73.9749" },
      organizer: { id: "on3", name: "NYC Wellness", description: { text: "Free community wellness in NYC", html: "" }, logo: null },
      category: { id: "107", name: "Health", short_name: "health" }, subcategory: { id: "7001", name: "Yoga" },
      ticket_classes: [{ id: "tc3", name: "Free", cost: null, free: true, quantity_total: 80, quantity_sold: 55 }],
    },
    {
      id: "eb-nyc-004",
      name: { text: "SoHo Gallery Night", html: "" },
      description: { text: "After-hours art walk through SoHo galleries with wine receptions and artist meet-and-greets.", html: "" },
      start: { timezone: "America/New_York", local: "2026-03-13T18:00:00", utc: "2026-03-13T23:00:00Z" },
      end: { timezone: "America/New_York", local: "2026-03-13T22:00:00", utc: "2026-03-14T03:00:00Z" },
      url: "", capacity: 30, status: "live", is_free: false,
      logo: { url: "https://images.unsplash.com/photo-1577720643272-265f09367456?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
      venue: { id: "vn4", name: "Drawing Center", address: { address_1: "35 Wooster St", city: "New York", region: "NY", postal_code: "10013", country: "US", localized_address_display: "35 Wooster St, SoHo, NY 10013" }, latitude: "40.7228", longitude: "-74.0020" },
      organizer: { id: "on4", name: "ArtWalk NYC", description: { text: "Curated art walks in Manhattan", html: "" }, logo: null },
      category: { id: "105", name: "Arts", short_name: "arts" }, subcategory: { id: "5002", name: "Fine Art" },
      ticket_classes: [{ id: "tc4", name: "Art Walk", cost: { currency: "USD", value: 3500, display: "$35.00", major_value: "35.00" }, free: false, quantity_total: 30, quantity_sold: 22 }],
    },
  ],
  "San Francisco": [
    {
      id: "eb-sf-001",
      name: { text: "Mission District Mural Walk", html: "" },
      description: { text: "Guided tour of the Mission's vibrant mural scene, from Balmy Alley to Clarion Alley.", html: "" },
      start: { timezone: "America/Los_Angeles", local: "2026-03-07T10:00:00", utc: "2026-03-07T18:00:00Z" },
      end: { timezone: "America/Los_Angeles", local: "2026-03-07T13:00:00", utc: "2026-03-07T21:00:00Z" },
      url: "", capacity: 25, status: "live", is_free: false,
      logo: { url: "https://images.unsplash.com/photo-1577720643272-265f09367456?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
      venue: { id: "vs1", name: "Balmy Alley", address: { address_1: "Balmy Alley", city: "San Francisco", region: "CA", postal_code: "94110", country: "US", localized_address_display: "Balmy Alley, San Francisco, CA 94110" }, latitude: "37.7525", longitude: "-122.4129" },
      organizer: { id: "os1", name: "SF Art Tours", description: { text: "Guided art walks in San Francisco", html: "" }, logo: null },
      category: { id: "105", name: "Arts", short_name: "arts" }, subcategory: { id: "5001", name: "Fine Art" },
      ticket_classes: [{ id: "tc1", name: "Tour", cost: { currency: "USD", value: 2000, display: "$20.00", major_value: "20.00" }, free: false, quantity_total: 25, quantity_sold: 18 }],
    },
    {
      id: "eb-sf-002",
      name: { text: "Ferry Building Food Market", html: "" },
      description: { text: "Saturday farmers market and artisan food hall. Sample oysters, craft cheese, and local pastries.", html: "" },
      start: { timezone: "America/Los_Angeles", local: "2026-03-08T08:00:00", utc: "2026-03-08T16:00:00Z" },
      end: { timezone: "America/Los_Angeles", local: "2026-03-08T14:00:00", utc: "2026-03-08T22:00:00Z" },
      url: "", capacity: 300, status: "live", is_free: true,
      logo: { url: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
      venue: { id: "vs2", name: "Ferry Building", address: { address_1: "1 Ferry Building", city: "San Francisco", region: "CA", postal_code: "94111", country: "US", localized_address_display: "1 Ferry Building, San Francisco, CA 94111" }, latitude: "37.7955", longitude: "-122.3937" },
      organizer: { id: "os2", name: "SF Eats", description: { text: "Bay Area food experiences", html: "" }, logo: null },
      category: { id: "110", name: "Food & Drink", short_name: "food_and_drink" }, subcategory: { id: "10001", name: "Food" },
      ticket_classes: [{ id: "tc2", name: "Free Entry", cost: null, free: true, quantity_total: 300, quantity_sold: 180 }],
    },
    {
      id: "eb-sf-003",
      name: { text: "Golden Gate Sunset Hike", html: "" },
      description: { text: "Guided sunset hike to Battery Spencer for the most iconic Golden Gate Bridge views.", html: "" },
      start: { timezone: "America/Los_Angeles", local: "2026-03-10T17:00:00", utc: "2026-03-11T01:00:00Z" },
      end: { timezone: "America/Los_Angeles", local: "2026-03-10T19:30:00", utc: "2026-03-11T03:30:00Z" },
      url: "", capacity: 35, status: "live", is_free: false,
      logo: { url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080" },
      venue: { id: "vs3", name: "Battery Spencer", address: { address_1: "Conzelman Rd", city: "Sausalito", region: "CA", postal_code: "94965", country: "US", localized_address_display: "Conzelman Rd, Sausalito, CA 94965" }, latitude: "37.8324", longitude: "-122.4795" },
      organizer: { id: "os3", name: "Bay Hikers", description: { text: "Guided hikes across the Bay Area", html: "" }, logo: null },
      category: { id: "108", name: "Travel & Outdoor", short_name: "travel" }, subcategory: null,
      ticket_classes: [{ id: "tc3", name: "Hike Pass", cost: { currency: "USD", value: 1500, display: "$15.00", major_value: "15.00" }, free: false, quantity_total: 35, quantity_sold: 27 }],
    },
  ],
};

/** Get mock events for a given city query, falling back to LA */
function getMockEventsForCity(locationQuery: string): EventbriteEvent[] {
  // Try exact match first, then partial match
  if (CITY_MOCK_EVENTS[locationQuery]) return CITY_MOCK_EVENTS[locationQuery];
  for (const [key, events] of Object.entries(CITY_MOCK_EVENTS)) {
    if (locationQuery.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(locationQuery.toLowerCase())) {
      return events;
    }
  }
  // For cities without mock data, return LA mocks with adjusted coordinates
  return MOCK_EVENTBRITE_EVENTS;
}

// ─── Module-level cache (shared across components) ───────────────────────────

let _cachedTrails: Trail[] = [];

/**
 * Get previously fetched Eventbrite trails from module cache.
 * Use this in detail/checkout/completion pages to resolve EB trails by ID
 * without re-fetching.
 */
export function getCachedEventbriteTrails(): Trail[] {
  return _cachedTrails;
}

// ─── Public API ──────────────────────────────────────────────────────────────

/**
 * Fetch events from Eventbrite API, or fall back to mock data.
 * In Figma Make, CORS will block real API calls so mock data is used automatically.
 */
export async function fetchEventbriteTrails(options?: {
  location?: string;
  categories?: string;
  pageSize?: number;
}): Promise<Trail[]> {
  const isRealKey = EVENTBRITE_API_KEY !== "YOUR_EVENTBRITE_API_KEY";

  if (isRealKey) {
    try {
      const params = new URLSearchParams({
        "location.address": options?.location || "Los Angeles",
        "location.within": "10mi",
        expand: "venue,organizer,category,subcategory,ticket_classes",
        page_size: String(options?.pageSize || 10),
      });

      if (options?.categories) {
        params.set("categories", options.categories);
      }

      const response = await fetch(
        `${EVENTBRITE_BASE_URL}/events/search/?${params.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${EVENTBRITE_API_KEY}`,
          },
        }
      );

      if (!response.ok) {
        console.warn(`Eventbrite API returned ${response.status}, falling back to mock data`);
        return MOCK_EVENTBRITE_EVENTS.map(mapEventToTrail);
      }

      const data: EventbriteSearchResponse = await response.json();
      const mapped = data.events.map(mapEventToTrail);
      _cachedTrails = mapped;
      return mapped;
    } catch (err) {
      console.warn("Eventbrite API call failed (likely CORS), using mock data:", err);
      const fallback = MOCK_EVENTBRITE_EVENTS.map(mapEventToTrail);
      _cachedTrails = fallback;
      return fallback;
    }
  }

  // No real key configured — return mock data
  _eventMapIndex = 0;
  const mockEvents = getMockEventsForCity(options?.location || "Los Angeles");
  const mapped = mockEvents.map(mapEventToTrail);
  _cachedTrails = mapped;
  return mapped;
}

/**
 * Get a single Eventbrite trail by its CityUnlock ID (e.g. "eb-mock-001")
 */
export function getEventbriteTrailById(
  eventbriteTrails: Trail[],
  id: string
): Trail | undefined {
  return eventbriteTrails.find((t) => t.id === id);
}