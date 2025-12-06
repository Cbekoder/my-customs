export type UserType = "individual" | "commercial"

export type TransportType = "air" | "rail" | "car" | "foot"

export type ProductCategory = "electronics" | "automobiles" | "pharmaceuticals" | "other"

export type FuelType = "petrol" | "diesel" | "hybrid" | "ev"

export interface DutyFreeLimits {
  air: { value: number; weight: number }
  rail: { value: number; weight: number }
  car: { value: number; weight: number }
  foot: { value: number; weight: number }
}

export interface TariffCode {
  code: string
  description: string
  descriptionUz: string
  dutyRate: number
  preferentialRate?: number
  exciseRate?: number
  unit: string
  minReferencePrice?: number
  category: string
  requiresLicense?: boolean
  requiresCertificate?: boolean
}

export interface MobilePhoneItem {
  id: string
  model: string
  tifCode: string
  price: number
  quantity: number
}

export interface AutomobileData {
  brand: string
  model: string
  year: number
  engineDisplacement: number
  fuelType: FuelType
  price: number
  logisticsCost: number
}

export interface CalculatorFormData {
  userType: UserType
  transportType: TransportType
  productCategory: ProductCategory
  productCode: string
  productDescription: string
  sellingPrice: number
  logisticsCost: number
  insuranceCost: number
  quantity: number
  weight: number
  useReferencePrice: boolean
  // Mobile phone specific
  declaredAtCustoms?: boolean
  hasCertificateOfConformity?: boolean
  mobilePhoneItems?: MobilePhoneItem[]
  // Automobile specific
  automobileData?: AutomobileData
}

export interface DocumentRequirement {
  name: string
  nameUz: string
  issuingAuthority: string
  estimatedFee: number
  feeInUZS: number
  required: boolean
}

export interface CalculationResult {
  customsValue: number
  customsDuty: number
  exciseTax: number
  vat: number
  customsFee: number
  imeiRegistrationFee?: number
  utilizationFee?: number
  totalMandatoryPayments: number
  totalImportCost: number
  originalPrice: number
  costIncreasePercentage: number
  breakdown: {
    label: string
    value: number
    formula?: string
  }[]
  waterfallData: {
    label: string
    value: number
    runningTotal: number
    type: "base" | "add" | "total"
  }[]
  warnings: string[]
  documentRequirements: DocumentRequirement[]
  exchangeRate: number
  totalInUZS: number
}

export interface BCURange {
  minCV: number
  maxCV: number
  bcuAmount: number
}

export interface UtilizationFeeRate {
  minEngine: number
  maxEngine: number
  multiplier: number
  evMultiplier?: number
}

export interface AutomobileTariff {
  minEngine: number
  maxEngine: number
  minAge: number
  maxAge: number
  dutyRate: number
  exciseRate: number
}
