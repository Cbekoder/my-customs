import type { CalculatorFormData, CalculationResult, DocumentRequirement } from "./types"
import {
  VAT_RATE,
  YBT_RATE,
  YBT_PER_KG,
  DUTY_FREE_LIMITS,
  BCU_VALUE_UZS,
  USD_TO_UZS_RATE,
  IMEI_FEE_BCU_PERCENTAGE,
  MOBILE_DUTY_WITH_CERTIFICATE,
  MOBILE_DUTY_WITHOUT_CERTIFICATE,
  getTariffCode,
  getCustomsFee,
  isMobilePhone,
  getUtilizationFee,
  getAutomobileTariff,
} from "./tariff-data"

function getDocumentRequirements(data: CalculatorFormData, isCommercial: boolean): DocumentRequirement[] {
  const docs: DocumentRequirement[] = []
  const tariff = getTariffCode(data.productCode)

  // Base documents for all imports
  if (isCommercial) {
    docs.push({
      name: "Commercial Invoice",
      nameUz: "Tijorat fakturasi",
      issuingAuthority: "Exporter",
      estimatedFee: 0,
      feeInUZS: 0,
      required: true,
    })
    docs.push({
      name: "Contract of Sale",
      nameUz: "Sotish shartnomasi",
      issuingAuthority: "Parties to Contract",
      estimatedFee: 0,
      feeInUZS: 0,
      required: true,
    })
    docs.push({
      name: "Packing List",
      nameUz: "Qadoqlash ro'yxati",
      issuingAuthority: "Exporter",
      estimatedFee: 0,
      feeInUZS: 0,
      required: true,
    })
    docs.push({
      name: "Bill of Lading / Air Waybill",
      nameUz: "Yuk xati / Havo yuk xati",
      issuingAuthority: "Carrier",
      estimatedFee: 50,
      feeInUZS: 50 * USD_TO_UZS_RATE,
      required: true,
    })
  }

  // Certificate of Conformity
  if (tariff?.requiresCertificate || data.productCategory === "automobiles") {
    docs.push({
      name: "Certificate of Conformity",
      nameUz: "Muvofiqlik sertifikati",
      issuingAuthority: "UzStandard Agency",
      estimatedFee: 150,
      feeInUZS: 150 * USD_TO_UZS_RATE,
      required: true,
    })
  }

  // Import License
  if (tariff?.requiresLicense) {
    docs.push({
      name: "Import License",
      nameUz: "Import litsenziyasi",
      issuingAuthority: "Ministry of Investments and Foreign Trade",
      estimatedFee: 100,
      feeInUZS: 100 * USD_TO_UZS_RATE,
      required: true,
    })
  }

  // Vehicle specific
  if (data.productCategory === "automobiles") {
    docs.push({
      name: "Technical Passport",
      nameUz: "Texnik passport",
      issuingAuthority: "YHXBB (Traffic Police)",
      estimatedFee: 50,
      feeInUZS: 50 * USD_TO_UZS_RATE,
      required: true,
    })
    docs.push({
      name: "Environmental Compliance Certificate",
      nameUz: "Ekologik muvofiqlik sertifikati",
      issuingAuthority: "State Committee for Ecology",
      estimatedFee: 75,
      feeInUZS: 75 * USD_TO_UZS_RATE,
      required: true,
    })
  }

  // Mobile phone specific
  if (isMobilePhone(data.productCode)) {
    docs.push({
      name: "UzIMEI Registration",
      nameUz: "UzIMEI ro'yxatdan o'tkazish",
      issuingAuthority: "UzIMEI Center",
      estimatedFee: (BCU_VALUE_UZS * IMEI_FEE_BCU_PERCENTAGE) / USD_TO_UZS_RATE,
      feeInUZS: BCU_VALUE_UZS * IMEI_FEE_BCU_PERCENTAGE,
      required: true,
    })
  }

  // Pharmaceutical specific
  if (data.productCategory === "pharmaceuticals" || tariff?.category === "pharmaceuticals") {
    docs.push({
      name: "Pharmaceutical Registration Certificate",
      nameUz: "Farmatsevtika ro'yxatga olish sertifikati",
      issuingAuthority: "Ministry of Health",
      estimatedFee: 200,
      feeInUZS: 200 * USD_TO_UZS_RATE,
      required: true,
    })
  }

  return docs
}

function buildWaterfallData(
  originalPrice: number,
  breakdown: CalculationResult["breakdown"],
): CalculationResult["waterfallData"] {
  const waterfallData: CalculationResult["waterfallData"] = []
  let runningTotal = originalPrice

  waterfallData.push({
    label: "Original Price",
    value: originalPrice,
    runningTotal: originalPrice,
    type: "base",
  })

  for (const item of breakdown) {
    if (
      item.value > 0 &&
      item.label !== "Product Value" &&
      item.label !== "Customs Value (CIF)" &&
      !item.label.includes("Limit")
    ) {
      runningTotal += item.value
      waterfallData.push({
        label: item.label,
        value: item.value,
        runningTotal,
        type: "add",
      })
    }
  }

  waterfallData.push({
    label: "Total Cost",
    value: runningTotal,
    runningTotal,
    type: "total",
  })

  return waterfallData
}

