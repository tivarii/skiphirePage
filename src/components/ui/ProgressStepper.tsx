import { useEffect, useState } from "react"
import { Check } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import type { Step } from "@/types/skip"
import { cn } from "@/lib/utils"

interface ProgressStepperProps {
  steps: Step[]
  className?: string
}

export function ProgressStepper({ steps, className = "" }: ProgressStepperProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [hoveredStep, setHoveredStep] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Find the last completed step index
  const lastCompletedIndex = steps.reduce(
    (lastIdx, step, idx) => (step.completed ? idx : lastIdx),
    -1
  )

  return (
    <div 
      className={cn(
        "w-full relative transition-all duration-300 overflow-hidden",
        isScrolled ? "py-3" : "py-6",
        className
      )}
    >
      {/* Background Progress Bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gray-100 dark:bg-gray-800">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-500"
          initial={{ width: "0%" }}
          animate={{ 
            width: `${(lastCompletedIndex + 1) * (100 / steps.length)}%` 
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-4">
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isActive = step.active
            const isCompleted = step.completed
            const isHovered = hoveredStep === step.id
            
            // Either use stepStatus in your component or remove it if not needed
            // Since you're not using this variable, let's remove it
            
            return (
              <div 
                key={step.id}
                className={cn(
                  "relative flex flex-col items-center",
                  isScrolled ? "px-1 sm:px-2" : "px-2 sm:px-4"
                )}
                onMouseEnter={() => setHoveredStep(step.id)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                {/* Step Number Label (above icon) */}
                <AnimatePresence>
                  {!isScrolled && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={cn(
                        "absolute -top-7 text-xs font-medium px-2 py-0.5 rounded-full",
                        isCompleted 
                          ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400" 
                          : isActive
                            ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-400"
                            : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
                      )}
                    >
                      Step {index + 1}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Step Circle */}
                <div className="relative">
                  <motion.div
                    className={cn(
                      "flex items-center justify-center rounded-full transition-all cursor-pointer",
                      isScrolled ? "size-9" : "size-12",
                      isCompleted 
                        ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 shadow-sm"
                        : isActive
                          ? "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 shadow-md"
                          : "bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500"
                    )}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ 
                      scale: (isHovered || isActive) ? 1.1 : 1, 
                      opacity: 1 
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {isCompleted ? (
                      <Check className={isScrolled ? "size-4" : "size-5"} />
                    ) : (
                      <Icon className={isScrolled ? "size-4" : "size-5"} />
                    )}
                    
                    {/* Active step pulse animation */}
                    {isActive && !isCompleted && (
                      <motion.div
                        className="absolute inset-0 rounded-full bg-blue-400/20 dark:bg-blue-500/20"
                        animate={{ scale: [1, 1.15, 1] }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity,
                          repeatType: "loop" 
                        }}
                      />
                    )}
                  </motion.div>
                  
                  {/* Connection line to next step */}
                  {index < steps.length - 1 && (
                    <div className="absolute top-1/2 left-full h-[2px] transform -translate-y-1/2">
                      <div className={cn(
                        "h-full bg-gray-200 dark:bg-gray-700",
                        isScrolled ? "w-8 sm:w-16" : "w-12 sm:w-24 md:w-32"
                      )}>
                        {isCompleted && (
                          <motion.div
                            className="h-full bg-green-400 dark:bg-green-500"
                            initial={{ width: 0 }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                          />
                        )}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Step Label */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${step.id}-${isScrolled ? 'small' : 'large'}`}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.3 }}
                    className={cn(
                      "text-center mt-2 transition-all",
                      isScrolled ? "max-w-[60px] sm:max-w-none" : ""
                    )}
                  >
                    <p className={cn(
                      "font-medium transition-all whitespace-nowrap",
                      isScrolled ? "text-xs" : "text-sm",
                      isCompleted 
                        ? "text-green-600 dark:text-green-400" 
                        : isActive 
                          ? "text-blue-600 dark:text-blue-400" 
                          : "text-gray-500 dark:text-gray-400"
                    )}>
                      {isScrolled ? (
                        <span className="hidden sm:inline">{step.label}</span>
                      ) : (
                        <span>{step.label}</span>
                      )}
                      {isScrolled && <span className="sm:hidden">{step.label.charAt(0)}</span>}
                    </p>
                  </motion.div>
                </AnimatePresence>
                
                {/* Hover Tooltip */}
                <AnimatePresence>
                  {isHovered && !isScrolled && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className={cn(
                        "absolute top-full mt-2 px-3 py-1.5 rounded-md text-xs shadow-lg z-10 text-center whitespace-nowrap",
                        isCompleted 
                          ? "bg-green-50 text-green-700 border border-green-200 dark:bg-green-900/60 dark:text-green-200 dark:border-green-800" 
                          : isActive 
                            ? "bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-900/60 dark:text-blue-200 dark:border-blue-800" 
                            : "bg-gray-50 text-gray-700 border border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"
                      )}
                    >
                      {isCompleted 
                        ? "Completed" 
                        : isActive 
                          ? "Current Step" 
                          : "Upcoming"}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
