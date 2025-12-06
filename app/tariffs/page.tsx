import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TariffSearch } from "@/components/tariff-search"
import { Database } from "lucide-react"

export default function TariffsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
                <Database className="w-4 h-4" />
                TIF TN Database
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Tariff Code Search</h1>
              <p className="text-lg text-muted-foreground">
                Search the TIF TN (Harmonized System) tariff database to find duty rates, excise taxes, and required
                documents for your products
              </p>
            </div>
          </div>
        </section>

        {/* Search */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <TariffSearch />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