export function calculateCommercialImport(data: CalculatorFormData): CalculationResult {
  const tariff = getTariffCode(data.productCode)
  const warnings: string[] = []
  const breakdown: CalculationResult["breakdown"] = []
  const isMobile = isMobilePhone(data.productCode)

  // Step 1: Calculate Customs Value (CIF)
  const customsValue = data.sellingPrice + data.logisticsCost + data.insuranceCost
  breakdown.push({
    label: "Customs Value (CIF)",
    value: customsValue,
    formula: `Selling Price ($${data.sellingPrice}) + Logistics ($${data.logisticsCost}) + Insurance ($${data.insuranceCost})`,
  })

  // Step 2: Calculate Customs Duty
  let dutyRate = tariff?.dutyRate || 0
  if (isMobile) {
    dutyRate = data.hasCertificateOfConformity
      ? MOBILE_DUTY_WITH_CERTIFICATE * 100
      : MOBILE_DUTY_WITHOUT_CERTIFICATE * 100
  }
  const customsDuty = customsValue * (dutyRate / 100)
  breakdown.push({
    label: "Customs Duty",
    value: customsDuty,
    formula: `CV ($${customsValue.toFixed(2)}) × ${dutyRate}%${isMobile ? (data.hasCertificateOfConformity ? " (with CoC)" : " (without CoC)") : ""}`,
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
    warnings.push("This product requires an import license from the Ministry of Investments and Foreign Trade.")
  }
  if (tariff?.requiresCertificate) {
    warnings.push("This product requires a Certificate of Conformity from UzStandard Agency.")
  }
  if (isMobile && !data.hasCertificateOfConformity) {
    warnings.push("Without a Certificate of Conformity, customs duty is 10% instead of 5%.")
  }

  const totalMandatoryPayments = customsDuty + exciseTax + vat + customsFee
  const totalImportCost = customsValue + totalMandatoryPayments

  const originalPrice = data.sellingPrice * data.quantity
  const costIncreasePercentage = originalPrice > 0 ? (totalMandatoryPayments / originalPrice) * 100 : 0

  // Build waterfall data
  const waterfallData = buildWaterfallData(originalPrice, breakdown)

  // Get document requirements
  const documentRequirements = getDocumentRequirements(data, true)

  return {
    customsValue,
    customsDuty,
    exciseTax,
    vat,
    customsFee,
    totalMandatoryPayments,
    totalImportCost,
    originalPrice,
    costIncreasePercentage,
    breakdown,
    waterfallData,
    warnings,
    documentRequirements,
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

  const totalValue = data.sellingPrice * data.quantity
  breakdown.push({
    label: "Product Value",
    value: totalValue,
    formula: `$${data.sellingPrice} × ${data.quantity} units`,
  })

  // Check duty-free limit
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

    if (excessWeight > 0) {
      breakdown.push({
        label: "Excess Weight",
        value: excessWeight,
        formula: `Total Weight (${data.weight}kg) - Weight Limit (${limits.weight}kg) = ${excessWeight}kg`,
      })
    }

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
        `Individual limit exceeded! Only ${MOBILE_PHONE_LIMIT} mobile devices are allowed per entry for personal use. Device #${MOBILE_PHONE_LIMIT + 1} and above will be subject to commercial import duties.`,
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

    if (data.declaredAtCustoms) {
      imeiRegistrationFee = (BCU_VALUE_UZS * IMEI_FEE_BCU_PERCENTAGE * data.quantity) / USD_TO_UZS_RATE
      breakdown.push({
        label: "UzIMEI Registration Fee",
        value: imeiRegistrationFee,
        formula: `20% of BCU × ${data.quantity} devices = ${IMEI_FEE_BCU_PERCENTAGE * 100}% × ${BCU_VALUE_UZS.toLocaleString()} UZS × ${data.quantity}`,
      })
    } else {
      // Not declared - will need to pay 30% penalty later
      warnings.push(
        "Mandatory Declaration Required! Since you indicated the device was NOT declared at customs, you will be charged a 30% penalty fee when registering with UzIMEI.",
      )
      const penaltyRate = 0.3
      imeiRegistrationFee =
        (BCU_VALUE_UZS * IMEI_FEE_BCU_PERCENTAGE * data.quantity) / USD_TO_UZS_RATE +
        data.sellingPrice * data.quantity * penaltyRate
      breakdown.push({
        label: "UzIMEI Fee + 30% Penalty",
        value: imeiRegistrationFee,
        formula: `IMEI Fee + 30% penalty on device value for undeclared import`,
      })
    }
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

  const originalPrice = data.sellingPrice * data.quantity
  const costIncreasePercentage = originalPrice > 0 ? (totalMandatoryPayments / originalPrice) * 100 : 0

  // Build waterfall data
  const waterfallData = buildWaterfallData(originalPrice, breakdown)

  // Get document requirements
  const documentRequirements = getDocumentRequirements(data, false)

  return {
    customsValue: totalValue,
    customsDuty,
    exciseTax,
    vat,
    customsFee,
    imeiRegistrationFee: isMobile ? imeiRegistrationFee : undefined,
    totalMandatoryPayments,
    totalImportCost,
    originalPrice,
    costIncreasePercentage,
    breakdown,
    waterfallData,
    warnings,
    documentRequirements,
    exchangeRate: USD_TO_UZS_RATE,
    totalInUZS: totalImportCost * USD_TO_UZS_RATE,
  }
}

export function calculateAutomobileImport(data: CalculatorFormData): CalculationResult {
  const warnings: string[] = []
  const breakdown: CalculationResult["breakdown"] = []
  const autoData = data.automobileData!

  const currentYear = new Date().getFullYear()
  const vehicleAge = currentYear - autoData.year
  const isEV = autoData.fuelType === "ev"

  // Get tariff based on engine size and age
  const tariff = getAutomobileTariff(autoData.engineDisplacement, vehicleAge)

  // Step 1: Calculate Customs Value (CIF)
  const customsValue = autoData.price + autoData.logisticsCost
  breakdown.push({
    label: "Customs Value (CIF)",
    value: customsValue,
    formula: `Price ($${autoData.price}) + Logistics ($${autoData.logisticsCost})`,
  })

  // Vehicle Info
  breakdown.push({
    label: "Vehicle Age",
    value: vehicleAge,
    formula: `${currentYear} - ${autoData.year} = ${vehicleAge} years`,
  })

  breakdown.push({
    label: "Engine Displacement",
    value: autoData.engineDisplacement,
    formula: `${autoData.engineDisplacement} cm³ (${autoData.fuelType.toUpperCase()})`,
  })

  // Step 2: Calculate Customs Duty
  let dutyRate = tariff?.dutyRate || 0
  // EVs have 0% duty
  if (isEV) {
    dutyRate = 0
    warnings.push("Electric vehicles (EVs) are exempt from customs duty in Uzbekistan.")
  }
  const customsDuty = customsValue * (dutyRate / 100)
  breakdown.push({
    label: "Customs Duty",
    value: customsDuty,
    formula: `CV ($${customsValue.toFixed(2)}) × ${dutyRate}%${isEV ? " (EV exemption)" : ""}`,
  })

  // Step 3: Calculate Excise Tax
  let exciseRate = tariff?.exciseRate || 0
  if (isEV) {
    exciseRate = 0
  }
  const exciseTax = (customsValue) * (exciseRate / 100)
  if (exciseRate > 0) {
    breakdown.push({
      label: "Customs payment",
      value: exciseTax,
      formula: `(CV + CD) × ${exciseRate}% = ($${(customsValue).toFixed(2)}) × ${exciseRate}%`,
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

  // Step 5: Utilization Fee (Recycling Fee)
  const utilizationFee = getUtilizationFee(autoData.engineDisplacement, isEV)
  breakdown.push({
    label: "Utilization Fee (Recycling)",
    value: utilizationFee,
    formula: `BRV × Multiplier (based on ${isEV ? "EV" : autoData.engineDisplacement + "cc"})`,
  })

  // Step 6: Calculate Customs Fee
  const customsFee = getCustomsFee(customsValue)
  breakdown.push({
    label: "Customs Clearance Fee",
    value: customsFee,
    formula: `Based on CV range (${((customsFee * USD_TO_UZS_RATE) / BCU_VALUE_UZS).toFixed(2)} BCU)`,
  })

  // Warnings
  if (vehicleAge >= 7) {
    warnings.push("Vehicles older than 7 years are subject to higher duty rates due to environmental regulations.")
  }
  if (autoData.engineDisplacement > 3000 && !isEV) {
    warnings.push("Large engine vehicles (>3000cc) incur significantly higher customs duties.")
  }
  warnings.push("Certificate of Conformity from UzStandard is mandatory for all vehicle imports.")
  warnings.push("Technical inspection and registration with YHXBB (Traffic Police) is required after import.")

  const totalMandatoryPayments = customsDuty + exciseTax + vat + utilizationFee + customsFee
  const totalImportCost = customsValue + totalMandatoryPayments

  const originalPrice = autoData.price
  const costIncreasePercentage = originalPrice > 0 ? (totalMandatoryPayments / originalPrice) * 100 : 0

  // Build waterfall data
  const waterfallData = buildWaterfallData(originalPrice, breakdown)

  // Get document requirements
  const documentRequirements = getDocumentRequirements(data, true)

  return {
    customsValue,
    customsDuty,
    exciseTax,
    vat,
    customsFee,
    utilizationFee,
    totalMandatoryPayments,
    totalImportCost,
    originalPrice,
    costIncreasePercentage,
    breakdown,
    waterfallData,
    warnings,
    documentRequirements,
    exchangeRate: USD_TO_UZS_RATE,
    totalInUZS: totalImportCost * USD_TO_UZS_RATE,
  }
}

export function calculateImportCost(data: CalculatorFormData): CalculationResult {
  if (data.productCategory === "automobiles" && data.automobileData) {
    return calculateAutomobileImport(data)
  }

  if (data.userType === "commercial") {
    return calculateCommercialImport(data)
  } else {
    return calculateIndividualImport(data)
  }
}
