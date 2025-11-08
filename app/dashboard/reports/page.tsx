'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download, FileText, Users, IndianRupee, Calendar, TrendingUp } from 'lucide-react'

export default function ReportsPage() {
  const reports = [
    {
      name: 'Member Report',
      description: 'Complete list of all members with subscription details',
      icon: Users,
      color: 'bg-blue-100 text-blue-600',
    },
    {
      name: 'Revenue Report',
      description: 'Detailed revenue breakdown by month, plan, and payment method',
      icon: IndianRupee,
      color: 'bg-green-100 text-green-600',
    },
    {
      name: 'Attendance Report',
      description: 'Member attendance records and statistics',
      icon: Calendar,
      color: 'bg-purple-100 text-purple-600',
    },
    {
      name: 'Expiry Report',
      description: 'List of expiring and expired memberships',
      icon: TrendingUp,
      color: 'bg-orange-100 text-orange-600',
    },
    {
      name: 'Trainer Performance',
      description: 'Trainer statistics, commissions, and client assignments',
      icon: Users,
      color: 'bg-pink-100 text-pink-600',
    },
    {
      name: 'WhatsApp Campaign Report',
      description: 'Message delivery stats and campaign performance',
      icon: FileText,
      color: 'bg-indigo-100 text-indigo-600',
    },
  ]

  const handleExport = (reportName: string, format: string) => {
    alert(`Exporting ${reportName} as ${format}...`)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
        <p className="text-muted-foreground mt-2">
          Generate and export detailed reports for your gym
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground mt-1">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <IndianRupee className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹58k</div>
            <p className="text-xs text-muted-foreground mt-1">
              +8% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Attendance</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">72%</div>
            <p className="text-xs text-muted-foreground mt-1">
              Daily average
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Renewal Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">85%</div>
            <p className="text-xs text-muted-foreground mt-1">
              Last 30 days
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Available Reports */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Available Reports</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {reports.map((report, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${report.color}`}>
                    <report.icon className="h-6 w-6" />
                  </div>
                </div>
                <CardTitle className="mt-4">{report.name}</CardTitle>
                <CardDescription>{report.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleExport(report.name, 'CSV')}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    CSV
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleExport(report.name, 'Excel')}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Excel
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => handleExport(report.name, 'PDF')}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    PDF
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Custom Report Generator */}
      <Card>
        <CardHeader>
          <CardTitle>Custom Report Generator</CardTitle>
          <CardDescription>
            Create custom reports with specific date ranges and filters
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Custom report builder coming soon...</p>
            <p className="text-sm mt-2">
              This feature will allow you to create custom reports with advanced filtering options.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

