import { useEffect, useRef } from "react";
import L from "leaflet";
import { trails } from "../data/trailData";
import type { Trail } from "../data/trailData";
import { getCachedEventbriteTrails } from "../data/eventbriteService";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const LA_CENTER: [number, number] = [34.0522, -118.2437];

// Each color maps to a gradient pair (top lighter, bottom richer)
const PIN_PALETTE: Record<
  string,
  { top: string; bot: string; dark: string }
> = {
  "#155DFC": { top: "#6EA8FE", bot: "#3B6DF0", dark: "#2450C8" },
  "#8B5CF6": { top: "#B294F8", bot: "#7C4AE8", dark: "#5E30C8" },
  "#EF4444": { top: "#F88A8A", bot: "#E04C4C", dark: "#C03030" },
  "#F59E0B": { top: "#FCC560", bot: "#E89020", dark: "#C07010" },
  "#F97316": { top: "#FFB070", bot: "#E87830", dark: "#C86018" },
  "#3B82F6": { top: "#7CB4FC", bot: "#4A80EC", dark: "#2E60CC" },
  "#EC4899": { top: "#F490C0", bot: "#D85090", dark: "#B83874" },
  "#6366F1": { top: "#9498F8", bot: "#5558E4", dark: "#3E40C8" },
  "#22C55E": { top: "#6EE89A", bot: "#38B060", dark: "#209048" },
  "#F43F5E": { top: "#F88898", bot: "#E04060", dark: "#C02848" },
  "#14B8A6": { top: "#5CE0D0", bot: "#28A898", dark: "#188878" },
};

function getColors(color: string) {
  return (
    PIN_PALETTE[color] || { top: "#a0aec0", bot: "#718096", dark: "#4a5568" }
  );
}

/**
 * Creative teardrop pin with stop count inside.
 *
 * Shape: smooth inverted-drop silhouette (round head tapering to a point).
 * Head contains the trail's stop count inside a white inset circle.
 * Body uses the trail's gradient colors. A subtle curved highlight
 * on the upper-left gives a 3D ceramic feel. A small ground-shadow
 * ellipse anchors it to the map.
 *
 * Default ~30x40  |  Selected ~36x48
 */
