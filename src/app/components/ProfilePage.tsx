import { useState } from "react";
import { useNavigate } from "react-router";
import {
  ChevronLeft,
  MapPin,
  Clock,
  Star,
  Check,
  Edit3,
  Flame,
  Award,
  Trophy,
  ChevronRight,
  Camera,
  X,
  LogOut,
  Settings,
  Heart,
  Users,
  Zap,
  Instagram,
  Pencil,
  Trash2,
  Plus,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useUser } from "../data/userStore";
import { trails } from "../data/trailData";
import { MapPreview } from "./MapPreview";
import { formatCount } from "../data/instagramService";

const profileTabs = ["Joined", "Completed", "Created", "Favorites", "Badges"];

const badges = [
  { name: "First Trail", icon: MapPin, color: "#155DFC", earned: true },
  { name: "5 Day Streak", icon: Flame, color: "#EF4444", earned: true },
  { name: "Explorer", icon: Trophy, color: "#F59E0B", earned: true },
  { name: "Trail Creator", icon: Award, color: "#8B5CF6", earned: false },
  { name: "Social Star", icon: Star, color: "#EC4899", earned: false },
  { name: "Completionist", icon: Check, color: "#10B981", earned: false },
];

// Interest-to-emoji mapping matching the home page filter tags
const interestEmojiMap: Record<string, string> = {
  Food: "🍔",
  Sport: "💪",
  Shopping: "🛍️",
  Coffee: "☕",
  Art: "🎨",
  Nightlife: "🌙",
  Nature: "🌿",
  Music: "🎵",
  Photo: "📸",
  Wellness: "🧘",
  Travel: "✈️",
  Tech: "💻",
  Fashion: "👗",
  Gaming: "🎮",
  Fitness: "🏃",
  Reading: "📚",
};

