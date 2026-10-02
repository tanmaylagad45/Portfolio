import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { X, Cpu, Network, ShieldAlert, CheckCircle2 } from 'lucide-react';
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto bg-slate-950/70 backdrop-blur-sm">
      <div
        className="relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-[#F8FAFC]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-emerald-100 text-emerald-800">
              <Network className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-extrabold text-xl text-slate-900 tracking-tight">
                  {nexusData.title}
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-200">
                  {nexusData.achievement?.rank} Podium Finish
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {nexusData.subtitle}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              playCyberBeep(450, 0.03, 'sine');
              onClose();
            }}
            className="p-2 rounded-lg bg-white border border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-300 transition-colors cursor-pointer"
            aria-label="Close Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Scrollable */}
        <div className="overflow-y-auto p-6 space-y-8 divide-y divide-slate-100">
          {/* Hackathon Achievement Highlight Ribbon */}
          <div className="p-5 rounded-xl bg-amber-50/70 border border-amber-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="p-3 rounded-xl bg-amber-100 text-amber-800 text-2xl font-bold">
                🥉
              </div>
              <div>
                <div className="text-xs font-mono-tech text-amber-800 uppercase tracking-widest font-bold">
                  {nexusData.achievement?.title}
                </div>
                <div className="font-heading font-bold text-lg text-slate-900">
                  "{nexusData.achievement?.note}"
                </div>
              </div>
            </div>

            <div className="px-3.5 py-1.5 rounded-lg bg-white border border-amber-200 text-xs font-semibold text-amber-900 shadow-2xs">
              MGM College of Engineering • Internal SIH 2026
            </div>
          </div>

          {/* Interactive Network Graph Simulator */}
          <div className="pt-6">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <h4 className="font-heading font-bold text-base text-slate-900">
                  INTERACTIVE TOPOLOGY GRAPH
                </h4>
              </div>
              <span className="text-xs text-slate-500">
                Topological Entity Inspector (Simulated Data)
              </span>
            </div>

            <div className="rounded-xl border border-slate-800 bg-[#0F172A] overflow-hidden">
              <NexusNetworkCanvas
                interactive={true}
                className="w-full h-72 sm:h-80"
                theme="dark"
              />
            </div>
          </div>

          {/* Problem vs Solution Grid */}
          <div className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 rounded-xl bg-slate-50 border border-slate-200">
              <div className="flex items-center gap-2 text-rose-700 text-xs font-semibold mb-2 uppercase tracking-wide">
                <ShieldAlert className="w-4 h-4" />
                <span>The Investigation Problem</span>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                {nexusData.detailedCaseStudy?.problem}
              </p>
            </div>

            <div className="p-5 rounded-xl bg-emerald-50/50 border border-emerald-200">
              <div className="flex items-center gap-2 text-emerald-800 text-xs font-semibold mb-2 uppercase tracking-wide">
                <CheckCircle2 className="w-4 h-4" />
                <span>The NEXUS Solution</span>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed">
                {nexusData.detailedCaseStudy?.solution}
              </p>
            </div>
          </div>

          {/* Tanmay's Direct Contribution Section */}
          <div className="pt-6">
            <div className="p-5 rounded-xl bg-[#F8FAFC] border border-slate-200">
              <div className="flex items-center gap-2 text-slate-900 text-xs font-semibold mb-2 uppercase tracking-wide">
                <Cpu className="w-4 h-4 text-emerald-700" />
                <span>My Direct Engineering Contribution</span>
              </div>
              <p className="text-sm text-slate-800 leading-relaxed mb-4">
                {nexusData.detailedCaseStudy?.myContribution}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {nexusData.involvement.map((inv, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-white border border-slate-200 text-xs font-medium text-slate-800 flex items-center gap-2 shadow-2xs"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-600" />
                    <span>{inv}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Core Feature Matrix */}
          <div className="pt-6">
            <h4 className="font-heading font-bold text-base text-slate-900 mb-4">
              CAPABILITIES &amp; FORENSIC MODULES
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {nexusData.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-medium text-slate-800 flex items-center gap-2"
                >
                  <span className="text-emerald-700 font-bold">•</span>
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Architecture Pipeline */}
          <div className="pt-6">
            <h4 className="font-heading font-bold text-base text-slate-900 mb-4">
              TECHNICAL PIPELINE ARCHITECTURE
            </h4>
            <div className="space-y-2.5">
              {nexusData.detailedCaseStudy?.architecture.map((arch, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-start gap-2.5"
                >
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold font-mono-tech">
                    0{idx + 1}
                  </span>
                  <span>{arch}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Technology Stack Tags */}
          <div className="pt-6 flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono-tech text-slate-500 mr-2 font-semibold">TECH STACK:</span>
            {nexusData.technologies.map((tech, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-md text-xs font-mono-tech bg-slate-100 border border-slate-200 text-slate-800 font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-[#F8FAFC] flex items-center justify-between">
          <div className="text-xs text-slate-500 font-medium">
            Internal SIH 2026 • 3rd Place Podium Project
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
};
