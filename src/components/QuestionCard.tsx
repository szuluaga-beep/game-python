import { CheckCircle, XCircle } from 'lucide-react'

export type Question = {
  id: number
  topic: 'listas' | 'diccionarios' | 'funciones'
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

interface QuestionCardProps {
  question: Question
  selectedAnswer: number | null
  onSelectAnswer: (index: number) => void
  isAnswered: boolean
  showExplanation: boolean
}

export function QuestionCard({
  question,
  selectedAnswer,
  onSelectAnswer,
  isAnswered,
  showExplanation,
}: QuestionCardProps) {
  return (
    <div className="space-y-6">
      <div>
        <div className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-4">
          {question.topic.charAt(0).toUpperCase() + question.topic.slice(1)}
        </div>
        <h2 className="text-2xl font-bold text-gray-800">{question.question}</h2>
      </div>

      <div className="space-y-3">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === index
          const isCorrect = index === question.correctAnswer
          const showCorrect = isAnswered && isCorrect
          const showIncorrect = isAnswered && isSelected && !isCorrect

          return (
            <button
              key={index}
              onClick={() => !isAnswered && onSelectAnswer(index)}
              disabled={isAnswered}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                isSelected
                  ? showCorrect
                    ? 'border-green-500 bg-green-50'
                    : showIncorrect
                      ? 'border-red-500 bg-red-50'
                      : 'border-blue-500 bg-blue-50'
                  : showCorrect
                    ? 'border-green-500 bg-green-50'
                    : 'border-gray-200 hover:border-gray-300'
              } ${!isAnswered ? 'cursor-pointer' : 'cursor-default'}`}
            >
              <div className="flex items-center justify-between">
                <span className={`font-medium ${isSelected || isCorrect ? 'text-gray-800' : 'text-gray-600'}`}>
                  {option}
                </span>
                {showCorrect && <CheckCircle className="w-5 h-5 text-green-500" />}
                {showIncorrect && <XCircle className="w-5 h-5 text-red-500" />}
              </div>
            </button>
          )
        })}
      </div>

      {showExplanation && (
        <div className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
          <p className="text-sm text-gray-700">
            <strong>Explicación:</strong> {question.explanation}
          </p>
        </div>
      )}
    </div>
  )
}
