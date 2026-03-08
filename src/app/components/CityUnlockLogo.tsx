/**
 * CityUnlock Brand Logo — imported from Figma
 *
 * Pin-shaped "C" with globe detail + "UnlockTrails" wordmark.
 * Supports icon-only, horizontal layout, and two colour variants
 * (onGradient = neon-green on dark/gradient, onLight = original colours on white).
 */

import svgPaths from "../../imports/svg-ktu4ogbuno";

/* ── Icon Mark (the pin with globe) ── */
function LogoMark({ size = 32 }: { size?: number }) {
  const scale = size / 31.256;
  const w = 23 * scale;
  const h = 31.256 * scale;

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 23 31.2564"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={svgPaths.pf5cfb80} fill="#CCFF00" />
      <path d={svgPaths.p97e8e00} fill="url(#logo_pin_grad)" />
      <path d={svgPaths.p44aec00} fill="#CCFF00" />
      <path d={svgPaths.pf1ef000} fill="#CCFF00" />
      <path d={svgPaths.p167cb200} fill="#CCFF00" />
      <path d={svgPaths.pe595730} fill="#CCFF00" />
      <path d={svgPaths.p8e0b980} fill="#CCFF00" />
      <path d={svgPaths.p34a9f980} fill="#CCFF00" />
      <path d={svgPaths.p34098380} fill="#CCFF00" />
      <defs>
        <linearGradient
          id="logo_pin_grad"
          x1="5"
          x2="21.1945"
          y1="10"
          y2="8.8639"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#00051E" />
          <stop offset="0.302885" stopColor="#0303C0" />
          <stop offset="0.802885" stopColor="#387DEC" />
          <stop offset="1" stopColor="#85C8FF" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ── Wordmark ("Unlock" in green, "Trails" in white/dark) ── */
function Wordmark({
  height = 13,
  trailsColor = "white",
}: {
  height?: number;
  trailsColor?: string;
}) {
  const scale = height / 13.044;
  const w = 100.464 * scale;
  const h = 13.044 * scale;

  return (
    <svg
      width={w}
      height={h}
      viewBox="0 0 100.464 13.0436"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* "Unlock" letters — neon green */}
      <path d={svgPaths.p2f2c0f00} fill="#CCFF00" />
      <path d={svgPaths.p2c84ac80} fill="#CCFF00" />
      <path d={svgPaths.p28704bc0} fill="#CCFF00" />
      <path d={svgPaths.p382fde80} fill="#CCFF00" />
      <path d={svgPaths.p18fcbb80} fill="#CCFF00" />
      <path d={svgPaths.p3dc5b100} fill="#CCFF00" />

      {/* "Trails" letters — white or dark */}
      <path d={svgPaths.p12706c80} fill={trailsColor} />
      <path d={svgPaths.pe68f880} fill={trailsColor} />
      <path d={svgPaths.p224f4380} fill={trailsColor} />
      <path d={svgPaths.p24e7e050} fill={trailsColor} />
      <path d={svgPaths.pea74600} fill={trailsColor} />
      <path d={svgPaths.p139a8700} fill={trailsColor} />
    </svg>
  );
}

/* ── Composed Logo ── */
export interface CityUnlockLogoProps {
  /** "icon" = mark only, "horizontal" = mark + wordmark, "stacked" = mark above wordmark */
  layout?: "icon" | "horizontal" | "stacked";
  /** Icon pixel height */
  size?: number;
  /** "onGradient" → white "Trails" text, "onLight" → dark "Trails" text */
  variant?: "onGradient" | "onLight";
  className?: string;
}

export function CityUnlockLogo({
  layout = "horizontal",
  size = 32,
  variant = "onGradient",
  className = "",
}: CityUnlockLogoProps) {
  const trailsColor = variant === "onGradient" ? "#ffffff" : "#1f2937";
  const wordmarkH = Math.round(size * 0.42);

  if (layout === "icon") {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        <LogoMark size={size} />
      </div>
    );
  }

  if (layout === "stacked") {
    return (
      <div className={`inline-flex flex-col items-center gap-1.5 ${className}`}>
        <LogoMark size={size} />
        <Wordmark height={wordmarkH} trailsColor={trailsColor} />
      </div>
    );
  }

  // horizontal (default)
  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark size={size} />
      <Wordmark height={wordmarkH} trailsColor={trailsColor} />
    </div>
  );
}