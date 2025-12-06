export type UserType = "individual" | "commercial"

export type TransportType = "air" | "rail" | "car" | "foot"

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

export interface CalculatorFormData {
  userType: UserType
  transportType: TransportType
  productCode: string
  productDescription: string
  sellingPrice: number
  logisticsCost: number
  insuranceCost: number
  quantity: number
  weight: number
  useReferencePrice: boolean
}

export interface CalculationResult {
  customsValue: number
  customsDuty: number
  exciseTax: number
  vat: number
  customsFee: number
  imeiRegistrationFee?: number
  totalMandatoryPayments: number
  totalImportCost: number
  breakdown: {
    label: string
    value: number
    formula?: string
  }[]
  warnings: string[]
  exchangeRate: number
  totalInUZS: number
}

export interface BCURange {
  minCV: number
  maxCV: number
  bcuAmount: number
}
