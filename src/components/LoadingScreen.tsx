import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePortfolio } from '@/contexts/PortfolioContext'

export function LoadingScreen() {
  const { isLoading, setIsLoading } = usePortfolio()

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2200)
    return () => clearTimeout(timer)
  }, [setIsLoading])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0a0a0f]"
        >
          <div className="flex flex-col items-center gap-8">
            <motion.div
              className="relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-primary via-accent-cyan to-accent-purple p-[2px]">
                <div className="flex h-full w-full items-center justify-center rounded-2xl bg-[#0a0a0f]">
                  <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent-cyan bg-clip-text text-transparent">
                    EJ
                  </span>
                </div>
              </div>
              <motion.div
                className="absolute -inset-4 rounded-3xl border border-primary/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <p className="text-white/80 text-lg font-medium tracking-wide">Elaine Jose</p>
              <p className="text-white/40 text-sm mt-1">Loading portfolio...</p>
            </motion.div>

            <motion.div
              className="w-48 h-1 rounded-full bg-white/10 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-accent-cyan rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2, ease: 'easeInOut' }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
