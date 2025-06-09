
import { useEffect, useState } from "react"
import { Check } from "lucide-react"
import { motion } from "framer-motion"
import type { Step } from "@/types/skip"

interface SmartProgressStepperProps {
  steps: Step[]
  className?: string
}

// Keep step names but make them adaptive to screen size and scroll state
export function SmartProgressStepper({ steps, className = "" }: SmartProgressStepperProps) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.div
      style={{
        scale: isScrolled ? 0.9 : 1,
        paddingTop: isScrolled ? "0.75rem" : "1.5rem",
        paddingBottom: isScrolled ? "0.75rem" : "1.5rem",
      }}
      className={`w-full overflow-x-auto transition-all duration-300 ${className}`}
    >
      <div className="flex items-center justify-center min-w-max px-4">
        {steps.map((step, index) => {
          const Icon = step.icon
          const isLast = index === steps.length - 1

          return (
            <div key={step.id} className="flex items-center">
              {/* Step Container */}
              <motion.div
                className="flex flex-col items-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                {/* Step Circle - Responsive sizing */}
                <motion.div
                  className={`
                    relative flex items-center justify-center rounded-full border transition-all duration-300
                    ${isScrolled ? "w-8 h-8" : "w-10 h-10"}
                    ${
                      step.completed
                        ? "bg-emerald-500 dark:bg-emerald-600 border-emerald-500 dark:border-emerald-600 text-white"
                        : step.active
                          ? "bg-blue-500 dark:bg-blue-600 border-blue-500 dark:border-blue-600 text-white"
                          : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500"
                    }
                  `}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {step.completed ? (
                    <Check className={isScrolled ? "w-4 h-4" : "w-5 h-5"} />
                  ) : (
                    <Icon className={isScrolled ? "w-4 h-4" : "w-5 h-5"} />
                  )}

                  {/* Active pulse effect */}
                  {step.active && !step.completed && (
                    <motion.div
                      className="absolute inset-0 rounded-full bg-blue-500 dark:bg-blue-600 opacity-20"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    />
                  )}
                </motion.div>

                {/* Smart Step Labels - Always visible but adaptive */}
                <motion.div
                  className={`text-center transition-all duration-300 ${isScrolled ? "mt-1" : "mt-2"}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 + 0.1 }}
                >
                  <p
                    className={`font-medium transition-colors duration-300 ${isScrolled ? "text-xs" : "text-sm"} ${
                      step.completed
                        ? "text-emerald-600 dark:text-emerald-400"
                        : step.active
                          ? "text-blue-600 dark:text-blue-400"
                          : "text-gray-400 dark:text-gray-500"
                    }`}
                  >
                    {/* Abbreviated labels on mobile when scrolled */}
                    <span className={`${isScrolled ? "hidden sm:inline" : ""}`}>{step.label}</span>
                    {isScrolled && (
                      <span className="sm:hidden">
                        {step.label.split(" ")[0]} {/* Show first word only on mobile when scrolled */}
                      </span>
                    )}
                  </p>
                  {!isScrolled && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Step {index + 1}</p>}
                </motion.div>
              </motion.div>

              {/* Connector Line */}
              {!isLast && (
                <motion.div
                  className={`flex items-center ${isScrolled ? "mx-2" : "mx-3 sm:mx-4"}`}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: index * 0.05 + 0.15 }}
                >
                  <div
                    className={`
                      h-0.5 transition-colors duration-500
                      ${isScrolled ? "w-4 sm:w-6" : "w-6 sm:w-8"}
                      ${step.completed ? "bg-emerald-300 dark:bg-emerald-500" : "bg-gray-200 dark:bg-gray-600"}
                    `}
                  />
                </motion.div>
              )}
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}
