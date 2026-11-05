import { useState } from 'react'
import { Play, User } from 'lucide-react'

interface WelcomeScreenProps {
  onStart: (name: string) => void
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  const [participantName, setParticipantName] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const trimmedName = participantName.trim()
    
    if (!trimmedName) {
      setError('Por favor ingresa tu nombre')
      return
    }
    
    if (trimmedName.length < 2) {
      setError('El nombre debe tener al menos 2 caracteres')
      return
    }

    setError('')
    onStart(trimmedName)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4 flex items-center justify-center">
      <div className="max-w-md w-full">
        <div className="space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="text-5xl font-bold text-gray-800">🐍 Python Quiz</div>
            <p className="text-xl text-gray-600">
              Aprende Listas, Diccionarios y Funciones
            </p>
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-3">
                ¿Cuál es tu nombre?
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  id="name"
                  type="text"
                  value={participantName}
                  onChange={(e) => {
                    setParticipantName(e.target.value)
                    setError('')
                  }}
                  placeholder="Ingresa tu nombre aquí"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  autoFocus
                />
              </div>
              {error && (
                <p className="text-red-500 text-sm mt-2">⚠️ {error}</p>
              )}
            </div>

            {/* Información del Quiz */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">10</div>
                <div className="text-xs text-gray-600">Preguntas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">10m</div>
                <div className="text-xs text-gray-600">Duración</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">3</div>
                <div className="text-xs text-gray-600">Temas</div>
              </div>
            </div>

            {/* Botón */}
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 mt-6"
            >
              <Play className="w-5 h-5" />
              Comenzar Quiz
            </button>
          </form>

          {/* Información adicional */}
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h3 className="font-bold text-gray-800 mb-2">Cómo funciona:</h3>
            <ul className="space-y-1 text-sm text-gray-700">
              <li>✅ 1 minuto por pregunta</li>
              <li>✅ Bonificación por velocidad</li>
              <li>✅ Puntuación máxima: 110</li>
              <li>✅ Tu progreso se guarda</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
