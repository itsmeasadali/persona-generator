"use client"

import * as React from "react"
import { Check, ChevronDown, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface Option {
  value: string
  label: string
}

interface MultiSelectProps {
  options: Option[]
  selected: string[]
  onChange: (values: string[]) => void
  placeholder?: string
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select options..."
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  const handleSelect = (value: string) => {
    const newSelected = selected.includes(value)
      ? selected.filter(item => item !== value)
      : [...selected, value]
    onChange(newSelected)
  }

  const selectedLabels = options
    .filter(option => selected.includes(option.value))
    .map(option => option.label)

  return (
    <div className="relative">
      <div
        className="relative flex min-h-[40px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex flex-wrap gap-1">
          {selectedLabels.length > 0 ? (
            selectedLabels.map(label => (
              <Badge
                key={label}
                variant="secondary"
                className="mr-1 mb-1"
              >
                {label}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 px-2 ml-1 hover:bg-transparent"
                  onClick={(e) => {
                    e.stopPropagation()
                    const valueToRemove = options.find(opt => opt.label === label)?.value
                    if (valueToRemove) {
                      onChange(selected.filter(v => v !== valueToRemove))
                    }
                  }}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
        </div>
        <ChevronDown className="h-4 w-4 ml-auto opacity-50 shrink-0" />
      </div>
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
          <div className="overflow-y-auto max-h-[300px]">
            {options.map((option) => (
              <div
                key={option.value}
                className={cn(
                  "relative flex cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground",
                  selected.includes(option.value) && "bg-accent/50"
                )}
                onClick={() => handleSelect(option.value)}
              >
                <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
                  {selected.includes(option.value) && (
                    <Check className="h-4 w-4" />
                  )}
                </span>
                {option.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 