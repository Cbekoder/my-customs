import type { TariffCode, BCURange, DutyFreeLimits, UtilizationFeeRate, AutomobileTariff } from "./types"

// Base Calculation Unit (BCU) value in UZS - updated periodically
export const BCU_VALUE_UZS = 340000

// Base Estimated Value (BRV/BHM) for utilization fee calculations
export const BRV_VALUE_UZS = 340000

// Current USD to UZS exchange rate
export const USD_TO_UZS_RATE = 12850

// VAT rate in Uzbekistan
export const VAT_RATE = 0.12

// Single Customs Payment (YBT) rate for individuals
export const YBT_RATE = 0.3
export const YBT_PER_KG = 3 // USD per kg of excess weight

// IMEI Registration Fee (20% of BCU)
export const IMEI_FEE_BCU_PERCENTAGE = 0.2

export const MOBILE_DUTY_WITH_CERTIFICATE = 0.05 // 5%
export const MOBILE_DUTY_WITHOUT_CERTIFICATE = 0.1 // 10%

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

export const UTILIZATION_FEE_RATES: UtilizationFeeRate[] = [
  { minEngine: 0, maxEngine: 1000, multiplier: 0.5, evMultiplier: 0.1 },
  { minEngine: 1000, maxEngine: 1500, multiplier: 1.0, evMultiplier: 0.1 },
  { minEngine: 1500, maxEngine: 2000, multiplier: 2.0, evMultiplier: 0.1 },
  { minEngine: 2000, maxEngine: 2500, multiplier: 3.0, evMultiplier: 0.1 },
  { minEngine: 2500, maxEngine: 3000, multiplier: 5.0, evMultiplier: 0.1 },
  { minEngine: 3000, maxEngine: 3500, multiplier: 8.0, evMultiplier: 0.1 },
  { minEngine: 3500, maxEngine: Number.POSITIVE_INFINITY, multiplier: 12.0, evMultiplier: 0.1 },
]

export const AUTOMOBILE_TARIFFS: AutomobileTariff[] = [
  // Engine <= 1000cc
  { minEngine: 0, maxEngine: 1000, minAge: 0, maxAge: 3, dutyRate: 20, exciseRate: 1 },
  { minEngine: 0, maxEngine: 1000, minAge: 3, maxAge: 7, dutyRate: 25, exciseRate: 1 },
  { minEngine: 0, maxEngine: 1000, minAge: 7, maxAge: Number.POSITIVE_INFINITY, dutyRate: 20, exciseRate: 1 },
  // Engine 1000-1500cc
  { minEngine: 1000, maxEngine: 1500, minAge: 0, maxAge: 3, dutyRate: 30, exciseRate: 1 },
  { minEngine: 1000, maxEngine: 1500, minAge: 3, maxAge: 7, dutyRate: 40, exciseRate: 1 },
  { minEngine: 1000, maxEngine: 1500, minAge: 7, maxAge: Number.POSITIVE_INFINITY, dutyRate: 20, exciseRate: 1 },
  // Engine 1500-2000cc
  { minEngine: 1500, maxEngine: 2000, minAge: 0, maxAge: 3, dutyRate: 50, exciseRate: 1 },
  { minEngine: 1500, maxEngine: 2000, minAge: 3, maxAge: 7, dutyRate: 70, exciseRate: 1 },
  { minEngine: 1500, maxEngine: 2000, minAge: 7, maxAge: Number.POSITIVE_INFINITY, dutyRate: 25, exciseRate: 2 },
  // Engine 2000-3000cc
  { minEngine: 2000, maxEngine: 3000, minAge: 0, maxAge: 3, dutyRate: 80, exciseRate: 20 },
  { minEngine: 2000, maxEngine: 3000, minAge: 3, maxAge: 7, dutyRate: 100, exciseRate: 25 },
  { minEngine: 2000, maxEngine: 3000, minAge: 7, maxAge: Number.POSITIVE_INFINITY, dutyRate: 25, exciseRate: 3 },
  // Engine > 3000cc
  { minEngine: 3000, maxEngine: Number.POSITIVE_INFINITY, minAge: 0, maxAge: 3, dutyRate: 20, exciseRate: 3 },
  { minEngine: 3000, maxEngine: Number.POSITIVE_INFINITY, minAge: 3, maxAge: 7, dutyRate: 25, exciseRate: 4 },
  {
    minEngine: 3000,
    maxEngine: Number.POSITIVE_INFINITY,
    minAge: 7,
    maxAge: Number.POSITIVE_INFINITY,
    dutyRate: 200,
    exciseRate: 1,
  },
]

