import type { QuizScore } from '#/lib/storage.ts'
import { BarChart3, RotateCcw, Trophy } from 'lucide-react'

interface ResultsScreenProps {
  score: number
  totalQuestions: number
  onRestart: () => void
  previousScores: QuizScore[]
  finalScore: number
  timeSpent: number
}

export function ResultsScreen({
  score,
  totalQuestions,
  onRestart,
  previousScores,
  finalScore,
  timeSpent,
}: ResultsScreenProps) {
  const percentage = Math.round((score / totalQuestions) * 100)
  const maxScore = previousScores.length > 0
    ? Math.max(...previousScores.map(s => s.finalScore), finalScore)
    : finalScore

  const getPerformanceMessage = (finalScore: number) => {
    if (finalScore >= 100) return '¡Perfecto! 🌟'
    if (finalScore >= 90) return '¡Excelente! 🎉'
    if (finalScore >= 80) return '¡Muy Bien! 👍'
    if (finalScore >= 70) return '¡Buen intento! 💪'
    if (finalScore >= 60) return 'Sigue practicando 📚'
    return 'Keep Learning! 🚀'
  }

  const speedBonus = finalScore - percentage

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <Trophy className="w-16 h-16 mx-auto text-yellow-500" />
        <h1 className="text-4xl font-bold text-gray-800">¡Quiz Completado!</h1>
        <p className="text-xl text-gray-600">{getPerformanceMessage(finalScore)}</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="p-6 bg-blue-50 rounded-lg text-center">
          <div className="text-4xl font-bold text-blue-600">{percentage}%</div>
          <div className="text-xs text-gray-600 mt-2">Base</div>
        </div>
        <div className="p-6 bg-green-50 rounded-lg text-center">
          <div className="text-4xl font-bold text-green-600">{score}/{totalQuestions}</div>
          <div className="text-xs text-gray-600 mt-2">Correctas</div>
        </div>
        <div className="p-6 bg-purple-50 rounded-lg text-center">
          <div className="text-4xl font-bold text-purple-600">+{Math.round(speedBonus)}</div>
          <div className="text-xs text-gray-600 mt-2">Bonificación</div>
        </div>
      </div>

      <div className="p-6 bg-yellow-50 border-2 border-yellow-400 rounded-lg text-center">
        <div className="text-sm text-gray-600 mb-2">Puntuación Final</div>
        <div className="text-5xl font-bold text-yellow-600">{finalScore}/110</div>
        <div className="text-xs text-gray-600 mt-3">
          ⏱️ Tiempo: {timeSpent}s
        </div>
      </div>

      {previousScores.length > 0 && (
        <div className="p-6 bg-indigo-50 rounded-lg">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-indigo-600" />
            <h3 className="font-bold text-gray-800">Tus Intentos Anteriores</h3>
          </div>
          <div className="space-y-2">
            {previousScores.map((score, idx) => {
              const scorePercentage = Math.round((score.correctAnswers / score.totalQuestions) * 100)
              return (
                <div key={idx} className="flex justify-between items-center p-3 bg-white rounded border border-indigo-200">
                  <span className="text-gray-700 font-medium">Intento {idx + 1}:</span>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600">{scorePercentage}%</span>
                    <span className="font-bold text-indigo-600">{score.finalScore}/110</span>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="mt-4 pt-4 border-t border-indigo-200 flex justify-between">
            <span className="text-gray-700 font-medium">Mejor Puntuación:</span>
            <span className="font-bold text-indigo-600">{maxScore}/110</span>
          </div>
        </div>
      )}

      <button
        onClick={onRestart}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        <RotateCcw className="w-5 h-5" />
        Intentar de Nuevo
      </button>
    </div>
  )
}
