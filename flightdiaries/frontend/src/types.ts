import { z } from 'zod';

export const Weather = {
  Sunny: 'sunny',
  Rainy: 'rainy',
  Cloudy: 'cloudy',
  Windy: 'windy',
  Stormy: 'stormy',
} as const;

export type Weather = (typeof Weather)[keyof typeof Weather];

export const Visibility = {
  Great: 'great',
  Good: 'good',
  Ok: 'ok',
  Poor: 'poor',
} as const;

export type Visibility = (typeof Visibility)[keyof typeof Visibility];

export const DiaryEntrySchema = z.object({
  id: z.number(),
  date: z.iso.date(),
  weather: z.enum(Weather),
  visibility: z.enum(Visibility),
  comment: z.string().optional(),
});

export type DiaryEntry = z.infer<typeof DiaryEntrySchema>;

export const NewDiaryEntrySchema = DiaryEntrySchema.omit({ id: true });

export type NewDiaryEntry = z.infer<typeof NewDiaryEntrySchema>;

export const ApiErrorValidationSchema = z.object({
  code: z.string(),
  path: z.array(z.string()),
  message: z.string(),
});

export type ApiError = z.infer<typeof ApiErrorValidationSchema>;
