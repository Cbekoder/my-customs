import type { TariffCode, BCURange, DutyFreeLimits } from "./types"

// Base Calculation Unit (BCU) value in UZS - updated periodically
export const BCU_VALUE_UZS = 340000

// Current USD to UZS exchange rate
export const USD_TO_UZS_RATE = 12850

// VAT rate in Uzbekistan
export const VAT_RATE = 0.12

// Single Customs Payment (YBT) rate for individuals
export const YBT_RATE = 0.3
export const YBT_PER_KG = 3 // USD per kg of excess weight

// IMEI Registration Fee (20% of BCU)
export const IMEI_FEE_BCU_PERCENTAGE = 0.2

// Duty-free limits by transport type
export const DUTY_FREE_LIMITS: DutyFreeLimits = {
  air: { value: 1000, weight: 50 },
  rail: { value: 500, weight: 31 },
  car: { value: 300, weight: 31 },
  foot: { value: 300, weight: 31 },
}

// Extended duty-free limit for air (per calendar year)
export const EXTENDED_AIR_LIMIT = 2000

// Customs clearance fee ranges based on customs value (in BCU)
export const CUSTOMS_FEE_RANGES: BCURange[] = [
  { minCV: 0, maxCV: 1000, bcuAmount: 0.25 },
  { minCV: 1000, maxCV: 10000, bcuAmount: 0.5 },
  { minCV: 10000, maxCV: 100000, bcuAmount: 1 },
  { minCV: 100000, maxCV: 500000, bcuAmount: 2 },
  { minCV: 500000, maxCV: Number.POSITIVE_INFINITY, bcuAmount: 5 },
]

