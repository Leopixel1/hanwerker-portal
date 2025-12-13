import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create demo tenant
  const tenant = await prisma.tenant.upsert({
    where: { slug: 'mustermann-handwerk' },
    update: {},
    create: {
      name: 'Mustermann Handwerk GmbH',
      slug: 'mustermann-handwerk',
      subdomain: 'mustermann',
      logo: '/logos/default-logo.png',
      colors: {
        primary: '#3B82F6',
        secondary: '#10B981',
      },
      settings: {
        currency: 'EUR',
        taxRate: 19,
        locale: 'de-DE',
      },
    },
  })

  console.log('✅ Created tenant:', tenant.name)

  // Create demo user
  const user = await prisma.user.upsert({
    where: { id: 'demo-user-1' },
    update: {},
    create: {
      id: 'demo-user-1',
      tenantId: tenant.id,
      email: 'max@mustermann-handwerk.de',
      name: 'Max Mustermann',
      role: 'ADMIN',
    },
  })

  console.log('✅ Created user:', user.name)

  // Create demo customers
  const customers = await Promise.all([
    prisma.customer.create({
      data: {
        tenantId: tenant.id,
        name: 'Familie Schmidt',
        email: 'schmidt@example.com',
        phone: '+49 123 456789',
        address: 'Musterstraße 123',
        city: 'Berlin',
        zipCode: '10115',
      },
    }),
    prisma.customer.create({
      data: {
        tenantId: tenant.id,
        name: 'Firma ABC GmbH',
        email: 'info@abc-firma.de',
        phone: '+49 987 654321',
        address: 'Industrieweg 45',
        city: 'München',
        zipCode: '80331',
      },
    }),
  ])

  console.log('✅ Created customers:', customers.length)

  // Create demo materials
  const materials = await Promise.all([
    prisma.material.create({
      data: {
        tenantId: tenant.id,
        name: 'Fliesen 30x60cm',
        description: 'Hochwertige Keramikfliesen',
        unit: 'm²',
        price: 45.99,
        category: 'Fliesen',
      },
    }),
    prisma.material.create({
      data: {
        tenantId: tenant.id,
        name: 'Fliesenkleber',
        description: 'Flexibler Fliesenkleber C2TE',
        unit: 'kg',
        price: 12.50,
        category: 'Kleber',
      },
    }),
    prisma.material.create({
      data: {
        tenantId: tenant.id,
        name: 'Fugenmasse',
        description: 'Epoxidharz Fugenmasse',
        unit: 'kg',
        price: 18.90,
        category: 'Fugenmaterial',
      },
    }),
  ])

  console.log('✅ Created materials:', materials.length)

  // Create demo offer
  const offer = await prisma.offer.create({
    data: {
      tenantId: tenant.id,
      customerId: customers[0].id,
      offerNumber: 'ANG-2024-001',
      status: 'SENT',
      title: 'Badezimmer Fliesenarbeiten',
      description: 'Komplette Neuverfliesung des Badezimmers',
      items: [
        {
          name: 'Fliesen 30x60cm',
          quantity: 25,
          unit: 'm²',
          price: 45.99,
          total: 1149.75,
        },
        {
          name: 'Fliesenkleber',
          quantity: 50,
          unit: 'kg',
          price: 12.50,
          total: 625.00,
        },
        {
          name: 'Arbeitszeit',
          quantity: 40,
          unit: 'Stunden',
          price: 65.00,
          total: 2600.00,
        },
      ],
      subtotal: 4374.75,
      taxRate: 19,
      taxAmount: 831.20,
      total: 5205.95,
      validUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      sentAt: new Date(),
    },
  })

  console.log('✅ Created offer:', offer.offerNumber)

  console.log('\n🎉 Seed data created successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
