"use client"

import { Building2, User } from "lucide-react"
import { cn } from "@/lib/utils"
import type { UserType } from "@/lib/types"

interface UserTypeStepProps {
  value: UserType | null
  onChange: (value: UserType) => void
}

export function UserTypeStep({ value, onChange }: UserTypeStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold text-foreground">Select Import Type</h2>
        <p className="text-muted-foreground">
          Choose whether you are importing for personal use or commercial purposes
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button
          onClick={() => onChange("individual")}
          className={cn(
            "flex flex-col items-center gap-4 p-6 rounded-lg border-2 transition-all duration-200 hover:border-primary/50 hover:bg-primary/5",
            value === "individual" ? "border-primary bg-primary/10" : "border-border bg-card",
          )}
        >
          <div
            className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center",
              value === "individual" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
            )}
          >
            <User className="w-8 h-8" />
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-lg text-foreground">Individual</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Personal use imports with duty-free limits and simplified YBT regime
            </p>
          </div>
          <div className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">Shaxsiy Ehtiyoj</div>
        </button>

        <button
          onClick={() => onChange("commercial")}
          className={cn(
            "flex flex-col items-center gap-4 p-6 rounded-lg border-2 transition-all duration-200 hover:border-primary/50 hover:bg-primary/5",
            value === "commercial" ? "border-primary bg-primary/10" : "border-border bg-card",
          )}
        >
          <div
            className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center",
              value === "commercial" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
            )}
          >
            <Building2 className="w-8 h-8" />
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-lg text-foreground">Commercial Entity</h3>
            <p className="text-sm text-muted-foreground mt-1">
              Business imports with full customs duties, VAT, and excise taxes
            </p>
          </div>
          <div className="text-xs text-muted-foreground bg-muted px-3 py-1 rounded-full">Tijoriy Maqsadda</div>
        </button>
      </div>
    </div>
  )
}
