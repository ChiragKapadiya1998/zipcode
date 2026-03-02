import { useUser } from "../data/userStore";
import { maybShowFavoriteToast } from "../data/favoriteToast";
import { useState, useCallback, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import {
  ChevronLeft,
  MapPin,
  Clock,
  Star,
  Lock,
  CheckCircle2,
  Navigation,
  Share2,
  Info,
  ChevronRight,
  Heart,
  Ticket,
  Sun,
  Users,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { trails } from "../data/trailData";
import type { TrailStop } from "../data/trailData";
import { getCachedEventbriteTrails } from "../data/eventbriteService";
import { MapPreview } from "./MapPreview";

// Helper: get a clear display price for any trail
function getDisplayPrice(trail: { isFree?: boolean; numericPrice?: number; currency?: string; price: string }): string {
  if (trail.isFree) return "Free";
  if (trail.numericPrice != null) return `${trail.currency === "USD" ? "$" : trail.currency}${trail.numericPrice.toFixed(0)}`;
  // Convert "$"/"$$"/"$$$" indicators to realistic amounts
  const priceMap: Record<string, string> = { "$": "$15", "$$": "$25", "$$$": "$45" };
  return priceMap[trail.price] || trail.price;
}

export function TrailDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, bookmarkTrail, checkInStop } = useUser();

  // Scroll to top on mount / when trail ID changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Look up in both static trails and user-created trails
  const trail = trails.find((t) => t.id === id) || (user.createdTrails || []).find((t) => t.id === id) || getCachedEventbriteTrails().find((t) => t.id === id) || trails[0];

  const [stops, setStops] = useState(trail.stops);
  const joined = user.joinedTrailIds.includes(trail.id);
  const isSaved = user.bookmarkedTrailIds.includes(trail.id);
  const [showJoinPrompt, setShowJoinPrompt] = useState(false);

  const handleCheckIn = useCallback(
    (stopId: number) => {
      // Gate check-in behind payment
      if (!joined) {
        setShowJoinPrompt(true);
        return;
      }

      // Persist to store for cross-page sync (full-screen map reads this)
      checkInStop(trail.id, stopId);

      setStops((prev) => {
        const newStops = prev.map((s) => {
          if (s.id === stopId) {
            return { ...s, checkedIn: true };
          }
          return s;
        });
        // Unlock next stop
        const currentIdx = newStops.findIndex((s) => s.id === stopId);
        if (currentIdx < newStops.length - 1) {
          newStops[currentIdx + 1] = {
            ...newStops[currentIdx + 1],
            unlocked: true,
          };
        }
        // Check if all stops are checked in
        const allCheckedIn = newStops.every((s) => s.checkedIn);
        if (allCheckedIn) {
          setTimeout(() => navigate(`/trail/${trail.id}/complete`), 1000);
        }
        return newStops;
      });
    },
    [navigate, trail.id, joined, checkInStop]
  );

  const checkedInCount = stops.filter((s) => s.checkedIn).length;

  return (
    <div className="relative min-h-screen bg-white">
      {/* Back Button — fixed at top, aligned within 430px container */}
      <button
        onClick={() => navigate("/")}
        className="fixed top-4 z-50 bg-[rgba(30,30,30,0.35)] backdrop-blur-md rounded-full p-2 border border-white/40"
        style={{ left: "max(16px, calc(50% - 215px + 16px))" }}
      >
        <ChevronLeft size={20} className="text-white" />
      </button>

      {/* Hero Image */}
      <div className="relative h-[300px]">
        <ImageWithFallback
          src={trail.image}
          alt={trail.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Share Button */}
        <button className="absolute top-4 right-4 bg-white/20 backdrop-blur-md rounded-full p-2.5 border border-white/40">
          <Share2 size={18} className="text-white" />
        </button>

        {/* Heart / Save Button */}
        <button
          onClick={() => {
            if (!isSaved) maybShowFavoriteToast();
            bookmarkTrail(trail.id);
          }}
          className="absolute top-4 right-16 bg-white/20 backdrop-blur-md rounded-full p-2.5 border border-white/40 active:scale-90 transition-transform"
        >
          <Heart
            size={18}
            className={`transition-colors ${isSaved ? "text-red-500 fill-red-500" : "text-white"}`}
          />
        </button>

        {/* Date badge */}
        <div className="absolute top-16 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-purple-500" />
          <span className="text-[12px] font-['Poppins'] font-medium text-gray-800">
            {trail.date}
          </span>
        </div>

        {/* Bottom info */}
        <div className="absolute bottom-4 left-4 right-4">
          <h1 className="text-white font-['Poppins'] text-[24px] font-semibold leading-tight mb-1">
            {trail.title}
          </h1>
          <div className="flex items-center gap-3 text-white/80">
            <span className="text-[13px] font-['Poppins'] flex items-center gap-1.5">
              {trail.duration}
              <span className="text-white/50">•</span>
              <MapPin size={13} className="text-white/75" />
              {trail.neighborhood}
            </span>
            <span className="text-[16px] font-semibold" style={getDisplayPrice(trail) === "Free" ? { color: "#00EC20" } : undefined}>{getDisplayPrice(trail)}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 pt-5 pb-36">
        {/* Vibe descriptor */}
        <p className="text-[12px] font-['Poppins'] text-gray-400 italic mb-4">
          {trail.vibe}
        </p>

        {/* Host Info */}
        <div
          className="flex items-center justify-between mb-4 cursor-pointer"
          onClick={() =>
            navigate(
              `/creator/${trail.hostHandle === "@TheEnthusiastSam" ? "1" : trail.hostHandle === "@iamlorina" ? "2" : "3"}`
            )
          }
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-100">
              <ImageWithFallback
                src={trail.hostAvatar}
                alt={trail.hostHandle}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-[12px] text-gray-500 font-['Poppins']">
                  Hosted by
                </p>
                <span className="bg-blue-50 text-blue-600 text-[11px] font-['Poppins'] font-medium px-2.5 py-0.5 rounded-full">
                  Local Creator
                </span>
              </div>
              <p className="text-[15px] font-['Poppins'] font-semibold text-gray-900">
                {trail.hostHandle}
              </p>
              <p className="text-[12px] text-blue-500 font-['Poppins']">
                {trail.hostFollowers} followers
              </p>
            </div>
          </div>
          <ChevronRight size={20} className="text-gray-400" />
        </div>

        <p className="text-[12px] text-gray-500 font-['Poppins'] mb-1">
          {trail.hostBio}
        </p>

        {/* Description */}
        <p className="text-[14px] text-gray-700 font-['Poppins'] leading-relaxed mb-5">
          {trail.description}
        </p>

        {/* Stats Row */}
        <div className="flex items-center gap-3 mb-5 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2.5 shrink-0">
            <Clock size={16} className="text-gray-500" />
            <div>
              <p className="text-[13px] font-['Poppins'] font-semibold text-gray-800">
                {trail.totalDuration}
              </p>
              <p className="text-[10px] text-gray-400 font-['Poppins']">
                Duration
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2.5 shrink-0">
            <MapPin size={16} className="text-gray-500" />
            <div>
              <p className="text-[13px] font-['Poppins'] font-semibold text-gray-800">
                {trail.totalStops} stops
              </p>
              <p className="text-[10px] text-gray-400 font-['Poppins']">
                Stops
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2.5 shrink-0">
            <Sun size={16} className="text-gray-500" />
            <div>
              <p className="text-[13px] font-['Poppins'] font-semibold text-gray-800">
                {trail.bestTimeOfDay}
              </p>
              <p className="text-[10px] text-gray-400 font-['Poppins']">
                Best time
              </p>
            </div>
          </div>
          {trail.groupFriendly && (
            <div className="flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2.5 shrink-0">
              <Users size={16} className="text-gray-500" />
              <div>
                <p className="text-[13px] font-['Poppins'] font-semibold text-gray-800">
                  Group OK
                </p>
                <p className="text-[10px] text-gray-400 font-['Poppins']">
                  Friendly
                </p>
              </div>
            </div>
          )}
          {trail.capacity != null && (
            <div className="flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2.5 shrink-0">
              <Ticket size={16} className="text-gray-500" />
              <div>
                <p className="text-[13px] font-['Poppins'] font-semibold text-gray-800">
                  {trail.capacity}
                </p>
                <p className="text-[10px] text-gray-400 font-['Poppins']">
                  Capacity
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Social Row */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex -space-x-2">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-7 h-7 rounded-full border-2 border-white overflow-hidden"
              >
                <ImageWithFallback
                  src={trails[i]?.hostAvatar || trail.hostAvatar}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          <span className="text-[13px] font-['Poppins'] text-gray-600">
            +{trail.joined} Joined
          </span>
          <div className="ml-auto flex items-center gap-1 bg-amber-50 border border-amber-300 rounded-full px-2.5 py-0.5">
            <Star size={12} className="text-amber-400 fill-amber-400" />
            <span className="text-[13px] font-['Poppins'] font-semibold text-amber-500">
              {trail.rating}
            </span>
          </div>
        </div>

        {/* Route Preview */}
        <div className="mb-6">
          <h2 className="text-[16px] font-['Poppins'] font-semibold text-gray-900 mb-3">
            Route Preview
          </h2>
          <MapPreview
            singleTrailId={trail.id}
            label={`${stops.filter((s) => s.unlocked || s.checkedIn).length}/${trail.totalStops} Stops`}
            stopOverrides={stops.map((s) => ({ id: s.id, unlocked: s.unlocked, checkedIn: s.checkedIn }))}
            navigateTarget={`/explore`}
            respectStopVisibility={true}
            purchased={joined}
          />
        </div>

        {/* Stops Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-[16px] font-['Poppins'] font-semibold text-gray-900">
              Stops
            </h2>
            <span className="text-[13px] font-['Poppins'] text-gray-500">
              {joined ? "Progressive reveal" : `${trail.totalStops} stops`}
            </span>
          </div>

          <div className="flex items-start gap-2 bg-blue-50 rounded-xl px-3 py-2.5 mb-4">
            <Info size={16} className="text-blue-500 shrink-0 mt-0.5" />
            <p className="text-[12px] font-['Poppins'] text-blue-700">
              {joined
                ? "Next stop unlocks after you check-in. This prevents screenshotting and keeps trails fresh."
                : "Stop details are revealed after you join this trail. Each stop unlocks progressively as you check in."}
            </p>
          </div>

          {/* Progress bar — only show post-purchase */}
          {joined && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1">
                <span className="text-[12px] font-['Poppins'] text-gray-500">
                  Progress
                </span>
                <span className="text-[12px] font-['Poppins'] font-semibold text-gray-700">
                  {checkedInCount}/{stops.length} stops
                </span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${(checkedInCount / stops.length) * 100}%`,
                    backgroundImage:
                      "linear-gradient(102deg, rgb(0, 5, 30) 12%, rgb(3, 3, 192) 39%, rgb(56, 125, 236) 84%, rgb(133, 200, 255) 101%)",
                  }}
                />
              </div>
            </div>
          )}

          {/* Stop Cards */}
          <div className="flex flex-col gap-4">
            {stops.map((stop, idx) => (
              <StopCard
                key={stop.id}
                stop={stop}
                index={idx}
                onCheckIn={handleCheckIn}
                isLast={idx === stops.length - 1}
                purchased={joined}
              />
            ))}
          </div>
        </div>

        {/* Fixed Bottom Action Bar */}
        <div className="fixed bottom-0 left-0 right-0 w-full max-w-[430px] mx-auto p-4 bg-white/95 backdrop-blur-md border-t border-gray-100 z-[999]">
          <button
            onClick={() => navigate(`/trail/${trail.id}/checkout`)}
            className="w-full py-3.5 rounded-2xl text-white font-['Poppins'] text-[14px] font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
            style={{
              backgroundImage:
                "linear-gradient(102deg, rgb(0, 5, 30) 12%, rgb(3, 3, 192) 39%, rgb(56, 125, 236) 84%, rgb(133, 200, 255) 101%)",
            }}
          >
            <Ticket size={18} />
            Join Trail · <span style={getDisplayPrice(trail) === "Free" ? { color: "#00EC20" } : undefined}>{getDisplayPrice(trail)}</span>
          </button>
        </div>

        {/* Join Prompt Bottom Sheet */}
        {showJoinPrompt && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 bg-black/40 z-40 animate-in fade-in duration-200"
              onClick={() => setShowJoinPrompt(false)}
            />
            {/* Sheet */}
            <div className="fixed bottom-0 left-0 right-0 w-full max-w-[430px] mx-auto z-50 animate-in slide-in-from-bottom duration-300">
              <div className="bg-white rounded-t-3xl px-5 pt-3 pb-8">
                {/* Handle */}
                <div className="flex justify-center mb-5">
                  <div className="w-10 h-1 bg-gray-200 rounded-full" />
                </div>

                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <div
                    className="w-[56px] h-[56px] rounded-full flex items-center justify-center"
                    style={{
                      backgroundImage:
                        "linear-gradient(102deg, rgb(0, 5, 30) 12%, rgb(3, 3, 192) 39%, rgb(56, 125, 236) 84%, rgb(133, 200, 255) 101%)",
                    }}
                  >
                    <Lock size={24} className="text-white" />
                  </div>
                </div>

                <h3 className="text-[18px] font-['Poppins'] font-semibold text-gray-900 text-center mb-1.5">
                  Join to Start Checking In
                </h3>
                <p className="text-[14px] font-['Poppins'] text-gray-500 text-center leading-relaxed mb-6">
                  Unlock check-ins, progressive stop reveals, and exclusive creator content by joining this trail.
                </p>

                <button
                  onClick={() => {
                    setShowJoinPrompt(false);
                    navigate(`/trail/${trail.id}/checkout`);
                  }}
                  className="w-full py-3.5 rounded-2xl text-white font-['Poppins'] text-[14px] font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-transform mb-3"
                  style={{
                    backgroundImage:
                      "linear-gradient(102deg, rgb(0, 5, 30) 12%, rgb(3, 3, 192) 39%, rgb(56, 125, 236) 84%, rgb(133, 200, 255) 101%)",
                  }}
                >
                  <Ticket size={18} />
                  Join Trail · <span style={getDisplayPrice(trail) === "Free" ? { color: "#00EC20" } : undefined}>{getDisplayPrice(trail)}</span>
                </button>
                <button
                  onClick={() => setShowJoinPrompt(false)}
                  className="w-full py-3 font-['Poppins'] text-[14px] font-medium text-gray-500"
                >
                  Maybe Later
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function StopCard({
  stop,
  index,
  onCheckIn,
  isLast,
  purchased,
}: {
  stop: TrailStop;
  index: number;
  onCheckIn: (id: number) => void;
  isLast: boolean;
  purchased: boolean;
}) {
  // Pre-purchase: force all stops to appear locked
  const effectiveUnlocked = purchased && stop.unlocked;
  const effectiveCheckedIn = purchased && stop.checkedIn;
  const isNow = effectiveUnlocked && !effectiveCheckedIn;

  return (
    <div className="relative">
      {/* Label */}
      {isNow && index === 0 && (
        <div className="mb-2">
          <span className="text-[12px] font-['Poppins'] font-semibold text-orange-500 bg-orange-50 px-3 py-1 rounded-full">
            Now
          </span>
        </div>
      )}
      {!effectiveUnlocked && !effectiveCheckedIn && (
        <div className="mb-2">
          <span className="text-[12px] font-['Poppins'] font-semibold text-gray-400">
            Stop {index + 1}
          </span>
        </div>
      )}
      {effectiveCheckedIn && (
        <div className="mb-2">
          <span className="text-[12px] font-['Poppins'] font-semibold text-green-500 bg-green-50 px-3 py-1 rounded-full">
            Completed
          </span>
        </div>
      )}

      <div
        className={`rounded-2xl overflow-hidden border transition-all ${
          effectiveUnlocked
            ? "border-gray-200 bg-white"
            : "border-gray-100 bg-gray-50"
        }`}
      >
        {/* Image / Media Gallery */}
        <div className="relative h-[160px]">
          {effectiveUnlocked && stop.images && stop.images.length > 1 ? (
            <div className="flex gap-0 overflow-x-auto scrollbar-hide h-full">
              {stop.images.map((img, imgIdx) => (
                <div key={imgIdx} className="relative h-full shrink-0" style={{ width: stop.images!.length <= 2 ? "50%" : "70%" }}>
                  <ImageWithFallback
                    src={img}
                    alt={`${stop.name} ${imgIdx + 1}`}
                    className="w-full h-full object-cover"
                  />
                  {imgIdx === 0 && stop.images!.length > 1 && (
                    <div className="absolute bottom-2 right-2 bg-black/50 backdrop-blur-sm rounded-full px-2 py-0.5">
                      <span className="text-[10px] font-['Poppins'] text-white">{stop.images!.length} photos</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <ImageWithFallback
              src={stop.image}
              alt={effectiveUnlocked ? stop.name : `Stop ${index + 1}`}
              className={`w-full h-full object-cover ${
                !effectiveUnlocked ? "blur-md opacity-50" : ""
              }`}
            />
          )}
          {!effectiveUnlocked && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white/80 backdrop-blur-sm rounded-full p-3">
                <Lock size={24} className="text-gray-400" />
              </div>
            </div>
          )}
          {effectiveCheckedIn && (
            <div className="absolute inset-0 bg-green-500/10 flex items-center justify-center">
              <CheckCircle2
                size={40}
                className="text-green-500 fill-green-500/20"
              />
            </div>
          )}
        </div>

        {/* Info — only show when purchased AND unlocked */}
        {effectiveUnlocked && (
          <div className="p-4">
            <div className="flex items-start gap-2 mb-3">
              <MapPin size={16} className="text-blue-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-[14px] font-['Poppins'] font-medium text-gray-800">
                  {stop.name}
                </p>
                <p className="text-[12px] font-['Poppins'] text-gray-500">
                  {stop.address}
                </p>
              </div>
              <button className="ml-auto">
                <Navigation size={16} className="text-blue-500" />
              </button>
            </div>

            {!effectiveCheckedIn && (
              <div className="flex items-center justify-between">
                <span className="text-[12px] font-['Poppins'] text-gray-500">
                  Check in to unlock next
                </span>
                <button
                  onClick={() => onCheckIn(stop.id)}
                  className="text-white font-['Poppins'] text-[13px] font-semibold px-4 py-2 rounded-full"
                  style={{
                    backgroundImage:
                      "linear-gradient(102deg, rgb(0, 5, 30) 12%, rgb(3, 3, 192) 39%, rgb(56, 125, 236) 84%, rgb(133, 200, 255) 101%)",
                  }}
                >
                  Check In
                </button>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Teaser — show below card for locked stops */}
      {!effectiveUnlocked && !effectiveCheckedIn && stop.teaser && (
        <p className="text-[12px] font-['Poppins'] text-gray-400 italic mt-2 px-1">
          "{stop.teaser}"
        </p>
      )}
    </div>
  );
}