import { useNavigate, useLocation } from "react-router";
import { Home, Map, Plus, Bell, User } from "lucide-react";
import { useUser } from "../data/userStore";

const navItems = [
  { label: "Home", icon: Home, path: "/" },
  { label: "Explore", icon: Map, path: "/explore" },
  { label: "Create", icon: Plus, path: "/create-trail" },
  { label: "Activity", icon: Bell, path: "/activity" },
  { label: "Profile", icon: User, path: "/profile" },
];

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { unreadCount } = useUser();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50">
      {/* Glassmorphism background */}
      <div className="mx-3 mb-3 rounded-2xl overflow-visible">
        <div
          className="relative border border-gray-100/60"
          style={{
            background: "#ffffff",
            boxShadow:
              "0 -1px 20px rgba(0,0,0,0.05), 0 2px 12px rgba(0,0,0,0.06)",
            borderRadius: "20px",
          }}
        >
          <div className="flex items-end justify-around px-1 pt-2 pb-2 relative">
            {navItems.map((item) => {
              const active = isActive(item.path);
              const isCreate = item.label === "Create";
              const isActivity = item.label === "Activity";

              if (isCreate) {
                return (
                  <button
                    key={item.label}
                    onClick={() => navigate(item.path)}
                    className="relative -mt-5 flex flex-col items-center group"
                  >
                    {/* Subtle ambient glow */}
                    <div
                      className="absolute top-1 left-1/2 -translate-x-1/2 w-[46px] h-[46px] rounded-full blur-lg"
                      style={{
                        background: "linear-gradient(135deg, rgb(0,5,30), rgb(3,3,192))",
                        opacity: 0.15,
                      }}
                    />
                    {/* Circle button — 48px */}
                    <div
                      className="relative w-[48px] h-[48px] rounded-full flex items-center justify-center transition-transform duration-150 group-active:scale-[0.93]"
                      style={{
                        background:
                          "linear-gradient(145deg, rgb(0, 5, 30) 0%, rgb(3, 3, 192) 45%, rgb(56, 125, 236) 85%, rgb(133, 200, 255) 100%)",
                        boxShadow:
                          "0 2px 8px rgba(3,3,192,0.18)",
                      }}
                    >
                      {/* Glossy inner highlight */}
                      <div
                        className="absolute inset-[1px] rounded-full pointer-events-none"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(255,255,255,0.20) 0%, transparent 45%)",
                        }}
                      />
                      <Plus
                        size={21}
                        className="text-white relative"
                        strokeWidth={2.5}
                      />
                    </div>
                    <span
                      className="text-[10px] font-['Poppins'] mt-0.5"
                      style={{ color: "#9ca3af", fontWeight: 500 }}
                    >
                      Create
                    </span>
                  </button>
                );
              }

              return (
                <button
                  key={item.label}
                  onClick={() => navigate(item.path)}
                  className="relative flex flex-col items-center min-w-[52px] transition-colors duration-200 active:scale-95"
                >
                  {/* Icon — fixed height container to prevent layout shift */}
                  <div className="relative flex items-center justify-center w-9 h-6">
                    <item.icon
                      size={20}
                      className="relative flex-shrink-0"
                      style={{
                        color: active ? "#3148C2" : "#8b8fa3",
                        strokeWidth: active ? 2 : 1.6,
                        transition: "color 0.2s ease, stroke-width 0.2s ease",
                      }}
                    />
                    {/* Notification badge */}
                    {isActivity && unreadCount > 0 && (
                      <div
                        className="absolute rounded-full flex items-center justify-center"
                        style={{
                          top: -5,
                          right: -4,
                          minWidth: 16,
                          height: 16,
                          padding: "0 4px",
                          background:
                            "linear-gradient(135deg, #ef4444 0%, #f97316 100%)",
                          boxShadow:
                            "0 2px 6px rgba(239,68,68,0.35), 0 0 0 2px white",
                          zIndex: 10,
                        }}
                      >
                        <span className="text-white text-[9px] font-bold leading-none">
                          {unreadCount > 9 ? "9+" : unreadCount}
                        </span>
                      </div>
                    )}
                  </div>
                  {/* Label */}
                  <span
                    className="text-[10px] font-['Poppins'] mt-0"
                    style={{
                      color: active ? "#3148C2" : "#8b8fa3",
                      fontWeight: active ? 600 : 500,
                      transition: "color 0.2s ease",
                    }}
                  >
                    {item.label}
                  </span>
                  {/* Minimal dot indicator — fixed height container to prevent layout shift */}
                  <div className="h-[6px] flex items-center justify-center">
                    <div
                      className="rounded-full"
                      style={{
                        width: 4,
                        height: 4,
                        background: active
                          ? "linear-gradient(135deg, #3148C2, #4961DC)"
                          : "transparent",
                        opacity: active ? 1 : 0,
                        transition: "opacity 0.25s ease, background 0.25s ease",
                      }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}