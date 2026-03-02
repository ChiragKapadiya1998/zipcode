import { useState, useEffect, useRef, useCallback } from "react";
import {
  ChevronLeft,
  MapPin,
  Clock,
  Plus,
  Trash2,
  Upload,
  Camera,
  X,
  ChevronRight,
  Image as ImageIcon,
  Video,
  Users,
  Tag,
  FileText,
  Sparkles,
  Eye,
  Calendar,
  Wand2,
  Loader2,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";
import { useNavigate } from "react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useUser } from "../data/userStore";
import type { Trail, TrailStop } from "../data/trailData";
import { getCityById } from "../data/cities";
import L from "leaflet";
import { showToast } from "./Toast";

const CATEGORY_TAGS = [
  { label: "Food", emoji: "🍔", tag: "food" },
  { label: "Coffee", emoji: "☕", tag: "coffee" },
  { label: "Art", emoji: "🎨", tag: "art" },
  { label: "Nature", emoji: "🌿", tag: "nature" },
  { label: "Nightlife", emoji: "🌙", tag: "nightlife" },
  { label: "Music", emoji: "🎵", tag: "music" },
  { label: "Photo", emoji: "📸", tag: "photo" },
  { label: "Sport", emoji: "💪", tag: "sport" },
  { label: "Shopping", emoji: "🛍️", tag: "shopping" },
  { label: "Wellness", emoji: "🧘", tag: "wellness" },
  { label: "Adventure", emoji: "⛰️", tag: "adventure" },
  { label: "Comics", emoji: "📚", tag: "comics" },
];

const VIBE_OPTIONS = [
  "Chill weekend vibes",
  "High-energy exploration",
  "Cultural deep dive",
  "Romantic & scenic",
  "Foodie paradise",
  "Hidden gems tour",
  "Family adventure",
  "Night out discovery",
];

const TIME_OPTIONS = ["Morning", "Afternoon", "Evening", "Anytime"];

const NEIGHBORHOOD_OPTIONS = [
  "SoHo", "Greenwich Village", "Williamsburg", "DUMBO", "Chelsea",
  "East Village", "Lower East Side", "Upper West Side", "Midtown",
  "Bushwick", "Astoria", "Park Slope", "Tribeca", "Harlem",
];

// Sample images for demo media gallery
const SAMPLE_IMAGES = [
  "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1080&h=720&fit=crop",
  "https://images.unsplash.com/photo-1534430480872-3498386e7856?w=1080&h=720&fit=crop",
  "https://images.unsplash.com/photo-1555992336-fb0d29498b13?w=1080&h=720&fit=crop",
  "https://images.unsplash.com/photo-1518391846015-55a9cc003b25?w=1080&h=720&fit=crop",
  "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=1080&h=720&fit=crop",
];

/* ─── Address Autocomplete Suggestions (LA-focused) ─── */

const LA_ADDRESS_SUGGESTIONS = [
  // Core Neighborhoods
  { display: "Hollywood Blvd, Hollywood", address: "Hollywood Blvd, Hollywood, CA" },
  { display: "Walk of Fame, Hollywood", address: "6801 Hollywood Blvd, Hollywood, CA" },
  { display: "Vine St, Hollywood", address: "Vine St, Hollywood, CA" },
  { display: "Abbot Kinney Blvd, Venice", address: "1401 Abbot Kinney Blvd, Venice, CA" },
  { display: "Venice Boardwalk", address: "Ocean Front Walk, Venice Beach, CA" },
  { display: "Santa Monica Pier", address: "200 Santa Monica Pier, Santa Monica, CA" },
  { display: "3rd Street Promenade, Santa Monica", address: "1351 3rd Street Promenade, Santa Monica, CA" },
  { display: "Montana Ave, Santa Monica", address: "Montana Ave, Santa Monica, CA" },
  { display: "Ocean Ave, Santa Monica", address: "Ocean Ave, Santa Monica, CA" },
  { display: "Silver Lake Blvd, Silver Lake", address: "Silver Lake Blvd, Silver Lake, CA" },
  { display: "Sunset Junction, Silver Lake", address: "3900 Sunset Blvd, Silver Lake, CA" },
  { display: "Hyperion Ave, Silver Lake", address: "Hyperion Ave, Silver Lake, CA" },
  { display: "Grand Ave, Downtown LA", address: "200 S Grand Ave, Downtown LA, CA" },
  { display: "Spring St, DTLA", address: "Spring St, Downtown LA, CA" },
  { display: "Pershing Square, DTLA", address: "532 S Olive St, Downtown LA, CA" },
  { display: "Rodeo Drive, Beverly Hills", address: "Rodeo Drive, Beverly Hills, CA" },
  { display: "Echo Park Lake", address: "751 Echo Park Ave, Echo Park, CA" },
  { display: "Western Ave, Koreatown", address: "Western Ave, Koreatown, CA" },
  { display: "Sunset Strip, West Hollywood", address: "Sunset Strip, West Hollywood, CA" },
  { display: "Santa Monica Blvd, WeHo", address: "Santa Monica Blvd, West Hollywood, CA" },
  { display: "Griffith Observatory", address: "2800 E Observatory Rd, Griffith Park, CA" },
  { display: "Griffith Park Trails", address: "4730 Crystal Springs Dr, Griffith Park, CA" },
  { display: "Traction Ave, Arts District", address: "Traction Ave, Arts District, CA" },
  { display: "Melrose Ave, Fairfax", address: "Melrose Ave, Fairfax District, CA" },
  { display: "Fairfax Ave, Melrose", address: "Fairfax Ave, Melrose, CA" },
  { display: "Culver Blvd, Culver City", address: "Culver Blvd, Culver City, CA" },
  { display: "York Blvd, Highland Park", address: "York Blvd, Highland Park, CA" },
  { display: "Figueroa St, Highland Park", address: "Figueroa St, Highland Park, CA" },
  { display: "Malibu Pier", address: "23000 Pacific Coast Hwy, Malibu, CA" },
  { display: "Point Dume, Malibu", address: "Point Dume State Beach, Malibu, CA" },
  { display: "Zuma Beach, Malibu", address: "30000 Pacific Coast Hwy, Malibu, CA" },
  { display: "Hillhurst Ave, Los Feliz", address: "Hillhurst Ave, Los Feliz, CA" },
  { display: "Vermont Ave, Los Feliz", address: "Vermont Ave, Los Feliz, CA" },
  { display: "Old Town Pasadena", address: "Colorado Blvd, Old Town Pasadena, CA" },
  { display: "South Lake Ave, Pasadena", address: "South Lake Ave, Pasadena, CA" },
  { display: "Pine Ave, Long Beach", address: "Pine Ave, Long Beach, CA" },
  { display: "Belmont Shore, Long Beach", address: "2nd St, Belmont Shore, Long Beach, CA" },
  { display: "Retro Row, Long Beach", address: "4th St, Retro Row, Long Beach, CA" },
  // Extended Neighborhoods
  { display: "San Vicente Blvd, Brentwood", address: "San Vicente Blvd, Brentwood, CA" },
  { display: "Glendale Blvd, Atwater Village", address: "Glendale Blvd, Atwater Village, CA" },
  { display: "Colorado Blvd, Eagle Rock", address: "Colorado Blvd, Eagle Rock, CA" },
  { display: "Westwood Village", address: "Westwood Blvd, Westwood, CA" },
  { display: "UCLA Campus", address: "405 Hilgard Ave, Westwood, CA" },
  { display: "Venice Blvd, Mar Vista", address: "Venice Blvd, Mar Vista, CA" },
  { display: "Grand Ave, El Segundo", address: "Grand Ave, El Segundo, CA" },
  { display: "Main St, El Segundo", address: "Main St, El Segundo, CA" },
  { display: "Brand Blvd, Glendale", address: "Brand Blvd, Glendale, CA" },
  { display: "Americana at Brand, Glendale", address: "889 Americana Way, Glendale, CA" },
  { display: "Magnolia Blvd, Burbank", address: "Magnolia Blvd, Burbank, CA" },
  { display: "Warner Bros Studios, Burbank", address: "3400 Warner Blvd, Burbank, CA" },
  { display: "1st St, Little Tokyo", address: "1st St, Little Tokyo, CA" },
  { display: "Japanese Village Plaza", address: "335 E 2nd St, Little Tokyo, CA" },
  { display: "Admiralty Way, Marina del Rey", address: "Admiralty Way, Marina del Rey, CA" },
  { display: "Playa Vista Center", address: "12746 Jefferson Blvd, Playa Vista, CA" },
  { display: "Larchmont Blvd, Larchmont Village", address: "Larchmont Blvd, Larchmont Village, CA" },
  { display: "La Brea Ave, Miracle Mile", address: "La Brea Ave, Miracle Mile, CA" },
  { display: "Museum Row, Wilshire", address: "5905 Wilshire Blvd, Miracle Mile, CA" },
  { display: "La Brea Tar Pits", address: "5801 Wilshire Blvd, Miracle Mile, CA" },
  { display: "Ventura Blvd, Sherman Oaks", address: "Ventura Blvd, Sherman Oaks, CA" },
  { display: "Ventura Blvd, Studio City", address: "Ventura Blvd, Studio City, CA" },
  { display: "Lankershim Blvd, NoHo", address: "Lankershim Blvd, North Hollywood, CA" },
  { display: "NoHo Arts District", address: "5108 Lankershim Blvd, North Hollywood, CA" },
  { display: "Temescal Canyon, Pacific Palisades", address: "Temescal Gateway Park, Pacific Palisades, CA" },
  { display: "Avenue of the Stars, Century City", address: "Avenue of the Stars, Century City, CA" },
  { display: "Cabrillo Beach, San Pedro", address: "3720 Stephen M. White Dr, San Pedro, CA" },
  { display: "SoFi Stadium, Inglewood", address: "1001 Stadium Dr, Inglewood, CA" },
  { display: "Valley Blvd, San Gabriel", address: "Valley Blvd, San Gabriel, CA" },
  { display: "Mission St, South Pasadena", address: "Mission St, South Pasadena, CA" },
  { display: "Sawtelle Blvd, Little Osaka", address: "Sawtelle Blvd, West Los Angeles, CA" },
  // Landmarks & Attractions
  { display: "Runyon Canyon Trailhead", address: "2000 N Fuller Ave, Runyon Canyon, CA" },
  { display: "Mulholland Drive Overlook", address: "Mulholland Drive, Hollywood Hills, CA" },
  { display: "Laurel Canyon Blvd", address: "Laurel Canyon Blvd, Hollywood Hills, CA" },
  { display: "The Grove, LA", address: "189 The Grove Dr, Los Angeles, CA" },
  { display: "Original Farmers Market", address: "6333 W 3rd St, Los Angeles, CA" },
  { display: "LACMA / Urban Lights", address: "5905 Wilshire Blvd, Los Angeles, CA" },
  { display: "Getty Center", address: "1200 Getty Center Dr, Los Angeles, CA" },
  { display: "Getty Villa, Malibu", address: "17985 Pacific Coast Hwy, Malibu, CA" },
  { display: "Dodger Stadium", address: "1000 Vin Scully Ave, Los Angeles, CA" },
  { display: "LAX Airport", address: "1 World Way, Los Angeles, CA" },
  { display: "Rose Bowl, Pasadena", address: "1001 Rose Bowl Dr, Pasadena, CA" },
  { display: "Walt Disney Concert Hall", address: "111 S Grand Ave, Los Angeles, CA" },
  { display: "Universal Studios Hollywood", address: "100 Universal City Plaza, Universal City, CA" },
  { display: "CityWalk, Universal City", address: "Universal CityWalk, Universal City, CA" },
  { display: "Exposition Park", address: "700 Exposition Park Dr, Los Angeles, CA" },
  { display: "Natural History Museum, LA", address: "900 Exposition Blvd, Los Angeles, CA" },
  { display: "Olvera Street", address: "845 N Alameda St, Los Angeles, CA" },
  { display: "Union Station, LA", address: "800 N Alameda St, Los Angeles, CA" },
  { display: "Sunset Boulevard", address: "Sunset Blvd, Los Angeles, CA" },
  { display: "Wilshire Boulevard", address: "Wilshire Blvd, Los Angeles, CA" },
  // More addresses
  { display: "Manhattan Beach Pier", address: "Manhattan Beach Pier, Manhattan Beach, CA" },
  { display: "Manhattan Beach Blvd", address: "Manhattan Beach Blvd, Manhattan Beach, CA" },
  { display: "Pier Ave, Hermosa Beach", address: "Pier Ave, Hermosa Beach, CA" },
  { display: "King Harbor, Redondo Beach", address: "100 W Torrance Blvd, Redondo Beach, CA" },
  { display: "Riviera Village, Redondo", address: "Riviera Village, Redondo Beach, CA" },
  { display: "Venice Canals", address: "Venice Canals, Venice, CA" },
  { display: "Pacific Coast Highway", address: "Pacific Coast Hwy, CA" },
  { display: "Topanga Canyon Blvd", address: "Topanga Canyon Blvd, Topanga, CA" },
  { display: "Topanga State Park", address: "20825 Entrada Rd, Topanga, CA" },
  { display: "Grand Central Market, DTLA", address: "317 S Broadway, Los Angeles, CA" },
  { display: "The Last Bookstore, DTLA", address: "453 S Spring St, Los Angeles, CA" },
  { display: "Bradbury Building, DTLA", address: "304 S Broadway, Los Angeles, CA" },
  { display: "Angel's Flight Railway", address: "350 S Grand Ave, Los Angeles, CA" },
  { display: "Staples Center / Crypto Arena", address: "1111 S Figueroa St, Los Angeles, CA" },
  { display: "MOCA, Downtown LA", address: "250 S Grand Ave, Los Angeles, CA" },
  { display: "The Broad Museum", address: "221 S Grand Ave, Los Angeles, CA" },
  { display: "Hollywood Sign Trail", address: "Mt Lee Dr, Hollywood Hills, CA" },
  { display: "Bronson Canyon, Griffith Park", address: "3200 Canyon Dr, Griffith Park, CA" },
  { display: "Korean BBQ Row, Koreatown", address: "3500 W 6th St, Koreatown, CA" },
  { display: "Robertson Blvd, WeHo", address: "Robertson Blvd, West Hollywood, CA" },
  { display: "Melrose Trading Post", address: "7850 Melrose Ave, Los Angeles, CA" },
  { display: "Row DTLA, Arts District", address: "777 S Alameda St, Arts District, CA" },
  { display: "Smorgasburg LA", address: "777 S Alameda St, ROW DTLA, CA" },
];

/** Filter address suggestions based on user input (min 2 chars) */
function filterAddressSuggestions(input: string): typeof LA_ADDRESS_SUGGESTIONS {
  const q = input.toLowerCase().trim();
  if (q.length < 2) return [];
  return LA_ADDRESS_SUGGESTIONS.filter(
    (s) => s.display.toLowerCase().includes(q) || s.address.toLowerCase().includes(q)
  ).slice(0, 6);
}

/* ─── Smart Media: Location-based photo bank ─── 
   Matches are driven ONLY by address/location text.
   Covers NYC neighborhoods, landmarks, streets, and venue-type keywords. */

type LocationEntry = { keywords: string[]; url: string; label: string };

const LOCATION_PHOTO_BANK: LocationEntry[] = [
  // ═══ NEW YORK CITY — Neighborhoods ═══
  { keywords: ["soho", "spring st", "prince st", "mercer", "greene st", "broome st"], url: "https://images.unsplash.com/photo-1707246120277-53fb44c16c07?w=600&h=400&fit=crop", label: "SoHo, NYC" },
  { keywords: ["greenwich village", "bleecker", "macdougal", "west 4th", "w 4th"], url: "https://images.unsplash.com/photo-1689366694901-19d23f297001?w=600&h=400&fit=crop", label: "Greenwich Village" },
  { keywords: ["williamsburg", "bedford ave", "berry st", "n 6th", "wythe"], url: "https://images.unsplash.com/photo-1501502973061-4453282fce2b?w=600&h=400&fit=crop", label: "Williamsburg" },
  { keywords: ["dumbo", "water st brooklyn", "main st brooklyn", "front st brooklyn"], url: "https://images.unsplash.com/photo-1702146484036-d70db01ac37c?w=600&h=400&fit=crop", label: "DUMBO" },
  { keywords: ["chelsea", "w 23rd", "w 20th", "10th ave", "w 25th"], url: "https://images.unsplash.com/photo-1708133788320-02a1db4584fd?w=600&h=400&fit=crop", label: "Chelsea, NYC" },
  { keywords: ["east village", "st marks", "avenue a", "avenue b", "tompkins"], url: "https://images.unsplash.com/photo-1500043189552-8feddf8d9f64?w=600&h=400&fit=crop", label: "East Village" },
  { keywords: ["lower east side", "les", "orchard st", "ludlow", "rivington", "delancey"], url: "https://images.unsplash.com/photo-1625493962064-ebf12ace2ea1?w=600&h=400&fit=crop", label: "Lower East Side" },
  { keywords: ["midtown", "times square", "42nd st", "34th st", "herald sq", "penn station"], url: "https://images.unsplash.com/photo-1583372905031-cd905c8875b1?w=600&h=400&fit=crop", label: "Midtown Manhattan" },
  { keywords: ["bushwick", "jefferson st", "dekalb", "knickerbocker", "myrtle"], url: "https://images.unsplash.com/photo-1662369800166-a05d950eba15?w=600&h=400&fit=crop", label: "Bushwick" },
  { keywords: ["tribeca", "hudson st", "chambers", "franklin st", "worth st", "west broadway"], url: "https://images.unsplash.com/photo-1725847513808-8294037ff2b2?w=600&h=400&fit=crop", label: "Tribeca" },
  { keywords: ["harlem", "125th st", "lenox", "adam clayton", "frederick douglass"], url: "https://images.unsplash.com/photo-1542042238232-3a0b14425b71?w=600&h=400&fit=crop", label: "Harlem" },
  { keywords: ["astoria", "steinway", "ditmars", "broadway astoria", "30th ave"], url: "https://images.unsplash.com/photo-1739132271471-e7b83e852ed3?w=600&h=400&fit=crop", label: "Astoria" },
  { keywords: ["park slope", "5th ave brooklyn", "7th ave brooklyn", "prospect park west"], url: "https://images.unsplash.com/photo-1705612444990-ffd0d61f03a9?w=600&h=400&fit=crop", label: "Park Slope" },
  { keywords: ["chinatown", "mott st", "canal st", "baxter", "pell st", "doyers"], url: "https://images.unsplash.com/photo-1692563361968-542125a86f06?w=600&h=400&fit=crop", label: "Chinatown, NYC" },
  { keywords: ["upper west side", "uws", "amsterdam ave", "columbus ave", "w 72nd", "w 79th"], url: "https://images.unsplash.com/photo-1693879728384-2daced54982e?w=600&h=400&fit=crop", label: "Upper West Side" },
  // NYC Landmarks
  { keywords: ["central park", "sheep meadow", "bethesda", "belvedere", "bow bridge"], url: "https://images.unsplash.com/photo-1693879728384-2daced54982e?w=600&h=400&fit=crop", label: "Central Park" },
  { keywords: ["brooklyn bridge", "bridge walk"], url: "https://images.unsplash.com/photo-1560906316-01b43ec57ef0?w=600&h=400&fit=crop", label: "Brooklyn Bridge" },
  { keywords: ["high line", "highline", "gansevoort", "meatpacking"], url: "https://images.unsplash.com/photo-1766858771690-9ab7b9df31c9?w=600&h=400&fit=crop", label: "The High Line" },
  { keywords: ["washington square", "wsp"], url: "https://images.unsplash.com/photo-1695923498814-1a575377d055?w=600&h=400&fit=crop", label: "Washington Square Park" },
  { keywords: ["prospect park", "grand army plaza"], url: "https://images.unsplash.com/photo-1705612486102-50bf3d434953?w=600&h=400&fit=crop", label: "Prospect Park" },
  { keywords: ["flatiron", "23rd st", "madison square"], url: "https://images.unsplash.com/photo-1549650723-65cef979ad35?w=600&h=400&fit=crop", label: "Flatiron District" },
  { keywords: ["broadway", "theater district"], url: "https://images.unsplash.com/photo-1614280094960-4ee7b964ad47?w=600&h=400&fit=crop", label: "Broadway" },
  { keywords: ["5th avenue", "fifth avenue", "5th ave manhattan"], url: "https://images.unsplash.com/photo-1733226328966-152e2fe9bf78?w=600&h=400&fit=crop", label: "5th Avenue" },

  // ═══ LOS ANGELES — Core Neighborhoods ═══
  { keywords: ["hollywood", "hollywood blvd", "vine st", "sunset blvd hollywood", "walk of fame", "hollywood and vine"], url: "https://images.unsplash.com/photo-1713758108326-bf5476162f8f?w=600&h=400&fit=crop", label: "Hollywood" },
  { keywords: ["venice beach", "venice", "abbot kinney", "ocean front walk", "windward ave", "venice boardwalk"], url: "https://images.unsplash.com/photo-1611858774596-6b2313d2b93c?w=600&h=400&fit=crop", label: "Venice Beach" },
  { keywords: ["santa monica", "ocean ave", "3rd street promenade", "palisades park", "santa monica pier", "montana ave"], url: "https://images.unsplash.com/photo-1645672380538-c1b169e0d79a?w=600&h=400&fit=crop", label: "Santa Monica" },
  { keywords: ["silver lake", "sunset junction", "hyperion", "silver lake blvd", "silverlake", "reservoir"], url: "https://images.unsplash.com/photo-1575043424254-5316e2d4c5b0?w=600&h=400&fit=crop", label: "Silver Lake" },
  { keywords: ["downtown la", "dtla", "grand ave la", "spring st la", "main st la", "pershing square", "bunker hill"], url: "https://images.unsplash.com/photo-1607505154912-59432ff1f615?w=600&h=400&fit=crop", label: "Downtown LA" },
  { keywords: ["beverly hills", "rodeo drive", "wilshire blvd beverly", "canon drive", "beverly dr"], url: "https://images.unsplash.com/photo-1614040940611-a0ebb66b32b0?w=600&h=400&fit=crop", label: "Beverly Hills" },
  { keywords: ["echo park", "echo park lake", "echo park ave", "sunset blvd echo"], url: "https://images.unsplash.com/photo-1678729465737-3480056add4f?w=600&h=400&fit=crop", label: "Echo Park" },
  { keywords: ["koreatown", "k-town", "western ave la", "wilshire koreatown", "olympic blvd"], url: "https://images.unsplash.com/photo-1522300632514-995158f85472?w=600&h=400&fit=crop", label: "Koreatown" },
  { keywords: ["west hollywood", "weho", "sunset strip", "santa monica blvd weho", "robertson"], url: "https://images.unsplash.com/photo-1741723171572-436306c6d140?w=600&h=400&fit=crop", label: "West Hollywood" },
  { keywords: ["griffith", "griffith observatory", "griffith park", "mt hollywood"], url: "https://images.unsplash.com/photo-1768201796127-9c11ec9dd5da?w=600&h=400&fit=crop", label: "Griffith Observatory" },
  { keywords: ["arts district", "traction ave", "factory place", "hewitt st"], url: "https://images.unsplash.com/photo-1557984849-ed36f201186d?w=600&h=400&fit=crop", label: "Arts District" },
  { keywords: ["melrose", "melrose ave", "fairfax", "fairfax ave", "fairfax district"], url: "https://images.unsplash.com/photo-1768172239692-53cf03d0db6f?w=600&h=400&fit=crop", label: "Melrose / Fairfax" },
  { keywords: ["culver city", "washington blvd culver", "culver blvd", "hayden tract"], url: "https://images.unsplash.com/photo-1713496129440-c7c6c3d3764b?w=600&h=400&fit=crop", label: "Culver City" },
  { keywords: ["highland park", "figueroa st highland", "york blvd", "ave 50", "ave 52", "ave 56"], url: "https://images.unsplash.com/photo-1688999787677-bb57a1d89456?w=600&h=400&fit=crop", label: "Highland Park" },
  { keywords: ["malibu", "pch malibu", "pacific coast hwy", "malibu pier", "zuma", "point dume"], url: "https://images.unsplash.com/photo-1741546654551-9df96d565f29?w=600&h=400&fit=crop", label: "Malibu" },
  { keywords: ["los feliz", "hillhurst", "vermont ave los feliz", "franklin ave"], url: "https://images.unsplash.com/photo-1501548881190-edab31107569?w=600&h=400&fit=crop", label: "Los Feliz" },
  { keywords: ["pasadena", "colorado blvd pasadena", "old town pasadena", "lake ave pasadena", "south lake"], url: "https://images.unsplash.com/photo-1578297690978-7674d69dd017?w=600&h=400&fit=crop", label: "Pasadena" },
  { keywords: ["long beach", "shoreline", "pine ave long beach", "belmont shore", "2nd st long beach", "retro row"], url: "https://images.unsplash.com/photo-1719360568553-31c4fb5f7ced?w=600&h=400&fit=crop", label: "Long Beach" },
  // ═══ LOS ANGELES — Extended Neighborhoods ═══
  { keywords: ["brentwood", "san vicente brentwood", "barrington ave"], url: "https://images.unsplash.com/photo-1585688584627-a29c20938a0b?w=600&h=400&fit=crop", label: "Brentwood" },
  { keywords: ["atwater village", "glendale blvd atwater", "los feliz blvd atwater"], url: "https://images.unsplash.com/photo-1630869944078-c07da4524f00?w=600&h=400&fit=crop", label: "Atwater Village" },
  { keywords: ["eagle rock", "colorado blvd eagle rock", "eagle rock blvd"], url: "https://images.unsplash.com/photo-1649190883776-2a1e64116421?w=600&h=400&fit=crop", label: "Eagle Rock" },
  { keywords: ["westwood", "westwood blvd", "wilshire westwood", "ucla", "westwood village"], url: "https://images.unsplash.com/photo-1665227424931-165a0b9a809c?w=600&h=400&fit=crop", label: "Westwood / UCLA" },
  { keywords: ["mar vista", "venice blvd mar vista", "centinela ave"], url: "https://images.unsplash.com/photo-1621484576147-3c20ea7167ee?w=600&h=400&fit=crop", label: "Mar Vista" },
  { keywords: ["el segundo", "grand ave el segundo", "main st el segundo"], url: "https://images.unsplash.com/photo-1647284969225-20a4e71343ee?w=600&h=400&fit=crop", label: "El Segundo" },
  { keywords: ["glendale", "brand blvd", "americana glendale", "glendale galleria"], url: "https://images.unsplash.com/photo-1771294225103-6320f1b36231?w=600&h=400&fit=crop", label: "Glendale" },
  { keywords: ["burbank", "magnolia blvd burbank", "olive ave burbank", "warner bros", "media district"], url: "https://images.unsplash.com/photo-1741612069312-2a923d6f817c?w=600&h=400&fit=crop", label: "Burbank" },
  { keywords: ["little tokyo", "1st st little tokyo", "japanese village plaza", "2nd st little tokyo"], url: "https://images.unsplash.com/photo-1655909402772-13c120f79514?w=600&h=400&fit=crop", label: "Little Tokyo" },
  { keywords: ["chinatown la", "chinatown los angeles", "n broadway la", "alpine st", "chung king rd"], url: "https://images.unsplash.com/photo-1655909402772-13c120f79514?w=600&h=400&fit=crop", label: "Chinatown, LA" },
  { keywords: ["marina del rey", "admiralty way", "fiji way", "marina channel"], url: "https://images.unsplash.com/photo-1763826595631-7e99bfd6b126?w=600&h=400&fit=crop", label: "Marina del Rey" },
  { keywords: ["playa vista", "playa del rey", "silicon beach", "jefferson blvd playa"], url: "https://images.unsplash.com/photo-1739386541075-77bd9dcf4a98?w=600&h=400&fit=crop", label: "Playa Vista" },
  { keywords: ["larchmont", "larchmont village", "larchmont blvd", "hancock park"], url: "https://images.unsplash.com/photo-1592188714153-1530336bf3e2?w=600&h=400&fit=crop", label: "Larchmont Village" },
  { keywords: ["miracle mile", "mid-wilshire", "la brea", "la brea ave", "museum row", "tar pits"], url: "https://images.unsplash.com/photo-1687798670783-5b0c95feaaef?w=600&h=400&fit=crop", label: "Miracle Mile" },
  { keywords: ["sherman oaks", "ventura blvd sherman", "sepulveda sherman", "fashion square"], url: "https://images.unsplash.com/photo-1588279294107-98f6f0e43b19?w=600&h=400&fit=crop", label: "Sherman Oaks" },
  { keywords: ["studio city", "ventura blvd studio", "laurel canyon studio", "colfax ave"], url: "https://images.unsplash.com/photo-1728290839604-7683ff46e94c?w=600&h=400&fit=crop", label: "Studio City" },
  { keywords: ["north hollywood", "noho", "noho arts", "lankershim", "magnolia noho"], url: "https://images.unsplash.com/photo-1768822393496-61de8f3f885f?w=600&h=400&fit=crop", label: "NoHo Arts District" },
  { keywords: ["pacific palisades", "palisades", "sunset blvd palisades", "temescal canyon"], url: "https://images.unsplash.com/photo-1768324969888-7df173da1e4a?w=600&h=400&fit=crop", label: "Pacific Palisades" },
  { keywords: ["century city", "century park", "avenue of the stars", "constellation blvd"], url: "https://images.unsplash.com/photo-1614219509833-94f99309a5ea?w=600&h=400&fit=crop", label: "Century City" },
  { keywords: ["san pedro", "port of la", "ports o call", "cabrillo beach"], url: "https://images.unsplash.com/photo-1649103321806-b4cc2c23bc7c?w=600&h=400&fit=crop", label: "San Pedro" },
  { keywords: ["palos verdes", "rancho palos verdes", "pvp", "portugese bend", "terranea"], url: "https://images.unsplash.com/photo-1768324969888-7df173da7e4a?w=600&h=400&fit=crop", label: "Palos Verdes" },
  { keywords: ["inglewood", "sofi", "sofi stadium", "the forum", "market st inglewood"], url: "https://images.unsplash.com/photo-1759808418373-e25b11a21753?w=600&h=400&fit=crop", label: "Inglewood" },
  { keywords: ["san gabriel", "alhambra", "monterey park", "sgv", "san gabriel valley", "valley blvd"], url: "https://images.unsplash.com/photo-1707635569223-c759b3b0501b?w=600&h=400&fit=crop", label: "San Gabriel Valley" },
  { keywords: ["south pasadena", "mission st south pas", "fair oaks south pas"], url: "https://images.unsplash.com/photo-1583765748076-cac46b8c98c1?w=600&h=400&fit=crop", label: "South Pasadena" },
  { keywords: ["topanga", "topanga canyon", "old topanga", "topanga state park"], url: "https://images.unsplash.com/photo-1649103321806-b4cc2c23bc7c?w=600&h=400&fit=crop", label: "Topanga Canyon" },
  { keywords: ["sawtelle", "little osaka", "sawtelle blvd", "olympic sawtelle"], url: "https://images.unsplash.com/photo-1621484576147-3c20ea7167ee?w=600&h=400&fit=crop", label: "Sawtelle Japantown" },
  { keywords: ["encino", "ventura blvd encino", "balboa blvd encino", "tarzana"], url: "https://images.unsplash.com/photo-1588279294107-98f6f0e43b19?w=600&h=400&fit=crop", label: "Encino" },
  // ═══ LOS ANGELES — South Bay Beaches (unique per city) ═══
  { keywords: ["manhattan beach", "manhattan beach blvd", "manhattan pier"], url: "https://images.unsplash.com/photo-1647531032884-99f93600fe47?w=600&h=400&fit=crop", label: "Manhattan Beach" },
  { keywords: ["hermosa beach", "hermosa pier", "pier ave hermosa"], url: "https://images.unsplash.com/photo-1630361138957-a5d7f88b2d94?w=600&h=400&fit=crop", label: "Hermosa Beach" },
  { keywords: ["redondo beach", "king harbor", "riviera village", "redondo pier"], url: "https://images.unsplash.com/photo-1743707389369-e0e64f6ccf05?w=600&h=400&fit=crop", label: "Redondo Beach" },
  // ═══ LOS ANGELES — Landmarks & Attractions ═══
  { keywords: ["runyon canyon", "runyon", "fuller ave runyon"], url: "https://images.unsplash.com/photo-1727377202661-c73bf6f8fcf0?w=600&h=400&fit=crop", label: "Runyon Canyon" },
  { keywords: ["mulholland", "mulholland drive", "mulholland hwy"], url: "https://images.unsplash.com/photo-1728290839604-7683ff46e94c?w=600&h=400&fit=crop", label: "Mulholland Drive" },
  { keywords: ["laurel canyon", "laurel canyon blvd", "lookout mountain"], url: "https://images.unsplash.com/photo-1727377202661-c73bf6f8fcf0?w=600&h=400&fit=crop", label: "Laurel Canyon" },
  { keywords: ["the grove", "grove drive", "farmers market la", "3rd and fairfax"], url: "https://images.unsplash.com/photo-1771294225103-6320f1b36231?w=600&h=400&fit=crop", label: "The Grove / Farmers Market" },
  { keywords: ["lacma", "urban lights", "wilshire lacma", "la county museum"], url: "https://images.unsplash.com/photo-1768822393496-61de8f3f885f?w=600&h=400&fit=crop", label: "LACMA" },
  { keywords: ["getty", "getty center", "getty museum", "getty villa"], url: "https://images.unsplash.com/photo-1667312814904-80f3d43ad2d1?w=600&h=400&fit=crop", label: "Getty Center" },
  { keywords: ["dodger stadium", "dodger", "elysian park", "chavez ravine"], url: "https://images.unsplash.com/photo-1661937355193-71ca62eb1f6d?w=600&h=400&fit=crop", label: "Dodger Stadium" },
  { keywords: ["lax", "airport blvd", "sepulveda lax", "world way"], url: "https://images.unsplash.com/photo-1771505085815-41d218dc068e?w=600&h=400&fit=crop", label: "LAX Airport" },
  { keywords: ["rose bowl", "arroyo seco", "brookside park"], url: "https://images.unsplash.com/photo-1583765748076-cac46b8c98c1?w=600&h=400&fit=crop", label: "Rose Bowl" },
  { keywords: ["disney concert hall", "walt disney hall", "grand ave downtown"], url: "https://images.unsplash.com/photo-1614219509833-94f99309a5ea?w=600&h=400&fit=crop", label: "Disney Concert Hall" },
  { keywords: ["universal", "universal studios", "universal city", "citywalk"], url: "https://images.unsplash.com/photo-1741612069312-2a923d6f817c?w=600&h=400&fit=crop", label: "Universal Studios" },
  { keywords: ["exposition park", "natural history museum", "coliseum", "usc", "figueroa usc"], url: "https://images.unsplash.com/photo-1649190883776-2a1e64116421?w=600&h=400&fit=crop", label: "Exposition Park / USC" },
  { keywords: ["olvera street", "olvera", "pueblo", "union station la"], url: "https://images.unsplash.com/photo-1655909402772-13c120f79514?w=600&h=400&fit=crop", label: "Olvera Street" },
  // ═══ LOS ANGELES — Major Streets ═══
  { keywords: ["sunset blvd", "sunset boulevard"], url: "https://images.unsplash.com/photo-1713758108326-bf5476162f8f?w=600&h=400&fit=crop", label: "Sunset Boulevard" },
  { keywords: ["wilshire blvd", "wilshire boulevard"], url: "https://images.unsplash.com/photo-1687798670783-5b0c95feaaef?w=600&h=400&fit=crop", label: "Wilshire Boulevard" },
  { keywords: ["figueroa", "figueroa st"], url: "https://images.unsplash.com/photo-1607505154912-59432ff1f615?w=600&h=400&fit=crop", label: "Figueroa Street" },
  { keywords: ["broadway la", "broadway dtla"], url: "https://images.unsplash.com/photo-1676532313088-d45b06248d16?w=600&h=400&fit=crop", label: "Broadway, DTLA" },
  { keywords: ["ventura blvd", "ventura boulevard"], url: "https://images.unsplash.com/photo-1588279294107-98f6f0e43b19?w=600&h=400&fit=crop", label: "Ventura Boulevard" },
  // ═══ LOS ANGELES — Generic fallback ═══
  { keywords: ["los angeles", "la", "l.a."], url: "https://images.unsplash.com/photo-1676532313088-d45b06248d16?w=600&h=400&fit=crop", label: "Los Angeles" },

  // ═══ SAN FRANCISCO BAY AREA ═══
  { keywords: ["san francisco", "sf", "frisco", "golden gate", "fisherman's wharf", "embarcadero", "market st sf"], url: "https://images.unsplash.com/photo-1663443067746-d92d81494aa3?w=600&h=400&fit=crop", label: "San Francisco" },
  { keywords: ["mission district", "valencia st", "mission st sf", "24th st sf", "dolores"], url: "https://images.unsplash.com/photo-1663443067746-d92d81494aa3?w=600&h=400&fit=crop", label: "Mission District, SF" },
  { keywords: ["oakland", "lake merritt", "telegraph ave oakland", "jack london"], url: "https://images.unsplash.com/photo-1631165854010-bab7e2c19ee4?w=600&h=400&fit=crop", label: "Oakland" },
  { keywords: ["castro", "haight", "haight-ashbury", "noe valley", "hayes valley"], url: "https://images.unsplash.com/photo-1663443067746-d92d81494aa3?w=600&h=400&fit=crop", label: "Haight-Ashbury, SF" },

  // ═══ CHICAGO ═══
  { keywords: ["chicago", "michigan ave", "loop", "magnificent mile", "wacker", "lake shore drive", "millennium park"], url: "https://images.unsplash.com/photo-1589691976473-35032b2c6bd3?w=600&h=400&fit=crop", label: "Chicago" },
  { keywords: ["wicker park", "bucktown", "logan square", "milwaukee ave chicago"], url: "https://images.unsplash.com/photo-1589691976473-35032b2c6bd3?w=600&h=400&fit=crop", label: "Wicker Park, Chicago" },
  { keywords: ["lincoln park", "old town chicago", "armitage", "halsted chicago"], url: "https://images.unsplash.com/photo-1589691976473-35032b2c6bd3?w=600&h=400&fit=crop", label: "Lincoln Park, Chicago" },
  { keywords: ["pilsen", "west loop", "fulton market", "randolph st chicago"], url: "https://images.unsplash.com/photo-1589691976473-35032b2c6bd3?w=600&h=400&fit=crop", label: "West Loop, Chicago" },

  // ═══ MIAMI & SOUTH FLORIDA ═══
  { keywords: ["miami", "south beach", "ocean drive", "collins ave", "brickell", "wynwood", "little havana", "calle ocho", "coconut grove", "coral gables"], url: "https://images.unsplash.com/photo-1720071160305-1aadaf1308bd?w=600&h=400&fit=crop", label: "Miami" },
  { keywords: ["fort lauderdale", "ft lauderdale"], url: "https://images.unsplash.com/photo-1720071160305-1aadaf1308bd?w=600&h=400&fit=crop", label: "Fort Lauderdale" },
  { keywords: ["key west", "duval st", "mallory square"], url: "https://images.unsplash.com/photo-1659204674438-6996034014d4?w=600&h=400&fit=crop", label: "Key West" },
  { keywords: ["tampa", "ybor city", "channelside", "bayshore blvd"], url: "https://images.unsplash.com/photo-1580617332602-5a5ed8bc480f?w=600&h=400&fit=crop", label: "Tampa" },
  { keywords: ["orlando", "international drive", "lake eola"], url: "https://images.unsplash.com/photo-1692305019669-30926591bd25?w=600&h=400&fit=crop", label: "Orlando" },
  { keywords: ["jacksonville", "riverside jax", "san marco jacksonville"], url: "https://images.unsplash.com/photo-1699322753743-744c259994ec?w=600&h=400&fit=crop", label: "Jacksonville" },

  // ═══ TEXAS ═══
  { keywords: ["austin", "6th street", "south congress", "soco", "rainey st", "east austin", "barton springs"], url: "https://images.unsplash.com/photo-1666972120465-efebce20bf93?w=600&h=400&fit=crop", label: "Austin" },
  { keywords: ["houston", "montrose houston", "heights houston", "downtown houston", "galleria houston"], url: "https://images.unsplash.com/photo-1667754248024-e1e03e60eb72?w=600&h=400&fit=crop", label: "Houston" },
  { keywords: ["dallas", "deep ellum", "uptown dallas", "bishop arts", "lower greenville"], url: "https://images.unsplash.com/photo-1662576007101-ba8a6f5b7698?w=600&h=400&fit=crop", label: "Dallas" },
  { keywords: ["san antonio", "riverwalk", "river walk", "alamo", "pearl district sa"], url: "https://images.unsplash.com/photo-1692193483739-0e378f2eec45?w=600&h=400&fit=crop", label: "San Antonio" },

  // ═══ PACIFIC NORTHWEST ═══
  { keywords: ["seattle", "pike place", "capitol hill seattle", "fremont seattle", "ballard", "pioneer square", "space needle"], url: "https://images.unsplash.com/photo-1555817556-7d69c694f2dd?w=600&h=400&fit=crop", label: "Seattle" },
  { keywords: ["portland", "pearl district portland", "alberta st", "hawthorne", "division st portland", "mississippi ave portland"], url: "https://images.unsplash.com/photo-1647490176399-446facfe1817?w=600&h=400&fit=crop", label: "Portland" },

  // ═══ SOUTHEAST ═══
  { keywords: ["nashville", "broadway nashville", "music row", "east nashville", "12south", "gulch nashville"], url: "https://images.unsplash.com/photo-1693433582807-ab93ea7c297e?w=600&h=400&fit=crop", label: "Nashville" },
  { keywords: ["atlanta", "midtown atlanta", "buckhead", "little five points", "decatur", "ponce de leon", "beltline"], url: "https://images.unsplash.com/photo-1656301653599-2f32abf2a7c8?w=600&h=400&fit=crop", label: "Atlanta" },
  { keywords: ["new orleans", "french quarter", "bourbon st", "magazine st", "frenchmen", "garden district", "bywater", "marigny"], url: "https://images.unsplash.com/photo-1655070043837-ad2146f8963d?w=600&h=400&fit=crop", label: "New Orleans" },
  { keywords: ["savannah", "broughton st", "forsyth park", "river st savannah"], url: "https://images.unsplash.com/photo-1492889971304-ac16ab4a4a5a?w=600&h=400&fit=crop", label: "Savannah" },
  { keywords: ["charleston", "king st charleston", "meeting st", "east bay st"], url: "https://images.unsplash.com/photo-1600450433412-dfc6b46f0dd3?w=600&h=400&fit=crop", label: "Charleston" },
  { keywords: ["memphis", "beale st", "south main memphis", "overton park"], url: "https://images.unsplash.com/photo-1597882184756-d4106ffb38ad?w=600&h=400&fit=crop", label: "Memphis" },
  { keywords: ["charlotte", "noda charlotte", "plaza midwood", "south end charlotte", "uptown charlotte"], url: "https://images.unsplash.com/photo-1747354209511-4abaf7300a44?w=600&h=400&fit=crop", label: "Charlotte" },
  { keywords: ["asheville", "downtown asheville", "river arts asheville", "biltmore village"], url: "https://images.unsplash.com/photo-1658972689149-d602732069b4?w=600&h=400&fit=crop", label: "Asheville" },
  { keywords: ["raleigh", "downtown raleigh", "glenwood south"], url: "https://images.unsplash.com/photo-1602454271906-5b16f7961190?w=600&h=400&fit=crop", label: "Raleigh" },

  // ═══ NORTHEAST & MID-ATLANTIC ═══
  { keywords: ["boston", "beacon hill", "back bay", "north end boston", "cambridge", "newbury st", "fenway", "seaport boston"], url: "https://images.unsplash.com/photo-1624979119080-320a79fc2146?w=600&h=400&fit=crop", label: "Boston" },
  { keywords: ["philadelphia", "philly", "old city philly", "rittenhouse", "south st philly", "fishtown", "passyunk"], url: "https://images.unsplash.com/photo-1738162345268-53ad9fb60715?w=600&h=400&fit=crop", label: "Philadelphia" },
  { keywords: ["washington dc", "dc", "georgetown", "dupont circle", "adams morgan", "capitol hill dc", "u street", "national mall"], url: "https://images.unsplash.com/photo-1694788847591-c9da90e41662?w=600&h=400&fit=crop", label: "Washington, D.C." },
  { keywords: ["baltimore", "fells point", "inner harbor", "federal hill", "hampden baltimore", "canton baltimore"], url: "https://images.unsplash.com/photo-1690667849735-5f2729ea5d27?w=600&h=400&fit=crop", label: "Baltimore" },
  { keywords: ["pittsburgh", "strip district", "lawrenceville", "south side pittsburgh", "squirrel hill"], url: "https://images.unsplash.com/photo-1700110615484-2e7d43100b70?w=600&h=400&fit=crop", label: "Pittsburgh" },
  { keywords: ["providence", "federal hill providence", "downcity", "thayer st"], url: "https://images.unsplash.com/photo-1675452801475-6f7fba52f5ac?w=600&h=400&fit=crop", label: "Providence" },
  { keywords: ["buffalo", "elmwood village", "allentown buffalo", "canalside"], url: "https://images.unsplash.com/photo-1763005469932-5560247b93ca?w=600&h=400&fit=crop", label: "Buffalo" },

  // ═══ MIDWEST ═══
  { keywords: ["denver", "lodo", "rino denver", "capitol hill denver", "larimer square", "highland denver"], url: "https://images.unsplash.com/photo-1635294330731-d930fad4f25c?w=600&h=400&fit=crop", label: "Denver" },
  { keywords: ["minneapolis", "uptown minneapolis", "northeast minneapolis", "north loop", "mill district"], url: "https://images.unsplash.com/photo-1600296344597-1aadaf1308bd?w=600&h=400&fit=crop", label: "Minneapolis" },
  { keywords: ["detroit", "corktown", "midtown detroit", "eastern market detroit", "woodward ave"], url: "https://images.unsplash.com/photo-1463414689943-2aca18b2242b?w=600&h=400&fit=crop", label: "Detroit" },
  { keywords: ["milwaukee", "third ward", "east side milwaukee", "walker's point", "bay view milwaukee"], url: "https://images.unsplash.com/photo-1648143351120-26d653606963?w=600&h=400&fit=crop", label: "Milwaukee" },
  { keywords: ["st louis", "saint louis", "central west end", "soulard", "the grove stl"], url: "https://images.unsplash.com/photo-1610234759638-9796101136ef?w=600&h=400&fit=crop", label: "St. Louis" },
  { keywords: ["kansas city", "kc", "crossroads kc", "westport", "plaza kc", "river market kc"], url: "https://images.unsplash.com/photo-1708786910174-879ccf0da46b?w=600&h=400&fit=crop", label: "Kansas City" },
  { keywords: ["indianapolis", "indy", "mass ave indy", "fountain square indy", "broad ripple"], url: "https://images.unsplash.com/photo-1617415646973-2f5f5010fefa?w=600&h=400&fit=crop", label: "Indianapolis" },
  { keywords: ["columbus ohio", "short north", "german village columbus", "clintonville"], url: "https://images.unsplash.com/photo-1754875309663-021f909ce913?w=600&h=400&fit=crop", label: "Columbus" },
  { keywords: ["cincinnati", "over-the-rhine", "otr", "findlay market"], url: "https://images.unsplash.com/photo-1650174258722-a9af05b1b548?w=600&h=400&fit=crop", label: "Cincinnati" },
  { keywords: ["omaha", "old market omaha", "benson omaha", "dundee omaha"], url: "https://images.unsplash.com/photo-1630340338894-eaa53fdd8ef9?w=600&h=400&fit=crop", label: "Omaha" },

  // ═══ SOUTHWEST & MOUNTAIN WEST ═══
  { keywords: ["phoenix", "scottsdale", "tempe", "downtown phoenix", "roosevelt row"], url: "https://images.unsplash.com/photo-1574969229804-e02de971abaf?w=600&h=400&fit=crop", label: "Phoenix" },
  { keywords: ["las vegas", "the strip", "fremont st", "downtown vegas", "henderson nv"], url: "https://images.unsplash.com/photo-1667643976021-c51a29e5605f?w=600&h=400&fit=crop", label: "Las Vegas" },
  { keywords: ["tucson", "4th ave tucson", "downtown tucson"], url: "https://images.unsplash.com/photo-1602955909693-579ecebbf5bf?w=600&h=400&fit=crop", label: "Tucson" },
  { keywords: ["sedona", "red rock", "uptown sedona", "bell rock", "cathedral rock"], url: "https://images.unsplash.com/photo-1601700476081-c3591e4011b1?w=600&h=400&fit=crop", label: "Sedona" },
  { keywords: ["salt lake city", "slc", "downtown slc", "sugar house", "9th and 9th"], url: "https://images.unsplash.com/photo-1601322280090-589b23857997?w=600&h=400&fit=crop", label: "Salt Lake City" },
  { keywords: ["albuquerque", "old town albuquerque", "nob hill abq"], url: "https://images.unsplash.com/photo-1581616845744-c3fa77368c57?w=600&h=400&fit=crop", label: "Albuquerque" },
  { keywords: ["boise", "downtown boise", "hyde park boise"], url: "https://images.unsplash.com/photo-1739999755964-00c65a570a06?w=600&h=400&fit=crop", label: "Boise" },

  // ═══ CALIFORNIA (other) ═══
  { keywords: ["san diego", "gaslamp", "north park sd", "hillcrest sd", "pacific beach", "la jolla", "balboa park"], url: "https://images.unsplash.com/photo-1710289223483-d026a20233dc?w=600&h=400&fit=crop", label: "San Diego" },
  { keywords: ["sacramento", "midtown sacramento", "old sacramento"], url: "https://images.unsplash.com/photo-1723066012173-e902882779cd?w=600&h=400&fit=crop", label: "Sacramento" },
  { keywords: ["santa barbara", "state st santa barbara", "funk zone", "stearns wharf"], url: "https://images.unsplash.com/photo-1646628490314-6b10b591d049?w=600&h=400&fit=crop", label: "Santa Barbara" },

  // ═══ HAWAII & ALASKA ═══
  { keywords: ["honolulu", "waikiki", "kailua", "ala moana", "diamond head"], url: "https://images.unsplash.com/photo-1617055778125-12ec73ce27f1?w=600&h=400&fit=crop", label: "Honolulu" },
  { keywords: ["anchorage", "downtown anchorage", "midtown anchorage"], url: "https://images.unsplash.com/photo-1704243962389-6e57197ccf09?w=600&h=400&fit=crop", label: "Anchorage" },

  // ═══ GENERIC VENUE / PLACE-TYPE FALLBACKS ═══
  { keywords: ["coffee", "cafe", "latte", "espresso"], url: "https://images.unsplash.com/photo-1745611274458-bd697adb07c8?w=600&h=400&fit=crop", label: "Coffee spot" },
  { keywords: ["gallery", "art", "exhibit", "museum"], url: "https://images.unsplash.com/photo-1759194772504-7676bd6b151e?w=600&h=400&fit=crop", label: "Art & Culture" },
  { keywords: ["restaurant", "dining", "kitchen", "bistro", "eatery"], url: "https://images.unsplash.com/photo-1771600850787-a0f8e11ba21f?w=600&h=400&fit=crop", label: "Restaurant" },
  { keywords: ["park", "garden", "botanical", "green space"], url: "https://images.unsplash.com/photo-1759256375054-265633d57386?w=600&h=400&fit=crop", label: "Green space" },
  { keywords: ["bar", "cocktail", "pub", "lounge", "nightclub"], url: "https://images.unsplash.com/photo-1665399321244-8f4a6ddeef99?w=600&h=400&fit=crop", label: "Nightlife" },
  { keywords: ["rooftop", "skyline", "terrace", "lookout"], url: "https://images.unsplash.com/photo-1729867907187-3ecd8dd71376?w=600&h=400&fit=crop", label: "Rooftop view" },
  { keywords: ["bakery", "pastry", "dessert", "sweet", "donut"], url: "https://images.unsplash.com/photo-1672361581165-a422c5b82cc3?w=600&h=400&fit=crop", label: "Bakery" },
  { keywords: ["pizza", "pizzeria", "slice"], url: "https://images.unsplash.com/photo-1771600850787-a0f8e11ba21f?w=600&h=400&fit=crop", label: "Pizza spot" },
  { keywords: ["shop", "boutique", "store", "retail", "vintage", "thrift"], url: "https://images.unsplash.com/photo-1530116896371-d180a0f9d307?w=600&h=400&fit=crop", label: "Shopping" },
  { keywords: ["music", "venue", "concert", "jazz", "stage"], url: "https://images.unsplash.com/photo-1759136871942-9605a371ba46?w=600&h=400&fit=crop", label: "Music venue" },
  { keywords: ["food truck", "street food", "vendor", "stand"], url: "https://images.unsplash.com/photo-1691313973724-145da7f93f50?w=600&h=400&fit=crop", label: "Street food" },
  { keywords: ["book", "library", "bookstore", "comics"], url: "https://images.unsplash.com/photo-1530116896371-d180a0f9d307?w=600&h=400&fit=crop", label: "Bookstore" },
  { keywords: ["bridge", "monument", "architecture", "historic", "landmark"], url: "https://images.unsplash.com/photo-1768511955134-593f14f6b74a?w=600&h=400&fit=crop", label: "Landmark" },
  { keywords: ["mural", "graffiti", "street art"], url: "https://images.unsplash.com/photo-1664856226012-02751eb8b19b?w=600&h=400&fit=crop", label: "Street mural" },
  { keywords: ["beach", "shore", "oceanfront", "seaside", "boardwalk", "waterfront", "pier"], url: "https://images.unsplash.com/photo-1611858774596-6b2313d2b93c?w=600&h=400&fit=crop", label: "Beachfront" },
  { keywords: ["brewery", "taproom", "beer", "craft beer"], url: "https://images.unsplash.com/photo-1665399321244-8f4a6ddeef99?w=600&h=400&fit=crop", label: "Brewery" },
  { keywords: ["taco", "tacos", "taqueria", "mexican"], url: "https://images.unsplash.com/photo-1691313973724-145da7f93f50?w=600&h=400&fit=crop", label: "Taco spot" },
  { keywords: ["theater", "theatre", "cinema", "movie"], url: "https://images.unsplash.com/photo-1614280094960-4ee7b964ad47?w=600&h=400&fit=crop", label: "Theater" },
  { keywords: ["church", "cathedral", "chapel", "temple", "synagogue", "mosque"], url: "https://images.unsplash.com/photo-1768511955134-593f14f6b74a?w=600&h=400&fit=crop", label: "Place of worship" },
  { keywords: ["market", "farmers market", "flea market", "bazaar"], url: "https://images.unsplash.com/photo-1691313973724-145da7f93f50?w=600&h=400&fit=crop", label: "Market" },
  { keywords: ["university", "campus", "college"], url: "https://images.unsplash.com/photo-1768511955134-593f14f6b74a?w=600&h=400&fit=crop", label: "Campus" },
  { keywords: ["stadium", "arena", "field", "ballpark"], url: "https://images.unsplash.com/photo-1759136871942-9605a371ba46?w=600&h=400&fit=crop", label: "Stadium" },
  { keywords: ["marina", "dock", "harbor", "harbour", "yacht"], url: "https://images.unsplash.com/photo-1611858774596-6b2313d2b93c?w=600&h=400&fit=crop", label: "Marina" },
  { keywords: ["trail", "hiking", "hike", "trailhead", "nature walk"], url: "https://images.unsplash.com/photo-1759256375054-265633d57386?w=600&h=400&fit=crop", label: "Hiking trail" },
];

/** Upgrade Unsplash URL quality from 600×400 to 1200×800 */
function hqUrl(url: string): string {
  return url.replace(/w=\d+&h=\d+/, "w=1200&h=800");
}

/** Match address against ALL location entries, return sorted by score desc */
function matchAllLocationMedia(address: string): { url: string; label: string }[] {
  const text = address.toLowerCase().trim();
  if (!text) return [];

  const scored: { url: string; label: string; score: number }[] = [];
  for (const entry of LOCATION_PHOTO_BANK) {
    let score = 0;
    for (const kw of entry.keywords) {
      if (text.includes(kw)) score += kw.length;
    }
    if (score > 0) {
      scored.push({ url: hqUrl(entry.url), label: entry.label, score });
    }
  }
  // Sort best first, then deduplicate by URL
  scored.sort((a, b) => b.score - a.score);
  const seen = new Set<string>();
  return scored.filter((m) => {
    if (seen.has(m.url)) return false;
    seen.add(m.url);
    return true;
  });
}

interface MediaItem {
  id: string;
  type: "image" | "video";
  url: string;
  thumbnail: string;
}

interface NewStop {
  id: number;
  name: string;
  address: string;
  teaser: string;
  lat: number;
  lng: number;
  media: MediaItem[];
  autoPhoto: boolean;
  autoPhotoUrl: string;
  autoPhotoLabel: string;
  autoPhotoLoading: boolean;
  /** All matched photos for cycling via refresh */
  autoPhotoMatches: { url: string; label: string }[];
  autoPhotoIndex: number;
}

/* ─── Fullscreen Media Viewer ─── */

function MediaViewer({
  media,
  initialIndex,
  onClose,
}: {
  media: MediaItem[];
  initialIndex: number;
  onClose: () => void;
}) {
  const [idx, setIdx] = useState(initialIndex);

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col">
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <button onClick={onClose} className="text-white p-2">
          <X size={24} />
        </button>
        <span className="text-white/70 text-[13px] font-['Poppins']">
          {idx + 1} / {media.length}
        </span>
        <div className="w-10" />
      </div>
      <div className="flex-1 flex items-center justify-center px-4">
        {media[idx]?.type === "video" ? (
          <div className="w-full max-h-[75vh] bg-gray-900 rounded-2xl flex items-center justify-center">
            <div className="text-center">
              <Video size={48} className="text-white/40 mx-auto mb-2" />
              <p className="text-white/50 text-[13px] font-['Poppins']">Video Preview</p>
            </div>
          </div>
        ) : (
          <ImageWithFallback
            src={media[idx]?.url || ""}
            alt=""
            className="w-full max-h-[75vh] object-contain rounded-2xl"
          />
        )}
      </div>
      <div className="flex items-center justify-center gap-3 py-6">
        <button
          onClick={() => setIdx(Math.max(0, idx - 1))}
          disabled={idx === 0}
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center disabled:opacity-30"
        >
          <ChevronLeft size={20} className="text-white" />
        </button>
        <div className="flex gap-1.5">
          {media.map((_, i) => (
            <div
              key={i}
              className={`w-2 h-2 rounded-full transition-all ${i === idx ? "bg-white scale-125" : "bg-white/30"}`}
            />
          ))}
        </div>
        <button
          onClick={() => setIdx(Math.min(media.length - 1, idx + 1))}
          disabled={idx === media.length - 1}
          className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center disabled:opacity-30"
        >
          <ChevronRight size={20} className="text-white" />
        </button>
      </div>
    </div>
  );
}

