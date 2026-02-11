'use client'

import { Button } from '@/components/ui/button'
import { Menu } from 'lucide-react'

interface HeaderProps {
  activeComponent: string
  setActiveComponent: (component: string) => void
  onToggleSidebar: () => void
}

export default function Header({
  activeComponent,
  setActiveComponent,
  onToggleSidebar,
}: HeaderProps) {
  return (
    <header className="border-b border-border bg-card sticky top-0 z-40">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className="lg:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center font-display font-bold text-primary-foreground text-sm">
              UDS
            </div>
            <span className="font-display font-bold text-lg hidden sm:block">Upside Down Security</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => setActiveComponent('landing')}
            className={`text-sm font-medium transition-colors ${
              activeComponent === 'landing'
                ? 'text-primary'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            Home
          </button>
          <a
            href="#features"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Features
          </a>
          <button
            onClick={() => setActiveComponent('audio-video')}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            Explore Features
          </button>
        </nav>

        <div className="flex items-center gap-3">
          <Button
            onClick={() => setActiveComponent('audio-video')}
            variant="outline"
            className="hidden sm:inline-flex"
          >
            Request Demo
          </Button>
          <Button
            onClick={() => setActiveComponent('sms-email')}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            Get Started
          </Button>
        </div>
      </div>
    </header>
  )
}
