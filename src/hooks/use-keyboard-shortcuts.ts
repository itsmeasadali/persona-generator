import { useEffect } from 'react'

export function useKeyboardShortcuts(shortcuts: { key: string; action: () => void }[]) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      shortcuts.forEach(({ key, action }) => {
        if (event.key.toLowerCase() === key.toLowerCase()) {
          action()
        }
      })
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [shortcuts])
} 