function createTrailIcon(
  color: string,
  stops: number,
  isSelected: boolean,
  _tags?: string[]
) {
  const p = getColors(color);
  const uid = `t${Math.random().toString(36).slice(2, 7)}`;

  // Sizing — compact but readable
  const s = isSelected ? 1.2 : 1;
  const W = Math.round(30 * s);
  const H = Math.round(40 * s);
  // We'll draw in a fixed 30x40 viewBox and scale via width/height
  const vW = 30;
  const vH = 40;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${vW} ${vH}" style="overflow:visible">
  <defs>
    <linearGradient id="g${uid}" x1="0.5" y1="0" x2="0.5" y2="1">
      <stop offset="0%" stop-color="${p.top}"/>
      <stop offset="100%" stop-color="${p.bot}"/>
    </linearGradient>
    <radialGradient id="h${uid}" cx="0.35" cy="0.25" r="0.55">
      <stop offset="0%" stop-color="white" stop-opacity="0.50"/>
      <stop offset="100%" stop-color="white" stop-opacity="0"/>
    </radialGradient>
    <filter id="f${uid}" x="-20%" y="-10%" width="140%" height="135%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="${isSelected ? 2 : 1.4}"/>
      <feOffset dy="${isSelected ? 1.5 : 1}"/>
      <feComponentTransfer><feFuncA type="linear" slope="${isSelected ? 0.22 : 0.14}"/></feComponentTransfer>
      <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  <ellipse cx="15" cy="${vH - 1}" rx="${isSelected ? 5 : 4}" ry="1.2" fill="rgba(0,0,0,${isSelected ? 0.10 : 0.06})"/>
  <g filter="url(#f${uid})">
    <path d="M15 ${vH - 3}C15 ${vH - 3} 27 24 27 14C27 7.37 21.63 2 15 2C8.37 2 3 7.37 3 14C3 24 15 ${vH - 3} 15 ${vH - 3}Z"
      fill="url(#g${uid})" stroke="white" stroke-width="${isSelected ? 2 : 1.5}"/>
    <path d="M15 ${vH - 3}C15 ${vH - 3} 27 24 27 14C27 7.37 21.63 2 15 2C8.37 2 3 7.37 3 14C3 24 15 ${vH - 3} 15 ${vH - 3}Z"
      fill="url(#h${uid})"/>
    <circle cx="15" cy="14" r="${isSelected ? 8.5 : 7.5}" fill="white" opacity="0.92"/>
    <circle cx="15" cy="14" r="${isSelected ? 8.5 : 7.5}" fill="none" stroke="${p.bot}" stroke-width="0.4" opacity="0.15"/>
  </g>
  <text x="15" y="14" text-anchor="middle" font-size="${isSelected ? 13 : 11}" font-weight="700" font-family="'Inter','Poppins',system-ui,sans-serif" dominant-baseline="central" fill="#000000">${stops}</text>
</svg>`;

  return L.divIcon({
    html: svg,
    className: `trail-pin${isSelected ? " trail-pin-active" : ""}`,
    iconSize: [W, H],
    iconAnchor: [W / 2, H - 1],
    popupAnchor: [0, -(H - 6)],
  });
}

/**
 * Stop-level pin for detail view.
 * A smaller teardrop with the stop number inside.
 * Color indicates status: green = checked in, trail color = unlocked, gray = locked.
 */
function createStopIcon(
  color: string,
  stopNumber: number,
  status: "checkedIn" | "unlocked" | "locked"
) {
  const p = getColors(color);
  const uid = `s${Math.random().toString(36).slice(2, 7)}`;

  const topC =
    status === "checkedIn"
      ? "#6EE89A"
      : status === "unlocked"
        ? p.top
        : "#C8CDD4";
  const botC =
    status === "checkedIn"
      ? "#38B060"
      : status === "unlocked"
        ? p.bot
        : "#9CA3AF";

  const W = 22;
  const H = 30;
  const vW = 22;
  const vH = 30;

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${vW} ${vH}" style="overflow:visible">
  <defs>
    <linearGradient id="g${uid}" x1="0.5" y1="0" x2="0.5" y2="1">
      <stop offset="0%" stop-color="${topC}"/>
      <stop offset="100%" stop-color="${botC}"/>
    </linearGradient>
    <filter id="f${uid}" x="-25%" y="-10%" width="150%" height="135%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="1"/>
      <feOffset dy="0.8"/>
      <feComponentTransfer><feFuncA type="linear" slope="0.12"/></feComponentTransfer>
      <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>
  <ellipse cx="11" cy="${vH - 1}" rx="3" ry="0.9" fill="rgba(0,0,0,0.06)"/>
  <g filter="url(#f${uid})">
    <path d="M11 ${vH - 3}C11 ${vH - 3} 20 18 20 11C20 6.03 16.97 2 11 2C5.03 2 2 6.03 2 11C2 18 11 ${vH - 3} 11 ${vH - 3}Z"
      fill="url(#g${uid})" stroke="white" stroke-width="1.5"/>
  </g>
  <circle cx="11" cy="11" r="5.5" fill="white" opacity="0.90"/>
  <text x="11" y="11" text-anchor="middle" dominant-baseline="central" dy="0.5"
    fill="${botC}" font-family="'Inter','Poppins',system-ui,sans-serif"
    font-size="8" font-weight="700">${stopNumber}</text>
</svg>`;

  return L.divIcon({
    html: svg,
    className: "stop-pin-icon",
    iconSize: [W, H],
    iconAnchor: [W / 2, H - 1],
    popupAnchor: [0, -(H - 6)],
  });
}

interface TrailMapProps {
  mini?: boolean;
  className?: string;
  onTrailSelect?: (trailId: string) => void;
  selectedTrailId?: string | null;
  interactive?: boolean;
  singleTrailId?: string;
  trailIds?: string[];
  /** Override stop data (e.g. from local state with updated check-in status) */
  stopOverrides?: { id: number; unlocked: boolean; checkedIn: boolean }[];
  /** When true, only visible (unlocked/checkedIn) stops get pins & polylines */
  respectStopVisibility?: boolean;
  /** When true, hide ALL pins and polylines (pre-purchase blur mode) */
  hideAllPins?: boolean;
  /** Override default map center (e.g. for selected city) */
  centerOverride?: [number, number];
  /** Override the default trail data set (e.g. city-filtered trails) */
  trailsData?: Trail[];
}

