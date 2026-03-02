import { Outlet, useLocation } from "react-router";
import { BottomNav } from "./BottomNav";
import { OnboardingFlow } from "./OnboardingFlow";
import { AuthPage } from "./AuthPage";
import { useUser, UserProvider } from "../data/userStore";
import { ToastContainer } from "./Toast";

// Pages where we hide the bottom nav
const hideNavPages = ["/onboarding"];

function LayoutInner() {
  const { user } = useUser();
  const location = useLocation();

  const hideNav = hideNavPages.some((p) => location.pathname.startsWith(p));
  const isCompletionPage = location.pathname.includes("/complete");
  const isCheckoutPage = location.pathname.includes("/checkout");
  const isTrailDetailPage = /^\/trail\/[^/]+$/.test(location.pathname);
  const isFullScreenMap = location.pathname.includes("/map");
  const isCreateTrailPage = location.pathname === "/create-trail";
  const isExplorePage = location.pathname === "/explore";

  // New user — hasn't finished onboarding yet (includes auth in the middle)
  if (!user.onboarded) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="w-full max-w-[430px] min-h-screen bg-white relative shadow-2xl mx-auto">
          <OnboardingFlow />
        </div>
      </div>
    );
  }

  // Returning user who logged out — show auth only
  if (!user.isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="w-full max-w-[430px] min-h-screen bg-white relative shadow-2xl mx-auto">
          <AuthPage />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-[430px] min-h-screen bg-white relative shadow-2xl mx-auto overflow-hidden">
        {/* Main Content */}
        <main className="min-h-screen">
          <Outlet />
        </main>

        {/* Mobile Bottom Nav */}
        {!hideNav && !isCompletionPage && !isCheckoutPage && !isTrailDetailPage && !isFullScreenMap && !isCreateTrailPage && !isExplorePage && <BottomNav />}

        {/* Toast notifications */}
        <ToastContainer />
      </div>
    </div>
  );
}

export function Layout() {
  return (
    <UserProvider>
      <LayoutInner />
    </UserProvider>
  );
}