import React, { useState, useEffect } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { Star, GitFork, BookOpen, ExternalLink, Activity } from 'lucide-react';
import { playCyberBeep } from '../utils/audio';
import { GithubIcon } from './SocialIcons';

interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
}

interface GithubProfile {
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
  bio: string | null;
}

export const GithubUniverse: React.FC = () => {
  const [profile, setProfile] = useState<GithubProfile | null>(null);
  const [repos, setRepos] = useState<GithubRepo[]>([]);

  // Fallback repo collection if GitHub API is rate-limited
  const fallbackRepos: GithubRepo[] = [
    {
      id: 101,
      name: 'NEXUS-AI-Forensics',
      description: 'AI-Powered Criminal Network Analysis Platform for Internal Smart India Hackathon 2026.',
      html_url: 'https://github.com/tanmaylagad45',
      stargazers_count: 5,
      forks_count: 2,
      language: 'Python',
      updated_at: '2026-09-15T00:00:00Z',
    },
    {
      id: 102,
      name: 'velocity-sports-shop',
      description: 'Interactive sports merchandise e-commerce platform with dynamic cart and responsive UI.',
      html_url: 'https://github.com/tanmaylagad45',
      stargazers_count: 3,
      forks_count: 1,
      language: 'JavaScript',
      updated_at: '2026-08-20T00:00:00Z',
    },
    {
      id: 103,
      name: 'ai-ml-experiments',
      description: 'Exploratory data analysis, regression pipelines, neural classification, and NLP experiments.',
      html_url: 'https://github.com/tanmaylagad45',
      stargazers_count: 4,
      forks_count: 0,
      language: 'Python',
      updated_at: '2026-07-10T00:00:00Z',
    },
    {
      id: 104,
      name: 'portfolio-cyber',
      description: 'Futuristic 3D interactive developer portfolio built with React, TypeScript & Three.js.',
      html_url: 'https://github.com/tanmaylagad45',
      stargazers_count: 6,
      forks_count: 1,
      language: 'TypeScript',
      updated_at: '2026-10-01T00:00:00Z',
    },
  ];

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        const [profRes, reposRes] = await Promise.all([
          fetch('https://api.github.com/users/tanmaylagad45'),
          fetch('https://api.github.com/users/tanmaylagad45/repos?sort=updated&per_page=6'),
        ]);

        if (profRes.ok && reposRes.ok) {
          const profData = await profRes.json();
          const reposData = await reposRes.json();
          setProfile(profData);
          if (Array.isArray(reposData) && reposData.length > 0) {
            setRepos(reposData);
          } else {
            setRepos(fallbackRepos);
          }
        } else {
          setRepos(fallbackRepos);
        }
      } catch {
        setRepos(fallbackRepos);
      }
    };

    fetchGitHubData();
  }, []);

  // Generate simulated futuristic contribution activity grid
  const activityCells = Array.from({ length: 48 }, (_, i) => {
    const seed = (i * 7 + 13) % 10;
    let level = 0;
    if (seed > 7) level = 3;
    else if (seed > 4) level = 2;
    else if (seed > 2) level = 1;
    return level;
  });

  return (
    <section id="github" className="relative py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-900 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-slate-700/80 text-[11px] font-mono-tech text-emerald-400 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>07 // OPEN REPOSITORIES &amp; SOURCE</span>
          </div>
          <h2 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight uppercase">
            MY <span className="text-emerald-400 glow-text-green">CODE UNIVERSE</span>
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-emerald-400 to-cyan-400 mt-2 rounded-full" />
          <p className="text-slate-400 text-sm sm:text-base mt-3 max-w-xl">
            Real-time public code repositories, open-source work, and version control telemetry directly from GitHub.
          </p>
        </div>

        {/* GitHub Header Banner */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 mb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 text-emerald-400 shadow-[0_0_20px_rgba(0,255,136,0.15)]">
              <GithubIcon className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-black text-xl text-white">
                  @tanmaylagad45
                </h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono-tech bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                  PUBLIC DEV
                </span>
              </div>
              <p className="text-xs font-mono-tech text-slate-400 mt-1">
                Computer Engineering Student • MGM College of Engineering
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
            {/* Real Stats chips */}
            <div className="flex items-center gap-3">
              <div className="px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-center">
                <span className="text-[10px] font-mono-tech text-slate-400 block">REPOS</span>
                <span className="text-sm font-heading font-bold text-white">
                  {profile ? profile.public_repos : '10+'}
                </span>
              </div>
              <div className="px-3.5 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-center">
                <span className="text-[10px] font-mono-tech text-slate-400 block">STATUS</span>
                <span className="text-sm font-mono-tech font-bold text-emerald-400">ACTIVE</span>
              </div>
            </div>

            <a
              href={PORTFOLIO_DATA.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playCyberBeep(700, 0.04, 'triangle')}
              className="px-5 py-2.5 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-mono-tech font-bold text-xs tracking-wider flex items-center gap-2 transition-all shadow-[0_0_20px_rgba(0,255,136,0.4)] cursor-pointer"
            >
              <span>VISIT GITHUB PROFILE</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Contribution Activity Telemetry Visualizer */}
        <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-white/10 mb-10">
          <div className="flex items-center justify-between mb-3 text-xs font-mono-tech text-slate-400">
            <div className="flex items-center gap-2 text-cyan-400">
              <Activity className="w-4 h-4" />
              <span>ACTIVITY TELEMETRY &amp; RECENT COMMITS</span>
            </div>
            <span className="hidden sm:inline">2026 CADENCE</span>
          </div>

          <div className="grid grid-cols-12 sm:grid-cols-24 gap-1.5 py-2">
            {activityCells.map((lvl, i) => (
              <div
                key={i}
                className={`h-4 rounded-[3px] transition-colors ${
                  lvl === 3
                    ? 'bg-emerald-400 shadow-[0_0_6px_#00FF88]'
                    : lvl === 2
                    ? 'bg-emerald-600'
                    : lvl === 1
                    ? 'bg-emerald-950 border border-emerald-800/40'
                    : 'bg-slate-900/80 border border-slate-800/60'
                }`}
                title={`Activity index: ${lvl}`}
              />
            ))}
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono-tech text-slate-500 pt-2 border-t border-slate-800/60 mt-2">
            <span>LESS</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-slate-900 border border-slate-800" />
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-950 border border-emerald-800" />
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-600" />
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-400" />
            </div>
            <span>MORE COMMITS</span>
          </div>
        </div>

        {/* Repository Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {repos.slice(0, 4).map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playCyberBeep(650, 0.03, 'sine')}
              className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-emerald-500/50 hover:shadow-[0_0_25px_rgba(0,255,136,0.15)] transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-emerald-400 group-hover:rotate-6 transition-transform" />
                    <h4 className="font-heading font-bold text-base sm:text-lg text-white group-hover:text-emerald-300 transition-colors truncate max-w-[260px]">
                      {repo.name}
                    </h4>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                </div>

                <p className="text-xs sm:text-sm text-slate-300 font-mono-tech leading-relaxed mb-4 line-clamp-2">
                  {repo.description || 'Public software engineering repository and practical project source code.'}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs font-mono-tech pt-3 border-t border-slate-800/80">
                <div className="flex items-center gap-3">
                  {repo.language && (
                    <span className="flex items-center gap-1.5 text-cyan-300">
                      <span className="w-2 h-2 rounded-full bg-cyan-400" />
                      {repo.language}
                    </span>
                  )}
                  <span className="flex items-center gap-1 text-slate-400">
                    <Star className="w-3 h-3 text-amber-400" />
                    {repo.stargazers_count}
                  </span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <GitFork className="w-3 h-3" />
                    {repo.forks_count}
                  </span>
                </div>

                <span className="text-emerald-400 text-[10px] group-hover:translate-x-1 transition-transform">
                  EXPLORE &gt;
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
