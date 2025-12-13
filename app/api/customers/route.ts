import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { requireAuth } from '@/lib/auth'
import { createCustomerSchema } from '@/lib/validation/customer'

export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth()

    const customers = await prisma.customer.findMany({
      where: { tenantId: user.tenantId },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(customers)
  } catch (error) {
    console.error('Get customers error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch customers' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth()
    const body = await request.json()

    const validated = createCustomerSchema.parse(body)

    const customer = await prisma.customer.create({
      data: {
        tenantId: user.tenantId,
        name: validated.name,
        email: validated.email,
        phone: validated.phone,
        address: validated.address,
        city: validated.city,
        zipCode: validated.zipCode,
        country: validated.country,
        notes: validated.notes,
      },
    })

    return NextResponse.json(customer)
  } catch (error) {
    console.error('Create customer error:', error)
    return NextResponse.json(
      { error: 'Failed to create customer' },
      { status: 500 }
    )
  }
}
