import { useCallback, useEffect, useState } from 'react'
import { questions } from '#/lib/quizQuestions.ts'
import { getScores, saveScore, calculateScore } from '#/lib/storage.ts'
import type { QuizScore } from '#/lib/storage.ts'
import { ProgressBar } from './ProgressBar'
import { Timer } from './Timer'
import { QuestionCard } from './QuestionCard'
import { ResultsScreen } from './ResultsScreen'
import { WelcomeScreen } from './WelcomeScreen'
import { Play } from 'lucide-react'

const TIMER_DURATION = 60

export function QuizGame() {
  const [gameState, setGameState] = useState<'welcome' | 'start' | 'playing' | 'completed'>('welcome')
  const [participantName, setParticipantName] = useState('')
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(
    new Array(questions.length).fill(null)
  )
  const [isAnswered, setIsAnswered] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  const [previousScores, setPreviousScores] = useState<QuizScore[]>([])
  const [startTime, setStartTime] = useState<number>(0)
  const [totalTimeSpent, setTotalTimeSpent] = useState<number>(0)

  useEffect(() => {
    const scores = getScores()
    setPreviousScores(scores)
  }, [])

  const currentQuestion = questions[currentQuestionIndex]
  const currentAnswer = selectedAnswers[currentQuestionIndex]

  const handleSelectAnswer = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers]
    newAnswers[currentQuestionIndex] = answerIndex
    setSelectedAnswers(newAnswers)
    setIsAnswered(true)
    setShowExplanation(true)
  }

  const handleTimeUp = useCallback(() => {
    if (!isAnswered) {
      setIsAnswered(true)
      setShowExplanation(false)
    }
  }, [isAnswered])

  const handleNext = () => {
    const timeSpentOnQuestion = Math.round((Date.now() - startTime) / 1000)
    const newTotalTime = totalTimeSpent + timeSpentOnQuestion

    if (currentQuestionIndex < questions.length - 1) {
      setTotalTimeSpent(newTotalTime)
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setIsAnswered(false)
      setShowExplanation(false)
      setStartTime(Date.now()) // Reinicia el cronómetro para la siguiente pregunta
    } else {
      // Quiz completado
      const correctAnswers = selectedAnswers.filter(
        (answer, index) => answer === questions[index].correctAnswer
      ).length
      
      const finalTimeSpent = newTotalTime
      const finalScore = calculateScore(correctAnswers, questions.length, finalTimeSpent)

      const score: QuizScore = {
        totalQuestions: questions.length,
        correctAnswers,
        timeSpent: finalTimeSpent,
        finalScore,
        completedAt: new Date().toISOString(),
      }

      saveScore(score)
      setPreviousScores([...previousScores, score])
      setGameState('completed')
    }
  }

  const handleRestart = () => {
    setGameState('welcome')
    setParticipantName('')
    setCurrentQuestionIndex(0)
    setSelectedAnswers(new Array(questions.length).fill(null))
    setIsAnswered(false)
    setShowExplanation(false)
    setTotalTimeSpent(0)
    setStartTime(0)
  }

  const handleWelcome = (name: string) => {
    setParticipantName(name)
    setGameState('start')
  }

  const handleStart = () => {
    setGameState('playing')
    setStartTime(Date.now())
  }

  if (gameState === 'welcome') {
    return <WelcomeScreen onStart={handleWelcome} />
  }

  if (gameState === 'start') {
    return (
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold text-gray-800">Hola, {participantName}! 👋</h1>
          <p className="text-xl text-gray-600">
            Aprende Listas, Diccionarios y Funciones en Python
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-6 bg-blue-50 rounded-lg text-center">
            <div className="text-3xl font-bold text-blue-600">10</div>
            <div className="text-sm text-gray-600 mt-2">Preguntas</div>
          </div>
          <div className="p-6 bg-green-50 rounded-lg text-center">
            <div className="text-3xl font-bold text-green-600">1m</div>
            <div className="text-sm text-gray-600 mt-2">Por pregunta</div>
          </div>
          <div className="p-6 bg-purple-50 rounded-lg text-center">
            <div className="text-3xl font-bold text-purple-600">3</div>
            <div className="text-sm text-gray-600 mt-2">Temas</div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Cómo funciona</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">1.</span>
              <span>Se te presentarán 10 preguntas sobre Python</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">2.</span>
              <span>Tendrás 1 minuto para responder cada pregunta</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">3.</span>
              <span>Verás la explicación de cada respuesta</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-blue-600 font-bold">4.</span>
              <span>Tu puntuación se guardará automáticamente</span>
            </li>
          </ul>
        </div>

        {previousScores.length > 0 && (
          <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="font-bold text-gray-800 mb-3">Tus Intentos Anteriores</h3>
            <div className="space-y-2">
              {previousScores.slice(-3).map((score, idx) => (
                <div key={idx} className="flex justify-between text-sm text-gray-600">
                  <span>Intento {previousScores.length - 2 + idx}:</span>
                  <span className="font-bold">
                    {Math.round((score.correctAnswers / score.totalQuestions) * 100)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={handleStart}
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-lg transition-colors flex items-center justify-center gap-2"
        >
          <Play className="w-6 h-6" />
          Comenzar Quiz
        </button>
      </div>
    )
  }

  if (gameState === 'completed') {
    const correctAnswers = selectedAnswers.filter(
      (answer, index) => answer === questions[index].correctAnswer
    ).length
    
    const finalTimeSpent = totalTimeSpent + Math.round((Date.now() - startTime) / 1000)
    const finalScore = calculateScore(correctAnswers, questions.length, finalTimeSpent)

    return (
      <div className="max-w-2xl mx-auto">
        <ResultsScreen
          score={correctAnswers}
          totalQuestions={questions.length}
          onRestart={handleRestart}
          previousScores={previousScores}
          finalScore={finalScore}
          timeSpent={finalTimeSpent}
        />
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <ProgressBar current={currentQuestionIndex} total={questions.length} />

      <Timer
        duration={TIMER_DURATION}
        onTimeUp={handleTimeUp}
        isActive={true}
        currentQuestion={currentQuestionIndex}
        totalQuestions={questions.length}
        totalTimeSpent={totalTimeSpent}
      />

      <QuestionCard
        question={currentQuestion}
        selectedAnswer={currentAnswer}
        onSelectAnswer={handleSelectAnswer}
        isAnswered={isAnswered}
        showExplanation={showExplanation}
      />

      {isAnswered && (
        <button
          onClick={handleNext}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
        >
          {currentQuestionIndex === questions.length - 1
            ? 'Ver Resultados'
            : 'Siguiente Pregunta'}
        </button>
      )}
    </div>
  )
}
