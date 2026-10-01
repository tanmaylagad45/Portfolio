import { useState } from 'react';
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

export function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#04060A] text-slate-100 selection:bg-[#00FF88]/30 selection:text-[#00FF88] overflow-x-hidden">
      {/* Custom Cyber Cursor */}
      <CustomCursor />

      {/* Navigation Header */}
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

export default App;
