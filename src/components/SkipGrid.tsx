
import { motion } from "framer-motion"
import { SkipCard } from "./ui/SkipCard"
import type { Skip } from "@/types/skip"

interface SkipGridProps {
  skips: Skip[]
  selectedSkipId: number | null
  onSkipSelect: (skipId: number) => void
  className?: string
}

export function SkipGrid({ skips, selectedSkipId, onSkipSelect, className = "" }: SkipGridProps) {
  // Group skips by size for better organization
  const smallSkips = skips.filter((skip) => skip.size <= 8)
  const mediumSkips = skips.filter((skip) => skip.size > 8 && skip.size <= 16)
  const largeSkips = skips.filter((skip) => skip.size > 16)

  const SkipSection = ({ title, skips: sectionSkips, delay = 0 }: { title: string; skips: Skip[]; delay?: number }) => (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }} className="mb-12">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{title}</h3>
        <div className="w-16 h-1 bg-blue-500 dark:bg-blue-400 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {sectionSkips.map((skip, index) => (
          <motion.div
            key={skip.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + index * 0.1 }}
          >
            <SkipCard skip={skip} isSelected={selectedSkipId === skip.id} onSelect={onSkipSelect} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  )

  return (
    <div className={`${className} ${selectedSkipId ? "pb-24" : ""}`}>
      {smallSkips.length > 0 && <SkipSection title="Small Skips (4-8 Yards)" skips={smallSkips} delay={0.1} />}
      {mediumSkips.length > 0 && <SkipSection title="Medium Skips (10-16 Yards)" skips={mediumSkips} delay={0.2} />}
      {largeSkips.length > 0 && <SkipSection title="Large Skips (20+ Yards)" skips={largeSkips} delay={0.3} />}
    </div>
  )
}

