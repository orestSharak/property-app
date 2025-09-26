import { z } from 'zod'

// Regex: Optional whitespace, decimal latitude, comma, decimal longitude (with optional whitespace)
const latLngPattern = /^\s*-?\d+(\.\d+)?\s*,\s*-?\d+(\.\d+)?\s*$/

export const PropertyFromSchema = z.object({
  address: z.string().min(1, 'isRequired'),
  position: z
    .string()
    .trim()
    .min(1, 'isRequired')
    .refine((val: string) => latLngPattern.test(val), {
      message: 'wrongPositionFormat',
    }),
  client: z
    .string({ error: (issue) => issue.input === undefined && 'isRequired' })
    .min(1, 'isRequired'),
  city: z
    .string({ error: (issue) => issue.input === undefined && 'isRequired' })
    .min(1, 'isRequired'),
  status: z
    .string({ error: (issue) => issue.input === undefined && 'isRequired' })
    .min(1, 'isRequired'),
})
