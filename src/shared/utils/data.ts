import type { AnimeFilter, AnimeType } from "../schemas/animeSchema";

export type AnimeRating = "g" | "pg" | "pg13" | "r17";
export type AnimeStatus = "airing" | "complete" | "upcoming" | "all";

export const typesDataForNewAnimeFilter: { label: string; value: AnimeType }[] =
  [
    { label: "All", value: "all" },
    { label: "TV", value: "tv" },
    { label: "Movie", value: "movie" },
    { label: "OVA", value: "ova" },
    { label: "Special", value: "special" },
    { label: "ONA", value: "ona" },
    { label: "Music", value: "music" },
  ];

export const typesDataForPopularAnimeFilter: {
  label: string;
  value: AnimeType;
}[] = [
  { label: "All", value: "all" },
  { label: "TV", value: "tv" },
  { label: "Movie", value: "movie" },
  { label: "OVA", value: "ova" },
  { label: "Special", value: "special" },
  { label: "ONA", value: "ona" },
  { label: "Music", value: "music" },
  { label: "CM", value: "cm" },
  { label: "PV", value: "pv" },
  { label: "TV Special", value: "tv_special" },
];

export const filterData: { label: string; value: AnimeFilter }[] = [
  { label: "All", value: "all" },
  { label: "Airing", value: "airing" },
  { label: "Upcoming", value: "upcoming" },
  { label: "By Popularity", value: "bypopularity" },
  { label: "Favorite", value: "favorite" },
];

export const ratingData: { label: string; value: AnimeRating }[] = [
  { label: "All Ages", value: "g" },
  { label: "Children", value: "pg" },
  { label: "Teens 13 or Older", value: "pg13" },
  { label: "17+ (vioence and profanity)", value: "r17" },
];

export const statusData: { label: string; value: AnimeStatus }[] = [
  { label: "All", value: "all" },
  { label: "Airing", value: "airing" },
  { label: "Completed", value: "complete" },
  { label: "Upcoming", value: "upcoming" },
];

export const genres = [
  {
    id: 1,
    name: "Action",
    emoji: "🔥",
    description:
      "Feel the adrenaline rush as every battle pushes limits beyond imagination.",
  },
  {
    id: 2,
    name: "Adventure",
    emoji: "🗺️",
    description:
      "Step into unknown worlds and chase the thrill of endless journeys.",
  },
  {
    id: 4,
    name: "Comedy",
    emoji: "😂",
    description:
      "Laugh out loud and forget the world, even if just for a moment.",
  },
  {
    id: 7,
    name: "Mystery",
    emoji: "🕵️",
    description:
      "Unravel secrets where every clue pulls you deeper into the unknown.",
  },
  {
    id: 8,
    name: "Drama",
    emoji: "🎭",
    description:
      "Experience stories that hit deep and stay with you long after.",
  },
  {
    id: 10,
    name: "Fantasy",
    emoji: "🧙",
    description:
      "Escape reality and lose yourself in worlds where anything is possible.",
  },
  {
    id: 14,
    name: "Horror",
    emoji: "👻",
    description:
      "Face your fears and step into darkness where nothing feels safe.",
  },
  {
    id: 22,
    name: "Romance",
    emoji: "❤️",
    description: "Let your heart flutter and believe in love all over again.",
  },
  {
    id: 24,
    name: "Sci-Fi",
    emoji: "🚀",
    description: "Explore the future where technology and imagination collide.",
  },
  {
    id: 30,
    name: "Sports",
    emoji: "⚽",
    description: "Feel the passion, rivalry, and the drive to become the best.",
  },
  {
    id: 36,
    name: "Slice of Life",
    emoji: "🌸",
    description:
      "Find beauty in the quiet, everyday moments that truly matter.",
  },
  {
    id: 37,
    name: "Supernatural",
    emoji: "✨",
    description: "Step beyond reality into a world touched by unseen forces.",
  },
];
