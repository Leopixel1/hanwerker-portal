import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  page: { padding: 40 },
  header: { fontSize: 20, marginBottom: 20 },
  section: { marginBottom: 10 },
  text: { fontSize: 11 },
})

interface OfferTemplateProps {
  offer: {
    offerNumber: string
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
  }
}

export function OfferTemplate({ offer }: OfferTemplateProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text>Angebot {offer.offerNumber}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.text}>Kunde: {offer.customer.name}</Text>
          <Text style={styles.text}>Projekt: {offer.title}</Text>
        </View>
        <View style={styles.section}>
          {offer.items.map((item, i) => (
            <Text key={i} style={styles.text}>
              {item.name} - {item.quantity} {item.unit} × {item.price}€ = {item.total}€
            </Text>
          ))}
        </View>
        <View style={styles.section}>
          <Text style={styles.text}>Gesamtsumme: {offer.total}€</Text>
        </View>
      </Page>
    </Document>
  )
}
