import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: { padding: 40 },
  header: { fontSize: 20, marginBottom: 20 },
  section: { marginBottom: 10 },
  text: { fontSize: 11 },
})

interface InvoiceTemplateProps {
  invoice: {
    invoiceNumber: string
    title: string
    customer: { name: string }
    items: Array<{
      name: string
      quantity: number
      unit: string
      price: number
      total: number
    }>
    total: number
    dueDate: Date
  }
}

export function InvoiceTemplate({ invoice }: InvoiceTemplateProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text>Rechnung {invoice.invoiceNumber}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.text}>Kunde: {invoice.customer.name}</Text>
          <Text style={styles.text}>Projekt: {invoice.title}</Text>
          <Text style={styles.text}>Fällig: {invoice.dueDate.toLocaleDateString('de-DE')}</Text>
        </View>
        <View style={styles.section}>
          {invoice.items.map((item, i) => (
            <Text key={i} style={styles.text}>
              {item.name} - {item.quantity} {item.unit} × {item.price}€ = {item.total}€
            </Text>
          ))}
        </View>
        <View style={styles.section}>
          <Text style={styles.text}>Gesamtsumme: {invoice.total}€</Text>
        </View>
      </Page>
    </Document>
  )
}