/* ─── Media Gallery Slider ─── */

function MediaGallery({
  media,
  onAdd,
  onRemove,
  onView,
  compact,
}: {
  media: MediaItem[];
  onAdd: (type: "image" | "video") => void;
  onRemove: (id: string) => void;
  onView: (index: number) => void;
  compact?: boolean;
}) {
  const h = compact ? "h-[80px]" : "h-[100px]";
  const w = compact ? "w-[80px]" : "w-[100px]";

  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
      {media.map((item, i) => (
        <div key={item.id} className={`${w} ${h} rounded-xl overflow-hidden relative shrink-0 group`}>
          {item.type === "video" ? (
            <div
              className="w-full h-full bg-gray-800 flex items-center justify-center cursor-pointer"
              onClick={() => onView(i)}
            >
              <Video size={20} className="text-white/60" />
            </div>
          ) : (
            <ImageWithFallback
              src={item.url}
              alt=""
              className="w-full h-full object-cover cursor-pointer"
              onClick={() => onView(i)}
            />
          )}
          <button
            onClick={(e) => { e.stopPropagation(); onRemove(item.id); }}
            className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <X size={10} className="text-white" />
          </button>
          {item.type === "video" && (
            <div className="absolute bottom-1 left-1 bg-black/60 rounded px-1.5 py-0.5">
              <span className="text-[9px] text-white font-['Poppins']">VID</span>
            </div>
          )}
        </div>
      ))}

      {/* Add buttons */}
      <div className="flex gap-1.5 shrink-0">
        <button
          onClick={() => onAdd("image")}
          className={`${w} ${h} rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center gap-1 hover:bg-gray-100 transition-colors shrink-0`}
        >
          <Camera size={compact ? 14 : 16} className="text-gray-400" />
          <span className="text-[10px] font-['Poppins'] text-gray-400">Photo</span>
        </button>
        <button
          onClick={() => onAdd("video")}
          className={`${w} ${h} rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center gap-1 hover:bg-gray-100 transition-colors shrink-0`}
        >
          <Video size={compact ? 14 : 16} className="text-gray-400" />
          <span className="text-[10px] font-['Poppins'] text-gray-400">Video</span>
        </button>
      </div>
    </div>
  );
}

