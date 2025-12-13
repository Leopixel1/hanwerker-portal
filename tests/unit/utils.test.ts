import { formatCurrency, formatDate, calculateTax, calculateTotal } from '@/lib/utils'

describe('Utils', () => {
  describe('formatCurrency', () => {
    it('should format currency correctly', () => {
      expect(formatCurrency(1234.56)).toBe('1.234,56 €')
      expect(formatCurrency(0)).toBe('0,00 €')
      expect(formatCurrency(999999.99)).toBe('999.999,99 €')
    })
  })

  describe('formatDate', () => {
    it('should format date correctly', () => {
      const date = new Date('2024-01-15')
      expect(formatDate(date)).toMatch(/15\.01\.2024/)
    })
  })

  describe('calculateTax', () => {
    it('should calculate tax correctly', () => {
      expect(calculateTax(100, 19)).toBe(19)
      expect(calculateTax(200, 7)).toBe(14)
      expect(calculateTax(50.50, 19)).toBe(9.60)
    })
  })

  describe('calculateTotal', () => {
    it('should calculate total with tax correctly', () => {
      expect(calculateTotal(100, 19)).toBe(119)
      expect(calculateTotal(200, 7)).toBe(214)
    })
  })
})
