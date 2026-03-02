import { useParams, useNavigate } from "react-router";
import { useCallback, useState } from "react";
import { ChevronLeft, Crosshair } from "lucide-react";
import { trails } from "../data/trailData";
import { TrailMap } from "./TrailMap";
import { useUser } from "../data/userStore";
import { getCachedEventbriteTrails } from "../data/eventbriteService";

export function FullScreenTrailMap() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const trail = trails.find((t) => t.id === id) || (user.createdTrails || []).find((t) => t.id === id) || getCachedEventbriteTrails().find((t) => t.id === id);
  const [mapKey, setMapKey] = useState(0);

  if (!trail) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <p className="text-[14px] font-['Poppins'] text-gray-500">
          Trail not found
        </p>
      </div>
    );
  }

  const joined = user.joinedTrailIds.includes(trail.id);
  const checkedStopIds = user.checkedInStops[trail.id] || [];

  // Build stop overrides from persisted store state
  // Progressive unlock: a stop is unlocked if it's the first stop,
  // or if the previous stop has been checked in
  const stopOverrides = trail.stops.map((s, idx) => {
    const isCheckedIn = checkedStopIds.includes(s.id);
    const isFirstStop = idx === 0;
    const prevCheckedIn = idx > 0 && checkedStopIds.includes(trail.stops[idx - 1].id);
    const unlocked = joined ? (isFirstStop || prevCheckedIn || isCheckedIn) : isFirstStop;

    return {
      id: s.id,
      unlocked,
      checkedIn: isCheckedIn,
    };
  });

  const visibleCount = stopOverrides.filter((s) => s.unlocked || s.checkedIn).length;
  const checkedCount = stopOverrides.filter((s) => s.checkedIn).length;
  const totalStops = trail.totalStops;

  // Re-center by bumping the key to force TrailMap to remount and fit bounds
  const handleRecenter = useCallback(() => {
    setMapKey((k) => k + 1);
  }, []);

  return (
    <div className="relative w-full h-screen bg-white flex flex-col">
      {/* Map fills the screen */}
      <div className="flex-1 relative">
        <TrailMap
          key={`fullscreen-${trail.id}-${mapKey}-${checkedStopIds.join(",")}`}
          singleTrailId={trail.id}
          interactive={true}
          mini={false}
          stopOverrides={stopOverrides}
          respectStopVisibility={true}
          className="w-full h-full"
        />

        {/* Top overlay bar */}
        <div className="absolute top-0 left-0 right-0 z-[1000] p-4 flex items-start justify-between pointer-events-none">
          {/* Back button */}
          <button
            onClick={() => navigate(-1)}
            className="pointer-events-auto w-10 h-10 rounded-xl bg-white/95 border border-gray-100 flex items-center justify-center active:scale-95 transition-transform"
          >
            <ChevronLeft size={20} className="text-gray-700" />
          </button>

          {/* Trail info pill */}
          <div className="pointer-events-auto bg-white/95 border border-gray-100 rounded-xl px-3 py-2 max-w-[220px]">
            <p className="text-[13px] font-['Poppins'] font-semibold text-gray-900 truncate">
              {trail.title}
            </p>
            <p className="text-[12px] font-['Poppins'] text-gray-500">
              {checkedCount}/{totalStops} stops visited
            </p>
          </div>
        </div>

        {/* Re-center button */}
        <button
          onClick={handleRecenter}
          className="absolute bottom-20 right-4 z-[1000] w-11 h-11 rounded-xl bg-white/95 border border-gray-100 flex items-center justify-center active:scale-95 transition-transform"
        >
          <Crosshair size={20} className="text-gray-600" />
        </button>

        {/* Bottom legend */}
        <div className="absolute bottom-4 left-4 right-4 z-[1000] pointer-events-none">
          <div className="pointer-events-auto bg-white/95 border border-gray-100 rounded-xl px-4 py-3 flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: "#38B060" }}
              />
              <span className="text-[12px] font-['Poppins'] text-gray-600">
                Visited
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: trail.color }}
              />
              <span className="text-[12px] font-['Poppins'] text-gray-600">
                Unlocked
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-gray-300" />
              <span className="text-[12px] font-['Poppins'] text-gray-600">
                Locked
              </span>
            </div>
            <span className="ml-auto text-[12px] font-['Poppins'] font-semibold text-gray-700">
              {visibleCount}/{totalStops}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}