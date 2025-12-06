import type { CalculatorFormData, CalculationResult } from "./types"
import {
  VAT_RATE,
  YBT_RATE,
  YBT_PER_KG,
  DUTY_FREE_LIMITS,
  BCU_VALUE_UZS,
  USD_TO_UZS_RATE,
  IMEI_FEE_BCU_PERCENTAGE,
  getTariffCode,
  getCustomsFee,
  isMobilePhone,
} from "./tariff-data"

export function calculateCommercialImport(data: CalculatorFormData): CalculationResult {
  const tariff = getTariffCode(data.productCode)
  const warnings: string[] = []
  const breakdown: CalculationResult["breakdown"] = []

  // Step 1: Calculate Customs Value (CIF)
  const customsValue = data.sellingPrice + data.logisticsCost + data.insuranceCost
  breakdown.push({
    label: "Customs Value (CIF)",
    value: customsValue,
    formula: `Selling Price ($${data.sellingPrice}) + Logistics ($${data.logisticsCost}) + Insurance ($${data.insuranceCost})`,
  })

  // Step 2: Calculate Customs Duty
  const dutyRate = tariff?.dutyRate || 0
  const customsDuty = customsValue * (dutyRate / 100)
  breakdown.push({
    label: "Customs Duty",
    value: customsDuty,
    formula: `CV ($${customsValue.toFixed(2)}) × ${dutyRate}%`,
  })

  // Step 3: Calculate Excise Tax
  const exciseRate = tariff?.exciseRate || 0
  const exciseTax = (customsValue + customsDuty) * (exciseRate / 100)
  if (exciseRate > 0) {
    breakdown.push({
      label: "Excise Tax",
      value: exciseTax,
      formula: `(CV + CD) × ${exciseRate}% = ($${customsValue.toFixed(2)} + $${customsDuty.toFixed(2)}) × ${exciseRate}%`,
    })
  }

  // Step 4: Calculate VAT
  const vatBase = customsValue + customsDuty + exciseTax
  const vat = vatBase * VAT_RATE
  breakdown.push({
    label: "VAT (12%)",
    value: vat,
    formula: `(CV + CD + ET) × 12% = ($${vatBase.toFixed(2)}) × 12%`,
  })

  // Step 5: Calculate Customs Fee
  const customsFee = getCustomsFee(customsValue)
  breakdown.push({
    label: "Customs Clearance Fee",
    value: customsFee,
    formula: `Based on CV range (${((customsFee * USD_TO_UZS_RATE) / BCU_VALUE_UZS).toFixed(2)} BCU)`,
  })

  // Add warnings for required documents
  if (tariff?.requiresLicense) {
    warnings.push("This product requires an import license.")
  }
  if (tariff?.requiresCertificate) {
    warnings.push("This product requires a Certificate of Conformity.")
  }

  const totalMandatoryPayments = customsDuty + exciseTax + vat + customsFee
  const totalImportCost = customsValue + totalMandatoryPayments

  return {
    customsValue,
    customsDuty,
    exciseTax,
    vat,
    customsFee,
    totalMandatoryPayments,
    totalImportCost,
    breakdown,
    warnings,
    exchangeRate: USD_TO_UZS_RATE,
    totalInUZS: totalImportCost * USD_TO_UZS_RATE,
  }
}

