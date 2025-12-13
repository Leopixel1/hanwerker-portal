import { Header } from '@/components/dashboard/header'
import { StatsCard } from '@/components/dashboard/stats-cards'
import { FileText, Users, Receipt, TrendingUp } from 'lucide-react'
import { prisma } from '@/lib/db'
import { getCurrentUser } from '@/lib/auth'
import { formatCurrency } from '@/lib/utils'

export default async function DashboardPage() {
  const user = await getCurrentUser()

  if (!user) {
    return null
  }

  // Get statistics
  const [offersCount, customersCount, invoicesCount, pendingInvoices] = await Promise.all([
    prisma.offer.count({ where: { tenantId: user.tenantId } }),
    prisma.customer.count({ where: { tenantId: user.tenantId } }),
    prisma.invoice.count({ where: { tenantId: user.tenantId } }),
    prisma.invoice.findMany({
      where: {
        tenantId: user.tenantId,
        status: 'SENT',
      },
      select: { total: true },
    }),
  ])

  const pendingTotal = pendingInvoices.reduce((sum, inv) => sum + inv.total, 0)

  return (
    <div>
      <Header title="Dashboard" />
      <div className="p-8">
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Willkommen zurück!</h3>
          <p className="text-muted-foreground">
            Hier ist eine Übersicht Ihrer aktuellen Geschäftsaktivitäten.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Angebote"
            value={offersCount}
            icon={FileText}
            description="Gesamtanzahl der Angebote"
          />
          <StatsCard
            title="Kunden"
            value={customersCount}
            icon={Users}
            description="Aktive Kunden"
          />
          <StatsCard
            title="Rechnungen"
            value={invoicesCount}
            icon={Receipt}
            description="Gesamtanzahl der Rechnungen"
          />
          <StatsCard
            title="Ausstehend"
            value={formatCurrency(pendingTotal)}
            icon={TrendingUp}
            description="Offene Rechnungen"
          />
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {/* Recent activity cards would go here */}
        </div>
      </div>
    </div>
  )
}
