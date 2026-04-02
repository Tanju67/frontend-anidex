import { url, z } from "zod";

export const GenreSchema = z.object({
  mal_id: z.number(),
  type: z.string(),
  name: z.string(),
  url: z.string(),
});

const TitleSchema = z.object({
  type: z.string(),
  title: z.string(),
});

export const SliderItemSchema = z
  .object({
    mal_id: z.number(),
    // farklı title kaynakları
    title_english: z.string().nullable().optional(),
    title: z.string(),
    titles: z.array(TitleSchema).optional(),
    synopsis: z.string().nullable(),
    year: z.number().nullable().optional(),
    score: z.number().nullable().optional(),
    // ✅ yeni alanlar
    background: z.string().nullable().optional(),
    status: z.string().nullable().optional(),
    episodes: z.number().nullable().optional(),
    duration: z.string().nullable().optional(),
    images: z.object({
      jpg: z.object({
        large_image_url: z.string(),
      }),
    }),
    trailer: z
      .object({
        embed_url: z.string().nullable(),
      })
      .nullable()
      .optional(),
    genres: z.array(GenreSchema).optional(),
  })
  .transform((data) => {
    // 1. öncelik: title_english
    let finalTitle = data.title_english;

    // 2. fallback: title
    if (!finalTitle) {
      finalTitle = data.title;
    }

    // 3. fallback: titles array
    if (!finalTitle && data.titles) {
      // önce English bul
      const enTitle = data.titles.find((t) => t.type === "English");

      // yoksa Default
      const defaultTitle = data.titles.find((t) => t.type === "Default");

      // yoksa ilk eleman
      finalTitle =
        enTitle?.title || defaultTitle?.title || data.titles[0]?.title || null;
    }

    return {
      id: data.mal_id,
      title: finalTitle,
      synopsis: data.synopsis,
      year: data.year,
      score: data.score,
      image: data.images.jpg.large_image_url,
      trailer: data.trailer?.embed_url ?? null,
      genres: data.genres?.map((g) => g.name) ?? [],
      episodes: data.episodes ?? null,
      duration: data.duration ?? null,
      background: data.background ?? null, // ✅
      status: data.status ?? null, // ✅
    };
  });

export const bannerSliderSchema = z.array(SliderItemSchema);
export type SliderItemType = z.infer<typeof SliderItemSchema>;
export type BannerSliderType = z.infer<typeof bannerSliderSchema>;

export const RowSliderItemSchema = z
  .object({
    mal_id: z.number(),
    title: z.string(),
    year: z.number().nullable().optional(),
    images: z.object({
      jpg: z.object({
        large_image_url: z.string(),
      }),
    }),
    aired: z
      .object({
        from: z.string().nullable(),
        to: z.string().nullable(),
      })
      .optional(),
  })
  .transform((data) => {
    // Eğer year yoksa aired.from’dan al
    const fallbackYear =
      data.year ??
      (data.aired?.from ? new Date(data.aired.from).getFullYear() : null);

    return {
      id: data.mal_id,
      title: data.title,
      year: fallbackYear,
      image: data.images.jpg.large_image_url,
    };
  });

export const RowSliderSchema = z.array(RowSliderItemSchema);

export type RowSliderItemType = z.infer<typeof RowSliderItemSchema>;
export type RowSliderType = z.infer<typeof RowSliderSchema>;

export type AnimeType = "tv" | "movie" | "ova" | "special" | "ona" | "music";

export const PaginationSchema = z.object({
  last_visible_page: z.number(),
  has_next_page: z.boolean(),
});

const VoiceActorSchema = z.object({
  person: z.object({
    mal_id: z.number(),
    name: z.string(),
    images: z.object({
      jpg: z.object({
        image_url: z.string().optional(),
      }),
    }),
  }),
  language: z.string(),
});

export const CharacterSchema = z
  .object({
    character: z.object({
      mal_id: z.number(),
      name: z.string(),
      images: z.object({
        jpg: z.object({
          image_url: z.string(),
        }),
      }),
    }),
    role: z.string(),
    voice_actors: z.array(VoiceActorSchema).optional(),
  })
  .transform((data) => {
    const allVoiceActors =
      data.voice_actors?.map((va) => ({
        id: va.person.mal_id,
        name: va.person.name,
        image: va.person.images.jpg.image_url ?? null,
        language: va.language,
      })) ?? [];
    // 🎯 Japanese voice actor bul (en yaygın kullanım)
    const japaneseVA = data.voice_actors?.find(
      (va) => va.language === "Japanese",
    );

    return {
      characterId: data.character.mal_id,
      name: data.character.name,
      image: data.character.images.jpg.image_url,
      role: data.role,

      voiceActor: allVoiceActors,

      defaultVoiceActors: japaneseVA
        ? {
            name: japaneseVA.person.name,
            image: japaneseVA.person.images.jpg.image_url ?? null,
            language: japaneseVA.language,
            id: japaneseVA.person.mal_id,
          }
        : null,
    };
  });

export type CharacterType = z.infer<typeof CharacterSchema>;
export const CharactersSchema = z.array(CharacterSchema);
export type CharactersType = z.infer<typeof CharactersSchema>;

export const AnimeImageSchema = z
  .object({
    jpg: z.object({
      large_image_url: z.string(),
    }),
  })
  .transform((data) => ({
    image: data.jpg.large_image_url,
  }));

export const AnimeImagesSchema = z.array(AnimeImageSchema);

export type AnimeImageType = z.infer<typeof AnimeImageSchema>;

