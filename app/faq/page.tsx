import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HelpCircle } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "What is the duty-free limit for personal imports?",
    answer:
      "The duty-free limit depends on your transport method: Air transport: $1,000 per entry ($2,000 per year), Rail/River: $500 per entry ($1,000 per year), Road/Foot: $300 per entry. Weight limits also apply (50kg for air, 31kg for other methods).",
  },
  {
    question: "How is the Single Customs Payment (YBT) calculated?",
    answer:
      "YBT is calculated as the higher of: 30% of the excess value (amount over duty-free limit) OR $3 per kg of excess weight. This simplified regime applies only to personal imports that exceed duty-free limits.",
  },
  {
    question: "How many mobile phones can I bring for personal use?",
    answer:
      "You can bring up to 2 mobile devices per entry for personal use. Any additional devices (3rd and above) will be processed as commercial imports and subject to full customs duties and VAT. All devices must be registered with UzIMEI within 30 days.",
  },
  {
    question: "What is IMEI registration and why is it required?",
    answer:
      "IMEI registration is mandatory for all mobile devices imported into Uzbekistan. The registration fee is 20% of the Base Calculation Unit (BCU) per device. Unregistered devices will be blocked from cellular networks. Register at uzimei.uz within 30 days of entry.",
  },
  {
    question: "What happens if I don't declare my mobile phone at customs?",
    answer:
      "If you fail to declare a new mobile device at customs, you will be required to pay a 30% duty fee when attempting to register the device with UzIMEI. Always declare new devices to avoid additional charges.",
  },
  {
    question: "How is commercial import duty calculated?",
    answer:
      "Commercial import follows the CIF method: 1) Calculate Customs Value (price + logistics + insurance), 2) Apply Customs Duty based on TIF TN code, 3) Calculate Excise Tax if applicable, 4) Apply 12% VAT on the total, 5) Add customs clearance fees based on value range.",
  },
  {
    question: "What is a TIF TN code?",
    answer:
      "TIF TN (Tariff of Foreign Economic Activity of Uzbekistan) is the national tariff classification system based on the Harmonized System. Each 10-digit code determines the applicable duty rate, excise tax, and any licensing or certification requirements for the product.",
  },
  {
    question: "What documents do I need for commercial import?",
    answer:
      "Commercial imports typically require: Commercial invoice, Packing list, Bill of lading or Airway bill, Certificate of origin, and possibly Conformity certificates or licenses depending on the product category.",
  },
  {
    question: "What is the current VAT rate in Uzbekistan?",
    answer:
      "The standard VAT rate in Uzbekistan is 12%. VAT is calculated on the sum of Customs Value + Customs Duty + Excise Tax (if applicable).",
  },
  {
    question: "How often are exchange rates and duty rates updated?",
    answer:
      "Exchange rates are updated based on the Central Bank of Uzbekistan official rates. Duty rates and BCU values may be updated following legislative changes. Our calculator uses the most recent published rates, but always verify with official customs authorities for the most current information.",
  },
]

export default function FAQPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-to-b from-primary/5 to-background py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
                <HelpCircle className="w-4 h-4" />
                FAQ
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Frequently Asked Questions</h1>
              <p className="text-lg text-muted-foreground">Common questions about importing goods into Uzbekistan</p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="bg-card border border-border rounded-xl px-6 data-[state=open]:border-primary/30"
                  >
                    <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
