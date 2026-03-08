import { useMemo } from "react";
import { createBrowserRouter, RouterProvider, useNavigate, useRouteError, isRouteErrorResponse } from "react-router";
import { Layout } from "./components/Layout";

function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();
  const is404 = isRouteErrorResponse(error) && error.status === 404;

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="max-w-[430px] w-full text-center">
        <div
          className="w-20 h-20 rounded-full mx-auto mb-5 flex items-center justify-center"
          style={{
            background: 'linear-gradient(126.8deg, rgb(146, 190, 255) 0%, rgb(190, 236, 255) 24%, rgb(242, 189, 151) 55%, rgb(255, 222, 222) 100%)',
          }}
        >
          <span className="text-[32px]">{is404 ? '🗺️' : '⚠️'}</span>
        </div>
        <h1 className="text-[22px] text-gray-900 mb-2">
          {is404 ? 'Page not found' : 'Something went wrong'}
        </h1>
        <p className="text-[14px] text-gray-500 mb-6">
          {is404
            ? "This trail doesn't seem to exist. Let's get you back on track."
            : 'An unexpected error occurred. Please try again.'}
        </p>
        <button
          onClick={() => navigate('/', { replace: true })}
          className="px-6 py-3 rounded-full text-white text-[14px]"
          style={{
            background: 'linear-gradient(126.8deg, rgb(146, 190, 255) 0%, rgb(190, 236, 255) 24%, rgb(242, 189, 151) 55%, rgb(255, 222, 222) 100%)',
          }}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

function NotFound() {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-6">
      <div className="max-w-[430px] w-full text-center">
        <div
          className="w-20 h-20 rounded-full mx-auto mb-5 flex items-center justify-center"
          style={{
            background: 'linear-gradient(126.8deg, rgb(146, 190, 255) 0%, rgb(190, 236, 255) 24%, rgb(242, 189, 151) 55%, rgb(255, 222, 222) 100%)',
          }}
        >
          <span className="text-[32px]">🗺️</span>
        </div>
        <h1 className="text-[22px] text-gray-900 mb-2">Page not found</h1>
        <p className="text-[14px] text-gray-500 mb-6">
          This trail doesn't seem to exist. Let's get you back on track.
        </p>
        <button
          onClick={() => navigate('/', { replace: true })}
          className="px-6 py-3 rounded-full text-white text-[14px]"
          style={{
            background: 'linear-gradient(126.8deg, rgb(146, 190, 255) 0%, rgb(190, 236, 255) 24%, rgb(242, 189, 151) 55%, rgb(255, 222, 222) 100%)',
          }}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

function createRouter() {
  return createBrowserRouter([
    {
      path: "/",
      Component: Layout,
      HydrateFallback: LoadingSpinner,
      errorElement: <ErrorPage />,
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
        {
          path: "*",
          Component: NotFound,
        },
      ],
    },
  ]);
}

export default function App() {
  // Force clean recompile v2
  const router = useMemo(() => createRouter(), []);
  return <RouterProvider router={router} />;
}