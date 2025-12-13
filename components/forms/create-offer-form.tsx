'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { toast } from '@/components/ui/sonner'
import { Plus, Trash } from 'lucide-react'
import { calculateTax, calculateTotal } from '@/lib/utils'

interface OfferFormProps {
  customers: Array<{ id: string; name: string }>
  onSubmit: (data: any) => void
  initialData?: any
}

interface OfferItem {
  name: string
  quantity: number
  unit: string
  price: number
  total: number
}

export function CreateOfferForm({ customers, onSubmit, initialData }: OfferFormProps) {
  const [formData, setFormData] = useState({
    customerId: initialData?.customerId || '',
    title: initialData?.title || '',
    description: initialData?.description || '',
    taxRate: initialData?.taxRate || 19,
  })

  const [items, setItems] = useState<OfferItem[]>(
    initialData?.items || [
      { name: '', quantity: 1, unit: 'Stück', price: 0, total: 0 },
    ]
  )

  const [loading, setLoading] = useState(false)

  const addItem = () => {
    setItems([...items, { name: '', quantity: 1, unit: 'Stück', price: 0, total: 0 }])
  }

  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index))
  }

  const updateItem = (index: number, field: keyof OfferItem, value: any) => {
    const newItems = [...items]
    newItems[index] = { ...newItems[index], [field]: value }

    // Calculate total for this item
    if (field === 'quantity' || field === 'price') {
      newItems[index].total = newItems[index].quantity * newItems[index].price
    }

    setItems(newItems)
  }

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + item.total, 0)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.customerId || !formData.title) {
      toast.error('Bitte füllen Sie alle Pflichtfelder aus')
      return
    }

    if (items.length === 0 || items.some(item => !item.name)) {
      toast.error('Bitte fügen Sie mindestens eine Position hinzu')
      return
    }

    const subtotal = calculateSubtotal()
    const taxAmount = calculateTax(subtotal, formData.taxRate)
    const total = calculateTotal(subtotal, formData.taxRate)

    setLoading(true)

    try {
      await onSubmit({
        ...formData,
        items,
        subtotal,
        taxAmount,
        total,
      })
      toast.success('Angebot erfolgreich erstellt')
    } catch (error) {
      toast.error('Fehler beim Erstellen des Angebots')
    } finally {
      setLoading(false)
    }
  }

  const subtotal = calculateSubtotal()
  const taxAmount = calculateTax(subtotal, formData.taxRate)
  const total = calculateTotal(subtotal, formData.taxRate)

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Angebotsdaten</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="customerId">Kunde *</Label>
            <Select
              value={formData.customerId}
              onValueChange={(value) => setFormData({ ...formData, customerId: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Kunde auswählen" />
              </SelectTrigger>
              <SelectContent>
                {customers.map((customer) => (
                  <SelectItem key={customer.id} value={customer.id}>
                    {customer.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Titel *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Beschreibung</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Positionen</CardTitle>
            <Button type="button" onClick={addItem} size="sm" variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Position hinzufügen
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="grid grid-cols-12 gap-2 items-end">
              <div className="col-span-4">
                <Label htmlFor={`item-name-${index}`}>Bezeichnung</Label>
                <Input
                  id={`item-name-${index}`}
                  value={item.name}
                  onChange={(e) => updateItem(index, 'name', e.target.value)}
                  placeholder="z.B. Fliesen"
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor={`item-quantity-${index}`}>Menge</Label>
                <Input
                  id={`item-quantity-${index}`}
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateItem(index, 'quantity', parseFloat(e.target.value) || 0)}
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor={`item-unit-${index}`}>Einheit</Label>
                <Input
                  id={`item-unit-${index}`}
                  value={item.unit}
                  onChange={(e) => updateItem(index, 'unit', e.target.value)}
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor={`item-price-${index}`}>Preis</Label>
                <Input
                  id={`item-price-${index}`}
                  type="number"
                  step="0.01"
                  value={item.price}
                  onChange={(e) => updateItem(index, 'price', parseFloat(e.target.value) || 0)}
                />
              </div>
              <div className="col-span-1">
                <Label>Gesamt</Label>
                <div className="h-10 flex items-center text-sm font-medium">
                  {item.total.toFixed(2)} €
                </div>
              </div>
              <div className="col-span-1">
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  onClick={() => removeItem(index)}
                  disabled={items.length === 1}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Zusammenfassung</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between">
            <span>Zwischensumme:</span>
            <span className="font-medium">{subtotal.toFixed(2)} €</span>
          </div>
          <div className="flex justify-between items-center">
            <span>MwSt.:</span>
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={formData.taxRate}
                onChange={(e) => setFormData({ ...formData, taxRate: parseFloat(e.target.value) || 0 })}
                className="w-20 h-8"
              />
              <span>% = {taxAmount.toFixed(2)} €</span>
            </div>
          </div>
          <div className="flex justify-between text-lg font-bold border-t pt-2">
            <span>Gesamtsumme:</span>
            <span>{total.toFixed(2)} €</span>
          </div>
        </CardContent>
      </Card>

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? 'Speichere...' : 'Angebot erstellen'}
      </Button>
    </form>
  )
}
