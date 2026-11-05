export type Question = {
  id: number
  topic: 'listas' | 'diccionarios' | 'funciones'
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

export const questions: Question[] = [
  // Listas
  {
    id: 1,
    topic: 'listas',
    question: '¿Cuál es el resultado de: lista = [1, 2, 3]; lista[1]?',
    options: ['1', '2', '3', 'Error'],
    correctAnswer: 1,
    explanation: 'Las listas están indexadas desde 0, así que el índice 1 es el segundo elemento: 2',
  },
  {
    id: 2,
    topic: 'listas',
    question: '¿Cuál es la longitud de [10, 20, 30, 40]?',
    options: ['3', '4', '5', '0'],
    correctAnswer: 1,
    explanation: 'len([10, 20, 30, 40]) = 4 elementos',
  },
  {
    id: 3,
    topic: 'listas',
    question: '¿Qué devuelve lista.append(5) en: lista = [1, 2, 3]?',
    options: ['[1, 2, 3, 5]', 'None', '[5]', 'Error'],
    correctAnswer: 1,
    explanation: 'append() modifica la lista en lugar y devuelve None. La lista se convierte en [1, 2, 3, 5]',
  },
  // Diccionarios
  {
    id: 4,
    topic: 'diccionarios',
    question: '¿Cuál es el resultado de: dic = {"a": 1, "b": 2}; dic["a"]?',
    options: ['a', '1', '"a"', 'Error'],
    correctAnswer: 1,
    explanation: 'En un diccionario, dic["a"] devuelve el valor asociado a la clave "a", que es 1',
  },
  {
    id: 5,
    topic: 'diccionarios',
    question: '¿Cómo accedes a las claves de un diccionario?',
    options: ['.values()', '.keys()', '.items()', '.get()'],
    correctAnswer: 1,
    explanation: '.keys() devuelve todas las claves del diccionario',
  },
  {
    id: 6,
    topic: 'diccionarios',
    question: '¿Qué hace dic.get("clave", "default")?',
    options: ['Obtiene el valor o devuelve default si no existe', 'Siempre devuelve default', 'Genera un error', 'Agrega la clave'],
    correctAnswer: 0,
    explanation: 'get() devuelve el valor de la clave o el valor por defecto si la clave no existe',
  },
  // Funciones
  {
    id: 7,
    topic: 'funciones',
    question: '¿Cuál es el resultado de: def suma(a, b): return a + b; suma(3, 4)?',
    options: ['7', '12', 'Error', 'None'],
    correctAnswer: 0,
    explanation: 'La función suma devuelve 3 + 4 = 7',
  },
  {
    id: 8,
    topic: 'funciones',
    question: '¿Qué es un parámetro por defecto?',
    options: ['Un valor que se asigna cuando no se proporciona', 'Un error', 'Una función interna', 'Un tipo de lista'],
    correctAnswer: 0,
    explanation: 'def func(x=5): permite usar func() sin argumentos, usando x=5 por defecto',
  },
  {
    id: 9,
    topic: 'funciones',
    question: '¿Qué devuelve una función sin return explícito?',
    options: ['0', 'False', 'None', 'Error'],
    correctAnswer: 2,
    explanation: 'Las funciones sin return devuelven None por defecto',
  },
  {
    id: 10,
    topic: 'funciones',
    question: '¿Cuál es la diferencia entre return y print()?',
    options: ['No hay diferencia', 'return devuelve un valor, print() muestra en pantalla', 'print() es mejor', 'Son sinónimos'],
    correctAnswer: 1,
    explanation: 'return devuelve un valor para usar en el programa, print() solo muestra en pantalla',
  },
]
