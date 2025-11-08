import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dumbbell, Users, MessageSquare, TrendingUp, Shield, Zap } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Dumbbell className="h-6 w-6 text-primary" />
            </div>
            <span className="text-xl font-bold">ZapFit OS</span>
          </div>
          <div className="flex gap-3">
            <Link href="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-block">
            <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              🚀 The Future of Gym Management
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Manage Your Gym with
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {' '}ZapFit OS
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            All-in-one gym management platform with CRM, billing, attendance tracking, 
            and WhatsApp automation. Built for Indian fitness businesses.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/register">
              <Button size="lg" className="text-lg px-8">
                Start Free Trial
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="text-lg px-8">
              Watch Demo
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            ✨ No credit card required • 14-day free trial • Cancel anytime
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need</h2>
          <p className="text-muted-foreground text-lg">
            Powerful features to automate and grow your fitness business
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="h-12 w-12 bg-blue-100 dark:bg-blue-950 rounded-lg flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle>Member Management</CardTitle>
              <CardDescription>
                Complete CRM for members, leads, and subscriptions with automated renewals
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="h-12 w-12 bg-green-100 dark:bg-green-950 rounded-lg flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-green-600" />
              </div>
              <CardTitle>WhatsApp Automation</CardTitle>
              <CardDescription>
                Auto reminders, follow-ups, and broadcasts via Zaptick.io integration
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="h-12 w-12 bg-purple-100 dark:bg-purple-950 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <CardTitle>Analytics Dashboard</CardTitle>
              <CardDescription>
                Real-time insights on revenue, attendance, and member engagement
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="h-12 w-12 bg-orange-100 dark:bg-orange-950 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-orange-600" />
              </div>
              <CardTitle>Billing & Payments</CardTitle>
              <CardDescription>
                Automated invoicing, payment tracking, and dues management
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="h-12 w-12 bg-pink-100 dark:bg-pink-950 rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-pink-600" />
              </div>
              <CardTitle>Attendance Tracking</CardTitle>
              <CardDescription>
                QR code based check-ins with automated attendance reports
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="h-12 w-12 bg-indigo-100 dark:bg-indigo-950 rounded-lg flex items-center justify-center mb-4">
                <Dumbbell className="h-6 w-6 text-indigo-600" />
              </div>
              <CardTitle>Trainer Management</CardTitle>
              <CardDescription>
                Track trainer performance, schedules, and commission calculations
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-muted-foreground text-lg">
            Choose the plan that fits your gym size
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Starter</CardTitle>
              <CardDescription>For small gyms</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">₹999</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm">✓ Up to 100 members</p>
              <p className="text-sm">✓ CRM & Membership</p>
              <p className="text-sm">✓ Basic WhatsApp</p>
              <p className="text-sm">✓ Reports & Analytics</p>
              <Link href="/register">
                <Button className="w-full mt-4" variant="outline">
                  Start Free Trial
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-primary shadow-lg">
            <CardHeader>
              <div className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full w-fit mb-2">
                POPULAR
              </div>
              <CardTitle>Growth</CardTitle>
              <CardDescription>For medium gyms</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">₹1,999</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm">✓ Up to 500 members</p>
              <p className="text-sm">✓ All Starter features</p>
              <p className="text-sm">✓ WhatsApp Automation</p>
              <p className="text-sm">✓ Priority Support</p>
              <Link href="/register">
                <Button className="w-full mt-4">
                  Start Free Trial
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pro</CardTitle>
              <CardDescription>For chains & franchises</CardDescription>
              <div className="mt-4">
                <span className="text-4xl font-bold">₹4,999</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="text-sm">✓ Unlimited members</p>
              <p className="text-sm">✓ Multi-branch management</p>
              <p className="text-sm">✓ AI & Predictions</p>
              <p className="text-sm">✓ White-label options</p>
              <Link href="/register">
                <Button className="w-full mt-4" variant="outline">
                  Contact Sales
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-none text-white">
          <CardContent className="text-center py-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Gym?
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Join hundreds of gym owners already using ZapFit OS
            </p>
            <Link href="/register">
              <Button size="lg" variant="secondary" className="text-lg px-8">
                Start Your Free Trial
              </Button>
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-sm mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>&copy; 2024 ZapFit OS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
