import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { requireAuth } from '@/lib/auth'
import { createInvoiceSchema } from '@/lib/validation/invoice'
import { generateInvoiceNumber } from '@/lib/utils'

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth()

    const invoices = await prisma.invoice.findMany({
      where: { tenantId: user.tenantId },
      include: {
        customer: {
          select: { id: true, name: true, email: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(invoices)
  } catch (error) {
    console.error('Get invoices error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch invoices' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth()
    const body = await request.json()

    const validated = createInvoiceSchema.parse(body)

    // Generate invoice number
    const invoiceCount = await prisma.invoice.count({
      where: { tenantId: user.tenantId },
    })
    const invoiceNumber = generateInvoiceNumber(user.tenant.slug, invoiceCount)

    const invoice = await prisma.invoice.create({
      data: {
        tenantId: user.tenantId,
        customerId: validated.customerId,
        offerId: validated.offerId,
        invoiceNumber,
        title: validated.title,
        description: validated.description,
        items: validated.items,
        subtotal: validated.subtotal,
        taxRate: validated.taxRate,
        taxAmount: validated.taxAmount,
        total: validated.total,
        dueDate: validated.dueDate,
        status: 'DRAFT',
      },
      include: {
        customer: true,
      },
    })

    return NextResponse.json(invoice)
  } catch (error) {
    console.error('Create invoice error:', error)
    return NextResponse.json(
      { error: 'Failed to create invoice' },
      { status: 500 }
    )
  }
}
