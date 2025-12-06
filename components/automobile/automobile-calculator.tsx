"use client"

import { useState, useCallback } from "react"
import { Calculator, Car, Info, TrendingUp, FileText, ChevronDown, ChevronUp, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AutomobileStep } from "@/components/calculator/automobile-step"
import { calculateAutomobileImport } from "@/lib/calculator"
import type { AutomobileData, CalculationResult } from "@/lib/types"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"

const CHART_COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
]

export function AutomobileCalculator() {
  const [automobileData, setAutomobileData] = useState<AutomobileData | null>(null)
  const [result, setResult] = useState<CalculationResult | null>(null)
  const [showFormulas, setShowFormulas] = useState(false)
  const [showDocuments, setShowDocuments] = useState(false)

  const handleCalculate = useCallback(() => {
    if (!automobileData) return

    const calculationResult = calculateAutomobileImport({
      userType: "commercial",
      transportType: "car",
      productCategory: "automobiles",
      productCode: automobileData.fuelType === "ev" ? "8703800000" : "8703230000",
      productDescription: `${automobileData.brand} ${automobileData.model}`,
      sellingPrice: automobileData.price,
      logisticsCost: automobileData.logisticsCost,
      insuranceCost: 0,
      quantity: 1,
      weight: 0,
      useReferencePrice: false,
      automobileData,
    })

    setResult(calculationResult)
  }, [automobileData])

  const handleReset = () => {
    setAutomobileData(null)
    setResult(null)
  }

  const canCalculate = automobileData && automobileData.brand && automobileData.model && automobileData.price > 0

  if (result) {
    const pieData = [
      { name: "Vehicle Value", value: result.customsValue },
      { name: "Customs Duty", value: result.customsDuty },
      { name: "VAT", value: result.vat },
      ...(result.exciseTax > 0 ? [{ name: "Excise Tax", value: result.exciseTax }] : []),
      ...(result.utilizationFee ? [{ name: "Utilization Fee", value: result.utilizationFee }] : []),
      { name: "Customs Fee", value: result.customsFee },
    ].filter((d) => d.value > 0)

    const barData = [
      { name: "Duty", value: result.customsDuty },
      { name: "VAT", value: result.vat },
      ...(result.exciseTax > 0 ? [{ name: "Excise", value: result.exciseTax }] : []),
      ...(result.utilizationFee ? [{ name: "Utilization", value: result.utilizationFee }] : []),
      { name: "Fee", value: result.customsFee },
    ]

    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Main Result */}
        <div className="bg-primary text-primary-foreground rounded-2xl p-6 md:p-8 text-center">
          <p className="text-primary-foreground/80 text-sm uppercase tracking-wide mb-2">Total Import Cost</p>
          <div className="text-4xl md:text-5xl font-bold mb-2">
            ${result.totalImportCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <p className="text-primary-foreground/70 text-lg">{result.totalInUZS.toLocaleString()} UZS</p>
          <p className="text-primary-foreground/60 text-sm mt-2">
            {automobileData?.brand} {automobileData?.model} ({automobileData?.year})
          </p>
        </div>

        {/* Financial Impact */}
        <div className="bg-accent/10 border border-accent/20 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-6 h-6 text-accent" />
            <h3 className="font-semibold text-lg text-foreground">Financial Impact Analysis</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-card rounded-lg border border-border">
              <p className="text-sm text-muted-foreground mb-1">Vehicle Price</p>
              <p className="text-2xl font-bold text-foreground">${automobileData?.price.toLocaleString()}</p>
            </div>
            <div className="text-center p-4 bg-card rounded-lg border border-border">
              <p className="text-sm text-muted-foreground mb-1">Total Fees & Taxes</p>
              <p className="text-2xl font-bold text-accent">
                ${result.totalMandatoryPayments.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </p>
            </div>
            <div className="text-center p-4 bg-card rounded-lg border border-border">
              <p className="text-sm text-muted-foreground mb-1">Cost Increase</p>
              <p className="text-2xl font-bold text-destructive">+{result.costIncreasePercentage.toFixed(1)}%</p>
            </div>
          </div>
        </div>

        {/* Warnings */}
        {result.warnings.length > 0 && (
          <div className="space-y-2">
            {result.warnings.map((warning, index) => (
              <div key={index} className="flex items-start gap-3 p-4 bg-muted/50 border border-border rounded-lg">
                <Info className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <p className="text-sm text-foreground">{warning}</p>
              </div>
            ))}
          </div>
        )}

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-4">Cost Breakdown</h3>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pieData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-3 mt-2">
              {pieData.map((item, index) => (
                <div key={item.name} className="flex items-center gap-2 text-xs">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}
                  />
                  <span className="text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-4">Mandatory Payments</h3>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                  <XAxis type="number" tickFormatter={(v) => `$${v}`} />
                  <YAxis type="category" dataKey="name" width={70} />
                  <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
                  <Bar dataKey="value" fill="hsl(var(--chart-1))" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Documents */}
        {result.documentRequirements.length > 0 && (
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            <button
              onClick={() => setShowDocuments(!showDocuments)}
              className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-muted-foreground" />
                <span className="font-semibold text-foreground">Required Documents</span>
              </div>
              {showDocuments ? (
                <ChevronUp className="w-5 h-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-5 h-5 text-muted-foreground" />
              )}
            </button>
            {showDocuments && (
              <div className="border-t border-border p-4">
                <div className="space-y-3">
                  {result.documentRequirements.map((doc, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-2 border-b border-border last:border-0"
                    >
                      <div>
                        <p className="font-medium text-foreground">{doc.name}</p>
                        <p className="text-sm text-muted-foreground">{doc.issuingAuthority}</p>
                      </div>
                      <p className="font-medium text-foreground">
                        {doc.estimatedFee > 0 ? `$${doc.estimatedFee}` : "Free"}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Calculation Details */}
        <div className="bg-card border border-border rounded-lg overflow-hidden">
          <button
            onClick={() => setShowFormulas(!showFormulas)}
            className="w-full flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-muted-foreground" />
              <span className="font-semibold text-foreground">Calculation Details</span>
            </div>
            {showFormulas ? (
              <ChevronUp className="w-5 h-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="w-5 h-5 text-muted-foreground" />
            )}
          </button>
          {showFormulas && (
            <div className="border-t border-border p-4 space-y-3">
              {result.breakdown.map((item, index) => (
                <div key={index} className="flex justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <p className="font-medium text-foreground">{item.label}</p>
                    {item.formula && <p className="text-sm text-muted-foreground font-mono">{item.formula}</p>}
                  </div>
                  <p className="font-semibold text-foreground">${item.value.toLocaleString()}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Button onClick={handleReset} className="flex-1" size="lg">
            <Calculator className="w-5 h-5 mr-2" />
            Calculate Another Vehicle
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-card border border-border rounded-xl p-6 md:p-8">
        <AutomobileStep value={automobileData} onChange={setAutomobileData} />

        <div className="mt-8 pt-6 border-t border-border">
          <Button onClick={handleCalculate} disabled={!canCalculate} className="w-full" size="lg">
            <Car className="w-5 h-5 mr-2" />
            Calculate Import Cost
          </Button>
        </div>
      </div>
    </div>
  )
}