/* ─── Simple Leaflet Map for stop pins ─── */

function CreateTrailMap({ stops, cityCenter }: { stops: NewStop[]; cityCenter: [number, number] }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  const validStops = stops.filter((s) => s.lat !== 0 && s.lng !== 0);

  useEffect(() => {
    if (!mapRef.current) return;

    if (!mapInstance.current) {
      mapInstance.current = L.map(mapRef.current, {
        center: cityCenter,
        zoom: 13,
        zoomControl: false,
        attributionControl: false,
        dragging: true,
        scrollWheelZoom: false,
      });
      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        maxZoom: 19,
      }).addTo(mapInstance.current);
    }

    // Clear existing markers
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];

    // Add markers for stops with coordinates
    validStops.forEach((stop, i) => {
      const icon = L.divIcon({
        className: "",
        iconSize: [28, 36],
        iconAnchor: [14, 36],
        html: `<svg width="28" height="36" viewBox="0 0 28 36">
          <path d="M14 0C6.268 0 0 6.268 0 14c0 10.5 14 22 14 22s14-11.5 14-22C28 6.268 21.732 0 14 0z" fill="#3B82F6"/>
          <circle cx="14" cy="13" r="8" fill="white"/>
          <text x="14" y="16.5" text-anchor="middle" fill="#3B82F6" font-size="11" font-weight="600" font-family="Inter,sans-serif">${i + 1}</text>
        </svg>`,
      });
      const marker = L.marker([stop.lat, stop.lng], { icon }).addTo(mapInstance.current!);
      markersRef.current.push(marker);
    });

    // Draw polyline connecting stops
    if (validStops.length > 1) {
      const polyline = L.polyline(
        validStops.map((s) => [s.lat, s.lng] as [number, number]),
        { color: "#3B82F6", weight: 3, opacity: 0.6, dashArray: "8, 6" }
      ).addTo(mapInstance.current);
      markersRef.current.push(polyline as any);
    }

    // Fit bounds if we have stops
    if (validStops.length > 0) {
      const bounds = L.latLngBounds(validStops.map((s) => [s.lat, s.lng] as [number, number]));
      mapInstance.current.fitBounds(bounds, { padding: [30, 30], maxZoom: 15 });
    }

    return () => {};
  }, [validStops.length, validStops.map(s => `${s.lat},${s.lng}`).join("|")]);

  useEffect(() => {
    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  }, []);

  return <div ref={mapRef} className="w-full h-full" />;
}

