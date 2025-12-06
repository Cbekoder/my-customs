"use client"

import { useState, useMemo } from "react"
import { Smartphone, Plane, Train, Car, Footprints, AlertTriangle, Info, Calculator } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { TransportType } from "@/lib/types"
import { DUTY_FREE_LIMITS, BCU_VALUE_UZS, USD_TO_UZS_RATE, IMEI_FEE_BCU_PERCENTAGE, YBT_RATE } from "@/lib/tariff-data"

const transportOptions = [
  { id: "air" as TransportType, label: "Air", icon: Plane },
  { id: "rail" as TransportType, label: "Rail", icon: Train },
  { id: "car" as TransportType, label: "Car", icon: Car },
  { id: "foot" as TransportType, label: "Foot", icon: Footprints },
]

const MOBILE_DEVICE_LIMIT = 2

interface MobileCalculationResult {
  devices: {
    deviceNumber: number
    price: number
    regime: "personal" | "commercial"
    ybtDuty: number
    imeiFeee: number
    totalCost: number
  }[]
  totalProductValue: number
  totalYBT: number
  totalIMEIFee: number
  totalCommercialDuty: number
  totalCommercialVAT: number
  grandTotal: number
  grandTotalUZS: number
  warnings: string[]
}

export function MobilePhoneCalculator() {
  const [transport, setTransport] = useState<TransportType>("air")
  const [deviceCount, setDeviceCount] = useState(1)
  const [devicePrices, setDevicePrices] = useState<number[]>([0])
  const [result, setResult] = useState<MobileCalculationResult | null>(null)

  const limits = DUTY_FREE_LIMITS[transport]
  const imeiFeePer = (BCU_VALUE_UZS * IMEI_FEE_BCU_PERCENTAGE) / USD_TO_UZS_RATE

  const handleDeviceCountChange = (count: number) => {
    const newCount = Math.max(1, Math.min(10, count))
    setDeviceCount(newCount)

    // Adjust prices array
    if (newCount > devicePrices.length) {
      setDevicePrices([...devicePrices, ...Array(newCount - devicePrices.length).fill(0)])
    } else {
      setDevicePrices(devicePrices.slice(0, newCount))
    }
  }

  const handlePriceChange = (index: number, price: number) => {
    const newPrices = [...devicePrices]
    newPrices[index] = price
    setDevicePrices(newPrices)
  }

  const totalValue = useMemo(() => devicePrices.reduce((sum, p) => sum + p, 0), [devicePrices])
  const limitUsage = (totalValue / limits.value) * 100

  const calculate = () => {
    const warnings: string[] = []
    const devices: MobileCalculationResult["devices"] = []

    let totalYBT = 0
    let totalIMEI = 0
    let totalCommercialDuty = 0
    let totalCommercialVAT = 0
    let runningValue = 0

    devicePrices.forEach((price, index) => {
      const deviceNumber = index + 1
      const isPersonal = deviceNumber <= MOBILE_DEVICE_LIMIT
      const imeiFeee = imeiFeePer

      if (isPersonal) {
        // Personal regime - check against duty-free limit
        runningValue += price
        const excessValue = Math.max(0, runningValue - limits.value)
        const ybtDuty = excessValue > 0 ? price * YBT_RATE : 0 // Simplified: apply YBT if over limit

        if (excessValue > 0 && devices.filter((d) => d.regime === "personal" && d.ybtDuty > 0).length === 0) {
          // First device to exceed limit
          const actualExcess = Math.min(price, excessValue)
          devices.push({
            deviceNumber,
            price,
            regime: "personal",
            ybtDuty: actualExcess * YBT_RATE,
            imeiFeee,
            totalCost: price + actualExcess * YBT_RATE + imeiFeee,
          })
          totalYBT += actualExcess * YBT_RATE
        } else if (runningValue > limits.value) {
          devices.push({
            deviceNumber,
            price,
            regime: "personal",
            ybtDuty: price * YBT_RATE,
            imeiFeee,
            totalCost: price + price * YBT_RATE + imeiFeee,
          })
          totalYBT += price * YBT_RATE
        } else {
          devices.push({
            deviceNumber,
            price,
            regime: "personal",
            ybtDuty: 0,
            imeiFeee,
            totalCost: price + imeiFeee,
          })
        }
        totalIMEI += imeiFeee
      } else {
        // Commercial regime
        const duty = price * 0 // Mobile phones have 0% duty
        const vat = (price + duty) * 0.12

        devices.push({
          deviceNumber,
          price,
          regime: "commercial",
          ybtDuty: duty + vat,
          imeiFeee,
          totalCost: price + duty + vat + imeiFeee,
        })

        totalCommercialDuty += duty
        totalCommercialVAT += vat
        totalIMEI += imeiFeee
      }
    })

    if (deviceCount > MOBILE_DEVICE_LIMIT) {
      warnings.push(
        `You are importing ${deviceCount} devices. Only ${MOBILE_DEVICE_LIMIT} can be imported for personal use. ` +
          `Device(s) ${MOBILE_DEVICE_LIMIT + 1}${deviceCount > 3 ? `-${deviceCount}` : ""} will be processed as commercial imports.`,
      )
    }

    if (totalValue > limits.value) {
      warnings.push(
        `Total value ($${totalValue.toFixed(2)}) exceeds the ${transport} transport duty-free limit ($${limits.value}). ` +
          `YBT (30%) will be applied to the excess amount.`,
      )
    }

    const grandTotal = devices.reduce((sum, d) => sum + d.totalCost, 0)

    setResult({
      devices,
      totalProductValue: totalValue,
      totalYBT,
      totalIMEIFee: totalIMEI,
      totalCommercialDuty,
      totalCommercialVAT,
      grandTotal,
      grandTotalUZS: grandTotal * USD_TO_UZS_RATE,
      warnings,
    })
  }

  const canCalculate = devicePrices.every((p) => p > 0)

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Transport Selection */}
      <div className="bg-card border border-border rounded-xl p-6">
        <h3 className="font-semibold text-foreground mb-4">Transport Method</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {transportOptions.map((option) => {
            const Icon = option.icon
            const optionLimits = DUTY_FREE_LIMITS[option.id]
            return (
              <button
                key={option.id}
                onClick={() => setTransport(option.id)}
                className={cn(
                  "flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all",
                  transport === option.id ? "border-primary bg-primary/10" : "border-border hover:border-primary/50",
                )}
              >
                <Icon className={cn("w-6 h-6", transport === option.id ? "text-primary" : "text-muted-foreground")} />
                <span className="text-sm font-medium text-foreground">{option.label}</span>
                <span className="text-xs text-muted-foreground">${optionLimits.value} limit</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Device Input */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-foreground">Device Details</h3>
          <div className="flex items-center gap-2">
            <Label htmlFor="deviceCount" className="text-sm text-muted-foreground">
              Devices:
            </Label>
            <Input
              id="deviceCount"
              type="number"
              min="1"
              max="10"
              value={deviceCount}
              onChange={(e) => handleDeviceCountChange(Number.parseInt(e.target.value) || 1)}
              className="w-20"
            />
          </div>
        </div>

        {deviceCount > MOBILE_DEVICE_LIMIT && (
          <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 rounded-lg flex items-start gap-2">
            <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
            <p className="text-sm text-foreground">
              <strong>Over limit!</strong> Only 2 devices allowed for personal import. Device {MOBILE_DEVICE_LIMIT + 1}+
              will be processed as commercial import.
            </p>
          </div>
        )}

        <div className="space-y-4">
          {Array.from({ length: deviceCount }).map((_, index) => (
            <div key={index} className="flex items-center gap-4">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0",
                  index < MOBILE_DEVICE_LIMIT ? "bg-accent/10" : "bg-destructive/10",
                )}
              >
                <Smartphone
                  className={cn("w-5 h-5", index < MOBILE_DEVICE_LIMIT ? "text-accent" : "text-destructive")}
                />
              </div>
              <div className="flex-1">
                <Label className="text-sm text-muted-foreground">
                  Device {index + 1} Price (USD)
                  {index >= MOBILE_DEVICE_LIMIT && <span className="text-destructive ml-2">(Commercial)</span>}
                </Label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    type="number"
                    min="0"
                    step="1"
                    value={devicePrices[index] || ""}
                    onChange={(e) => handlePriceChange(index, Number.parseFloat(e.target.value) || 0)}
                    className="pl-8"
                    placeholder="Enter device price"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Limit Progress */}
        <div className="mt-6 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Duty-Free Limit Usage</span>
            <span className="font-medium text-foreground">
              ${totalValue.toFixed(2)} / ${limits.value}
            </span>
          </div>
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <div
              className={cn(
                "h-full transition-all duration-300",
                limitUsage >= 100 ? "bg-destructive" : limitUsage >= 80 ? "bg-warning" : "bg-accent",
              )}
              style={{ width: `${Math.min(limitUsage, 100)}%` }}
            />
          </div>
        </div>

        <div className="mt-4 p-3 bg-muted/50 rounded-lg flex items-start gap-2">
          <Info className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
          <p className="text-sm text-muted-foreground">
            IMEI Registration Fee: ${imeiFeePer.toFixed(2)} per device ({IMEI_FEE_BCU_PERCENTAGE * 100}% of BCU)
          </p>
        </div>

        <Button onClick={calculate} disabled={!canCalculate} className="w-full mt-6" size="lg">
          <Calculator className="w-5 h-5 mr-2" />
          Calculate Import Cost
        </Button>
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-6">
          {/* Total Cost Card */}
          <div className="bg-primary text-primary-foreground rounded-2xl p-6 text-center">
            <p className="text-primary-foreground/80 text-sm uppercase tracking-wide mb-2">Total Import Cost</p>
            <div className="text-4xl font-bold mb-2">
              ${result.grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <p className="text-primary-foreground/70">{result.grandTotalUZS.toLocaleString()} UZS</p>
          </div>

          {/* Warnings */}
          {result.warnings.length > 0 && (
            <div className="space-y-3">
              {result.warnings.map((warning, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 bg-destructive/10 border border-destructive/20 rounded-lg"
                >
                  <AlertTriangle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-foreground">{warning}</p>
                </div>
              ))}
            </div>
          )}

          {/* Device Breakdown */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="p-4 border-b border-border">
              <h3 className="font-semibold text-foreground">Per-Device Breakdown</h3>
            </div>
            <div className="divide-y divide-border">
              {result.devices.map((device, index) => (
                <div key={index} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "w-10 h-10 rounded-full flex items-center justify-center",
                        device.regime === "personal" ? "bg-accent/10" : "bg-destructive/10",
                      )}
                    >
                      <Smartphone
                        className={cn("w-5 h-5", device.regime === "personal" ? "text-accent" : "text-destructive")}
                      />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Device {device.deviceNumber}</p>
                      <p className="text-sm text-muted-foreground capitalize">
                        {device.regime} import • ${device.price.toFixed(2)}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm">
                    {device.ybtDuty > 0 && (
                      <div>
                        <span className="text-muted-foreground">
                          {device.regime === "personal" ? "YBT" : "Duty+VAT"}:
                        </span>
                        <span className="ml-1 font-medium text-foreground">${device.ybtDuty.toFixed(2)}</span>
                      </div>
                    )}
                    <div>
                      <span className="text-muted-foreground">IMEI:</span>
                      <span className="ml-1 font-medium text-foreground">${device.imeiFeee.toFixed(2)}</span>
                    </div>
                    <div className="font-semibold text-foreground">Total: ${device.totalCost.toFixed(2)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-xs text-muted-foreground uppercase">Product Value</p>
              <p className="text-xl font-semibold text-foreground mt-1">${result.totalProductValue.toFixed(2)}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-xs text-muted-foreground uppercase">YBT/Duties</p>
              <p className="text-xl font-semibold text-foreground mt-1">
                ${(result.totalYBT + result.totalCommercialDuty + result.totalCommercialVAT).toFixed(2)}
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-xs text-muted-foreground uppercase">IMEI Fees</p>
              <p className="text-xl font-semibold text-foreground mt-1">${result.totalIMEIFee.toFixed(2)}</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-xs text-muted-foreground uppercase">Total Payments</p>
              <p className="text-xl font-semibold text-accent mt-1">
                ${(result.grandTotal - result.totalProductValue).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
