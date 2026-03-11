import React, { createContext, useContext, useState, useEffect, type ReactNode } from "react";

import type { Trail } from "./trailData";
import type { InstagramProfile } from "./instagramService";
import { DEFAULT_CITY } from "./cities";

export interface UserProfile {
  name: string;
  handle: string;
  avatar: string;
  bio: string;
  interests: string[];
  onboarded: boolean;
  isLoggedIn: boolean;
  email: string;
  emailVerified: boolean;
  instagramHandle: string;
  instagramData: InstagramProfile | null;
  trailsJoined: number;
  trailsCompleted: number;
  trailsCreated: number;
  points: number;
  followers: number;
  following: number;
  streak: number;
  joinedTrailIds: string[];
  completedTrailIds: string[];
  bookmarkedTrailIds: string[];
  notifications: TrailNotification[];
  activityLog: ActivityItem[];
  /** Maps trailId → array of checked-in stop IDs for real-time sync */
  checkedInStops: Record<string, number[]>;
  /** User-created trails stored locally */
  createdTrails: Trail[];
  /** Currently selected city ID */
  selectedCityId: string;
}

export interface TrailNotification {
  id: string;
  type: "join" | "complete" | "follow" | "like" | "comment" | "cancellation";
  message: string;
  time: string;
  read: boolean;
  avatar?: string;
  /** Optional cancellation reason from the creator */
  cancellationReason?: string;
}

export interface ActivityItem {
  id: string;
  type: "joined" | "completed" | "created" | "checkin" | "badge" | "cancelled";
  trailId?: string;
  trailName: string;
  time: string;
  points?: number;
}

