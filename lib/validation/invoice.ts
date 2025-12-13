import { z } from 'zod'

export const invoiceItemSchema = z.object({
  name: z.string().min(1, 'Name ist erforderlich'),
  quantity: z.number().positive('Menge muss positiv sein'),
  unit: z.string().min(1, 'Einheit ist erforderlich'),
  price: z.number().nonnegative('Preis muss positiv sein'),
  total: z.number(),
})

export const createInvoiceSchema = z.object({
  customerId: z.string().min(1, 'Kunde ist erforderlich'),
  offerId: z.string().optional(),
  title: z.string().min(1, 'Titel ist erforderlich'),
  description: z.string().optional(),
  items: z.array(invoiceItemSchema).min(1, 'Mindestens eine Position erforderlich'),
  subtotal: z.number(),
  taxRate: z.number().default(19),
  taxAmount: z.number(),
  total: z.number(),
  dueDate: z.date(),
})

export const updateInvoiceSchema = createInvoiceSchema.partial()

export type CreateInvoiceInput = z.infer<typeof createInvoiceSchema>
export type UpdateInvoiceInput = z.infer<typeof updateInvoiceSchema>
export type InvoiceItem = z.infer<typeof invoiceItemSchema>
