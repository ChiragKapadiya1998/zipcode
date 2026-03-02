import { useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Layout } from "./components/Layout";

function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function createRouter() {
  return createBrowserRouter([
    {
      path: "/",
      Component: Layout,
      HydrateFallback: LoadingSpinner,
      children: [
        {
          index: true,
          lazy: () =>
            import("./components/DiscoveryPage").then((m) => ({
              Component: m.DiscoveryPage,
            })),
        },
        {
          path: "trail/:id/checkout",
          lazy: () =>
            import("./components/CheckoutPage").then((m) => ({
              Component: m.CheckoutPage,
            })),
        },
        {
          path: "trail/:id/complete",
          lazy: () =>
            import("./components/TrailCompletionPage").then((m) => ({
              Component: m.TrailCompletionPage,
            })),
        },
        {
          path: "trail/:id/map",
          lazy: () =>
            import("./components/FullScreenTrailMap").then((m) => ({
              Component: m.FullScreenTrailMap,
            })),
        },
        {
          path: "trail/:id",
          lazy: () =>
            import("./components/TrailDetailPage").then((m) => ({
              Component: m.TrailDetailPage,
            })),
        },
        {
          path: "creator/:id",
          lazy: () =>
            import("./components/CreatorProfilePage").then((m) => ({
              Component: m.CreatorProfilePage,
            })),
        },
        {
          path: "create-trail",
          lazy: () =>
            import("./components/CreateTrailPage").then((m) => ({
              Component: m.CreateTrailPage,
            })),
        },
        {
          path: "profile",
          lazy: () =>
            import("./components/ProfilePage").then((m) => ({
              Component: m.ProfilePage,
            })),
        },
        {
          path: "activity",
          lazy: () =>
            import("./components/ActivityPage").then((m) => ({
              Component: m.ActivityPage,
            })),
        },
        {
          path: "search",
          lazy: () =>
            import("./components/SearchPage").then((m) => ({
              Component: m.SearchPage,
            })),
        },
        {
          path: "explore",
          lazy: () =>
            import("./components/MapExplorePage").then((m) => ({
              Component: m.MapExplorePage,
            })),
        },
        {
          path: "creators",
          lazy: () =>
            import("./components/CreatorsListPage").then((m) => ({
              Component: m.CreatorsListPage,
            })),
        },
      ],
    },
  ]);
}

export default function App() {
  // Force recompile
  const router = useMemo(() => createRouter(), []);
  return <RouterProvider router={router} />;
}