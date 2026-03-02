import { ImageWithFallback } from "./figma/ImageWithFallback";
import { creators, getTrailsForCity } from "../data/trailData";
import type { Trail } from "../data/trailData";
import { useUser } from "../data/userStore";
import { maybShowFavoriteToast } from "../data/favoriteToast";
import { MapPreview } from "./MapPreview";
import { useState, useCallback, useEffect, useMemo } from "react";
import { useNavigate } from "react-router";
import {
  Search,
  MapPin,
  Clock,
  Users,
  ChevronRight,
  ChevronDown,
  Bell,
  Plus,
  ArrowRight,
  Heart,
  X,
  Check,
} from "lucide-react";
import imgImage7 from "figma:asset/da1302ca6fc90a292f83fc6c195b2d96f6a84396.png";
import { CreateTrailIntroDrawer } from "./CreateTrailIntroDrawer";
import { fetchEventbriteTrails } from "../data/eventbriteService";
import { CITIES, getCityById } from "../data/cities";

// Helper: get a clear display price for any trail
function getDisplayPrice(trail: { isFree?: boolean; numericPrice?: number; currency?: string; price: string }): string {
  if (trail.isFree) return "Free";
  if (trail.numericPrice != null) return `${trail.currency === "USD" ? "$" : trail.currency}${trail.numericPrice.toFixed(0)}`;
  const priceMap: Record<string, string> = { "$": "$15", "$$": "$25", "$$$": "$45" };
  return priceMap[trail.price] || trail.price;
}

// Top tabs: broad superset meta-filters (not category-specific)
const primaryTabs = [
  { label: "All", meta: null },
  { label: "Trending", meta: "trending" },
  { label: "New", meta: "new" },
  { label: "Popular", meta: "popular" },
  { label: "Editor's Pick", meta: "editors_pick" },
  { label: "Budget", meta: "budget" },
];

// Bottom chips: specific trail category/type filters (subset)
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

