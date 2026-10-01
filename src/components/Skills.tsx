import React, { useState, useEffect, useRef } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Terminal, Cpu, Database, Wrench, Code2, Layers } from 'lucide-react';
import { playCyberBeep } from '../utils/audio';

export const Skills: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeSkill, setActiveSkill] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const categories = ['All', ...PORTFOLIO_DATA.skillConstellation.map(c => c.title)];

  const getFilteredSkills = () => {
    if (selectedCategory === 'All') {
      return PORTFOLIO_DATA.skillConstellation;
    }
    return PORTFOLIO_DATA.skillConstellation.filter(c => c.title === selectedCategory);
  };

  const getLevelBadgeClass = (level: string) => {
    switch (level) {
      case 'Proficient':
        return 'text-emerald-400 bg-emerald-950/60 border-emerald-500/40';
      case 'Working With':
        return 'text-cyan-400 bg-cyan-950/60 border-cyan-500/40';
      case 'Exploring':
        return 'text-purple-300 bg-purple-950/60 border-purple-500/40';
      default:
        return 'text-slate-300 bg-slate-800 border-slate-700';
    }
  };

  const getCategoryIcon = (title: string) => {
    switch (title) {
      case 'Programming':
        return Code2;
      case 'AI / ML':
        return Cpu;
      case 'Development':
        return Layers;
      case 'Data / Backend':
        return Database;
      case 'Tools & DevOps':
        return Wrench;
      default:
        return Terminal;
    }
  };

  // Interactive Constellation Canvas in the background of the skill section
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 400);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Generate constellation nodes
    const allSkillsList: { name: string; category: string }[] = [];
    PORTFOLIO_DATA.skillConstellation.forEach(cat => {
      cat.skills.forEach(s => allSkillsList.push({ name: s.name, category: cat.title }));
    });

    const nodes = allSkillsList.map((skill, i) => {
      const angle = (i / allSkillsList.length) * Math.PI * 2;
      const radius = 120 + (i % 3) * 60;
      return {
        name: skill.name,
        category: skill.category,
        x: width / 2 + Math.cos(angle) * radius + (Math.random() - 0.5) * 40,
        y: height / 2 + Math.sin(angle) * radius + (Math.random() - 0.5) * 40,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: 3.5,
        color: skill.category === 'AI / ML' ? '#00FF88' : skill.category === 'Programming' ? '#00F0FF' : '#A78BFA',
      };
    });

    let mouseX = -999;
    let mouseY = -999;

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    canvas.addEventListener('mousemove', onMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connecting constellation lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const alpha = (1 - dist / 110) * 0.25;
            ctx.strokeStyle = `rgba(0, 255, 136, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Update and render nodes
      nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 20 || node.x > width - 20) node.vx *= -1;
        if (node.y < 20 || node.y > height - 20) node.vy *= -1;

        // Mouse avoidance/gravitation
        const mdx = mouseX - node.x;
        const mdy = mouseY - node.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < 80) {
          node.x -= mdx * 0.02;
          node.y -= mdy * 0.02;
        }

        // Draw node
        ctx.fillStyle = node.color;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fill();

        // Node label if close to mouse or active
        if (mDist < 90 || activeSkill === node.name) {
          ctx.font = '10px "JetBrains Mono", monospace';
          ctx.fillStyle = '#E2E8F0';
          ctx.shadowBlur = 0;
          ctx.fillText(node.name, node.x + 8, node.y + 3);
        }
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', onMouseMove);
    };
  }, [activeSkill]);

  return (
    <section id="skills" className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-900 overflow-hidden">
      {/* Background ambient light */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700/80 text-[11px] font-mono-tech text-emerald-400 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>03 // TECHNICAL STACK &amp; CONSTELLATION</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight uppercase">
            SKILL <span className="text-emerald-400 glow-text-green">CONSTELLATION</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-emerald-400 to-cyan-400 mt-2 rounded-full" />
          <p className="text-slate-400 text-sm sm:text-base mt-3 max-w-2xl">
            Technologies and frameworks I am actively learning, exploring, and building projects with — honestly categorized without inflated percentages.
          </p>
        </div>

        {/* Constellation Radar Canvas Banner */}
        <div className="relative w-full h-48 sm:h-56 rounded-2xl glass-panel border border-white/10 mb-10 overflow-hidden group">
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-crosshair" />
          <div className="absolute top-3 left-4 flex items-center gap-2 pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-[10px] font-mono-tech uppercase text-emerald-400 tracking-wider">
              INTERACTIVE RADAR // HOVER NODES TO DRIFT
            </span>
          </div>

          <div className="absolute bottom-3 right-4 flex items-center gap-4 text-[11px] font-mono-tech text-slate-400 pointer-events-none hidden sm:flex">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400" /> Proficient
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400" /> Working With
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-purple-400" /> Exploring
            </span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                playCyberBeep(600, 0.03, 'sine');
                setSelectedCategory(cat);
              }}
              className={`px-4 py-2 rounded-lg text-xs font-mono-tech tracking-wider transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-[0_0_15px_rgba(0,255,136,0.25)]'
                  : 'bg-slate-900/60 text-slate-400 border border-slate-800 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Skill Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getFilteredSkills().map((category, idx) => {
            const IconComp = getCategoryIcon(category.title);

            return (
              <div
                key={idx}
                className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-emerald-400 group-hover:border-emerald-500/40 transition-colors">
                        <IconComp className="w-4 h-4" />
                      </div>
                      <h3 className="font-heading font-bold text-lg text-white">
                        {category.title}
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono-tech text-slate-400">
                      {category.skills.length} TECHS
                    </span>
                  </div>

                  <p className="text-xs font-mono-tech text-slate-400 mb-5">
                    {category.tagline}
                  </p>

                  {/* Skills Pill Grid */}
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        onMouseEnter={() => {
                          setActiveSkill(skill.name);
                          playCyberBeep(700 + sIdx * 30, 0.02, 'sine');
                        }}
                        onMouseLeave={() => setActiveSkill(null)}
                        className="px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-slate-700 flex items-center gap-2 transition-all hover:scale-105 cursor-default group/item"
                      >
                        <span className="text-xs font-mono-tech text-slate-200 group-hover/item:text-white">
                          {skill.name}
                        </span>
                        <span
                          className={`text-[9px] font-mono-tech px-1.5 py-0.5 rounded border uppercase ${getLevelBadgeClass(
                            skill.level
                          )}`}
                        >
                          {skill.level}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono-tech text-slate-400">
                  <span>ACTIVE APPARATUS</span>
                  <span className="text-cyan-400 group-hover:translate-x-1 transition-transform">
                    VERIFIED // READY &gt;
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
