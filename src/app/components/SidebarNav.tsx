import { useNavigate, useLocation } from "react-router";
import {
  Home,
  Search,
  PlusCircle,
  Bell,
  User,
  MapPin,
  Compass,
  TrendingUp,
  Settings,
} from "lucide-react";
import { useUser } from "../data/userStore";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const mainNav = [
  { label: "Home", icon: Home, path: "/" },
  { label: "Search", icon: Search, path: "/search" },
  { label: "Create Trail", icon: PlusCircle, path: "/create-trail" },
  { label: "Activity", icon: Bell, path: "/activity" },
  { label: "Profile", icon: User, path: "/profile" },
];

const secondaryNav = [
  { label: "Trending", icon: TrendingUp, path: "/" },
  { label: "Near Me", icon: MapPin, path: "/" },
  { label: "Settings", icon: Settings, path: "/profile" },
];

export function SidebarNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, unreadCount } = useUser();

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <aside className="w-[260px] h-screen sticky top-0 bg-white border-r border-gray-100 flex flex-col py-6 px-4 shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-3 mb-8">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center"
          style={{
            backgroundImage:
              "linear-gradient(102deg, rgb(0, 5, 30) 12%, rgb(3, 3, 192) 39%, rgb(56, 125, 236) 84%, rgb(133, 200, 255) 101%)",
          }}
        >
          <Compass size={20} className="text-white" />
        </div>
        <span className="font-['Poppins'] text-[18px] font-semibold text-gray-900">
          Trailblaze
        </span>
      </div>

      {/* Main Navigation */}
      <div className="flex flex-col gap-1 mb-6">
        {mainNav.map((item) => {
          const active = isActive(item.path);
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all text-left w-full ${
                active
                  ? "bg-blue-50 text-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <div className="relative">
                <item.icon
                  size={20}
                  strokeWidth={active ? 2.5 : 1.8}
                />
                {item.label === "Activity" && unreadCount > 0 && (
                  <div className="absolute -top-1 -right-1.5 w-3.5 h-3.5 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-[8px] font-semibold">
                      {unreadCount}
                    </span>
                  </div>
                )}
              </div>
              <span className="font-['Poppins'] text-[14px] font-medium">
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-100 mx-3 mb-4" />

      {/* Secondary Nav */}
      <div className="flex flex-col gap-1 mb-auto">
        {secondaryNav.map((item) => (
          <button
            key={item.label}
            onClick={() => navigate(item.path)}
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-gray-500 hover:bg-gray-50 transition-all text-left w-full"
          >
            <item.icon size={18} strokeWidth={1.8} />
            <span className="font-['Poppins'] text-[13px]">{item.label}</span>
          </button>
        ))}
      </div>

      {/* User Card */}
      <div
        className="flex items-center gap-3 px-3 py-3 rounded-xl bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
        onClick={() => navigate("/profile")}
      >
        <div className="w-9 h-9 rounded-full overflow-hidden border border-gray-200 shrink-0">
          <ImageWithFallback
            src={user.avatar}
            alt={user.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-['Poppins'] text-[13px] font-medium text-gray-800 truncate">
            {user.name || "Explorer"}
          </p>
          <p className="font-['Poppins'] text-[11px] text-gray-400 truncate">
            {user.handle ? `@${user.handle}` : "@explorer"}
          </p>
        </div>
      </div>
    </aside>
  );
}