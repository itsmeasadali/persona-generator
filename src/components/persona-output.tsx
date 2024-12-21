"use client"

import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface PersonaOutputProps {
  persona: {
    name: string
    avatar: string
    ageRange: string
    occupation: string
    goals: string[]
    traits: string[]
    challenges: string[]
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
  }
}

export function PersonaOutput({ persona }: PersonaOutputProps) {
  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Generated Persona</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative w-48 h-48 rounded-full overflow-hidden">
              <Image
                src={persona.avatar}
                alt={persona.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            </div>
            <h2 className="text-2xl font-bold">{persona.name}</h2>
            <p className="text-muted-foreground">{persona.occupation}</p>
            <p className="text-sm">{persona.location}</p>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Demographics</h3>
              <div className="space-y-1">
                <p>Age Range: {persona.ageRange}</p>
                <p>Education: {persona.education}</p>
                <p>Experience: {persona.experience}</p>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Goals</h3>
              <div className="flex flex-wrap gap-2">
                {persona.goals.map((goal) => (
                  <Badge key={goal} variant="secondary">
                    {goal}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {persona.skills.map((skill) => (
                  <Badge key={skill} variant="outline">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Interests</h3>
              <div className="flex flex-wrap gap-2">
                {persona.interests.map((interest) => (
                  <Badge key={interest} variant="outline">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Tech Comfort Level</h3>
              <div className="w-full bg-secondary rounded-full h-2.5">
                <div
                  className="bg-primary h-2.5 rounded-full"
                  style={{ width: `${(persona.techComfort / 10) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-xs mt-1">
                <span>Beginner</span>
                <span>Expert</span>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Preferred Platforms</h3>
              <div className="flex flex-wrap gap-2">
                {persona.preferredPlatforms.map((platform) => (
                  <Badge key={platform} variant="secondary">
                    {platform}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Communication Style</h3>
              <p>{persona.communicationStyle}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Budget Range</h3>
              <p>{persona.budget}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}