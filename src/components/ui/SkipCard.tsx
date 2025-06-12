import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Info, ArrowRight, CheckCircle, AlertTriangle, Truck, Calendar, Package, X } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Skip } from "@/types/skip"
import { Button } from "./button"

interface SkipCardProps {
  skip: Skip
  isSelected: boolean
  onSelect: (skipId: number) => void
  className?: string
}

export function SkipCard({ skip, isSelected, onSelect, className = "" }: SkipCardProps) {
  const [showPriceBreakdown, setShowPriceBreakdown] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const totalPrice = Math.round(skip.price_before_vat * (1 + skip.vat / 100))
  const vatAmount = Math.round((skip.price_before_vat * skip.vat) / 100)
  const hasAdditionalCosts = skip.transport_cost || skip.per_tonne_cost

  const getSkipImage = (size: number) => {
    return `https://yozbrydxdlcxghkphhtq.supabase.co/storage/v1/object/public/skips/skip-sizes/${size}-yarder-skip.jpg`
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, type: "spring", damping: 20 }}
      className={cn(
        "relative overflow-hidden rounded-xl shadow-md transition-all w-full h-full",
        isSelected ? "ring-2 ring-primary" : "hover:shadow-lg",
        className
      )}
    >
      <div 
        className={cn(
          "relative transition-all duration-300 h-full flex flex-col",
          isSelected ? "bg-gradient-to-br from-slate-50 to-primary/5 dark:from-slate-900 dark:to-primary/10" : 
              "bg-white dark:bg-slate-900"
        )}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Top bar with size and selection indicator */}
        <div className={cn(
          "flex items-center justify-between py-2 px-3 bg-gradient-to-r",
          isSelected ? 
            "from-primary/90 to-primary-dark/90 text-white" : 
            "from-slate-800/90 to-slate-900/90 text-slate-100 dark:from-slate-800 dark:to-slate-900"
        )}>
          <div className="flex items-center gap-1.5">
            <Package className="w-3.5 h-3.5" />
            <span className="font-medium text-sm">{skip.size} Yard Skip</span>
          </div
          >
          
          <AnimatePresence>
            {isSelected && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                className="flex items-center gap-1 text-xs font-medium bg-white/20 px-2 py-0.5 rounded-full"
              >
                <CheckCircle className="w-3 h-3" />
                <span>Selected</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Main content with adaptive layout */}
        <div className="flex flex-col sm:flex-row flex-1 overflow-hidden">
          {/* Image section - responsive and consistent */}
          <div className="relative w-full sm:w-2/5 overflow-hidden h-48 sm:h-auto">
            <img
              src={getSkipImage(skip.size)}
              alt={`${skip.size} Yard Skip`}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
            />
            
            {/* Skip features overlays */}
            <div className="absolute bottom-0 inset-x-0 p-2 flex flex-wrap gap-1.5 bg-gradient-to-t from-black/70 to-transparent">
              {!skip.allowed_on_road && (
                <div className="bg-red-500/80 backdrop-blur-sm text-white px-1.5 py-0.5 rounded text-xs font-medium flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  <span>No Road</span>
                </div>
              )}
              {skip.allows_heavy_waste && (
                <div className="bg-emerald-500/80 backdrop-blur-sm text-white px-1.5 py-0.5 rounded text-xs font-medium flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  <span>Heavy Waste</span>
                </div>
              )}
            </div>
            
            {/* Deselect button */}
            <AnimatePresence>
              {isSelected && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.5, top: 8, right: 8 }}
                  animate={{ opacity: 1, scale: 1, top: 8, right: 8 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className="absolute z-10 p-1 rounded-full bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-red-500 hover:bg-red-100 shadow"
                  onClick={(e) => {
                    e.stopPropagation()
                    onSelect(skip.id)
                  }}
                >
                  <X className="w-3.5 h-3.5" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          {/* Content section - better spacing and responsiveness */}
          <div className="p-3 sm:p-4 flex flex-col justify-between flex-1 overflow-hidden">
            {/* Skip info */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 truncate">
                {skip.size} Cubic Yard Skip
              </h3>

              <div className="mt-2 space-y-1.5">
                <div className="flex items-center text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                  <Calendar className="w-3.5 h-3.5 mr-1.5 text-primary" />
                  <span>{skip.hire_period_days} Day Hire Period</span>
                </div>
                
                {hasAdditionalCosts && (
                  <div className="flex items-start text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                    <Truck className="w-3.5 h-3.5 mr-1.5 mt-0.5 text-amber-500 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-amber-600 dark:text-amber-400 truncate">Additional fees:</p>
                      <ul className="text-xs space-y-0.5 mt-0.5">
                        {skip.transport_cost && (
                          <li>Transport: £{skip.transport_cost}</li>
                        )}
                        {skip.per_tonne_cost && (
                          <li>Per tonne: £{skip.per_tonne_cost}</li>
                        )}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Price and action section */}
            <div className="mt-3">
              <div className="flex items-end justify-between flex-wrap gap-2">
                <div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    £{totalPrice}
                  </div>
                  
                  <div className="flex items-center mt-0.5">
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      {showPriceBreakdown ? (
                        <span>VAT (£{vatAmount}) included</span>
                      ) : (
                        <span>inc. VAT</span>
                      )}
                    </span>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        setShowPriceBreakdown(!showPriceBreakdown)
                      }}
                      className="ml-1 p-0.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <Info className="w-3 h-3 text-slate-400" />
                    </button>
                  </div>
                </div>

                <Button
                  variant={isSelected ? "default" : "outline"}
                  size="sm"
                  className={cn(
                    "rounded-full font-medium transition-all text-xs py-1 h-auto",
                    isSelected ? "bg-primary text-white" : "border-primary text-primary hover:bg-primary hover:text-white"
                  )}
                  onClick={(e) => {
                    e.stopPropagation()
                    onSelect(skip.id)
                  }}
                >
                  {isSelected ? (
                    <span className="flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" />
                      <span className="whitespace-nowrap">Selected</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <span className="whitespace-nowrap">Select</span>
                      <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" />
                    </span>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Expandable details section */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="px-4 pb-4 overflow-hidden"
            >
              <div className="pt-3 border-t border-slate-200 dark:border-slate-700">
                <h4 className="font-medium text-sm text-slate-900 dark:text-white mb-2">Skip Details</h4>
                <ul className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                  <li className="flex items-center">
                    <span className="w-24 flex-shrink-0">Dimensions:</span>
                    <span className="font-medium">Approx. {skip.size * 0.3}m³</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-24 flex-shrink-0">Road Placement:</span>
                    <span className={cn(
                      "font-medium",
                      skip.allowed_on_road ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"
                    )}>
                      {skip.allowed_on_road ? "Allowed" : "Not Allowed"}
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-24 flex-shrink-0">Heavy Waste:</span>
                    <span className={cn(
                      "font-medium",
                      skip.allows_heavy_waste ? "text-emerald-600 dark:text-emerald-400" : "text-slate-600 dark:text-slate-400"
                    )}>
                      {skip.allows_heavy_waste ? "Allowed" : "Standard Waste Only"}
                    </span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-24 flex-shrink-0">Hire Period:</span>
                    <span className="font-medium">{skip.hire_period_days} Days</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
