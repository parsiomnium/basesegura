import { z } from 'zod'

const envSchema = z.object({
  NEXT_PUBLIC_CHECKER_API_URL: z.string().url(),
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
})

function validateEnv() {
  const parsed = envSchema.safeParse({
    NEXT_PUBLIC_CHECKER_API_URL: process.env.NEXT_PUBLIC_CHECKER_API_URL,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
  })

  if (!parsed.success) {
    console.error('❌ Invalid environment variables:')
    for (const issue of parsed.error.issues) {
      console.error(`  → ${issue.path.join('.')}: ${issue.message}`)
    }
    throw new Error('Invalid environment variables')
  }

  return parsed.data
}

export const env = validateEnv()
