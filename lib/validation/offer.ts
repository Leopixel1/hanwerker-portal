import { z } from 'zod'

export const offerItemSchema = z.object({
  name: z.string().min(1, 'Name ist erforderlich'),
  quantity: z.number().positive('Menge muss positiv sein'),
  unit: z.string().min(1, 'Einheit ist erforderlich'),
  price: z.number().nonnegative('Preis muss positiv sein'),
  total: z.number(),
})

export const createOfferSchema = z.object({
  customerId: z.string().min(1, 'Kunde ist erforderlich'),
  title: z.string().min(1, 'Titel ist erforderlich'),
  description: z.string().optional(),
  items: z.array(offerItemSchema).min(1, 'Mindestens eine Position erforderlich'),
  subtotal: z.number(),
  taxRate: z.number().default(19),
  taxAmount: z.number(),
  total: z.number(),
  validUntil: z.date().optional(),
})

export const updateOfferSchema = createOfferSchema.partial()

export type CreateOfferInput = z.infer<typeof createOfferSchema>
export type UpdateOfferInput = z.infer<typeof updateOfferSchema>
export type OfferItem = z.infer<typeof offerItemSchema>
