'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Features from '@/components/Features'
import HowItWorks from '@/components/HowItWorks'
import DemoCard from '@/components/DemoCard'
import WhyItMatters from '@/components/WhyItMatters'
import Footer from '@/components/Footer'
import Sidebar from '@/components/Sidebar'
import VoiceCallComponent from '@/components/VoiceCallComponent'
import SMSEmailComponent from '@/components/SMSEmailComponent'
import AudioVideoComponent from '@/components/AudioVideoComponent'
import LLMHoneypotComponent from '@/components/LLMHoneypotComponent'

export default function Home() {
  const [activeComponent, setActiveComponent] = useState<string>('landing')
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar 
        activeComponent={activeComponent} 
        setActiveComponent={setActiveComponent}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />
      
      <main className="flex-1 flex flex-col">
        <Header 
          activeComponent={activeComponent} 
          setActiveComponent={setActiveComponent}
          onToggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        />
        
        <div className="flex-1">
          {activeComponent === 'landing' && (
            <>
              <Hero setActiveComponent={setActiveComponent} />
              <Features />
              <HowItWorks />
              <DemoCard />
              <WhyItMatters />
            </>
          )}
          
          {activeComponent === 'voice-call' && <VoiceCallComponent />}
          {activeComponent === 'sms-email' && <SMSEmailComponent />}
          {activeComponent === 'audio-video' && <AudioVideoComponent />}
          {activeComponent === 'llm-honeypot' && <LLMHoneypotComponent />}
        </div>
        
        {activeComponent === 'landing' && <Footer />}
      </main>
    </div>
  )
}
