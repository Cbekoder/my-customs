"use client"

import { Plane, Train, Car, Footprints } from "lucide-react"
import { cn } from "@/lib/utils"
import type { TransportType, UserType } from "@/lib/types"
import { DUTY_FREE_LIMITS, EXTENDED_AIR_LIMIT } from "@/lib/tariff-data"

interface TransportStepProps {
  value: TransportType | null
  userType: UserType
  onChange: (value: TransportType) => void
}

const transportOptions = [
  {
    id: "air" as TransportType,
    label: "Air Transport",
    labelUz: "Havo transporti",
    icon: Plane,
    description: "International flights",
  },
  {
    id: "rail" as TransportType,
    label: "Rail/River Transport",
    labelUz: "Temir yo'l/Daryo",
    icon: Train,
    description: "Train or boat",
  },
  {
    id: "car" as TransportType,
    label: "Road Transport",
    labelUz: "Avtomobil",
    icon: Car,
    description: "Personal vehicle",
  },
  {
    id: "foot" as TransportType,
    label: "On Foot",
    labelUz: "Piyoda",
    icon: Footprints,
    description: "Walking across border",
  },
]

export function TransportStep({ value, userType, onChange }: TransportStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold text-foreground">Select Transport Method</h2>
        <p className="text-muted-foreground">
          {userType === "individual"
            ? "Transport type affects your duty-free limits"
            : "Choose how goods will be transported to Uzbekistan"}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {transportOptions.map((option) => {
          const Icon = option.icon
          const limits = DUTY_FREE_LIMITS[option.id]

          return (
            <button
              key={option.id}
              onClick={() => onChange(option.id)}
              className={cn(
                "flex flex-col items-center gap-3 p-4 rounded-lg border-2 transition-all duration-200 hover:border-primary/50 hover:bg-primary/5",
                value === option.id ? "border-primary bg-primary/10" : "border-border bg-card",
              )}
            >
              <div
                className={cn(
                  "w-12 h-12 rounded-full flex items-center justify-center",
                  value === option.id ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                )}
              >
                <Icon className="w-6 h-6" />
              </div>
              <div className="text-center">
                <h3 className="font-medium text-sm text-foreground">{option.label}</h3>
                <p className="text-xs text-muted-foreground">{option.labelUz}</p>
              </div>
              {userType === "individual" && (
                <div className="text-xs text-center space-y-1">
                  <div className="text-accent font-medium">${limits.value} limit</div>
                  <div className="text-muted-foreground">{limits.weight}kg max</div>
                  {option.id === "air" && (
                    <div className="text-xs text-muted-foreground">(${EXTENDED_AIR_LIMIT}/year)</div>
                  )}
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}
