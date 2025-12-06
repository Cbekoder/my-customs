"use client"

import type React from "react"

import { useState } from "react"
import { Settings, Database, DollarSign, Calculator, FileText, Users, TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { BCU_VALUE_UZS, USD_TO_UZS_RATE, VAT_RATE, YBT_RATE, DUTY_FREE_LIMITS } from "@/lib/tariff-data"

const tabs = [
  { id: "overview", label: "Overview", icon: TrendingUp },
  { id: "rates", label: "Tax Rates", icon: Calculator },
  { id: "limits", label: "Duty-Free Limits", icon: DollarSign },
  { id: "tariffs", label: "Tariff Codes", icon: Database },
  { id: "settings", label: "Settings", icon: Settings },
]

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  // Editable state (demo only - would connect to database)
  const [bcuValue, setBcuValue] = useState(BCU_VALUE_UZS)
  const [exchangeRate, setExchangeRate] = useState(USD_TO_UZS_RATE)
  const [vatRate, setVatRate] = useState(VAT_RATE * 100)
  const [ybtRate, setYbtRate] = useState(YBT_RATE * 100)

  const [airLimit, setAirLimit] = useState(DUTY_FREE_LIMITS.air.value)
  const [railLimit, setRailLimit] = useState(DUTY_FREE_LIMITS.rail.value)
  const [carLimit, setCarLimit] = useState(DUTY_FREE_LIMITS.car.value)
  const [footLimit, setFootLimit] = useState(DUTY_FREE_LIMITS.foot.value)

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Sidebar */}
      <div className="lg:w-64 flex-shrink-0">
        <div className="bg-card border border-border rounded-xl p-2 sticky top-20">
          <nav className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors",
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              )
            })}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatCard title="BCU Value" value={`${bcuValue.toLocaleString()} UZS`} icon={DollarSign} change="+2.5%" />
              <StatCard
                title="Exchange Rate"
                value={`${exchangeRate.toLocaleString()} UZS/USD`}
                icon={TrendingUp}
                change="+0.3%"
              />
              <StatCard title="VAT Rate" value={`${vatRate}%`} icon={Calculator} change="0%" />
              <StatCard title="Total Tariff Codes" value="15" icon={Database} change="+3 new" />
            </div>

            {/* Quick Actions */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button variant="outline" className="justify-start bg-transparent">
                  <FileText className="w-4 h-4 mr-2" />
                  Export Tariff Data
                </Button>
                <Button variant="outline" className="justify-start bg-transparent">
                  <Database className="w-4 h-4 mr-2" />
                  Import TIF TN Update
                </Button>
                <Button variant="outline" className="justify-start bg-transparent">
                  <Users className="w-4 h-4 mr-2" />
                  Manage Users
                </Button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="font-semibold text-foreground mb-4">System Status</h3>
              <div className="space-y-3">
                <StatusItem status="success" message="Tariff database: Up to date" />
                <StatusItem status="success" message="Exchange rate: Last updated 2 hours ago" />
                <StatusItem status="warning" message="BCU value: Review required (monthly update)" />
                <StatusItem status="success" message="API services: All operational" />
              </div>
            </div>
          </div>
        )}

        {activeTab === "rates" && (
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-semibold text-foreground mb-6">Tax Rate Configuration</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="bcuValue" className="text-foreground">
                    BCU Value (UZS)
                  </Label>
                  <Input
                    id="bcuValue"
                    type="number"
                    value={bcuValue}
                    onChange={(e) => setBcuValue(Number(e.target.value))}
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Base Calculation Unit for fees</p>
                </div>

                <div>
                  <Label htmlFor="exchangeRate" className="text-foreground">
                    USD/UZS Exchange Rate
                  </Label>
                  <Input
                    id="exchangeRate"
                    type="number"
                    value={exchangeRate}
                    onChange={(e) => setExchangeRate(Number(e.target.value))}
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Official exchange rate</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="vatRate" className="text-foreground">
                    VAT Rate (%)
                  </Label>
                  <Input
                    id="vatRate"
                    type="number"
                    value={vatRate}
                    onChange={(e) => setVatRate(Number(e.target.value))}
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Standard VAT rate</p>
                </div>

                <div>
                  <Label htmlFor="ybtRate" className="text-foreground">
                    YBT Rate (%)
                  </Label>
                  <Input
                    id="ybtRate"
                    type="number"
                    value={ybtRate}
                    onChange={(e) => setYbtRate(Number(e.target.value))}
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Single Customs Payment rate for individuals</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border flex justify-end gap-4">
              <Button variant="outline" className="bg-transparent">
                Reset to Default
              </Button>
              <Button>Save Changes</Button>
            </div>
          </div>
        )}

        {activeTab === "limits" && (
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-semibold text-foreground mb-6">Duty-Free Limits by Transport</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="airLimit" className="text-foreground">
                  Air Transport Limit (USD)
                </Label>
                <Input
                  id="airLimit"
                  type="number"
                  value={airLimit}
                  onChange={(e) => setAirLimit(Number(e.target.value))}
                  className="mt-1"
                />
                <p className="text-xs text-muted-foreground mt-1">Per entry limit for air travelers</p>
              </div>

              <div>
                <Label htmlFor="railLimit" className="text-foreground">
                  Rail/River Transport Limit (USD)
                </Label>
                <Input
                  id="railLimit"
                  type="number"
                  value={railLimit}
                  onChange={(e) => setRailLimit(Number(e.target.value))}
                  className="mt-1"
                />
                <p className="text-xs text-muted-foreground mt-1">Per entry limit for train/boat travelers</p>
              </div>

              <div>
                <Label htmlFor="carLimit" className="text-foreground">
                  Road Transport Limit (USD)
                </Label>
                <Input
                  id="carLimit"
                  type="number"
                  value={carLimit}
                  onChange={(e) => setCarLimit(Number(e.target.value))}
                  className="mt-1"
                />
                <p className="text-xs text-muted-foreground mt-1">Per entry limit for personal vehicles</p>
              </div>

              <div>
                <Label htmlFor="footLimit" className="text-foreground">
                  On Foot Limit (USD)
                </Label>
                <Input
                  id="footLimit"
                  type="number"
                  value={footLimit}
                  onChange={(e) => setFootLimit(Number(e.target.value))}
                  className="mt-1"
                />
                <p className="text-xs text-muted-foreground mt-1">Per entry limit for pedestrian crossings</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-muted/50 rounded-lg">
              <h4 className="font-medium text-foreground mb-2">Special Limits</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Extended Air Limit (Annual):</span>
                  <span className="ml-2 font-medium text-foreground">$2,000</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Mobile Phone Limit:</span>
                  <span className="ml-2 font-medium text-foreground">2 devices per entry</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-border flex justify-end gap-4">
              <Button variant="outline" className="bg-transparent">
                Reset to Default
              </Button>
              <Button>Save Changes</Button>
            </div>
          </div>
        )}

        {activeTab === "tariffs" && (
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-foreground">Tariff Code Management</h3>
              <Button>
                <Database className="w-4 h-4 mr-2" />
                Add Tariff Code
              </Button>
            </div>

            <div className="text-center py-12 text-muted-foreground">
              <Database className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Tariff code editor coming soon.</p>
              <p className="text-sm mt-1">Use the Import feature to bulk update tariff codes.</p>
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-semibold text-foreground mb-6">System Settings</h3>

            <div className="space-y-6">
              <div className="flex items-center justify-between py-4 border-b border-border">
                <div>
                  <p className="font-medium text-foreground">Maintenance Mode</p>
                  <p className="text-sm text-muted-foreground">Disable calculator for users during updates</p>
                </div>
                <Button variant="outline" className="bg-transparent">
                  Disabled
                </Button>
              </div>

              <div className="flex items-center justify-between py-4 border-b border-border">
                <div>
                  <p className="font-medium text-foreground">Auto-Update Exchange Rate</p>
                  <p className="text-sm text-muted-foreground">Fetch rate from Central Bank API daily</p>
                </div>
                <Button variant="outline" className="bg-transparent">
                  Enabled
                </Button>
              </div>

              <div className="flex items-center justify-between py-4 border-b border-border">
                <div>
                  <p className="font-medium text-foreground">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive alerts for rate changes</p>
                </div>
                <Button variant="outline" className="bg-transparent">
                  Configure
                </Button>
              </div>

              <div className="flex items-center justify-between py-4">
                <div>
                  <p className="font-medium text-foreground">API Access</p>
                  <p className="text-sm text-muted-foreground">Generate API keys for integrations</p>
                </div>
                <Button variant="outline" className="bg-transparent">
                  Manage Keys
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function StatCard({
  title,
  value,
  icon: Icon,
  change,
}: {
  title: string
  value: string
  icon: React.ComponentType<{ className?: string }>
  change: string
}) {
  return (
    <div className="bg-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <span className="text-xs text-accent font-medium">{change}</span>
      </div>
      <p className="text-sm text-muted-foreground">{title}</p>
      <p className="text-xl font-bold text-foreground mt-1">{value}</p>
    </div>
  )
}

function StatusItem({ status, message }: { status: "success" | "warning" | "error"; message: string }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={cn(
          "w-2 h-2 rounded-full",
          status === "success" && "bg-accent",
          status === "warning" && "bg-warning",
          status === "error" && "bg-destructive",
        )}
      />
      <span className="text-sm text-muted-foreground">{message}</span>
    </div>
  )
}
