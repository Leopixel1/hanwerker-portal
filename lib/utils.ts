import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(amount: number, currency = 'EUR'): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency,
  }).format(amount)
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('de-DE', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(date))
}

export function generateOfferNumber(tenantSlug: string, count: number): string {
  const year = new Date().getFullYear()
  const number = String(count + 1).padStart(4, '0')
  return `ANG-${year}-${number}`
}

export function generateInvoiceNumber(tenantSlug: string, count: number): string {
  const year = new Date().getFullYear()
  const number = String(count + 1).padStart(4, '0')
  return `RE-${year}-${number}`
}

export function calculateTax(subtotal: number, taxRate: number): number {
  return Math.round(subtotal * (taxRate / 100) * 100) / 100
}

export function calculateTotal(subtotal: number, taxRate: number): number {
  return subtotal + calculateTax(subtotal, taxRate)
}
