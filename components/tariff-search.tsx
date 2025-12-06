"use client"

import { useState, useMemo } from "react"
import { Search, Package, FileText, AlertCircle, CheckCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { TARIFF_CODES, searchTariffCodes } from "@/lib/tariff-data"
import type { TariffCode } from "@/lib/types"

const categoryLabels: Record<string, string> = {
  "mobile-phones": "Mobile Phones",
  electronics: "Electronics",
  appliances: "Home Appliances",
  vehicles: "Vehicles",
  clothing: "Clothing & Textiles",
  food: "Food Products",
  cosmetics: "Cosmetics",
  toys: "Toys",
  sports: "Sports Equipment",
}

export function TariffSearch() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const categories = useMemo(() => {
    const cats = new Set(TARIFF_CODES.map((t) => t.category))
    return Array.from(cats)
  }, [])

  const filteredCodes = useMemo(() => {
    let results = TARIFF_CODES

    if (selectedCategory) {
      results = results.filter((t) => t.category === selectedCategory)
    }

    if (searchQuery.trim()) {
      results = searchTariffCodes(searchQuery).filter((t) => !selectedCategory || t.category === selectedCategory)
    }

    return results
  }, [searchQuery, selectedCategory])

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Search Bar */}
      <div className="relative max-w-2xl mx-auto">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search by product name, TIF TN code, or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 h-14 text-lg"
        />
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 justify-center">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === null
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground hover:bg-muted/80"
          }`}
        >
          All Categories
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat === selectedCategory ? null : cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === cat
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {categoryLabels[cat] || cat}
          </button>
        ))}
      </div>

      {/* Results Count */}
      <p className="text-center text-muted-foreground">
        Showing {filteredCodes.length} of {TARIFF_CODES.length} tariff codes
      </p>

      {/* Results Grid */}
      <div className="grid gap-4">
        {filteredCodes.map((tariff) => (
          <TariffCard key={tariff.code} tariff={tariff} />
        ))}
      </div>

      {filteredCodes.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No results found</h3>
          <p className="text-muted-foreground">Try different search terms or clear the category filter</p>
        </div>
      )}
    </div>
  )
}

function TariffCard({ tariff }: { tariff: TariffCode }) {
  return (
    <div className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors">
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono text-sm bg-muted px-2 py-1 rounded text-foreground">{tariff.code}</span>
            <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
              {categoryLabels[tariff.category] || tariff.category}
            </span>
          </div>
          <h3 className="font-semibold text-foreground mb-1">{tariff.description}</h3>
          <p className="text-sm text-muted-foreground">{tariff.descriptionUz}</p>
        </div>

        <div className="flex flex-wrap gap-4 text-sm">
          <div className="text-center px-4 py-2 bg-muted rounded-lg">
            <p className="text-muted-foreground text-xs">Duty Rate</p>
            <p className="font-bold text-foreground text-lg">{tariff.dutyRate}%</p>
          </div>
          {tariff.exciseRate !== undefined && tariff.exciseRate > 0 && (
            <div className="text-center px-4 py-2 bg-muted rounded-lg">
              <p className="text-muted-foreground text-xs">Excise</p>
              <p className="font-bold text-foreground text-lg">{tariff.exciseRate}%</p>
            </div>
          )}
          {tariff.minReferencePrice && (
            <div className="text-center px-4 py-2 bg-muted rounded-lg">
              <p className="text-muted-foreground text-xs">Min Price</p>
              <p className="font-bold text-foreground text-lg">${tariff.minReferencePrice}</p>
            </div>
          )}
        </div>
      </div>

      {/* Requirements */}
      <div className="mt-4 pt-4 border-t border-border flex flex-wrap gap-4">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-muted-foreground">Unit:</span>
          <span className="font-medium text-foreground">{tariff.unit}</span>
        </div>
        {tariff.requiresCertificate && (
          <div className="flex items-center gap-1 text-sm text-warning">
            <AlertCircle className="w-4 h-4" />
            Certificate Required
          </div>
        )}
        {tariff.requiresLicense && (
          <div className="flex items-center gap-1 text-sm text-warning">
            <FileText className="w-4 h-4" />
            License Required
          </div>
        )}
        {!tariff.requiresCertificate && !tariff.requiresLicense && (
          <div className="flex items-center gap-1 text-sm text-accent">
            <CheckCircle className="w-4 h-4" />
            No special requirements
          </div>
        )}
      </div>
    </div>
  )
}
