"use client"

import { useState, useMemo } from "react"
import { Search, Package, Info } from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { searchTariffCodes, TARIFF_CODES } from "@/lib/tariff-data"

interface ProductStepProps {
  value: string
  onChange: (code: string, description: string) => void
}

const categoryIcons: Record<string, string> = {
  "mobile-phones": "📱",
  electronics: "💻",
  appliances: "🏠",
  vehicles: "🚗",
  clothing: "👔",
  food: "🍽️",
  cosmetics: "💄",
  toys: "🧸",
  sports: "⚽",
}

export function ProductStep({ value, onChange }: ProductStepProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [showAll, setShowAll] = useState(false)

  const filteredCodes = useMemo(() => {
    if (!searchQuery.trim()) {
      return showAll ? TARIFF_CODES : TARIFF_CODES.slice(0, 8)
    }
    return searchTariffCodes(searchQuery)
  }, [searchQuery, showAll])

  const selectedTariff = TARIFF_CODES.find((t) => t.code === value)

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold text-foreground">Select Product</h2>
        <p className="text-muted-foreground">Search by product name, TIF TN code, or category</p>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search products (e.g., 'smartphone', 'washing machine', '8517120000')"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 h-12 text-base"
        />
      </div>

      {selectedTariff && (
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="text-2xl">{categoryIcons[selectedTariff.category] || "📦"}</div>
            <div className="flex-1">
              <div className="font-medium text-foreground">{selectedTariff.description}</div>
              <div className="text-sm text-muted-foreground mt-1">
                TIF TN: {selectedTariff.code} • Duty: {selectedTariff.dutyRate}%
                {selectedTariff.exciseRate ? ` • Excise: ${selectedTariff.exciseRate}%` : ""}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[400px] overflow-y-auto">
        {filteredCodes.map((tariff) => (
          <button
            key={tariff.code}
            onClick={() => onChange(tariff.code, tariff.description)}
            className={cn(
              "flex items-start gap-3 p-4 rounded-lg border text-left transition-all duration-200 hover:border-primary/50 hover:bg-primary/5",
              value === tariff.code ? "border-primary bg-primary/10" : "border-border bg-card",
            )}
          >
            <div className="text-2xl flex-shrink-0">{categoryIcons[tariff.category] || "📦"}</div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm text-foreground line-clamp-2">{tariff.description}</div>
              <div className="text-xs text-muted-foreground mt-1">{tariff.code}</div>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="text-xs bg-muted px-2 py-0.5 rounded">Duty: {tariff.dutyRate}%</span>
                {tariff.exciseRate ? (
                  <span className="text-xs bg-muted px-2 py-0.5 rounded">Excise: {tariff.exciseRate}%</span>
                ) : null}
                {tariff.requiresCertificate && (
                  <span className="text-xs bg-warning/20 text-warning-foreground px-2 py-0.5 rounded">
                    Certificate Required
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {!searchQuery && !showAll && (
        <button onClick={() => setShowAll(true)} className="w-full text-center text-sm text-primary hover:underline">
          Show all products ({TARIFF_CODES.length} items)
        </button>
      )}

      {filteredCodes.length === 0 && (
        <div className="text-center py-8">
          <Package className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
          <p className="text-muted-foreground">No products found for &quot;{searchQuery}&quot;</p>
          <p className="text-sm text-muted-foreground mt-1">Try searching with different keywords or TIF TN code</p>
        </div>
      )}

      <div className="flex items-start gap-2 p-4 bg-muted/50 rounded-lg">
        <Info className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
        <p className="text-sm text-muted-foreground">
          Can&apos;t find your product? Contact customs support or use the closest matching category. The TIF TN code
          determines applicable duties and taxes.
        </p>
      </div>
    </div>
  )
}
