import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Education } from './components/Education';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Achievements } from './components/Achievements';
import { Journey } from './components/Journey';
import { GithubUniverse } from './components/GithubUniverse';
import { ContactTerminal } from './components/ContactTerminal';
import { Footer } from './components/Footer';
import { ResumeModal } from './components/ResumeModal';
import { CustomCursor } from './components/CustomCursor';

function PortfolioApp() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[var(--bg-main)] text-[var(--text-primary)] selection:bg-emerald-500/20 selection:text-emerald-600 dark:selection:text-emerald-400 overflow-x-hidden transition-colors duration-200">
      {/* Custom Minimal Cursor */}
      <CustomCursor />

      {/* Navigation Header with Theme Toggle */}
      <Navbar onOpenResume={() => setIsResumeOpen(true)} />

      {/* Main Content Sections */}
      <main className="relative z-10 flex flex-col">
        {/* Hero with 3D Core */}
        <Hero onOpenResume={() => setIsResumeOpen(true)} />

        {/* 01: About Me */}
        <About />

        {/* 02: Education Timeline */}
        <Education />

        {/* 03: Skills Constellation */}
        <Skills />

        {/* 04: Featured Projects & NEXUS Interactive Graph */}
        <Projects />

        {/* 05: Achievements & Certifications */}
        <Achievements />

        {/* 06: Chronological Journey */}
        <Journey />

        {/* 07: My Code Universe (GitHub) */}
        <GithubUniverse />

        {/* 08: Terminal Contact & Uplinks */}
        <ContactTerminal />
      </main>

      {/* Minimal Premium Footer */}
      <Footer />

      {/* Curriculum Vitae / Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <PortfolioApp />
    </ThemeProvider>
  );
}

export default App;
