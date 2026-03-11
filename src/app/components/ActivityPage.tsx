import { useState } from "react";
import { useNavigate } from "react-router";
import {
  ChevronLeft,
  Bell,
  Users,
  Trophy,
  Heart,
  MessageCircle,
  MapPin,
  CheckCircle2,
  Flame,
  Award,
  Check,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useUser } from "../data/userStore";

const activityTabs = ["Notifications", "Activity"];

export function ActivityPage() {
  const navigate = useNavigate();
  const { user, markNotificationRead, markAllNotificationsRead, unreadCount } =
    useUser();
  const [activeTab, setActiveTab] = useState("Notifications");

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "join":
        return <Users size={14} className="text-gray-400" />;
      case "complete":
        return <Trophy size={14} className="text-gray-400" />;
      case "follow":
        return <Users size={14} className="text-gray-400" />;
      case "like":
        return <Heart size={14} className="text-gray-400" />;
      case "comment":
        return <MessageCircle size={14} className="text-gray-400" />;
      case "cancellation":
        return <Bell size={14} className="text-red-400" />;
      default:
        return <Bell size={14} className="text-gray-400" />;
    }
  };

  const getActivityIcon = (type: string) => {
    const config: Record<string, { icon: typeof MapPin; bg: string; fg: string }> = {
      joined: { icon: MapPin, bg: "bg-blue-50", fg: "text-blue-400" },
      completed: { icon: CheckCircle2, bg: "bg-emerald-50", fg: "text-emerald-400" },
      created: { icon: MapPin, bg: "bg-violet-50", fg: "text-violet-400" },
      checkin: { icon: Check, bg: "bg-amber-50", fg: "text-amber-400" },
      badge: { icon: Award, bg: "bg-rose-50", fg: "text-rose-400" },
      cancelled: { icon: MapPin, bg: "bg-red-50", fg: "text-red-400" },
    };
    const c = config[type] || { icon: Bell, bg: "bg-gray-100", fg: "text-gray-400" };
    const Icon = c.icon;
    return (
      <div className={`w-9 h-9 rounded-xl ${c.bg} flex items-center justify-center shrink-0`}>
        <Icon size={15} className={c.fg} />
      </div>
    );
  };

  const getActivityLabel = (type: string) => {
    switch (type) {
      case "joined":
        return "Joined";
      case "completed":
        return "Completed";
      case "created":
        return "Created";
      case "checkin":
        return "Checked in at";
      case "badge":
        return "Earned";
      case "cancelled":
        return "Cancelled";
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-white pb-28 lg:pb-12 relative overflow-hidden">
      {/* ── Gradient Header ── */}
      <div
        className="relative px-4 lg:px-8 pt-4 pb-10"
        style={{
          backgroundImage:
            "linear-gradient(126.8deg, rgb(146, 190, 255) 0%, rgb(190, 236, 255) 24%, rgb(242, 189, 151) 55%, rgb(255, 222, 222) 100%)",
        }}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between mb-4 lg:max-w-4xl lg:mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="bg-[rgba(30,30,30,0.4)] border border-[rgba(255,255,255,0.6)] rounded-full p-2 active:scale-95 transition-transform"
          >
            <ChevronLeft size={18} className="text-white" />
          </button>
          <h2 className="font-['Poppins'] text-[16px] font-semibold text-gray-900">
            Activity
          </h2>
          {unreadCount > 0 ? (
            <button
              onClick={markAllNotificationsRead}
              className="bg-[rgba(30,30,30,0.4)] border border-[rgba(255,255,255,0.6)] rounded-full px-3 py-1.5 text-[11px] font-['Poppins'] font-medium text-white active:scale-95 transition-transform"
            >
              Mark read
            </button>
          ) : (
            <div className="w-[72px]" />
          )}
        </div>

        {/* Stats row — colored icons for personality */}
        <div className="flex items-center justify-around backdrop-blur-md bg-[rgba(255,255,255,0.55)] border border-[rgba(255,255,255,0.7)] rounded-2xl px-3 py-3 lg:max-w-4xl lg:mx-auto">
          {/* Streak */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[rgba(255,120,50,0.15)] flex items-center justify-center">
              <Flame size={16} className="text-orange-500" />
            </div>
            <div className="flex flex-col">
              <span className="font-['Poppins'] text-[16px] font-semibold text-gray-900 leading-tight">
                {user.streak}d
              </span>
              <span className="font-['Poppins'] text-[10px] text-gray-500">
                Streak
              </span>
            </div>
          </div>

          <div className="w-px h-8 bg-[rgba(0,0,0,0.08)]" />

          {/* Points */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[rgba(245,180,50,0.15)] flex items-center justify-center">
              <Trophy size={16} className="text-amber-500" />
            </div>
            <div className="flex flex-col">
              <span className="font-['Poppins'] text-[16px] font-semibold text-gray-900 leading-tight">
                {user.points}
              </span>
              <span className="font-['Poppins'] text-[10px] text-gray-500">
                Points
              </span>
            </div>
          </div>

          <div className="w-px h-8 bg-[rgba(0,0,0,0.08)]" />

          {/* Done */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[rgba(16,185,129,0.15)] flex items-center justify-center">
              <CheckCircle2 size={16} className="text-emerald-500" />
            </div>
            <div className="flex flex-col">
              <span className="font-['Poppins'] text-[16px] font-semibold text-gray-900 leading-tight">
                {user.trailsCompleted}
              </span>
              <span className="font-['Poppins'] text-[10px] text-gray-500">
                Done
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── White content area — overlaps gradient ── */}
      <div className="relative -mt-4 bg-white rounded-t-[24px] z-10 px-4 lg:px-8 pt-5">
        <div className="lg:max-w-4xl lg:mx-auto">
        {/* Tab toggle */}
        <div className="flex gap-0.5 bg-[#ECEDF2] rounded-full p-1 mb-4">
          {activityTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-2 rounded-full text-[12px] font-['Poppins'] font-medium transition-all flex items-center justify-center gap-1.5 ${
                activeTab === tab
                  ? "bg-white text-gray-900"
                  : "text-gray-400"
              }`}
            >
              {tab}
              {tab === "Notifications" && unreadCount > 0 && (
                <span className="min-w-[16px] h-4 bg-gray-900 rounded-full text-white text-[9px] flex items-center justify-center font-semibold px-1">
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── Notifications Tab ── */}
        {activeTab === "Notifications" && (
          <div className="flex flex-col gap-1.5">
            {user.notifications.length === 0 && (
              <div className="py-12 text-center">
                <div className="w-12 h-12 rounded-full bg-[#ECEDF2] flex items-center justify-center mx-auto mb-3">
                  <Bell size={20} className="text-gray-400" />
                </div>
                <p className="font-['Poppins'] text-[13px] font-medium text-gray-800">
                  No notifications yet
                </p>
                <p className="font-['Poppins'] text-[12px] text-gray-400 mt-1">
                  You'll see updates from your trails here
                </p>
              </div>
            )}
            {user.notifications.map((notification) => (
              <div
                key={notification.id}
                onClick={() => markNotificationRead(notification.id)}
                className={`flex items-start gap-2.5 p-3 rounded-2xl border cursor-pointer transition-all ${
                  notification.read
                    ? "bg-white border-gray-100"
                    : "bg-[#F8F8FB] border-gray-200"
                }`}
              >
                {notification.avatar ? (
                  <div className="w-9 h-9 rounded-full overflow-hidden shrink-0 border border-gray-200">
                    <ImageWithFallback
                      src={notification.avatar}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-9 h-9 rounded-full bg-[#ECEDF2] flex items-center justify-center shrink-0">
                    {getNotificationIcon(notification.type)}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p
                    className={`font-['Poppins'] text-[12px] leading-snug ${
                      notification.read
                        ? "text-gray-600"
                        : "text-gray-900 font-medium"
                    }`}
                  >
                    {notification.message}
                  </p>
                  {notification.cancellationReason && (
                    <p className="font-['Poppins'] text-[11px] text-gray-400 mt-1 italic leading-snug">
                      &ldquo;{notification.cancellationReason}&rdquo;
                    </p>
                  )}
                  <p className="font-['Poppins'] text-[10px] text-gray-400 mt-1">
                    {notification.time}
                  </p>
                </div>
                {!notification.read && (
                  <div className="w-2 h-2 bg-gray-900 rounded-full shrink-0 mt-1.5" />
                )}
              </div>
            ))}
          </div>
        )}

        {/* ── Activity Log Tab ── */}
        {activeTab === "Activity" && (
          <div className="flex flex-col">
            {user.activityLog.length === 0 && (
              <div className="py-12 text-center">
                <div className="w-12 h-12 rounded-full bg-[#ECEDF2] flex items-center justify-center mx-auto mb-3">
                  <MapPin size={20} className="text-gray-400" />
                </div>
                <p className="font-['Poppins'] text-[13px] font-medium text-gray-800">
                  No activity yet
                </p>
                <p className="font-['Poppins'] text-[12px] text-gray-400 mt-1">
                  Start exploring trails to see your history
                </p>
              </div>
            )}
            {user.activityLog.map((activity, idx) => (
              <div
                key={activity.id}
                className={`flex items-center gap-3 py-3 ${
                  idx < user.activityLog.length - 1
                    ? "border-b border-gray-100"
                    : ""
                }`}
              >
                {getActivityIcon(activity.type)}
                <div className="flex-1 min-w-0">
                  <p className="font-['Poppins'] text-[12px] text-gray-900 truncate">
                    <span className="text-gray-500">
                      {getActivityLabel(activity.type)}
                    </span>{" "}
                    <span className="font-medium">{activity.trailName}</span>
                  </p>
                  <p className="font-['Poppins'] text-[10px] text-gray-400 mt-0.5">
                    {activity.time}
                  </p>
                </div>
                {activity.points && (
                  <span className="font-['Poppins'] text-[12px] font-semibold text-emerald-600 bg-emerald-50 rounded-full px-2.5 py-0.5 shrink-0">
                    +{activity.points}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
        </div>
      </div>
    </div>
  );
}