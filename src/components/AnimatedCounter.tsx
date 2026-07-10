import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'

interface AnimatedCounterProps {
  value: number
  suffix?: string
  decimals?: number
  className?: string
}

export function AnimatedCounter({
  value,
  suffix = '',
  decimals = 0,
  className,
}: AnimatedCounterProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 })

  return (
    <span ref={ref} className={className}>
      {inView ? (
        <CountUp end={value} duration={2.5} decimals={decimals} suffix={suffix} />
      ) : (
        `0${suffix}`
      )}
    </span>
  )
}
