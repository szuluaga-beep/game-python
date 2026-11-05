import { useEffect, useState } from 'react'
import { Clock } from 'lucide-react'

interface TimerProps {
  duration: number
  onTimeUp: () => void
  isActive: boolean
}

export function Timer({ duration, onTimeUp, isActive }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration)

  useEffect(() => {
    if (!isActive) {
      setTimeLeft(duration)
      return
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval)
          onTimeUp()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [isActive, duration, onTimeUp])

  const percentage = (timeLeft / duration) * 100
  const isLow = timeLeft <= 5

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-2">
        <Clock className={`w-6 h-6 ${isLow ? 'text-red-500' : 'text-blue-500'}`} />
        <span className={`text-2xl font-bold ${isLow ? 'text-red-500' : 'text-gray-700'}`}>
          {timeLeft}s
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${
            isLow ? 'bg-red-500' : 'bg-blue-500'
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