export const ReviewSchema = z
  .object({
    user: z.object({
      username: z.string(),
      images: z.object({
        jpg: z.object({
          image_url: z.string(),
        }),
      }),
    }),
    review: z.string(),
    date: z.string(),
    score: z.number(),
    is_spoiler: z.boolean(),
    reactions: z.object({
      love_it: z.number(),
      confusing: z.number(),
    }),
  })
  .transform((data) => ({
    image: data.user.images.jpg.image_url,
    name: data.user.username,
    date: data.date,
    review: data.review,
    spoiler: data.is_spoiler,
    score: data.score,
    like: data.reactions.love_it, // ✅ doğru
    dislike: data.reactions.confusing, // ✅ mantıklı seçim
  }));

export const ReviewsResponseSchema = z.object({
  data: z.array(ReviewSchema),
  pagination: PaginationSchema,
});

export type ReviewType = z.infer<typeof ReviewSchema>;
export const ReviewsSchema = z.array(ReviewSchema);
export type ReviewsType = z.infer<typeof ReviewsSchema>;
export type ReviewsResponseType = z.infer<typeof ReviewsResponseSchema>;

export const EpisodeSchema = z
  .object({
    mal_id: z.number(),
    title: z.string(),
    aired: z.string(),
    score: z.number().nullable(),
    filler: z.boolean(),
  })
  .transform((data) => ({
    id: data.mal_id,
    title: data.title,
    aired: data.aired,
    score: data.score ?? null,
    filler: data.filler,
  }));

export const EpisodesResponseSchema = z.object({
  data: z.array(EpisodeSchema),
  pagination: PaginationSchema,
});

export type EpisodeType = z.infer<typeof EpisodeSchema>;
export const EpisodesSchema = z.array(EpisodeSchema);
export type EpisodesType = EpisodeType[];
export type PaginationType = z.infer<typeof PaginationSchema>;
export type EpisodesResponseType = z.infer<typeof EpisodesResponseSchema>;

export const RecommendationItemSchema = z
  .object({
    entry: z.object({
      mal_id: z.number(),
      title: z.string(),
      year: z.number().nullable().optional(),
      images: z.object({
        jpg: z.object({
          large_image_url: z.string(),
        }),
      }),
    }),
  })
  .transform((data) => ({
    id: data.entry.mal_id,
    title: data.entry.title,
    image: data.entry.images.jpg.large_image_url,
    year: data.entry.year ?? null,
  }));

export const RecommendationsSchema = z.array(RecommendationItemSchema);
export type RecommendationItemType = z.infer<typeof RecommendationItemSchema>;
export type RecommendationsType = z.infer<typeof RecommendationsSchema>;

// Tek bir forum postu için temel şema
export const NewsSchema = z
  .object({
    mal_id: z.number(),
    title: z.string(),
    date: z.string(),
    images: z.object({
      jpg: z.object({
        image_url: z.string().nullable().optional(),
      }),
    }),
    comments: z.number().nullable().optional(),
    excerpt: z.string().nullable().optional(),
    url: z.string(),
  })
  .transform((data) => ({
    id: data.mal_id,
    title: data.title,
    date: data.date,
    image: data.images.jpg.image_url ?? null,
    comments: data.comments ?? null,
    excerpt: data.excerpt ?? null,
    url: data.url,
  }));

// Pagination objesi

// Response şeması
export const NewsResponseSchema = z.object({
  pagination: PaginationSchema,
  data: z.array(NewsSchema),
});

// TypeScript tipleri
export type NewsType = z.infer<typeof NewsSchema>;
export const AllNewsSchema = z.array(NewsSchema);
export type AllNewsType = z.infer<typeof AllNewsSchema>;
export type NewsResponseType = z.infer<typeof NewsResponseSchema>;

export const singleEpisodeSchema = z
  .object({
    mal_id: z.number(),
    synopsis: z.string(),
  })
  .transform((data) => ({
    id: data.mal_id,
    synopsis: data.synopsis,
  }));

export type SingleEpisodeType = z.infer<typeof singleEpisodeSchema>;

// Voice Actor şeması
const PersonVoiceActorSchema = z.object({
  language: z.string(),
  person: z.object({
    mal_id: z.number(),
    name: z.string(),
    url: z.string(),
    images: z.object({
      jpg: z.object({
        image_url: z.string(),
      }),
    }),
  }),
});

// Main Character/Person şeması
export const PersonSchema = z
  .object({
    mal_id: z.number(),
    name: z.string(),
    images: z.object({
      jpg: z.object({
        image_url: z.string().nullable().optional(),
      }),
    }),
    nicknames: z.array(z.string()).nullable().optional(),
    about: z.string().nullable().optional(),
    voices: z.array(PersonVoiceActorSchema).optional(),
  })
  .transform((data) => ({
    characterId: data.mal_id,
    name: data.name,
    image: data.images.jpg.image_url,
    voiceActors:
      data.voices?.map((va) => ({
        id: va.person.mal_id,
        name: va.person.name,
        image: va.person.images.jpg.image_url,
        language: va.language,
        url: va.person.url,
      })) ?? [],
    nicknames: data.nicknames ?? [],
    about: data.about ?? "",
  }));

// TypeScript tipleri
export type PersonVoiceActorType = z.infer<typeof PersonVoiceActorSchema>;
export type PersonType = z.infer<typeof PersonSchema>;

export const VoiceActorDetailSchema = z
  .object({
    mal_id: z.number(),
    name: z.string(),
    images: z.object({
      jpg: z.object({
        image_url: z.string(),
      }),
    }),
    birthday: z.string().nullable().optional(),
    about: z.string().nullable().optional(),
    website_url: z.string().nullable().optional(),
  })
  .transform((data) => ({
    id: data.mal_id,
    name: data.name,
    image: data.images.jpg.image_url,
    birthday: data.birthday ?? null,
    about: data.about ?? "",
    website: data.website_url ?? null,
  }));

export type VoiceActorDetailType = z.infer<typeof VoiceActorDetailSchema>;
