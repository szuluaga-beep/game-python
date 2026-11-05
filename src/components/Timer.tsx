import { useEffect, useState } from 'react'
import { Clock } from 'lucide-react'

interface TimerProps {
  duration: number
  onTimeUp: () => void
  isActive: boolean
  currentQuestion: number
  totalQuestions: number
  totalTimeSpent: number
}

export function Timer({ duration, onTimeUp, isActive, currentQuestion, totalQuestions, totalTimeSpent }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration)

  // Reinicia el cronómetro cuando cambia de pregunta
  useEffect(() => {
    setTimeLeft(duration)
  }, [currentQuestion, duration])

  useEffect(() => {
    if (!isActive) {
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
  const isLow = timeLeft <= 10
  const totalMinutes = Math.floor(totalTimeSpent / 60)
  const totalSeconds = totalTimeSpent % 60

  return (
    <div className="space-y-4">
      {/* Cronómetro por pregunta */}
      <div className="flex flex-col items-center gap-2 p-4 bg-blue-50 rounded-lg">
        <div className="text-sm text-gray-600 font-medium">Tiempo para esta pregunta</div>
        <div className="flex items-center gap-2">
          <Clock className={`w-6 h-6 ${isLow ? 'text-red-500' : 'text-blue-500'}`} />
          <span className={`text-3xl font-bold ${isLow ? 'text-red-500' : 'text-blue-600'}`}>
            {timeLeft}s
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className={`h-3 rounded-full transition-all duration-300 ${
              isLow ? 'bg-red-500' : 'bg-blue-500'
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Información de progreso */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-3 bg-purple-50 rounded-lg text-center">
          <div className="text-xs text-gray-600">Pregunta</div>
          <div className="text-xl font-bold text-purple-600">{currentQuestion + 1}/{totalQuestions}</div>
        </div>
        <div className="p-3 bg-green-50 rounded-lg text-center">
          <div className="text-xs text-gray-600">Tiempo Total</div>
          <div className="text-xl font-bold text-green-600">
            {totalMinutes}:{totalSeconds.toString().padStart(2, '0')}
          </div>
        </div>
      </div>
    </div>
  )
}
