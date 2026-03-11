import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router";
import { ChevronLeft, MapPin, Users, Upload, Check } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { trails, creators } from "../data/trailData";
import { getCachedEventbriteTrails } from "../data/eventbriteService";
import { useUser } from "../data/userStore";
import { MapPreview } from "./MapPreview";
import confetti from "canvas-confetti";

/* ────────────────── Confetti Burst ────────────────── */

function fireConfettiBurst(canvas: HTMLCanvasElement | null) {
  if (!canvas || typeof canvas.getBoundingClientRect !== "function") {
    return () => {};
  }
  // Verify the canvas is actually in the DOM and has dimensions
  try {
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 && rect.height === 0) {
      return () => {};
    }
  } catch (_) {
    return () => {};
  }

  const myConfetti = confetti.create(canvas, { resize: true, useWorker: false });
  const duration = 4000;
  const end = Date.now() + duration;

  const colors = [
    "#FFC700", "#FF4500", "#FF2D55",
    "#76C525", "#10A933", "#716BFF",
    "#6D62EA", "#5856D6", "#FF9500",
    "#AB0063", "#FFDE56", "#FF1493",
  ];

  // Big initial burst from both sides + center
  // Left cannon
  myConfetti({
    particleCount: 50,
    angle: 60,
    spread: 70,
    origin: { x: 0, y: 0 },
    colors,
    startVelocity: 55,
    gravity: 0.8,
    ticks: 300,
    scalar: 1.1,
    shapes: ["square", "circle"],
    drift: 1,
  });

  // Right cannon
  myConfetti({
    particleCount: 50,
    angle: 120,
    spread: 70,
    origin: { x: 1, y: 0 },
    colors,
    startVelocity: 55,
    gravity: 0.8,
    ticks: 300,
    scalar: 1.1,
    shapes: ["square", "circle"],
    drift: -1,
  });

  // Center shower from top
  myConfetti({
    particleCount: 60,
    angle: 90,
    spread: 120,
    origin: { x: 0.5, y: 0 },
    colors,
    startVelocity: 45,
    gravity: 0.7,
    ticks: 350,
    scalar: 1.2,
    shapes: ["square", "circle"],
  });

  // Sustained bursts from sides — smaller waves over time
  const interval = setInterval(() => {
    if (Date.now() > end) {
      clearInterval(interval);
      return;
    }

    // Left side bursts
    myConfetti({
      particleCount: 15,
      angle: 55,
      spread: 50,
      origin: { x: 0, y: Math.random() * 0.15 },
      colors,
      startVelocity: 35 + Math.random() * 20,
      gravity: 0.9,
      ticks: 250,
      scalar: 0.9,
      shapes: ["square", "circle"],
      drift: 0.5,
    });

    // Right side bursts
    myConfetti({
      particleCount: 15,
      angle: 125,
      spread: 50,
      origin: { x: 1, y: Math.random() * 0.15 },
      colors,
      startVelocity: 35 + Math.random() * 20,
      gravity: 0.9,
      ticks: 250,
      scalar: 0.9,
      shapes: ["square", "circle"],
      drift: -0.5,
    });

    // Occasional center sprinkle
    if (Math.random() > 0.5) {
      myConfetti({
        particleCount: 10,
        angle: 90,
        spread: 160,
        origin: { x: 0.3 + Math.random() * 0.4, y: 0 },
        colors,
        startVelocity: 25 + Math.random() * 15,
        gravity: 1,
        ticks: 200,
        scalar: 0.8,
        shapes: ["square", "circle"],
      });
    }
  }, 350);

  return () => {
    clearInterval(interval);
    myConfetti.reset();
  };
}

/* ────────────────── Component ────────────────── */

