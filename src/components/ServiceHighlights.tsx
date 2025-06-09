import { Truck, Shield, CreditCard, Clock, Award, Phone } from "lucide-react"

const highlights = [
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Same day or next day delivery available",
    color: "blue",
  },
  {
    icon: Shield,
    title: "Fully Licensed",
    description: "All permits and licenses handled for you",
    color: "emerald",
  },
  {
    icon: CreditCard,
    title: "Flexible Payment",
    description: "Pay online or on delivery",
    color: "purple",
  },
  {
    icon: Clock,
    title: "Extended Hire",
    description: "Up to 14 days included in price",
    color: "orange",
  },
  {
    icon: Award,
    title: "Best Prices",
    description: "Competitive rates with no hidden fees",
    color: "pink",
  },
  {
    icon: Phone,
    title: "24/7 Support",
    description: "Expert help when you need it",
    color: "indigo",
  },
]

const colorClasses = {
  blue: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  emerald: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
  purple: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
  orange: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
  pink: "bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400",
  indigo: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400",
}

export function ServiceHighlights() {
  return (
    <div className="bg-gray-50 dark:bg-gray-800 mt-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Why Choose Us?</h2>
          <p className="text-gray-600 dark:text-gray-300">Professional skip hire services you can trust</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {highlights.map((highlight, index) => {
            const Icon = highlight.icon
            return (
              <div
                key={index}
                className="flex items-start space-x-4 p-4 rounded-lg hover:bg-white dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <div
                  className={`
                  w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0
                  ${colorClasses[highlight.color as keyof typeof colorClasses]}
                `}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{highlight.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{highlight.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
