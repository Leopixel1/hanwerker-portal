import { GoogleGenerativeAI } from '@google/generative-ai'

if (!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY is not set')
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

export interface OfferGenerationRequest {
  customerName: string
  description: string
  materials?: Array<{ name: string; price: number; unit: string }>
}

export interface OfferGenerationResult {
  title: string
  description: string
  items: Array<{
    name: string
    quantity: number
    unit: string
    price: number
    total: number
  }>
  subtotal: number
  estimatedHours?: number
  notes?: string
}

export async function generateOffer(
  request: OfferGenerationRequest
): Promise<OfferGenerationResult> {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

  const materialsContext = request.materials
    ? `\n\nVerfügbare Materialien:\n${request.materials
        .map((m) => `- ${m.name}: ${m.price}€ pro ${m.unit}`)
        .join('\n')}`
    : ''

  const prompt = `Du bist ein erfahrener Handwerker und sollst ein detailliertes Angebot erstellen.

Kunde: ${request.customerName}
Projektbeschreibung: ${request.description}${materialsContext}

Erstelle ein professionelles Angebot mit folgenden Informationen im JSON-Format:
{
  "title": "Prägnanter Projekttitel",
  "description": "Detaillierte Projektbeschreibung",
  "items": [
    {
      "name": "Positionsname",
      "quantity": Menge,
      "unit": "Einheit (z.B. m², Stück, Stunden)",
      "price": Einzelpreis,
      "total": Gesamtpreis
    }
  ],
  "subtotal": Gesamtsumme,
  "estimatedHours": Geschätzte Arbeitsstunden,
  "notes": "Zusätzliche Hinweise oder Bedingungen"
}

Wichtig:
- Kalkuliere realistische Preise für deutsche Handwerksleistungen
- Berücksichtige Materialkosten, Arbeitszeit (ca. 60-80€/Stunde) und Anfahrt
- Sei präzise bei Mengenangaben
- Füge alle notwendigen Positionen hinzu
- Gib nur das JSON zurück, keine zusätzlichen Erklärungen`

  const result = await model.generateContent(prompt)
  const response = await result.response
  const text = response.text()

  // Extract JSON from response (handle markdown code blocks)
  const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/) || [null, text]
  const jsonText = jsonMatch[1] || text

  try {
    const parsed = JSON.parse(jsonText.trim())
    return parsed
  } catch (error) {
    console.error('Failed to parse AI response:', text)
    throw new Error('Failed to generate offer. Please try again.')
  }
}

export async function analyzeMaterialNeeds(description: string): Promise<string[]> {
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' })

  const prompt = `Analysiere folgende Projektbeschreibung und liste alle benötigten Materialien auf:

${description}

Gib eine JSON-Array mit Materialnamen zurück:
["Material 1", "Material 2", ...]

Nur das JSON-Array, keine Erklärungen.`

  const result = await model.generateContent(prompt)
  const response = await result.response
  const text = response.text()

  const jsonMatch = text.match(/\[[\s\S]*?\]/)
  if (jsonMatch) {
    return JSON.parse(jsonMatch[0])
  }

  return []
}
