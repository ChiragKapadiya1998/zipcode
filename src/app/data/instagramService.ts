/**
 * Instagram Data Service (Mock)
 *
 * NOTE: There is no free, public Instagram API that allows fetching profile data
 * by username without authentication. Instagram's official API (Graph API) requires
 * a Facebook Developer account + app review + user OAuth consent.
 *
 * For production, consider these options:
 * 1. Instagram Graph API (official) — requires Facebook app approval
 *    https://developers.facebook.com/docs/instagram-api/
 * 2. RapidAPI Instagram scrapers (paid, ~$10-50/mo) — e.g., "Instagram Scraper API"
 *    https://rapidapi.com/hub
 * 3. Apify Instagram Scraper — pay-per-use
 *    https://apify.com/apify/instagram-profile-scraper
 *
 * This mock simulates realistic Instagram profile data for demo purposes.
 * Replace `fetchInstagramProfile()` with a real API call when ready.
 */

export interface InstagramProfile {
  username: string;
  fullName: string;
  profilePicUrl: string;
  bio: string;
  followersCount: number;
  followingCount: number;
  postsCount: number;
  isVerified: boolean;
  engagementRate: number; // percentage
  avgLikes: number;
  avgComments: number;
  estimatedReach: number;
  category: string;
}

// Simulated profiles for demo — returns plausible data based on username hash
function generateMockProfile(username: string): InstagramProfile {
  const clean = username.replace(/^@/, "").toLowerCase().trim();

  // Simple hash to generate deterministic but varied numbers
  let hash = 0;
  for (let i = 0; i < clean.length; i++) {
    hash = (hash << 5) - hash + clean.charCodeAt(i);
    hash |= 0;
  }
  const abs = Math.abs(hash);

  const followerTiers = [1200, 4800, 12500, 28000, 67000, 145000, 320000];
  const tier = abs % followerTiers.length;
  const followers = followerTiers[tier] + (abs % 1000);

  const followingBase = Math.min(followers * 0.15, 2000);
  const following = Math.floor(followingBase + (abs % 300));

  const posts = 40 + (abs % 400);
  const engagementRate = parseFloat((1.5 + (abs % 80) / 10).toFixed(1));
  const avgLikes = Math.floor(followers * (engagementRate / 100) * 0.8);
  const avgComments = Math.floor(avgLikes * 0.05);
  const estimatedReach = Math.floor(followers * (1.2 + (abs % 30) / 10));
  const isVerified = followers > 100000;

  const categories = [
    "Creator",
    "Digital Creator",
    "Content Creator",
    "Travel Blogger",
    "Lifestyle Blogger",
    "Photographer",
    "Food Blogger",
    "Artist",
  ];
  const category = categories[abs % categories.length];

  // Generate a display name from username
  const parts = clean.split(/[._-]/);
  const fullName = parts
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");

  return {
    username: clean,
    fullName: fullName || clean,
    profilePicUrl: "", // Will be set by caller or left empty for default avatar
    bio: `${category} | Exploring the world one trail at a time ✨`,
    followersCount: followers,
    followingCount: following,
    postsCount: posts,
    isVerified,
    engagementRate,
    avgLikes,
    avgComments,
    estimatedReach,
    category,
  };
}

/**
 * Fetches an Instagram profile by username.
 * Currently returns mock data — replace with a real API call for production.
 *
 * Example with RapidAPI:
 * ```ts
 * const response = await fetch(
 *   `https://instagram-scraper-api2.p.rapidapi.com/v1/info?username_or_id_or_url=${username}`,
 *   {
 *     headers: {
 *       'x-rapidapi-key': 'YOUR_RAPIDAPI_KEY_HERE',
 *       'x-rapidapi-host': 'instagram-scraper-api2.p.rapidapi.com',
 *     },
 *   }
 * );
 * const data = await response.json();
 * ```
 */
export async function fetchInstagramProfile(
  username: string
): Promise<{ success: boolean; profile?: InstagramProfile; error?: string }> {
  const clean = username.replace(/^@/, "").toLowerCase().trim();

  if (!clean || clean.length < 2) {
    return { success: false, error: "Username too short" };
  }

  if (!/^[a-zA-Z0-9._]+$/.test(clean)) {
    return { success: false, error: "Invalid Instagram username" };
  }

  // Simulate network delay (300-800ms)
  await new Promise((resolve) =>
    setTimeout(resolve, 300 + Math.random() * 500)
  );

  // Simulate a ~5% chance of "user not found" for realism
  const hash = clean.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  if (hash % 20 === 0 && clean !== "demo" && clean !== "test") {
    return { success: false, error: "Account not found or is private" };
  }

  const profile = generateMockProfile(clean);
  return { success: true, profile };
}

/** Format large numbers for display (e.g., 12500 → "12.5K") */
export function formatCount(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  return n.toString();
}