export function calculateIndividualImport(data: CalculatorFormData): CalculationResult {
  const tariff = getTariffCode(data.productCode)
  const warnings: string[] = []
  const breakdown: CalculationResult["breakdown"] = []

  const limits = DUTY_FREE_LIMITS[data.transportType]
  const isMobile = isMobilePhone(data.productCode)

  // Mobile phone specific limits
  const MOBILE_PHONE_LIMIT = 2

  breakdown.push({
    label: "Product Value",
    value: data.sellingPrice * data.quantity,
    formula: `$${data.sellingPrice} × ${data.quantity} units`,
  })

  // Check duty-free limit
  const totalValue = data.sellingPrice * data.quantity
  const dutyFreeLimit = limits.value

  breakdown.push({
    label: "Duty-Free Limit",
    value: dutyFreeLimit,
    formula: `${data.transportType.charAt(0).toUpperCase() + data.transportType.slice(1)} transport limit`,
  })

  let customsDuty = 0
  const exciseTax = 0
  let vat = 0
  let imeiRegistrationFee = 0

  // Calculate excess value
  const excessValue = Math.max(0, totalValue - dutyFreeLimit)
  const excessWeight = Math.max(0, data.weight - limits.weight)

  if (excessValue > 0 || excessWeight > 0) {
    // Calculate YBT (Single Customs Payment)
    const ybtByValue = excessValue * YBT_RATE
    const ybtByWeight = excessWeight * YBT_PER_KG
    customsDuty = Math.max(ybtByValue, ybtByWeight)

    breakdown.push({
      label: "Excess Value",
      value: excessValue,
      formula: `Total Value ($${totalValue.toFixed(2)}) - Duty-Free Limit ($${dutyFreeLimit})`,
    })

    breakdown.push({
      label: "Single Customs Payment (YBT)",
      value: customsDuty,
      formula: `Maximum of: 30% of excess ($${ybtByValue.toFixed(2)}) OR $3/kg of excess weight ($${ybtByWeight.toFixed(2)})`,
    })
  }

  // Mobile phone specific handling
  if (isMobile) {
    if (data.quantity > MOBILE_PHONE_LIMIT) {
      warnings.push(
        `⚠️ Individual limit exceeded! Only ${MOBILE_PHONE_LIMIT} mobile devices are allowed per entry for personal use. Device #${MOBILE_PHONE_LIMIT + 1} and above will be subject to commercial import duties.`,
      )

      // Calculate additional fees for over-limit phones
      const overLimitPhones = data.quantity - MOBILE_PHONE_LIMIT
      const overLimitValue = data.sellingPrice * overLimitPhones
      const additionalDuty = (overLimitValue * (tariff?.dutyRate || 0)) / 100
      const additionalVAT = (overLimitValue + additionalDuty) * VAT_RATE

      customsDuty += additionalDuty
      vat += additionalVAT

      breakdown.push({
        label: `Commercial Duty (${overLimitPhones} over-limit devices)`,
        value: additionalDuty + additionalVAT,
        formula: `Over-limit devices processed as commercial import`,
      })
    }

    // IMEI Registration Fee
    imeiRegistrationFee = (BCU_VALUE_UZS * IMEI_FEE_BCU_PERCENTAGE * data.quantity) / USD_TO_UZS_RATE
    breakdown.push({
      label: "UzIMEI Registration Fee",
      value: imeiRegistrationFee,
      formula: `20% of BCU × ${data.quantity} devices = ${IMEI_FEE_BCU_PERCENTAGE * 100}% × ${BCU_VALUE_UZS.toLocaleString()} UZS × ${data.quantity}`,
    })

    warnings.push(
      "📱 Mandatory Declaration Required! Failure to declare this device on arrival will result in an unavoidable 30% duty fee during UzIMEI registration.",
    )
  }

  // Calculate customs fee (simplified for individuals)
  const customsFee = getCustomsFee(totalValue) * 0.5 // Simplified fee for individuals
  breakdown.push({
    label: "Customs Clearance Fee",
    value: customsFee,
    formula: "Simplified individual rate",
  })

  const totalMandatoryPayments = customsDuty + exciseTax + vat + customsFee + imeiRegistrationFee
  const totalImportCost = totalValue + totalMandatoryPayments

  return {
    customsValue: totalValue,
    customsDuty,
    exciseTax,
    vat,
    customsFee,
    imeiRegistrationFee: isMobile ? imeiRegistrationFee : undefined,
    totalMandatoryPayments,
    totalImportCost,
    breakdown,
    warnings,
    exchangeRate: USD_TO_UZS_RATE,
    totalInUZS: totalImportCost * USD_TO_UZS_RATE,
  }
}

export function calculateImportCost(data: CalculatorFormData): CalculationResult {
  if (data.userType === "commercial") {
    return calculateCommercialImport(data)
  } else {
    return calculateIndividualImport(data)
  }
}
