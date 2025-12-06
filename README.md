# Uzbekistan Import Cost Calculator

A comprehensive customs import cost calculation platform for Uzbekistan, supporting both individual and commercial imports with full support for electronics, automobiles, pharmaceuticals, and general goods.

## Features

### Core Calculator
- **Multi-step Wizard Interface** - Guided 6-step process for accurate cost estimation
- **Dual Import Modes** - Support for Individual (YBT simplified regime) and Commercial (CIF-based) calculations
- **Transport Method Selection** - Air, Rail, Road, and Foot crossing with respective duty-free limits
- **Product Categorization** - Electronics, Automobiles, Pharmaceuticals, and Other goods

### Specialized Modules

#### Mobile Phone Calculator (`/mobile`)
- Personal import: 2-device limit with IMEI registration fee (50,000 UZS)
- Commercial import: Dynamic table for multiple device models
- Certificate of Conformity impact calculation
- "Declared at Customs" toggle for duty-free personal devices

#### Automobile Calculator (`/automobiles`)
- Brand/model database with auto-populated specifications
- Engine size and fuel type selection (Petrol, Diesel, Hybrid, Electric)
- Age-based depreciation and utilization fee calculation
- Electric vehicle incentives support

### Results & Analysis
- **Prominent Total Cost Display** - Clear KPI with percentage increase from original price
- **Interactive Charts** - Pie chart and waterfall chart for cost breakdown
- **Expandable Formulas** - Transparent calculation methodology
- **Documentation Requirements** - Required documents, issuing authorities, and fees

### Additional Pages
- **Tariff Database** (`/tariffs`) - Searchable TIF TN codes with duty rates
- **Import Guide** (`/guide`) - Step-by-step import process documentation
- **FAQ** (`/faq`) - Common questions and answers
- **Admin Panel** (`/admin`) - Rate and configuration management

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Charts**: Recharts
- **Icons**: Lucide React

## Project Structure

\`\`\`
├── app/
│   ├── page.tsx              # Main calculator page
│   ├── layout.tsx            # Root layout with metadata
│   ├── globals.css           # Global styles and design tokens
│   ├── mobile/               # Mobile phone calculator
│   ├── automobiles/          # Automobile calculator
│   ├── tariffs/              # TIF TN code search
│   ├── guide/                # Import guide
│   ├── faq/                  # FAQ page
│   └── admin/                # Admin dashboard
├── components/
│   ├── calculator/           # Calculator wizard components
│   │   ├── calculator-wizard.tsx
│   │   ├── category-step.tsx
│   │   ├── user-type-step.tsx
│   │   ├── transport-step.tsx
│   │   ├── product-step.tsx
│   │   ├── mobile-phone-step.tsx
│   │   ├── automobile-step.tsx
│   │   ├── details-step.tsx
│   │   └── results-display.tsx
│   ├── mobile/               # Mobile phone module
│   ├── automobile/           # Automobile module
│   └── admin/                # Admin components
├── lib/
│   ├── types.ts              # TypeScript interfaces
│   ├── calculator.ts         # Calculation logic
│   └── tariff-data.ts        # TIF TN codes and rates
└── README.md
\`\`\`

## Calculation Logic

### Commercial Imports (CIF-based)

\`\`\`
CIF = Product Price + Shipping + Insurance
Customs Duty = CIF × Duty Rate
Excise Tax = (CIF + Customs Duty) × Excise Rate
VAT = (CIF + Customs Duty + Excise Tax) × 12%
Total = CIF + Customs Duty + Excise Tax + VAT + Fees
\`\`\`

### Individual Imports (YBT Simplified Regime)

\`\`\`
If value ≤ duty-free limit:
  Total = Product Price + IMEI Fee (if mobile)
  
If value > duty-free limit:
  Taxable Amount = Value - Duty-Free Limit
  YBT = Taxable Amount × 27.5%
  Total = Product Price + YBT + Fees
\`\`\`

### Duty-Free Limits by Transport


| Transport Method | Limit (USD) |
|------------------|-------------|
| Air              | $1,000      |
| Rail             | $500        |
| Road (Car)       | $500        |
| Foot             | $50         |

### Automobile Utilization Fee

| Engine Size      | Fee (BCU)   |
|------------------|-------------|
| ≤ 1000cc         | 2.0         |
| 1001-2000cc      | 3.0         |
| 2001-3000cc      | 5.0         |
| > 3000cc         | 7.0         |
| Electric         | 0.5         |

*BCU (Base Calculation Unit) = 340,000 UZS*

## Environment Variables

For production deployment with database integration:

\`\`\`env
# Database (Supabase/Neon)
DATABASE_URL=your_database_url

# Exchange Rate API (optional)
EXCHANGE_RATE_API_KEY=your_api_key
\`\`\`

## Getting Started

### Using shadcn CLI (Recommended)

\`\`\`bash
npx shadcn@latest init
\`\`\`

### Manual Installation

\`\`\`bash
# Clone the repository
git clone https://github.com/your-username/uzbekistan-import-calculator.git

# Navigate to project directory
cd uzbekistan-import-calculator

# Install dependencies
npm install

# Run development server
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) to view the application.

## Configuration

### Updating Rates

Current rates are defined in `lib/tariff-data.ts`:

- **VAT Rate**: 12%
- **YBT Rate**: 27.5%
- **BCU Value**: 340,000 UZS
- **Exchange Rate**: 12,800 UZS/USD

For production, connect a database to enable real-time rate updates via the admin panel.

### Adding New TIF TN Codes

Add entries to the `TARIFF_DATABASE` array in `lib/tariff-data.ts`:

\`\`\`typescript
{
  code: "8517.13.0000",
  name: "Smartphones",
  nameUz: "Smartfonlar",
  category: "electronics",
  dutyRate: 0,
  exciseRate: 0,
  vatRate: 12,
  unit: "piece",
  requiresCertificate: true,
  certificateFee: 500000
}
\`\`\`

## API Reference

### Calculator Functions

#### `calculateImportCosts(input: CalculatorInput): CalculationResult`

Main calculation function that returns complete cost breakdown.

#### `calculateAutomobileCosts(input: AutomobileInput): AutomobileResult`

Specialized calculation for automobile imports including utilization fee.

#### `calculateMobilePhoneCosts(input: MobilePhoneInput): MobilePhoneResult`

Handles mobile phone specific logic with IMEI fees and device limits.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit changes (`git commit -am 'Add new feature'`)
4. Push to branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## License

MIT License - see [LICENSE](LICENSE) for details.

## Acknowledgments

- Uzbekistan Customs Committee for tariff data
- State Tax Committee for tax rate information
