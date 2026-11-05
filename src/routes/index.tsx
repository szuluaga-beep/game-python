import { createFileRoute } from '@tanstack/react-router'
import { QuizGame } from '#/components/QuizGame'

export const Route = createFileRoute('/')({ component: Home })

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <QuizGame />
    </div>
  )
}
