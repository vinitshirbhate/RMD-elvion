'use client'

import { Button } from '@/components/ui/button'
import { Phone, Mail, Video, Zap, Home, X } from 'lucide-react'
import { useState, useEffect } from 'react'

interface SidebarProps {
  activeComponent: string
  setActiveComponent: (component: string) => void
  isCollapsed: boolean
  setIsCollapsed: (collapsed: boolean) => void
}

const navItems = [
  { id: 'landing', label: 'Home', icon: Home },
  { id: 'voice-call', label: 'Voice Call', icon: Phone },
  { id: 'sms-email', label: 'SMS & Email', icon: Mail },
  { id: 'audio-video', label: 'Audio/Video', icon: Video },
  { id: 'llm-honeypot', label: 'LLM Honeypot', icon: Zap },
]

export default function Sidebar({
  activeComponent,
  setActiveComponent,
  isCollapsed,
  setIsCollapsed,
}: SidebarProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (isMobile && isCollapsed) {
    return null
  }

  return (
    <>
      {isMobile && isCollapsed === false && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsCollapsed(true)}
        />
      )}

      <aside
        className={`fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border z-40 transition-all duration-300 lg:relative lg:translate-x-0 ${
          isMobile && isCollapsed ? '-translate-x-full' : 'translate-x-0'
        } ${isCollapsed && !isMobile ? 'w-20' : 'w-64'}`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
            {!isCollapsed && (
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center font-display font-bold text-sidebar-primary-foreground text-xs flex-shrink-0">
                  UDS
                </div>
                <span className="font-display font-bold text-xs truncate">The Void</span>
              </div>
            )}
            {isMobile && (
              <button
                onClick={() => setIsCollapsed(true)}
                className="lg:hidden p-2 hover:bg-sidebar-accent rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveComponent(item.id)
                    if (isMobile) {
                      setIsCollapsed(true)
                    }
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm font-medium ${
                    activeComponent === item.id
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {!isCollapsed && <span>{item.label}</span>}
                </button>
              )
            })}
          </nav>

          {/* Footer */}
          {!isCollapsed && (
            <div className="p-4 border-t border-sidebar-border text-xs text-sidebar-foreground/60">
              <p>© 2024 Upside Down Security</p>
            </div>
          )}
        </div>
      </aside>
    </>
  )
}
