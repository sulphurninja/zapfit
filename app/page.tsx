import { TopBar } from '@/components/landing/top-bar'
import { Header } from '@/components/landing/header'
import { Hero } from '@/components/landing/hero'
import { QuoteSection } from '@/components/landing/quote'
import { Features } from '@/components/landing/features'
import { Benefits } from '@/components/landing/benefits'
import { Security } from '@/components/landing/security'
import { Testimonials } from '@/components/landing/testimonials'
import { Pricing } from '@/components/landing/pricing'
import { CTA } from '@/components/landing/cta'
import { Footer } from '@/components/landing/footer'
import { HeroRevamped } from '@/components/landing/hero-revamped'
import { QuoteRevamped } from '@/components/landing/quote-revamped'
import { FeaturesRevamped } from '@/components/landing/features-revamped'
import { TestimonialsRevamped } from '@/components/landing/testimonials-revamped'
import { PricingRevamped } from '@/components/landing/pricing-revamped'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <TopBar />
      <Header />
      <main>
        <HeroRevamped />
        <QuoteRevamped />
        <div id="features">
          <FeaturesRevamped />
        </div>
        <Benefits />
        <Security />
        <div id="testimonials">
          <TestimonialsRevamped />
        </div>
        <div id="pricing">
          <PricingRevamped />
        </div>
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
