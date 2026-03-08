import { useState, useMemo, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import {
  MapPin,
  Star,
  Users,
  Clock,
  ChevronRight,
  ChevronLeft,
  Search,
  X,
  Locate,
  SlidersHorizontal,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { getTrailsForCity } from "../data/trailData";
import type { Trail } from "../data/trailData";
import { TrailMap } from "./TrailMap";
import { getCachedEventbriteTrails } from "../data/eventbriteService";
import { useUser } from "../data/userStore";
import { getCityById } from "../data/cities";

// Same primary tabs as DiscoveryPage — keep in sync
const primaryTabs = [
  { label: "All", meta: null },
  { label: "Trending", meta: "trending" },
  { label: "New", meta: "new" },
  { label: "Popular", meta: "popular" },
  { label: "Editor's Pick", meta: "editors_pick" },
  { label: "Budget", meta: "budget" },
];

// Same category chips as DiscoveryPage — keep in sync
const filterTags = [
  { label: "Food", emoji: "🍔", tag: "food" },
  { label: "Sport", emoji: "💪", tag: "sport" },
  { label: "Shopping", emoji: "🛍️", tag: "shopping" },
  { label: "Coffee", emoji: "☕", tag: "coffee" },
  { label: "Art", emoji: "🎨", tag: "art" },
  { label: "Nightlife", emoji: "🌙", tag: "nightlife" },
  { label: "Nature", emoji: "🌿", tag: "nature" },
  { label: "Music", emoji: "🎵", tag: "music" },
  { label: "Photo", emoji: "📸", tag: "photo" },
  { label: "Wellness", emoji: "🧘", tag: "wellness" },
];

function TrailPopupCard({
  trail,
  onClose,
  onNavigate,
}: {
  trail: Trail;
  onClose: () => void;
  onNavigate: () => void;
}) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100">
      <div className="flex items-stretch">
        {/* Image */}
        <div className="w-[100px] shrink-0 relative">
          <ImageWithFallback
            src={trail.image}
            alt={trail.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/10" />
        </div>

        {/* Content */}
        <div className="flex-1 p-3 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="font-['Poppins'] text-[14px] font-semibold text-gray-900 truncate">
                {trail.title}
              </h3>
              <p className="font-['Poppins'] text-[11px] text-gray-500 mt-0.5">
                by {trail.hostHandle}
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="p-1 rounded-full bg-gray-100 shrink-0"
            >
              <X size={12} className="text-gray-400" />
            </button>
          </div>

          <div className="flex items-center gap-3 mt-2">
            <span className="flex items-center gap-1 text-[11px] font-['Poppins'] text-gray-500">
              <MapPin size={10} style={{ color: trail.color }} />
              {trail.totalStops} stops
            </span>
            <span className="flex items-center gap-1 text-[11px] font-['Poppins'] text-gray-500">
              <Clock size={10} />
              {trail.totalDuration}
            </span>
            <span className="flex items-center gap-1 text-[11px] font-['Poppins'] text-gray-500">
              <Star size={10} className="text-yellow-400 fill-yellow-400" />
              {trail.rating}
            </span>
          </div>

          <div className="flex items-center justify-between mt-2.5">
            <div className="flex items-center gap-1">
              <Users size={11} className="text-gray-400" />
              <span className="text-[11px] font-['Poppins'] text-gray-500">
                {trail.joined} joined
              </span>
            </div>
            <button
              onClick={onNavigate}
              className="flex items-center gap-1 text-[12px] font-['Poppins'] font-semibold text-white px-3 py-1.5 rounded-full"
              style={{
                backgroundImage:
                  "linear-gradient(102deg, rgb(0, 5, 30) 12%, rgb(3, 3, 192) 39%, rgb(56, 125, 236) 84%, rgb(133, 200, 255) 101%)",
              }}
            >
              View
              <ChevronRight size={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MapExplorePage() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedTrailId, setSelectedTrailId] = useState<string | null>(null);
  const [showFilterDrawer, setShowFilterDrawer] = useState(false);

  // Read initial filter state from URL search params (set by DiscoveryPage)
  const activePrimaryTab = searchParams.get("tab") || "All";
  const activeFilterTag = searchParams.get("tag") || null;

  const setActivePrimaryTab = (tab: string) => {
    const params = new URLSearchParams(searchParams);
    if (tab === "All") {
      params.delete("tab");
    } else {
      params.set("tab", tab);
    }
    setSearchParams(params, { replace: true });
  };

  const setActiveFilterTag = (tag: string | null) => {
    const params = new URLSearchParams(searchParams);
    if (tag) {
      params.set("tag", tag);
    } else {
      params.delete("tag");
    }
    setSearchParams(params, { replace: true });
  };

  // Close drawer when filter is applied
  const handleFilterTagSelect = (tag: string) => {
    setActiveFilterTag(activeFilterTag === tag ? null : tag);
    setShowFilterDrawer(false);
  };

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (showFilterDrawer) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showFilterDrawer]);

  const selectedCity = useMemo(
    () => getCityById(user.selectedCityId),
    [user.selectedCityId]
  );
  const cityTrails = useMemo(
    () => getTrailsForCity(selectedCity.id),
    [selectedCity.id]
  );
  const allCityTrails = useMemo(
    () => [
      ...(user.createdTrails || []),
      ...getCachedEventbriteTrails(),
      ...cityTrails,
    ],
    [cityTrails, user.createdTrails]
  );

  // Two-tier filtering — same logic as DiscoveryPage
  const activeMeta = primaryTabs.find(
    (t) => t.label === activePrimaryTab
  )?.meta;

  const primaryFiltered = activeMeta
    ? allCityTrails.filter((t) => t.meta?.includes(activeMeta))
    : allCityTrails;

  const filteredTrails = activeFilterTag
    ? primaryFiltered.filter((t) =>
        t.tags?.some((tag) => tag.toLowerCase() === activeFilterTag)
      )
    : primaryFiltered;

  const selectedTrail = selectedTrailId
    ? filteredTrails.find((t) => t.id === selectedTrailId)
    : null;

  const activeTagLabel = activeFilterTag
    ? filterTags.find((f) => f.tag === activeFilterTag)?.label
    : null;

  return (
    <div className="h-screen flex flex-col bg-white relative">
      {/* Header overlay */}
      <div className="absolute top-0 left-0 right-0 z-[2000] px-4 pt-4 pb-2 pointer-events-none">
        {/* Top row — back, search, locate */}
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate("/");
            }}
            className="pointer-events-auto w-10 h-10 rounded-full flex items-center justify-center bg-white border border-gray-200 active:scale-95 transition-transform cursor-pointer"
          >
            <ChevronLeft size={22} className="text-gray-900" />
          </button>
          <div className="flex items-center gap-2">
            <button
              className="pointer-events-auto bg-white/90 backdrop-blur-md rounded-xl p-2 border border-gray-100"
              onClick={() => navigate("/search")}
            >
              <Search size={18} className="text-gray-600" />
            </button>
            <button className="pointer-events-auto bg-white/90 backdrop-blur-md rounded-xl p-2 border border-gray-100">
              <Locate size={18} className="text-blue-600" />
            </button>
          </div>
        </div>

        {/* Primary tabs + filter button */}
        <div className="flex items-center gap-2">
          <div className="flex-1 flex gap-2 pointer-events-auto overflow-x-auto scrollbar-hide">
            {primaryTabs.map((tab) => (
              <button
                key={tab.label}
                onClick={() => setActivePrimaryTab(tab.label)}
                className={`shrink-0 px-3.5 py-1.5 rounded-full text-[12px] font-['Poppins'] font-medium transition-all ${
                  activePrimaryTab === tab.label
                    ? "bg-gray-900 text-white"
                    : "bg-white/90 backdrop-blur-md text-gray-600 border border-gray-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Filter button — opens bottom drawer */}
          <button
            onClick={() => setShowFilterDrawer(true)}
            className={`pointer-events-auto shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-['Poppins'] font-medium transition-all ${
              activeFilterTag
                ? "bg-gray-900 text-white"
                : "bg-white/90 backdrop-blur-md text-gray-600 border border-gray-200"
            }`}
          >
            <SlidersHorizontal size={13} />
            {activeTagLabel || "Filter"}
          </button>
        </div>

        {/* Active filter banner + count */}
        <div className="flex items-center justify-between mt-2 pointer-events-auto">
          {(activePrimaryTab !== "All" || activeFilterTag) ? (
            <div className="bg-gray-900/80 backdrop-blur-md rounded-full px-3 py-1 flex items-center gap-1.5">
              <span className="text-[11px] font-['Poppins'] text-white/70">
                Showing:
              </span>
              <span className="text-[11px] font-['Poppins'] font-semibold text-white">
                {activePrimaryTab !== "All" ? activePrimaryTab : ""}
                {activePrimaryTab !== "All" && activeFilterTag ? " · " : ""}
                {activeTagLabel || ""}
              </span>
              <button
                onClick={() => setSearchParams({}, { replace: true })}
                className="ml-1"
              >
                <X size={12} className="text-white/60" />
              </button>
            </div>
          ) : (
            <div />
          )}

          {/* Trail count */}
          <div className="flex items-center gap-1 bg-white/90 backdrop-blur-md rounded-full px-3 py-1 border border-gray-100 shrink-0">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[11px] font-['Poppins'] font-medium text-gray-600">
              {filteredTrails.length} active
            </span>
          </div>
        </div>
      </div>

      {/* Map Area — receives only filtered trails */}
      <div className="flex-1 relative z-0">
        <TrailMap
          key={`explore-${activePrimaryTab}-${activeFilterTag || "all"}-${filteredTrails.length}`}
          interactive
          selectedTrailId={selectedTrailId}
          onTrailSelect={(id) =>
            setSelectedTrailId(selectedTrailId === id ? null : id)
          }
          className="w-full h-full"
          centerOverride={[selectedCity.lat, selectedCity.lng]}
          trailsData={filteredTrails}
        />
      </div>

      {/* Bottom Trail Cards Strip — flush to bottom (no bottom nav) */}
      <div className="absolute bottom-4 left-0 right-0 z-40 px-4">
        {selectedTrail ? (
          <TrailPopupCard
            trail={selectedTrail}
            onClose={() => setSelectedTrailId(null)}
            onNavigate={() => navigate(`/trail/${selectedTrailId}`)}
          />
        ) : (
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4">
            {filteredTrails.map((trail) => (
              <div
                key={trail.id}
                onClick={() => setSelectedTrailId(trail.id)}
                className="shrink-0 w-[220px] bg-white rounded-2xl border border-gray-100 overflow-hidden cursor-pointer active:scale-[0.97] transition-all"
              >
                <div className="relative h-[80px]">
                  <ImageWithFallback
                    src={trail.image}
                    alt={trail.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="font-['Poppins'] text-[12px] font-semibold text-white leading-tight truncate">
                      {trail.title}
                    </p>
                  </div>
                  <div
                    className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full border border-white"
                    style={{ backgroundColor: trail.color }}
                  />
                </div>
                <div className="px-3 py-2 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[10px] font-['Poppins'] text-gray-500">
                    <span className="flex items-center gap-0.5">
                      <MapPin size={9} /> {trail.totalStops}
                    </span>
                    <span className="flex items-center gap-0.5">
                      <Star
                        size={9}
                        className="text-yellow-400 fill-yellow-400"
                      />{" "}
                      {trail.rating}
                    </span>
                  </div>
                  <span className="text-[10px] font-['Poppins'] font-semibold text-blue-600">
                    {trail.price}
                  </span>
                </div>
              </div>
            ))}
            {filteredTrails.length === 0 && (
              <div className="w-full bg-white/90 backdrop-blur-md rounded-2xl border border-gray-100 py-6 px-4 text-center">
                <p className="text-[13px] font-['Poppins'] font-semibold text-gray-800">
                  No trails match this filter
                </p>
                <p className="text-[12px] font-['Poppins'] text-gray-500 mt-1">
                  Try a different category
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Filter Bottom Drawer ── */}
      {showFilterDrawer && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 z-[3000] transition-opacity"
            onClick={() => setShowFilterDrawer(false)}
          />

          {/* Drawer */}
          <div className="fixed bottom-0 left-0 right-0 z-[3001] flex items-end lg:items-center justify-center lg:inset-0">
            <div className="w-full max-w-[430px] lg:max-w-[520px] bg-white rounded-t-[24px] lg:rounded-[24px] px-5 pt-3 pb-8 animate-in slide-in-from-bottom duration-300">
              {/* Handle */}
              <div className="flex justify-center mb-4">
                <div className="w-10 h-1 rounded-full bg-gray-200" />
              </div>

              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-['Poppins'] text-[16px] font-semibold text-gray-900">
                  Filter by Interest
                </h3>
                {activeFilterTag && (
                  <button
                    onClick={() => {
                      setActiveFilterTag(null);
                      setShowFilterDrawer(false);
                    }}
                    className="text-[12px] font-['Poppins'] font-medium text-red-500"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Filter grid — 2 columns */}
              <div className="grid grid-cols-2 gap-2.5">
                {filterTags.map((tag) => {
                  const isActive = activeFilterTag === tag.tag;
                  // Count how many trails match this category within primary-filtered set
                  const count = primaryFiltered.filter((t) =>
                    t.tags?.some(
                      (tg) => tg.toLowerCase() === tag.tag
                    )
                  ).length;

                  return (
                    <button
                      key={tag.tag}
                      onClick={() => handleFilterTagSelect(tag.tag)}
                      className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl transition-all ${
                        isActive
                          ? "bg-gray-900 text-white"
                          : "bg-[#ECEDF2] text-gray-700"
                      }`}
                    >
                      <span className="text-[16px] leading-none">
                        {tag.emoji}
                      </span>
                      <div className="flex-1 text-left">
                        <span className="text-[13px] font-['Poppins'] font-medium">
                          {tag.label}
                        </span>
                      </div>
                      <span
                        className={`text-[11px] font-['Poppins'] font-medium min-w-[20px] h-[20px] rounded-full flex items-center justify-center ${
                          isActive
                            ? "bg-white/20 text-white"
                            : "bg-white text-gray-500"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}