// Sample TIF TN tariff codes database
export const TARIFF_CODES: TariffCode[] = [
  // Mobile Phones & Electronics
  {
    code: "8517120000",
    description: "Telephones for cellular networks or wireless networks - Smartphones",
    descriptionUz: "Uyali tarmoqlar yoki simsiz tarmoqlar uchun telefonlar - Smartfonlar",
    dutyRate: 0,
    exciseRate: 0,
    unit: "units",
    minReferencePrice: 200,
    category: "mobile-phones",
  },
  {
    code: "8517130000",
    description: "Smartphones with SIM card slot",
    descriptionUz: "SIM karta uyasi bilan smartfonlar",
    dutyRate: 0,
    exciseRate: 0,
    unit: "units",
    minReferencePrice: 300,
    category: "mobile-phones",
  },
  // Computers & Tablets
  {
    code: "8471300000",
    description: "Portable digital automatic data processing machines (laptops)",
    descriptionUz: "Portativ raqamli avtomatik ma'lumotlarni qayta ishlash mashinalari (noutbuklar)",
    dutyRate: 0,
    exciseRate: 0,
    unit: "units",
    minReferencePrice: 400,
    category: "electronics",
  },
  {
    code: "8471410000",
    description: "Tablets and similar portable computing devices",
    descriptionUz: "Planshetlar va shunga o'xshash portativ hisoblash qurilmalari",
    dutyRate: 0,
    exciseRate: 0,
    unit: "units",
    minReferencePrice: 250,
    category: "electronics",
  },
  // Home Appliances
  {
    code: "8450110000",
    description: "Fully automatic household washing machines",
    descriptionUz: "To'liq avtomatik maishiy kir yuvish mashinalari",
    dutyRate: 30,
    exciseRate: 0,
    unit: "units",
    minReferencePrice: 300,
    category: "appliances",
  },
  {
    code: "8418100000",
    description: "Combined refrigerator-freezers with separate external doors",
    descriptionUz: "Alohida tashqi eshiklari bo'lgan muzlatgichli sovutgichlar",
    dutyRate: 30,
    exciseRate: 0,
    unit: "units",
    minReferencePrice: 400,
    category: "appliances",
  },
  {
    code: "8516600000",
    description: "Electric ovens and cookers",
    descriptionUz: "Elektr pechlari va pishirish plitalari",
    dutyRate: 15,
    exciseRate: 0,
    unit: "units",
    minReferencePrice: 200,
    category: "appliances",
  },
  // Vehicles
  {
    code: "8703210000",
    description: "Motor vehicles - engine capacity not exceeding 1000cc",
    descriptionUz: "Avtomobillar - dvigatel hajmi 1000cc dan oshmaydigan",
    dutyRate: 30,
    exciseRate: 10,
    unit: "units",
    minReferencePrice: 5000,
    category: "vehicles",
    requiresCertificate: true,
  },
  {
    code: "8703220000",
    description: "Motor vehicles - engine capacity 1000cc to 1500cc",
    descriptionUz: "Avtomobillar - dvigatel hajmi 1000cc dan 1500cc gacha",
    dutyRate: 50,
    exciseRate: 15,
    unit: "units",
    minReferencePrice: 8000,
    category: "vehicles",
    requiresCertificate: true,
  },
  {
    code: "8703230000",
    description: "Motor vehicles - engine capacity 1500cc to 3000cc",
    descriptionUz: "Avtomobillar - dvigatel hajmi 1500cc dan 3000cc gacha",
    dutyRate: 100,
    exciseRate: 25,
    unit: "units",
    minReferencePrice: 15000,
    category: "vehicles",
    requiresCertificate: true,
  },
  // Clothing & Textiles
  {
    code: "6109100000",
    description: "T-shirts, singlets and other vests, knitted or crocheted, of cotton",
    descriptionUz: "Futbolkalar, mayкалар va boshqa kamzullar, trikotaj yoki kroje, paxtadan",
    dutyRate: 20,
    exciseRate: 0,
    unit: "kg",
    minReferencePrice: 5,
    category: "clothing",
  },
  {
    code: "6203420000",
    description: "Men's or boys' trousers of cotton",
    descriptionUz: "Erkaklar yoki o'g'il bolalar shimlar, paxtadan",
    dutyRate: 20,
    exciseRate: 0,
    unit: "units",
    minReferencePrice: 15,
    category: "clothing",
  },
  // Food Products
  {
    code: "0901110000",
    description: "Coffee, not roasted, not decaffeinated",
    descriptionUz: "Qahva, qovurilmagan, kofeinsizlantirilmagan",
    dutyRate: 10,
    exciseRate: 0,
    unit: "kg",
    minReferencePrice: 3,
    category: "food",
    requiresCertificate: true,
  },
  {
    code: "1806310000",
    description: "Chocolate and other food preparations containing cocoa - filled",
    descriptionUz: "Shokolad va kakao o'z ichiga olgan boshqa oziq-ovqat mahsulotlari - to'ldirilgan",
    dutyRate: 20,
    exciseRate: 0,
    unit: "kg",
    minReferencePrice: 8,
    category: "food",
  },
  // Cosmetics
  {
    code: "3304990000",
    description: "Beauty or make-up preparations and preparations for skin care",
    descriptionUz: "Go'zallik yoki bo'yanish preparatlari va teri parvarishi uchun preparatlar",
    dutyRate: 15,
    exciseRate: 0,
    unit: "kg",
    minReferencePrice: 20,
    category: "cosmetics",
    requiresCertificate: true,
  },
  // Toys
  {
    code: "9503000000",
    description: "Toys and games",
    descriptionUz: "O'yinchoqlar va o'yinlar",
    dutyRate: 15,
    exciseRate: 0,
    unit: "units",
    minReferencePrice: 10,
    category: "toys",
    requiresCertificate: true,
  },
  // Sports Equipment
  {
    code: "9506910000",
    description: "Articles and equipment for physical exercise",
    descriptionUz: "Jismoniy mashqlar uchun buyumlar va jihozlar",
    dutyRate: 10,
    exciseRate: 0,
    unit: "units",
    minReferencePrice: 50,
    category: "sports",
  },
]

// Search tariff codes
export function searchTariffCodes(query: string): TariffCode[] {
  const searchTerm = query.toLowerCase()
  return TARIFF_CODES.filter(
    (code) =>
      code.code.includes(searchTerm) ||
      code.description.toLowerCase().includes(searchTerm) ||
      code.descriptionUz.toLowerCase().includes(searchTerm) ||
      code.category.toLowerCase().includes(searchTerm),
  )
}

// Get tariff code by code
export function getTariffCode(code: string): TariffCode | undefined {
  return TARIFF_CODES.find((t) => t.code === code)
}

// Check if product is a mobile phone
export function isMobilePhone(code: string): boolean {
  const tariff = getTariffCode(code)
  return tariff?.category === "mobile-phones"
}

// Get customs fee based on customs value
export function getCustomsFee(customsValue: number): number {
  const range = CUSTOMS_FEE_RANGES.find((r) => customsValue >= r.minCV && customsValue < r.maxCV)
  if (!range) return (CUSTOMS_FEE_RANGES[CUSTOMS_FEE_RANGES.length - 1].bcuAmount * BCU_VALUE_UZS) / USD_TO_UZS_RATE
  return (range.bcuAmount * BCU_VALUE_UZS) / USD_TO_UZS_RATE
}
