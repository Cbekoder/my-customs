import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { Shield } from "lucide-react"

export default function AdminPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-muted/30">
        {/* Header */}
        <section className="bg-background border-b border-border py-6">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Admin Panel</h1>
                <p className="text-muted-foreground">Manage tariff rates, limits, and system settings</p>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <AdminDashboard />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
