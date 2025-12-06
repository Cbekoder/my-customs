"use client"

import { useState, useMemo } from "react"
import { Search, Package, Info, Smartphone } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { TARIFF_CODES, MOBILE_PHONE_MODELS } from "@/lib/tariff-data"
import type { ProductCategory } from "@/lib/types"

interface ProductStepProps {
  value: string
  category: ProductCategory | null
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
  pharmaceuticals: "💊",
}

const categoryToTariffCategories: Record<ProductCategory, string[]> = {
  electronics: ["mobile-phones", "electronics"],
  automobiles: ["vehicles"],
  pharmaceuticals: ["pharmaceuticals"],
  other: ["appliances", "clothing", "food", "cosmetics", "toys", "sports"],
}

type InputMethod = "search" | "code" | "model"

export function ProductStep({ value, category, onChange }: ProductStepProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [directCode, setDirectCode] = useState("")
  const [showAll, setShowAll] = useState(false)
  const [inputMethod, setInputMethod] = useState<InputMethod>("search")

  const categoryTariffCodes = useMemo(() => {
    if (!category) return TARIFF_CODES
    const allowedCategories = categoryToTariffCategories[category]
    return TARIFF_CODES.filter((t) => allowedCategories.includes(t.category))
  }, [category])

  const filteredCodes = useMemo(() => {
    if (!searchQuery.trim()) {
      return showAll ? categoryTariffCodes : categoryTariffCodes.slice(0, 8)
    }
    const searchTerm = searchQuery.toLowerCase()
    return categoryTariffCodes.filter(
      (code) =>
        code.code.includes(searchTerm) ||
        code.description.toLowerCase().includes(searchTerm) ||
        code.descriptionUz.toLowerCase().includes(searchTerm),
    )
  }, [searchQuery, showAll, categoryTariffCodes])

  const selectedTariff = TARIFF_CODES.find((t) => t.code === value)

  const handleDirectCodeSubmit = () => {
    const tariff = TARIFF_CODES.find((t) => t.code === directCode)
    if (tariff) {
      onChange(tariff.code, tariff.description)
    } else if (directCode.length === 10) {
      // Allow custom codes
      onChange(directCode, `Custom product (${directCode})`)
    }
  }

  const isElectronicsCategory = category === "electronics"

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold text-foreground">Select Product</h2>
        <p className="text-muted-foreground">Choose how you want to find your product</p>
      </div>

      <Tabs value={inputMethod} onValueChange={(v) => setInputMethod(v as InputMethod)} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="search">Search</TabsTrigger>
          <TabsTrigger value="code">TIF TN Code</TabsTrigger>
          {isElectronicsCategory && <TabsTrigger value="model">Brand/Model</TabsTrigger>}
          {!isElectronicsCategory && (
            <TabsTrigger value="model" disabled>
              Brand/Model
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="search" className="space-y-4 mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search products (e.g., 'smartphone', 'laptop', 'vitamins')"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-base"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[350px] overflow-y-auto">
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
                      <span className="text-xs bg-accent/20 text-accent-foreground px-2 py-0.5 rounded">
                        Certificate Required
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {!searchQuery && !showAll && categoryTariffCodes.length > 8 && (
            <button
              onClick={() => setShowAll(true)}
              className="w-full text-center text-sm text-primary hover:underline"
            >
              Show all products ({categoryTariffCodes.length} items)
            </button>
          )}

          {filteredCodes.length === 0 && (
            <div className="text-center py-8">
              <Package className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
              <p className="text-muted-foreground">No products found for &quot;{searchQuery}&quot;</p>
              <p className="text-sm text-muted-foreground mt-1">
                Try searching with different keywords or use TIF TN code
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="code" className="space-y-4 mt-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Enter 10-digit TIF TN Code</label>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="e.g., 8517120000"
                value={directCode}
                onChange={(e) => setDirectCode(e.target.value.replace(/\D/g, "").slice(0, 10))}
                className="h-12 text-base font-mono"
                maxLength={10}
              />
              <button
                onClick={handleDirectCodeSubmit}
                disabled={directCode.length !== 10}
                className="px-6 h-12 bg-primary text-primary-foreground rounded-md font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
              >
                Apply
              </button>
            </div>
            <p className="text-xs text-muted-foreground">
              Enter the exact 10-digit TIF TN (Товар nomenclature) code from your customs documents
            </p>
          </div>

          {directCode.length === 10 && (
            <div className="p-4 bg-muted/50 rounded-lg">
              {TARIFF_CODES.find((t) => t.code === directCode) ? (
                <div className="flex items-start gap-3">
                  <div className="text-2xl">
                    {categoryIcons[TARIFF_CODES.find((t) => t.code === directCode)?.category || ""] || "📦"}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">
                      {TARIFF_CODES.find((t) => t.code === directCode)?.description}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Duty: {TARIFF_CODES.find((t) => t.code === directCode)?.dutyRate}%
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Code not found in database. You can still use this code - duties will be calculated based on general
                  rates.
                </p>
              )}
            </div>
          )}
        </TabsContent>

        <TabsContent value="model" className="space-y-4 mt-4">
          {isElectronicsCategory && (
            <>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search by brand or model (e.g., 'iPhone 15', 'Galaxy S24')"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 text-base"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[350px] overflow-y-auto">
                {MOBILE_PHONE_MODELS.filter(
                  (p) =>
                    !searchQuery ||
                    p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    p.model.toLowerCase().includes(searchQuery.toLowerCase()),
                )
                  .slice(0, 12)
                  .map((phone, index) => (
                    <button
                      key={index}
                      onClick={() => onChange(phone.tifCode, `${phone.brand} ${phone.model}`)}
                      className={cn(
                        "flex items-start gap-3 p-4 rounded-lg border text-left transition-all duration-200 hover:border-primary/50 hover:bg-primary/5",
                        value === phone.tifCode ? "border-primary bg-primary/10" : "border-border bg-card",
                      )}
                    >
                      <Smartphone className="w-8 h-8 text-muted-foreground flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm text-foreground">
                          {phone.brand} {phone.model}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Reference Price: ${phone.referencePrice}
                        </div>
                        <div className="text-xs text-muted-foreground">{phone.tifCode}</div>
                      </div>
                    </button>
                  ))}
              </div>
            </>
          )}
        </TabsContent>
      </Tabs>

      {selectedTariff && (
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <div className="text-2xl">{categoryIcons[selectedTariff.category] || "📦"}</div>
            <div className="flex-1">
              <div className="font-medium text-foreground">{selectedTariff.description}</div>
              <div className="text-sm text-muted-foreground mt-1">
                TIF TN: {selectedTariff.code} | Duty: {selectedTariff.dutyRate}%
                {selectedTariff.exciseRate ? ` | Excise: ${selectedTariff.exciseRate}%` : ""}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-start gap-2 p-4 bg-muted/50 rounded-lg">
        <Info className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
        <p className="text-sm text-muted-foreground">
          Can&apos;t find your product? Use the TIF TN code tab to enter a custom code, or contact customs support for
          the correct classification.
        </p>
      </div>
    </div>
  )
}
