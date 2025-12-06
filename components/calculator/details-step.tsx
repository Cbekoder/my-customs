"use client"

import { Info, AlertTriangle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import type { UserType } from "@/lib/types"
import { getTariffCode, isMobilePhone, DUTY_FREE_LIMITS } from "@/lib/tariff-data"

interface DetailsStepProps {
  userType: UserType
  transportType: string
  productCode: string
  sellingPrice: number
  logisticsCost: number
  insuranceCost: number
  quantity: number
  weight: number
  useReferencePrice: boolean
  onSellingPriceChange: (value: number) => void
  onLogisticsCostChange: (value: number) => void
  onInsuranceCostChange: (value: number) => void
  onQuantityChange: (value: number) => void
  onWeightChange: (value: number) => void
  onUseReferencePriceChange: (value: boolean) => void
}

export function DetailsStep({
  userType,
  transportType,
  productCode,
  sellingPrice,
  logisticsCost,
  insuranceCost,
  quantity,
  weight,
  useReferencePrice,
  onSellingPriceChange,
  onLogisticsCostChange,
  onInsuranceCostChange,
  onQuantityChange,
  onWeightChange,
  onUseReferencePriceChange,
}: DetailsStepProps) {
  const tariff = getTariffCode(productCode)
  const isMobile = isMobilePhone(productCode)
  const limits = DUTY_FREE_LIMITS[transportType as keyof typeof DUTY_FREE_LIMITS]

  const totalValue = sellingPrice * quantity
  const limitPercentage = limits ? Math.min((totalValue / limits.value) * 100, 100) : 0

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold text-foreground">Enter Details</h2>
        <p className="text-muted-foreground">Provide product value, quantity, and shipping information</p>
      </div>

      {/* Mobile phone warning */}
      {isMobile && userType === "individual" && (
        <div className="bg-warning/10 border border-warning/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-medium text-foreground">Mobile Phone Import Notice</p>
              <p className="text-sm text-muted-foreground mt-1">
                Individual limit: <strong>2 devices per entry</strong>. Additional devices will be processed as
                commercial imports. UzIMEI registration is mandatory for all mobile devices.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Selling Price */}
        <div className="space-y-2">
          <Label htmlFor="sellingPrice" className="text-foreground">
            Selling Price (USD) <span className="text-destructive">*</span>
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
            <Input
              id="sellingPrice"
              type="number"
              min="0"
              step="0.01"
              value={sellingPrice || ""}
              onChange={(e) => onSellingPriceChange(Number.parseFloat(e.target.value) || 0)}
              className="pl-8"
              placeholder={tariff?.minReferencePrice ? `Min: $${tariff.minReferencePrice}` : "Enter price"}
              disabled={useReferencePrice}
            />
          </div>
          {tariff?.minReferencePrice && (
            <p className="text-xs text-muted-foreground">Reference price: ${tariff.minReferencePrice}</p>
          )}
        </div>

        {/* Quantity */}
        <div className="space-y-2">
          <Label htmlFor="quantity" className="text-foreground">
            Quantity ({tariff?.unit || "units"}) <span className="text-destructive">*</span>
          </Label>
          <Input
            id="quantity"
            type="number"
            min="1"
            step="1"
            value={quantity || ""}
            onChange={(e) => onQuantityChange(Number.parseInt(e.target.value) || 1)}
            placeholder="Enter quantity"
          />
          {isMobile && userType === "individual" && quantity > 2 && (
            <p className="text-xs text-destructive">⚠️ Exceeds personal limit of 2 devices</p>
          )}
        </div>

        {/* Weight */}
        <div className="space-y-2">
          <Label htmlFor="weight" className="text-foreground">
            Weight (kg)
          </Label>
          <Input
            id="weight"
            type="number"
            min="0"
            step="0.1"
            value={weight || ""}
            onChange={(e) => onWeightChange(Number.parseFloat(e.target.value) || 0)}
            placeholder="Enter weight in kg"
          />
        </div>

        {/* Logistics Cost - Only for commercial */}
        {userType === "commercial" && (
          <div className="space-y-2">
            <Label htmlFor="logisticsCost" className="text-foreground">
              Logistics/Freight Cost (USD)
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input
                id="logisticsCost"
                type="number"
                min="0"
                step="0.01"
                value={logisticsCost || ""}
                onChange={(e) => onLogisticsCostChange(Number.parseFloat(e.target.value) || 0)}
                className="pl-8"
                placeholder="Enter logistics cost"
              />
            </div>
          </div>
        )}

        {/* Insurance Cost - Only for commercial */}
        {userType === "commercial" && (
          <div className="space-y-2">
            <Label htmlFor="insuranceCost" className="text-foreground">
              Insurance Cost (USD)
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input
                id="insuranceCost"
                type="number"
                min="0"
                step="0.01"
                value={insuranceCost || ""}
                onChange={(e) => onInsuranceCostChange(Number.parseFloat(e.target.value) || 0)}
                className="pl-8"
                placeholder="Enter insurance cost"
              />
            </div>
          </div>
        )}
      </div>

      {/* Use Reference Price Toggle */}
      {tariff?.minReferencePrice && (
        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
          <div className="space-y-1">
            <Label htmlFor="useReferencePrice" className="text-foreground cursor-pointer">
              Use Reference Price
            </Label>
            <p className="text-xs text-muted-foreground">
              Use customs minimum reference price (${tariff.minReferencePrice})
            </p>
          </div>
          <Switch
            id="useReferencePrice"
            checked={useReferencePrice}
            onCheckedChange={(checked) => {
              onUseReferencePriceChange(checked)
              if (checked && tariff.minReferencePrice) {
                onSellingPriceChange(tariff.minReferencePrice)
              }
            }}
          />
        </div>
      )}

      {/* Duty-free limit progress bar for individuals */}
      {userType === "individual" && limits && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Duty-Free Limit Usage</span>
            <span className="font-medium text-foreground">
              ${totalValue.toFixed(2)} / ${limits.value}
            </span>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                limitPercentage >= 100 ? "bg-destructive" : limitPercentage >= 80 ? "bg-warning" : "bg-accent"
              }`}
              style={{ width: `${Math.min(limitPercentage, 100)}%` }}
            />
          </div>
          {limitPercentage > 100 && (
            <p className="text-xs text-destructive">
              Value exceeds duty-free limit. YBT will be applied to excess amount.
            </p>
          )}
        </div>
      )}

      <div className="flex items-start gap-2 p-4 bg-muted/50 rounded-lg">
        <Info className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
        <p className="text-sm text-muted-foreground">
          {userType === "commercial"
            ? "Customs Value (CIF) = Selling Price + Logistics + Insurance. Leave logistics/insurance blank if included in selling price."
            : "If you leave the price blank or use reference price, customs will use minimum reference values for calculation."}
        </p>
      </div>
    </div>
  )
}
