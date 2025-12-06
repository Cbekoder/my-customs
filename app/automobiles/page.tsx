import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AutomobileCalculator } from "@/components/automobile/automobile-calculator"

export const metadata = {
  title: "Automobile Import Calculator | Uzbekistan Customs",
  description:
    "Calculate import costs for automobiles including customs duty, VAT, excise tax, and utilization fees based on engine size, age, and fuel type.",
}

export default function AutomobilesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Automobile Import Calculator</h1>
            <p className="text-lg text-muted-foreground">
              Calculate the total import cost for vehicles including customs duty, VAT, excise tax, and mandatory
              utilization (recycling) fees based on engine displacement, vehicle age, and fuel type.
            </p>
          </div>
          <AutomobileCalculator />
        </div>
      </main>
      <Footer />
    </div>
  )
}