export function TrailMap({
  mini = false,
  className = "",
  onTrailSelect,
  selectedTrailId,
  interactive = true,
  singleTrailId,
  trailIds,
  stopOverrides,
  respectStopVisibility = true,
  hideAllPins = false,
  centerOverride,
  trailsData,
}: TrailMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const mountedRef = useRef(false);

  useEffect(() => {
    if (!mapRef.current) return;

    if (mapInstanceRef.current) {
      try {
        mapInstanceRef.current.stop();
        mapInstanceRef.current.remove();
      } catch (_) {
        /* ignore */
      }
      mapInstanceRef.current = null;
      markersRef.current = [];
    }

    if ((mapRef.current as any)._leaflet_id) {
      delete (mapRef.current as any)._leaflet_id;
    }

    mountedRef.current = true;

    const singleTrail = singleTrailId
      ? (trails.find((t) => t.id === singleTrailId) || getCachedEventbriteTrails().find((t) => t.id === singleTrailId))
      : null;
    const allAvailableTrails = trailsData || [...trails, ...getCachedEventbriteTrails()];
    const displayTrails = singleTrail
      ? []
      : trailIds
        ? allAvailableTrails.filter((t) => trailIds.includes(t.id))
        : allAvailableTrails;

    let center: [number, number] = centerOverride || LA_CENTER;
    let zoom = mini ? 12 : 13;

    if (singleTrail && singleTrail.stops.length > 0) {
      const lats = singleTrail.stops.map((s) => s.lat);
      const lngs = singleTrail.stops.map((s) => s.lng);
      center = [
        (Math.min(...lats) + Math.max(...lats)) / 2,
        (Math.min(...lngs) + Math.max(...lngs)) / 2,
      ];
      zoom = 14;
    } else if (trailIds && trailIds.length > 0 && displayTrails.length > 0) {
      const lats = displayTrails.map((t) => t.lat);
      const lngs = displayTrails.map((t) => t.lng);
      center = [
        (Math.min(...lats) + Math.max(...lats)) / 2,
        (Math.min(...lngs) + Math.max(...lngs)) / 2,
      ];
    }

    const map = L.map(mapRef.current, {
      center,
      zoom,
      zoomControl: !mini,
      attributionControl: !mini,
      dragging: interactive,
      scrollWheelZoom: interactive,
      touchZoom: interactive,
      doubleClickZoom: interactive,
      boxZoom: interactive,
      fadeAnimation: false,
      zoomAnimation: true,
    });

    L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
      {
        attribution: mini
          ? ""
          : '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
        subdomains: "abcd",
        maxZoom: 19,
      }
    ).addTo(map);

    if (singleTrail) {
      // Merge stop overrides if provided (for real-time check-in state)
      const resolvedStops = singleTrail.stops.map((stop) => {
        const override = stopOverrides?.find((o) => o.id === stop.id);
        return override
          ? { ...stop, unlocked: override.unlocked, checkedIn: override.checkedIn }
          : stop;
      });

      // When hideAllPins is true, skip all markers and polylines
      if (!hideAllPins) {
        // Only show visible (unlocked or checked-in) stops when respectStopVisibility is on
        const visibleStops = respectStopVisibility
          ? resolvedStops.filter((s) => s.unlocked || s.checkedIn)
          : resolvedStops;

        // Use visible stops for center/bounds calculation
        const boundsStops = visibleStops.length > 0 ? visibleStops : resolvedStops;

        resolvedStops.forEach((stop, idx) => {
          const isVisible = stop.unlocked || stop.checkedIn;

          // Skip locked stops when respectStopVisibility is on
          if (respectStopVisibility && !isVisible) return;

          const status = stop.checkedIn
            ? "checkedIn"
            : stop.unlocked
              ? "unlocked"
              : "locked";
          const icon = createStopIcon(singleTrail.color, idx + 1, status);
          const marker = L.marker([stop.lat, stop.lng], { icon }).addTo(map);

          const popupContent = `
            <div style="font-family:'Poppins',system-ui,sans-serif;min-width:140px;padding:4px 0;">
              <div style="font-size:13px;font-weight:600;color:#0f172a;margin-bottom:2px;">Stop ${idx + 1}: ${stop.name}</div>
              <div style="font-size:11px;color:#94a3b8;">${stop.address}</div>
            </div>`;
          marker.bindPopup(popupContent, {
            closeButton: false,
            className: "trail-popup",
            maxWidth: 220,
            offset: [0, -4],
          });

          markersRef.current.push(marker);
        });

        // Only draw polylines connecting visible stops
        const visibleCoords = boundsStops.map(
          (s) => [s.lat, s.lng] as [number, number]
        );
        if (visibleCoords.length > 1) {
          const c = getColors(singleTrail.color);
          L.polyline(visibleCoords, {
            color: c.bot,
            weight: 4,
            opacity: 0.1,
            smoothFactor: 1.5,
            lineCap: "round",
            lineJoin: "round",
          }).addTo(map);
          L.polyline(visibleCoords, {
            color: c.bot,
            weight: 2,
            opacity: 0.4,
            dashArray: "5, 8",
            smoothFactor: 1.5,
            lineCap: "round",
          }).addTo(map);
        }

        if (visibleCoords.length > 1) {
          const bounds = L.latLngBounds(visibleCoords);
          map.fitBounds(bounds, { padding: [30, 30], maxZoom: 15 });
        } else if (visibleCoords.length === 1) {
          map.setView(visibleCoords[0], 15);
        }
      } // end hideAllPins guard
    } else {
      displayTrails.forEach((trail) => {
        const icon = createTrailIcon(
          trail.color,
          trail.totalStops,
          selectedTrailId === trail.id,
          trail.tags
        );
        const marker = L.marker([trail.lat, trail.lng], { icon }).addTo(map);

        const popupContent = `
          <div style="font-family:'Poppins',system-ui,sans-serif;min-width:170px;padding:4px 0;">
            <div style="font-size:13px;font-weight:600;color:#0f172a;margin-bottom:2px;">${trail.title}</div>
            <div style="font-size:11px;color:#94a3b8;margin-bottom:6px;">by ${trail.hostHandle}</div>
            <div style="display:flex;gap:10px;font-size:11px;color:#64748b;">
              <span>${trail.totalStops} stops</span>
              <span>${trail.totalDuration}</span>
              <span>\u2605 ${trail.rating}</span>
            </div>
          </div>`;

        marker.bindPopup(popupContent, {
          closeButton: true,
          className: "trail-popup",
          maxWidth: 240,
          offset: [0, -4],
        });

        marker.on("click", () => {
          if (onTrailSelect) onTrailSelect(trail.id);
        });

        markersRef.current.push(marker);
      });

      if (!mini) {
        displayTrails.forEach((trail) => {
          const c = getColors(trail.color);
          const stopCoords = trail.stops.map(
            (s) => [s.lat, s.lng] as [number, number]
          );
          if (stopCoords.length > 1) {
            L.polyline(stopCoords, {
              color: c.bot,
              weight: 4,
              opacity: 0.08,
              smoothFactor: 1.5,
              lineCap: "round",
              lineJoin: "round",
            }).addTo(map);
            L.polyline(stopCoords, {
              color: c.bot,
              weight: 1.5,
              opacity: 0.3,
              dashArray: "5, 8",
              smoothFactor: 1.5,
              lineCap: "round",
            }).addTo(map);
          }
        });
      }

      if (trailIds && displayTrails.length > 1) {
        const coords = displayTrails.map(
          (t) => [t.lat, t.lng] as [number, number]
        );
        const bounds = L.latLngBounds(coords);
        map.fitBounds(bounds, { padding: [40, 40], maxZoom: 14 });
      }
    }

    mapInstanceRef.current = map;

    return () => {
      mountedRef.current = false;
      try {
        map.scrollWheelZoom?.disable();
        map.touchZoom?.disable();
        map.doubleClickZoom?.disable();
        map.boxZoom?.disable();
        map.dragging?.disable();
        map.stop();
        map.off();
        requestAnimationFrame(() => {
          try {
            map.remove();
          } catch (_) {
            /* suppress */
          }
        });
      } catch (_) {
        /* suppress */
      }
      mapInstanceRef.current = null;
      markersRef.current = [];
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!mapInstanceRef.current || !mountedRef.current) return;
    if (singleTrailId) return;
    const allAvailable = trailsData || [...trails, ...getCachedEventbriteTrails()];
    const displayTrails = trailIds
      ? allAvailable.filter((t) => trailIds.includes(t.id))
      : allAvailable;
    markersRef.current.forEach((marker, idx) => {
      const trail = displayTrails[idx];
      if (trail) {
        const icon = createTrailIcon(
          trail.color,
          trail.totalStops,
          selectedTrailId === trail.id,
          trail.tags
        );
        marker.setIcon(icon);
        if (selectedTrailId === trail.id) {
          marker.openPopup();
          mapInstanceRef.current?.panTo([trail.lat, trail.lng], {
            animate: true,
            duration: 0.5,
          });
        }
      }
    });
  }, [selectedTrailId]);

  return (
    <div
      ref={mapRef}
      className={className}
      style={{ width: "100%", height: "100%" }}
    />
  );
}