/* ─── Toggle Component ─── */

function Toggle({ on, onToggle }: { on: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={`w-11 h-6 rounded-full relative transition-colors ${on ? "bg-blue-500" : "bg-gray-300"}`}
    >
      <div
        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-transform ${on ? "translate-x-[22px]" : "translate-x-0.5"}`}
      />
    </button>
  );
}

/* ─── Section Header ─── */

function SectionHeader({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle?: string }) {
  return (
    <div className="flex items-center gap-2.5 mb-3">
      <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-[14px] font-['Poppins'] font-semibold text-gray-800">{title}</p>
        {subtitle && <p className="text-[11px] font-['Poppins'] text-gray-400">{subtitle}</p>}
      </div>
    </div>
  );
}

/* ─── Dropdown Picker ─── */

function OptionPicker({
  options,
  selected,
  onSelect,
  placeholder,
}: {
  options: string[];
  selected: string;
  onSelect: (v: string) => void;
  placeholder: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={`w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-left flex items-center justify-between transition-all ${
          open ? "ring-2 ring-blue-200 border-blue-400" : ""
        }`}
      >
        <span className={`text-[14px] font-['Poppins'] ${selected ? "text-gray-800" : "text-gray-400"}`}>
          {selected || placeholder}
        </span>
        <ChevronRight size={16} className={`text-gray-400 transition-transform ${open ? "rotate-90" : ""}`} />
      </button>
      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl border border-gray-200 z-20 max-h-[200px] overflow-y-auto">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => { onSelect(opt); setOpen(false); }}
              className={`w-full px-4 py-2.5 text-left text-[13px] font-['Poppins'] hover:bg-gray-50 transition-colors ${
                selected === opt ? "text-blue-600 bg-blue-50" : "text-gray-700"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ─── Generate random LA coordinates near a base ─── */

function randomCoordNear(base: [number, number], index: number): [number, number] {
  const spread = 0.012;
  const angle = (index * 137.5 * Math.PI) / 180; // golden angle for nice distribution
  const r = spread * (0.4 + Math.random() * 0.6);
  return [base[0] + r * Math.cos(angle), base[1] + r * Math.sin(angle)];
}

/* ────────────────── Main Component ─���──────────────── */

export function CreateTrailPage() {
  const navigate = useNavigate();
  const { user, createTrail } = useUser();
  const selectedCity = getCityById(user.selectedCityId);
  const CITY_CENTER: [number, number] = [selectedCity.lat, selectedCity.lng];

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [duration, setDuration] = useState("");
  const [price, setPrice] = useState("$");
  const [isFreeTrail, setIsFreeTrail] = useState(false);
  const [customPrice, setCustomPrice] = useState("");
  const [distance, setDistance] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [vibe, setVibe] = useState("");
  const [bestTimeOfDay, setBestTimeOfDay] = useState("");
  const [groupFriendly, setGroupFriendly] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [progressiveReveal, setProgressiveReveal] = useState(true);
  const [isPublic, setIsPublic] = useState(true);

  // Cover media
  const [coverMedia, setCoverMedia] = useState<MediaItem[]>([]);

  // Stops
  const [stops, setStops] = useState<NewStop[]>([
    { id: 1, name: "", address: "", teaser: "", lat: 0, lng: 0, media: [], autoPhoto: false, autoPhotoUrl: "", autoPhotoLabel: "", autoPhotoLoading: false, autoPhotoMatches: [], autoPhotoIndex: 0 },
  ]);

  // Media viewer
  const [viewerMedia, setViewerMedia] = useState<MediaItem[] | null>(null);
  const [viewerIndex, setViewerIndex] = useState(0);

  // Published state
  const [isPublishing, setIsPublishing] = useState(false);

  // Address autocomplete
  const [activeAutocompleteStopId, setActiveAutocompleteStopId] = useState<number | null>(null);
  const [addressSuggestions, setAddressSuggestions] = useState<ReturnType<typeof filterAddressSuggestions>>([]);

  // ─── Smart Media: debounced location-based photo match (ADDRESS only) ───
  const autoPhotoTimers = useRef<Record<number, ReturnType<typeof setTimeout>>>({});

  // Fullscreen smart media viewer
  const [smartMediaViewer, setSmartMediaViewer] = useState<{ url: string; label: string } | null>(null);

  const triggerAutoPhoto = useCallback((stopId: number, address: string) => {
    if (autoPhotoTimers.current[stopId]) clearTimeout(autoPhotoTimers.current[stopId]);

    setStops((prev) =>
      prev.map((s) =>
        s.id === stopId && s.autoPhoto ? { ...s, autoPhotoLoading: true } : s
      )
    );

    autoPhotoTimers.current[stopId] = setTimeout(() => {
      const matches = matchAllLocationMedia(address);
      setStops((prev) =>
        prev.map((s) =>
          s.id === stopId
            ? {
                ...s,
                autoPhotoMatches: matches,
                autoPhotoIndex: 0,
                autoPhotoUrl: matches[0]?.url || "",
                autoPhotoLabel: matches[0]?.label || "",
                autoPhotoLoading: false,
              }
            : s
        )
      );
    }, 600);
  }, []);

  const toggleAutoPhoto = (stopId: number) => {
    setStops((prev) =>
      prev.map((s) => {
        if (s.id !== stopId) return s;
        const next = !s.autoPhoto;
        if (next && s.address.trim()) {
          const matches = matchAllLocationMedia(s.address);
          return {
            ...s,
            autoPhoto: true,
            autoPhotoMatches: matches,
            autoPhotoIndex: 0,
            autoPhotoUrl: matches[0]?.url || "",
            autoPhotoLabel: matches[0]?.label || "",
            autoPhotoLoading: false,
          };
        }
        return { ...s, autoPhoto: next, autoPhotoUrl: "", autoPhotoLabel: "", autoPhotoMatches: [], autoPhotoIndex: 0, autoPhotoLoading: false };
      })
    );
  };

  const refreshAutoPhoto = (stopId: number) => {
    setStops((prev) =>
      prev.map((s) => {
        if (s.id !== stopId || s.autoPhotoMatches.length <= 1) return s;
        const nextIdx = (s.autoPhotoIndex + 1) % s.autoPhotoMatches.length;
        return {
          ...s,
          autoPhotoIndex: nextIdx,
          autoPhotoUrl: s.autoPhotoMatches[nextIdx].url,
          autoPhotoLabel: s.autoPhotoMatches[nextIdx].label,
        };
      })
    );
  };

  /** Remove the auto photo and turn off Smart Media — falls back to normal mode.
   *  Any manually-added media already in stop.media is preserved. */
  const removeAutoPhoto = (stopId: number) => {
    setStops((prev) =>
      prev.map((s) =>
        s.id === stopId
          ? {
              ...s,
              autoPhoto: false,
              autoPhotoUrl: "",
              autoPhotoLabel: "",
              autoPhotoMatches: [],
              autoPhotoIndex: 0,
              autoPhotoLoading: false,
            }
          : s
      )
    );
  };

  // Assign coordinates to stops when they have an address
  useEffect(() => {
    setStops((prev) =>
      prev.map((s, i) => {
        if (s.address.trim() && s.lat === 0 && s.lng === 0) {
          const [lat, lng] = randomCoordNear(CITY_CENTER, i);
          return { ...s, lat, lng };
        }
        return s;
      })
    );
  }, [stops.map((s) => s.address).join(",")]);

  const addStop = () => {
    setStops([
      ...stops,
      { id: Date.now(), name: "", address: "", teaser: "", lat: 0, lng: 0, media: [], autoPhoto: false, autoPhotoUrl: "", autoPhotoLabel: "", autoPhotoLoading: false, autoPhotoMatches: [], autoPhotoIndex: 0 },
    ]);
  };

  const removeStop = (id: number) => {
    if (stops.length > 1) {
      setStops(stops.filter((s) => s.id !== id));
    }
  };

  const updateStop = (id: number, field: keyof NewStop, value: any) => {
    setStops(stops.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const addMedia = useCallback((targetSetter: React.Dispatch<React.SetStateAction<MediaItem[]>>, type: "image" | "video") => {
    const newItem: MediaItem = {
      id: `media-${Date.now()}-${Math.random()}`,
      type,
      url: type === "image" ? SAMPLE_IMAGES[Math.floor(Math.random() * SAMPLE_IMAGES.length)] : "",
      thumbnail: type === "image" ? SAMPLE_IMAGES[Math.floor(Math.random() * SAMPLE_IMAGES.length)] : "",
    };
    targetSetter((prev) => [...prev, newItem]);
  }, []);

  const addStopMedia = (stopId: number, type: "image" | "video") => {
    const newItem: MediaItem = {
      id: `media-${Date.now()}-${Math.random()}`,
      type,
      url: type === "image" ? SAMPLE_IMAGES[Math.floor(Math.random() * SAMPLE_IMAGES.length)] : "",
      thumbnail: type === "image" ? SAMPLE_IMAGES[Math.floor(Math.random() * SAMPLE_IMAGES.length)] : "",
    };
    setStops((prev) =>
      prev.map((s) => (s.id === stopId ? { ...s, media: [...s.media, newItem] } : s))
    );
  };

  const removeStopMedia = (stopId: number, mediaId: string) => {
    setStops((prev) =>
      prev.map((s) => (s.id === stopId ? { ...s, media: s.media.filter((m) => m.id !== mediaId) } : s))
    );
  };

  const validStops = stops.filter((s) => s.name.trim() && s.address.trim());
  const canPublish = title.trim() && description.trim() && validStops.length >= 1;

  const handlePublish = () => {
    if (!canPublish) return;
    setIsPublishing(true);

    // Build the Trail object
    const trailId = `user-${Date.now()}`;
    const trailStops: TrailStop[] = stops
      .filter((s) => s.name.trim())
      .map((s, i) => {
        // Collect all media: auto photo first, then manual media
        const allImages: string[] = [];
        if (s.autoPhoto && s.autoPhotoUrl) allImages.push(s.autoPhotoUrl);
        s.media.filter((m) => m.type === "image").forEach((m) => allImages.push(m.url));
        const primaryImage = allImages[0] || coverMedia[0]?.url || SAMPLE_IMAGES[0];
        return {
          id: i + 1,
          name: s.name,
          address: s.address || `${selectedCity.name}`,
          image: primaryImage,
          images: allImages.length > 1 ? allImages : undefined,
          unlocked: i === 0,
          checkedIn: false,
          lat: s.lat || randomCoordNear(CITY_CENTER, i)[0],
          lng: s.lng || randomCoordNear(CITY_CENTER, i)[1],
          teaser: s.teaser || `Discover ${s.name} on this trail`,
        };
      });

    const newTrail: Trail = {
      id: trailId,
      title,
      image: coverMedia[0]?.url || stops.find(s => s.autoPhoto && s.autoPhotoUrl)?.autoPhotoUrl || SAMPLE_IMAGES[0],
      date: date ? new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "Today",
      duration: duration || "1-2 hrs",
      price: isFreeTrail ? "Free" : (customPrice ? `$${customPrice}` : "$"),
      isFree: isFreeTrail,
      numericPrice: isFreeTrail ? 0 : (customPrice ? parseFloat(customPrice) : undefined),
      currency: "USD",
      hostName: user.name || "You",
      hostHandle: user.handle || "@you",
      hostAvatar: user.avatar,
      hostFollowers: `${user.followers}`,
      hostBio: user.bio || "Trail creator on CityUnlock",
      description,
      totalStops: trailStops.length,
      totalDuration: duration || "1-2 hrs",
      distance: distance || "1.2 mi",
      joined: 0,
      rating: 5.0,
      views: 0,
      badge: undefined,
      status: "live",
      lat: trailStops[0]?.lat || CITY_CENTER[0],
      lng: trailStops[0]?.lng || CITY_CENTER[1],
      color: "#3B82F6",
      tags: selectedTags,
      meta: ["new"],
      neighborhood: neighborhood || selectedCity.name,
      vibe: vibe || "Fresh & new experience",
      bestTimeOfDay: bestTimeOfDay || "Anytime",
      groupFriendly,
      stops: trailStops,
    };

    setTimeout(() => {
      createTrail(newTrail);
      setIsPublishing(false);
      navigate("/");
      showToast(
        "Trail Published!",
        `${title} is now live — find it on your discovery feed.`,
        4000
      );
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#f8f8fa]">
      {/* ─── Fixed Back Button ─── */}
      <button
        onClick={() => navigate(-1)}
        className="fixed top-4 left-4 z-50 bg-[rgba(30,30,30,0.35)] backdrop-blur-md rounded-full p-2 border border-white/40 max-w-[430px]"
        style={{ left: "max(16px, calc(50% - 215px + 16px))" }}
      >
        <ChevronLeft size={20} className="text-white" />
      </button>

      {/* ─── Gradient Header ─── */}
      <div
        className="px-4 pt-4 pb-8"
        style={{
          backgroundImage:
            "linear-gradient(126.8deg, rgb(146, 190, 255) 0%, rgb(190, 236, 255) 24%, rgb(242, 189, 151) 55%, rgb(255, 222, 222) 100%)",
        }}
      >
        <div className="flex items-center justify-center mb-3 pt-1">
          <div className="w-9" />
          <h2 className="text-[16px] font-['Poppins'] font-semibold text-gray-900 flex-1 text-center">
            Create New Trail
          </h2>
          <div className="w-9" />
        </div>
        <p className="text-[13px] font-['Poppins'] text-gray-700 text-center">
          Design your trail, add stops, and share it with the world
        </p>
      </div>

      {/* ─── Form Body ─── */}
      <div className="px-4 -mt-4 bg-[#f8f8fa] rounded-t-[24px] relative z-10 pt-6 pb-32">

        {/* ━━━ Section: Cover Media ━━━ */}
        <div className="mb-6">
          <SectionHeader
            icon={<Camera size={15} className="text-gray-400" />}
            title="Cover Media"
            subtitle="Add photos or videos for your trail cover"
          />
          {coverMedia.length === 0 ? (
            <div className="flex gap-2">
              <button
                onClick={() => addMedia(setCoverMedia, "image")}
                className="flex-1 h-[140px] bg-white rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                  <Camera size={22} className="text-blue-400" />
                </div>
                <p className="text-[13px] font-['Poppins'] text-gray-400">Add Photo</p>
              </button>
              <button
                onClick={() => addMedia(setCoverMedia, "video")}
                className="flex-1 h-[140px] bg-white rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center">
                  <Video size={22} className="text-purple-400" />
                </div>
                <p className="text-[13px] font-['Poppins'] text-gray-400">Add Video</p>
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-3 border border-gray-100">
              <MediaGallery
                media={coverMedia}
                onAdd={(type) => addMedia(setCoverMedia, type)}
                onRemove={(id) => setCoverMedia((prev) => prev.filter((m) => m.id !== id))}
                onView={(i) => { setViewerMedia(coverMedia); setViewerIndex(i); }}
              />
            </div>
          )}
        </div>

        {/* ━━━ Section: Basic Info ━━━ */}
        <div className="mb-6">
          <SectionHeader
            icon={<FileText size={15} className="text-gray-400" />}
            title="Basic Information"
          />
          <div className="bg-white rounded-2xl p-4 border border-gray-100 flex flex-col gap-4">
            <div>
              <label className="text-[12px] font-['Poppins'] font-medium text-gray-500 mb-1.5 block">
                Trail Name *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Coffee & Comics Trail"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-[14px] font-['Poppins'] text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all"
              />
            </div>
            <div>
              <label className="text-[12px] font-['Poppins'] font-medium text-gray-500 mb-1.5 block">
                Description *
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe what makes this trail special..."
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-[14px] font-['Poppins'] text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all resize-none"
              />
            </div>
          </div>
        </div>

        {/* ━━━ Section: Trail Details ━━━ */}
        <div className="mb-6">
          <SectionHeader
            icon={<MapPin size={15} className="text-gray-400" />}
            title="Trail Details"
            subtitle="These appear on the trail card & detail page"
          />
          <div className="bg-white rounded-2xl p-4 border border-gray-100 flex flex-col gap-4">
            {/* Date & Duration */}
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="text-[12px] font-['Poppins'] font-medium text-gray-500 mb-1.5 block">
                  Date
                </label>
                <div className="relative">
                  <Calendar size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full pl-10 pr-3 py-3 rounded-xl bg-gray-50 border border-gray-200 text-[13px] font-['Poppins'] text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all"
                  />
                </div>
              </div>
              <div className="flex-1">
                <label className="text-[12px] font-['Poppins'] font-medium text-gray-500 mb-1.5 block">
                  Duration
                </label>
                <div className="relative">
                  <Clock size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="e.g., 1-2 hrs"
                    className="w-full pl-10 pr-3 py-3 rounded-xl bg-gray-50 border border-gray-200 text-[13px] font-['Poppins'] text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Distance */}
            <div>
              <label className="text-[12px] font-['Poppins'] font-medium text-gray-500 mb-1.5 block">
                Distance
              </label>
              <input
                type="text"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                placeholder="e.g., 1.2 mi"
                className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-200 text-[14px] font-['Poppins'] text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all"
              />
            </div>

            {/* Neighborhood */}
            <div>
              <label className="text-[12px] font-['Poppins'] font-medium text-gray-500 mb-1.5 block">
                Neighborhood
              </label>
              <OptionPicker
                options={NEIGHBORHOOD_OPTIONS}
                selected={neighborhood}
                onSelect={setNeighborhood}
                placeholder="Select neighborhood"
              />
            </div>

            {/* Vibe */}
            <div>
              <label className="text-[12px] font-['Poppins'] font-medium text-gray-500 mb-1.5 block">
                Vibe
              </label>
              <OptionPicker
                options={VIBE_OPTIONS}
                selected={vibe}
                onSelect={setVibe}
                placeholder="What's the vibe?"
              />
            </div>

            {/* Best Time of Day */}
            <div>
              <label className="text-[12px] font-['Poppins'] font-medium text-gray-500 mb-1.5 block">
                Best Time of Day
              </label>
              <div className="flex gap-2">
                {TIME_OPTIONS.map((t) => (
                  <button
                    key={t}
                    onClick={() => setBestTimeOfDay(t)}
                    className={`flex-1 py-2.5 rounded-xl text-[12px] font-['Poppins'] font-medium transition-all ${
                      bestTimeOfDay === t
                        ? "bg-blue-600 text-white"
                        : "bg-gray-50 text-gray-600 border border-gray-200"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Pricing */}
            <div>
              <label className="text-[12px] font-['Poppins'] font-medium text-gray-500 mb-1.5 block">
                Pricing
              </label>
              <div className="flex gap-1.5 mb-3">
                <button
                  onClick={() => {
                    setIsFreeTrail(true);
                    setPrice("Free");
                  }}
                  className={`px-4 py-1.5 rounded-lg text-[13px] font-['Poppins'] font-medium transition-all ${
                    isFreeTrail
                      ? "bg-emerald-50 border border-emerald-300 text-emerald-600"
                      : "bg-gray-50 text-gray-500 border border-gray-200"
                  }`}
                >
                  Free
                </button>
                <button
                  onClick={() => {
                    setIsFreeTrail(false);
                    setPrice(customPrice ? `$${customPrice}` : "$");
                  }}
                  className={`px-4 py-1.5 rounded-lg text-[13px] font-['Poppins'] font-medium transition-all ${
                    !isFreeTrail
                      ? "bg-blue-600 text-white"
                      : "bg-gray-50 text-gray-500 border border-gray-200"
                  }`}
                >
                  Paid
                </button>
              </div>
              {!isFreeTrail && (
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[16px] font-['Inter'] font-medium text-gray-400">$</span>
                  <input
                    type="number"
                    min="1"
                    max="999"
                    placeholder="0.00"
                    value={customPrice}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^0-9.]/g, "");
                      setCustomPrice(val);
                      setPrice(val ? `$${val}` : "$");
                    }}
                    className="w-full pl-8 pr-4 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-[14px] font-['Inter'] text-gray-800 placeholder:text-gray-300 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-100 transition-all"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ━━━ Section: Category Tags ━━━ */}
        <div className="mb-6">
          <SectionHeader
            icon={<Tag size={15} className="text-gray-400" />}
            title="Category Tags"
            subtitle="Select up to 3 categories"
          />
          <div className="bg-white rounded-2xl p-4 border border-gray-100">
            <div className="flex flex-wrap gap-2">
              {CATEGORY_TAGS.map((tag) => {
                const active = selectedTags.includes(tag.tag);
                return (
                  <button
                    key={tag.tag}
                    onClick={() => {
                      if (!active && selectedTags.length >= 3) return;
                      toggleTag(tag.tag);
                    }}
                    className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[12px] font-['Poppins'] font-medium transition-all ${
                      active
                        ? "bg-blue-600 text-white"
                        : selectedTags.length >= 3
                        ? "bg-gray-50 text-gray-300 border border-gray-100 cursor-not-allowed"
                        : "bg-gray-50 text-gray-600 border border-gray-200"
                    }`}
                  >
                    <span className="text-[13px]">{tag.emoji}</span>
                    {tag.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ━━━ Section: Trail Stops ━━━ */}
        <div className="mb-6">
          <SectionHeader
            icon={<MapPin size={15} className="text-gray-400" />}
            title="Trail Stops"
            subtitle={`${stops.length} stop${stops.length > 1 ? "s" : ""} added`}
          />
          <div className="flex flex-col gap-3">
            {stops.map((stop, idx) => (
              <div
                key={stop.id}
                className={`bg-white rounded-2xl p-4 border transition-all ${stop.autoPhoto ? "border-blue-200" : "border-gray-100"}`}
              >
                {/* Header: stop number + Smart Photo toggle + delete */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                      <span className="text-[11px] font-['Inter'] font-semibold text-white">{idx + 1}</span>
                    </div>
                    <span className="text-[13px] font-['Poppins'] font-semibold text-gray-800">
                      Stop {idx + 1}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleAutoPhoto(stop.id)}
                      className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 transition-all ${
                        stop.autoPhoto
                          ? "bg-blue-50 border border-blue-200"
                          : "bg-gray-50 border border-gray-200"
                      }`}
                    >
                      <Wand2 size={12} className={stop.autoPhoto ? "text-blue-500" : "text-gray-400"} />
                      <span className={`text-[11px] font-['Poppins'] font-medium ${stop.autoPhoto ? "text-blue-600" : "text-gray-400"}`}>
                        Smart Media
                      </span>
                    </button>
                    {stops.length > 1 && (
                      <button
                        onClick={() => removeStop(stop.id)}
                        className="text-red-400 hover:text-red-500 p-1"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>

                {/* (Smart Media preview is now below teaser) */}

                <div className="flex flex-col gap-2.5">
                  <input
                    type="text"
                    value={stop.name}
                    onChange={(e) => updateStop(stop.id, "name", e.target.value)}
                    placeholder="Stop name *"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-[14px] font-['Poppins'] text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  />
                  <div className="relative">
                    <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
                    <input
                      type="text"
                      value={stop.address}
                      onChange={(e) => {
                        const val = e.target.value;
                        updateStop(stop.id, "address", val);
                        if (stop.autoPhoto) triggerAutoPhoto(stop.id, val);
                        const matches = filterAddressSuggestions(val);
                        setAddressSuggestions(matches);
                        setActiveAutocompleteStopId(matches.length > 0 ? stop.id : null);
                      }}
                      onFocus={() => {
                        const matches = filterAddressSuggestions(stop.address);
                        if (matches.length > 0) {
                          setAddressSuggestions(matches);
                          setActiveAutocompleteStopId(stop.id);
                        }
                      }}
                      onBlur={() => {
                        // Small delay so click on suggestion registers first
                        setTimeout(() => setActiveAutocompleteStopId(null), 200);
                      }}
                      placeholder="Address or location *"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-[13px] font-['Poppins'] text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                    {/* Autocomplete dropdown */}
                    {activeAutocompleteStopId === stop.id && addressSuggestions.length > 0 && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl border border-gray-200 z-30 max-h-[210px] overflow-y-auto">
                        {addressSuggestions.map((s, si) => (
                          <button
                            key={si}
                            className="w-full px-3 py-2.5 text-left flex items-start gap-2 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
                            onMouseDown={(e) => {
                              e.preventDefault(); // Prevent blur from firing first
                              updateStop(stop.id, "address", s.address);
                              if (stop.autoPhoto) triggerAutoPhoto(stop.id, s.address);
                              setActiveAutocompleteStopId(null);
                              setAddressSuggestions([]);
                            }}
                          >
                            <MapPin size={13} className="text-gray-300 mt-0.5 shrink-0" />
                            <div className="flex-1 min-w-0">
                              <p className="text-[12px] font-['Poppins'] font-medium text-gray-800 truncate">
                                {s.display}
                              </p>
                              <p className="text-[10px] font-['Poppins'] text-gray-400 truncate">
                                {s.address}
                              </p>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  <textarea
                    value={stop.teaser}
                    onChange={(e) => updateStop(stop.id, "teaser", e.target.value)}
                    placeholder="Teaser hint (shown before unlocking)"
                    rows={2}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-[13px] font-['Poppins'] text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 resize-none"
                  />

                  {/* ── Smart Media preview (below teaser, location-driven) ── */}
                  {stop.autoPhoto ? (
                    <div className="flex flex-col gap-2">
                      {stop.autoPhotoLoading ? (
                        <div className="h-[140px] rounded-xl bg-gray-50 border border-gray-200 flex flex-col items-center justify-center gap-2">
                          <Loader2 size={22} className="text-blue-400 animate-spin" />
                          <span className="text-[12px] font-['Poppins'] text-gray-400">Searching location media...</span>
                        </div>
                      ) : stop.autoPhotoUrl ? (
                        <>
                          {/* ── Auto photo + Add Photo/Video side panel ── */}
                          <div className="flex gap-2">
                            {/* Auto-matched photo card — fills remaining width */}
                            <div
                              className="relative flex-1 min-w-0 h-[160px] rounded-xl overflow-hidden border border-blue-200 cursor-pointer active:scale-[0.98] transition-transform"
                              onClick={() => setSmartMediaViewer({ url: stop.autoPhotoUrl, label: stop.autoPhotoLabel })}
                            >
                              <ImageWithFallback
                                src={stop.autoPhotoUrl}
                                alt={stop.autoPhotoLabel}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                              {/* Label + counter */}
                              <div className="absolute bottom-2 left-2.5 right-2.5 flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                  <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
                                    <Wand2 size={8} className="text-white" />
                                  </div>
                                  <span className="text-[11px] font-['Poppins'] font-medium text-white truncate max-w-[100px]">
                                    {stop.autoPhotoLabel}
                                  </span>
                                </div>
                                {stop.autoPhotoMatches.length > 1 && (
                                  <span className="text-[9px] font-['Poppins'] text-white/60">
                                    {stop.autoPhotoIndex + 1}/{stop.autoPhotoMatches.length}
                                  </span>
                                )}
                              </div>
                              {/* ✕ remove auto photo (top-left) */}
                              <button
                                onClick={(e) => { e.stopPropagation(); removeAutoPhoto(stop.id); }}
                                className="absolute top-2 left-2 w-6 h-6 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-red-500/80 transition-colors active:scale-90"
                              >
                                <X size={12} className="text-white" />
                              </button>
                              {/* Refresh / cycle (top-right) */}
                              {stop.autoPhotoMatches.length > 1 && (
                                <button
                                  onClick={(e) => { e.stopPropagation(); refreshAutoPhoto(stop.id); }}
                                  className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center hover:bg-black/70 transition-colors active:scale-90"
                                >
                                  <RefreshCw size={12} className="text-white" />
                                </button>
                              )}
                            </div>

                            {/* Add Photo / Add Video stacked on the right side */}
                            <div className="flex flex-col gap-2 w-[72px] shrink-0">
                              <button
                                onClick={() => addStopMedia(stop.id, "image")}
                                className="flex-1 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center gap-1 hover:bg-gray-100 hover:border-gray-300 transition-colors active:scale-95"
                              >
                                <Camera size={16} className="text-gray-400" />
                                <span className="text-[10px] font-['Poppins'] font-medium text-gray-400 leading-tight">Photo</span>
                              </button>
                              <button
                                onClick={() => addStopMedia(stop.id, "video")}
                                className="flex-1 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center gap-1 hover:bg-gray-100 hover:border-gray-300 transition-colors active:scale-95"
                              >
                                <Video size={16} className="text-gray-400" />
                                <span className="text-[10px] font-['Poppins'] font-medium text-gray-400 leading-tight">Video</span>
                              </button>
                            </div>
                          </div>

                          {/* ── Manually-added media strip (only if any exist) ── */}
                          {stop.media.length > 0 && (
                            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
                              {stop.media.map((item, i) => (
                                <div key={item.id} className="relative w-[110px] h-[110px] rounded-xl overflow-hidden border border-gray-200 shrink-0">
                                  {item.type === "video" ? (
                                    <div
                                      className="w-full h-full bg-gray-800 flex items-center justify-center cursor-pointer"
                                      onClick={() => { setViewerMedia(stop.media); setViewerIndex(i); }}
                                    >
                                      <Video size={20} className="text-white/60" />
                                    </div>
                                  ) : (
                                    <ImageWithFallback
                                      src={item.url}
                                      alt=""
                                      className="w-full h-full object-cover cursor-pointer"
                                      onClick={() => { setViewerMedia(stop.media); setViewerIndex(i); }}
                                    />
                                  )}
                                  <button
                                    onClick={(e) => { e.stopPropagation(); removeStopMedia(stop.id, item.id); }}
                                    className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-black/60 flex items-center justify-center"
                                  >
                                    <X size={10} className="text-white" />
                                  </button>
                                  {item.type === "video" && (
                                    <div className="absolute bottom-1 left-1 bg-black/60 rounded px-1.5 py-0.5">
                                      <span className="text-[9px] text-white font-['Poppins']">VID</span>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </>
                      ) : stop.address.trim() ? (
                        <div className="h-[72px] rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center gap-2 px-4">
                          <Wand2 size={16} className="text-amber-400 shrink-0" />
                          <p className="text-[12px] font-['Poppins'] text-amber-600 text-center">
                            No match for this address — try a neighborhood name or landmark
                          </p>
                        </div>
                      ) : (
                        <div className="h-[72px] rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center gap-2 px-4">
                          <MapPin size={16} className="text-blue-400 shrink-0" />
                          <p className="text-[12px] font-['Poppins'] text-blue-500 text-center">
                            Enter a location above to auto-find the best photo
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div>
                      <p className="text-[12px] font-['Poppins'] text-gray-400 mb-1.5">Stop Media</p>
                      <MediaGallery
                        media={stop.media}
                        onAdd={(type) => addStopMedia(stop.id, type)}
                        onRemove={(mediaId) => removeStopMedia(stop.id, mediaId)}
                        onView={(i) => { setViewerMedia(stop.media); setViewerIndex(i); }}
                        compact
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={addStop}
            className="w-full mt-3 py-3 rounded-xl border-2 border-dashed border-gray-200 bg-white text-[14px] font-['Poppins'] font-medium text-gray-500 flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
          >
            <Plus size={18} />
            Add Another Stop
          </button>
        </div>

        {/* ━━━ Section: Map Preview ━━━ */}
        <div className="mb-6">
          <SectionHeader
            icon={<MapPin size={15} className="text-gray-400" />}
            title="Route Preview"
            subtitle={validStops.length > 0 ? `${validStops.length} stop${validStops.length > 1 ? "s" : ""} on map` : "Add stops with addresses to see them here"}
          />
          <div className="rounded-2xl h-[180px] overflow-hidden border border-gray-100 bg-white relative">
            <CreateTrailMap stops={stops} cityCenter={CITY_CENTER} />
            {validStops.length === 0 && (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 pointer-events-none">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-5 py-4 flex flex-col items-center gap-1.5 border border-gray-100">
                  <MapPin size={20} className="text-gray-400" />
                  <p className="text-[13px] font-['Poppins'] font-medium text-gray-500">
                    Your stops will appear here
                  </p>
                  <p className="text-[11px] font-['Poppins'] text-gray-400 text-center">
                    Add stop names & addresses above to see them on the map
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ━━━ Section: Settings ━━━ */}
        <div className="mb-6">
          <SectionHeader
            icon={<Sparkles size={15} className="text-gray-400" />}
            title="Trail Settings"
          />
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-50">
              <div className="flex items-center gap-3">
                <Eye size={16} className="text-gray-500" />
                <div>
                  <span className="text-[14px] font-['Poppins'] text-gray-700 block">Progressive Reveal</span>
                  <span className="text-[11px] font-['Poppins'] text-gray-400">Stops unlock one at a time</span>
                </div>
              </div>
              <Toggle on={progressiveReveal} onToggle={() => setProgressiveReveal(!progressiveReveal)} />
            </div>
            <div className="flex items-center justify-between p-4 border-b border-gray-50">
              <div className="flex items-center gap-3">
                <Users size={16} className="text-gray-500" />
                <div>
                  <span className="text-[14px] font-['Poppins'] text-gray-700 block">Group Friendly</span>
                  <span className="text-[11px] font-['Poppins'] text-gray-400">Suitable for groups</span>
                </div>
              </div>
              <Toggle on={groupFriendly} onToggle={() => setGroupFriendly(!groupFriendly)} />
            </div>
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                <Upload size={16} className="text-gray-500" />
                <div>
                  <span className="text-[14px] font-['Poppins'] text-gray-700 block">Public Trail</span>
                  <span className="text-[11px] font-['Poppins'] text-gray-400">Visible to all users</span>
                </div>
              </div>
              <Toggle on={isPublic} onToggle={() => setIsPublic(!isPublic)} />
            </div>
          </div>
        </div>

        {/* ━━━ Preview Summary ━━━ */}
        {title.trim() && (
          <div className="mb-6">
            <SectionHeader
              icon={<Eye size={15} className="text-gray-400" />}
              title="Card Preview"
              subtitle="How your trail will appear"
            />
            <div className="bg-white rounded-2xl p-3 border border-gray-100">
              <div className="relative h-[140px] rounded-xl overflow-hidden mb-2">
                {coverMedia.length > 0 ? (
                  <ImageWithFallback src={coverMedia[0].url} alt={title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                    <ImageIcon size={32} className="text-blue-300" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-2 left-3 right-3">
                  <p className="text-white font-['Poppins'] text-[16px] leading-tight">{title}</p>
                  <p className="text-white/70 font-['Poppins'] text-[11px] mt-0.5">{neighborhood || selectedCity.name}</p>
                </div>
                <div className="absolute top-2 right-2 bg-black/50 backdrop-blur-sm rounded-full px-2 h-[22px] flex items-center">
                  <span className="text-[11px] font-['Poppins'] text-white">{duration || "—"}</span>
                </div>
              </div>
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg overflow-hidden">
                    <ImageWithFallback src={user.avatar} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-[11px] text-gray-400 font-['Poppins'] leading-tight">Hosted by</p>
                    <p className="text-[12px] font-['Poppins'] text-gray-800 leading-tight">
                      {(user.handle || "@you").replace("@", "")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[13px] font-['Inter'] font-medium" style={isFreeTrail ? { color: "#00EC20" } : undefined}>{isFreeTrail ? "Free" : (customPrice ? `$${customPrice}` : "$")}</span>
                  <div className="bg-blue-50 rounded-full px-2 py-0.5">
                    <span className="text-[10px] font-['Poppins'] font-medium text-blue-600">
                      {selectedTags.length > 0 ? CATEGORY_TAGS.find(t => t.tag === selectedTags[0])?.emoji : "📍"} {selectedTags.length > 0 ? CATEGORY_TAGS.find(t => t.tag === selectedTags[0])?.label : "Trail"}
                    </span>
                  </div>
                </div>
              </div>
              {vibe && (
                <p className="text-[12px] font-['Poppins'] italic text-gray-400 mt-1 px-1">{vibe}</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ─── Publish CTA ─── */}
      <div className="fixed bottom-0 left-0 right-0 w-full max-w-[430px] mx-auto p-4 bg-white/95 backdrop-blur-md border-t border-gray-100 z-20">
        <button
          onClick={handlePublish}
          disabled={!canPublish || isPublishing}
          className={`w-full py-4 rounded-2xl text-white font-['Poppins'] text-[16px] font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98] ${
            !canPublish || isPublishing ? "opacity-50 cursor-not-allowed" : ""
          }`}
          style={{
            backgroundImage:
              "linear-gradient(102deg, rgb(0, 5, 30) 12%, rgb(3, 3, 192) 39%, rgb(56, 125, 236) 84%, rgb(133, 200, 255) 101%)",
          }}
        >
          {isPublishing ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Publishing...
            </>
          ) : (
            <>
              <Upload size={18} />
              Publish Trail
            </>
          )}
        </button>
        {!canPublish && (
          <p className="text-[11px] font-['Poppins'] text-gray-400 text-center mt-2">
            Add a title, description, and at least 1 stop with name & address
          </p>
        )}
      </div>

      {/* ─── Fullscreen Media Viewer ─── */}
      {viewerMedia && (
        <MediaViewer
          media={viewerMedia}
          initialIndex={viewerIndex}
          onClose={() => setViewerMedia(null)}
        />
      )}

      {/* ─── Fullscreen Smart Media Viewer ─── */}
      {smartMediaViewer && (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col">
          <div className="flex items-center justify-between px-4 pt-4 pb-2">
            <button onClick={() => setSmartMediaViewer(null)} className="text-white p-2">
              <X size={24} />
            </button>
            <div className="flex items-center gap-1.5">
              <Wand2 size={14} className="text-blue-400" />
              <span className="text-white/70 text-[13px] font-['Poppins']">Smart Media</span>
            </div>
            <div className="w-10" />
          </div>
          <div className="flex-1 flex items-center justify-center px-4">
            <ImageWithFallback
              src={smartMediaViewer.url}
              alt={smartMediaViewer.label}
              className="w-full max-h-[80vh] object-contain rounded-2xl"
            />
          </div>
          <div className="flex flex-col items-center gap-2 py-6">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <MapPin size={14} className="text-blue-400" />
              <span className="text-[14px] font-['Poppins'] font-medium text-white">{smartMediaViewer.label}</span>
            </div>
            <p className="text-[12px] font-['Poppins'] text-white/50">Location-matched photo</p>
          </div>
        </div>
      )}
    </div>
  );
}