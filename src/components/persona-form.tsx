import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { MultiSelect } from '@/components/multi-select'
import { generatePersona } from '@/lib/generate-persona'
import { occupations, Occupation } from '@/lib/persona-data'

const occupationOptions = occupations.map(value => ({
  value,
  label: value.charAt(0).toUpperCase() + value.slice(1)
}))

const ageRanges = [
  '18-24',
  '25-34',
  '35-44',
  '45-54',
  '55-64',
  '65+'
]

const educationLevels = [
  'High School',
  'Some College',
  'Bachelor\'s Degree',
  'Master\'s Degree',
  'Ph.D.',
  'Professional Degree'
]

const experienceLevels = [
  'Entry Level (0-2 years)',
  'Junior (2-5 years)',
  'Mid-Level (5-8 years)',
  'Senior (8-12 years)',
  'Expert (12+ years)'
]

const locations = [
  'Urban',
  'Suburban',
  'Rural',
  'Remote'
]

const budgetRanges = [
  'Low Budget',
  'Mid-Range',
  'High Budget',
  'Enterprise Level'
]

const platforms = [
  'Mobile Apps',
  'Web Platforms',
  'Desktop Software',
  'Social Media',
  'Email',
  'In-Person'
]

const communicationStyles = [
  'Direct and Brief',
  'Detailed and Thorough',
  'Visual and Interactive',
  'Collaborative and Discussion-based'
]

const goalOptions = [
  { value: 'productivity', label: 'Increase Productivity' },
  { value: 'costs', label: 'Reduce Costs' },
  { value: 'quality', label: 'Improve Quality' },
  { value: 'market', label: 'Expand Market Share' },
  { value: 'customer', label: 'Enhance Customer Experience' },
  { value: 'operations', label: 'Streamline Operations' },
  { value: 'innovation', label: 'Drive Innovation' },
  { value: 'skills', label: 'Develop New Skills' }
]

