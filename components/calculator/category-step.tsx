"use client"

import { Smartphone, Car, Pill, Package } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ProductCategory } from "@/lib/types"

interface CategoryStepProps {
  value: ProductCategory | null
  onChange: (category: ProductCategory) => void
}

const categories = [
  {
    id: "electronics" as ProductCategory,
    label: "Electronics",
    labelUz: "Elektronika",
    description: "Smartphones, tablets, laptops, and other electronic devices",
    icon: Smartphone,
  },
  {
    id: "automobiles" as ProductCategory,
    label: "Automobiles",
    labelUz: "Avtomobillar",
    description: "Cars, trucks, and other motor vehicles",
    icon: Car,
  },
  {
    id: "pharmaceuticals" as ProductCategory,
    label: "Pharmaceuticals",
    labelUz: "Dori vositalari",
    description: "Medicines, vitamins, and medical supplies",
    icon: Pill,
  },
  {
    id: "other" as ProductCategory,
    label: "Other Goods",
    labelUz: "Boshqa tovarlar",
    description: "Clothing, food, cosmetics, and all other products",
    icon: Package,
  },
]

export function CategoryStep({ value, onChange }: CategoryStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-foreground mb-2">Select Product Category</h2>
        <p className="text-muted-foreground">Choose the category that best matches your import goods</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {categories.map((category) => {
          const Icon = category.icon
          const isSelected = value === category.id

          return (
            <button
              key={category.id}
              onClick={() => onChange(category.id)}
              className={cn(
                "relative flex flex-col items-center text-center p-6 rounded-xl border-2 transition-all duration-200",
                "hover:border-primary/50 hover:bg-primary/5",
                isSelected ? "border-primary bg-primary/10 shadow-md" : "border-border bg-card",
              )}
            >
              <div
                className={cn(
                  "w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors",
                  isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
                )}
              >
                <Icon className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-lg text-foreground mb-1">{category.label}</h3>
              <p className="text-xs text-muted-foreground mb-1">{category.labelUz}</p>
              <p className="text-sm text-muted-foreground">{category.description}</p>
              {isSelected && (
                <div className="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-primary-foreground"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </button>
          )
        })}
      </div>

      <div className="bg-muted/50 rounded-lg p-4">
        <p className="text-sm text-muted-foreground text-center">
          Different categories have specific calculation rules, documentation requirements, and fee structures. Select
          the correct category for accurate results.
        </p>
      </div>
    </div>
  )
}