export const CAR_BRANDS = [
  {
    brand: "Chevrolet",
    models: [
      { name: "Spark", defaultEngine: 1000, tifCode: "8703210000" },
      { name: "Cobalt", defaultEngine: 1500, tifCode: "8703220000" },
      { name: "Nexia 3", defaultEngine: 1500, tifCode: "8703220000" },
      { name: "Lacetti", defaultEngine: 1600, tifCode: "8703230000" },
      { name: "Malibu", defaultEngine: 2000, tifCode: "8703230000" },
      { name: "Tracker", defaultEngine: 1500, tifCode: "8703220000" },
      { name: "Equinox", defaultEngine: 2000, tifCode: "8703230000" },
      { name: "Tahoe", defaultEngine: 5300, tifCode: "8703240000" },
    ],
  },
  {
    brand: "Hyundai",
    models: [
      { name: "Accent", defaultEngine: 1600, tifCode: "8703230000" },
      { name: "Elantra", defaultEngine: 2000, tifCode: "8703230000" },
      { name: "Sonata", defaultEngine: 2500, tifCode: "8703230000" },
      { name: "Tucson", defaultEngine: 2000, tifCode: "8703230000" },
      { name: "Santa Fe", defaultEngine: 2500, tifCode: "8703230000" },
      { name: "Palisade", defaultEngine: 3500, tifCode: "8703240000" },
    ],
  },
  {
    brand: "Kia",
    models: [
      { name: "Rio", defaultEngine: 1600, tifCode: "8703230000" },
      { name: "Cerato", defaultEngine: 2000, tifCode: "8703230000" },
      { name: "K5", defaultEngine: 2500, tifCode: "8703230000" },
      { name: "Sportage", defaultEngine: 2000, tifCode: "8703230000" },
      { name: "Sorento", defaultEngine: 2500, tifCode: "8703230000" },
    ],
  },
  {
    brand: "Toyota",
    models: [
      { name: "Corolla", defaultEngine: 1800, tifCode: "8703230000" },
      { name: "Camry", defaultEngine: 2500, tifCode: "8703230000" },
      { name: "RAV4", defaultEngine: 2000, tifCode: "8703230000" },
      { name: "Highlander", defaultEngine: 3500, tifCode: "8703240000" },
      { name: "Land Cruiser", defaultEngine: 4500, tifCode: "8703240000" },
      { name: "Prius", defaultEngine: 1800, tifCode: "8703230000" },
    ],
  },
  {
    brand: "BMW",
    models: [
      { name: "3 Series", defaultEngine: 2000, tifCode: "8703230000" },
      { name: "5 Series", defaultEngine: 3000, tifCode: "8703230000" },
      { name: "7 Series", defaultEngine: 4400, tifCode: "8703240000" },
      { name: "X3", defaultEngine: 2000, tifCode: "8703230000" },
      { name: "X5", defaultEngine: 3000, tifCode: "8703240000" },
      { name: "X7", defaultEngine: 4400, tifCode: "8703240000" },
    ],
  },
  {
    brand: "Mercedes-Benz",
    models: [
      { name: "C-Class", defaultEngine: 2000, tifCode: "8703230000" },
      { name: "E-Class", defaultEngine: 3000, tifCode: "8703230000" },
      { name: "S-Class", defaultEngine: 4000, tifCode: "8703240000" },
      { name: "GLC", defaultEngine: 2000, tifCode: "8703230000" },
      { name: "GLE", defaultEngine: 3000, tifCode: "8703240000" },
      { name: "GLS", defaultEngine: 4000, tifCode: "8703240000" },
    ],
  },
  {
    brand: "Tesla",
    models: [
      { name: "Model 3", defaultEngine: 0, tifCode: "8703800000" },
      { name: "Model Y", defaultEngine: 0, tifCode: "8703800000" },
      { name: "Model S", defaultEngine: 0, tifCode: "8703800000" },
      { name: "Model X", defaultEngine: 0, tifCode: "8703800000" },
    ],
  },
  {
    brand: "BYD",
    models: [
      { name: "Han EV", defaultEngine: 0, tifCode: "8703800000" },
      { name: "Tang EV", defaultEngine: 0, tifCode: "8703800000" },
      { name: "Song Plus", defaultEngine: 1500, tifCode: "8703220000" },
    ],
  },
]

