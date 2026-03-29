import { RouterProvider, createBrowserRouter } from "react-router-dom";

import {
  ActorDetailPage,
  AllActorsPage,
  AllCharactersPage,
  AllEpisodesPage,
  AllNewsPage,
  AnimeDetailLayout,
  AnimeDetailPage,
  CharacterPage,
  ErrorPage,
  HomePage,
  LoginPage,
  NewsDetailPage,
  RegisterPage,
  ReviewsPage,
  RootLayout,
  SearchResultsPage,
  WatchTrailerPage,
  WatchlistPage,
} from "./pages";
import AnimeDetailWrapper from "./pages/AnimeDetailWrapper";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      // Home
      { index: true, element: <HomePage /> },

      // Search & Watchlist
      { path: "search-result", element: <SearchResultsPage /> },
      { path: "watchlist", element: <WatchlistPage /> },

      // Auth
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },

      // Trailer
      { path: "trailer/:animeId", element: <WatchTrailerPage /> },

      // Anime detayları

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
            path: "anime/:animeId/actors",
            element: <AllActorsPage />,
          },
          {
            path: "actors/:charId",
            element: <ActorDetailPage />,
          },
        ],
      },

      // News
      {
        path: "news/:newsId",
        element: <AllNewsPage />,
        children: [{ path: "detail", element: <NewsDetailPage /> }],
      },

      // {
      //   path: "*",
      //   element: <ErrorPage status="404" message="Page not found" />,
      // },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
