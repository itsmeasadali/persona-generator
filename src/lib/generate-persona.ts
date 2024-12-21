import { personaData, Occupation, PersonaDataType } from './persona-data'

type Gender = 'male' | 'female'

type FormDataKeys = readonly ['avatars', 'traits', 'challenges']

type FormData = Partial<Pick<PersonaDataType, FormDataKeys[number]>> & {
  ageRange: string
  occupation: Occupation
  goals: string[]
  education: string
  experience: string
  location: string
  skills: string[]
  interests: string[]
  painPoints: string[]
  techComfort: number
  budget: string
  preferredPlatforms: string[]
  communicationStyle: string
  decisionMakingFactors: string[]
}

interface GeneratedPersona extends Omit<FormData, 'traits' | 'challenges' | 'avatars'> {
  name: string
  avatar: string
  traits: string[]
  challenges: string[]
}

function getRandomElements<T>(arr: readonly T[], count: number): T[] {
  const shuffled = [...arr].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

function getRandomName(gender: Gender): string {
  const names = gender === 'male' ? personaData.maleNames : personaData.femaleNames
  return names[Math.floor(Math.random() * names.length)]
}

export function generatePersona(formData: FormData): GeneratedPersona {
  const defaultPersonaData = {
    avatars: personaData.avatars,
    traits: personaData.traits,
    challenges: personaData.challenges,
  }

  const mergedData = { ...defaultPersonaData, ...formData }

  const gender: Gender = Math.random() < 0.5 ? 'male' : 'female'
  const name = getRandomName(gender)

  const avatarIndex = gender === 'male' ? 0 : 1
  const avatar = mergedData.avatars[mergedData.occupation][avatarIndex]

  const traits = getRandomElements(mergedData.traits[mergedData.occupation], 3)
  const challenges = getRandomElements(mergedData.challenges[mergedData.occupation], 3)

  return {
    name,
    avatar,
    ageRange: mergedData.ageRange,
    occupation: mergedData.occupation,
    goals: mergedData.goals,
    traits: traits as string[],
    challenges: challenges as string[],
    education: mergedData.education,
    experience: mergedData.experience,
    location: mergedData.location,
    skills: mergedData.skills,
    interests: mergedData.interests,
    painPoints: mergedData.painPoints,
    techComfort: mergedData.techComfort,
    budget: mergedData.budget,
    preferredPlatforms: mergedData.preferredPlatforms,
    communicationStyle: mergedData.communicationStyle,
    decisionMakingFactors: mergedData.decisionMakingFactors
  }
} 