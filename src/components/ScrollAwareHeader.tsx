
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { MapPin } from "lucide-react"
import { ProgressStepper } from "./ui/ProgressStepper"
import { ThemeToggle } from "./ui/ThemeToggle"
import type { Step } from "../types/skip"

interface ScrollAwareHeaderProps {
  title: string
  subtitle: string
  location?: string
  steps: Step[]
}

export function ScrollAwareHeader({ title, subtitle, location, steps }: ScrollAwareHeaderProps) {
  const [isCompact, setIsCompact] = useState(false)
  const [shouldStick, setShouldStick] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsCompact(scrollY > 60)
      setShouldStick(scrollY > 140)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Main Header */}
      <motion.div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <motion.div
          style={{
            paddingTop: isCompact ? "0.75rem" : "2.5rem",
            paddingBottom: isCompact ? "0.75rem" : "2.5rem",
          }}
          className="max-w-7xl mx-auto px-4 transition-all duration-300"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1 text-center">
              <motion.h1
                style={{ fontSize: isCompact ? "1.125rem" : "2.5rem" }}
                className="font-bold text-gray-900 dark:text-white leading-tight mb-1 transition-all duration-300"
              >
                {title}
              </motion.h1>

              <motion.div
                style={{
                  height: isCompact ? "0px" : "auto",
                  opacity: isCompact ? 0 : 1,
                }}
                className="overflow-hidden transition-all duration-300"
              >
                <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed mb-3">
                  {subtitle}
                </p>
              </motion.div>

              {location && (
                <motion.div
                  style={{ opacity: isCompact ? 0 : 1 }}
                  className="inline-flex items-center gap-2 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1.5 rounded-full font-medium text-sm transition-all duration-300"
                >
                  <MapPin className="w-3 h-3" />
                  <span>{location}</span>
                </motion.div>
              )}
            </div>

            <div className="ml-4">
              <ThemeToggle />
            </div>
          </div>
        </motion.div>

        {!shouldStick && (
          <div className="border-t border-gray-100 dark:border-gray-800">
            <div className="max-w-7xl mx-auto px-4">
              <ProgressStepper steps={steps} />
            </div>
          </div>
        )}
      </motion.div>

      {/* Sticky Stepper */}
      {shouldStick && (
        <motion.div
          className="fixed top-0 left-0 right-0 z-30 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-md border-b-2 border-blue-100 dark:border-blue-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="max-w-7xl mx-auto px-4">
            <ProgressStepper steps={steps} />
          </div>
        </motion.div>
      )}
    </>
  )
}