export function DiscoveryPage() {
  const navigate = useNavigate();
  const { user, updateUser } = useUser();
  const [activePrimaryTab, setActivePrimaryTab] = useState("All");
  const [activeFilterTag, setActiveFilterTag] = useState<string | null>(null);
  const [showCreateIntro, setShowCreateIntro] = useState(false);
  const [eventbriteTrails, setEventbriteTrails] = useState<Trail[]>([]);
  const [ebLoading, setEbLoading] = useState(true);
  const [showCityPicker, setShowCityPicker] = useState(false);

  const selectedCity = useMemo(() => getCityById(user.selectedCityId), [user.selectedCityId]);
  const cityTrails = useMemo(() => getTrailsForCity(selectedCity.id), [selectedCity.id]);

  // Fetch Eventbrite trails whenever selected city changes
  useEffect(() => {
    let cancelled = false;
    setEbLoading(true);
    setEventbriteTrails([]);
    fetchEventbriteTrails({ location: selectedCity.ebQuery })
      .then((ebTrails) => {
        if (!cancelled) setEventbriteTrails(ebTrails);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setEbLoading(false);
      });
    return () => { cancelled = true; };
  }, [selectedCity.ebQuery]);

  const handleCitySelect = useCallback((cityId: string) => {
    updateUser({ selectedCityId: cityId });
    setShowCityPicker(false);
  }, [updateUser]);

  const handleCreateClick = useCallback(() => {
    setShowCreateIntro(true);
  }, []);

  const MAX_VISIBLE_CREATORS = 6;
  const visibleCreators = creators.slice(0, MAX_VISIBLE_CREATORS);
  const remainingCount = creators.length - MAX_VISIBLE_CREATORS;

  const userAvatars = [
    { name: "You", avatar: user.avatar, isAdd: true },
    ...visibleCreators.map((c) => ({ name: c.name, avatar: c.avatar, isAdd: false })),
  ];

  // Two-tier filtering: primary tab (superset) → filter chip (subset)
  const activeMeta = primaryTabs.find((t) => t.label === activePrimaryTab)?.meta;

  // Merge user-created trails + Eventbrite trails + city-filtered static trails
  const allTrails = [...(user.createdTrails || []), ...eventbriteTrails, ...cityTrails];
  const userCreatedIds = new Set((user.createdTrails || []).map((t) => t.id));
  const eventbriteIds = new Set(eventbriteTrails.map((t) => t.id));

  // Step 1: Apply primary tab filter (superset)
  const primaryFiltered = activeMeta
    ? allTrails.filter((t) => t.meta?.includes(activeMeta))
    : allTrails;

  // Step 2: Apply category chip filter (subset) within primary results
  const filteredTrails = activeFilterTag
    ? primaryFiltered.filter((t) => t.tags?.some((tag) => tag.toLowerCase() === activeFilterTag))
    : primaryFiltered;

  // Build explore URL with current filter state as search params
  const exploreTarget = useMemo(() => {
    const params = new URLSearchParams();
    if (activePrimaryTab !== "All") params.set("tab", activePrimaryTab);
    if (activeFilterTag) params.set("tag", activeFilterTag);
    const qs = params.toString();
    return `/explore${qs ? `?${qs}` : ""}`;
  }, [activePrimaryTab, activeFilterTag]);

  return (
    <div className="relative overflow-hidden">
      {/* Gradient Header */}
      <div
        className="relative px-4 pt-4 pb-10"
        style={{
          backgroundImage:
            "linear-gradient(126.8deg, rgb(146, 190, 255) 0%, rgb(190, 236, 255) 24%, rgb(242, 189, 151) 55%, rgb(255, 222, 222) 100%)",
        }}
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-5">
          <button
            className="flex items-center gap-1.5 bg-[rgba(30,30,30,0.4)] border border-[rgba(255,255,255,0.7)] rounded-full px-3 py-1.5"
            onClick={() => setShowCityPicker(true)}
          >
            <MapPin size={14} className="text-white" />
            <span className="font-['Inter'] text-[12px] text-white font-semibold">
              {selectedCity.name}
            </span>
            <ChevronDown size={12} className="text-white" />
          </button>
          <div className="flex items-center gap-2">
            <button className="bg-[rgba(30,30,30,0.4)] border border-[rgba(255,255,255,0.6)] rounded-full p-2.5" onClick={() => navigate("/activity")}>
              <Bell size={20} className="text-white" />
            </button>
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white cursor-pointer" onClick={() => navigate("/profile")}>
              <ImageWithFallback
                src={user.avatar}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* User Avatars Row */}
        <div className="flex gap-3 overflow-x-auto pb-3 -mx-1 px-1 scrollbar-hide">
          {userAvatars.map((user, idx) => (
            <div key={idx} className="flex flex-col items-center gap-1 shrink-0">
              <div
                className={`relative w-[72px] h-[72px] rounded-[20px] flex items-center justify-center cursor-pointer active:scale-95 transition-transform ${
                  user.isAdd
                    ? "backdrop-blur-md bg-[rgba(80,80,80,0.15)] border border-[rgba(185,185,185,0.7)]"
                    : "backdrop-blur-md bg-[rgba(255,255,255,0.2)] border-2 border-[rgba(255,255,255,0.7)]"
                }`}
                onClick={() => user.isAdd ? handleCreateClick() : navigate(`/creator/${visibleCreators[idx - 1]?.id || "1"}`)}
              >
                {user.isAdd ? (
                  <>
                    {/* White circle behind plus icon */}
                    <div className="w-[40px] h-[40px] rounded-full bg-white/90 flex items-center justify-center">
                      <Plus size={20} className="text-gray-500" />
                    </div>
                    {/* Small user avatar at bottom-left corner */}
                    {user.avatar && (
                      <div className="absolute -bottom-1.5 -left-1.5 w-[28px] h-[28px] rounded-full overflow-hidden border-2 border-white shadow-sm">
                        <ImageWithFallback
                          src={user.avatar}
                          alt="You"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <div className="w-[60px] h-[60px] rounded-[16px] overflow-hidden">
                    <ImageWithFallback
                      src={user.avatar}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
              <span className="text-[12px] text-gray-800 font-['Poppins'] font-medium truncate max-w-[72px]">
                {user.isAdd ? "You" : visibleCreators[idx - 1]?.handle?.replace("@", "") || user.name}
              </span>
            </div>
          ))}

          {/* View All Creators CTA */}
          {remainingCount > 0 && (
            <div className="flex flex-col items-center gap-1 shrink-0">
              <div
                className="w-[72px] h-[72px] rounded-[20px] flex flex-col items-center justify-center cursor-pointer active:scale-95 transition-transform border-2 border-dashed border-[rgba(255,255,255,0.6)] bg-[rgba(255,255,255,0.15)] backdrop-blur-md"
                onClick={() => navigate("/creators")}
              >
                <span className="text-[13px] text-white font-['Poppins'] font-semibold">+{remainingCount}</span>
                <ArrowRight size={14} className="text-white/80 mt-0.5" />
              </div>
              <span className="text-[12px] text-gray-800 font-['Poppins'] font-medium truncate max-w-[72px]">
                View All
              </span>
            </div>
          )}
        </div>

        {/* Category Tabs */}
        <div className="flex gap-2 overflow-x-auto scrollbar-hide -mx-1 px-1">
          {primaryTabs.map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActivePrimaryTab(tab.label)}
              className={`shrink-0 px-5 py-3 rounded-full text-[14px] font-['Poppins'] font-semibold transition-all ${
                activePrimaryTab === tab.label
                  ? "bg-[#1e0000] text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search & Filters + Map Section */}
      <div className="px-4 -mt-5 bg-white rounded-t-[24px] relative z-10 pt-5">
        {/* Search Bar */}
        <div className="flex items-center gap-2 mb-3">
          <button
            className="w-11 h-11 shrink-0 flex items-center justify-center bg-[#1e0000] rounded-full"
            onClick={() => navigate("/search")}
          >
            <Search size={18} className="text-white" />
          </button>
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide bg-[#ECEDF2] rounded-full p-1.5">
            {filterTags.map((tag) => (
              <button
                key={tag.label}
                className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 shrink-0 transition-all ${
                  activeFilterTag === tag.tag
                    ? "bg-gray-100 border border-gray-300"
                    : "bg-white border border-transparent shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
                }`}
                onClick={() => setActiveFilterTag(activeFilterTag === tag.tag ? null : tag.tag)}
              >
                <span className="text-[14px] leading-none">{tag.emoji}</span>
                <span className="text-[12px] font-['Poppins'] text-gray-700">
                  {tag.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Map Preview */}
        <div className="mb-4">
          <MapPreview
            label={`${filteredTrails.length} Active Trail${filteredTrails.length !== 1 ? "s" : ""}`}
            respectStopVisibility={false}
            centerOverride={[selectedCity.lat, selectedCity.lng]}
            trailsData={filteredTrails}
            navigateTarget={exploreTarget}
          />
        </div>

        {/* Trending & Latest */}
        <div className="flex gap-4 mb-5">
          <div className="flex-1">
            <p className="text-[11px] font-['Poppins'] font-semibold text-blue-600 uppercase tracking-wider mb-1">
              Trending Now
            </p>
            <p className="text-[15px] font-['Poppins'] font-semibold text-gray-900">
              {allTrails.find((t) => t.meta?.includes("trending"))?.title || "Explore Trails"}
            </p>
            <div className="flex items-center gap-1 mt-1 text-gray-500">
              <Clock size={12} />
              <span className="text-[12px] font-['Poppins']">{allTrails.find((t) => t.meta?.includes("trending"))?.duration || "~2 hrs"}</span>
            </div>
            <div className="flex items-center gap-1.5 mt-1.5">
              <Users size={14} className="text-gray-400" />
              <span className="text-[13px] font-['Poppins'] text-gray-500">{allTrails.find((t) => t.meta?.includes("trending"))?.joined || 0}</span>
            </div>
          </div>
          <div className="w-px bg-gray-200" />
          <div className="flex-1">
            <p className="text-[11px] font-['Poppins'] font-semibold text-orange-500 uppercase tracking-wider mb-1">
              Latest Trail
            </p>
            <p className="text-[15px] font-['Poppins'] font-semibold text-gray-900">
              {allTrails.find((t) => t.meta?.includes("new"))?.title || "Coming Soon"}
            </p>
            <div className="flex items-center gap-1 mt-1 text-gray-500">
              <Clock size={12} />
              <span className="text-[12px] font-['Poppins']">{allTrails.find((t) => t.meta?.includes("new"))?.duration || "~2 hrs"}</span>
            </div>
            <div className="flex items-center gap-1.5 mt-1.5">
              <Users size={14} className="text-gray-400" />
              <span className="text-[13px] font-['Poppins'] text-gray-500">{allTrails.find((t) => t.meta?.includes("new"))?.joined || 0}</span>
            </div>
          </div>
        </div>

        {/* Trail Cards */}
        <div className="flex flex-col pb-28">
          {filteredTrails.length > 0 ? (
            filteredTrails.map((trail, index) => (
              <div key={trail.id}>
                {index > 0 && (
                  <div className="h-[3px] bg-[#f1f1f1] -mx-4" />
                )}
                <div className={`py-2 ${trail.badge ? "pt-7" : ""}`}>
                  <TrailCard
                    trail={trail}
                    onClick={() => navigate(`/trail/${trail.id}`)}
                    isUserCreated={userCreatedIds.has(trail.id)}
                    isEventbrite={eventbriteIds.has(trail.id)}
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-[15px] font-['Poppins'] font-semibold text-gray-800 mb-1">
                No trails found
              </p>
              <p className="text-[13px] font-['Poppins'] text-gray-500">
                Try selecting a different category
              </p>
            </div>
          )}
        </div>
      </div>

      {/* City Picker Modal */}
      {showCityPicker && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setShowCityPicker(false)} />
          <div className="relative w-full max-w-[430px] bg-white rounded-t-[24px] pb-8 max-h-[70vh] flex flex-col">
            {/* Handle bar */}
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 bg-gray-300 rounded-full" />
            </div>
            {/* Header */}
            <div className="flex items-center justify-between px-5 pb-3">
              <h3 className="text-[17px] font-['Poppins'] font-semibold text-gray-900">Select City</h3>
              <button onClick={() => setShowCityPicker(false)} className="p-1">
                <X size={20} className="text-gray-400" />
              </button>
            </div>
            {/* City list */}
            <div className="overflow-y-auto px-4 flex flex-col gap-1">
              {CITIES.map((city) => {
                const isSelected = city.id === selectedCity.id;
                return (
                  <button
                    key={city.id}
                    onClick={() => handleCitySelect(city.id)}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all active:scale-[0.98] ${
                      isSelected ? "bg-gray-100 border border-gray-200" : "hover:bg-gray-50"
                    }`}
                  >
                    <span className="text-[20px]">{city.emoji}</span>
                    <div className="flex-1 text-left">
                      <p className={`text-[15px] font-['Poppins'] ${isSelected ? "font-semibold text-gray-900" : "text-gray-800"}`}>
                        {city.name}
                      </p>
                      <p className="text-[12px] font-['Poppins'] text-gray-400">{city.shortName}</p>
                    </div>
                    {isSelected && <Check size={18} className="text-blue-600" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Create Trail Intro Drawer */}
      <CreateTrailIntroDrawer
        open={showCreateIntro}
        onClose={() => setShowCreateIntro(false)}
        followers={user.followers}
        userName={user.name}
        userAvatar={user.avatar}
      />
    </div>
  );
}

// Tag-to-emoji mapping for trail category chips
const tagEmojiMap: Record<string, string> = {
  coffee: "☕",
  art: "🎨",
  skate: "🛹",
  family: "👨‍👩‍👧",
  food: "🍔",
  nature: "🌿",
  nightlife: "🌙",
  music: "🎵",
  photo: "📸",
  sport: "💪",
  shopping: "🛍️",
  wellness: "🧘",
  comics: "📚",
  galleries: "🖼️",
  murals: "🎨",
  adventure: "⛰️",
  games: "🎮",
  "hidden spots": "🗺️",
  "street art": "🎨",
};

function getTrailEmoji(tags: string[]): string {
  if (!tags || tags.length === 0) return "📍";
  const firstTag = tags[0].toLowerCase();
  return tagEmojiMap[firstTag] || "📍";
}

function TrailCard({
  trail,
  onClick,
  isUserCreated,
  isEventbrite,
}: {
  trail: Trail;
  onClick: () => void;
  isUserCreated: boolean;
  isEventbrite?: boolean;
}) {
  const navigate = useNavigate();
  const { user, bookmarkTrail } = useUser();
  const categoryEmoji = getTrailEmoji(trail.tags);
  const isSaved = user.bookmarkedTrailIds.includes(trail.id);

  return (
    <div className="rounded-2xl bg-white relative">
      {/* Badge overlapping top edge */}
      {trail.badge && (
        <div
          className="absolute -top-5 right-4 flex gap-[2px] items-center justify-center pb-[16px] pt-[5px] px-[12px] rounded-tl-[16px] rounded-tr-[16px]"
          style={{
            backgroundImage: "linear-gradient(95.1955deg, rgb(220, 54, 8) 4.4464%, rgb(255, 148, 47) 51.347%, rgb(195, 42, 0) 99.158%)",
          }}
        >
          <div className="relative shrink-0 w-[12px] h-[12px]">
            <img
              alt=""
              className="absolute inset-0 max-w-none object-cover pointer-events-none w-full h-full"
              src={imgImage7}
            />
          </div>
          <p className="font-['Inter'] font-bold italic text-[12px] text-white tracking-[-0.3125px] leading-[16px] shrink-0 -translate-y-[1px]">
            {trail.badge}
          </p>
        </div>
      )}

      {/* Image Section */}
      <div className="pb-0">
        <div className="relative h-[210px] rounded-2xl overflow-hidden cursor-pointer" onClick={onClick}>
          <ImageWithFallback
            src={trail.image}
            alt={trail.title}
            className="w-full h-full object-cover"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

          {/* Top chips row — emoji, date, duration all aligned */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              {isUserCreated && (
                <div className="bg-blue-600 rounded-full px-2.5 h-[26px] flex items-center gap-1">
                  <span className="text-[11px] leading-none">✨</span>
                  <span className="text-[11px] font-['Poppins'] font-semibold text-white">Your Trail</span>
                </div>
              )}
              <div className="w-[26px] h-[26px] rounded-full bg-white flex items-center justify-center shrink-0">
                <span className="text-[13px] leading-none">{categoryEmoji}</span>
              </div>
              <div className="bg-white rounded-full px-2.5 h-[26px] flex items-center">
                <span className="text-[12px] font-['Poppins'] font-medium text-gray-800">
                  {trail.date}
                </span>
              </div>
            </div>
            <div className="bg-black/70 backdrop-blur-sm rounded-full px-3 h-[26px] flex items-center">
              <span className="text-[12px] font-['Poppins'] font-medium text-white">
                {trail.duration}
              </span>
            </div>
          </div>

          {/* Title and price/location — bottom overlay */}
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
            <div className="flex-1">
              <h3 className="text-white font-['Poppins'] text-[22px] font-normal leading-tight">
                {trail.title}
              </h3>
              <p className="text-white/70 font-['Poppins'] text-[12px] mt-0.5">
                {trail.neighborhood}
              </p>
            </div>
            <div className="flex flex-col items-end gap-1 shrink-0">
              <div className="flex items-center gap-2">
                <span className={`font-['Inter'] text-[14px] font-medium ${getDisplayPrice(trail) === "Free" ? "" : "text-white/90"}`} style={getDisplayPrice(trail) === "Free" ? { color: "#00EC20" } : undefined}>
                  {getDisplayPrice(trail)}
                </span>
                <MapPin size={15} className="text-white/75" />
              </div>
              {trail.capacity != null && (
                <span className="text-white/60 font-['Poppins'] text-[11px]">
                  {trail.capacity} spots
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Host and Join */}
      <div className="flex items-center justify-between px-[0px] py-[12px]">
        <div
          className="flex items-center gap-2.5 cursor-pointer"
          onClick={() => {
            const creatorId = creators.find((c) => c.handle === trail.hostHandle)?.id || "1";
            navigate(`/creator/${creatorId}`);
          }}
        >
          {/* Rectangular rounded-corner avatar */}
          <div className="w-[38px] h-[38px] rounded-[10px] overflow-hidden border border-gray-200 shrink-0">
            <ImageWithFallback
              src={trail.hostAvatar}
              alt={trail.hostHandle}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-[12px] text-gray-400 font-['Poppins'] leading-tight">
              Hosted by
            </p>
            <p className="text-[15px] font-['Poppins'] font-normal text-gray-800 leading-tight mt-0.5">
              {trail.hostHandle.replace("@", "")}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onClick}
            className="text-white font-['Poppins'] text-[13px] font-semibold px-5 py-2.5 rounded-full"
            style={{
              backgroundImage:
                "linear-gradient(102deg, rgb(0, 5, 30) 12%, rgb(3, 3, 192) 39%, rgb(56, 125, 236) 84%, rgb(133, 200, 255) 101%)",
            }}
          >
            Join Trail
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (!isSaved) maybShowFavoriteToast();
              bookmarkTrail(trail.id);
            }}
            className="w-[40px] h-[40px] rounded-full flex items-center justify-center border border-gray-200 bg-white transition-all active:scale-90"
          >
            <Heart
              size={18}
              className={`transition-colors ${isSaved ? "text-red-500 fill-red-500" : "text-gray-400"}`}
            />
          </button>
        </div>
      </div>

      {/* Vibe descriptor */}
      <p className="text-[12px] font-['Poppins'] text-gray-400 italic -mt-1 pb-1">
        {trail.vibe}
      </p>
    </div>
  );
}