interface FormData {
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

interface GeneratedPersona extends FormData {
  name: string
  avatar: string
  traits: string[]
  challenges: string[]
}

const defaultFormData: FormData = {
  ageRange: '25-34',
  occupation: 'technology' as Occupation,
  goals: [],
  education: 'Bachelor\'s Degree',
  experience: 'Mid-Level (5-8 years)',
  location: 'Urban',
  skills: [],
  interests: [],
  painPoints: [],
  techComfort: 7,
  budget: 'Mid-Range',
  preferredPlatforms: [],
  communicationStyle: 'Direct and Brief',
  decisionMakingFactors: []
}

export function PersonaForm({ onGenerate }: { onGenerate: (persona: GeneratedPersona) => void }) {
  const [formData, setFormData] = useState<FormData>(defaultFormData)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const persona = generatePersona({
      ...formData,
      occupation: formData.occupation as Occupation
    })
    onGenerate(persona)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <Label>Age Range</Label>
            <Select
              value={formData.ageRange}
              onValueChange={(value) => setFormData({ ...formData, ageRange: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select age range" />
              </SelectTrigger>
              <SelectContent>
                {ageRanges.map((range) => (
                  <SelectItem key={range} value={range}>
                    {range}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Occupation</Label>
            <Select
              value={formData.occupation}
              onValueChange={(value: Occupation) => setFormData({ ...formData, occupation: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select occupation" />
              </SelectTrigger>
              <SelectContent>
                {occupationOptions.map((occupation) => (
                  <SelectItem key={occupation.value} value={occupation.value}>
                    {occupation.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Goals</Label>
            <MultiSelect
              placeholder="Select goals"
              selected={formData.goals}
              options={goalOptions}
              onChange={(values: string[]) => setFormData({ ...formData, goals: values })}
            />
          </div>

          <div>
            <Label>Education</Label>
            <Select
              value={formData.education}
              onValueChange={(value) => setFormData({ ...formData, education: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select education level" />
              </SelectTrigger>
              <SelectContent>
                {educationLevels.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Experience Level</Label>
            <Select
              value={formData.experience}
              onValueChange={(value) => setFormData({ ...formData, experience: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select experience level" />
              </SelectTrigger>
              <SelectContent>
                {experienceLevels.map((level) => (
                  <SelectItem key={level} value={level}>
                    {level}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Location</Label>
            <Select
              value={formData.location}
              onValueChange={(value) => setFormData({ ...formData, location: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Skills</Label>
            <MultiSelect
              placeholder="Select skills"
              selected={formData.skills}
              options={[
                { value: 'Project Management', label: 'Project Management' },
                { value: 'Leadership', label: 'Leadership' },
                { value: 'Communication', label: 'Communication' },
                { value: 'Problem Solving', label: 'Problem Solving' },
                { value: 'Technical Skills', label: 'Technical Skills' },
                { value: 'Analytics', label: 'Analytics' },
                { value: 'Design Thinking', label: 'Design Thinking' },
                { value: 'Team Collaboration', label: 'Team Collaboration' }
              ]}
              onChange={(values: string[]) => setFormData({ ...formData, skills: values })}
            />
          </div>

          <div>
            <Label>Interests</Label>
            <MultiSelect
              placeholder="Select interests"
              selected={formData.interests}
              options={[
                { value: 'Technology Trends', label: 'Technology Trends' },
                { value: 'Professional Development', label: 'Professional Development' },
                { value: 'Industry News', label: 'Industry News' },
                { value: 'Networking', label: 'Networking' },
                { value: 'Innovation', label: 'Innovation' },
                { value: 'Sustainability', label: 'Sustainability' },
                { value: 'Work-Life Balance', label: 'Work-Life Balance' },
                { value: 'Career Growth', label: 'Career Growth' }
              ]}
              onChange={(values: string[]) => setFormData({ ...formData, interests: values })}
            />
          </div>

          <div>
            <Label>Pain Points</Label>
            <MultiSelect
              placeholder="Select pain points"
              selected={formData.painPoints}
              options={[
                { value: 'Time Management', label: 'Time Management' },
                { value: 'Resource Constraints', label: 'Resource Constraints' },
                { value: 'Technical Challenges', label: 'Technical Challenges' },
                { value: 'Communication Issues', label: 'Communication Issues' },
                { value: 'Process Inefficiencies', label: 'Process Inefficiencies' },
                { value: 'Budget Limitations', label: 'Budget Limitations' },
                { value: 'Team Coordination', label: 'Team Coordination' },
                { value: 'Market Competition', label: 'Market Competition' }
              ]}
              onChange={(values: string[]) => setFormData({ ...formData, painPoints: values })}
            />
          </div>

          <div>
            <Label>Technology Comfort Level (1-10)</Label>
            <Slider
              value={[formData.techComfort]}
              min={1}
              max={10}
              step={1}
              onValueChange={([value]) => setFormData({ ...formData, techComfort: value })}
            />
          </div>

          <div>
            <Label>Budget Range</Label>
            <Select
              value={formData.budget}
              onValueChange={(value) => setFormData({ ...formData, budget: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select budget range" />
              </SelectTrigger>
              <SelectContent>
                {budgetRanges.map((range) => (
                  <SelectItem key={range} value={range}>
                    {range}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Preferred Platforms</Label>
            <MultiSelect
              placeholder="Select platforms"
              selected={formData.preferredPlatforms}
              options={platforms.map(platform => ({ value: platform, label: platform }))}
              onChange={(values: string[]) => setFormData({ ...formData, preferredPlatforms: values })}
            />
          </div>

          <div>
            <Label>Communication Style</Label>
            <Select
              value={formData.communicationStyle}
              onValueChange={(value) => setFormData({ ...formData, communicationStyle: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select communication style" />
              </SelectTrigger>
              <SelectContent>
                {communicationStyles.map((style) => (
                  <SelectItem key={style} value={style}>
                    {style}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Decision Making Factors</Label>
            <MultiSelect
              placeholder="Select factors"
              selected={formData.decisionMakingFactors}
              options={[
                { value: 'Cost', label: 'Cost' },
                { value: 'Quality', label: 'Quality' },
                { value: 'Time to Market', label: 'Time to Market' },
                { value: 'User Experience', label: 'User Experience' },
                { value: 'Technical Requirements', label: 'Technical Requirements' },
                { value: 'Team Capacity', label: 'Team Capacity' },
                { value: 'Market Trends', label: 'Market Trends' },
                { value: 'Customer Feedback', label: 'Customer Feedback' }
              ]}
              onChange={(values: string[]) => setFormData({ ...formData, decisionMakingFactors: values })}
            />
          </div>
        </div>

        <Button type="submit" className="w-full mt-6">
          Generate Persona
        </Button>
      </Card>
    </form>
  )
} 