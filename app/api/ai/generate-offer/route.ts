import { NextRequest, NextResponse } from 'next/server'
import { generateOffer } from '@/lib/ai'
import { requireAuth } from '@/lib/auth'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth()
    const body = await request.json()

    const { customerName, description } = body

    if (!customerName || !description) {
      return NextResponse.json(
        { error: 'Customer name and description are required' },
        { status: 400 }
      )
    }

    // Get tenant's materials for context
    const materials = await prisma.material.findMany({
      where: {
        tenantId: user.tenantId,
        active: true,
      },
      select: {
        name: true,
        price: true,
        unit: true,
      },
    })

    // Generate offer using AI
    const generatedOffer = await generateOffer({
      customerName,
      description,
      materials,
    })

    return NextResponse.json(generatedOffer)
  } catch (error) {
    console.error('AI generation error:', error)
    return NextResponse.json(
      { error: 'Failed to generate offer' },
      { status: 500 }
    )
  }
}
