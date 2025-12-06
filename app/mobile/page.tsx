import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MobilePhoneCalculator } from "@/components/mobile/mobile-phone-calculator"
import { AlertTriangle, Smartphone, Shield, CheckCircle } from "lucide-react"

export default function MobilePhonePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
                <Smartphone className="w-4 h-4" />
                Mobile Phone Import
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Mobile Phone Import Calculator</h1>
              <p className="text-lg text-muted-foreground">
                Calculate import costs for smartphones and mobile devices with automatic UzIMEI registration fee
                calculation
              </p>
            </div>
          </div>
        </section>

        {/* Important Notice */}
        <section className="py-8 bg-destructive/5 border-y border-destructive/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-destructive flex-shrink-0 mt-1" />
                <div>
                  <h2 className="font-semibold text-foreground mb-2">Mandatory Declaration Required</h2>
                  <p className="text-muted-foreground">
                    All mobile phones and devices with SIM card slots must be declared at customs upon entry into
                    Uzbekistan. Failure to declare will result in an unavoidable 30% duty fee during UzIMEI
                    registration. IMEI registration is mandatory for all imported mobile devices.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Calculator */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <MobilePhoneCalculator />
          </div>
        </section>

        {/* Rules Section */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Mobile Phone Import Rules</h2>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Individual Limits */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground">Individual Import Limits</h3>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">Maximum 2 mobile devices per entry</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">
                        Air travel: $1,000 duty-free limit ($2,000/year)
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">Rail/River: $500 duty-free limit</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">Car/Foot: $300 duty-free limit</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">YBT: 30% on excess value</span>
                    </li>
                  </ul>
                </div>

                {/* IMEI Registration */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                      <Smartphone className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="font-semibold text-foreground">UzIMEI Registration</h3>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">Registration fee: 20% of BCU per device</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">Required within 30 days of entry</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">Unregistered devices will be blocked</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">Register at uzimei.uz portal</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">Keep customs declaration for registration</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Over-limit warning */}
              <div className="mt-6 bg-warning/10 border border-warning/30 rounded-xl p-6">
                <h3 className="font-semibold text-foreground mb-2">Exceeding the 2-Device Limit</h3>
                <p className="text-sm text-muted-foreground">
                  If you bring more than 2 mobile devices, additional devices (3rd and above) will be treated as
                  commercial imports and subject to full customs duties and VAT. This applies regardless of transport
                  method. Commercial import requires a formal customs declaration and additional documentation.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
