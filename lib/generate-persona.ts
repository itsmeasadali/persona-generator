import { personaData } from "./persona-data"

interface FormData {
  ageRange: string
  occupation: string
  goals: string[]
}

// Define the valid occupation types
type Occupation = 'technology' | 'healthcare' | 'education' | 'finance' | 'creative';

export function generatePersona(formData: FormData) {
  const { ageRange, occupation, goals } = formData

  // Randomly select gender and name
  const gender = Math.random() < 0.5 ? 'male' : 'female'
  const name = personaData.names[gender][Math.floor(Math.random() * personaData.names[gender].length)]
  
  // Get random avatar based on occupation and gender
  const avatarIndex = gender === 'male' ? 0 : 1
  const avatar = personaData.avatars[occupation as Occupation][avatarIndex]

  // Get random traits and challenges
  const traits = getRandomElements(personaData.traits[occupation as Occupation], 3)
  const challenges = getRandomElements(personaData.challenges[occupation as Occupation], 2)

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

function getRandomElements<T>(array: T[], count: number): T[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

function capitalizeFirst(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

function formatGoal(goal: string): string {
  return goal.split(/(?=[A-Z])/).join(' ')
} 