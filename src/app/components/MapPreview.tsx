import { useNavigate } from "react-router";
import { Navigation } from "lucide-react";
import { TrailMap } from "./TrailMap";
import type { Trail } from "../data/trailData";

/**
 * Consistent MapPreview wrapper used across all pages.
 *
 * Always interactive — pinch-to-zoom, drag to pan, just like the homepage.
 * Fixed 170px height. Same teardrop pin design via TrailMap.
 * Bottom-left info pill with gradient View button.
 * Top-right navigation icon.
 */

interface MapPreviewProps {
  /** Show a single trail's stops */
  singleTrailId?: string;
  /** Show multiple specific trails */
  trailIds?: string[];
  /** Label text shown in the bottom-left pill */
  label: string;
  /** Override stop data for real-time check-in state */
  stopOverrides?: { id: number; unlocked: boolean; checkedIn: boolean }[];
  /** Custom navigate target (defaults to /explore) */
  navigateTarget?: string;
  /** Whether to respect stop visibility (hide locked stops) */
  respectStopVisibility?: boolean;
  /** Whether the user has purchased/joined — false = blur & hide pins */
  purchased?: boolean;
  /** Override default map center (e.g. for selected city) */
  centerOverride?: [number, number];
  /** Override the default trail data set (e.g. city-filtered trails) */
  trailsData?: Trail[];
}

export function MapPreview({
  singleTrailId,
  trailIds,
  label,
  stopOverrides,
  navigateTarget = "/explore",
  respectStopVisibility = true,
  purchased = true,
  centerOverride,
  trailsData,
}: MapPreviewProps) {
  const navigate = useNavigate();

  const target = singleTrailId ? `/trail/${singleTrailId}/map` : navigateTarget;

  return (
    <div
      className="relative rounded-2xl h-[170px] overflow-hidden border border-gray-100 isolate cursor-pointer"
      onClick={() => purchased ? navigate(target) : undefined}
    >
      {/* Interactive map — always supports pinch-to-zoom & drag */}
      <TrailMap
        key={
          stopOverrides
            ? stopOverrides.map(s => `${s.id}:${s.unlocked}:${s.checkedIn}`).join(",")
            : `trails-${trailsData ? trailsData.map(t => t.id).join(",") : "default"}`
        }
        mini
        interactive={purchased}
        singleTrailId={singleTrailId}
        trailIds={trailIds}
        stopOverrides={purchased ? stopOverrides : []}
        respectStopVisibility={respectStopVisibility}
        className="w-full h-full"
        hideAllPins={!purchased}
        centerOverride={centerOverride}
        trailsData={trailsData}
      />

      {/* Pre-purchase: frosted overlay with lock */}
      {!purchased && (
        <div className="absolute inset-0 z-[1000] flex flex-col items-center justify-center backdrop-blur-[6px] bg-white/30">
          <div className="bg-white/80 backdrop-blur-sm rounded-full p-3 mb-2">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
            </svg>
          </div>
          <p className="text-[13px] font-['Poppins'] font-medium text-gray-600">
            Join to reveal route
          </p>
        </div>
      )}

      {/* Bottom-left info pill with View button — only when purchased */}
      {purchased && (
        <div className="absolute bottom-3 left-3 bg-white rounded-xl px-3 py-2 flex items-center gap-3 border border-gray-100 z-[1000]">
          <span className="text-[12px] font-['Poppins'] font-semibold text-gray-800">
            {label}
          </span>
          <button
            className="text-[12px] font-['Poppins'] text-white px-3 py-1 rounded-full"
            style={{
              backgroundImage:
                "linear-gradient(102deg, rgb(0, 5, 30) 12%, rgb(3, 3, 192) 39%, rgb(56, 125, 236) 84%, rgb(133, 200, 255) 101%)",
            }}
            onClick={(e) => {
              e.stopPropagation();
              navigate(target);
            }}
          >
            View
          </button>
        </div>
      )}

      {/* Top-right navigation button — only when purchased */}
      {purchased && (
        <button
          className="absolute top-3 right-3 bg-white/95 rounded-xl p-2 border border-gray-100 z-[1000]"
          onClick={(e) => {
            e.stopPropagation();
            navigate(target);
          }}
        >
          <Navigation size={16} className="text-blue-600" />
        </button>
      )}
    </div>
  );
}