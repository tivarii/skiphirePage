
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, Check, Info, AlertTriangle, CheckCircle, Clock, X } from "lucide-react"
import { Card, CardContent } from "./Card"
import { EnhancedButton } from "./EnhancedButton"
import type { Skip } from "@/types/skip"

interface SkipCardProps {
  skip: Skip
  isSelected: boolean
  onSelect: (skipId: number) => void
  className?: string
}

export function SkipCard({ skip, isSelected, onSelect, className = "" }: SkipCardProps) {
  const [showPriceBreakdown, setShowPriceBreakdown] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const totalPrice = Math.round(skip.price_before_vat * (1 + skip.vat / 100))
  const vatAmount = totalPrice - skip.price_before_vat
  const hasAdditionalCosts = skip.transport_cost || skip.per_tonne_cost

  const getSkipImage = (size: number) => {
    return `https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/${size}-yarder-skip.jpg`
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      <Card
        className={`
          group cursor-pointer transition-all duration-300 overflow-hidden
          ${
            isSelected
              ? "ring-2 ring-blue-500 dark:ring-blue-400 shadow-2xl bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-600"
              : "hover:shadow-xl border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
          }
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={() => onSelect(skip.id)}
      >
        <CardContent className="p-0">
          {/* Image Section with Overlay */}
          <div className="relative overflow-hidden">
            <motion.img
              src={getSkipImage(skip.size)}
              alt={`${skip.size} Yard Skip`}
              className="w-full h-48 object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Size Badge */}
            <motion.div
              className="absolute top-4 right-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-blue-600 dark:bg-blue-500 text-white px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg backdrop-blur-sm">
                {skip.size} Yards
              </div>
            </motion.div>

            {/* Selection Indicator */}
            <AnimatePresence>
              {isSelected && (
                <motion.div
                  className="absolute top-4 left-4"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  exit={{ scale: 0, rotate: 180 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="w-10 h-10 bg-emerald-500 dark:bg-emerald-600 rounded-full flex items-center justify-center shadow-lg">
                    <Check className="w-6 h-6 text-white" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Deselect Button */}
            <AnimatePresence>
              {isSelected && isHovered && (
                <motion.button
                  className="absolute top-4 left-16 w-8 h-8 bg-red-500 dark:bg-red-600 rounded-full flex items-center justify-center shadow-lg"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    onSelect(skip.id)
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-4 h-4 text-white" />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Status Badges */}
            <div className="absolute bottom-4 left-4 space-y-2">
              <AnimatePresence>
                {!skip.allowed_on_road && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-red-500/90 dark:bg-red-600/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 shadow-lg"
                  >
                    <AlertTriangle className="w-3 h-3" />
                    No Road Placement
                  </motion.div>
                )}
                {skip.allows_heavy_waste && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-emerald-500/90 dark:bg-emerald-600/90 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 shadow-lg"
                  >
                    <CheckCircle className="w-3 h-3" />
                    Heavy Waste OK
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6">
            {/* Header with Price */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{skip.size} Yard Skip</h3>
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>{skip.hire_period_days} day hire period</span>
                </div>
              </div>

              {/* Price Display */}
              <div className="flex items-start gap-2">
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">£{totalPrice}</div>
                  <AnimatePresence>
                    {showPriceBreakdown ? (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-xs text-gray-500 dark:text-gray-400 space-y-1 mt-1"
                      >
                        <div>Excl. VAT: £{skip.price_before_vat}</div>
                        <div>
                          VAT ({skip.vat}%): £{vatAmount}
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-xs text-gray-500 dark:text-gray-400"
                      >
                        inc. VAT
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowPriceBreakdown(!showPriceBreakdown)
                  }}
                  className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                >
                  <Info className="w-4 h-4 text-gray-400 dark:text-gray-400" />
                </motion.button>
              </div>
            </div>

            {/* Additional Costs Warning */}
            <AnimatePresence>
              {hasAdditionalCosts && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mb-4 p-3 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg"
                >
                  <p className="text-xs text-orange-800 dark:text-orange-300 font-medium mb-1">
                    Additional costs may apply:
                  </p>
                  <div className="space-y-1">
                    {skip.transport_cost && (
                      <p className="text-xs text-orange-700 dark:text-orange-400">Transport: £{skip.transport_cost}</p>
                    )}
                    {skip.per_tonne_cost && (
                      <p className="text-xs text-orange-700 dark:text-orange-400">Per tonne: £{skip.per_tonne_cost}</p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action Button */}
            <EnhancedButton
              variant={isSelected ? "success" : "primary"}
              size="lg"
              className="w-full"
              onClick={(e) => {
                e.stopPropagation()
                onSelect(skip.id)
              }}
            >
              {isSelected ? (
                <>
                  <Check className="w-5 h-5 mr-2" />
                  Selected - Click to Deselect
                </>
              ) : (
                <>
                  Select This Skip
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </EnhancedButton>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
