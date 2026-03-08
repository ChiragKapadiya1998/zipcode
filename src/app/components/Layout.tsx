import { Outlet, useLocation } from "react-router";
import { BottomNav } from "./BottomNav";
import { SidebarNav } from "./SidebarNav";
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

  const showBottomNav =
    !hideNav &&
    !isCompletionPage &&
    !isCheckoutPage &&
    !isTrailDetailPage &&
    !isFullScreenMap &&
    !isCreateTrailPage &&
    !isExplorePage;

  // New user — hasn't finished onboarding yet
  if (!user.onboarded) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center lg:bg-white lg:block">
        <div className="w-full max-w-[430px] min-h-screen bg-white relative shadow-2xl mx-auto lg:max-w-none lg:shadow-none">
          <OnboardingFlow />
        </div>
      </div>
    );
  }

  // Returning user who logged out — show auth only
  if (!user.isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center lg:bg-white lg:block">
        <div className="w-full max-w-[430px] min-h-screen bg-white relative shadow-2xl mx-auto lg:max-w-none lg:shadow-none">
          <AuthPage />
        </div>
      </div>
    );
  }

  return (
    <>
      {/* ═══ MOBILE LAYOUT (< lg) ═══ */}
      <div className="lg:hidden min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="w-full max-w-[430px] min-h-screen bg-white relative shadow-2xl mx-auto overflow-hidden">
          <main className="min-h-screen">
            <Outlet />
          </main>
          {showBottomNav && <BottomNav />}
          <ToastContainer />
        </div>
      </div>

      {/* ═══ DESKTOP LAYOUT (≥ lg) ═══ */}
      <div className="hidden lg:flex min-h-screen bg-[#f5f6f8]">
        {/* Fixed sidebar */}
        <SidebarNav />

        {/* Scrollable content area */}
        <div className="flex-1 min-h-screen overflow-y-auto">
          <main className="min-h-screen">
            <Outlet />
          </main>
        </div>

        <ToastContainer />
      </div>
    </>
  );
}

export function Layout() {
  return (
    <UserProvider>
      <LayoutInner />
    </UserProvider>
  );
}