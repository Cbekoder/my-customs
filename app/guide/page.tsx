import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BookOpen, CheckCircle, AlertTriangle, FileText, Truck, Shield, Calculator, Smartphone } from "lucide-react"

export default function GuidePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
                <BookOpen className="w-4 h-4" />
                Import Guide
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Complete Guide to Importing Goods into Uzbekistan
              </h1>
              <p className="text-lg text-muted-foreground">
                Everything you need to know about customs procedures, duties, taxes, and required documentation
              </p>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-12">
              {/* Individual Import */}
              <div className="bg-card border border-border rounded-xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Shield className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">Individual Import (Personal Use)</h2>
                    <p className="text-muted-foreground">Shaxsiy Ehtiyoj uchun Import</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Duty-Free Limits</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                        <Truck className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium text-foreground">Air Transport</p>
                          <p className="text-sm text-muted-foreground">$1,000 per entry / $2,000 per year</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                        <Truck className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium text-foreground">Rail/River Transport</p>
                          <p className="text-sm text-muted-foreground">$500 per entry / $1,000 per year</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                        <Truck className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium text-foreground">Road Transport</p>
                          <p className="text-sm text-muted-foreground">$300 per entry</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                        <Truck className="w-5 h-5 text-primary mt-0.5" />
                        <div>
                          <p className="font-medium text-foreground">On Foot</p>
                          <p className="text-sm text-muted-foreground">$300 per entry</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Single Customs Payment (YBT)</h3>
                    <p className="text-muted-foreground mb-4">
                      If you exceed the duty-free limit, you pay a simplified Single Customs Payment (YBT):
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">
                          <strong className="text-foreground">30%</strong> of the excess value, OR
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">
                          <strong className="text-foreground">$3 per kg</strong> of excess weight
                        </span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">
                          Whichever is <strong className="text-foreground">higher</strong>
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Commercial Import */}
              <div className="bg-card border border-border rounded-xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Calculator className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">Commercial Import</h2>
                    <p className="text-muted-foreground">Tijoriy Maqsadda Import</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Calculation Method (CIF Basis)</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                        <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center flex-shrink-0">
                          1
                        </span>
                        <div>
                          <p className="font-medium text-foreground">Customs Value (CV)</p>
                          <p className="text-sm text-muted-foreground font-mono">
                            Selling Price + Logistics + Insurance
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                        <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center flex-shrink-0">
                          2
                        </span>
                        <div>
                          <p className="font-medium text-foreground">Customs Duty (CD)</p>
                          <p className="text-sm text-muted-foreground font-mono">CV × Duty Rate (from TIF TN code)</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                        <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center flex-shrink-0">
                          3
                        </span>
                        <div>
                          <p className="font-medium text-foreground">Excise Tax (ET)</p>
                          <p className="text-sm text-muted-foreground font-mono">
                            (CV + CD) × Excise Rate (if applicable)
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                        <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center flex-shrink-0">
                          4
                        </span>
                        <div>
                          <p className="font-medium text-foreground">VAT (12%)</p>
                          <p className="text-sm text-muted-foreground font-mono">(CV + CD + ET) × 12%</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                        <span className="w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center flex-shrink-0">
                          5
                        </span>
                        <div>
                          <p className="font-medium text-foreground">Customs Clearance Fee</p>
                          <p className="text-sm text-muted-foreground font-mono">Based on CV range (in BCU units)</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Phones */}
              <div className="bg-card border border-border rounded-xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center">
                    <Smartphone className="w-6 h-6 text-warning" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">Mobile Phone Import</h2>
                    <p className="text-muted-foreground">Special rules and IMEI registration</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground">Mandatory Declaration</p>
                        <p className="text-sm text-muted-foreground">
                          All mobile devices must be declared at customs. Failure to declare results in a 30% duty fee
                          during IMEI registration.
                        </p>
                      </div>
                    </div>
                  </div>

                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">
                        Maximum <strong className="text-foreground">2 devices</strong> per entry for personal use
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">
                        3rd device and above: <strong className="text-foreground">commercial import</strong> rules apply
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">
                        IMEI registration fee: <strong className="text-foreground">20% of BCU</strong> per device
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">
                        Register at <strong className="text-foreground">uzimei.uz</strong> within 30 days
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Required Documents */}
              <div className="bg-card border border-border rounded-xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-foreground">Required Documents</h2>
                    <p className="text-muted-foreground">Documentation for customs clearance</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Individual Import</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Passport</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Customs declaration form</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Purchase receipt/invoice</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-3">Commercial Import</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Commercial invoice</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Packing list</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Bill of lading / Airway bill</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Certificate of origin</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">Conformity certificate (if required)</span>
                      </li>
                    </ul>
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
