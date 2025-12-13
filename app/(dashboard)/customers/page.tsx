import { Header } from '@/components/dashboard/header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { prisma } from '@/lib/db'
import { getCurrentUser } from '@/lib/auth'

export default async function CustomersPage() {
  const user = await getCurrentUser()

  if (!user) {
    return null
  }

  const customers = await prisma.customer.findMany({
    where: { tenantId: user.tenantId },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div>
      <Header title="Kunden" />
      <div className="p-8">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-muted-foreground">
            Verwalten Sie Ihre Kundendaten
          </p>
          <Link href="/dashboard/customers/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Neuer Kunde
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Alle Kunden</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="pb-3 text-left font-medium">Name</th>
                    <th className="pb-3 text-left font-medium">E-Mail</th>
                    <th className="pb-3 text-left font-medium">Telefon</th>
                    <th className="pb-3 text-left font-medium">Stadt</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map((customer) => (
                    <tr key={customer.id} className="border-b last:border-0">
                      <td className="py-3 font-medium">{customer.name}</td>
                      <td className="py-3">{customer.email || '-'}</td>
                      <td className="py-3">{customer.phone || '-'}</td>
                      <td className="py-3">{customer.city || '-'}</td>
                    </tr>
                  ))}
                  {customers.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-muted-foreground">
                        Noch keine Kunden vorhanden
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
