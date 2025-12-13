export interface Tenant {
  id: string
  name: string
  slug: string
  subdomain: string | null
  logo: string | null
  colors: {
    primary?: string
    secondary?: string
  } | null
  settings: Record<string, any> | null
  createdAt: Date
  updatedAt: Date
}

export interface User {
  id: string
  tenantId: string
  clerkUserId: string | null
  email: string
  name: string
  role: 'ADMIN' | 'HANDWERKER' | 'KUNDE'
  createdAt: Date
  updatedAt: Date
  tenant?: Tenant
}

export interface Customer {
  id: string
  tenantId: string
  name: string
  email: string | null
  phone: string | null
  address: string | null
  city: string | null
  zipCode: string | null
  country: string | null
  notes: string | null
  createdAt: Date
  updatedAt: Date
}

export interface OfferItem {
  name: string
  quantity: number
  unit: string
  price: number
  total: number
}

export interface Offer {
  id: string
  tenantId: string
  customerId: string
  offerNumber: string
  status: 'DRAFT' | 'SENT' | 'ACCEPTED' | 'DECLINED'
  title: string
  description: string | null
  items: OfferItem[]
  subtotal: number
  taxRate: number
  taxAmount: number
  total: number
  validUntil: Date | null
  pdfUrl: string | null
  sentAt: Date | null
  acceptedAt: Date | null
  declinedAt: Date | null
  createdAt: Date
  updatedAt: Date
  customer?: Customer
}

export interface InvoiceItem {
  name: string
  quantity: number
  unit: string
  price: number
  total: number
}

export interface Invoice {
  id: string
  tenantId: string
  customerId: string
  offerId: string | null
  invoiceNumber: string
  status: 'DRAFT' | 'SENT' | 'PAID' | 'OVERDUE' | 'CANCELLED'
  title: string
  description: string | null
  items: InvoiceItem[]
  subtotal: number
  taxRate: number
  taxAmount: number
  total: number
  dueDate: Date
  pdfUrl: string | null
  sentAt: Date | null
  paidAt: Date | null
  createdAt: Date
  updatedAt: Date
  customer?: Customer
}

export interface Material {
  id: string
  tenantId: string
  name: string
  description: string | null
  unit: string
  price: number
  category: string | null
  active: boolean
  createdAt: Date
  updatedAt: Date
}
