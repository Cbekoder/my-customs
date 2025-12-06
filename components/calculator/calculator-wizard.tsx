"use client"

import { useState, useCallback } from "react"
import { ArrowLeft, ArrowRight, Calculator } from "lucide-react"
import { Button } from "@/components/ui/button"
import { WizardProgress } from "./wizard-progress"
import { CategoryStep } from "./category-step"
import { UserTypeStep } from "./user-type-step"
import { TransportStep } from "./transport-step"
import { ProductStep } from "./product-step"
import { DetailsStep } from "./details-step"
import { AutomobileStep } from "./automobile-step"
import { MobilePhoneStep } from "./mobile-phone-step"
import { ResultsDisplay } from "./results-display"
import { calculateImportCost } from "@/lib/calculator"
import type {
  CalculatorFormData,
  CalculationResult,
  UserType,
  TransportType,
  ProductCategory,
  AutomobileData,
  MobilePhoneItem,
} from "@/lib/types"

const getSteps = (category: ProductCategory | null) => {
  if (category === "automobiles") {
    return ["Category", "Vehicle", "Results"]
  }
  return ["Category", "Type", "Transport", "Product", "Details", "Results"]
}

export function CalculatorWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [result, setResult] = useState<CalculationResult | null>(null)

  // Form state
  const [productCategory, setProductCategory] = useState<ProductCategory | null>(null)
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

  const [declaredAtCustoms, setDeclaredAtCustoms] = useState(true)
  const [hasCertificateOfConformity, setHasCertificateOfConformity] = useState(false)
  const [mobilePhoneItems, setMobilePhoneItems] = useState<MobilePhoneItem[]>([])

  const [automobileData, setAutomobileData] = useState<AutomobileData | null>(null)

  const steps = getSteps(productCategory)
  const totalSteps = steps.length

  const isMobilePhoneCategory =
    productCategory === "electronics" && (productCode.startsWith("8517") || productCode === "")

  const canProceed = useCallback(() => {
    if (productCategory === "automobiles") {
      switch (currentStep) {
        case 1:
          return productCategory !== null
        case 2:
          return automobileData !== null && automobileData.brand && automobileData.model && automobileData.price > 0
        default:
          return true
      }
    }

    switch (currentStep) {
      case 1:
        return productCategory !== null
      case 2:
        return userType !== null
      case 3:
        return transportType !== null
      case 4:
        return productCode !== ""
      case 5:
        if (isMobilePhoneCategory && userType === "commercial") {
          return mobilePhoneItems.length > 0
        }
        return sellingPrice > 0 && quantity > 0
      default:
        return true
    }
  }, [
    currentStep,
    productCategory,
    userType,
    transportType,
    productCode,
    sellingPrice,
    quantity,
    automobileData,
    isMobilePhoneCategory,
    mobilePhoneItems,
  ])

  const handleNext = () => {
    const isLastStep =
      (productCategory === "automobiles" && currentStep === 2) ||
      (productCategory !== "automobiles" && currentStep === 5)

    if (isLastStep) {
      // Calculate results
      let formData: CalculatorFormData

      if (productCategory === "automobiles") {
        formData = {
          userType: "commercial",
          transportType: "car",
          productCategory,
          productCode: automobileData?.fuelType === "ev" ? "8703800000" : "8703230000",
          productDescription: `${automobileData?.brand} ${automobileData?.model}`,
          sellingPrice: automobileData?.price || 0,
          logisticsCost: automobileData?.logisticsCost || 0,
          insuranceCost: 0,
          quantity: 1,
          weight: 0,
          useReferencePrice: false,
          automobileData: automobileData!,
        }
      } else if (isMobilePhoneCategory && userType === "commercial") {
        // Commercial mobile phone with multiple items
        const totalValue = mobilePhoneItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
        const totalQty = mobilePhoneItems.reduce((sum, item) => sum + item.quantity, 0)
        formData = {
          userType: userType!,
          transportType: transportType!,
          productCategory: productCategory!,
          productCode: mobilePhoneItems[0]?.tifCode || "8517120000",
          productDescription: "Multiple mobile phones",
          sellingPrice: totalValue / totalQty,
          logisticsCost,
          insuranceCost,
          quantity: totalQty,
          weight,
          useReferencePrice,
          hasCertificateOfConformity,
          mobilePhoneItems,
        }
      } else {
        formData = {
          userType: userType!,
          transportType: transportType!,
          productCategory: productCategory!,
          productCode,
          productDescription,
          sellingPrice,
          logisticsCost,
          insuranceCost,
          quantity,
          weight,
          useReferencePrice,
          declaredAtCustoms,
          hasCertificateOfConformity,
        }
      }

      const calculationResult = calculateImportCost(formData)
      setResult(calculationResult)
    }
    setCurrentStep((prev) => Math.min(prev + 1, totalSteps))
  }

  const handleBack = () => {
    if (currentStep === totalSteps && result) {
      setResult(null)
    }
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleReset = () => {
    setCurrentStep(1)
    setResult(null)
    setProductCategory(null)
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
    setDeclaredAtCustoms(true)
    setHasCertificateOfConformity(false)
    setMobilePhoneItems([])
    setAutomobileData(null)
  }

  const handleCategoryChange = (category: ProductCategory) => {
    setProductCategory(category)
    // Reset downstream state when category changes
    setUserType(null)
    setTransportType(null)
    setProductCode("")
    setProductDescription("")
    setAutomobileData(null)
    setMobilePhoneItems([])
  }

  const handleProductChange = (code: string, description: string) => {
    setProductCode(code)
    setProductDescription(description)
  }

  // Determine which step content to show
  const renderStepContent = () => {
    if (productCategory === "automobiles") {
      switch (currentStep) {
        case 1:
          return <CategoryStep value={productCategory} onChange={handleCategoryChange} />
        case 2:
          return <AutomobileStep value={automobileData} onChange={setAutomobileData} />
        case 3:
          return result && <ResultsDisplay result={result} onRecalculate={handleReset} />
        default:
          return null
      }
    }

    switch (currentStep) {
      case 1:
        return <CategoryStep value={productCategory} onChange={handleCategoryChange} />
      case 2:
        return <UserTypeStep value={userType} onChange={setUserType} />
      case 3:
        return userType && <TransportStep value={transportType} userType={userType} onChange={setTransportType} />
      case 4:
        return <ProductStep value={productCode} category={productCategory} onChange={handleProductChange} />
      case 5:
        if (isMobilePhoneCategory || productCode.startsWith("8517")) {
          return (
            <MobilePhoneStep
              userType={userType!}
              price={sellingPrice}
              quantity={quantity}
              weight={weight}
              declaredAtCustoms={declaredAtCustoms}
              onPriceChange={setSellingPrice}
              onQuantityChange={setQuantity}
              onWeightChange={setWeight}
              onDeclaredAtCustomsChange={setDeclaredAtCustoms}
              hasCertificate={hasCertificateOfConformity}
              onHasCertificateChange={setHasCertificateOfConformity}
              mobilePhoneItems={mobilePhoneItems}
              onMobilePhoneItemsChange={setMobilePhoneItems}
            />
          )
        }
        return (
          userType &&
          transportType && (
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
          )
        )
      case 6:
        return result && <ResultsDisplay result={result} onRecalculate={handleReset} />
      default:
        return null
    }
  }

  const isResultsStep =
    (productCategory === "automobiles" && currentStep === 3) || (productCategory !== "automobiles" && currentStep === 6)

  const isCalculateStep =
    (productCategory === "automobiles" && currentStep === 2) || (productCategory !== "automobiles" && currentStep === 5)

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <WizardProgress currentStep={currentStep} totalSteps={totalSteps} stepLabels={steps} />
      </div>

      {/* Step Content */}
      <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm">
        {renderStepContent()}

        {/* Navigation */}
        {!isResultsStep && (
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
            <Button variant="outline" onClick={handleBack} disabled={currentStep === 1}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>

            <Button onClick={handleNext} disabled={!canProceed()}>
              {isCalculateStep ? (
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
