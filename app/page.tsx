import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CalculatorWizard } from "@/components/calculator/calculator-wizard"
import { Shield, Clock, Calculator, FileCheck } from "lucide-react"

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
                Official Calculation Methods
              </div>
              <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-4 text-balance">
                Uzbekistan Import Cost Calculator
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Calculate customs duties, VAT, excise taxes, and fees for importing goods into the Republic of
                Uzbekistan. Accurate calculations for both individuals and commercial entities.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-card border border-border">
                <Calculator className="w-8 h-8 text-primary mb-2" />
                <span className="text-sm font-medium text-foreground">Accurate Calculations</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-card border border-border">
                <Clock className="w-8 h-8 text-primary mb-2" />
                <span className="text-sm font-medium text-foreground">Real-time Rates</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-card border border-border">
                <FileCheck className="w-8 h-8 text-primary mb-2" />
                <span className="text-sm font-medium text-foreground">TIF TN Database</span>
              </div>
              <div className="flex flex-col items-center text-center p-4 rounded-lg bg-card border border-border">
                <Shield className="w-8 h-8 text-primary mb-2" />
                <span className="text-sm font-medium text-foreground">Official Methods</span>
              </div>
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
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-foreground mb-6 text-center">How Import Costs Are Calculated</h2>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Commercial */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="font-semibold text-lg text-foreground mb-4">Commercial Imports (Tijoriy)</h3>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <p>
                      <strong className="text-foreground">1. Customs Value (CIF)</strong>
                      <br />
                      Selling Price + Logistics + Insurance
                    </p>
                    <p>
                      <strong className="text-foreground">2. Customs Duty</strong>
                      <br />
                      CV × Duty Rate (based on TIF TN code)
                    </p>
                    <p>
                      <strong className="text-foreground">3. Excise Tax</strong>
                      <br />
                      (CV + Duty) × Excise Rate (if applicable)
                    </p>
                    <p>
                      <strong className="text-foreground">4. VAT (12%)</strong>
                      <br />
                      (CV + Duty + Excise) × 12%
                    </p>
                    <p>
                      <strong className="text-foreground">5. Customs Fee</strong>
                      <br />
                      Based on CV range (in BCU)
                    </p>
                  </div>
                </div>

                {/* Individual */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="font-semibold text-lg text-foreground mb-4">Individual Imports (Shaxsiy)</h3>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <p>
                      <strong className="text-foreground">1. Duty-Free Limits</strong>
                      <br />
                      Air: $1,000 | Rail: $500 | Car/Foot: $300
                    </p>
                    <p>
                      <strong className="text-foreground">2. Single Customs Payment (YBT)</strong>
                      <br />
                      30% of excess value OR $3/kg excess weight
                    </p>
                    <p>
                      <strong className="text-foreground">3. Mobile Phone Limits</strong>
                      <br />
                      Max 2 devices per entry for personal use
                    </p>
                    <p>
                      <strong className="text-foreground">4. IMEI Registration</strong>
                      <br />
                      20% of BCU per mobile device
                    </p>
                    <p>
                      <strong className="text-foreground">5. Simplified Fee</strong>
                      <br />
                      Reduced customs clearance fee
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
