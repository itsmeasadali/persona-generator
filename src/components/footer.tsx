export function Footer() {
  return (
    <footer className="bg-background py-6 mt-12">
      <div className="container mx-auto text-center text-muted-foreground">
        <p>
          Built with ❤️ by{' '}
          <a 
            href="https://ztabs.co" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            ZTABS
          </a>
        </p>
        <p className="mt-2">
          Open source on{' '}
          <a
            href="https://github.com/ztabs-official/personal-generator"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            GitHub
          </a>
        </p>
      </div>
    </footer>
  )
} 