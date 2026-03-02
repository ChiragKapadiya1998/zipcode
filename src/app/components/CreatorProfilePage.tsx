import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import {
  ChevronLeft,
  MapPin,
  Clock,
  Users,
  Eye,
  Instagram,
  Heart,
  Route,
  Star,
  ChevronRight,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { trails, creators } from "../data/trailData";
import { useUser } from "../data/userStore";
import { maybShowFavoriteToast } from "../data/favoriteToast";
import imgImage7 from "figma:asset/da1302ca6fc90a292f83fc6c195b2d96f6a84396.png";

const tabs = [
  { label: "Live", emoji: "🔴" },
  { label: "Past", emoji: "⏳" },
  { label: "Hosted", emoji: "🎯" },
];

// Tag-to-emoji mapping (same as homepage)
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

export function CreatorProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const creator = creators.find((c) => c.id === id) || creators[0];
  const [activeTab, setActiveTab] = useState("Live");

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const creatorTrails = trails.filter(
    (t) => t.hostHandle === creator.handle
  );
  const allTrails = creatorTrails.length > 0 ? creatorTrails : trails.slice(0, 6);
  const statusMap: Record<string, string> = {
    Live: "live",
    Past: "past",
    Hosted: "hosted",
  };
  const displayTrails = allTrails.filter(
    (t) => t.status === statusMap[activeTab]
  );

  return (
    <div className="min-h-screen bg-white">
      {/* ─── Gradient Header — everything sits on the gradient ─── */}
      <div
        className="relative px-4 pt-4 pb-8"
        style={{
          backgroundImage:
            "linear-gradient(126.8deg, rgb(146,190,255) 0%, rgb(190,236,255) 24%, rgb(242,189,151) 55%, rgb(255,222,222) 100%)",
        }}
      >
        {/* Nav row */}
        <div className="flex items-center justify-between mb-5">
          <button
            onClick={() => navigate("/")}
            className="w-9 h-9 rounded-full bg-[rgba(30,30,30,0.4)] border border-[rgba(255,255,255,0.7)] flex items-center justify-center"
          >
            <ChevronLeft size={20} className="text-white" />
          </button>
          <h2 className="text-[16px] font-['Poppins'] font-semibold text-gray-900">
            Creator Profile
          </h2>
          <div className="w-9" />
        </div>

        {/* ─── Profile Info — on gradient ─── */}
        <div className="flex items-center gap-3.5 mb-5">
          {/* Avatar with Instagram badge */}
          <div className="relative shrink-0">
            <div className="w-[86px] h-[86px] rounded-2xl border-[2.5px] border-white/60 flex items-center justify-center">
              <div className="w-[78px] h-[78px] rounded-xl overflow-hidden">
                <ImageWithFallback
                  src={creator.avatar}
                  alt={creator.handle}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div
              className="absolute -bottom-1 -right-1 w-[26px] h-[26px] rounded-xl flex items-center justify-center border-[2.5px] border-white"
              style={{
                background:
                  "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
              }}
            >
              <Instagram size={13} className="text-white" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-[17px] font-['Poppins'] font-semibold text-gray-900 leading-tight">
              {creator.handle}
            </h3>
            <p className="text-[12px] font-['Poppins'] text-gray-600 mt-1 leading-relaxed">
              {creator.bio}
            </p>
          </div>
        </div>

        {/* ─── Stat Chips 2×2 — on gradient ─── */}
        <div className="grid grid-cols-2 gap-2.5">
          <StatChip
            icon={<Instagram size={14} className="text-pink-500" />}
            value={creator.instagramFollowers}
            label="followers"
          />
          <StatChip
            icon={<Users size={14} className="text-blue-500" />}
            value={String(creator.following)}
            label="Following"
          />
          <StatChip
            icon={<Route size={14} className="text-emerald-500" />}
            value={String(creator.trailsCreated)}
            label="Trails Created"
          />
          <StatChip
            icon={<Eye size={14} className="text-purple-500" />}
            value={creator.totalViews}
            label="Total Views"
          />
        </div>
      </div>

      {/* ─── White Content Area ─── */}
      <div className="bg-white rounded-t-[28px] -mt-4 relative z-10 px-4 pt-5 pb-28">
        {/* ─── Tabs ─── */}
        <div className="flex gap-1 mb-5 bg-[#ECEDF2] rounded-full p-1.5">
          {tabs.map((tab) => {
            const active = activeTab === tab.label;
            return (
              <button
                key={tab.label}
                onClick={() => setActiveTab(tab.label)}
                className={`flex items-center gap-1.5 flex-1 justify-center py-1.5 rounded-full text-[13px] font-['Poppins'] font-medium transition-all ${
                  active
                    ? "bg-white text-gray-900 shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
                    : "text-gray-500"
                }`}
              >
                <span className="text-[12px] leading-none">{tab.emoji}</span>
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* ─── Trail Cards ─── */}
        <div className="flex flex-col">
          {displayTrails.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12">
              <span className="text-[32px] mb-2">
                {activeTab === "Live" ? "🔴" : activeTab === "Past" ? "⏳" : "🎯"}
              </span>
              <p className="text-[14px] font-['Poppins'] text-gray-400">
                No {activeTab.toLowerCase()} trails yet
              </p>
            </div>
          )}
          {displayTrails.map((trail, index) => (
            <div key={trail.id}>
              {index > 0 && (
                <div className="h-[3px] bg-[#f1f1f1] -mx-4" />
              )}
              <div className={`py-2 ${trail.badge ? "pt-7" : ""}`}>
                <TrailCard
                  trail={trail}
                  onClick={() => navigate(`/trail/${trail.id}`)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Stat Chip (glass-morphism pill on gradient) ── */
function StatChip({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2.5 bg-white/70 backdrop-blur-md rounded-2xl px-3.5 py-3 border border-white/80">
      <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-[15px] font-['Poppins'] font-semibold text-gray-900 leading-tight">
          {value}
        </p>
        <p className="text-[11px] font-['Poppins'] text-gray-500 leading-tight truncate">
          {label}
        </p>
      </div>
    </div>
  );
}

/* ── Trail Card — exact replica of homepage card ── */
function TrailCard({
  trail,
  onClick,
}: {
  trail: (typeof trails)[0];
  onClick: () => void;
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
            backgroundImage:
              "linear-gradient(95.1955deg, rgb(220, 54, 8) 4.4464%, rgb(255, 148, 47) 51.347%, rgb(195, 42, 0) 99.158%)",
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
        <div
          className="relative h-[210px] rounded-2xl overflow-hidden cursor-pointer"
          onClick={onClick}
        >
          <ImageWithFallback
            src={trail.image}
            alt={trail.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

          {/* Top chips row */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
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

          {/* Title and price — bottom overlay */}
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
            <h3 className="text-white font-['Poppins'] text-[22px] font-normal leading-tight flex-1">
              {trail.title}
            </h3>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-white/90 font-['Inter'] text-[14px] font-medium">
                {trail.price}
              </span>
              <MapPin size={15} className="text-white/75" />
            </div>
          </div>
        </div>
      </div>

      {/* Host and Join */}
      <div className="flex items-center justify-between px-[0px] py-[12px]">
        <div
          className="flex items-center gap-2.5 cursor-pointer"
          onClick={() => {
            const creatorId =
              creators.find((c) => c.handle === trail.hostHandle)?.id || "1";
            navigate(`/creator/${creatorId}`);
          }}
        >
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
              className={`transition-colors ${
                isSaved ? "text-red-500 fill-red-500" : "text-gray-400"
              }`}
            />
          </button>
        </div>
      </div>

      {/* ─── Stats strip: Joined / Stops / Time chips ─── */}
      <div className="flex items-center gap-2 mb-2">
        <div className="flex-1 flex items-center gap-2.5 border border-gray-200 rounded-xl px-2.5 py-2">
          <div className="w-[36px] h-[36px] rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
            <Users size={18} className="text-gray-900" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-['Poppins'] text-gray-400 leading-tight">Joined</p>
            <p className="text-[14px] font-['Poppins'] font-semibold text-gray-900 leading-tight">{trail.joined}</p>
          </div>
        </div>
        <div className="flex-1 flex items-center gap-2.5 border border-gray-200 rounded-xl px-2.5 py-2">
          <div className="w-[36px] h-[36px] rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
            <MapPin size={18} className="text-gray-900" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-['Poppins'] text-gray-400 leading-tight">Stops</p>
            <p className="text-[14px] font-['Poppins'] font-semibold text-gray-900 leading-tight">{trail.totalStops}</p>
          </div>
        </div>
        <div className="flex-1 flex items-center gap-2.5 border border-gray-200 rounded-xl px-2.5 py-2">
          <div className="w-[36px] h-[36px] rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
            <Clock size={18} className="text-gray-900" />
          </div>
          <div className="min-w-0">
            <p className="text-[11px] font-['Poppins'] text-gray-400 leading-tight">Time</p>
            <p className="text-[14px] font-['Poppins'] font-semibold text-gray-900 leading-tight whitespace-nowrap">{trail.totalDuration}</p>
          </div>
        </div>
      </div>

      {/* Views / Rating / View Stats */}
      <div className="flex items-center justify-between pb-1">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            <Eye size={13} className="text-gray-400" />
            <span className="text-[12px] font-['Poppins'] text-gray-400">{trail.views}</span>
          </div>
          <div className="flex items-center gap-1 bg-amber-50 border border-amber-300 rounded-full px-2.5 py-0.5">
            <Star size={11} className="text-amber-400 fill-amber-400" />
            <span className="text-[12px] font-['Poppins'] font-semibold text-amber-500">{trail.rating}</span>
          </div>
        </div>
        <button
          onClick={(e) => e.stopPropagation()}
          className="flex items-center gap-0.5 cursor-pointer active:opacity-70"
        >
          <span
            className="text-[13px] font-['Poppins'] font-semibold bg-clip-text text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(102deg, rgb(0, 5, 30) 12%, rgb(3, 3, 192) 39%, rgb(56, 125, 236) 84%, rgb(133, 200, 255) 101%)",
            }}
          >
            View Stats
          </span>
          <ChevronRight size={14} className="text-blue-500" />
        </button>
      </div>
    </div>
  );
}