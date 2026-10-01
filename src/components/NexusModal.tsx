import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { X, Cpu, Network, ShieldAlert, CheckCircle2, Terminal } from 'lucide-react';
import { NexusNetworkCanvas } from './NexusNetworkCanvas';
import { playCyberBeep } from '../utils/audio';

interface NexusModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NexusModal: React.FC<NexusModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const nexusData = PORTFOLIO_DATA.featuredProjects[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/80 backdrop-blur-xl">
      <div
        className="relative w-full max-w-5xl max-h-[92vh] flex flex-col glass-panel rounded-2xl border border-emerald-500/40 shadow-[0_0_50px_rgba(0,255,136,0.2)] overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Cyber Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-emerald-500/20 bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
              <Network className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-black text-xl text-white tracking-wide">
                  {nexusData.title}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono-tech font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  {nexusData.achievement?.rank} PODIUM WINNER
                </span>
              </div>
              <p className="text-xs font-mono-tech text-emerald-400">
                {nexusData.subtitle}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              playCyberBeep(450, 0.03, 'sine');
              onClose();
            }}
            className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-400 hover:text-white hover:border-red-500/50 transition-colors cursor-pointer"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Scrollable */}
        <div className="overflow-y-auto p-6 space-y-8 divide-y divide-slate-800/80">
          {/* Hackathon Achievement Highlight Ribbon */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-amber-950/40 via-slate-900/60 to-emerald-950/40 border border-amber-500/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="p-3 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 text-xl">
                🥉
              </div>
              <div>
                <div className="text-xs font-mono-tech text-amber-400 uppercase tracking-widest font-bold">
                  {nexusData.achievement?.title}
                </div>
                <div className="font-heading font-bold text-lg text-white">
                  "{nexusData.achievement?.note}"
                </div>
              </div>
            </div>

            <div className="px-3.5 py-1.5 rounded-lg bg-slate-900/90 border border-slate-700 text-xs font-mono-tech text-slate-300">
              INTERNAL SIH 2026
            </div>
          </div>

          {/* Interactive Network Graph Simulator */}
          <div className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-400" />
                <h4 className="font-heading font-bold text-base text-white">
                  LIVE HYPERGRAPH TOPOLOGY
                </h4>
              </div>
              <span className="text-xs font-mono-tech text-slate-400">
                Interactive Forensics Simulator (Fictional Data)
              </span>
            </div>

            <div className="rounded-xl border border-slate-800 bg-[#060a14] overflow-hidden">
              <NexusNetworkCanvas
                interactive={true}
                className="w-full h-72 sm:h-80"
              />
            </div>
          </div>

          {/* Problem vs Solution Grid */}
          <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-slate-900/60 border border-red-500/20">
              <div className="flex items-center gap-2 text-red-400 text-xs font-mono-tech mb-2 font-bold uppercase tracking-wider">
                <ShieldAlert className="w-4 h-4" />
                <span>THE INVESTIGATION PROBLEM</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                {nexusData.detailedCaseStudy?.problem}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-slate-900/60 border border-emerald-500/20">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono-tech mb-2 font-bold uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>THE NEXUS SOLUTION</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed font-sans">
                {nexusData.detailedCaseStudy?.solution}
              </p>
            </div>
          </div>

          {/* Tanmay's Direct Contribution Section */}
          <div className="pt-6">
            <div className="p-5 rounded-xl bg-slate-900/80 border border-cyan-500/30">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono-tech mb-2 font-bold uppercase tracking-wider">
                <Cpu className="w-4 h-4" />
                <span>MY DIRECT ENGINEERING CONTRIBUTION</span>
              </div>
              <p className="text-sm text-slate-200 leading-relaxed font-sans mb-4">
                {nexusData.detailedCaseStudy?.myContribution}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {nexusData.involvement.map((inv, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-xs font-mono-tech text-emerald-300 flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span>{inv}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Core Feature Matrix */}
          <div className="pt-6">
            <h4 className="font-heading font-bold text-base text-white mb-4">
              CAPABILITIES &amp; FORENSIC MODULES
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {nexusData.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="px-3.5 py-2.5 rounded-lg bg-slate-900/50 border border-slate-800 text-xs font-mono-tech text-slate-300 flex items-center gap-2"
                >
                  <span className="text-cyan-400 font-bold">&gt;</span>
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Architecture Pipeline */}
          <div className="pt-6">
            <h4 className="font-heading font-bold text-base text-white mb-4">
              TECHNICAL PIPELINE ARCHITECTURE
            </h4>
            <div className="space-y-2.5">
              {nexusData.detailedCaseStudy?.architecture.map((arch, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-slate-900/40 border border-white/5 text-xs text-slate-300 font-mono-tech flex items-start gap-2.5"
                >
                  <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                    0{idx + 1}
                  </span>
                  <span>{arch}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technology Stack Tags */}
          <div className="pt-6 flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono-tech text-slate-400 mr-2">TECH STACK:</span>
            {nexusData.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-md text-xs font-mono-tech bg-slate-900 border border-slate-800 text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
          <div className="text-xs font-mono-tech text-slate-400">
            INTERNAL SIH 2026 • PODIUM PROJECT
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-emerald-300 text-xs font-mono-tech font-bold transition-colors cursor-pointer"
          >
            CLOSE DOSSIER
          </button>
        </div>
      </div>
    </div>
  );
};