export const MOBILE_PHONE_MODELS = [
  { brand: "Apple", model: "iPhone 15 Pro Max", referencePrice: 1199, tifCode: "8517120000" },
  { brand: "Apple", model: "iPhone 15 Pro", referencePrice: 999, tifCode: "8517120000" },
  { brand: "Apple", model: "iPhone 15", referencePrice: 799, tifCode: "8517120000" },
  { brand: "Apple", model: "iPhone 15 Plus", referencePrice: 899, tifCode: "8517120000" },
  { brand: "Apple", model: "iPhone 14 Pro Max", referencePrice: 999, tifCode: "8517120000" },
  { brand: "Apple", model: "iPhone 14 Pro", referencePrice: 899, tifCode: "8517120000" },
  { brand: "Apple", model: "iPhone 14", referencePrice: 699, tifCode: "8517120000" },
  { brand: "Apple", model: "iPhone 13", referencePrice: 599, tifCode: "8517120000" },
  { brand: "Apple", model: "iPhone SE", referencePrice: 429, tifCode: "8517120000" },
  { brand: "Samsung", model: "Galaxy S24 Ultra", referencePrice: 1299, tifCode: "8517120000" },
  { brand: "Samsung", model: "Galaxy S24+", referencePrice: 999, tifCode: "8517120000" },
  { brand: "Samsung", model: "Galaxy S24", referencePrice: 799, tifCode: "8517120000" },
  { brand: "Samsung", model: "Galaxy Z Fold 5", referencePrice: 1799, tifCode: "8517120000" },
  { brand: "Samsung", model: "Galaxy Z Flip 5", referencePrice: 999, tifCode: "8517120000" },
  { brand: "Samsung", model: "Galaxy A54", referencePrice: 449, tifCode: "8517120000" },
  { brand: "Samsung", model: "Galaxy A34", referencePrice: 349, tifCode: "8517120000" },
  { brand: "Xiaomi", model: "14 Ultra", referencePrice: 999, tifCode: "8517120000" },
  { brand: "Xiaomi", model: "14 Pro", referencePrice: 799, tifCode: "8517120000" },
  { brand: "Xiaomi", model: "14", referencePrice: 599, tifCode: "8517120000" },
  { brand: "Xiaomi", model: "Redmi Note 13 Pro", referencePrice: 349, tifCode: "8517120000" },
  { brand: "Xiaomi", model: "Redmi Note 13", referencePrice: 249, tifCode: "8517120000" },
  { brand: "Google", model: "Pixel 8 Pro", referencePrice: 999, tifCode: "8517120000" },
  { brand: "Google", model: "Pixel 8", referencePrice: 699, tifCode: "8517120000" },
  { brand: "Google", model: "Pixel 7a", referencePrice: 499, tifCode: "8517120000" },
  { brand: "OnePlus", model: "12", referencePrice: 799, tifCode: "8517120000" },
  { brand: "OnePlus", model: "12R", referencePrice: 499, tifCode: "8517120000" },
  { brand: "Huawei", model: "Mate 60 Pro", referencePrice: 1099, tifCode: "8517120000" },
  { brand: "Huawei", model: "P60 Pro", referencePrice: 999, tifCode: "8517120000" },
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
  {
    code: "8703240000",
    description: "Motor vehicles - engine capacity exceeding 3000cc",
    descriptionUz: "Avtomobillar - dvigatel hajmi 3000cc dan yuqori",
    dutyRate: 150,
    exciseRate: 40,
    unit: "units",
    minReferencePrice: 30000,
    category: "vehicles",
    requiresCertificate: true,
  },
  {
    code: "8703800000",
    description: "Electric vehicles (EV)",
    descriptionUz: "Elektr avtomobillar",
    dutyRate: 0,
    exciseRate: 0,
    unit: "units",
    minReferencePrice: 25000,
    category: "vehicles",
    requiresCertificate: true,
  },
  // Pharmaceuticals
  {
    code: "3004900000",
    description: "Medicaments consisting of mixed or unmixed products for therapeutic use",
    descriptionUz:
      "Terapevtik maqsadlarda foydalaniladigan aralash yoki aralashtirilmagan mahsulotlardan iborat dori vositalari",
    dutyRate: 0,
    exciseRate: 0,
    unit: "kg",
    minReferencePrice: 10,
    category: "pharmaceuticals",
    requiresLicense: true,
    requiresCertificate: true,
  },
  {
    code: "3004500000",
    description: "Vitamins and provitamins for therapeutic use",
    descriptionUz: "Terapevtik maqsadlarda foydalaniladigan vitaminlar va provitaminlar",
    dutyRate: 0,
    exciseRate: 0,
    unit: "kg",
    minReferencePrice: 5,
    category: "pharmaceuticals",
    requiresCertificate: true,
  },
  // Clothing & Textiles
  {
    code: "6109100000",
    description: "T-shirts, singlets and other vests, knitted or crocheted, of cotton",
    descriptionUz: "Futbolkalar, mayкалar va boshqa kamzullar, trikotaj yoki kroje, paxtadan",
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

export function isVehicle(code: string): boolean {
  const tariff = getTariffCode(code)
  return tariff?.category === "vehicles"
}

// Get customs fee based on customs value
export function getCustomsFee(customsValue: number): number {
  const range = CUSTOMS_FEE_RANGES.find((r) => customsValue >= r.minCV && customsValue < r.maxCV)
  if (!range) return (CUSTOMS_FEE_RANGES[CUSTOMS_FEE_RANGES.length - 1].bcuAmount * BCU_VALUE_UZS) / USD_TO_UZS_RATE
  return (range.bcuAmount * BCU_VALUE_UZS) / USD_TO_UZS_RATE
}

export function getUtilizationFee(engineDisplacement: number, isEV: boolean): number {
  const rate = UTILIZATION_FEE_RATES.find((r) => engineDisplacement >= r.minEngine && engineDisplacement < r.maxEngine)
  if (!rate)
    return (UTILIZATION_FEE_RATES[UTILIZATION_FEE_RATES.length - 1].multiplier * BRV_VALUE_UZS) / USD_TO_UZS_RATE

  const multiplier = isEV ? rate.evMultiplier || 0.1 : rate.multiplier
  return (multiplier * BRV_VALUE_UZS) / USD_TO_UZS_RATE
}

export function getAutomobileTariff(engineDisplacement: number, age: number): AutomobileTariff | undefined {
  return AUTOMOBILE_TARIFFS.find(
    (t) => engineDisplacement >= t.minEngine && engineDisplacement < t.maxEngine && age >= t.minAge && age < t.maxAge,
  )
}

export function getMobilePhoneReferencePrice(model: string): number | undefined {
  const phone = MOBILE_PHONE_MODELS.find(
    (p) =>
      p.model.toLowerCase() === model.toLowerCase() || `${p.brand} ${p.model}`.toLowerCase() === model.toLowerCase(),
  )
  return phone?.referencePrice
}

export function searchMobilePhones(query: string) {
  const searchTerm = query.toLowerCase()
  return MOBILE_PHONE_MODELS.filter(
    (p) =>
      p.brand.toLowerCase().includes(searchTerm) ||
      p.model.toLowerCase().includes(searchTerm) ||
      `${p.brand} ${p.model}`.toLowerCase().includes(searchTerm),
  )
}
