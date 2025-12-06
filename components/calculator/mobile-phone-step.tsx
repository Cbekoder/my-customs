"use client"

import { useState, useEffect } from "react"
import { Smartphone, Search, Plus, Trash2, Info, AlertTriangle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { type MOBILE_PHONE_MODELS, searchMobilePhones } from "@/lib/tariff-data"
import type { UserType, MobilePhoneItem } from "@/lib/types"

interface MobilePhoneStepProps {
  userType: UserType
  // Individual fields
  price: number
  quantity: number
  weight: number
  declaredAtCustoms: boolean
  onPriceChange: (price: number) => void
  onQuantityChange: (quantity: number) => void
  onWeightChange: (weight: number) => void
  onDeclaredAtCustomsChange: (declared: boolean) => void
  // Commercial fields
  hasCertificate: boolean
  onHasCertificateChange: (has: boolean) => void
  mobilePhoneItems: MobilePhoneItem[]
  onMobilePhoneItemsChange: (items: MobilePhoneItem[]) => void
}

export function MobilePhoneStep({
  userType,
  price,
  quantity,
  weight,
  declaredAtCustoms,
  onPriceChange,
  onQuantityChange,
  onWeightChange,
  onDeclaredAtCustomsChange,
  hasCertificate,
  onHasCertificateChange,
  mobilePhoneItems,
  onMobilePhoneItemsChange,
}: MobilePhoneStepProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [searchResults, setSearchResults] = useState<typeof MOBILE_PHONE_MODELS>([])
  const [showResults, setShowResults] = useState(false)
  const [selectedModel, setSelectedModel] = useState<string>("")

  useEffect(() => {
    if (searchQuery.length >= 2) {
      const results = searchMobilePhones(searchQuery)
      setSearchResults(results)
      setShowResults(true)
    } else {
      setSearchResults([])
      setShowResults(false)
    }
  }, [searchQuery])

  const handleSelectModel = (model: (typeof MOBILE_PHONE_MODELS)[0]) => {
    setSelectedModel(`${model.brand} ${model.model}`)
    if (!price) {
      onPriceChange(model.referencePrice)
    }
    setShowResults(false)
    setSearchQuery("")
  }

  // Commercial: Add phone to table
  const addPhoneItem = (model: (typeof MOBILE_PHONE_MODELS)[0]) => {
    const newItem: MobilePhoneItem = {
      id: crypto.randomUUID(),
      model: `${model.brand} ${model.model}`,
      tifCode: model.tifCode,
      price: model.referencePrice,
      quantity: 1,
    }
    onMobilePhoneItemsChange([...mobilePhoneItems, newItem])
    setShowResults(false)
    setSearchQuery("")
  }

  const updatePhoneItem = (id: string, field: "price" | "quantity", value: number) => {
    onMobilePhoneItemsChange(mobilePhoneItems.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  const removePhoneItem = (id: string) => {
    onMobilePhoneItemsChange(mobilePhoneItems.filter((item) => item.id !== id))
  }

  const totalCommercialValue = mobilePhoneItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalCommercialQuantity = mobilePhoneItems.reduce((sum, item) => sum + item.quantity, 0)

  if (userType === "commercial") {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground mb-2">Commercial Mobile Phone Import</h2>
          <p className="text-muted-foreground">Add multiple phone models with their quantities for commercial import</p>
        </div>

        {/* Certificate of Conformity */}
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-base font-medium">Certificate of Conformity Available?</Label>
              <p className="text-sm text-muted-foreground">With certificate: 5% duty | Without: 10% duty</p>
            </div>
            <Switch checked={hasCertificate} onCheckedChange={onHasCertificateChange} />
          </div>
        </div>

        {/* Search and Add */}
        <div className="relative">
          <Label className="mb-2 block">Search and Add Phone Models</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by brand or model (e.g., iPhone 15 Pro)"
              className="pl-10"
            />
          </div>

          {showResults && searchResults.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-card border border-border rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {searchResults.map((phone, index) => (
                <button
                  key={index}
                  onClick={() => addPhoneItem(phone)}
                  className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted/50 transition-colors border-b border-border last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <Smartphone className="w-5 h-5 text-muted-foreground" />
                    <div className="text-left">
                      <p className="font-medium text-foreground">
                        {phone.brand} {phone.model}
                      </p>
                      <p className="text-sm text-muted-foreground">Ref. Price: ${phone.referencePrice}</p>
                    </div>
                  </div>
                  <Plus className="w-5 h-5 text-primary" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Phone Items Table */}
        {mobilePhoneItems.length > 0 && (
          <div className="border border-border rounded-lg overflow-hidden">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-medium text-foreground">Model</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-foreground">Price ($)</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-foreground">Quantity</th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-foreground">Subtotal</th>
                  <th className="w-12"></th>
                </tr>
              </thead>
              <tbody>
                {mobilePhoneItems.map((item) => (
                  <tr key={item.id} className="border-t border-border">
                    <td className="px-4 py-3">
                      <p className="font-medium text-foreground">{item.model}</p>
                      <p className="text-xs text-muted-foreground">{item.tifCode}</p>
                    </td>
                    <td className="px-4 py-3">
                      <Input
                        type="number"
                        min={0}
                        value={item.price}
                        onChange={(e) => updatePhoneItem(item.id, "price", Number.parseFloat(e.target.value) || 0)}
                        className="w-24"
                      />
                    </td>
                    <td className="px-4 py-3">
                      <Input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(e) => updatePhoneItem(item.id, "quantity", Number.parseInt(e.target.value) || 1)}
                        className="w-20"
                      />
                    </td>
                    <td className="px-4 py-3 font-medium text-foreground">
                      ${(item.price * item.quantity).toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removePhoneItem(item.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-muted/30">
                <tr className="border-t border-border">
                  <td className="px-4 py-3 font-semibold text-foreground" colSpan={2}>
                    Total
                  </td>
                  <td className="px-4 py-3 font-semibold text-foreground">{totalCommercialQuantity} units</td>
                  <td className="px-4 py-3 font-semibold text-primary" colSpan={2}>
                    ${totalCommercialValue.toLocaleString()}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}

        {mobilePhoneItems.length === 0 && (
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
            <Smartphone className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Search and add phone models above to build your import list</p>
          </div>
        )}
      </div>
    )
  }

  // Individual Import UI
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">Mobile Phone Details</h2>
        <p className="text-muted-foreground">Enter the details of your personal mobile phone import</p>
      </div>

      {/* Model Search */}
      <div className="relative">
        <Label className="mb-2 block">Phone Model (optional)</Label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            value={searchQuery || selectedModel}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setSelectedModel("")
            }}
            placeholder="Search by brand or model to auto-fill price"
            className="pl-10"
          />
        </div>

        {showResults && searchResults.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-card border border-border rounded-lg shadow-lg max-h-60 overflow-y-auto">
            {searchResults.map((phone, index) => (
              <button
                key={index}
                onClick={() => handleSelectModel(phone)}
                className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted/50 transition-colors border-b border-border last:border-0"
              >
                <div className="flex items-center gap-3">
                  <Smartphone className="w-5 h-5 text-muted-foreground" />
                  <div className="text-left">
                    <p className="font-medium text-foreground">
                      {phone.brand} {phone.model}
                    </p>
                    <p className="text-sm text-muted-foreground">Ref. Price: ${phone.referencePrice}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Price, Quantity, Weight */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Price per Unit (USD)</Label>
          <Input
            id="price"
            type="number"
            min={0}
            value={price || ""}
            onChange={(e) => onPriceChange(Number.parseFloat(e.target.value) || 0)}
            placeholder="e.g., 999"
          />
          <p className="text-xs text-muted-foreground">Leave blank to use reference price</p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="quantity">Quantity</Label>
          <Input
            id="quantity"
            type="number"
            min={1}
            max={10}
            value={quantity}
            onChange={(e) => onQuantityChange(Number.parseInt(e.target.value) || 1)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="weight">Total Weight (kg)</Label>
          <Input
            id="weight"
            type="number"
            min={0}
            step={0.1}
            value={weight || ""}
            onChange={(e) => onWeightChange(Number.parseFloat(e.target.value) || 0)}
            placeholder="e.g., 0.5"
          />
        </div>
      </div>

      {/* Quantity Warning */}
      {quantity > 2 && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-foreground">Quantity Limit Exceeded</p>
            <p className="text-sm text-muted-foreground">
              Only 2 mobile devices are allowed per entry for personal use. Devices #{quantity > 2 ? "3" : ""}+ will be
              processed as commercial imports with additional duties.
            </p>
          </div>
        </div>
      )}

      {/* Declared at Customs Toggle */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <Label className="text-base font-medium">Declared at Customs?</Label>
            <p className="text-sm text-muted-foreground">
              Did you declare this device at the customs checkpoint upon arrival?
            </p>
          </div>
          <Switch checked={declaredAtCustoms} onCheckedChange={onDeclaredAtCustomsChange} />
        </div>
      </div>

      {!declaredAtCustoms && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-medium text-foreground">30% Penalty Fee Will Apply</p>
            <p className="text-sm text-muted-foreground">
              Failing to declare your device at customs will result in an additional 30% penalty fee when registering
              with UzIMEI.
            </p>
          </div>
        </div>
      )}

      {/* Info Box */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
        <div className="text-sm text-muted-foreground">
          <p className="font-medium text-foreground mb-1">UzIMEI Registration Required</p>
          <p>
            All mobile phones imported to Uzbekistan must be registered with the UzIMEI system. The registration fee is
            20% of BCU (Base Calculation Unit) per device.
          </p>
        </div>
      </div>
    </div>
  )
}
