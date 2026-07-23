import { z } from 'zod'

export const articleSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  section: z.string().min(1),
  level: z.enum(['basico', 'intermedio', 'avanzado']).optional(),
  risk: z.enum(['bajo', 'medio', 'alto', 'critico']).optional(),
  reading_time: z.number().positive().optional(),
  created: z.union([z.string().regex(/^\d{4}-\d{2}-\d{2}$/), z.date()]),
  updated: z.union([z.string().regex(/^\d{4}-\d{2}-\d{2}$/), z.date()]),
  tags: z.array(z.string()).optional(),
  platforms: z.array(z.string()).optional(),
  related: z.array(z.string()).optional(),
  tool: z.string().optional(),
  status: z.enum(['published', 'draft', 'needs-review']).optional(),
  country: z.string().optional(),
  content_type: z.enum(['guide', 'action', 'prevent', 'learn']).optional(),
})

export type Article = z.infer<typeof articleSchema>
