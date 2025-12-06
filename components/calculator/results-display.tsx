"use client"

import { useMemo } from "react"
import { AlertTriangle, Info, FileText, ChevronDown, ChevronUp, Calculator } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import type { CalculationResult } from "@/lib/types"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts"

interface ResultsDisplayProps {
  result: CalculationResult
  onRecalculate: () => void
}

const CHART_COLORS = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
]

export function ResultsDisplay({ result, onRecalculate }: ResultsDisplayProps) {
  const [showFormulas, setShowFormulas] = useState(false)

  const pieData = useMemo(() => {
    const data = [
      { name: "Product Value", value: result.customsValue },
      { name: "Customs Duty", value: result.customsDuty },
      { name: "VAT", value: result.vat },
      { name: "Customs Fee", value: result.customsFee },
    ]

    if (result.exciseTax > 0) {
      data.push({ name: "Excise Tax", value: result.exciseTax })
    }

    if (result.imeiRegistrationFee && result.imeiRegistrationFee > 0) {
      data.push({ name: "IMEI Fee", value: result.imeiRegistrationFee })
    }

    return data.filter((d) => d.value > 0)
  }, [result])

  const barData = useMemo(() => {
    return [
      { name: "Duty", value: result.customsDuty },
      { name: "VAT", value: result.vat },
      { name: "Fee", value: result.customsFee },
      ...(result.exciseTax > 0 ? [{ name: "Excise", value: result.exciseTax }] : []),
      ...(result.imeiRegistrationFee ? [{ name: "IMEI", value: result.imeiRegistrationFee }] : []),
    ]
  }, [result])

  return (
    <div className="space-y-6">
      {/* Main Result Card */}
      <div className="bg-primary text-primary-foreground rounded-2xl p-6 md:p-8 text-center">
        <p className="text-primary-foreground/80 text-sm uppercase tracking-wide mb-2">Total Import Cost</p>
        <div className="text-4xl md:text-5xl font-bold mb-2">
          ${result.totalImportCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
        <p className="text-primary-foreground/70 text-lg">{result.totalInUZS.toLocaleString()} UZS</p>
        <p className="text-primary-foreground/60 text-sm mt-2">
          Exchange rate: 1 USD = {result.exchangeRate.toLocaleString()} UZS
        </p>
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

      {/* Cost Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Customs Value</p>
          <p className="text-xl font-semibold text-foreground mt-1">
            ${result.customsValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Customs Duty</p>
          <p className="text-xl font-semibold text-foreground mt-1">
            ${result.customsDuty.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">VAT (12%)</p>
          <p className="text-xl font-semibold text-foreground mt-1">
            ${result.vat.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">Total Payments</p>
          <p className="text-xl font-semibold text-accent mt-1">
            $
            {result.totalMandatoryPayments.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="font-semibold text-foreground mb-4">Cost Breakdown</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) =>
                    `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                  }
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-card border border-border rounded-lg p-4">
          <h3 className="font-semibold text-foreground mb-4">Mandatory Payments</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" tickFormatter={(v) => `$${v}`} />
                <YAxis type="category" dataKey="name" width={60} />
                <Tooltip
                  formatter={(value: number) =>
                    `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                  }
                />
                <Bar dataKey="value" fill="hsl(var(--chart-1))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Detailed Breakdown */}
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
          <div className="border-t border-border p-4 space-y-4">
            {result.breakdown.map((item, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row md:items-center justify-between gap-2 py-2 border-b border-border last:border-0"
              >
                <div>
                  <p className="font-medium text-foreground">{item.label}</p>
                  {item.formula && <p className="text-sm text-muted-foreground font-mono">{item.formula}</p>}
                </div>
                <p className="font-semibold text-foreground">
                  ${item.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button onClick={onRecalculate} className="flex-1" size="lg">
          <Calculator className="w-5 h-5 mr-2" />
          Calculate Again
        </Button>
        <Button variant="outline" className="flex-1 bg-transparent" size="lg">
          <FileText className="w-5 h-5 mr-2" />
          Download Report
        </Button>
      </div>

      {/* Disclaimer */}
      <div className="flex items-start gap-2 p-4 bg-muted/50 rounded-lg">
        <Info className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
        <p className="text-sm text-muted-foreground">
          This calculation is for informational purposes only. Actual duties and taxes may vary based on current
          exchange rates, customs valuation, and regulatory changes. Always verify with Uzbekistan Customs authorities
          before import.
        </p>
      </div>
    </div>
  )
}
