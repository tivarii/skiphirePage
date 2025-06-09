
import { ArrowRight, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/Card"
import type { Skip } from "../types/skip"

interface StickyContinueSectionProps {
  selectedSkip: Skip | null
  onContinue: () => void
  onDeselect: () => void
}

export function StickyContinueSection({ selectedSkip, onContinue, onDeselect }: StickyContinueSectionProps) {
  if (!selectedSkip) return null

  const totalPrice = Math.round(selectedSkip.price_before_vat * (1 + selectedSkip.vat / 100))

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-t border-gray-200 dark:border-gray-700 shadow-lg"
      >
        <div className="max-w-4xl mx-auto">
          <Card className="border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-xl">
            <CardContent className="p-4">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-emerald-500 dark:bg-emerald-600 rounded-full flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      ✓
                    </motion.div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {selectedSkip.size} Yard Skip Selected
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      £{totalPrice} inc. VAT • {selectedSkip.hire_period_days} days
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onDeselect}
                    className="border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Deselect
                  </Button>

                  <Button
                    size="lg"
                    onClick={onContinue}
                    className="bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-600 dark:hover:bg-emerald-700 px-8"
                  >
                    Continue to Permit Check
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}

