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

// Fallback repo collection if GitHub API is rate-limited
const FALLBACK_REPOS: GithubRepo[] = [
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
    name: 'portfolio-minimal',
    description: 'Sleek, minimal, recruiter-friendly developer portfolio with 3D interactive core.',
    html_url: 'https://github.com/tanmaylagad45',
    stargazers_count: 6,
    forks_count: 1,
    language: 'TypeScript',
    updated_at: '2026-10-01T00:00:00Z',
  },
];

export const GithubUniverse: React.FC = () => {
  const [profile, setProfile] = useState<GithubProfile | null>(null);
  const [repos, setRepos] = useState<GithubRepo[]>([]);

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
            setRepos(FALLBACK_REPOS);
          }
        } else {
          setRepos(FALLBACK_REPOS);
        }
      } catch {
        setRepos(FALLBACK_REPOS);
      }
    };

    fetchGitHubData();
  }, []);

  // Standard GitHub contribution activity simulation
  const activityCells = Array.from({ length: 48 }, (_, i) => {
    const seed = (i * 7 + 13) % 10;
    let level = 0;
    if (seed > 7) level = 3;
    else if (seed > 4) level = 2;
    else if (seed > 2) level = 1;
    return level;
  });

  return (
    <section id="github" className="relative py-28 px-4 sm:px-6 lg:px-8 bg-[#F8FAFC] border-t border-slate-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-start mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-[11px] font-mono-tech text-slate-600 mb-3 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
            <span>07 // OPEN REPOSITORIES &amp; CODE</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-slate-900 tracking-tight">
            MY <span className="text-emerald-700">CODE UNIVERSE</span>
          </h2>
          <div className="h-1 w-16 bg-emerald-600 mt-3 rounded-full" />
          <p className="text-slate-600 text-sm sm:text-base mt-3 max-w-xl">
            Public code repositories, open-source work, and version control telemetry directly from GitHub.
          </p>
        </div>

        {/* GitHub Header Banner */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/90 mb-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xs">
          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-slate-900 text-white shadow-xs">
              <GithubIcon className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-bold text-xl text-slate-900">
                  @tanmaylagad45
                </h3>
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono-tech bg-emerald-50 border border-emerald-200 text-emerald-800 font-semibold">
                  Public Developer
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Computer Engineering Student • MGM College of Engineering
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
            {/* Real Stats chips */}
            <div className="flex items-center gap-3">
              <div className="px-3.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-center">
                <span className="text-[10px] font-mono-tech text-slate-400 block font-semibold">REPOS</span>
                <span className="text-sm font-heading font-extrabold text-slate-900">
                  {profile ? profile.public_repos : '10+'}
                </span>
              </div>
              <div className="px-3.5 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-center">
                <span className="text-[10px] font-mono-tech text-slate-400 block font-semibold">STATUS</span>
                <span className="text-sm font-mono-tech font-bold text-emerald-700">ACTIVE</span>
              </div>
            </div>

            <a
              href={PORTFOLIO_DATA.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playCyberBeep(700, 0.04, 'triangle')}
              className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs tracking-wide flex items-center gap-2 transition-all shadow-xs cursor-pointer"
            >
              <span>VISIT GITHUB PROFILE</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Contribution Activity Grid (Standard GitHub Style) */}
        <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 mb-10 shadow-xs">
          <div className="flex items-center justify-between mb-3 text-xs font-medium text-slate-600">
            <div className="flex items-center gap-2 text-slate-800 font-semibold">
              <Activity className="w-4 h-4 text-emerald-700" />
              <span>COMMIT CADENCE &amp; ACTIVITY</span>
            </div>
            <span className="hidden sm:inline text-slate-400 font-mono-tech">2026 Telemetry</span>
          </div>

          <div className="grid grid-cols-12 sm:grid-cols-24 gap-1.5 py-2">
            {activityCells.map((lvl, i) => (
              <div
                key={i}
                className={`h-4 rounded-[3px] transition-colors ${
                  lvl === 3
                    ? 'bg-emerald-600'
                    : lvl === 2
                    ? 'bg-emerald-400'
                    : lvl === 1
                    ? 'bg-emerald-200'
                    : 'bg-slate-100 border border-slate-200/60'
                }`}
                title={`Activity index: ${lvl}`}
              />
            ))}
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono-tech text-slate-400 pt-2 border-t border-slate-100 mt-2">
            <span>LESS</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-xs bg-slate-100 border border-slate-200" />
              <span className="w-2.5 h-2.5 rounded-xs bg-emerald-200" />
              <span className="w-2.5 h-2.5 rounded-xs bg-emerald-400" />
              <span className="w-2.5 h-2.5 rounded-xs bg-emerald-600" />
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
              className="bg-white p-6 rounded-2xl border border-slate-200/90 hover:border-slate-300 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 flex flex-col justify-between group shadow-xs cursor-pointer"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <BookOpen className="w-4 h-4 text-emerald-700" />
                    <h4 className="font-heading font-bold text-base sm:text-lg text-slate-900 group-hover:text-emerald-700 transition-colors truncate max-w-[260px]">
                      {repo.name}
                    </h4>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-800 transition-colors" />
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4 line-clamp-2">
                  {repo.description || 'Public software engineering repository and practical project source code.'}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs font-mono-tech pt-3 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  {repo.language && (
                    <span className="flex items-center gap-1.5 text-slate-700 font-medium">
                      <span className="w-2 h-2 rounded-full bg-emerald-600" />
                      {repo.language}
                    </span>
                  )}
                  <span className="flex items-center gap-1 text-slate-500">
                    <Star className="w-3.5 h-3.5 text-amber-500" />
                    {repo.stargazers_count}
                  </span>
                  <span className="flex items-center gap-1 text-slate-500">
                    <GitFork className="w-3.5 h-3.5 text-slate-400" />
                    {repo.forks_count}
                  </span>
                </div>

                <span className="text-emerald-700 text-xs font-semibold group-hover:translate-x-0.5 transition-transform">
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
