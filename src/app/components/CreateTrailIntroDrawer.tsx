import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { MapPin, Sparkles, Users } from "lucide-react";

interface CreateTrailIntroDrawerProps {
  open: boolean;
  onClose: () => void;
  followers: number;
  userName: string;
  userAvatar: string;
}

function getCreatorTier(followers: number) {
  if (followers >= 500) {
    return { tier: "Featured Creator", emoji: "👑", label: "Your trails get featured & promoted" };
  }
  if (followers >= 50) {
    return { tier: "Rising Creator", emoji: "🚀", label: "Create public trails for everyone" };
  }
  return { tier: "Explorer", emoji: "✨", label: "Create & share trails with friends" };
}

export function CreateTrailIntroDrawer({
  open,
  onClose,
  followers,
  userName,
  userAvatar,
}: CreateTrailIntroDrawerProps) {
  const navigate = useNavigate();
  const [animating, setAnimating] = useState(false);
  const [visible, setVisible] = useState(false);

  const tierInfo = getCreatorTier(followers);

  useEffect(() => {
    if (open) {
      setVisible(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimating(true));
      });
    } else {
      setAnimating(false);
      const timer = setTimeout(() => setVisible(false), 350);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const handleClose = useCallback(() => {
    setAnimating(false);
    setTimeout(() => onClose(), 320);
  }, [onClose]);

  const handleCreateTrail = useCallback(() => {
    // Navigate immediately — the route change unmounts the drawer naturally
    navigate("/create-trail");
    onClose();
  }, [navigate, onClose]);

  if (!visible) return null;

  const firstName = userName ? userName.split(" ")[0] : "";

  return (
    <div className="fixed inset-0 z-[9999] flex items-end lg:items-center justify-center">
      {/* Backdrop — tap to dismiss */}
      <div
        className={`absolute inset-0 transition-opacity duration-300 ${
          animating ? "bg-black/40" : "bg-black/0 pointer-events-none"
        }`}
        onClick={handleClose}
      />

      {/* Drawer */}
      <div
        className={`relative w-full max-w-[430px] lg:max-w-[480px] bg-white rounded-t-[24px] lg:rounded-[24px] transition-transform duration-[350ms] ease-[cubic-bezier(0.32,0.72,0,1)] ${
          animating ? "translate-y-0" : "translate-y-full"
        }`}
      >
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-9 h-[3.5px] rounded-full bg-gray-300" />
        </div>

        {/* Content */}
        <div className="px-5 pb-7">
          {/* Gradient banner */}
          <div
            className="rounded-2xl p-4 mb-4"
            style={{
              backgroundImage:
                "linear-gradient(126.8deg, rgb(146, 190, 255) 0%, rgb(190, 236, 255) 24%, rgb(242, 189, 151) 55%, rgb(255, 222, 222) 100%)",
            }}
          >
            <div className="flex items-center gap-2.5 mb-2.5">
              {userAvatar && (
                <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-white/80 shrink-0">
                  <ImageWithFallback
                    src={userAvatar}
                    alt={userName}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div>
                <p className="text-[13px] font-['Poppins'] font-semibold text-gray-900 leading-tight">
                  {firstName ? `${firstName}, start your trail` : "Start your trail"} 🎉
                </p>
                <p className="text-[12px] font-['Poppins'] text-gray-700/80 leading-tight mt-0.5">
                  {tierInfo.emoji} {tierInfo.tier} · {followers} followers
                </p>
              </div>
            </div>
            <p className="text-[12px] font-['Poppins'] text-gray-800 leading-relaxed">
              Turn your city knowledge into a trail others can explore — pin your spots, tell the story, and let people walk your world.
            </p>
          </div>

          {/* 3 compact steps */}
          <div className="flex gap-2.5 mb-4">
            {[
              { icon: MapPin, label: "Pin spots", sub: "Cafés, murals, gems" },
              { icon: Sparkles, label: "Set the vibe", sub: "Photos & your story" },
              { icon: Users, label: "Share it", sub: "Earn as they explore" },
            ].map((step, i) => (
              <div
                key={i}
                className="flex-1 rounded-xl border border-gray-100 bg-gray-50/60 px-2.5 py-3 flex flex-col items-center text-center gap-1.5"
              >
                <step.icon size={16} className="text-gray-400" />
                <p className="text-[12px] font-['Poppins'] font-semibold text-gray-900 leading-tight">
                  {step.label}
                </p>
                <p className="text-[12px] font-['Poppins'] text-gray-500 leading-tight">
                  {step.sub}
                </p>
              </div>
            ))}
          </div>

          {/* Creator eligibility stats — external platform metrics */}
          <div className="flex items-center justify-between rounded-xl border border-gray-100 bg-gray-50/50 px-4 py-3 mb-4">
            {[
              { value: followers >= 1000 ? `${(followers / 1000).toFixed(1)}k` : `${followers}`, label: "Followers" },
              { value: followers >= 1000 ? `${((followers * 3.2) / 1000).toFixed(1)}k` : `${Math.round(followers * 3.2)}`, label: "Reach" },
              { value: `${Math.min(((followers / 100) * 2.1 + 1.2), 9.8).toFixed(1)}%`, label: "Engagement" },
            ].map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-0">
                <div className="text-center px-2">
                  <p className="text-[14px] font-['Poppins'] font-semibold text-gray-900 leading-tight">
                    {stat.value}
                  </p>
                  <p className="text-[12px] font-['Poppins'] text-gray-500 leading-tight mt-0.5">
                    {stat.label}
                  </p>
                </div>
                {i < 2 && <div className="w-px h-7 bg-gray-200 ml-2" />}
              </div>
            ))}
          </div>

          {/* Tier perk — single line */}
          <div className="flex items-center gap-2 mb-4 px-1">
            <span className="text-[13px] leading-none">{tierInfo.emoji}</span>
            <p className="text-[12px] font-['Poppins'] text-gray-500">
              {tierInfo.label}
            </p>
          </div>

          {/* CTA Button */}
          <button
            onClick={handleCreateTrail}
            className="w-full py-3.5 rounded-full text-white font-['Poppins'] text-[14px] font-semibold flex items-center justify-center gap-1.5 active:scale-[0.97] transition-transform"
            style={{
              backgroundImage:
                "linear-gradient(102deg, rgb(0, 5, 30) 12%, rgb(3, 3, 192) 39%, rgb(56, 125, 236) 84%, rgb(133, 200, 255) 101%)",
            }}
          >
            Create a Trail
          </button>

          {/* Skip */}
          <button
            onClick={handleClose}
            className="w-full mt-2 text-center text-[12px] font-['Poppins'] text-gray-400 py-1"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}