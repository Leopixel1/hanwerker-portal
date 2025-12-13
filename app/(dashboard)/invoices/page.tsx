import { Header } from '@/components/dashboard/header'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import { prisma } from '@/lib/db'
import { getCurrentUser } from '@/lib/auth'
import { formatCurrency, formatDate } from '@/lib/utils'

export default async function InvoicesPage() {
  const user = await getCurrentUser()

  if (!user) {
    return null
  }

  const invoices = await prisma.invoice.findMany({
    where: { tenantId: user.tenantId },
    include: {
      customer: {
        select: { name: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div>
      <Header title="Rechnungen" />
      <div className="p-8">
        <div className="mb-6 flex items-center justify-between">
          <p className="text-muted-foreground">
            Verwalten Sie Ihre Rechnungen
          </p>
          <Link href="/dashboard/invoices/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Neue Rechnung
            </Button>
          </Link>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Alle Rechnungen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="pb-3 text-left font-medium">Nr.</th>
                    <th className="pb-3 text-left font-medium">Kunde</th>
                    <th className="pb-3 text-left font-medium">Titel</th>
                    <th className="pb-3 text-left font-medium">Status</th>
                    <th className="pb-3 text-right font-medium">Betrag</th>
                    <th className="pb-3 text-left font-medium">Fällig</th>
                  </tr>
                </thead>
                <tbody>
                  {invoices.map((invoice) => (
                    <tr key={invoice.id} className="border-b last:border-0">
                      <td className="py-3">{invoice.invoiceNumber}</td>
                      <td className="py-3">{invoice.customer.name}</td>
                      <td className="py-3">{invoice.title}</td>
                      <td className="py-3">
                        <span
                          className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                            invoice.status === 'PAID'
                              ? 'bg-green-100 text-green-800'
                              : invoice.status === 'SENT'
                              ? 'bg-blue-100 text-blue-800'
                              : invoice.status === 'OVERDUE'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {invoice.status}
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        {formatCurrency(invoice.total)}
                      </td>
                      <td className="py-3">{formatDate(invoice.dueDate)}</td>
                    </tr>
                  ))}
                  {invoices.length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-muted-foreground">
                        Noch keine Rechnungen vorhanden
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
