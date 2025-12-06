"use client"

import { useState, useCallback } from "react"
import { ArrowLeft, ArrowRight, Calculator } from "lucide-react"
import { Button } from "@/components/ui/button"
import { WizardProgress } from "./wizard-progress"
import { UserTypeStep } from "./user-type-step"
import { TransportStep } from "./transport-step"
import { ProductStep } from "./product-step"
import { DetailsStep } from "./details-step"
import { ResultsDisplay } from "./results-display"
import { calculateImportCost } from "@/lib/calculator"
import type { CalculatorFormData, CalculationResult, UserType, TransportType } from "@/lib/types"

const STEPS = ["Type", "Transport", "Product", "Details", "Results"]

export function CalculatorWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [result, setResult] = useState<CalculationResult | null>(null)

  // Form state
  const [userType, setUserType] = useState<UserType | null>(null)
  const [transportType, setTransportType] = useState<TransportType | null>(null)
  const [productCode, setProductCode] = useState("")
  const [productDescription, setProductDescription] = useState("")
  const [sellingPrice, setSellingPrice] = useState(0)
  const [logisticsCost, setLogisticsCost] = useState(0)
  const [insuranceCost, setInsuranceCost] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [weight, setWeight] = useState(0)
  const [useReferencePrice, setUseReferencePrice] = useState(false)

  const canProceed = useCallback(() => {
    switch (currentStep) {
      case 1:
        return userType !== null
      case 2:
        return transportType !== null
      case 3:
        return productCode !== ""
      case 4:
        return sellingPrice > 0 && quantity > 0
      default:
        return true
    }
  }, [currentStep, userType, transportType, productCode, sellingPrice, quantity])

  const handleNext = () => {
    if (currentStep === 4) {
      // Calculate results
      const formData: CalculatorFormData = {
        userType: userType!,
        transportType: transportType!,
        productCode,
        productDescription,
        sellingPrice,
        logisticsCost,
        insuranceCost,
        quantity,
        weight,
        useReferencePrice,
      }
      const calculationResult = calculateImportCost(formData)
      setResult(calculationResult)
    }
    setCurrentStep((prev) => Math.min(prev + 1, STEPS.length))
  }

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
    if (currentStep === 5) {
      setResult(null)
    }
  }

  const handleReset = () => {
    setCurrentStep(1)
    setResult(null)
    setUserType(null)
    setTransportType(null)
    setProductCode("")
    setProductDescription("")
    setSellingPrice(0)
    setLogisticsCost(0)
    setInsuranceCost(0)
    setQuantity(1)
    setWeight(0)
    setUseReferencePrice(false)
  }

  const handleProductChange = (code: string, description: string) => {
    setProductCode(code)
    setProductDescription(description)
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <WizardProgress currentStep={currentStep} totalSteps={STEPS.length} stepLabels={STEPS} />
      </div>

      {/* Step Content */}
      <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm">
        {currentStep === 1 && <UserTypeStep value={userType} onChange={setUserType} />}

        {currentStep === 2 && userType && (
          <TransportStep value={transportType} userType={userType} onChange={setTransportType} />
        )}

        {currentStep === 3 && <ProductStep value={productCode} onChange={handleProductChange} />}

        {currentStep === 4 && userType && transportType && (
          <DetailsStep
            userType={userType}
            transportType={transportType}
            productCode={productCode}
            sellingPrice={sellingPrice}
            logisticsCost={logisticsCost}
            insuranceCost={insuranceCost}
            quantity={quantity}
            weight={weight}
            useReferencePrice={useReferencePrice}
            onSellingPriceChange={setSellingPrice}
            onLogisticsCostChange={setLogisticsCost}
            onInsuranceCostChange={setInsuranceCost}
            onQuantityChange={setQuantity}
            onWeightChange={setWeight}
            onUseReferencePriceChange={setUseReferencePrice}
          />
        )}

        {currentStep === 5 && result && <ResultsDisplay result={result} onRecalculate={handleReset} />}

        {/* Navigation */}
        {currentStep < 5 && (
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
            <Button variant="outline" onClick={handleBack} disabled={currentStep === 1}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            <Button onClick={handleNext} disabled={!canProceed()}>
              {currentStep === 4 ? (
                <>
                  <Calculator className="w-4 h-4 mr-2" />
                  Calculate
                </>
              ) : (
                <>
                  Next
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
