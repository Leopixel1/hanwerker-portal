'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Sparkles } from 'lucide-react'
import { toast } from '@/components/ui/sonner'

interface OfferGeneratorProps {
  onGenerate: (offer: any) => void
}

export function OfferGenerator({ onGenerate }: OfferGeneratorProps) {
  const [customerName, setCustomerName] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)

  const handleGenerate = async () => {
    if (!customerName || !description) {
      toast.error('Bitte füllen Sie alle Felder aus')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/ai/generate-offer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ customerName, description }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate offer')
      }

      const data = await response.json()
      onGenerate(data)
      toast.success('Angebot erfolgreich generiert!')
    } catch (error) {
      console.error(error)
      toast.error('Fehler bei der Angebotsgenerierung')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          KI-Angebotsgenerator
        </CardTitle>
        <CardDescription>
          Lassen Sie die KI ein professionelles Angebot für Sie erstellen
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="customerName">Kundenname</Label>
          <Input
            id="customerName"
            placeholder="z.B. Familie Müller"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Projektbeschreibung</Label>
          <textarea
            id="description"
            className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Beschreiben Sie das Projekt im Detail..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <Button onClick={handleGenerate} disabled={loading} className="w-full">
          {loading ? 'Generiere...' : 'Angebot generieren'}
        </Button>
      </CardContent>
    </Card>
  )
}
