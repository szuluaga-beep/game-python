export type QuizScore = {
  participantName: string
  totalQuestions: number
  correctAnswers: number
  timeSpent: number
  completedAt: string
  finalScore: number // Puntuación con bonificación por velocidad
}

// Calcular puntuación con bonificación por velocidad
export function calculateScore(correctAnswers: number, totalQuestions: number, timeSpent: number): number {
  const baseScore = (correctAnswers / totalQuestions) * 100
  const maxTimePerQuestion = 60
  const maxTotalTime = maxTimePerQuestion * totalQuestions // 600 segundos para 10 preguntas
  
  // Bonificación por velocidad: hasta 10 puntos extra
  const speedBonus = Math.max(0, 10 * (1 - timeSpent / maxTotalTime))
  
  // Puntuación final (máximo 110 puntos: 100 por respuestas + 10 por velocidad)
  const finalScore = Math.round(baseScore + speedBonus)
  
  return Math.min(finalScore, 110)
}

const STORAGE_KEY = 'pythonQuizScores'

export function getScores(): QuizScore[] {
  if (typeof window === 'undefined') return []
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export function saveScore(score: QuizScore): void {
  if (typeof window === 'undefined') return
  try {
    const scores = getScores()
    scores.push(score)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(scores))
  } catch (error) {
    console.error('Error saving score:', error)
  }
}

export function clearScores(): void {
  if (typeof window === 'undefined') return
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.error('Error clearing scores:', error)
  }
}

export function getAverageScore(): number {
  const scores = getScores()
  if (scores.length === 0) return 0
  const total = scores.reduce((sum, score) => sum + score.correctAnswers, 0)
  return Math.round((total / (scores.length * 10)) * 100)
}
