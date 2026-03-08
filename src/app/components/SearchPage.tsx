import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import {
  Search,
  X,
  MapPin,
  Star,
  Clock,
  Users,
  TrendingUp,
  ChevronLeft,
  Palette,
  Coffee,
  Camera,
  Dumbbell,
  ShoppingBag,
  UtensilsCrossed,
  Sparkles,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { MapPreview } from "./MapPreview";
import { creators, getTrailsForCity } from "../data/trailData";
import { useUser } from "../data/userStore";
import { getCityById } from "../data/cities";

const quickCategories = [
  { label: "Food", icon: UtensilsCrossed, color: "#FF6900", bg: "bg-orange-50" },
  { label: "Art", icon: Palette, color: "#8B5CF6", bg: "bg-purple-50" },
  { label: "Coffee", icon: Coffee, color: "#92400E", bg: "bg-amber-50" },
  { label: "Sports", icon: Dumbbell, color: "#155DFC", bg: "bg-blue-50" },
  { label: "Photo", icon: Camera, color: "#EC4899", bg: "bg-pink-50" },
  { label: "Shop", icon: ShoppingBag, color: "#F59E0B", bg: "bg-yellow-50" },
];

const trendingSearches = [
  "Coffee trails Silver Lake",
  "Art galleries DTLA",
  "Street art Venice",
  "Skate spots",
  "Taco tours Boyle Heights",
];

export function SearchPage() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const selectedCity = useMemo(() => getCityById(user.selectedCityId), [user.selectedCityId]);
  const cityTrails = useMemo(() => getTrailsForCity(selectedCity.id), [selectedCity.id]);

  const filteredTrails = useMemo(() => {
    let results = [...cityTrails];
    if (query.trim()) {
      const q = query.toLowerCase();
      results = results.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.hostName.toLowerCase().includes(q) ||
          t.hostHandle.toLowerCase().includes(q)
      );
    }
    return results;
  }, [query, cityTrails]);

  const filteredCreators = useMemo(() => {
    if (!query.trim()) return creators;
    const q = query.toLowerCase();
    return creators.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.handle.toLowerCase().includes(q) ||
        c.bio.toLowerCase().includes(q)
    );
  }, [query]);

  const hasQuery = query.trim().length > 0;

  return (
    <div className="min-h-screen bg-gray-50 pb-28 lg:pb-12">
      {/* Header */}
      <div className="bg-white px-4 lg:px-8 pt-4 pb-4 border-b border-gray-100">
        <div className="lg:max-w-4xl lg:mx-auto">
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => navigate(-1)}
            className="p-1"
          >
            <ChevronLeft size={22} className="text-gray-600" />
          </button>
          <h2 className="font-['Poppins'] text-[18px] font-semibold text-gray-900">
            Search
          </h2>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search trails, creators, places..."
            className="w-full pl-11 pr-10 py-3.5 rounded-xl bg-gray-50 border border-gray-200 text-[14px] font-['Poppins'] text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all"
            autoFocus
          />
          {hasQuery && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 bg-gray-200 rounded-full"
            >
              <X size={14} className="text-gray-500" />
            </button>
          )}
        </div>

        {/* Quick Category Chips */}
        <div className="flex gap-2 mt-3 overflow-x-auto scrollbar-hide">
          {quickCategories.map((cat) => (
            <button
              key={cat.label}
              onClick={() => {
                setActiveCategory(activeCategory === cat.label ? null : cat.label);
                setQuery(activeCategory === cat.label ? "" : cat.label);
              }}
              className={`flex items-center gap-1.5 shrink-0 px-3 py-2 rounded-full border transition-all ${
                activeCategory === cat.label
                  ? "bg-blue-50 border-blue-200"
                  : "bg-white border-gray-200 hover:bg-gray-50"
              }`}
            >
              <cat.icon
                size={14}
                style={{ color: activeCategory === cat.label ? "#155DFC" : cat.color }}
              />
              <span
                className={`text-[12px] font-['Poppins'] font-medium ${
                  activeCategory === cat.label ? "text-blue-600" : "text-gray-600"
                }`}
              >
                {cat.label}
              </span>
            </button>
          ))}
        </div>
        </div>
      </div>

      <div className="px-4 lg:px-8 pt-4">
        <div className="lg:max-w-4xl lg:mx-auto">
        {/* No query: Show trending & popular */}
        {!hasQuery && (
          <>
            {/* Trending Searches */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp size={16} className="text-blue-500" />
                <h3 className="font-['Poppins'] text-[14px] font-semibold text-gray-800">
                  Trending Searches
                </h3>
              </div>
              <div className="flex flex-col gap-1">
                {trendingSearches.map((search) => (
                  <button
                    key={search}
                    onClick={() => setQuery(search)}
                    className="flex items-center gap-3 py-2.5 px-3 rounded-xl hover:bg-white transition-colors text-left"
                  >
                    <Search size={14} className="text-gray-300" />
                    <span className="font-['Poppins'] text-[13px] text-gray-600">
                      {search}
                    </span>
                    <TrendingUp
                      size={12}
                      className="text-orange-400 ml-auto"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Popular Creators */}
            <div className="mb-6">
              <h3 className="font-['Poppins'] text-[14px] font-semibold text-gray-800 mb-3">
                Popular Creators
              </h3>
              <div className="flex gap-3 overflow-x-auto scrollbar-hide">
                {creators.map((creator) => (
                  <div
                    key={creator.id}
                    onClick={() => navigate(`/creator/${creator.id}`)}
                    className="shrink-0 w-[140px] bg-white rounded-xl p-3 border border-gray-100 cursor-pointer hover:shadow-sm transition-all"
                  >
                    <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gray-100 mx-auto mb-2">
                      <ImageWithFallback
                        src={creator.avatar}
                        alt={creator.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="font-['Poppins'] text-[13px] font-medium text-gray-800 text-center truncate">
                      {creator.name}
                    </p>
                    <p className="font-['Poppins'] text-[11px] text-gray-400 text-center truncate">
                      {creator.handle}
                    </p>
                    <p className="font-['Poppins'] text-[10px] text-blue-500 text-center mt-1">
                      {creator.trailsCreated} trails
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Nearby Trails Map */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-['Poppins'] text-[14px] font-semibold text-gray-800 flex items-center gap-1.5">
                  <MapPin size={14} className="text-blue-500" />
                  Nearby Trails
                </h3>
                <button
                  onClick={() => navigate("/explore")}
                  className="text-[12px] font-['Poppins'] font-medium text-blue-500"
                >
                  Open Map
                </button>
              </div>
              <MapPreview
                label="Nearby Trails"
                respectStopVisibility={false}
                centerOverride={[selectedCity.lat, selectedCity.lng]}
                trailsData={cityTrails}
              />
            </div>

            {/* Explore Trails */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={16} className="text-yellow-500" />
                <h3 className="font-['Poppins'] text-[14px] font-semibold text-gray-800">
                  Explore All Trails
                </h3>
              </div>
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {cityTrails.map((trail) => (
                  <div
                    key={trail.id}
                    onClick={() => navigate(`/trail/${trail.id}`)}
                    className="bg-white rounded-xl overflow-hidden border border-gray-100 cursor-pointer hover:shadow-sm transition-all"
                  >
                    <div className="relative h-[100px]">
                      <ImageWithFallback
                        src={trail.image}
                        alt={trail.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute bottom-2 left-2 right-2">
                        <p className="font-['Poppins'] text-[12px] font-semibold text-white leading-tight">
                          {trail.title}
                        </p>
                      </div>
                    </div>
                    <div className="p-2.5">
                      <div className="flex items-center gap-2 text-[10px] font-['Poppins'] text-gray-400">
                        <span className="flex items-center gap-0.5">
                          <MapPin size={10} /> {trail.totalStops}
                        </span>
                        <span className="flex items-center gap-0.5">
                          <Star
                            size={10}
                            className="text-yellow-400 fill-yellow-400"
                          />{" "}
                          {trail.rating}
                        </span>
                      </div>
                      <p className="font-['Poppins'] text-[10px] text-gray-400 italic mt-1 truncate">
                        {trail.vibe}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Search Results */}
        {hasQuery && (
          <>
            {/* Creators results */}
            {filteredCreators.length > 0 && (
              <div className="mb-5">
                <h3 className="font-['Poppins'] text-[13px] font-semibold text-gray-500 uppercase tracking-wider mb-3">
                  Creators
                </h3>
                <div className="flex flex-col gap-2">
                  {filteredCreators.map((creator) => (
                    <div
                      key={creator.id}
                      onClick={() => navigate(`/creator/${creator.id}`)}
                      className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-100 cursor-pointer hover:shadow-sm transition-all"
                    >
                      <div className="w-11 h-11 rounded-full overflow-hidden border border-gray-200">
                        <ImageWithFallback
                          src={creator.avatar}
                          alt={creator.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-['Poppins'] text-[14px] font-medium text-gray-800">
                          {creator.name}
                        </p>
                        <p className="font-['Poppins'] text-[12px] text-gray-400">
                          {creator.handle} · {creator.trailsCreated} trails
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Trail results */}
            <div>
              <h3 className="font-['Poppins'] text-[13px] font-semibold text-gray-500 uppercase tracking-wider mb-3">
                Trails ({filteredTrails.length})
              </h3>
              {filteredTrails.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {filteredTrails.map((trail) => (
                    <div
                      key={trail.id}
                      onClick={() => navigate(`/trail/${trail.id}`)}
                      className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-100 cursor-pointer hover:shadow-sm transition-all"
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                        <ImageWithFallback
                          src={trail.image}
                          alt={trail.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-['Poppins'] text-[14px] font-medium text-gray-800 truncate">
                          {trail.title}
                        </p>
                        <p className="font-['Poppins'] text-[12px] text-gray-400">
                          by {trail.hostHandle}
                        </p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="flex items-center gap-1 text-[11px] font-['Poppins'] text-gray-400">
                            <MapPin size={10} /> {trail.totalStops} stops
                          </span>
                          <span className="flex items-center gap-1 text-[11px] font-['Poppins'] text-gray-400">
                            <Star
                              size={10}
                              className="text-yellow-400 fill-yellow-400"
                            />{" "}
                            {trail.rating}
                          </span>
                          <span className="flex items-center gap-1 text-[11px] font-['Poppins'] text-gray-400">
                            <Users size={10} /> {trail.joined}
                          </span>
                        </div>
                        <p className="font-['Poppins'] text-[11px] text-gray-400 italic mt-1 truncate">
                          {trail.vibe}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Search size={40} className="text-gray-200 mx-auto mb-3" />
                  <p className="font-['Poppins'] text-[14px] text-gray-400">
                    No trails found for "{query}"
                  </p>
                </div>
              )}
            </div>
          </>
        )}
        </div>
      </div>
    </div>
  );
}