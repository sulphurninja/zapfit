'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { 
  TrendingUp, 
  Users, 
  DollarSign, 
  Download, 
  Rocket,
  Target,
  Zap,
  Crown,
  ArrowRight,
  CheckCircle2,
  BarChart3,
  Calendar,
  Sparkles,
  Play,
  ChevronDown,
  Building2,
  Trophy,
  Star,
  Flame,
  Calculator,
  Settings2,
  IndianRupee
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  ComposedChart,
  Legend
} from 'recharts'

// Animated counter component
function AnimatedCounter({ end, duration = 2000, prefix = '', suffix = '' }: { end: number; duration?: number; prefix?: string; suffix?: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  
  useEffect(() => {
    if (!isInView) return
    
    let startTime: number
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    requestAnimationFrame(animate)
  }, [end, duration, isInView])
  
  return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>
}

// Custom Input Field Component
function CustomInputField({ 
  value, 
  onChange, 
  min, 
  max, 
  step = 1,
  label,
  prefix = '',
  suffix = '',
  color = 'orange',
  helperText = ''
}: { 
  value: number
  onChange: (value: number) => void
  min: number
  max: number
  step?: number
  label: string
  prefix?: string
  suffix?: string
  color?: 'orange' | 'purple' | 'green' | 'blue'
  helperText?: string
}) {
  const [inputValue, setInputValue] = useState(value.toString())
  const [isFocused, setIsFocused] = useState(false)
  const [hasChanged, setHasChanged] = useState(false)
  
  const colorClasses = {
    orange: 'focus:border-orange-500 focus:ring-orange-500/20',
    purple: 'focus:border-purple-500 focus:ring-purple-500/20',
    green: 'focus:border-green-500 focus:ring-green-500/20',
    blue: 'focus:border-blue-500 focus:ring-blue-500/20',
  }
  
  const iconColorClasses = {
    orange: 'text-orange-400',
    purple: 'text-purple-400',
    green: 'text-green-400',
    blue: 'text-blue-400',
  }

  const bgGradientClasses = {
    orange: 'from-orange-500/10 to-orange-500/5',
    purple: 'from-purple-500/10 to-purple-500/5',
    green: 'from-green-500/10 to-green-500/5',
    blue: 'from-blue-500/10 to-blue-500/5',
  }

  useEffect(() => {
    setInputValue(value.toString())
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    setInputValue(val)
    setHasChanged(true)
    
    const numVal = parseFloat(val)
    if (!isNaN(numVal) && numVal >= min && numVal <= max) {
      onChange(numVal)
    }

    // Reset the changed indicator after a short delay
    setTimeout(() => setHasChanged(false), 1000)
  }

  const handleBlur = () => {
    setIsFocused(false)
    const numVal = parseFloat(inputValue)
    if (isNaN(numVal) || numVal < min) {
      setInputValue(min.toString())
      onChange(min)
    } else if (numVal > max) {
      setInputValue(max.toString())
      onChange(max)
    }
  }

  return (
    <motion.div 
      className="space-y-2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center">
        <Label className="text-gray-300 text-sm font-medium">{label}</Label>
        <AnimatePresence>
          {hasChanged && (
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className={`text-xs ${iconColorClasses[color]} flex items-center gap-1`}
            >
              <Sparkles className="h-3 w-3" />
              Updated
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <div className={`relative rounded-xl transition-all duration-200 ${isFocused ? `bg-gradient-to-r ${bgGradientClasses[color]}` : ''}`}>
        {prefix && (
          <span className={`absolute left-4 top-1/2 -translate-y-1/2 ${iconColorClasses[color]} font-bold text-lg pointer-events-none z-10`}>
            {prefix}
          </span>
        )}
        <input
          type="number"
          min={min}
          max={max}
          step={step}
          value={inputValue}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          className={`w-full h-14 ${prefix ? 'pl-8' : 'pl-4'} ${suffix ? 'pr-16' : 'pr-4'} bg-white/5 border-2 border-white/20 rounded-xl text-white text-lg font-bold transition-all duration-200 ${colorClasses[color]} focus:outline-none focus:ring-4 hover:bg-white/10 hover:border-white/30`}
        />
        {suffix && (
          <span className={`absolute right-4 top-1/2 -translate-y-1/2 ${iconColorClasses[color]} font-bold text-lg pointer-events-none z-10`}>
            {suffix}
          </span>
        )}
      </div>
      {helperText && (
        <p className="text-xs text-gray-500 leading-relaxed">{helperText}</p>
      )}
      <div className="flex justify-between text-xs text-gray-600">
        <span>Min: {prefix}{min.toLocaleString()}{suffix}</span>
        <span>Max: {prefix}{max.toLocaleString()}{suffix}</span>
      </div>
    </motion.div>
  )
}

// Dropdown Select Component
function CustomSelect({
  value,
  onChange,
  options,
  label,
}: {
  value: number
  onChange: (value: number) => void
  options: { value: number; label: string }[]
  label: string
}) {
  return (
    <div className="space-y-2">
      <Label className="text-gray-300 text-sm">{label}</Label>
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-12 px-4 bg-white/5 border border-white/20 rounded-xl text-white appearance-none cursor-pointer focus:outline-none focus:border-orange-500/50 transition-colors"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23888'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', backgroundSize: '20px' }}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-[#1a1a2e] text-white">
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default function FBEMarketingPage() {
  const [gymName, setGymName] = useState('')
  const [isDownloading, setIsDownloading] = useState(false)
  const [activeMetric, setActiveMetric] = useState<'daily' | 'weekly' | 'monthly'>('daily')
  
  // Editable configuration state
  const [config, setConfig] = useState({
    // Current metrics (without FBE)
    currentDailyLeads: 3,
    currentWeeklyLeads: 18,
    currentMonthlyLeads: 70,
    currentConversionRate: 15, // percentage
    
    // Pricing
    monthlySubscription: 2500,
    quarterlySubscription: 6500,
    annualSubscription: 22000,
    ptSessionPrice: 800,
    ptMonthlyPackage: 8000,
    
    // FBE Investment
    dailyAdSpend: 200,
    
    // FBE Multipliers (how much FBE improves things)
    fbeLeadMultiplier: 5, // 5x more leads
    fbeConversionBoost: 25, // +25% conversion rate
  })

  // Calculate derived values
  const calculations = useMemo(() => {
    const monthlyAdSpend = config.dailyAdSpend * 30
    
    // Leads with FBE
    const fbeDaily = Math.round(config.currentDailyLeads * config.fbeLeadMultiplier)
    const fbeWeekly = Math.round(config.currentWeeklyLeads * config.fbeLeadMultiplier)
    const fbeMonthly = Math.round(config.currentMonthlyLeads * config.fbeLeadMultiplier)
    
    // Conversion rates
    const currentConvRate = config.currentConversionRate / 100
    const fbeConvRate = Math.min((config.currentConversionRate + config.fbeConversionBoost) / 100, 0.95)
    
    // Monthly conversions
    const currentMonthlyConversions = Math.round(config.currentMonthlyLeads * currentConvRate)
    const fbeMonthlyConversions = Math.round(fbeMonthly * fbeConvRate)
    
    // Revenue calculations (assuming 60% membership, 40% PT)
    const avgMemberValue = config.monthlySubscription * 0.6 + config.ptMonthlyPackage * 0.4
    const currentMonthlyRevenue = currentMonthlyConversions * avgMemberValue
    const fbeMonthlyRevenue = fbeMonthlyConversions * avgMemberValue
    
    // ROI
    const revenueIncrease = fbeMonthlyRevenue - currentMonthlyRevenue
    const roi = monthlyAdSpend > 0 ? Math.round((revenueIncrease / monthlyAdSpend) * 100) / 100 : 0
    
    return {
      monthlyAdSpend,
      fbeDaily,
      fbeWeekly,
      fbeMonthly,
      currentConvRate,
      fbeConvRate,
      currentMonthlyConversions,
      fbeMonthlyConversions,
      currentMonthlyRevenue,
      fbeMonthlyRevenue,
      revenueIncrease,
      roi,
      avgMemberValue,
    }
  }, [config])

  // Generate dynamic chart data based on config
  const dailyLeadsComparison = useMemo(() => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    const variance = [0.8, 1.0, 0.9, 1.1, 1.2, 1.4, 1.3]
    return days.map((day, i) => ({
      day,
      without: Math.round(config.currentDailyLeads * variance[i]),
      with: Math.round(config.currentDailyLeads * config.fbeLeadMultiplier * variance[i]),
    }))
  }, [config.currentDailyLeads, config.fbeLeadMultiplier])

  const revenueData = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const baseRevenue = calculations.currentMonthlyRevenue
    const targetRevenue = calculations.fbeMonthlyRevenue
    
    return months.map((month, i) => {
      // Growth curve - FBE impact grows over time
      const growthFactor = Math.min(1, (i + 1) / 6) // Full impact by month 6
      const fbeRevenue = baseRevenue + (targetRevenue - baseRevenue) * growthFactor * (1 + i * 0.1)
      
      return {
        month,
        without: Math.round(baseRevenue * (1 + (Math.random() - 0.5) * 0.1)),
        with: Math.round(fbeRevenue),
      }
    })
  }, [calculations.currentMonthlyRevenue, calculations.fbeMonthlyRevenue])

  const conversionData = useMemo(() => {
    const weeks = ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8']
    const baseConv = Math.round(config.currentMonthlyLeads * (config.currentConversionRate / 100) / 4)
    const targetConv = Math.round(calculations.fbeMonthly * calculations.fbeConvRate / 4)
    
    return weeks.map((period, i) => {
      const growthFactor = Math.min(1, (i + 1) / 4)
      return {
        period,
        without: Math.round(baseConv * (1 + (Math.random() - 0.5) * 0.3)),
        with: Math.round(baseConv + (targetConv - baseConv) * growthFactor * (1 + i * 0.15)),
      }
    })
  }, [config.currentMonthlyLeads, config.currentConversionRate, calculations.fbeMonthly, calculations.fbeConvRate])

  const metrics = useMemo(() => ({
    daily: { 
      leads: `${config.currentDailyLeads} → ${calculations.fbeDaily}`, 
      conversions: `${Math.round(config.currentDailyLeads * config.currentConversionRate / 100)} → ${Math.round(calculations.fbeDaily * calculations.fbeConvRate)}`,
      growth: `${Math.round((calculations.fbeDaily / config.currentDailyLeads - 1) * 100)}%`
    },
    weekly: { 
      leads: `${config.currentWeeklyLeads} → ${calculations.fbeWeekly}`, 
      conversions: `${Math.round(config.currentWeeklyLeads * config.currentConversionRate / 100)} → ${Math.round(calculations.fbeWeekly * calculations.fbeConvRate)}`,
      growth: `${Math.round((calculations.fbeWeekly / config.currentWeeklyLeads - 1) * 100)}%`
    },
    monthly: { 
      leads: `${config.currentMonthlyLeads} → ${calculations.fbeMonthly}`, 
      conversions: `${calculations.currentMonthlyConversions} → ${calculations.fbeMonthlyConversions}`,
      growth: `${Math.round((calculations.fbeMonthly / config.currentMonthlyLeads - 1) * 100)}%`
    },
  }), [config, calculations])

  const handleDownloadReport = async () => {
    setIsDownloading(true)
    
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const { jsPDF } = await import('jspdf')
    const doc = new jsPDF()
    
    const name = gymName || 'Your Gym'
    
    // Header
    doc.setFillColor(249, 115, 22)
    doc.rect(0, 0, 220, 40, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(24)
    doc.text('FBE Growth Report', 20, 25)
    
    doc.setTextColor(0, 0, 0)
    doc.setFontSize(18)
    doc.text(`${name} - Custom Growth Analysis`, 20, 55)
    
    doc.setFontSize(12)
    doc.text('With Fitness Business Empire (FBE) Premium Plan', 20, 65)
    
    // Current Metrics
    doc.setFontSize(14)
    doc.setTextColor(249, 115, 22)
    doc.text('Your Current Metrics', 20, 85)
    
    doc.setTextColor(0, 0, 0)
    doc.setFontSize(11)
    doc.text(`• Daily Leads: ${config.currentDailyLeads}`, 25, 95)
    doc.text(`• Weekly Leads: ${config.currentWeeklyLeads}`, 25, 105)
    doc.text(`• Monthly Leads: ${config.currentMonthlyLeads}`, 25, 115)
    doc.text(`• Conversion Rate: ${config.currentConversionRate}%`, 25, 125)
    
    // Projected with FBE
    doc.setTextColor(249, 115, 22)
    doc.text('Projected with FBE', 20, 145)
    
    doc.setTextColor(0, 0, 0)
    doc.text(`• Daily Leads: ${calculations.fbeDaily} (${config.fbeLeadMultiplier}x increase)`, 25, 155)
    doc.text(`• Weekly Leads: ${calculations.fbeWeekly}`, 25, 165)
    doc.text(`• Monthly Leads: ${calculations.fbeMonthly}`, 25, 175)
    doc.text(`• Conversion Rate: ${Math.round(calculations.fbeConvRate * 100)}% (+${config.fbeConversionBoost}%)`, 25, 185)
    doc.text(`• Monthly Conversions: ${calculations.fbeMonthlyConversions} (from ${calculations.currentMonthlyConversions})`, 25, 195)
    
    // Investment & ROI
    doc.setTextColor(249, 115, 22)
    doc.text('Investment & ROI', 20, 215)
    
    doc.setTextColor(0, 0, 0)
    doc.text(`• Daily Ad Spend: ₹${config.dailyAdSpend}`, 25, 225)
    doc.text(`• Monthly Ad Spend: ₹${calculations.monthlyAdSpend.toLocaleString()}`, 25, 235)
    doc.text(`• Current Monthly Revenue: ₹${calculations.currentMonthlyRevenue.toLocaleString()}`, 25, 245)
    doc.text(`• Projected Monthly Revenue: ₹${calculations.fbeMonthlyRevenue.toLocaleString()}`, 25, 255)
    doc.text(`• Revenue Increase: ₹${calculations.revenueIncrease.toLocaleString()}`, 25, 265)
    doc.text(`• ROI: ${calculations.roi}x (${Math.round(calculations.roi * 100)}%)`, 25, 275)
    
    // Footer
    doc.setFontSize(10)
    doc.setTextColor(128, 128, 128)
    doc.text('Generated by ZapFit FBE • www.zapfit.in', 20, 290)
    
    doc.save(`${name.replace(/\s+/g, '_')}_FBE_Report.pdf`)
    setIsDownloading(false)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white overflow-hidden">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-orange-500/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-purple-500/15 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-600/10 rounded-full blur-[150px]" />
      </div>
      
      {/* Grid pattern overlay */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }} />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="container mx-auto max-w-7xl">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/20 to-purple-500/20 border border-orange-500/30 px-6 py-2 rounded-full mb-8"
            >
              <Flame className="h-4 w-4 text-orange-400" />
              <span className="text-sm font-medium bg-gradient-to-r from-orange-300 to-purple-300 bg-clip-text text-transparent">
                The Inner Community That 10X Your Gym
              </span>
              <Sparkles className="h-4 w-4 text-purple-400" />
            </motion.div>

            {/* Main headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold mb-6 leading-[1.1]">
              <span className="block text-white/90">Turn ₹{calculations.monthlyAdSpend.toLocaleString()}/month</span>
              <span className="block bg-gradient-to-r from-orange-400 via-orange-500 to-purple-500 bg-clip-text text-transparent">
                Into ₹{calculations.fbeMonthlyRevenue.toLocaleString()}+ Revenue
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-gray-400 max-w-3xl mx-auto mb-8">
              Discover how <span className="text-orange-400 font-semibold">Fitness Business Empire (FBE)</span> transforms your gym's lead generation, conversions, and profits with our proven system.
            </p>

            {/* FBE Image */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="relative max-w-4xl mx-auto mb-12"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/30 to-purple-500/30 rounded-3xl blur-3xl" />
              <div className="relative bg-gradient-to-r from-orange-500/10 to-purple-500/10 border border-white/10 rounded-3xl p-2 backdrop-blur-sm">
                <img 
                  src="/fbe.jpeg" 
                  alt="Fitness Business Empire" 
                  className="w-full h-auto rounded-2xl shadow-2xl"
                />
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-orange-500 to-purple-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg shadow-orange-500/30">
                🔥 The FBE Advantage
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link href="/register">
                <Button size="lg" className="text-lg px-10 h-14 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-full shadow-lg shadow-orange-500/30 group">
                  Start Your Transformation
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button 
                size="lg" 
                variant="outline" 
                className="text-lg px-10 h-14 rounded-full text-black border-white/20 hover:bg-white/5 group"
                onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Calculator className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                Calculate Your Growth
              </Button>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center gap-2 cursor-pointer"
              onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <span className="text-sm text-gray-500">Scroll to customize</span>
              <ChevronDown className="h-6 w-6 text-orange-400" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Revenue Race Animation */}
      <section className="relative py-24 px-4 bg-gradient-to-b from-transparent via-orange-500/5 to-transparent">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 px-6 py-2 rounded-full mb-6">
              <Flame className="h-4 w-4 text-orange-400" />
              <span className="text-sm font-medium text-orange-300">See The Difference In Real-Time</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              You vs Your <span className="text-orange-400">Competition</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Watch how FBE puts you miles ahead of gyms stuck with traditional marketing
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-sm"
          >
            <div className="space-y-8">
              {/* Your Gym with FBE */}
              <div className="relative">
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                      <Crown className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="text-lg font-bold text-white">Your Gym (With FBE)</div>
                      <div className="text-sm text-gray-400">₹{calculations.fbeMonthlyRevenue.toLocaleString()}/month</div>
                    </div>
                  </div>
                </div>
                <div className="relative h-16 bg-white/5 rounded-xl overflow-hidden">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-400 rounded-xl flex items-center justify-end pr-4"
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
                  >
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 2, duration: 0.3 }}
                      className="flex items-center gap-2"
                    >
                      <Rocket className="h-6 w-6 text-white" />
                      <span className="text-xl font-bold text-white">{calculations.fbeMonthlyConversions} members</span>
                    </motion.div>
                  </motion.div>
                </div>
              </div>

              {/* Competitor Gyms */}
              {[
                { name: 'Gym A (Traditional Marketing)', revenue: calculations.currentMonthlyRevenue * 0.8, conversions: calculations.currentMonthlyConversions * 0.8, width: '45%', delay: 0.6 },
                { name: 'Gym B (Social Media Only)', revenue: calculations.currentMonthlyRevenue * 0.6, conversions: calculations.currentMonthlyConversions * 0.6, width: '35%', delay: 0.7 },
                { name: 'Gym C (Word of Mouth)', revenue: calculations.currentMonthlyRevenue * 0.4, conversions: calculations.currentMonthlyConversions * 0.4, width: '25%', delay: 0.8 },
              ].map((gym, i) => (
                <div key={gym.name} className="relative">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                        <Users className="h-6 w-6 text-gray-400" />
                      </div>
                      <div>
                        <div className="text-lg font-bold text-gray-400">{gym.name}</div>
                        <div className="text-sm text-gray-500">₹{Math.round(gym.revenue).toLocaleString()}/month</div>
                      </div>
                    </div>
                  </div>
                  <div className="relative h-16 bg-white/5 rounded-xl overflow-hidden">
                    <motion.div
                      className="absolute inset-y-0 left-0 bg-gradient-to-r from-gray-600 to-gray-700 rounded-xl flex items-center justify-end pr-4"
                      initial={{ width: 0 }}
                      whileInView={{ width: gym.width }}
                      viewport={{ once: true }}
                      transition={{ duration: 2, delay: gym.delay, ease: "easeOut" }}
                    >
                      <span className="text-sm font-bold text-gray-300">{Math.round(gym.conversions)} members</span>
                    </motion.div>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats comparison */}
            <div className="mt-8 pt-8 border-t border-white/10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl">
                  <div className="text-3xl font-bold text-orange-400">{config.fbeLeadMultiplier}x</div>
                  <div className="text-sm text-gray-400">More Leads</div>
                </div>
                <div className="text-center p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                  <div className="text-3xl font-bold text-green-400">{Math.round(calculations.roi)}x</div>
                  <div className="text-sm text-gray-400">ROI</div>
                </div>
                <div className="text-center p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl">
                  <div className="text-3xl font-bold text-purple-400">+{config.fbeConversionBoost}%</div>
                  <div className="text-sm text-gray-400">Conversion</div>
                </div>
                <div className="text-center p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                  <div className="text-3xl font-bold text-yellow-400">#{1}</div>
                  <div className="text-sm text-gray-400">In Your Area</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Growth Potential Score */}
      <section className="relative py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 px-6 py-2 rounded-full mb-6">
              <Trophy className="h-4 w-4 text-green-400" />
              <span className="text-sm font-medium text-green-300">Your Growth Potential</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Your Gym's <span className="text-green-400">Potential Score</span>
            </h2>
            <p className="text-xl text-gray-400">
              Based on your inputs, here's your growth potential with FBE
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-white/10 to-white/5 border-2 border-white/20 rounded-3xl p-12 backdrop-blur-xl text-center relative overflow-hidden"
          >
            {/* Background animation */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-green-500/20 to-transparent rounded-full blur-3xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </div>

            <div className="relative z-10">
              {/* Score Circle */}
              <motion.div
                className="mx-auto w-64 h-64 mb-8 relative"
                initial={{ rotate: -90 }}
                whileInView={{ rotate: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeOut" }}
              >
                <svg className="w-full h-full" viewBox="0 0 200 200">
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    stroke="rgba(255,255,255,0.1)"
                    strokeWidth="20"
                  />
                  <motion.circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="20"
                    strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 90}`}
                    initial={{ strokeDashoffset: 2 * Math.PI * 90 }}
                    whileInView={{ strokeDashoffset: 2 * Math.PI * 90 * (1 - Math.min(calculations.roi / 10, 0.95)) }}
                    viewport={{ once: true }}
                    transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
                    transform="rotate(-90 100 100)"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#22c55e" />
                      <stop offset="50%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#14b8a6" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.5, type: "spring" }}
                    className="text-6xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent"
                  >
                    {Math.min(Math.round(calculations.roi * 10), 95)}
                  </motion.div>
                  <div className="text-sm text-gray-400 mt-2">out of 100</div>
                </div>
              </motion.div>

              {/* Score Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 2 }}
              >
                <h3 className="text-3xl font-bold mb-4">
                  {calculations.roi >= 5 ? '🔥 EXPLOSIVE GROWTH POTENTIAL!' :
                   calculations.roi >= 3 ? '🚀 HIGH GROWTH POTENTIAL!' :
                   '📈 GOOD GROWTH POTENTIAL!'}
                </h3>
                <p className="text-gray-400 text-lg mb-6">
                  Your gym could grow <span className="text-green-400 font-bold">{calculations.roi}x faster</span> with FBE compared to traditional methods
                </p>
                
                {/* Key metrics */}
                <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
                  <div className="p-4 bg-black/30 rounded-xl">
                    <div className="text-2xl font-bold text-green-400">+{calculations.fbeMonthly - config.currentMonthlyLeads}</div>
                    <div className="text-xs text-gray-400">Extra Leads/mo</div>
                  </div>
                  <div className="p-4 bg-black/30 rounded-xl">
                    <div className="text-2xl font-bold text-green-400">+{calculations.fbeMonthlyConversions - calculations.currentMonthlyConversions}</div>
                    <div className="text-xs text-gray-400">Extra Members/mo</div>
                  </div>
                  <div className="p-4 bg-black/30 rounded-xl">
                    <div className="text-2xl font-bold text-green-400">+₹{Math.round((calculations.revenueIncrease / 1000))}k</div>
                    <div className="text-xs text-gray-400">Extra Revenue/mo</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Calculator Section */}
      <section id="calculator" className="relative py-24 px-4 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-orange-500/20 border border-purple-500/30 px-6 py-2 rounded-full mb-6">
              <Calculator className="h-4 w-4 text-purple-400" />
              <span className="text-sm font-medium text-purple-300">Interactive Growth Calculator</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Customize <span className="text-orange-400">Your</span> Projections
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Enter your gym's current metrics and see real-time projections of what FBE can do for you
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Column - Input Controls */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Current Metrics Card */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-orange-500/20 rounded-lg">
                    <BarChart3 className="h-5 w-5 text-orange-400" />
                  </div>
                  <h3 className="text-xl font-semibold">Your Current Metrics</h3>
                </div>
                
                <div className="space-y-6">
                  <CustomInputField
                    value={config.currentDailyLeads}
                    onChange={(v) => setConfig(c => ({ 
                      ...c, 
                      currentDailyLeads: v,
                      currentWeeklyLeads: v * 6,
                      currentMonthlyLeads: v * 25
                    }))}
                    min={1}
                    max={50}
                    label="Daily Leads (Without FBE)"
                    color="orange"
                    helperText="Average number of leads you get per day currently"
                  />
                  
                  <CustomInputField
                    value={config.currentConversionRate}
                    onChange={(v) => setConfig(c => ({ ...c, currentConversionRate: v }))}
                    min={5}
                    max={50}
                    label="Current Conversion Rate"
                    suffix="%"
                    color="purple"
                    helperText="Percentage of leads that become paying members"
                  />
                </div>
              </div>

              {/* Pricing Card */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <IndianRupee className="h-5 w-5 text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold">Your Pricing Structure</h3>
                </div>
                
                <div className="space-y-6">
                  <CustomInputField
                    value={config.monthlySubscription}
                    onChange={(v) => setConfig(c => ({ 
                      ...c, 
                      monthlySubscription: v,
                      quarterlySubscription: Math.round(v * 2.6),
                      annualSubscription: Math.round(v * 9)
                    }))}
                    min={1000}
                    max={15000}
                    step={100}
                    label="Monthly Membership Fee"
                    prefix="₹"
                    color="green"
                    helperText="Your standard monthly membership price"
                  />
                  
                  <CustomInputField
                    value={config.ptMonthlyPackage}
                    onChange={(v) => setConfig(c => ({ 
                      ...c, 
                      ptMonthlyPackage: v,
                      ptSessionPrice: Math.round(v / 12)
                    }))}
                    min={3000}
                    max={30000}
                    step={500}
                    label="PT Monthly Package"
                    prefix="₹"
                    color="purple"
                    helperText="Personal training monthly package price"
                  />
                </div>
              </div>

              {/* FBE Investment Card */}
              <div className="bg-gradient-to-br from-orange-500/10 to-purple-500/10 border border-orange-500/30 rounded-2xl p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-orange-500/30 rounded-lg">
                    <Rocket className="h-5 w-5 text-orange-400" />
                  </div>
                  <h3 className="text-xl font-semibold">FBE Investment</h3>
                  <span className="ml-auto text-xs bg-orange-500/20 text-orange-300 px-2 py-1 rounded-full">PREMIUM</span>
                </div>
                
                <div className="space-y-6">
                  <CustomInputField
                    value={config.dailyAdSpend}
                    onChange={(v) => setConfig(c => ({ ...c, dailyAdSpend: v }))}
                    min={100}
                    max={2000}
                    step={50}
                    label="Daily Ad Spend"
                    prefix="₹"
                    color="orange"
                    helperText="How much you want to invest daily in Facebook/Instagram ads"
                  />
                  
                  <div className="p-5 bg-gradient-to-r from-orange-500/10 to-orange-500/5 border border-orange-500/20 rounded-xl">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300 font-medium">Monthly Ad Budget</span>
                      <div className="flex items-center gap-2">
                        <span className="text-3xl font-bold text-orange-400">₹{calculations.monthlyAdSpend.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <CustomInputField
                    value={config.fbeLeadMultiplier}
                    onChange={(v) => setConfig(c => ({ ...c, fbeLeadMultiplier: v }))}
                    min={2}
                    max={10}
                    step={0.5}
                    label="FBE Lead Multiplier"
                    suffix="x"
                    color="orange"
                    helperText="How many times FBE will multiply your current leads"
                  />

                  <CustomInputField
                    value={config.fbeConversionBoost}
                    onChange={(v) => setConfig(c => ({ ...c, fbeConversionBoost: v }))}
                    min={10}
                    max={50}
                    label="Conversion Rate Boost"
                    prefix="+"
                    suffix="%"
                    color="purple"
                    helperText="Additional conversion rate improvement with FBE"
                  />
                </div>
              </div>
            </motion.div>

            {/* Right Column - Results Display */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Results Summary Card */}
              <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-2xl p-6 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-green-500/30 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold">Your Projected Results</h3>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-black/30 rounded-xl text-center">
                    <div className="text-sm text-gray-400 mb-1">Monthly Leads</div>
                    <div className="text-2xl font-bold">
                      <span className="text-gray-500 line-through text-lg">{config.currentMonthlyLeads}</span>
                      <span className="text-green-400 ml-2">{calculations.fbeMonthly}</span>
                    </div>
                  </div>
                  <div className="p-4 bg-black/30 rounded-xl text-center">
                    <div className="text-sm text-gray-400 mb-1">Monthly Conversions</div>
                    <div className="text-2xl font-bold">
                      <span className="text-gray-500 line-through text-lg">{calculations.currentMonthlyConversions}</span>
                      <span className="text-green-400 ml-2">{calculations.fbeMonthlyConversions}</span>
                    </div>
                  </div>
                  <div className="p-4 bg-black/30 rounded-xl text-center">
                    <div className="text-sm text-gray-400 mb-1">Conversion Rate</div>
                    <div className="text-2xl font-bold">
                      <span className="text-gray-500 line-through text-lg">{config.currentConversionRate}%</span>
                      <span className="text-purple-400 ml-2">{Math.round(calculations.fbeConvRate * 100)}%</span>
                    </div>
                  </div>
                  <div className="p-4 bg-black/30 rounded-xl text-center">
                    <div className="text-sm text-gray-400 mb-1">Lead Growth</div>
                    <div className="text-2xl font-bold text-orange-400">
                      {config.fbeLeadMultiplier}x
                    </div>
                  </div>
                </div>

                {/* Revenue Comparison */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-4 bg-black/30 rounded-xl">
                    <span className="text-gray-400">Current Monthly Revenue</span>
                    <span className="font-bold text-gray-400">₹{calculations.currentMonthlyRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-green-500/20 rounded-xl border border-green-500/30">
                    <span className="text-gray-300">Projected Monthly Revenue</span>
                    <span className="font-bold text-green-400 text-xl">₹{calculations.fbeMonthlyRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gradient-to-r from-orange-500/20 to-purple-500/20 rounded-xl border border-orange-500/30">
                    <span className="text-white font-medium">Revenue Increase</span>
                    <span className="font-bold text-white text-xl">+₹{calculations.revenueIncrease.toLocaleString()}</span>
                  </div>
                </div>

                {/* ROI Display */}
                <div className="mt-6 p-6 bg-gradient-to-r from-orange-500/30 to-purple-500/30 rounded-xl border border-orange-500/40 text-center">
                  <div className="text-sm text-gray-300 mb-2">Return on Investment</div>
                  <div className="text-5xl font-bold bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent">
                    {calculations.roi}x ROI
                  </div>
                  <div className="text-sm text-gray-400 mt-2">
                    ₹{calculations.monthlyAdSpend.toLocaleString()} investment → ₹{calculations.revenueIncrease.toLocaleString()} return
                  </div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                  <Users className="h-6 w-6 text-orange-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-orange-400">{calculations.fbeDaily}</div>
                  <div className="text-xs text-gray-400">Daily Leads</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                  <Target className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-400">{calculations.fbeWeekly}</div>
                  <div className="text-xs text-gray-400">Weekly Leads</div>
                </div>
                <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                  <Trophy className="h-6 w-6 text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-400">{calculations.fbeMonthly}</div>
                  <div className="text-xs text-gray-400">Monthly Leads</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dynamic Charts Section */}
      <section id="metrics" className="relative py-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Your <span className="text-orange-400">Growth</span> Visualized
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Watch the charts update as you adjust your metrics above
            </p>
          </motion.div>

          {/* Time Period Toggle */}
          <div className="flex justify-center gap-2 mb-12">
            {(['daily', 'weekly', 'monthly'] as const).map((period) => (
              <button
                key={period}
                onClick={() => setActiveMetric(period)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeMetric === period
                    ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/30'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </button>
            ))}
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-orange-500/10 to-orange-500/5 border border-orange-500/20 rounded-2xl p-6 backdrop-blur-sm"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-orange-500/20 rounded-xl">
                  <Users className="h-6 w-6 text-orange-400" />
                </div>
                <span className="text-gray-400">Leads {activeMetric}</span>
              </div>
              <div className="text-3xl font-bold text-orange-400 mb-2">{metrics[activeMetric].leads}</div>
              <div className="flex items-center gap-2 text-green-400 text-sm">
                <TrendingUp className="h-4 w-4" />
                <span>{metrics[activeMetric].growth} increase with FBE</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border border-purple-500/20 rounded-2xl p-6 backdrop-blur-sm"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-purple-500/20 rounded-xl">
                  <Target className="h-6 w-6 text-purple-400" />
                </div>
                <span className="text-gray-400">Conversions {activeMetric}</span>
              </div>
              <div className="text-3xl font-bold text-purple-400 mb-2">{metrics[activeMetric].conversions}</div>
              <div className="flex items-center gap-2 text-green-400 text-sm">
                <TrendingUp className="h-4 w-4" />
                <span>+{config.fbeConversionBoost}% higher close rate</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/20 rounded-2xl p-6 backdrop-blur-sm"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-green-500/20 rounded-xl">
                  <DollarSign className="h-6 w-6 text-green-400" />
                </div>
                <span className="text-gray-400">Revenue Growth</span>
              </div>
              <div className="text-3xl font-bold text-green-400 mb-2">{calculations.roi}X</div>
              <div className="flex items-center gap-2 text-green-400 text-sm">
                <TrendingUp className="h-4 w-4" />
                <span>ROI on ad spend</span>
              </div>
            </motion.div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Leads Comparison Chart */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm"
            >
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-orange-400" />
                Daily Leads: Before vs After FBE
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dailyLeadsComparison}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="day" stroke="#888" />
                  <YAxis stroke="#888" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0,0,0,0.9)', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px'
                    }} 
                  />
                  <Bar dataKey="without" fill="#666" name="Without FBE" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="with" fill="#f97316" name="With FBE" radius={[4, 4, 0, 0]} />
                  <Legend />
                </BarChart>
              </ResponsiveContainer>
            </motion.div>

            {/* Revenue Growth Chart */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm"
            >
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-green-400" />
                Revenue Growth Over 12 Months
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id="colorWith" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorWithout" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#666" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#666" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="month" stroke="#888" />
                  <YAxis stroke="#888" tickFormatter={(value) => `₹${(value/1000)}k`} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(0,0,0,0.9)', 
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '12px'
                    }}
                    formatter={(value: number) => [`₹${value.toLocaleString()}`, '']}
                  />
                  <Area type="monotone" dataKey="without" stroke="#666" fill="url(#colorWithout)" name="Without FBE" />
                  <Area type="monotone" dataKey="with" stroke="#22c55e" fill="url(#colorWith)" name="With FBE" strokeWidth={2} />
                  <Legend />
                </AreaChart>
              </ResponsiveContainer>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 30-Day Transformation Preview */}
      <section className="relative py-24 px-4 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 px-6 py-2 rounded-full mb-6">
              <Calendar className="h-4 w-4 text-blue-400" />
              <span className="text-sm font-medium text-blue-300">See Your First 30 Days</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Your <span className="text-blue-400">First Month</span> Transformation
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Watch your gym grow day by day with FBE's proven system
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Live Counter Dashboard */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-3xl p-8 backdrop-blur-sm"
            >
              <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                Live Progress Tracking
              </h3>

              <div className="space-y-6">
                {/* Daily Leads Counter */}
                <div className="p-6 bg-gradient-to-r from-orange-500/10 to-orange-500/5 border border-orange-500/30 rounded-xl">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Daily Leads</div>
                      <div className="text-5xl font-bold text-orange-400">
                        <AnimatedCounter end={calculations.fbeDaily} duration={2000} />
                      </div>
                    </div>
                    <TrendingUp className="h-8 w-8 text-orange-400" />
                  </div>
                  <div className="flex items-center gap-2 text-sm text-green-400">
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      ▲
                    </motion.div>
                    <span>+{Math.round((calculations.fbeDaily / config.currentDailyLeads - 1) * 100)}% vs current</span>
                  </div>
                </div>

                {/* Monthly Members Counter */}
                <div className="p-6 bg-gradient-to-r from-purple-500/10 to-purple-500/5 border border-purple-500/30 rounded-xl">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="text-sm text-gray-400 mb-1">New Members (30 days)</div>
                      <div className="text-5xl font-bold text-purple-400">
                        <AnimatedCounter end={calculations.fbeMonthlyConversions} duration={2500} />
                      </div>
                    </div>
                    <Users className="h-8 w-8 text-purple-400" />
                  </div>
                  <div className="flex items-center gap-2 text-sm text-green-400">
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                    >
                      ▲
                    </motion.div>
                    <span>+{calculations.fbeMonthlyConversions - calculations.currentMonthlyConversions} more than usual</span>
                  </div>
                </div>

                {/* Revenue Counter */}
                <div className="p-6 bg-gradient-to-r from-green-500/10 to-green-500/5 border border-green-500/30 rounded-xl">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="text-sm text-gray-400 mb-1">Monthly Revenue</div>
                      <div className="text-4xl font-bold text-green-400">
                        ₹<AnimatedCounter end={calculations.fbeMonthlyRevenue} duration={3000} />
                      </div>
                    </div>
                    <DollarSign className="h-8 w-8 text-green-400" />
                  </div>
                  <div className="flex items-center gap-2 text-sm text-green-400">
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                    >
                      ▲
                    </motion.div>
                    <span>+₹{calculations.revenueIncrease.toLocaleString()} extra revenue</span>
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-8 p-6 bg-black/30 rounded-xl">
                <div className="flex justify-between text-sm mb-3">
                  <span className="text-gray-400">Month Progress</span>
                  <span className="text-green-400 font-bold">Day 30 Complete!</span>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 3, ease: "easeOut" }}
                  />
                </div>
              </div>
            </motion.div>

            {/* Timeline View */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-3xl p-8 backdrop-blur-sm"
            >
              <h3 className="text-2xl font-bold mb-8">Week-by-Week Breakdown</h3>

              <div className="space-y-6">
                {[
                  { week: 1, leads: Math.round(calculations.fbeWeekly * 0.7), members: Math.round(calculations.fbeMonthlyConversions * 0.2), revenue: Math.round(calculations.fbeMonthlyRevenue * 0.2), status: 'Setup & Launch' },
                  { week: 2, leads: Math.round(calculations.fbeWeekly * 0.9), members: Math.round(calculations.fbeMonthlyConversions * 0.25), revenue: Math.round(calculations.fbeMonthlyRevenue * 0.25), status: 'Momentum Building' },
                  { week: 3, leads: Math.round(calculations.fbeWeekly), members: Math.round(calculations.fbeMonthlyConversions * 0.27), revenue: Math.round(calculations.fbeMonthlyRevenue * 0.27), status: 'Full Speed' },
                  { week: 4, leads: Math.round(calculations.fbeWeekly * 1.1), members: Math.round(calculations.fbeMonthlyConversions * 0.28), revenue: Math.round(calculations.fbeMonthlyRevenue * 0.28), status: 'Peak Performance' },
                ].map((weekData, i) => (
                  <motion.div
                    key={weekData.week}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.2 }}
                    className="relative pl-8 border-l-2 border-blue-500/30"
                  >
                    <motion.div
                      className="absolute -left-3 top-0 w-6 h-6 bg-blue-500 rounded-full border-4 border-[#0a0a0f]"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.2 + 0.3, type: "spring" }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-blue-400 rounded-full"
                        animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                        transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
                      />
                    </motion.div>

                    <div className="pb-6">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl font-bold text-blue-400">Week {weekData.week}</span>
                        <span className="text-sm text-gray-400 bg-white/5 px-3 py-1 rounded-full">{weekData.status}</span>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-3">
                        <div className="p-3 bg-orange-500/10 rounded-lg">
                          <div className="text-sm text-gray-400">Leads</div>
                          <div className="text-xl font-bold text-orange-400">{weekData.leads}</div>
                        </div>
                        <div className="p-3 bg-purple-500/10 rounded-lg">
                          <div className="text-sm text-gray-400">Members</div>
                          <div className="text-xl font-bold text-purple-400">{weekData.members}</div>
                        </div>
                        <div className="p-3 bg-green-500/10 rounded-lg">
                          <div className="text-sm text-gray-400">Revenue</div>
                          <div className="text-lg font-bold text-green-400">₹{Math.round(weekData.revenue / 1000)}k</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Total Summary */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1 }}
                className="mt-8 p-6 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-2 border-blue-500/40 rounded-xl"
              >
                <div className="text-center">
                  <div className="text-sm text-gray-300 mb-2">Total After 30 Days</div>
                  <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent mb-1">
                    ₹{calculations.fbeMonthlyRevenue.toLocaleString()}
                  </div>
                  <div className="text-sm text-green-400 flex items-center justify-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    <span>That's {calculations.roi}x ROI on your ad spend!</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Social Proof Ticker */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 bg-gradient-to-r from-orange-500/10 via-purple-500/10 to-orange-500/10 border border-orange-500/20 rounded-2xl p-6"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="w-12 h-12 bg-gradient-to-br from-orange-500 to-purple-500 rounded-full flex items-center justify-center"
                >
                  <Zap className="h-6 w-6 text-white" />
                </motion.div>
                <div>
                  <div className="text-sm text-gray-400">🔥 Live Activity</div>
                  <div className="text-lg font-bold text-white">
                    <AnimatedCounter end={47} duration={1000} /> gym owners viewing this page right now
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">
                    <AnimatedCounter end={12} duration={1500} />
                  </div>
                  <div className="text-xs text-gray-400">Joined Today</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-400">
                    <AnimatedCounter end={320} duration={2000} prefix="" suffix="+" />
                  </div>
                  <div className="text-xs text-gray-400">Total Gyms</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">
                    <AnimatedCounter end={8} duration={1000} />
                  </div>
                  <div className="text-xs text-gray-400">Spots Left</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Conversion Tracker */}
      <section className="relative py-24 px-4 bg-gradient-to-b from-transparent via-orange-500/5 to-transparent">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              <span className="text-orange-400">Conversion</span> Explosion
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Watch your conversion rates skyrocket week after week
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-sm"
          >
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart data={conversionData}>
                <defs>
                  <linearGradient id="conversionGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="period" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0,0,0,0.9)', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px'
                  }} 
                />
                <Legend />
                <Area type="monotone" dataKey="with" fill="url(#conversionGradient)" stroke="#f97316" strokeWidth={3} name="With FBE" />
                <Line type="monotone" dataKey="without" stroke="#666" strokeWidth={2} strokeDasharray="5 5" name="Without FBE" dot={{ fill: '#666' }} />
              </ComposedChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {[
              { label: 'Daily Conversions', value: Math.round(calculations.fbeDaily * calculations.fbeConvRate), suffix: '+', icon: Target },
              { label: 'Weekly Conversions', value: Math.round(calculations.fbeWeekly * calculations.fbeConvRate), suffix: '+', icon: TrendingUp },
              { label: 'Monthly Conversions', value: calculations.fbeMonthlyConversions, suffix: '+', icon: Trophy },
              { label: 'Close Rate', value: Math.round(calculations.fbeConvRate * 100), suffix: '%', icon: Star },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6 bg-white/5 border border-white/10 rounded-xl"
              >
                <stat.icon className="h-8 w-8 text-orange-400 mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="relative py-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Simple <span className="text-orange-400">Investment</span>, Massive Returns
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Your customers pay for gym memberships and PT. You pay for growth.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Subscription Pricing */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8"
            >
              <div className="text-orange-400 font-medium mb-2">Your Revenue Sources</div>
              <h3 className="text-2xl font-bold mb-6">Subscription Pricing</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
                  <span className="text-gray-400">Monthly Membership</span>
                  <span className="font-bold text-green-400">₹{config.monthlySubscription.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
                  <span className="text-gray-400">Quarterly</span>
                  <span className="font-bold text-green-400">₹{config.quarterlySubscription.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
                  <span className="text-gray-400">Annual</span>
                  <span className="font-bold text-green-400">₹{config.annualSubscription.toLocaleString()}</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4 text-center">* Adjust these values in the calculator above</p>
            </motion.div>

            {/* PT Pricing */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8"
            >
              <div className="text-purple-400 font-medium mb-2">High-Ticket Revenue</div>
              <h3 className="text-2xl font-bold mb-6">Personal Training</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
                  <span className="text-gray-400">Per Session</span>
                  <span className="font-bold text-purple-400">₹{config.ptSessionPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
                  <span className="text-gray-400">Monthly Package</span>
                  <span className="font-bold text-purple-400">₹{config.ptMonthlyPackage.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl">
                  <span className="text-gray-400">Avg Member Value</span>
                  <span className="font-bold text-purple-400">₹{Math.round(calculations.avgMemberValue).toLocaleString()}</span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4 text-center">* Adjust these values in the calculator above</p>
            </motion.div>

            {/* FBE Investment */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-orange-500/20 to-purple-500/20 border-2 border-orange-500/40 rounded-2xl p-8 relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                PREMIUM
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Crown className="h-5 w-5 text-orange-400" />
                <span className="text-orange-400 font-medium">FBE Investment</span>
              </div>
              <h3 className="text-2xl font-bold mb-6">Your Growth Engine</h3>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center p-4 bg-black/30 rounded-xl">
                  <span className="text-gray-400">Daily Ad Spend</span>
                  <span className="font-bold text-orange-400">₹{config.dailyAdSpend}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-black/30 rounded-xl">
                  <span className="text-gray-400">Monthly Ad Spend</span>
                  <span className="font-bold text-orange-400">₹{calculations.monthlyAdSpend.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-green-500/20 rounded-xl border border-green-500/30">
                  <span className="text-gray-300">Expected Return</span>
                  <span className="font-bold text-green-400">₹{calculations.revenueIncrease.toLocaleString()}</span>
                </div>
              </div>
              <div className="text-center p-4 bg-gradient-to-r from-orange-500/20 to-purple-500/20 rounded-xl border border-orange-500/30">
                <div className="text-3xl font-bold text-white mb-1">{calculations.roi}X ROI</div>
                <div className="text-sm text-gray-400">Return on Investment</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Download Report Section */}
      <section className="relative py-24 px-4 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-3xl p-8 sm:p-12 backdrop-blur-xl text-center"
          >
            <div className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-500/30 px-4 py-2 rounded-full mb-6">
              <Download className="h-4 w-4 text-orange-400" />
              <span className="text-sm font-medium text-orange-300">Custom Growth Report</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Download Your <span className="text-orange-400">Personalized</span> Report
            </h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Get a PDF with all your custom projections based on the numbers you've configured above.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto mb-6">
              <div className="relative flex-1">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Enter your gym name"
                  value={gymName}
                  onChange={(e) => setGymName(e.target.value)}
                  className="h-14 pl-12 bg-white/5 border-white/20 text-white placeholder:text-gray-500 rounded-xl text-lg"
                />
              </div>
              <Button 
                onClick={handleDownloadReport}
                disabled={isDownloading}
                size="lg"
                className="h-14 px-8 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-xl shadow-lg shadow-orange-500/30"
              >
                {isDownloading ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                    />
                    Generating...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-5 w-5" />
                    Download Report
                  </>
                )}
              </Button>
            </div>

            <p className="text-sm text-gray-500">
              ✓ Includes all your custom metrics • ✓ No email required • ✓ Instant download
            </p>
          </motion.div>
        </div>
      </section>

      {/* Interactive Before/After Comparison */}
      <section className="relative py-24 px-4 bg-gradient-to-b from-transparent via-green-500/5 to-transparent">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 px-6 py-2 rounded-full mb-6">
              <BarChart3 className="h-4 w-4 text-green-400" />
              <span className="text-sm font-medium text-green-300">The Transformation</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Your Gym: <span className="text-red-400">Before</span> vs <span className="text-green-400">After</span> FBE
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              See the dramatic difference FBE makes to your bottom line
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Before FBE */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-red-500/10 to-red-500/5 border-2 border-red-500/30 rounded-3xl p-8 backdrop-blur-sm relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                WITHOUT FBE
              </div>

              <div className="text-center mb-8">
                <div className="text-6xl mb-4">😰</div>
                <h3 className="text-2xl font-bold text-red-400 mb-2">Struggling to Grow</h3>
                <p className="text-gray-400">Traditional marketing methods</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-black/30 rounded-xl">
                  <span className="text-gray-400">Daily Leads</span>
                  <span className="text-2xl font-bold text-red-400">{config.currentDailyLeads}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-black/30 rounded-xl">
                  <span className="text-gray-400">Monthly Conversions</span>
                  <span className="text-2xl font-bold text-red-400">{calculations.currentMonthlyConversions}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-black/30 rounded-xl">
                  <span className="text-gray-400">Monthly Revenue</span>
                  <span className="text-2xl font-bold text-red-400">₹{calculations.currentMonthlyRevenue.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-black/30 rounded-xl">
                  <span className="text-gray-400">Conversion Rate</span>
                  <span className="text-2xl font-bold text-red-400">{config.currentConversionRate}%</span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-red-500/20 border border-red-500/40 rounded-xl text-center">
                <div className="text-sm text-gray-300 mb-1">Growth Rate</div>
                <div className="text-3xl font-bold text-red-400">Stagnant 📉</div>
              </div>
            </motion.div>

            {/* After FBE */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-green-500/10 to-emerald-500/5 border-2 border-green-500/30 rounded-3xl p-8 backdrop-blur-sm relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                WITH FBE ✨
              </div>

              <div className="text-center mb-8">
                <div className="text-6xl mb-4">🚀</div>
                <h3 className="text-2xl font-bold text-green-400 mb-2">Exploding Growth</h3>
                <p className="text-gray-400">FBE ecosystem power</p>
              </div>

              <div className="space-y-4">
                <motion.div
                  initial={{ scale: 0.95 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-green-500/20 to-green-500/10 border border-green-500/30 rounded-xl"
                >
                  <span className="text-gray-300">Daily Leads</span>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-green-400">{calculations.fbeDaily}</span>
                    <span className="text-sm text-green-400 bg-green-500/20 px-2 py-1 rounded-full">+{Math.round((calculations.fbeDaily / config.currentDailyLeads - 1) * 100)}%</span>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ scale: 0.95 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-green-500/20 to-green-500/10 border border-green-500/30 rounded-xl"
                >
                  <span className="text-gray-300">Monthly Conversions</span>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-green-400">{calculations.fbeMonthlyConversions}</span>
                    <span className="text-sm text-green-400 bg-green-500/20 px-2 py-1 rounded-full">+{Math.round((calculations.fbeMonthlyConversions / calculations.currentMonthlyConversions - 1) * 100)}%</span>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ scale: 0.95 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-green-500/20 to-green-500/10 border border-green-500/30 rounded-xl"
                >
                  <span className="text-gray-300">Monthly Revenue</span>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-green-400">₹{calculations.fbeMonthlyRevenue.toLocaleString()}</span>
                    <span className="text-sm text-green-400 bg-green-500/20 px-2 py-1 rounded-full">+{Math.round((calculations.fbeMonthlyRevenue / calculations.currentMonthlyRevenue - 1) * 100)}%</span>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ scale: 0.95 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-green-500/20 to-green-500/10 border border-green-500/30 rounded-xl"
                >
                  <span className="text-gray-300">Conversion Rate</span>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-green-400">{Math.round(calculations.fbeConvRate * 100)}%</span>
                    <span className="text-sm text-green-400 bg-green-500/20 px-2 py-1 rounded-full">+{config.fbeConversionBoost}%</span>
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, type: "spring" }}
                className="mt-6 p-4 bg-gradient-to-r from-green-500/30 to-emerald-500/30 border border-green-500/50 rounded-xl text-center"
              >
                <div className="text-sm text-gray-300 mb-1">Growth Rate</div>
                <div className="text-3xl font-bold text-green-400">{calculations.roi}X Faster 🚀</div>
              </motion.div>
            </motion.div>
          </div>

          {/* Key Difference Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="text-center p-6 bg-white/5 border border-white/10 rounded-2xl">
              <div className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent mb-2">
                +{calculations.fbeMonthly - config.currentMonthlyLeads}
              </div>
              <div className="text-gray-400">More Leads Every Month</div>
            </div>
            <div className="text-center p-6 bg-white/5 border border-white/10 rounded-2xl">
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-purple-500 bg-clip-text text-transparent mb-2">
                +{calculations.fbeMonthlyConversions - calculations.currentMonthlyConversions}
              </div>
              <div className="text-gray-400">More Members Every Month</div>
            </div>
            <div className="text-center p-6 bg-white/5 border border-white/10 rounded-2xl">
              <div className="text-4xl font-bold bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent mb-2">
                +₹{Math.round(calculations.revenueIncrease / 1000)}k
              </div>
              <div className="text-gray-400">More Revenue Every Month</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Urgency/FOMO Section */}
      <section className="relative py-24 px-4">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-orange-500/20 via-red-500/20 to-purple-500/20 border-2 border-orange-500/50 rounded-3xl p-8 sm:p-12 backdrop-blur-xl relative overflow-hidden"
          >
            {/* Animated background pulses */}
            <motion.div
              className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-orange-500/10 to-purple-500/10 rounded-3xl"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            <div className="relative z-10">
              <div className="text-center mb-8">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-flex items-center gap-2 bg-red-500 text-white px-6 py-3 rounded-full mb-6 font-bold"
                >
                  <Flame className="h-5 w-5" />
                  LIMITED TIME OFFER
                  <Flame className="h-5 w-5" />
                </motion.div>

                <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                  Only <span className="text-orange-400">8 Spots</span> Left This Month!
                </h2>

                <p className="text-xl text-gray-300 mb-8">
                  We limit FBE to maintain quality and give each gym owner the attention they deserve
                </p>

                {/* Fake countdown timer for urgency */}
                <div className="grid grid-cols-4 gap-4 max-w-xl mx-auto mb-8">
                  {[
                    { value: 2, label: 'Days' },
                    { value: 14, label: 'Hours' },
                    { value: 32, label: 'Minutes' },
                    { value: 45, label: 'Seconds' }
                  ].map((item, i) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-black/50 border border-orange-500/30 rounded-xl p-4"
                    >
                      <div className="text-3xl sm:text-4xl font-bold text-orange-400 mb-1">
                        <AnimatedCounter end={item.value} duration={1000} />
                      </div>
                      <div className="text-xs text-gray-400">{item.label}</div>
                    </motion.div>
                  ))}
                </div>

                {/* Benefits list */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-8">
                  {[
                    '✅ Priority Onboarding',
                    '✅ Dedicated Success Manager',
                    '✅ First Month Bonus Ads (₹5,000)',
                    '✅ Exclusive FBE Community Access'
                  ].map((benefit, i) => (
                    <motion.div
                      key={benefit}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="text-left bg-white/5 px-4 py-3 rounded-lg text-gray-300"
                    >
                      {benefit}
                    </motion.div>
                  ))}
                </div>

                <Link href="/register">
                  <Button size="lg" className="text-xl px-12 h-16 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 rounded-full shadow-2xl shadow-orange-500/50 group">
                    <motion.span
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      Claim Your Spot Now
                    </motion.span>
                    <ArrowRight className="ml-2 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </Link>

                <p className="mt-6 text-sm text-gray-400">
                  🔥 <span className="text-orange-400 font-bold">12 gym owners</span> joined in the last 24 hours
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Premium Plan Section */}
      <section className="relative py-24 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 px-6 py-2 rounded-full mb-6">
              <Crown className="h-4 w-4 text-yellow-400" />
              <span className="text-sm font-medium text-yellow-300">Premium Plan</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              The <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">Premium</span> Advantage
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Everything you need to dominate your local fitness market
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Rocket, title: 'FBE Lead Engine', description: 'Automated lead generation system that works 24/7' },
              { icon: Target, title: 'Smart Ad Management', description: `Optimized campaigns with ₹${config.dailyAdSpend}/day budget for maximum impact` },
              { icon: Users, title: 'Inner Community Access', description: 'Connect with 300+ gym owners for insights and strategies' },
              { icon: BarChart3, title: 'Real-time Analytics', description: 'Track leads, conversions, and revenue in one dashboard' },
              { icon: Zap, title: 'Instant Follow-ups', description: 'Automated WhatsApp & SMS follow-up sequences' },
              { icon: Trophy, title: 'Proven Templates', description: 'Access to high-converting ad creatives and landing pages' },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-orange-500/30 transition-all duration-300"
              >
                <div className="p-3 bg-gradient-to-br from-orange-500/20 to-purple-500/20 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-6 w-6 text-orange-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="relative py-24 px-4 bg-gradient-to-b from-transparent via-orange-500/5 to-transparent">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Trusted by <span className="text-orange-400">320+</span> Gym Owners
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: 320, suffix: '+', label: 'Gyms Powered' },
              { value: 50, suffix: '+', label: 'Cities Covered' },
              { value: 15000, suffix: '+', label: 'Leads Generated Monthly' },
              { value: 85, suffix: '%', label: 'Avg. Conversion Rate' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-orange-400 to-purple-400 bg-clip-text text-transparent mb-2">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-purple-600" />
            <div className="absolute inset-0 bg-[url('/fbe.jpeg')] bg-cover bg-center opacity-20" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            
            <div className="relative p-12 sm:p-16 text-center">
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-6 py-3 rounded-full mb-8"
              >
                <Flame className="h-5 w-5 text-orange-300" />
                <span className="font-medium">Limited Spots Available</span>
              </motion.div>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                Ready to <span className="text-orange-300">{calculations.roi}X</span> Your Gym?
              </h2>
              
              <p className="text-xl text-white/80 max-w-2xl mx-auto mb-10">
                Join the FBE community today and start generating {calculations.fbeMonthly} leads/month, increasing conversions to {calculations.fbeMonthlyConversions}/month, and scaling your revenue to ₹{calculations.fbeMonthlyRevenue.toLocaleString()}/month.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register">
                  <Button size="lg" className="text-lg px-10 h-16 bg-white text-black hover:bg-white/90 rounded-full shadow-xl group">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="text-lg px-10 h-16 rounded-full border-white/30 hover:bg-white/10 text-black">
                    Talk to Sales
                  </Button>
                </Link>
              </div>

              <p className="mt-8 text-white/60 text-sm">
                ✓ No credit card required  •  ✓ 14-day free trial  •  ✓ Cancel anytime
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="container mx-auto max-w-7xl px-4">
          {/* Main Footer */}
          <div className="py-12 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <img src="/logo.png" alt="ZapFit" className="h-8" />
              <span className="text-gray-400">© 2025 ZapFit. All rights reserved.</span>
            </div>
            <div className="flex items-center gap-6">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">Privacy</Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">Terms</Link>
              <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link>
            </div>
          </div>

          {/* Zapllo Branding */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="border-t border-white/10 py-8"
          >
            <div className="flex flex-col items-center justify-center gap-4">
              <a 
                href="https://zapllo.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-3 transition-all duration-300"
              >
                <span className="text-sm text-gray-500 tracking-widest uppercase">A Product of</span>
                <div className="relative">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-purple-500/20 to-orange-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
                  
                  {/* Logo container */}
                  <div className="relative flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-full group-hover:border-orange-500/30 group-hover:bg-white/10 transition-all duration-300">
                    <img 
                      src="https://zapllo.com/logoonly.png" 
                      alt="Zapllo" 
                      className="h-8 w-8 group-hover:scale-110 transition-transform duration-300"
                    />
                    <span className="text-xl font-bold bg-gradient-to-r from-white via-white to-gray-300 bg-clip-text text-transparent group-hover:from-orange-400 group-hover:via-white group-hover:to-purple-400 transition-all duration-300">
                      Zapllo
                    </span>
                  </div>
                </div>
                <span className="text-xs text-gray-600 group-hover:text-gray-400 transition-colors">
                  Powering Business Growth
                </span>
              </a>

              {/* Decorative line */}
              <div className="flex items-center gap-4 mt-2">
                <div className="h-px w-16 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent" />
                <Sparkles className="h-4 w-4 text-orange-500/50" />
                <div className="h-px w-16 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
              </div>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}
