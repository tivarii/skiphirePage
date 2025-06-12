import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp, Package, Filter, CheckCircle } from "lucide-react"
import { SkipCard } from "./ui/SkipCard"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"
import type { Skip } from "@/types/skip"

interface SkipGridProps {
  skips: Skip[]
  selectedSkipId: number | null
  onSkipSelect: (skipId: number) => void
  className?: string
}

export function SkipGrid({ skips, selectedSkipId, onSkipSelect, className = "" }: SkipGridProps) {
  const [activeSections, setActiveSections] = useState<Record<string, boolean>>({
    small: true,
    medium: true, 
    large: true
  })
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState<"size" | "price">("size")

  // Group and sort skips
  const sortSkips = (skipsToSort: Skip[]) => {
    return [...skipsToSort].sort((a, b) => {
      if (sortBy === "size") {
        return a.size - b.size
      } else {
        const priceA = a.price_before_vat * (1 + a.vat / 100)
        const priceB = b.price_before_vat * (1 + b.vat / 100)
        return priceA - priceB
      }
    })
  }

  // Group skips by size category
  const smallSkips = sortSkips(skips.filter((skip) => skip.size <= 8))
  const mediumSkips = sortSkips(skips.filter((skip) => skip.size > 8 && skip.size <= 16))
  const largeSkips = sortSkips(skips.filter((skip) => skip.size > 16))

  const toggleSection = (section: string) => {
    setActiveSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }))
  }

  const SkipSection = ({ 
    id,
    title, 
    skips: sectionSkips, 
    delay = 0,
    icon = Package 
  }: { 
    id: string;
    title: string; 
    skips: Skip[]; 
    delay?: number;
    icon?: React.ElementType;
  }) => {
    const isActive = activeSections[id]
    const Icon = icon

    return (
      <div className="mb-8 border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-sm">
        <div 
          className="flex items-center justify-between p-4 cursor-pointer bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
          onClick={() => toggleSection(id)}
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
              <Icon className="w-4 h-4" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
            <div className="flex items-center justify-center size-6 rounded-full bg-slate-200 dark:bg-slate-700 text-xs font-medium">
              {sectionSkips.length}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {selectedSkipId && sectionSkips.some(skip => skip.id === selectedSkipId) && (
              <span className="text-xs font-medium text-primary flex items-center gap-1 px-2 py-0.5 bg-primary/10 rounded-full">
                <CheckCircle className="w-3 h-3" />
                Selected
              </span>
            )}
            {isActive ? (
              <ChevronUp className="w-5 h-5 text-slate-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-slate-500" />
            )}
          </div>
        </div>
        
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className={cn(
                "p-4 grid gap-4",
                viewMode === "grid" 
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
                  : "grid-cols-1"
              )}>
                {sectionSkips.map((skip, index) => (
                  <motion.div
                    key={skip.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: delay + index * 0.05, duration: 0.3 }}
                    className={cn(
                      viewMode === "list" && "max-w-none h-auto"
                    )}
                  >
                    <SkipCard 
                      skip={skip} 
                      isSelected={selectedSkipId === skip.id} 
                      onSelect={onSkipSelect} 
                      className={cn(
                        viewMode === "list" && "h-auto"
                      )}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    )
  }

  const hasSkips = skips.length > 0
  const hasAnySelectedSkip = selectedSkipId !== null

  return (
    <div className={cn(
      className,
      "transition-all duration-300",
      hasAnySelectedSkip ? "pb-28" : ""
    )}>
      {/* Controls section */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center mb-6 bg-white dark:bg-slate-900 p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="text-base sm:text-lg font-medium text-slate-900 dark:text-white">
          {skips.length} {skips.length === 1 ? 'Skip' : 'Skips'} Available
        </div>
        
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center rounded-md overflow-hidden border border-slate-200 dark:border-slate-700">
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "rounded-none px-3 h-9",
                viewMode === "grid" && "bg-slate-100 dark:bg-slate-800"
              )}
              onClick={() => setViewMode("grid")}
            >
              Grid
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "rounded-none px-3 h-9",
                viewMode === "list" && "bg-slate-100 dark:bg-slate-800"
              )}
              onClick={() => setViewMode("list")}
            >
              List
            </Button>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500 dark:text-slate-400">Sort:</span>
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "size" | "price")}
              className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-md text-sm px-2 py-1.5"
            >
              <option value="size">Size</option>
              <option value="price">Price</option>
            </select>
          </div>
        </div>
      </div>

      {!hasSkips ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-16 px-4 text-center rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700"
        >
          <Filter className="w-12 h-12 text-slate-300 dark:text-slate-600 mb-4" />
          <h3 className="text-xl font-medium text-slate-900 dark:text-white mb-2">No Skips Available</h3>
          <p className="text-slate-500 dark:text-slate-400 max-w-md">
            No skips match your current search criteria. Try adjusting your filters or check back later.
          </p>
        </motion.div>
      ) : (
        <>
          {smallSkips.length > 0 && (
            <SkipSection 
              id="small"
              title="Small Skips (4-8 Yards)" 
              skips={smallSkips} 
              delay={0.1} 
            />
          )}
          
          {mediumSkips.length > 0 && (
            <SkipSection 
              id="medium"
              title="Medium Skips (10-16 Yards)" 
              skips={mediumSkips} 
              delay={0.2} 
            />
          )}
          
          {largeSkips.length > 0 && (
            <SkipSection 
              id="large"
              title="Large Skips (20+ Yards)" 
              skips={largeSkips} 
              delay={0.3} 
            />
          )}
        </>
      )}
    </div>
  )
}

