/**
 * City configuration for CityUnlock.
 * Each city has a display name, coordinates, and keywords for the Eventbrite API.
 */

export interface CityConfig {
  id: string;
  name: string;
  shortName: string;
  lat: number;
  lng: number;
  /** Eventbrite location.address value */
  ebQuery: string;
  /** Emoji flag / icon for the picker */
  emoji: string;
}

export const CITIES: CityConfig[] = [
  { id: "los-angeles", name: "Los Angeles", shortName: "LA", lat: 34.0522, lng: -118.2437, ebQuery: "Los Angeles", emoji: "\uD83C\uDF34" },
  { id: "new-york", name: "New York City", shortName: "NYC", lat: 40.7128, lng: -74.0060, ebQuery: "New York", emoji: "\uD83C\uDDFA\uD83C\uDDF8" },
  { id: "san-francisco", name: "San Francisco", shortName: "SF", lat: 37.7749, lng: -122.4194, ebQuery: "San Francisco", emoji: "\uD83C\uDF09" },
  { id: "chicago", name: "Chicago", shortName: "CHI", lat: 41.8781, lng: -87.6298, ebQuery: "Chicago", emoji: "\uD83C\uDF2C\uFE0F" },
  { id: "miami", name: "Miami", shortName: "MIA", lat: 25.7617, lng: -80.1918, ebQuery: "Miami", emoji: "\uD83C\uDFD6\uFE0F" },
  { id: "austin", name: "Austin", shortName: "ATX", lat: 30.2672, lng: -97.7431, ebQuery: "Austin", emoji: "\uD83E\uDD20" },
  { id: "seattle", name: "Seattle", shortName: "SEA", lat: 47.6062, lng: -122.3321, ebQuery: "Seattle", emoji: "\u2615" },
  { id: "denver", name: "Denver", shortName: "DEN", lat: 39.7392, lng: -104.9903, ebQuery: "Denver", emoji: "\uD83C\uDFD4\uFE0F" },
  { id: "portland", name: "Portland", shortName: "PDX", lat: 45.5152, lng: -122.6784, ebQuery: "Portland", emoji: "\uD83C\uDF32" },
  { id: "nashville", name: "Nashville", shortName: "NSH", lat: 36.1627, lng: -86.7816, ebQuery: "Nashville", emoji: "\uD83C\uDFB5" },
];

export const DEFAULT_CITY = CITIES[0]; // Los Angeles

export function getCityById(id: string): CityConfig {
  return CITIES.find((c) => c.id === id) || DEFAULT_CITY;
}
