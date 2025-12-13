import { auth } from '@clerk/nextjs'
import { prisma } from './db'

export async function getCurrentUser() {
  const { userId } = auth()

  if (!userId) {
    return null
  }

  const user = await prisma.user.findUnique({
    where: { clerkUserId: userId },
    include: { tenant: true },
  })

  return user
}

export async function requireAuth() {
  const user = await getCurrentUser()

  if (!user) {
    throw new Error('Unauthorized')
  }

  return user
}

export async function requireTenantAccess(tenantId: string) {
  const user = await requireAuth()

  if (user.tenantId !== tenantId) {
    throw new Error('Access denied to this tenant')
  }

  return user
}
