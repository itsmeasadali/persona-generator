"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { jsPDF } from "jspdf"
import html2canvas from "html2canvas"
import { useRef } from "react"

interface PersonaOutputProps {
  persona: {
    name: string
    avatar: string
    ageRange: string
    occupation: string
    goals: string[]
    traits: string[]
    challenges: string[]
  }
}

export function PersonaOutput({ persona }: PersonaOutputProps) {
  const outputRef = useRef<HTMLDivElement>(null)

  const exportToPDF = async () => {
    if (!outputRef.current) return
    
    try {
      const canvas = await html2canvas(outputRef.current)
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF()
      const imgProps = pdf.getImageProperties(imgData)
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight)
      pdf.save('persona.pdf')
    } catch (error) {
      console.error('Failed to export PDF:', error)
    }
  }

  const exportToImage = async () => {
    if (!outputRef.current) return
    
    try {
      const canvas = await html2canvas(outputRef.current)
      const link = document.createElement('a')
      link.download = 'persona.png'
      link.href = canvas.toDataURL()
      link.click()
    } catch (error) {
      console.error('Failed to export image:', error)
    }
  }

  return (
    <div className="mt-8 space-y-4">
      <Card ref={outputRef}>
        <CardHeader>
          <CardTitle className="text-center">{persona.name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="relative w-32 h-32 mx-auto">
            <Image
              src={persona.avatar}
              alt="Persona Avatar"
              fill
              className="rounded-full object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Basic Info</h3>
              <p>Age: {persona.ageRange}</p>
              <p>Occupation: {persona.occupation}</p>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Goals</h3>
              <ul className="list-disc pl-4">
                {persona.goals.map((goal, index) => (
                  <li key={index}>{goal}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Key Traits</h3>
              <ul className="list-disc pl-4">
                {persona.traits.map((trait, index) => (
                  <li key={index}>{trait}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Challenges</h3>
              <ul className="list-disc pl-4">
                {persona.challenges.map((challenge, index) => (
                  <li key={index}>{challenge}</li>
                ))}
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center gap-4">
        <Button onClick={exportToPDF}>Export as PDF</Button>
        <Button onClick={exportToImage}>Export as Image</Button>
      </div>
    </div>
  )
} 