export function ProfilePage() {
  const navigate = useNavigate();
  const { user, updateUser, logout } = useUser();
  const [activeTab, setActiveTab] = useState("Joined");
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(user.name);
  const [editBio, setEditBio] = useState(user.bio);

  const joinedTrails = trails.filter((t) => user.joinedTrailIds.includes(t.id));
  const completedTrails = trails.filter((t) =>
    user.completedTrailIds.includes(t.id)
  );
  const savedTrails = trails.filter((t) =>
    user.bookmarkedTrailIds.includes(t.id)
  );

  const handleSaveProfile = () => {
    updateUser({ name: editName, bio: editBio });
    setIsEditing(false);
  };

  const getTabContent = () => {
    switch (activeTab) {
      case "Joined":
        return joinedTrails.length > 0 ? (
          <div className="flex flex-col gap-3">
            {joinedTrails.map((trail) => (
              <ProfileTrailCard
                key={trail.id}
                trail={trail}
                status="joined"
                onClick={() => navigate(`/trail/${trail.id}`)}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            message="No trails joined yet"
            sub="Start your adventure by joining a trail"
            action="Discover Trails"
            onAction={() => navigate("/")}
          />
        );
      case "Completed":
        return completedTrails.length > 0 ? (
          <div className="flex flex-col gap-3">
            {completedTrails.map((trail) => (
              <ProfileTrailCard
                key={trail.id}
                trail={trail}
                status="completed"
                onClick={() => navigate(`/trail/${trail.id}`)}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            message="No trails completed yet"
            sub="Finish your first trail to earn rewards"
            action="Start a Trail"
            onAction={() => navigate("/")}
          />
        );
      case "Created":
        return (
          <div className="flex flex-col gap-3">
            {/* Create new trail CTA */}
            <button
              onClick={() => navigate("/create-trail")}
              className="flex items-center gap-3 bg-[#ECEDF2] rounded-2xl px-4 py-3.5 transition-colors active:bg-gray-200 cursor-pointer"
            >
              <div
                className="w-[36px] h-[36px] rounded-full flex items-center justify-center shrink-0"
                style={{
                  backgroundImage:
                    "linear-gradient(102deg, rgb(0, 5, 30) 12%, rgb(3, 3, 192) 39%, rgb(56, 125, 236) 84%, rgb(133, 200, 255) 101%)",
                }}
              >
                <Plus size={15} className="text-white" />
              </div>
              <div className="flex-1 min-w-0 text-left">
                <p className="font-['Poppins'] text-[13px] font-medium text-gray-700">
                  Create a New Trail
                </p>
                <p className="font-['Poppins'] text-[12px] text-gray-400 truncate">
                  Design and share your own experience
                </p>
              </div>
              <ChevronRight size={16} className="text-gray-300 shrink-0" />
            </button>

            {/* Created trails list */}
            {user.createdTrails.length > 0 ? (
              user.createdTrails.map((trail) => (
                <CreatedTrailCard
                  key={trail.id}
                  trail={trail}
                  onEdit={() => navigate(`/edit-trail/${trail.id}`)}
                  onView={() => navigate(`/trail/${trail.id}`)}
                />
              ))
            ) : (
              <div className="text-center py-6">
                <p className="font-['Poppins'] text-[13px] text-gray-400">
                  No trails created yet. Tap above to start!
                </p>
              </div>
            )}
          </div>
        );
      case "Favorites":
        return savedTrails.length > 0 ? (
          <div className="flex flex-col gap-3">
            {savedTrails.map((trail) => (
              <ProfileTrailCard
                key={trail.id}
                trail={trail}
                status="favorited"
                onClick={() => navigate(`/trail/${trail.id}`)}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            message="No favorite trails yet"
            sub="Tap the heart on any trail to save it here"
            action="Browse Trails"
            onAction={() => navigate("/")}
          />
        );
      case "Badges":
        return (
          <div className="grid grid-cols-3 gap-2.5">
            {badges.map((badge) => (
              <div
                key={badge.name}
                className={`flex flex-col items-center gap-2 py-4 px-3 rounded-2xl border transition-all ${
                  badge.earned
                    ? "bg-white border-gray-100"
                    : "bg-gray-50/50 border-gray-100/60 opacity-40"
                }`}
              >
                <div
                  className="w-[44px] h-[44px] rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: badge.earned
                      ? `${badge.color}12`
                      : "#f3f4f6",
                  }}
                >
                  <badge.icon
                    size={20}
                    style={{
                      color: badge.earned ? badge.color : "#9CA3AF",
                    }}
                  />
                </div>
                <span className="font-['Poppins'] text-[11px] font-medium text-gray-700 text-center leading-tight">
                  {badge.name}
                </span>
                {badge.earned && (
                  <div className="w-[18px] h-[18px] rounded-full bg-green-50 flex items-center justify-center">
                    <Check size={10} className="text-green-500" />
                  </div>
                )}
              </div>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  const earnedCount = badges.filter((b) => b.earned).length;

  return (
    <div className="min-h-screen bg-white pb-28 lg:pb-12">
      {/* Gradient Header — centered layout */}
      <div
        className="relative px-4 lg:px-8 pt-4 pb-16"
        style={{
          backgroundImage:
            "linear-gradient(126.8deg, rgb(146, 190, 255) 0%, rgb(190, 236, 255) 24%, rgb(242, 189, 151) 55%, rgb(255, 222, 222) 100%)",
        }}
      >
        {/* Top Nav */}
        <div className="flex items-center justify-between mb-6 lg:max-w-4xl lg:mx-auto">
          <button
            onClick={() => navigate("/")}
            className="bg-[rgba(30,30,30,0.4)] border border-[rgba(255,255,255,0.7)] backdrop-blur-md rounded-full p-2"
          >
            <ChevronLeft size={20} className="text-white" />
          </button>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="bg-[rgba(30,30,30,0.4)] border border-[rgba(255,255,255,0.7)] backdrop-blur-md rounded-full p-2"
          >
            {isEditing ? (
              <X size={18} className="text-white" />
            ) : (
              <Edit3 size={16} className="text-white" />
            )}
          </button>
        </div>

        {/* Centered Avatar + Name */}
        <div className="flex flex-col items-center">
          <div className="relative mb-3">
            <div className="w-[88px] h-[88px] rounded-[24px] overflow-hidden border-[3px] border-white">
              <ImageWithFallback
                src={user.avatar}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </div>
            {isEditing && (
              <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-white flex items-center justify-center border-2 border-gray-100 cursor-pointer">
                <Camera size={13} className="text-gray-600" />
              </div>
            )}
          </div>

          {isEditing ? (
            <div className="w-full max-w-[280px] space-y-2.5">
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-white/80 backdrop-blur-sm border border-white/60 text-[15px] font-['Poppins'] font-semibold text-gray-900 text-center focus:outline-none focus:ring-2 focus:ring-white/60"
              />
              <textarea
                value={editBio}
                onChange={(e) => setEditBio(e.target.value)}
                rows={2}
                className="w-full px-4 py-2.5 rounded-xl bg-white/80 backdrop-blur-sm border border-white/60 text-[13px] font-['Poppins'] text-gray-700 text-center focus:outline-none focus:ring-2 focus:ring-white/60 resize-none"
              />
              <button
                onClick={handleSaveProfile}
                className="w-full py-2.5 rounded-full text-[13px] font-['Poppins'] font-semibold text-white"
                style={{
                  backgroundImage:
                    "linear-gradient(102deg, rgb(0, 5, 30) 12%, rgb(3, 3, 192) 39%, rgb(56, 125, 236) 84%, rgb(133, 200, 255) 101%)",
                }}
              >
                Save Changes
              </button>
            </div>
          ) : (
            <>
              <h3 className="font-['Poppins'] text-[20px] font-semibold text-gray-900">
                {user.name || "Explorer"}
              </h3>
              <p className="font-['Poppins'] text-[13px] text-gray-600/80 -mt-0.5">
                {user.handle ? `@${user.handle}` : "@explorer"}
              </p>
              {(user.bio) && (
                <p className="font-['Poppins'] text-[12px] text-gray-700/70 mt-1.5 text-center max-w-[260px] leading-relaxed">
                  {user.bio}
                </p>
              )}

              {/* Followers / Following inline */}
              <div className="flex items-center gap-4 mt-3">
                <span className="font-['Poppins'] text-[13px] text-gray-800">
                  <span className="font-semibold">{user.followers}</span>
                  <span className="text-gray-500/80 ml-1">followers</span>
                </span>
                <span className="w-1 h-1 rounded-full bg-gray-400" />
                <span className="font-['Poppins'] text-[13px] text-gray-800">
                  <span className="font-semibold">{user.following}</span>
                  <span className="text-gray-500/80 ml-1">following</span>
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Content area — overlaps gradient with rounded top */}
      <div className="px-4 lg:px-8 -mt-8 relative z-10 bg-white rounded-t-[24px] pt-5">
        <div className="lg:max-w-4xl lg:mx-auto">
        {/* Stats Row — 4 columns, clean number-first */}
        <div className="flex items-center justify-between mb-5 px-2">
          <StatItem value={user.points} label="Points" icon={<Zap size={13} />} />
          <div className="w-px h-[32px] bg-gray-100" />
          <StatItem value={user.trailsJoined} label="Joined" icon={<MapPin size={13} />} />
          <div className="w-px h-[32px] bg-gray-100" />
          <StatItem value={user.trailsCompleted} label="Done" icon={<Check size={13} />} />
          <div className="w-px h-[32px] bg-gray-100" />
          <StatItem value={user.streak} label="Streak" icon={<Flame size={13} />} />
        </div>

        {/* Interests — emoji chips matching homepage filter style */}
        {user.interests.length > 0 && (
          <div className="mb-5">
            <div className="flex flex-wrap gap-2">
              {user.interests.map((interest) => (
                <span
                  key={interest}
                  className="flex items-center gap-1.5 px-3.5 py-2 bg-[#ECEDF2] rounded-full"
                >
                  <span className="text-[13px] leading-none">
                    {interestEmojiMap[interest] || "✨"}
                  </span>
                  <span className="text-[12px] font-['Poppins'] text-gray-700">
                    {interest}
                  </span>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* My Trail Map */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2.5">
            <h4 className="font-['Poppins'] text-[14px] font-semibold text-gray-900">
              My Trail Map
            </h4>
            <button
              onClick={() => navigate("/explore")}
              className="text-[12px] font-['Poppins'] font-medium text-gray-400 flex items-center gap-0.5"
            >
              Explore
              <ChevronRight size={14} />
            </button>
          </div>
          <MapPreview
            trailIds={[...user.joinedTrailIds, ...user.completedTrailIds]}
            label={`${user.trailsJoined} joined · ${user.trailsCompleted} done`}
            respectStopVisibility={false}
          />
        </div>

        {/* Tabs — unified pill style matching homepage */}
        <div className="flex gap-1 mb-4 bg-[#ECEDF2] rounded-full p-1.5">
          {profileTabs.map((tab) => {
            const count =
              tab === "Joined"
                ? joinedTrails.length
                : tab === "Completed"
                  ? completedTrails.length
                  : tab === "Created"
                    ? user.createdTrails.length
                    : tab === "Favorites"
                      ? savedTrails.length
                      : earnedCount;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2.5 rounded-full text-[12px] font-['Poppins'] font-medium transition-all flex items-center justify-center gap-1 ${
                  activeTab === tab
                    ? "bg-white text-gray-900"
                    : "text-gray-400"
                }`}
              >
                {tab}
                {count > 0 && (
                  <span
                    className={`text-[10px] font-semibold min-w-[16px] h-[16px] rounded-full flex items-center justify-center ${
                      activeTab === tab
                        ? "bg-gray-900 text-white"
                        : "bg-gray-300/50 text-gray-500"
                    }`}
                  >
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div>{getTabContent()}</div>

        {/* Account Section */}
        <div className="mt-8 mb-4">
          <h4 className="font-['Poppins'] text-[14px] font-semibold text-gray-900 mb-3">
            Account
          </h4>
          {user.email && (
            <div className="flex items-center gap-3 bg-[#ECEDF2] rounded-2xl px-4 py-3.5 mb-2.5">
              <div className="w-[36px] h-[36px] rounded-full bg-white flex items-center justify-center shrink-0">
                <Settings size={15} className="text-gray-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-['Poppins'] text-[13px] font-medium text-gray-700">
                  Email
                </p>
                <p className="font-['Poppins'] text-[12px] text-gray-400 truncate">
                  {user.email}
                </p>
              </div>
              <ChevronRight size={16} className="text-gray-300 shrink-0" />
            </div>
          )}
          {/* Instagram Connected */}
          {user.instagramData && (
            <div className="flex items-center gap-3 bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100 rounded-2xl px-4 py-3.5 mb-2.5">
              <div className="w-[36px] h-[36px] rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center shrink-0">
                <Instagram size={15} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-['Poppins'] text-[13px] font-medium text-gray-700">
                  Instagram
                </p>
                <p className="font-['Poppins'] text-[12px] text-gray-500 truncate">
                  @{user.instagramData.username} · {formatCount(user.instagramData.followersCount)} followers · {user.instagramData.engagementRate}% engage
                </p>
              </div>
              <Check size={16} className="text-green-500 shrink-0" />
            </div>
          )}
          <button
            onClick={() => {
              logout();
              navigate("/", { replace: true });
            }}
            className="w-full flex items-center gap-3 bg-[#ECEDF2] rounded-2xl px-4 py-3.5 transition-colors active:bg-red-50"
          >
            <div className="w-[36px] h-[36px] rounded-full bg-red-50 flex items-center justify-center shrink-0">
              <LogOut size={15} className="text-red-500" />
            </div>
            <span className="font-['Poppins'] text-[14px] font-medium text-red-600">
              Log Out
            </span>
          </button>
        </div>
        </div>
      </div>
    </div>
  );
}

/* ── Stat item (number-first, minimal) ── */
function StatItem({
  value,
  label,
  icon,
}: {
  value: number;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-0.5 px-2">
      <p className="font-['Poppins'] text-[18px] font-semibold text-gray-900">
        {value}
      </p>
      <div className="flex items-center gap-1">
        <span className="text-gray-400">{icon}</span>
        <p className="font-['Poppins'] text-[11px] text-gray-400">{label}</p>
      </div>
    </div>
  );
}

/* ── Trail Card — image-forward with overlay, matching homepage card language ── */
function ProfileTrailCard({
  trail,
  status,
  onClick,
}: {
  trail: (typeof trails)[0];
  status: "joined" | "completed" | "favorited";
  onClick: () => void;
}) {
  const statusConfig = {
    joined: { label: "In Progress", color: "#3B82F6" },
    completed: { label: "Completed", color: "#22C55E" },
    favorited: { label: "Favorited", color: "#F59E0B" },
  };

  const s = statusConfig[status];

  return (
    <div
      className="relative h-[140px] rounded-2xl overflow-hidden cursor-pointer active:scale-[0.98] transition-transform"
      onClick={onClick}
    >
      <ImageWithFallback
        src={trail.image}
        alt={trail.title}
        className="w-full h-full object-cover"
      />
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* Top row — status chip + duration */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
        <div
          className="rounded-full px-2.5 h-[24px] flex items-center gap-1"
          style={{ backgroundColor: s.color }}
        >
          {status === "completed" ? (
            <Check size={11} className="text-white" />
          ) : status === "favorited" ? (
            <Heart size={11} className="text-white fill-white" />
          ) : (
            <div className="w-[6px] h-[6px] rounded-full bg-white animate-pulse" />
          )}
          <span className="text-[11px] font-['Poppins'] font-semibold text-white">
            {s.label}
          </span>
        </div>
        <div className="bg-black/50 backdrop-blur-sm rounded-full px-2.5 h-[24px] flex items-center">
          <span className="text-[11px] font-['Poppins'] font-medium text-white">
            {trail.duration}
          </span>
        </div>
      </div>

      {/* Bottom row — title + meta */}
      <div className="absolute bottom-3 left-3 right-3">
        <h3 className="text-white font-['Poppins'] text-[17px] leading-tight mb-1">
          {trail.title}
        </h3>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-[11px] font-['Poppins'] text-white/70">
            <MapPin size={10} />
            {trail.totalStops} stops
          </span>
          <span className="flex items-center gap-1 text-[11px] font-['Poppins'] text-white/70">
            <Clock size={10} />
            {trail.totalDuration}
          </span>
          <span className="flex items-center gap-1 text-[11px] font-['Poppins'] text-white/70">
            <Star size={10} className="text-yellow-400 fill-yellow-400" />
            {trail.rating}
          </span>
          <span className="text-[11px] font-['Poppins'] text-white/50 ml-auto">
            {trail.hostHandle}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Created Trail Card ── */
function CreatedTrailCard({
  trail,
  onEdit,
  onView,
}: {
  trail: (typeof trails)[0];
  onEdit: () => void;
  onView: () => void;
}) {
  return (
    <div
      className="relative h-[140px] rounded-2xl overflow-hidden cursor-pointer active:scale-[0.98] transition-transform"
      onClick={onView}
    >
      <ImageWithFallback
        src={trail.image}
        alt={trail.title}
        className="w-full h-full object-cover"
      />
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* Top row — status chip + edit */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div
            className="rounded-full px-2.5 h-[24px] flex items-center gap-1"
            style={{ backgroundColor: "#8B5CF6" }}
          >
            <Pencil size={10} className="text-white" />
            <span className="text-[11px] font-['Poppins'] font-semibold text-white">
              Created
            </span>
          </div>
          {trail.joined > 0 && (
            <div className="bg-black/50 backdrop-blur-sm rounded-full px-2 h-[24px] flex items-center gap-1">
              <Users size={10} className="text-white/80" />
              <span className="text-[11px] font-['Poppins'] font-medium text-white">
                {trail.joined}
              </span>
            </div>
          )}
        </div>
        {/* Edit button */}
        <button
          onClick={(e) => { e.stopPropagation(); onEdit(); }}
          className="bg-white/90 backdrop-blur-sm rounded-full w-[30px] h-[30px] flex items-center justify-center transition-all active:scale-90"
        >
          <Pencil size={13} className="text-gray-700" />
        </button>
      </div>

      {/* Bottom row — title + meta */}
      <div className="absolute bottom-3 left-3 right-3">
        <h3 className="text-white font-['Poppins'] text-[17px] leading-tight mb-1">
          {trail.title}
        </h3>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-[11px] font-['Poppins'] text-white/70">
            <MapPin size={10} />
            {trail.totalStops} stops
          </span>
          <span className="flex items-center gap-1 text-[11px] font-['Poppins'] text-white/70">
            <Clock size={10} />
            {trail.totalDuration}
          </span>
          <span className="text-[11px] font-['Poppins'] text-white/50 ml-auto">
            {trail.date}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── Empty State ── */
function EmptyState({
  message,
  sub,
  action,
  onAction,
}: {
  message: string;
  sub: string;
  action: string;
  onAction: () => void;
}) {
  return (
    <div className="text-center py-10">
      <div className="w-[56px] h-[56px] bg-[#ECEDF2] rounded-[18px] flex items-center justify-center mx-auto mb-3">
        <MapPin size={22} className="text-gray-400" />
      </div>
      <p className="font-['Poppins'] text-[14px] font-semibold text-gray-800 mb-1">
        {message}
      </p>
      <p className="font-['Poppins'] text-[12px] text-gray-400 mb-4 max-w-[220px] mx-auto">
        {sub}
      </p>
      <button
        onClick={onAction}
        className="px-5 py-2.5 rounded-full text-[13px] font-['Poppins'] font-semibold text-white"
        style={{
          backgroundImage:
            "linear-gradient(102deg, rgb(0, 5, 30) 12%, rgb(3, 3, 192) 39%, rgb(56, 125, 236) 84%, rgb(133, 200, 255) 101%)",
        }}
      >
        {action}
      </button>
    </div>
  );
}