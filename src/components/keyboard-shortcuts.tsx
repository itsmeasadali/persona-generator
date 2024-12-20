export function KeyboardShortcuts() {
  return (
    <div className="fixed bottom-4 right-4 p-4 bg-card rounded-lg shadow-lg">
      <h3 className="font-semibold mb-2">Keyboard Shortcuts</h3>
      <ul className="space-y-1 text-sm">
        <li>
          <kbd className="px-2 py-1 bg-muted rounded">G</kbd> Generate new persona
        </li>
        <li>
          <kbd className="px-2 py-1 bg-muted rounded">E</kbd> Export as PDF
        </li>
        <li>
          <kbd className="px-2 py-1 bg-muted rounded">I</kbd> Export as Image
        </li>
        <li>
          <kbd className="px-2 py-1 bg-muted rounded">T</kbd> Toggle theme
        </li>
      </ul>
    </div>
  )
} 