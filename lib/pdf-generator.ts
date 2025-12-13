import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer'
import { formatCurrency, formatDate } from './utils'

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 11,
    fontFamily: 'Helvetica',
  },
  header: {
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  companyInfo: {
    fontSize: 10,
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  table: {
    width: '100%',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    paddingVertical: 8,
  },
  tableHeader: {
    backgroundColor: '#f3f4f6',
    fontWeight: 'bold',
  },
  col1: { width: '40%' },
  col2: { width: '15%', textAlign: 'right' },
  col3: { width: '15%', textAlign: 'right' },
  col4: { width: '15%', textAlign: 'right' },
  col5: { width: '15%', textAlign: 'right' },
  footer: {
    marginTop: 30,
    paddingTop: 20,
    borderTopWidth: 2,
    borderTopColor: '#000',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  bold: {
    fontWeight: 'bold',
  },
})

interface OfferPDFProps {
  offer: {
    offerNumber: string
    title: string
    description?: string
    items: Array<{
      name: string
      quantity: number
      unit: string
      price: number
      total: number
    }>
    subtotal: number
    taxRate: number
    taxAmount: number
    total: number
    validUntil?: Date
  }
  tenant: {
    name: string
    address?: string
  }
  customer: {
    name: string
    address?: string
  }
}

export function OfferPDF({ offer, tenant, customer }: OfferPDFProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Angebot</Text>
          <Text style={styles.companyInfo}>{tenant.name}</Text>
          {tenant.address && <Text style={styles.companyInfo}>{tenant.address}</Text>}
        </View>

        {/* Offer Info */}
        <View style={styles.section}>
          <Text>Angebots-Nr.: {offer.offerNumber}</Text>
          <Text>Datum: {formatDate(new Date())}</Text>
          {offer.validUntil && (
            <Text>Gültig bis: {formatDate(offer.validUntil)}</Text>
          )}
        </View>

        {/* Customer */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Kunde</Text>
          <Text>{customer.name}</Text>
          {customer.address && <Text>{customer.address}</Text>}
        </View>

        {/* Project */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{offer.title}</Text>
          {offer.description && <Text>{offer.description}</Text>}
        </View>

        {/* Items Table */}
        <View style={styles.section}>
          <View style={styles.table}>
            {/* Header */}
            <View style={[styles.tableRow, styles.tableHeader]}>
              <Text style={styles.col1}>Position</Text>
              <Text style={styles.col2}>Menge</Text>
              <Text style={styles.col3}>Einheit</Text>
              <Text style={styles.col4}>Preis</Text>
              <Text style={styles.col5}>Gesamt</Text>
            </View>

            {/* Items */}
            {offer.items.map((item, index) => (
              <View key={index} style={styles.tableRow}>
                <Text style={styles.col1}>{item.name}</Text>
                <Text style={styles.col2}>{item.quantity}</Text>
                <Text style={styles.col3}>{item.unit}</Text>
                <Text style={styles.col4}>{formatCurrency(item.price)}</Text>
                <Text style={styles.col5}>{formatCurrency(item.total)}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Totals */}
        <View style={styles.footer}>
          <View style={styles.totalRow}>
            <Text>Zwischensumme:</Text>
            <Text>{formatCurrency(offer.subtotal)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text>MwSt. ({offer.taxRate}%):</Text>
            <Text>{formatCurrency(offer.taxAmount)}</Text>
          </View>
          <View style={[styles.totalRow, { marginTop: 10 }]}>
            <Text style={styles.bold}>Gesamtbetrag:</Text>
            <Text style={styles.bold}>{formatCurrency(offer.total)}</Text>
          </View>
        </View>
      </Page>
    </Document>
  )
}

export async function generateOfferPDF(data: OfferPDFProps): Promise<Blob> {
  // This would use @react-pdf/renderer's pdf() function
  // For now, returning a placeholder
  return new Blob([], { type: 'application/pdf' })
}
