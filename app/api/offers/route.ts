import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { requireAuth } from '@/lib/auth'
import { createOfferSchema } from '@/lib/validation/offer'
import { generateOfferNumber } from '@/lib/utils'

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth()

    const offers = await prisma.offer.findMany({
      where: { tenantId: user.tenantId },
      include: {
        customer: {
          select: { id: true, name: true, email: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(offers)
  } catch (error) {
    console.error('Get offers error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch offers' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth()
    const body = await request.json()

    const validated = createOfferSchema.parse(body)

    // Generate offer number
    const offerCount = await prisma.offer.count({
      where: { tenantId: user.tenantId },
    })
    const offerNumber = generateOfferNumber(user.tenant.slug, offerCount)

    const offer = await prisma.offer.create({
      data: {
        tenantId: user.tenantId,
        customerId: validated.customerId,
        offerNumber,
        title: validated.title,
        description: validated.description,
        items: validated.items,
        subtotal: validated.subtotal,
        taxRate: validated.taxRate,
        taxAmount: validated.taxAmount,
        total: validated.total,
        validUntil: validated.validUntil,
        status: 'DRAFT',
      },
      include: {
        customer: true,
      },
    })

    return NextResponse.json(offer)
  } catch (error) {
    console.error('Create offer error:', error)
    return NextResponse.json(
      { error: 'Failed to create offer' },
      { status: 500 }
    )
  }
}