export function TrailCompletionPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, completeTrail } = useUser();
  const trail = trails.find((t) => t.id === id) || (user.createdTrails || []).find((t) => t.id === id) || getCachedEventbriteTrails().find((t) => t.id === id) || trails[0];
  const [showContent, setShowContent] = useState(false);
  const [shareSuccess, setShareSuccess] = useState(false);
  const confettiCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Delay confetti slightly to ensure canvas is mounted and has dimensions
    // in the Figma preview iframe
    let cleanupFn: (() => void) | undefined;
    const raf = requestAnimationFrame(() => {
      cleanupFn = fireConfettiBurst(confettiCanvasRef.current);
    });

    setTimeout(() => setShowContent(true), 200);

    if (id && !user.completedTrailIds.includes(id)) {
      completeTrail(id);
    }

    return () => {
      cancelAnimationFrame(raf);
      cleanupFn?.();
    };
  }, []);

  const hostDisplayName = trail.hostHandle.replace(/^@/, "");

  const handleShare = async () => {
    const shareData = {
      title: `I completed ${trail.title}!`,
      text: `Just finished the "${trail.title}" trail on CityUnlock — ${trail.totalStops} stops, ${trail.distance}. Hosted by ${trail.hostHandle}. Come explore!`,
      url: window.location.href,
    };

    try {
      if (navigator.share && navigator.canShare?.(shareData)) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(
          `${shareData.text}\n${shareData.url}`
        );
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 2500);
      }
    } catch {
      try {
        await navigator.clipboard.writeText(
          `${shareData.text}\n${shareData.url}`
        );
        setShareSuccess(true);
        setTimeout(() => setShareSuccess(false), 2500);
      } catch {
        // silent
      }
    }
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage:
          "linear-gradient(173deg, rgb(255, 255, 255) 37%, rgb(146, 190, 255) 48%, rgb(190, 236, 255) 65%, rgb(242, 189, 151) 83%, rgb(255, 222, 222) 92%)",
      }}
    >
      {/* Star pulse keyframe */}
      <style>{`
        @keyframes starPulse {
          0%, 100% { transform: scale(1); text-shadow: 2px 2px 16px rgba(255,149,0,0.65); }
          50% { transform: scale(1.15); text-shadow: 3px 3px 24px rgba(255,149,0,0.9); }
        }
      `}</style>

      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 bg-white rounded-full w-10 h-10 flex items-center justify-center z-30 border border-[#e5e5e5]"
      >
        <ChevronLeft size={20} className="text-[#222]" />
      </button>

      {/* Content */}
      <div
        className={`pt-16 px-4 pb-10 relative z-[5] transition-all duration-700 ${
          showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Avatar with glowing star */}
        <div className="flex justify-center mb-5">
          <div className="relative">
            <div className="w-20 h-20 rounded-full overflow-hidden border-[3px] border-white">
              <ImageWithFallback
                src={user.avatar}
                alt="You"
                className="w-full h-full object-cover"
              />
            </div>
            <span
              className="absolute -top-1.5 -right-2 text-[36px] leading-none pointer-events-none"
              style={{
                animation: "starPulse 2s ease-in-out infinite",
                textShadow: "2px 2px 16px rgba(255,149,0,0.65)",
              }}
            >
              ✨
            </span>
          </div>
        </div>

        {/* Title */}
        <h1
          className="text-center text-[26px] text-[#3a3a3a] leading-[1.1] mb-2 px-6"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            letterSpacing: "-1.5px",
          }}
        >
          You made it to the finish, amazing work.
        </h1>

        {/* Subtitle */}
        <p
          className="text-center text-[14px] text-[#3a3a3a] leading-[1.35] mb-6 px-4"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontWeight: 500,
            letterSpacing: "-0.5px",
          }}
        >
          You've cleared the way forward, the next chapter of your adventure
          begins now.
        </p>

        {/* ─── Trail Summary Card ─── */}
        <div
          className="bg-white rounded-[24px] overflow-hidden mx-auto relative z-[10]"
          style={{ border: "4px solid #dedede" }}
        >
          <div className="p-3">
            {/* Trail Image */}
            <div className="relative h-[209px] rounded-[17px] overflow-hidden">
              <ImageWithFallback
                src={trail.image}
                alt={trail.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent from-[61%] to-[rgba(0,0,0,0.8)] to-[86%]" />
              <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between gap-2">
                <div className="flex-1">
                  <p
                    className="text-white text-[24px] leading-[40px]"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 400,
                      letterSpacing: "-1.5px",
                    }}
                  >
                    {trail.title}
                  </p>
                </div>
                <div className="flex items-center gap-1.5 shrink-0 mb-1">
                  <span
                    className="text-white text-[16px]"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    {trail.price}
                  </span>
                  <MapPin size={18} className="text-white" strokeWidth={1.5} />
                </div>
              </div>
            </div>

            {/* Host Row */}
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 rounded-[13px] overflow-hidden shrink-0">
                  <ImageWithFallback
                    src={trail.hostAvatar}
                    alt={trail.hostHandle}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p
                    className="text-[11px] text-[#7f7f7f] leading-[1.35]"
                    style={{ fontFamily: "'Poppins', sans-serif" }}
                  >
                    Hosted by
                  </p>
                  <p
                    className="text-[14px] text-[#171717] leading-[24px]"
                    style={{
                      fontFamily: "'Poppins', sans-serif",
                      fontWeight: 500,
                      letterSpacing: "-0.31px",
                    }}
                  >
                    @{hostDisplayName}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {trail.groupFriendly && (
                  <div className="bg-blue-50 px-2.5 py-1 rounded-full flex items-center gap-1">
                    <Users size={11} className="text-blue-500" />
                    <span className="text-[10px] font-['Poppins'] font-medium text-blue-600">
                      Group
                    </span>
                  </div>
                )}
                <div className="bg-[#00bc48] rounded-full px-2.5 h-5 flex items-center gap-1">
                  <svg width="8" height="6" viewBox="0 0 9 7" fill="none">
                    <path
                      d="M1 3.5L3.5 6L8 1"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span
                    className="text-[12px] text-white leading-[20px]"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    Completed
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Neighborhood + Vibe */}
          <div className="px-4 pb-2">
            <div className="flex items-center gap-1.5 mb-0.5">
              <MapPin size={11} className="text-gray-400 shrink-0" />
              <span className="text-[11px] font-['Poppins'] text-gray-500 truncate">
                {trail.neighborhood}
              </span>
            </div>
            <p className="text-[11px] font-['Poppins'] italic text-gray-400 leading-[1.35]">
              {trail.vibe}
            </p>
          </div>

          {/* Stats Row — 3 columns */}
          <div className="px-4 pb-3 pt-2 flex items-center justify-between text-center text-[#3a3a3a]">
            <div className="flex-1 flex flex-col items-center gap-1">
              <p
                className="text-[20px] leading-[20px]"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 500,
                  letterSpacing: "-0.4px",
                }}
              >
                58 min
              </p>
              <p
                className="text-[11px] leading-[1.35]"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Duration
              </p>
            </div>
            <div className="flex-1 flex flex-col items-center gap-1">
              <p
                className="text-[20px] leading-[20px]"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 500,
                  letterSpacing: "-0.4px",
                }}
              >
                {trail.distance}
              </p>
              <p
                className="text-[11px] leading-[1.35]"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Distance
              </p>
            </div>
            <div className="flex-1 flex flex-col items-center gap-1">
              <p
                className="text-[20px] leading-[20px]"
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 500,
                  letterSpacing: "-0.4px",
                }}
              >
                +150
              </p>
              <p
                className="text-[11px] leading-[1.35]"
                style={{ fontFamily: "'Poppins', sans-serif" }}
              >
                Points
              </p>
            </div>
          </div>

          {/* Share Button — inside card, functional */}
          <div className="px-4 pb-4">
            <button
              onClick={handleShare}
              className="w-full h-12 rounded-full text-white flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
              style={{
                backgroundImage: shareSuccess
                  ? "linear-gradient(124deg, #00672e 12%, #00bc48 50%, #34d058 101%)"
                  : "linear-gradient(124deg, rgb(0, 5, 30) 12%, rgb(3, 3, 192) 39%, rgb(56, 125, 236) 84%, rgb(133, 200, 255) 101%)",
              }}
            >
              {shareSuccess ? (
                <>
                  <Check size={18} strokeWidth={2.5} />
                  <span
                    className="text-[14px] text-white leading-[24px]"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 600,
                      letterSpacing: "-0.31px",
                    }}
                  >
                    Link Copied!
                  </span>
                </>
              ) : (
                <>
                  <Upload size={18} strokeWidth={2} />
                  <span
                    className="text-[14px] text-white leading-[24px]"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontWeight: 600,
                      letterSpacing: "-0.31px",
                    }}
                  >
                    Share your Journey
                  </span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* ─── Strava-style Completed Route Map ─── */}
        <div className="mt-5 relative z-[10]">
          <div className="flex items-center gap-2 mb-2 px-1">
            <div className="w-5 h-5 rounded-full bg-[#00bc48] flex items-center justify-center">
              <svg width="10" height="8" viewBox="0 0 9 7" fill="none">
                <path
                  d="M1 3.5L3.5 6L8 1"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <p
              className="text-[14px] text-[#3a3a3a]"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontWeight: 600,
                letterSpacing: "-0.31px",
              }}
            >
              Your Completed Route
            </p>
          </div>

          <div className="rounded-[20px] overflow-hidden border-2 border-[#dedede] bg-white">
            <MapPreview
              singleTrailId={trail.id}
              label={`All ${trail.totalStops} stops visited`}
              respectStopVisibility={false}
              navigateTarget={`/trail/${trail.id}`}
            />

            <div className="px-4 py-3 flex items-center justify-between bg-[#fafafa] border-t border-gray-100">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-[#00bc48]" />
                  <span className="text-[11px] font-['Poppins'] text-gray-500">
                    {trail.totalStops} stops
                  </span>
                </div>
                <div className="w-px h-3 bg-gray-200" />
                <span className="text-[11px] font-['Poppins'] text-gray-500">
                  {trail.distance}
                </span>
                <div className="w-px h-3 bg-gray-200" />
                <span className="text-[11px] font-['Poppins'] text-gray-500">
                  {trail.neighborhood}
                </span>
              </div>
              <div className="text-[18px]">🏆</div>
            </div>
          </div>
        </div>

        {/* Secondary Actions */}
        <div className="flex gap-3 mt-5 px-2 relative z-[10]">
          <button
            className="flex-1 py-3 rounded-xl bg-white/80 border border-[#dedede] text-[13px] font-['Poppins'] font-medium text-[#3a3a3a]"
            onClick={() => navigate("/")}
          >
            Discover More
          </button>
          <button
            className="flex-1 py-3 rounded-xl bg-white/80 border border-[#dedede] text-[13px] font-['Poppins'] font-medium text-[#3a3a3a]"
            onClick={() => {
              const creatorId =
                creators.find((c) => c.handle === trail.hostHandle)?.id ||
                "1";
              navigate(`/creator/${creatorId}`);
            }}
          >
            View Creator
          </button>
        </div>
      </div>

      {/* Confetti Canvas */}
      <canvas
        ref={confettiCanvasRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
      />
    </div>
  );
}