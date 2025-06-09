
import { useState } from "react"
import { MapPin, Trash2, Truck, Shield, Calendar, CreditCard } from "lucide-react"
import { ThemeProvider } from "../contexts/ThemeContext"
import { ScrollAwareHeader } from "../components/ScrollAwareHeader"
import { SkipGrid } from "@/components/SkipGrid"
import { StickyContinueSection } from "@/components/StickyContinueSection"
import { ServiceHighlights } from "@/components/ServiceHighlights"
import type { Skip, Step } from "@/types/skip"

// Skip data
const skipData: Skip[] = [
  {
    id: 17933,
    size: 4,
    hire_period_days: 14,
    transport_cost: null,
    per_tonne_cost: null,
    price_before_vat: 278,
    vat: 20,
    postcode: "NR32",
    area: "",
    forbidden: false,
    created_at: "2025-04-03T13:51:46.897146",
    updated_at: "2025-04-07T13:16:52.813",
    allowed_on_road: true,
    allows_heavy_waste: true,
  },
  {
    id: 17934,
    size: 6,
    hire_period_days: 14,
    transport_cost: null,
    per_tonne_cost: null,
    price_before_vat: 305,
    vat: 20,
    postcode: "NR32",
    area: "",
    forbidden: false,
    created_at: "2025-04-03T13:51:46.897146",
    updated_at: "2025-04-07T13:16:52.992",
    allowed_on_road: true,
    allows_heavy_waste: true,
  },
  {
    id: 17935,
    size: 8,
    hire_period_days: 14,
    transport_cost: null,
    per_tonne_cost: null,
    price_before_vat: 375,
    vat: 20,
    postcode: "NR32",
    area: "",
    forbidden: false,
    created_at: "2025-04-03T13:51:46.897146",
    updated_at: "2025-04-07T13:16:53.171",
    allowed_on_road: true,
    allows_heavy_waste: true,
  },
  {
    id: 17936,
    size: 10,
    hire_period_days: 14,
    transport_cost: null,
    per_tonne_cost: null,
    price_before_vat: 400,
    vat: 20,
    postcode: "NR32",
    area: "",
    forbidden: false,
    created_at: "2025-04-03T13:51:46.897146",
    updated_at: "2025-04-07T13:16:53.339",
    allowed_on_road: false,
    allows_heavy_waste: false,
  },
  {
    id: 17937,
    size: 12,
    hire_period_days: 14,
    transport_cost: null,
    per_tonne_cost: null,
    price_before_vat: 439,
    vat: 20,
    postcode: "NR32",
    area: "",
    forbidden: false,
    created_at: "2025-04-03T13:51:46.897146",
    updated_at: "2025-04-07T13:16:53.516",
    allowed_on_road: false,
    allows_heavy_waste: false,
  },
  {
    id: 17938,
    size: 14,
    hire_period_days: 14,
    transport_cost: null,
    per_tonne_cost: null,
    price_before_vat: 470,
    vat: 20,
    postcode: "NR32",
    area: "",
    forbidden: false,
    created_at: "2025-04-03T13:51:46.897146",
    updated_at: "2025-04-07T13:16:53.69",
    allowed_on_road: false,
    allows_heavy_waste: false,
  },
  {
    id: 17939,
    size: 16,
    hire_period_days: 14,
    transport_cost: null,
    per_tonne_cost: null,
    price_before_vat: 496,
    vat: 20,
    postcode: "NR32",
    area: "",
    forbidden: false,
    created_at: "2025-04-03T13:51:46.897146",
    updated_at: "2025-04-07T13:16:53.876",
    allowed_on_road: false,
    allows_heavy_waste: false,
  },
  {
    id: 15124,
    size: 20,
    hire_period_days: 14,
    transport_cost: 248,
    per_tonne_cost: 248,
    price_before_vat: 992,
    vat: 20,
    postcode: "NR32",
    area: "",
    forbidden: false,
    created_at: "2025-04-03T13:51:40.344435",
    updated_at: "2025-04-07T13:16:52.434",
    allowed_on_road: false,
    allows_heavy_waste: true,
  },
  {
    id: 15125,
    size: 40,
    hire_period_days: 14,
    transport_cost: 248,
    per_tonne_cost: 248,
    price_before_vat: 992,
    vat: 20,
    postcode: "NR32",
    area: "",
    forbidden: false,
    created_at: "2025-04-03T13:51:40.344435",
    updated_at: "2025-04-07T13:16:52.603",
    allowed_on_road: false,
    allows_heavy_waste: false,
  },
]

const steps: Step[] = [
  { id: "postcode", label: "Postcode", icon: MapPin, active: true, completed: true },
  { id: "waste-type", label: "Waste Type", icon: Trash2, active: true, completed: true },
  { id: "select-skip", label: "Select Skip", icon: Truck, active: true, completed: false },
  { id: "permit-check", label: "Permit Check", icon: Shield, active: false, completed: false },
  { id: "choose-date", label: "Choose Date", icon: Calendar, active: false, completed: false },
  { id: "payment", label: "Payment", icon: CreditCard, active: false, completed: false },
]

function SkipHirePageContent() {
  const [selectedSkipId, setSelectedSkipId] = useState<number | null>(null)

  const selectedSkip = skipData.find((skip) => skip.id === selectedSkipId) || null

  const handleSkipSelect = (skipId: number) => {
    // If the same skip is clicked again, deselect it
    setSelectedSkipId(selectedSkipId === skipId ? null : skipId)
  }

  const handleDeselect = () => {
    setSelectedSkipId(null)
  }

  const handleContinue = () => {
    console.log("Continue to permit check with skip:", selectedSkip)
    // Here you would navigate to the next step
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Smart Header with Theme Toggle */}
      <ScrollAwareHeader
        title="Choose Your Perfect Skip"
        subtitle="Find the ideal skip size for your project with transparent pricing"
        location="NR32 Lowestoft"
        steps={steps}
      />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <SkipGrid skips={skipData} selectedSkipId={selectedSkipId} onSkipSelect={handleSkipSelect} />
      </main>

      {/* Sticky Continue Section */}
      <StickyContinueSection selectedSkip={selectedSkip} onContinue={handleContinue} onDeselect={handleDeselect} />

      {/* Service Highlights */}
      <ServiceHighlights />
    </div>
  )
}

export default function SkipHirePage() {
  return (
    <ThemeProvider>
      <SkipHirePageContent />
    </ThemeProvider>
  )
}
