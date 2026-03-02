import { useNavigate } from "react-router";
import { ChevronLeft, MapPin, Eye, Star, Users } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { creators, trails } from "../data/trailData";

const CATEGORY_TAGS: Record<string, { emoji: string; label: string }> = {
  "1": { emoji: "☕", label: "Coffee" },
  "2": { emoji: "🎨", label: "Art" },
  "3": { emoji: "🛹", label: "Street" },
  "4": { emoji: "🌙", label: "Nightlife" },
  "5": { emoji: "🍔", label: "Food" },
  "6": { emoji: "🌿", label: "Nature" },
  "7": { emoji: "🎵", label: "Music" },
  "8": { emoji: "🛍️", label: "Shopping" },
  "9": { emoji: "💪", label: "Sport" },
  "10": { emoji: "📸", label: "Photo" },
};

export function CreatorsListPage() {
  const navigate = useNavigate();

  return (
    <div className="h-screen overflow-y-auto bg-gray-50">
      {/* Header */}
      <div
        className="sticky top-0 z-10 px-4 pt-4 pb-4"
        style={{
          backgroundImage:
            "linear-gradient(126.8deg, rgb(146, 190, 255) 0%, rgb(190, 236, 255) 24%, rgb(242, 189, 151) 55%, rgb(255, 222, 222) 100%)",
        }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-full bg-white/30 backdrop-blur-sm border border-white/40 flex items-center justify-center"
          >
            <ChevronLeft size={20} className="text-gray-800" />
          </button>
          <div className="flex-1">
            <h1 className="text-[18px] font-['Poppins'] font-semibold text-gray-900">
              All Creators
            </h1>
            <p className="text-[12px] font-['Poppins'] text-gray-600">
              {creators.length} creators in your area
            </p>
          </div>
        </div>
      </div>

      {/* Creator Cards */}
      <div className="px-4 pt-2 pb-28">
        <div className="flex flex-col gap-2.5">
          {creators.map((creator) => {
            const creatorTrails = trails.filter(
              (t) => t.hostHandle === creator.handle
            );
            const tag = CATEGORY_TAGS[creator.id];

            return (
              <div
                key={creator.id}
                className="bg-white rounded-2xl p-3.5 border border-gray-200 cursor-pointer active:scale-[0.98] transition-transform"
                onClick={() => navigate(`/creator/${creator.id}`)}
              >
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="w-[52px] h-[52px] rounded-[14px] overflow-hidden shrink-0 border border-gray-200">
                    <ImageWithFallback
                      src={creator.avatar}
                      alt={creator.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-[15px] font-['Poppins'] font-semibold text-gray-900 truncate">
                        {creator.name}
                      </h3>
                      {tag && (
                        <span className="text-[12px] bg-gray-100 rounded-full px-2 py-0.5 shrink-0">
                          {tag.emoji} {tag.label}
                        </span>
                      )}
                    </div>
                    <p className="text-[12px] font-['Poppins'] text-gray-500 mt-0.5">
                      {creator.handle}
                    </p>

                    {/* Stats Row */}
                    <div className="flex items-center gap-3.5 mt-1.5">
                      <div className="flex items-center gap-1">
                        <MapPin size={12} className="text-gray-400" />
                        <span className="text-[12px] font-['Poppins'] text-gray-600">
                          {creator.trailsCreated} trails
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye size={12} className="text-gray-400" />
                        <span className="text-[12px] font-['Poppins'] text-gray-600">
                          {creator.totalViews}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users size={12} className="text-gray-400" />
                        <span className="text-[12px] font-['Poppins'] text-gray-600">
                          {creator.instagramFollowers}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Follow Button */}
                  <button
                    className="shrink-0 text-[13px] font-['Poppins'] font-semibold text-white px-4 py-2 rounded-full"
                    style={{
                      backgroundImage:
                        "linear-gradient(102deg, rgb(0, 5, 30) 12%, rgb(3, 3, 192) 39%, rgb(56, 125, 236) 84%, rgb(133, 200, 255) 101%)",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    Follow
                  </button>
                </div>

                {/* Recent Trails Preview */}
                {creatorTrails.length > 0 && (
                  <div className="flex gap-2 mt-3 pt-2.5 border-t border-gray-100">
                    {creatorTrails.slice(0, 2).map((trail) => (
                      <div
                        key={trail.id}
                        className="flex items-center gap-2 bg-gray-50 rounded-xl px-2.5 py-2 flex-1 min-w-0 cursor-pointer"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/trail/${trail.id}`);
                        }}
                      >
                        <div className="w-8 h-8 rounded-lg overflow-hidden shrink-0">
                          <ImageWithFallback
                            src={trail.image}
                            alt={trail.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[12px] font-['Poppins'] font-medium text-gray-800 truncate">
                            {trail.title}
                          </p>
                          <div className="flex items-center gap-1">
                            <Star
                              size={12}
                              className="text-gray-400"
                              fill="#9CA3AF"
                            />
                            <span className="text-[12px] font-['Poppins'] text-gray-500">
                              {trail.rating}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}