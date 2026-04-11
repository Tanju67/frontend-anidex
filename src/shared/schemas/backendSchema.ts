import { Watch } from "react-loader-spinner";
import { z } from "zod";

export const registerSchema = z.object({
  fullName: z.string().min(4, "Full name must be at least 4 characters"), // Backend ile uyumlu (min 4)
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type RegisterFormData = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// Backend'den dönen User objesi için şema (Google Auth dahil)
export const authUserSchema = z.object({
  fullName: z.string(),
  email: z.string().email(),
  // Eğer backend _id veya authMethod da dönüyorsa onları da ekleyebilirsin:
  authMethod: z.enum(["local", "google"]).optional(),
  googleId: z.string().optional(),
});

export type AuthUser = z.infer<typeof authUserSchema>;

// Tekil kullanıcı objesi
export const userSchema = z.object({
  _id: z.string(),
  fullName: z.string(),
  email: z.string().email(),
  authMethod: z.enum(["local", "google"]),
  googleId: z.string().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

// Backend'den gelen sarmalanmış (wrapped) yanıt
export const currentUserResponseSchema = z.object({
  data: userSchema,
});

// TypeScript Tipleri
export type User = z.infer<typeof userSchema>;
export type CurrentUserResponse = z.infer<typeof currentUserResponseSchema>;

export const createWatchlistItemSchema = z.object({
  animeId: z.number(),
  title: z.string(),
  images: z.string(),
  createdBy: z.string().nullable().optional(),
});

export type CreateWatchlistItem = z.infer<typeof createWatchlistItemSchema>;

export const createWatchlistResponseSchema = z.object({
  data: createWatchlistItemSchema,
  message: z.string(),
});

export type CreateWatchlistResponse = z.infer<
  typeof createWatchlistResponseSchema
>;
