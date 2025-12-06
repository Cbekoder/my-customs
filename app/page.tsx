import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CalculatorWizard } from "@/components/calculator/calculator-wizard"
import { Shield, Calculator, Car, Smartphone, TrendingUp, FileText } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-primary/5 to-background py-12 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-medium mb-6">
                <Shield className="w-4 h-4" />
                V2.0 - Enhanced Calculation Engine
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4 text-balance">
                Uzbekistan Customs Cost Analyzer
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Calculate customs duties, VAT, excise taxes, utilization fees, and documentation costs for importing
                goods into the Republic of Uzbekistan. Specialized modules for Mobile Phones and Automobiles.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-card border border-border">
                <Calculator className="w-8 h-8 text-primary mb-2" />
                <span className="text-sm font-medium text-foreground">Multi-Parameter Logic</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-card border border-border">
                <TrendingUp className="w-8 h-8 text-primary mb-2" />
                <span className="text-sm font-medium text-foreground">Financial Analysis</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-card border border-border">
                <FileText className="w-8 h-8 text-primary mb-2" />
                <span className="text-sm font-medium text-foreground">Doc Requirements</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-card border border-border">
                <Shield className="w-8 h-8 text-primary mb-2" />
                <span className="text-sm font-medium text-foreground">Official Methods</span>
              </div>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <Link
                href="/mobile"
                className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:border-primary/50 hover:bg-primary/5 transition-all"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Mobile Phone Calculator</h3>
                  <p className="text-sm text-muted-foreground">IMEI fees, quantity limits, YBT rates</p>
                </div>
              </Link>
              <Link
                href="/automobiles"
                className="flex items-center gap-4 p-4 bg-card border border-border rounded-xl hover:border-primary/50 hover:bg-primary/5 transition-all"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Car className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Automobile Calculator</h3>
                  <p className="text-sm text-muted-foreground">Engine-based duties, utilization fees</p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Calculator Section */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <CalculatorWizard />
          </div>
        </section>

        {/* Info Section */}
        <section className="py-12 md:py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold text-foreground mb-6 text-center">How Import Costs Are Calculated</h2>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Commercial */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="font-semibold text-lg text-foreground mb-4">Commercial Imports</h3>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <p>
                      <strong className="text-foreground">CIF Value</strong>
                      <br />
                      Price + Logistics + Insurance
                    </p>
                    <p>
                      <strong className="text-foreground">Customs Duty</strong>
                      <br />
                      CV x Rate (TIF TN based)
                    </p>
                    <p>
                      <strong className="text-foreground">VAT (12%)</strong>
                      <br />
                      (CV + Duty + Excise) x 12%
                    </p>
                    <p>
                      <strong className="text-foreground">Clearance Fee</strong>
                      <br />
                      BCU-based fee schedule
                    </p>
                  </div>
                </div>

                {/* Mobile Phones */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="font-semibold text-lg text-foreground mb-4">Mobile Phones</h3>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <p>
                      <strong className="text-foreground">Personal Limit</strong>
                      <br />2 devices, Air: $1000 / Other: $300
                    </p>
                    <p>
                      <strong className="text-foreground">YBT Rate</strong>
                      <br />
                      30% on excess value
                    </p>
                    <p>
                      <strong className="text-foreground">IMEI Fee</strong>
                      <br />
                      20% BCU per device
                    </p>
                    <p>
                      <strong className="text-foreground">Commercial Duty</strong>
                      <br />
                      5% (w/ CoC) or 10% (w/o CoC)
                    </p>
                  </div>
                </div>

                {/* Automobiles */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="font-semibold text-lg text-foreground mb-4">Automobiles</h3>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <p>
                      <strong className="text-foreground">Duty Rate</strong>
                      <br />
                      Based on engine size + age
                    </p>
                    <p>
                      <strong className="text-foreground">Excise Tax</strong>
                      <br />
                      5-50% based on engine/age
                    </p>
                    <p>
                      <strong className="text-foreground">Utilization Fee</strong>
                      <br />
                      BRV x Multiplier (recycling)
                    </p>
                    <p>
                      <strong className="text-foreground">EV Exemption</strong>
                      <br />
                      0% duty for electric vehicles
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
