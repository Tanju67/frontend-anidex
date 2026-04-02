import { RouterProvider, createBrowserRouter } from "react-router-dom";

import {
  ActorDetailPage,
  AllActorsPage,
  AllCharactersPage,
  AllEpisodesPage,
  AnimeDetailLayout,
  CharacterPage,
  ErrorPage,
  HomePage,
  LoginPage,
  NewAnimePage,
  PopularAnimePage,
  RegisterPage,
  ReviewsPage,
  RootLayout,
  SearchAnimePage,
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
      { path: "search", element: <SearchAnimePage /> },
      { path: "watchlist", element: <WatchlistPage /> },
      { path: "popular", element: <PopularAnimePage /> },
      { path: "new", element: <NewAnimePage /> },
      { path: "genre/:firstGenre", element: <PopularAnimePage /> },

      // Auth
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },

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
            path: "actors",
            element: <AllActorsPage />,
          },
          {
            path: "actors/:charId",
            element: <ActorDetailPage />,
          },
        ],
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
