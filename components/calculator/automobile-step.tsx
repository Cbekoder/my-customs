"use client"

import { useState, useEffect } from "react"
import { Car, Fuel, Calendar, Gauge, Search, Info } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CAR_BRANDS } from "@/lib/tariff-data"
import type { AutomobileData, FuelType } from "@/lib/types"

interface AutomobileStepProps {
  value: AutomobileData | null
  onChange: (data: AutomobileData) => void
}

export function AutomobileStep({ value, onChange }: AutomobileStepProps) {
  const [brand, setBrand] = useState(value?.brand || "")
  const [model, setModel] = useState(value?.model || "")
  const [year, setYear] = useState(value?.year || new Date().getFullYear())
  const [engineDisplacement, setEngineDisplacement] = useState(value?.engineDisplacement || 0)
  const [fuelType, setFuelType] = useState<FuelType>(value?.fuelType || "petrol")
  const [price, setPrice] = useState(value?.price || 0)
  const [logisticsCost, setLogisticsCost] = useState(value?.logisticsCost || 0)

  const selectedBrand = CAR_BRANDS.find((b) => b.brand === brand)
  const selectedModel = selectedBrand?.models.find((m) => m.name === model)

  // Auto-populate engine displacement when model is selected
  useEffect(() => {
    if (selectedModel && selectedModel.defaultEngine) {
      setEngineDisplacement(selectedModel.defaultEngine)
      // Auto-detect EV
      if (selectedModel.defaultEngine === 0) {
        setFuelType("ev")
      }
    }
  }, [selectedModel])

  // Update parent when any value changes
  useEffect(() => {
    if (brand && model && year && price > 0) {
      onChange({
        brand,
        model,
        year,
        engineDisplacement,
        fuelType,
        price,
        logisticsCost,
      })
    }
  }, [brand, model, year, engineDisplacement, fuelType, price, logisticsCost, onChange])

  const currentYear = new Date().getFullYear()
  const vehicleAge = currentYear - year
  const years = Array.from({ length: 30 }, (_, i) => currentYear - i)

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">Vehicle Details</h2>
        <p className="text-muted-foreground">Enter the details of the automobile you want to import</p>
      </div>

      {/* Brand and Model Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="brand" className="flex items-center gap-2">
            <Car className="w-4 h-4" />
            Brand
          </Label>
          <Select
            value={brand}
            onValueChange={(v) => {
              setBrand(v)
              setModel("")
            }}
          >
            <SelectTrigger id="brand">
              <SelectValue placeholder="Select brand" />
            </SelectTrigger>
            <SelectContent>
              {CAR_BRANDS.map((b) => (
                <SelectItem key={b.brand} value={b.brand}>
                  {b.brand}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="model" className="flex items-center gap-2">
            <Search className="w-4 h-4" />
            Model
          </Label>
          <Select value={model} onValueChange={setModel} disabled={!brand}>
            <SelectTrigger id="model">
              <SelectValue placeholder="Select model" />
            </SelectTrigger>
            <SelectContent>
              {selectedBrand?.models.map((m) => (
                <SelectItem key={m.name} value={m.name}>
                  {m.name} {m.defaultEngine === 0 ? "(EV)" : `(${m.defaultEngine}cc)`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Year and Fuel Type */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="year" className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Production Year
          </Label>
          <Select value={year.toString()} onValueChange={(v) => setYear(Number.parseInt(v))}>
            <SelectTrigger id="year">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((y) => (
                <SelectItem key={y} value={y.toString()}>
                  {y} {y === currentYear ? "(New)" : `(${currentYear - y} years old)`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="fuelType" className="flex items-center gap-2">
            <Fuel className="w-4 h-4" />
            Fuel Type
          </Label>
          <Select value={fuelType} onValueChange={(v) => setFuelType(v as FuelType)}>
            <SelectTrigger id="fuelType">
              <SelectValue placeholder="Select fuel type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="petrol">Petrol</SelectItem>
              <SelectItem value="diesel">Diesel</SelectItem>
              <SelectItem value="hybrid">Hybrid</SelectItem>
              <SelectItem value="ev">Electric (EV)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Engine Displacement */}
      <div className="space-y-2">
        <Label htmlFor="engine" className="flex items-center gap-2">
          <Gauge className="w-4 h-4" />
          Engine Displacement (cm³)
        </Label>
        <Input
          id="engine"
          type="number"
          min={0}
          max={10000}
          value={engineDisplacement || ""}
          onChange={(e) => setEngineDisplacement(Number.parseInt(e.target.value) || 0)}
          placeholder="e.g., 2000"
          disabled={fuelType === "ev"}
        />
        {fuelType === "ev" && (
          <p className="text-sm text-muted-foreground">Electric vehicles do not have engine displacement</p>
        )}
      </div>

      {/* Price and Logistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="price">Vehicle Price (USD)</Label>
          <Input
            id="price"
            type="number"
            min={0}
            value={price || ""}
            onChange={(e) => setPrice(Number.parseFloat(e.target.value) || 0)}
            placeholder="e.g., 25000"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="logistics">Logistics/Shipping Cost (USD)</Label>
          <Input
            id="logistics"
            type="number"
            min={0}
            value={logisticsCost || ""}
            onChange={(e) => setLogisticsCost(Number.parseFloat(e.target.value) || 0)}
            placeholder="e.g., 2000"
          />
        </div>
      </div>

      {/* Info Box */}
      {brand && model && price > 0 && (
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div className="space-y-1 text-sm">
              <p className="font-medium text-foreground">
                {brand} {model} ({year})
              </p>
              <p className="text-muted-foreground">
                {fuelType === "ev"
                  ? "Electric Vehicle"
                  : `${engineDisplacement}cc ${fuelType.charAt(0).toUpperCase() + fuelType.slice(1)}`}
                {" • "}
                {vehicleAge === 0 ? "New" : `${vehicleAge} years old`}
              </p>
              <p className="text-muted-foreground">
                Base value: ${price.toLocaleString()} + ${logisticsCost.toLocaleString()} shipping
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Age Warning */}
      {vehicleAge >= 7 && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
          <p className="text-sm text-foreground">
            <strong>Warning:</strong> Vehicles older than 7 years are subject to higher import duties due to
            environmental regulations.
          </p>
        </div>
      )}
    </div>
  )
}
