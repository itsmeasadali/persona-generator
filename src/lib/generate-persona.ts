import { personaData } from "@/lib/persona-data"

interface FormData {
  ageRange: string
  occupation: string
  goals: string[]
}

// Simple seeded random number generator
function seededRandom(seed: number) {
  const x = Math.sin(seed++) * 10000
  return x - Math.floor(x)
}

export function generatePersona(formData: FormData) {
  const { ageRange, occupation, goals } = formData
  const seed = Date.now()

  // Use seeded random for consistent results
  const gender = seededRandom(seed) < 0.5 ? 'male' : 'female'
  const nameIndex = Math.floor(seededRandom(seed + 1) * personaData.names[gender].length)
  const name = personaData.names[gender][nameIndex]
  
  const avatarIndex = gender === 'male' ? 0 : 1
  const avatar = personaData.avatars[occupation][avatarIndex]

  // Get random traits and challenges using seeded random
  const traits = getRandomElements(personaData.traits[occupation], 3, seed + 2)
  const challenges = getRandomElements(personaData.challenges[occupation], 2, seed + 3)

  return {
    name,
    avatar,
    ageRange,
    occupation: capitalizeFirst(occupation),
    goals: goals.map(formatGoal),
    traits,
    challenges
  }
}

function getRandomElements<T>(array: T[], count: number, seed: number): T[] {
  return [...array]
    .map(item => ({ item, sort: seededRandom(seed++) }))
    .sort((a, b) => a.sort - b.sort)
    .slice(0, count)
    .map(({ item }) => item)
}

function capitalizeFirst(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

function formatGoal(goal: string): string {
  return goal.split(/(?=[A-Z])/).join(' ')
} 