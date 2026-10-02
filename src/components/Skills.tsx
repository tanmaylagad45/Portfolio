import React, { useState, useEffect, useRef } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Terminal, Cpu, Database, Wrench, Code2, Layers } from 'lucide-react';
import { playCyberBeep } from '../utils/audio';
import { useTheme } from '../context/useTheme';

export const Skills: React.FC = () => {
  const { theme } = useTheme();
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
        return 'text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-200 dark:border-emerald-800 font-semibold';
      case 'Working With':
        return 'text-teal-800 dark:text-teal-300 bg-teal-50 dark:bg-teal-950/60 border-teal-200 dark:border-teal-800 font-semibold';
      case 'Exploring':
        return 'text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 font-medium';
      default:
        return 'text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700';
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

  // Interactive Constellation Canvas in sleek minimal aesthetic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isDark = theme === 'dark';
    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 240);

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
      const radius = 90 + (i % 3) * 45;
      return {
        name: skill.name,
        category: skill.category,
        x: width / 2 + Math.cos(angle) * radius + (Math.random() - 0.5) * 30,
        y: height / 2 + Math.sin(angle) * radius + (Math.random() - 0.5) * 30,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        size: 3,
        color: skill.category === 'AI / ML'
          ? (isDark ? '#22C55E' : '#16A34A')
          : skill.category === 'Programming'
          ? (isDark ? '#14B8A6' : '#0F766E')
          : (isDark ? '#94A3B8' : '#475569'),
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

      // Connecting lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            const alpha = (1 - dist / 100) * (isDark ? 0.25 : 0.15);
            ctx.strokeStyle = isDark ? `rgba(148, 163, 184, ${alpha})` : `rgba(15, 23, 42, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Nodes
      nodes.forEach(node => {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 20 || node.x > width - 20) node.vx *= -1;
        if (node.y < 20 || node.y > height - 20) node.vy *= -1;

        const mdx = mouseX - node.x;
        const mdy = mouseY - node.y;
        const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mDist < 70) {
          node.x -= mdx * 0.015;
          node.y -= mdy * 0.015;
        }

        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fill();

        if (mDist < 75 || activeSkill === node.name) {
          ctx.font = '10px "Inter", sans-serif';
          ctx.fillStyle = isDark ? '#F8FAFC' : '#0F172A';
          ctx.fillText(node.name, node.x + 7, node.y + 3);
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
  }, [activeSkill, theme]);

  return (
    <section id="skills" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#F1F5F9]/60 dark:bg-[#0B0F17] border-t border-slate-200/80 dark:border-slate-800 transition-colors duration-200 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] font-mono-tech text-slate-600 dark:text-slate-400 mb-3 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 dark:bg-emerald-400" />
            <span>03 // TECHNICAL EXPERTISE &amp; TOOLS</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 dark:text-white tracking-tight">
            SKILL <span className="text-emerald-700 dark:text-emerald-400">CONSTELLATION</span>
          </h2>
          <div className="h-1 w-16 bg-emerald-600 dark:bg-emerald-500 mt-3 rounded-full" />
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-3 max-w-2xl">
            Technologies and frameworks I am actively learning, exploring, and building projects with — honestly categorized without inflated percentages.
          </p>
        </div>

        {/* Constellation Interactive Canvas Banner */}
        <div className="relative w-full h-44 sm:h-52 rounded-2xl bg-white dark:bg-[#111827] border border-slate-200/90 dark:border-slate-800 mb-10 overflow-hidden shadow-xs">
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-crosshair" />
          <div className="absolute top-3 left-4 flex items-center gap-2 pointer-events-none">
            <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400 animate-pulse" />
            <span className="text-[11px] font-mono-tech text-slate-600 dark:text-slate-400 tracking-normal font-medium">
              Interactive Tech Network • Hover to explore connections
            </span>
          </div>

          <div className="absolute bottom-3 right-4 flex items-center gap-4 text-xs font-medium text-slate-500 dark:text-slate-400 pointer-events-none hidden sm:flex">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400" /> Proficient
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-teal-600 dark:bg-teal-400" /> Working With
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-slate-500 dark:bg-slate-400" /> Exploring
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
              className={`px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all duration-150 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-slate-900 dark:bg-emerald-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:text-slate-900 dark:hover:text-white shadow-2xs'
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
                className="bg-white dark:bg-[#111827] p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-xs hover:border-emerald-500/60 dark:hover:border-emerald-500/60 hover:shadow-sm transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-950/60 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                        <IconComp className="w-4 h-4" />
                      </div>
                      <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
                        {category.title}
                      </h3>
                    </div>
                    <span className="text-[11px] font-mono-tech text-slate-400 dark:text-slate-500 font-medium">
                      {category.skills.length} Techs
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
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
                        className="px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 hover:border-emerald-400 dark:hover:border-emerald-500 hover:bg-emerald-50/40 dark:hover:bg-emerald-950/40 flex items-center gap-2 transition-all cursor-default group/item"
                      >
                        <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover/item:text-slate-900 dark:group-hover/item:text-white">
                          {skill.name}
                        </span>
                        <span
                          className={`text-[10px] font-mono-tech px-1.5 py-0.5 rounded border ${getLevelBadgeClass(
                            skill.level
                          )}`}
                        >
                          {skill.level}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-mono-tech text-slate-400 dark:text-slate-500">
                  <span>PRACTICAL LEVEL</span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-semibold group-hover:translate-x-0.5 transition-transform">
                    VERIFIED &gt;
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
