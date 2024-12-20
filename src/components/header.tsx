import { ThemeToggle } from "@/components/theme-switcher"

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-xl font-semibold">Persona Generator</h1>
        <ThemeToggle />
      </div>
    </header>
  )
} 