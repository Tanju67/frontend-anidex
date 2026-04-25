import { lazy } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import AnimeDetailLayout from "./pages/AnimeDetailLayout";
import ErrorPage from "./pages/ErrorPage";
import RootLayout from "./pages/RootLayout";

const HomePage = lazy(() => import("./pages/HomePage"));
const AllCharactersPage = lazy(() => import("./pages/AllCharactersPage"));
const AllActorsPage = lazy(() => import("./pages/AllActorsPage"));
const CharacterPage = lazy(() => import("./pages/CharacterPage"));
const ActorDetailPage = lazy(() => import("./pages/ActorDetailPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const ReviewsPage = lazy(() => import("./pages/ReviewsPage"));
const WatchlistPage = lazy(() => import("./pages/WatchlistPage"));
const SearchAnimePage = lazy(() => import("./pages/SearchAnimePage"));
const PopularAnimePage = lazy(() => import("./pages/PopularAnimePage"));
const NewAnimePage = lazy(() => import("./pages/NewAnimePage"));
const ThisSeasonPage = lazy(() => import("./pages/ThisSeasonPage"));
const CategoriesPage = lazy(() => import("./pages/CategoriesPage"));
const RecentTrailersPage = lazy(() => import("./pages/RecentTrailersPage"));
const AnimeDetailWrapper = lazy(() => import("./pages/AnimeDetailWrapper"));
const AllEpisodesPage = lazy(() => import("./pages/AllEpisodesPage"));

/**
 * Main Router Configuration
 * Using React Router Data APIs (createBrowserRouter) for enhanced performance and feature support.
 */
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    // errorElement catches any rendering errors within the layout tree
    errorElement: <ErrorPage />,
    children: [
      /**
       * LANDING & MAIN SECTIONS
       */
      { index: true, element: <HomePage /> },

      /**
       * DISCOVERY & CONTENT FILTERING ROUTES
       */
      { path: "search", element: <SearchAnimePage /> },
      { path: "watchlist", element: <WatchlistPage /> },
      { path: "popular", element: <PopularAnimePage /> },
      { path: "new", element: <NewAnimePage /> },
      { path: "this-season", element: <ThisSeasonPage /> },
      { path: "genre/:genreId", element: <CategoriesPage /> },
      { path: "trailer", element: <RecentTrailersPage /> },

      /**
       * USER AUTHENTICATION ROUTES
       */
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },

      /**
       * ANIME DETAILS SECTION (Nested Routing)
       * AnimeDetailLayout serves as a wrapper for all anime-specific sub-pages.
       */
      {
        path: "anime/:animeId",
        element: <AnimeDetailLayout />,
        children: [
          {
            index: true,
            element: <AnimeDetailWrapper />,
          },
          {
            path: "reviews",
            element: <ReviewsPage />,
          },
          {
            path: "episodes",
            element: <AllEpisodesPage />,
          },
          {
            path: "characters",
            element: <AllCharactersPage />,
          },
          {
            path: "characters/:charId",
            element: <CharacterPage />,
          },
          {
            path: "actors",
            element: <AllActorsPage />,
          },
          {
            path: "actors/:charId",
            element: <ActorDetailPage />,
          },
        ],
      },

      /**
       * ERROR HANDLING ROUTES
       * /error: Triggered programmatically via middleware for API failures.
       * *: Catch-all route for non-existent frontend paths (404 Not Found).
       */
      { path: "error", element: <ErrorPage /> },
      {
        path: "*",
        element: <ErrorPage status="404" message="Page not found" />,
      },
    ],
  },
]);

/**
 * Root Application Component
 * Provides the router context to the entire application.
 */
export default function App() {
  return <RouterProvider router={router} />;
}
