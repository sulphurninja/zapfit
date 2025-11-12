import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { verifyToken } from '@/lib/jwt'
import { DashboardWrapper } from '@/components/dashboard/dashboard-wrapper'
import { Toaster } from 'sonner'

async function getCurrentUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  if (!token) {
    return null
  }

  const decoded = verifyToken(token)
  return decoded
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
      <DashboardWrapper
        user={{
          name: user.email.split('@')[0],
          email: user.email,
          role: user.role,
        }}
      >
        {children}
      </DashboardWrapper>
    </>
  )
}

