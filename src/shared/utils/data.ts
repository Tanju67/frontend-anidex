import type { AnimeFilter, AnimeType } from "../schemas/animeSchema";

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