const defaultNotifications: TrailNotification[] = [
  {
    id: "n1",
    type: "join",
    message: "Sam just joined your Coffee & Comics Trail",
    time: "2 min ago",
    read: false,
    avatar: "https://images.unsplash.com/photo-1653146886876-101e36a3cf90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbiUyMGhpcHN0ZXIlMjBwb3J0cmFpdCUyMGlsbGFzdGV8ZW58MXx8fHwxNzcxNDk5NzQxfDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "n2",
    type: "like",
    message: "Lorina liked your trail review",
    time: "15 min ago",
    read: false,
    avatar: "https://images.unsplash.com/photo-1589800887183-e22983ea361c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHdvbWFuJTIwY3JlYXRpdmUlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzEzOTE2NTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "n3",
    type: "complete",
    message: "Tejas completed Street Art & Skates trail",
    time: "1 hr ago",
    read: true,
    avatar: "https://images.unsplash.com/photo-1692571825592-f1618a10ab77?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMG1hbiUyMHRyYXZlbCUyMGV4cGxvcmVyJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzcxNDk5NzQyfDA&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: "n4",
    type: "follow",
    message: "You have 3 new followers this week",
    time: "3 hrs ago",
    read: true,
  },
  {
    id: "n5",
    type: "comment",
    message: "New comment on Urban Art Experience",
    time: "Yesterday",
    read: true,
    avatar: "https://images.unsplash.com/photo-1589800887183-e22983ea361c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHdvbWFuJTIwY3JlYXRpdmUlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NzEzOTE2NTF8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

const defaultActivity: ActivityItem[] = [
  { id: "a1", type: "joined", trailId: "1", trailName: "Coffee & Comics Trail", time: "Today", points: 10 },
  { id: "a2", type: "checkin", trailId: "1", trailName: "Bluestone Lane Coffee", time: "Today", points: 25 },
  { id: "a3", type: "completed", trailId: "2", trailName: "Urban Art Experience", time: "Yesterday", points: 150 },
  { id: "a4", type: "badge", trailName: "First Explorer Badge", time: "2 days ago", points: 50 },
  { id: "a5", type: "created", trailId: "3", trailName: "My Custom Trail", time: "3 days ago", points: 30 },
];

const AVATAR_VERSION = "v3-white-male";
const DATA_VERSION = "v2-with-created-trail";

const dummyCreatedTrail: Trail = {
  id: "my-created-1",
  title: "Silver Lake Vibes: Books, Beats & Bites",
  image: "https://images.unsplash.com/photo-1592188714153-1530336bf3e2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxTaWx2ZXIlMjBMYWtlJTIwTG9zJTIwQW5nZWxlcyUyMGNyZWF0aXZlJTIwbmVpZ2hib3Job29kJTIwc2hvcHN8ZW58MXx8fHwxNzczMjI1NTI4fDA&ixlib=rb-4.1.0&q=80&w=1080",
  date: "22 Mar 2026",
  duration: "~2 hrs",
  price: "$$",
  hostName: "Explorer",
  hostHandle: "@explorer",
  hostAvatar: "https://images.unsplash.com/photo-1731010623716-a9fb834eb690?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMG1hbiUyMHBvcnRyYWl0JTIwaGVhZHNob3QlMjBzbWlsZXxlbnwxfHx8fDE3NzIyODA3NDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
  hostFollowers: "42",
  hostBio: "LA local sharing my favorite neighborhood spots",
  description: "My personal Silver Lake micro-trail hitting the best indie bookstore-cafe, a legendary vinyl shop, a ramen spot the locals swear by, and ending with golden hour views from a rooftop. Perfect for a chill Saturday.",
  totalStops: 4,
  totalDuration: "2 hrs",
  distance: "1.2 mi",
  joined: 7,
  rating: 4.6,
  views: 89,
  status: "live",
  lat: 34.0869,
  lng: -118.2627,
  color: "#8B5CF6",
  tags: ["coffee", "food", "music", "photo"],
  meta: ["Walkable", "Instagrammable", "Under $30"],
  neighborhood: "Silver Lake",
  vibe: "Chill weekend vibes",
  bestTimeOfDay: "Afternoon",
  groupFriendly: true,
  source: "created",
  cityId: "los-angeles",
  stops: [
    {
      id: 1,
      name: "Stories Books & Cafe",
      address: "1716 Sunset Blvd, Silver Lake",
      image: "https://images.unsplash.com/photo-1758610605872-3195caed0bdd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3p5JTIwYm9va3N0b3JlJTIwY2FmZSUyMHJlYWRpbmclMjBjb3JuZXIlMjB3YXJtJTIwbGlnaHR8ZW58MXx8fHwxNzczMjI1NTMyfDA&ixlib=rb-4.1.0&q=80&w=1080",
      unlocked: true,
      checkedIn: false,
      lat: 34.0777,
      lng: -118.2588,
      teaser: "A book-lover's paradise with a hidden back patio cafe",
    },
    {
      id: 2,
      name: "Vacation Vinyl",
      address: "3815 Sunset Blvd, Silver Lake",
      image: "https://images.unsplash.com/photo-1638461804896-a66906dafc95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxMb3MlMjBBbmdlbGVzJTIwdmludGFnZSUyMHZpbnlsJTIwcmVjb3JkJTIwc2hvcCUyMGluZGllfGVufDF8fHx8MTc3MzIyNTUyN3ww&ixlib=rb-4.1.0&q=80&w=1080",
      unlocked: true,
      checkedIn: false,
      lat: 34.0871,
      lng: -118.2715,
      teaser: "Dig through crates of rare vinyl in this iconic Silver Lake shop",
    },
    {
      id: 3,
      name: "Silverlake Ramen",
      address: "2927 Sunset Blvd, Silver Lake",
      image: "https://images.unsplash.com/photo-1580007245793-7590f9b81266?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxMb3MlMjBBbmdlbGVzJTIwY3JhZnQlMjByYW1lbiUyMG5vb2RsZSUyMGJhciUyMHJlc3RhdXJhbnR8ZW58MXx8fHwxNzczMjI1NTI4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      unlocked: true,
      checkedIn: false,
      lat: 34.0831,
      lng: -118.2671,
      teaser: "The tonkotsu here is legendary. Locals-only spot, no tourist crowds",
    },
    {
      id: 4,
      name: "The Rooftop at Sunset Junction",
      address: "3650 Sunset Blvd, Silver Lake",
      image: "https://images.unsplash.com/photo-1572798527927-bc0f67322f15?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxMb3MlMjBBbmdlbGVzJTIwcm9vZnRvcCUyMHN1bnNldCUyMGNpdHklMjB2aWV3fGVufDF8fHx8MTc3MzIyNTUyOHww&ixlib=rb-4.1.0&q=80&w=1080",
      unlocked: true,
      checkedIn: false,
      lat: 34.0863,
      lng: -118.2619,
      teaser: "End with the best sunset in Silver Lake. Golden hour cocktails are a must",
    },
  ],
};

const defaultProfile: UserProfile = {
  name: "",
  handle: "",
  avatar: "https://images.unsplash.com/photo-1731010623716-a9fb834eb690?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGl0ZSUyMG1hbiUyMHBvcnRyYWl0JTIwaGVhZHNob3QlMjBzbWlsZXxlbnwxfHx8fDE3NzIyODA3NDh8MA&ixlib=rb-4.1.0&q=80&w=1080",
  bio: "",
  interests: [],
  onboarded: false,
  isLoggedIn: false,
  email: "",
  emailVerified: false,
  instagramHandle: "",
  instagramData: null,
  trailsJoined: 0,
  trailsCompleted: 0,
  trailsCreated: 1,
  points: 265,
  followers: 42,
  following: 18,
  streak: 5,
  joinedTrailIds: [],
  completedTrailIds: [],
  bookmarkedTrailIds: [],
  notifications: defaultNotifications,
  activityLog: defaultActivity,
  checkedInStops: {},
  createdTrails: [dummyCreatedTrail],
  selectedCityId: DEFAULT_CITY.id,
};

interface UserContextType {
  user: UserProfile;
  updateUser: (updates: Partial<UserProfile>) => void;
  signup: (email: string, password: string) => { success: boolean; error?: string };
  login: (email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
  completeOnboarding: (data: { name: string; handle: string; bio: string; interests: string[] }) => void;
  joinTrail: (trailId: string) => void;
  completeTrail: (trailId: string) => void;
  bookmarkTrail: (trailId: string) => void;
  checkInStop: (trailId: string, stopId: number) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  createTrail: (trail: Trail) => void;
  updateCreatedTrail: (trailId: string, updates: Partial<Trail>) => void;
  deleteCreatedTrail: (trailId: string, reason?: string) => void;
  unreadCount: number;
}

// Persist context across HMR to prevent "useUser must be used within UserProvider" errors
// When Vite HMR re-executes this module, createContext() would create a NEW context object,
// but the already-mounted UserProvider still provides the OLD one. This globalThis trick
// ensures the same context object is reused across HMR updates.
const CTX_KEY = '__CITYUNLOCK_USER_CTX__';
const UserContext: React.Context<UserContextType | null> =
  (globalThis as any)[CTX_KEY] ||
  ((globalThis as any)[CTX_KEY] = createContext<UserContextType | null>(null));

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem("trailUser");
      const savedAvatarVer = localStorage.getItem("trailUser_avatarVer");
      const savedDataVer = localStorage.getItem("trailUser_dataVer");
      if (saved) {
        const parsed = JSON.parse(saved);
        const needsAvatarReset = savedAvatarVer !== AVATAR_VERSION;
        const needsDataRefresh = savedDataVer !== DATA_VERSION;
        if (needsAvatarReset) {
          localStorage.setItem("trailUser_avatarVer", AVATAR_VERSION);
        }
        if (needsDataRefresh) {
          localStorage.setItem("trailUser_dataVer", DATA_VERSION);
          // Inject dummy created trail if not present
          const createdTrails = parsed.createdTrails || [];
          const hasDummy = createdTrails.some((t: Trail) => t.id === "my-created-1");
          if (!hasDummy) {
            parsed.createdTrails = [dummyCreatedTrail, ...createdTrails];
            parsed.trailsCreated = (parsed.trailsCreated || 0) + 1;
          }
        }
        return { ...defaultProfile, ...parsed, ...(needsAvatarReset ? { avatar: defaultProfile.avatar } : {}) };
      }
    } catch {}
    localStorage.setItem("trailUser_avatarVer", AVATAR_VERSION);
    localStorage.setItem("trailUser_dataVer", DATA_VERSION);
    return defaultProfile;
  });

  useEffect(() => {
    localStorage.setItem("trailUser", JSON.stringify(user));
  }, [user]);

  const updateUser = (updates: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updates }));
  };

  const signup = (email: string, password: string) => {
    // Simulate a signup process
    if (email && password) {
      setUser((prev) => ({
        ...prev,
        email,
        isLoggedIn: true,
      }));
      return { success: true };
    }
    return { success: false, error: "Invalid email or password" };
  };

  const login = (email: string, password: string) => {
    // Simulate a login process
    if (email && password) {
      setUser((prev) => ({
        ...prev,
        email,
        isLoggedIn: true,
      }));
      return { success: true };
    }
    return { success: false, error: "Invalid email or password" };
  };

  const logout = () => {
    setUser((prev) => ({
      ...prev,
      isLoggedIn: false,
    }));
  };

  const completeOnboarding = (data: { name: string; handle: string; bio: string; interests: string[] }) => {
    setUser((prev) => ({
      ...prev,
      ...data,
      onboarded: true,
    }));
  };

  const joinTrail = (trailId: string) => {
    setUser((prev) => ({
      ...prev,
      trailsJoined: prev.trailsJoined + 1,
      joinedTrailIds: [...prev.joinedTrailIds, trailId],
      points: prev.points + 10,
    }));
  };

  const completeTrail = (trailId: string) => {
    setUser((prev) => ({
      ...prev,
      trailsCompleted: prev.trailsCompleted + 1,
      completedTrailIds: [...prev.completedTrailIds, trailId],
      points: prev.points + 150,
    }));
  };

  const bookmarkTrail = (trailId: string) => {
    setUser((prev) => {
      const has = prev.bookmarkedTrailIds.includes(trailId);
      return {
        ...prev,
        bookmarkedTrailIds: has
          ? prev.bookmarkedTrailIds.filter((id) => id !== trailId)
          : [...prev.bookmarkedTrailIds, trailId],
      };
    });
  };

  const checkInStop = (trailId: string, stopId: number) => {
    setUser((prev) => {
      const existing = prev.checkedInStops[trailId] || [];
      if (existing.includes(stopId)) return prev;
      return {
        ...prev,
        checkedInStops: {
          ...prev.checkedInStops,
          [trailId]: [...existing, stopId],
        },
      };
    });
  };

  const markNotificationRead = (id: string) => {
    setUser((prev) => ({
      ...prev,
      notifications: prev.notifications.map((n) => (n.id === id ? { ...n, read: true } : n)),
    }));
  };

  const markAllNotificationsRead = () => {
    setUser((prev) => ({
      ...prev,
      notifications: prev.notifications.map((n) => ({ ...n, read: true })),
    }));
  };

  const createTrail = (trail: Trail) => {
    setUser((prev) => ({
      ...prev,
      createdTrails: [trail, ...prev.createdTrails],
      trailsCreated: prev.trailsCreated + 1,
      points: prev.points + 30,
      activityLog: [
        {
          id: `a-create-${trail.id}`,
          type: "created" as const,
          trailId: trail.id,
          trailName: trail.title,
          time: "Just now",
          points: 30,
        },
        ...prev.activityLog,
      ],
    }));
  };

  const updateCreatedTrail = (trailId: string, updates: Partial<Trail>) => {
    setUser((prev) => ({
      ...prev,
      createdTrails: prev.createdTrails.map((trail) => (trail.id === trailId ? { ...trail, ...updates } : trail)),
    }));
  };

  const deleteCreatedTrail = (trailId: string, reason?: string) => {
    setUser((prev) => {
      const trail = prev.createdTrails.find((t) => t.id === trailId);
      const trailName = trail?.title || "Trail";
      // Generate cancellation notifications for participants who joined this trail
      const cancellationNotification: TrailNotification = {
        id: `n-cancel-${trailId}-${Date.now()}`,
        type: "cancellation",
        message: `"${trailName}" has been cancelled by the creator.`,
        time: "Just now",
        read: false,
        cancellationReason: reason,
      };
      return {
        ...prev,
        createdTrails: prev.createdTrails.filter((t) => t.id !== trailId),
        trailsCreated: Math.max(0, prev.trailsCreated - 1),
        notifications: [cancellationNotification, ...prev.notifications],
        activityLog: [
          {
            id: `a-cancel-${trailId}-${Date.now()}`,
            type: "cancelled" as const,
            trailId,
            trailName,
            time: "Just now",
          },
          ...prev.activityLog,
        ],
      };
    });
  };

  const unreadCount = user.notifications.filter((n) => !n.read).length;

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
        signup,
        login,
        logout,
        completeOnboarding,
        joinTrail,
        completeTrail,
        bookmarkTrail,
        checkInStop,
        markNotificationRead,
        markAllNotificationsRead,
        createTrail,
        updateCreatedTrail,
        deleteCreatedTrail,
        unreadCount,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
}