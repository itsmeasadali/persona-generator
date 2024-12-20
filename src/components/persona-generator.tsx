"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState, useEffect } from "react"
import { PersonaOutput } from "@/components/persona-output"
import { MultiSelect } from "@/components/multi-select"
import { generatePersona } from "@/lib/generate-persona"
import { useToast } from "@/components/ui/use-toast"
import { motion, AnimatePresence } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"

interface Persona {
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
  decisionMakingFactors: string[]
}

export function PersonaGenerator() {
  const [mounted, setMounted] = useState(false)
  const [formData, setFormData] = useState({
    ageRange: "",
    occupation: "",
    goals: [] as string[],
    education: "",
    experience: "",
    location: "",
    skills: [] as string[],
    interests: [] as string[],
    painPoints: [] as string[],
    techComfort: 5,
    budget: "",
    preferredPlatforms: [] as string[],
    communicationStyle: "",
    decisionMakingFactors: [] as string[]
  })
  const [persona, setPersona] = useState<Persona | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [savedPersonas, setSavedPersonas] = useState<Persona[]>([])
  const { toast } = useToast()

  useEffect(() => {
    setMounted(true)
    // Load saved personas from localStorage
    const saved = localStorage.getItem('savedPersonas')
    if (saved) {
      setSavedPersonas(JSON.parse(saved))
    }
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.ageRange || !formData.occupation) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields before generating a persona.",
        variant: "destructive"
      })
      return
    }

    setIsLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      const newPersona = generatePersona(formData)
      setPersona(newPersona)
      toast({
        title: "Success!",
        description: "Your persona has been generated.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate persona. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  const savePersona = () => {
    if (persona) {
      const updatedPersonas = [...savedPersonas, persona]
      setSavedPersonas(updatedPersonas)
      localStorage.setItem('savedPersonas', JSON.stringify(updatedPersonas))
      toast({
        title: "Persona Saved",
        description: "The persona has been saved to your collection.",
      })
    }
  }

  const exportAsJSON = () => {
    if (persona) {
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(persona, null, 2))
      const downloadAnchorNode = document.createElement('a')
      downloadAnchorNode.setAttribute("href", dataStr)
      downloadAnchorNode.setAttribute("download", `persona_${persona.name.toLowerCase().replace(/\s+/g, '_')}.json`)
      document.body.appendChild(downloadAnchorNode)
      downloadAnchorNode.click()
      downloadAnchorNode.remove()
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <motion.main 
      className="container mx-auto py-10 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h1 className="text-4xl font-bold text-center mb-8">User Persona Generator</h1>
      
      <Tabs defaultValue="generator" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="generator">Generator</TabsTrigger>
          <TabsTrigger value="saved">Saved Personas</TabsTrigger>
          <TabsTrigger value="advanced">Advanced Options</TabsTrigger>
        </TabsList>

        <TabsContent value="generator">
          <Card>
            <CardHeader>
              <CardTitle>Define Your Persona</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="ageRange">Age Range*</Label>
                    <Select 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, ageRange: value }))}
                    >
                      <SelectTrigger id="ageRange">
                        <SelectValue placeholder="Select age range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="18-24">18-24</SelectItem>
                        <SelectItem value="25-34">25-34</SelectItem>
                        <SelectItem value="35-44">35-44</SelectItem>
                        <SelectItem value="45-54">45-54</SelectItem>
                        <SelectItem value="55+">55+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="occupation">Occupation Field*</Label>
                    <Select
                      onValueChange={(value) => setFormData(prev => ({ ...prev, occupation: value }))}
                    >
                      <SelectTrigger id="occupation">
                        <SelectValue placeholder="Select occupation" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technology">Technology</SelectItem>
                        <SelectItem value="healthcare">Healthcare</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="finance">Finance</SelectItem>
                        <SelectItem value="creative">Creative</SelectItem>
                        <SelectItem value="retail">Retail</SelectItem>
                        <SelectItem value="manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="consulting">Consulting</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="education">Education Level</Label>
                    <Select
                      onValueChange={(value) => setFormData(prev => ({ ...prev, education: value }))}
                    >
                      <SelectTrigger id="education">
                        <SelectValue placeholder="Select education" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high_school">High School</SelectItem>
                        <SelectItem value="bachelors">Bachelor's Degree</SelectItem>
                        <SelectItem value="masters">Master's Degree</SelectItem>
                        <SelectItem value="phd">Ph.D.</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Select
                      onValueChange={(value) => setFormData(prev => ({ ...prev, experience: value }))}
                    >
                      <SelectTrigger id="experience">
                        <SelectValue placeholder="Select experience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="entry">Entry Level (0-2 years)</SelectItem>
                        <SelectItem value="junior">Junior (2-5 years)</SelectItem>
                        <SelectItem value="mid">Mid-Level (5-10 years)</SelectItem>
                        <SelectItem value="senior">Senior (10+ years)</SelectItem>
                        <SelectItem value="expert">Expert (15+ years)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="City, Country"
                      value={formData.location}
                      onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget Range</Label>
                    <Select
                      onValueChange={(value) => setFormData(prev => ({ ...prev, budget: value }))}
                    >
                      <SelectTrigger id="budget">
                        <SelectValue placeholder="Select budget range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low Budget</SelectItem>
                        <SelectItem value="medium">Medium Budget</SelectItem>
                        <SelectItem value="high">High Budget</SelectItem>
                        <SelectItem value="enterprise">Enterprise Budget</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Primary Goals</Label>
                    <MultiSelect
                      options={[
                        { value: "productivity", label: "Increase Productivity" },
                        { value: "learning", label: "Continuous Learning" },
                        { value: "worklife", label: "Work-Life Balance" },
                        { value: "career", label: "Career Growth" },
                        { value: "networking", label: "Professional Networking" },
                        { value: "innovation", label: "Drive Innovation" },
                        { value: "leadership", label: "Develop Leadership" },
                        { value: "efficiency", label: "Improve Efficiency" }
                      ]}
                      selected={formData.goals}
                      onChange={(values) => setFormData(prev => ({ ...prev, goals: values }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Skills</Label>
                    <MultiSelect
                      options={[
                        { value: "programming", label: "Programming" },
                        { value: "design", label: "Design" },
                        { value: "marketing", label: "Marketing" },
                        { value: "sales", label: "Sales" },
                        { value: "communication", label: "Communication" },
                        { value: "leadership", label: "Leadership" },
                        { value: "analytics", label: "Analytics" },
                        { value: "project_management", label: "Project Management" }
                      ]}
                      selected={formData.skills}
                      onChange={(values) => setFormData(prev => ({ ...prev, skills: values }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Interests</Label>
                    <MultiSelect
                      options={[
                        { value: "technology", label: "Technology" },
                        { value: "business", label: "Business" },
                        { value: "arts", label: "Arts" },
                        { value: "science", label: "Science" },
                        { value: "sports", label: "Sports" },
                        { value: "travel", label: "Travel" },
                        { value: "food", label: "Food" },
                        { value: "music", label: "Music" }
                      ]}
                      selected={formData.interests}
                      onChange={(values) => setFormData(prev => ({ ...prev, interests: values }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Preferred Platforms</Label>
                    <MultiSelect
                      options={[
                        { value: "web", label: "Web Applications" },
                        { value: "mobile", label: "Mobile Apps" },
                        { value: "desktop", label: "Desktop Software" },
                        { value: "social", label: "Social Media" },
                        { value: "email", label: "Email" },
                        { value: "messaging", label: "Messaging Apps" }
                      ]}
                      selected={formData.preferredPlatforms}
                      onChange={(values) => setFormData(prev => ({ ...prev, preferredPlatforms: values }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Communication Style</Label>
                    <Select
                      onValueChange={(value) => setFormData(prev => ({ ...prev, communicationStyle: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select communication style" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="direct">Direct and Concise</SelectItem>
                        <SelectItem value="detailed">Detailed and Thorough</SelectItem>
                        <SelectItem value="casual">Casual and Friendly</SelectItem>
                        <SelectItem value="formal">Formal and Professional</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="col-span-2 space-y-2">
                    <Label>Tech Comfort Level</Label>
                    <div className="pt-2">
                      <Slider
                        defaultValue={[5]}
                        max={10}
                        step={1}
                        onValueChange={([value]) => setFormData(prev => ({ ...prev, techComfort: value }))}
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>Beginner</span>
                        <span>Intermediate</span>
                        <span>Expert</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Generating...
                    </>
                  ) : (
                    "Generate Persona"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="saved">
          <Card>
            <CardHeader>
              <CardTitle>Saved Personas</CardTitle>
            </CardHeader>
            <CardContent>
              {savedPersonas.length === 0 ? (
                <p className="text-center text-muted-foreground">No saved personas yet.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {savedPersonas.map((savedPersona, index) => (
                    <Card key={index} className="cursor-pointer hover:bg-accent/50 transition-colors">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <span className="text-xl">👤</span>
                          </div>
                          <div>
                            <h3 className="font-semibold">{savedPersona.name}</h3>
                            <p className="text-sm text-muted-foreground">{savedPersona.occupation}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advanced">
          <Card>
            <CardHeader>
              <CardTitle>Advanced Options</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Button
                    onClick={exportAsJSON}
                    disabled={!persona}
                    variant="outline"
                  >
                    Export as JSON
                  </Button>
                  <Button
                    onClick={savePersona}
                    disabled={!persona}
                    variant="outline"
                  >
                    Save Persona
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <AnimatePresence mode="wait">
        {persona && (
          <motion.div
            key="persona-output"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mt-8"
          >
            <PersonaOutput persona={persona} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
  )
} 