import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifyToken } from '@/lib/jwt'
import { DashboardWrapper } from '@/components/dashboard/dashboard-wrapper'
import { Toaster } from 'sonner'
import connectDB from '@/lib/mongodb'
import User from '@/models/User'

async function getCurrentUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  if (!token) {
    return null
  }

  const decoded = verifyToken(token)
  if (!decoded) {
    return null
  }

  try {
    await connectDB()
    const user = await User.findById(decoded.userId).select('name email role')
    if (!user) {
      return null
    }

    return {
      name: user.name,
      email: user.email,
      role: user.role,
    }
  } catch (error) {
    console.error('Error fetching user:', error)
    return null
  }
}

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <>
      <Toaster position="top-right" richColors />
      <DashboardWrapper user={user}>
        {children}
      </DashboardWrapper>
    </>
  )
}

