import React, { useState, useEffect } from 'react';
import { PageType, Project, TeamMember } from '../types';
import { HACKATHON_TRACKS, TIMELINE_MILESTONES } from '../data/mockData';
import { ProjectCard } from '../components/ProjectCard';
import { 
  ArrowRight, 
  Users, 
  Sparkles, 
  Code2, 
  Trophy, 
  Clock, 
  Compass, 
  Cpu, 
  ShieldCheck, 
  CheckCircle2, 
  ExternalLink 
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageType) => void;
  featuredProjects: Project[];
  members: TeamMember[];
  onSelectProject: (project: Project) => void;
  onStarProject: (id: string) => void;
  starredProjectIds: Set<string>;
  onOpenCreateProject: () => void;
  onRequestJoinProject: (project: Project) => void;
  onOpenInvite: (member: TeamMember) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  featuredProjects,
  members,
  onSelectProject,
  onStarProject,
  starredProjectIds,
  onOpenCreateProject,
  onRequestJoinProject,
  onOpenInvite,
}) => {
  // Hackathon Countdown State
  const [timeLeft, setTimeLeft] = useState({
    days: 14,
    hours: 8,
    minutes: 42,
    seconds: 19,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 sm:pt-20 lg:pt-24 overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-500/10 via-indigo-500/10 to-transparent blur-3xl pointer-events-none rounded-full" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Eyebrow kicker */}
          <div className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-900/80 px-3.5 py-1 text-xs text-neutral-300 backdrop-blur-md mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span>Spring 2026 Collegiate Hackathon Hub</span>
            <span className="text-neutral-500">·</span>
            <span className="text-cyan-400 font-medium">$45,000 In Prizes</span>
          </div>

          {/* Balanced Display Headline */}
          <h1 className="mx-auto max-w-4xl font-display text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-neutral-100 text-balance leading-[1.08]">
            Find hackathon ideas. <br className="hidden sm:inline" />
            Form dream teams. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              Ship winning prototypes.
            </span>
          </h1>

          {/* Value Proposition */}
          <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-neutral-400 leading-relaxed text-balance">
            HackMate eliminates the friction of finding high-impact ideas and complementary teammates. Match with student engineers, designers, and researchers across top universities.
          </p>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => onNavigate('projects')}
              className="flex items-center gap-2 rounded-lg bg-cyan-500 px-5 py-3 text-sm font-semibold text-neutral-950 transition-all hover:bg-cyan-400 active:scale-95 shadow-lg shadow-cyan-500/20"
            >
              <span>Explore Projects</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              onClick={() => onNavigate('team')}
              className="flex items-center gap-2 rounded-lg border border-neutral-800 bg-neutral-900/90 px-5 py-3 text-sm font-semibold text-neutral-200 transition-colors hover:border-neutral-700 hover:text-white"
            >
              <Users className="h-4 w-4 text-cyan-400" />
              <span>Find Teammates</span>
            </button>

            <button
              onClick={onOpenCreateProject}
              className="flex items-center gap-2 rounded-lg border border-cyan-500/30 bg-cyan-950/20 px-4 py-3 text-sm font-semibold text-cyan-300 hover:bg-cyan-900/30 transition-colors"
            >
              <Sparkles className="h-4 w-4" />
              <span>Post Your Idea</span>
            </button>
          </div>

          {/* Live Hackathon Countdown Box */}
          <div className="mx-auto mt-12 max-w-xl rounded-xl border border-neutral-800/80 bg-neutral-900/60 p-4 sm:p-5 backdrop-blur-md">
            <div className="flex items-center justify-between text-xs text-neutral-400 mb-3 px-1">
              <span className="flex items-center gap-1.5 font-medium text-neutral-300">
                <Clock className="h-3.5 w-3.5 text-cyan-400" />
                <span>Next Hackathon Code Freeze Countdown</span>
              </span>
              <span className="text-neutral-500">Live Sync</span>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="rounded-lg bg-neutral-950/80 p-2.5 border border-neutral-800/60">
                <div className="font-mono text-2xl sm:text-3xl font-bold tabular-nums text-neutral-100">
                  {String(timeLeft.days).padStart(2, '0')}
                </div>
                <div className="mt-1 text-[11px] text-neutral-500 uppercase tracking-wider">Days</div>
              </div>
              <div className="rounded-lg bg-neutral-950/80 p-2.5 border border-neutral-800/60">
                <div className="font-mono text-2xl sm:text-3xl font-bold tabular-nums text-neutral-100">
                  {String(timeLeft.hours).padStart(2, '0')}
                </div>
                <div className="mt-1 text-[11px] text-neutral-500 uppercase tracking-wider">Hours</div>
              </div>
              <div className="rounded-lg bg-neutral-950/80 p-2.5 border border-neutral-800/60">
                <div className="font-mono text-2xl sm:text-3xl font-bold tabular-nums text-neutral-100">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </div>
                <div className="mt-1 text-[11px] text-neutral-500 uppercase tracking-wider">Mins</div>
              </div>
              <div className="rounded-lg bg-neutral-950/80 p-2.5 border border-neutral-800/60">
                <div className="font-mono text-2xl sm:text-3xl font-bold tabular-nums text-cyan-400">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </div>
                <div className="mt-1 text-[11px] text-neutral-500 uppercase tracking-wider">Secs</div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Platform Proof Numbers (Strict Tabular Numerals) */}
        <div className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 border-y border-neutral-850 py-8 sm:grid-cols-4 text-center">
            <div>
              <p className="font-mono text-3xl sm:text-4xl font-bold tabular-nums text-neutral-100">
                1,420<span className="text-cyan-400">+</span>
              </p>
              <p className="mt-1 text-xs text-neutral-400">Collegiate Hackers</p>
            </div>
            <div>
              <p className="font-mono text-3xl sm:text-4xl font-bold tabular-nums text-neutral-100">
                340<span className="text-cyan-400">+</span>
              </p>
              <p className="mt-1 text-xs text-neutral-400">Active Squads Formed</p>
            </div>
            <div>
              <p className="font-mono text-3xl sm:text-4xl font-bold tabular-nums text-neutral-100">
                $45,000
              </p>
              <p className="mt-1 text-xs text-neutral-400">Total Track Prizes</p>
            </div>
            <div>
              <p className="font-mono text-3xl sm:text-4xl font-bold tabular-nums text-neutral-100">
                84
              </p>
              <p className="mt-1 text-xs text-neutral-400">Shipped Prototypes</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CORE CAPABILITIES (Numbered Human Editorial Format) */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-neutral-100">
              The Hackathon Execution Engine
            </h2>
            <p className="mt-2 text-sm text-neutral-400 max-w-xl">
              Everything you need to go from zero ideas on Friday evening to an award-winning prototype on Sunday afternoon.
            </p>
          </div>
          <button
            onClick={() => onNavigate('resources')}
            className="mt-4 md:mt-0 inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 hover:text-cyan-300"
          >
            <span>Explore Developer Toolkit</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="rounded-xl border border-neutral-850 bg-neutral-900/40 p-6 flex flex-col justify-between hover:border-neutral-750 transition-colors">
            <div>
              <span className="font-mono text-xs font-semibold text-cyan-400">01.</span>
              <h3 className="mt-2 font-display text-lg font-bold text-neutral-100">
                Idea Discovery & Tracks
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-neutral-400">
                Browse pre-vetted problem statements across AI, BioTech, Web3, and Climate with clear technical scope constraints.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-850 text-xs text-neutral-400 flex items-center justify-between">
              <span>Filter by Difficulty</span>
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            </div>
          </div>

          <div className="rounded-xl border border-neutral-850 bg-neutral-900/40 p-6 flex flex-col justify-between hover:border-neutral-750 transition-colors">
            <div>
              <span className="font-mono text-xs font-semibold text-cyan-400">02.</span>
              <h3 className="mt-2 font-display text-lg font-bold text-neutral-100">
                Skill Matchmaking
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-neutral-400">
                No more lone wolf hacking. Match with teammates based on complementary gaps: Frontend, ML Engineer, UI/UX, and Pitch Lead.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-850 text-xs text-neutral-400 flex items-center justify-between">
              <span>Role Spot Management</span>
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            </div>
          </div>

          <div className="rounded-xl border border-neutral-850 bg-neutral-900/40 p-6 flex flex-col justify-between hover:border-neutral-750 transition-colors">
            <div>
              <span className="font-mono text-xs font-semibold text-cyan-400">03.</span>
              <h3 className="mt-2 font-display text-lg font-bold text-neutral-100">
                Curated Boilerplates
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-neutral-400">
                Stop wrestling setup scripts. One-click clone battle-tested Vite, FastAPI, Supabase, and LangChain starter templates.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-850 text-xs text-neutral-400 flex items-center justify-between">
              <span>Zero-Config Scaffolds</span>
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            </div>
          </div>

          <div className="rounded-xl border border-neutral-850 bg-neutral-900/40 p-6 flex flex-col justify-between hover:border-neutral-750 transition-colors">
            <div>
              <span className="font-mono text-xs font-semibold text-cyan-400">04.</span>
              <h3 className="mt-2 font-display text-lg font-bold text-neutral-100">
                Pitch Formula & Rubrics
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-neutral-400">
                Learn how winning teams secure first place with the 3-minute demo formula, judge rubric calculator, and slide decks.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-neutral-850 text-xs text-neutral-400 flex items-center justify-between">
              <span>Judge Rubric Testing</span>
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED HACKATHON PROJECTS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs text-cyan-400 font-medium">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Trending Across Campuses</span>
            </div>
            <h2 className="mt-1 font-display text-2xl sm:text-3xl font-bold tracking-tight text-neutral-100">
              Projects Seeking Teammates
            </h2>
          </div>

          <div className="mt-3 sm:mt-0 flex items-center gap-3">
            <button
              onClick={() => onNavigate('projects')}
              className="inline-flex items-center gap-1 text-xs font-semibold text-cyan-400 hover:text-cyan-300"
            >
              <span>View All ({featuredProjects.length}+)</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.slice(0, 3).map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelect={onSelectProject}
              onStar={onStarProject}
              isStarred={starredProjectIds.has(project.id)}
              onRequestJoin={onRequestJoinProject}
            />
          ))}
        </div>
      </section>

      {/* 4. HACKATHON TRACKS & PRIZE POOLS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-neutral-100">
            Hackathon Competition Tracks
          </h2>
          <p className="mt-2 text-sm text-neutral-400">
            Submit your prototype into specialized industry tracks backed by premier technology partners.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {HACKATHON_TRACKS.map((track) => (
            <div
              key={track.title}
              className="group rounded-xl border border-neutral-800 bg-neutral-900/40 p-5 hover:border-cyan-500/40 hover:bg-neutral-900/70 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="font-mono text-xs font-semibold text-cyan-400 block mb-2">
                  {track.prize}
                </span>
                <h3 className="font-display text-sm font-bold text-neutral-100 group-hover:text-cyan-300 transition-colors">
                  {track.title}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-neutral-400">
                  {track.description}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-neutral-800/80 text-[11px] text-neutral-500">
                Partner: <span className="text-neutral-300">{track.sponsoredBy}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. TEAM MATCHMAKER TEASER */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-neutral-800 bg-gradient-to-b from-neutral-900/90 to-neutral-950 p-6 sm:p-10">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="max-w-xl">
              <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                Speed Networking
              </span>
              <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold tracking-tight text-neutral-100">
                Need a specific skill to complete your squad?
              </h2>
              <p className="mt-3 text-sm text-neutral-400 leading-relaxed">
                Browse hundreds of registered hackers filtered by university, role, past hackathon trophies, and preferred languages.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => onNavigate('team')}
                  className="rounded-lg bg-cyan-500 px-4 py-2.5 text-xs font-semibold text-neutral-950 hover:bg-cyan-400 transition-colors flex items-center gap-1.5"
                >
                  <Users className="h-4 w-4" />
                  <span>Browse Available Hackers</span>
                </button>
                <button
                  onClick={() => onNavigate('team')}
                  className="rounded-lg border border-neutral-800 bg-neutral-900 px-4 py-2.5 text-xs font-semibold text-neutral-200 hover:border-neutral-700 transition-colors"
                >
                  Post Your Profile
                </button>
              </div>
            </div>

            {/* Quick Preview cards of 2 candidates */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:max-w-lg w-full">
              {members.slice(0, 2).map((mem) => (
                <div
                  key={mem.id}
                  className="rounded-xl border border-neutral-800 bg-neutral-950 p-4 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="text-cyan-400 font-medium">{mem.role}</span>
                      <span className="font-mono text-[11px] text-neutral-500">{mem.hackathonWins} wins</span>
                    </div>
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 items-center justify-center rounded bg-indigo-500/20 text-indigo-300 font-semibold text-xs border border-indigo-500/30">
                        {mem.avatar}
                      </div>
                      <div>
                        <h4 className="text-xs font-semibold text-neutral-100">{mem.name}</h4>
                        <p className="text-[11px] text-neutral-400 truncate max-w-[140px]">
                          {mem.college.split('·')[0]}
                        </p>
                      </div>
                    </div>
                    <p className="mt-3 text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                      {mem.bio}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-neutral-850 flex items-center justify-between">
                    <span className="text-[11px] text-emerald-400 font-medium">{mem.availability}</span>
                    <button
                      onClick={() => onOpenInvite(mem)}
                      className="text-xs text-cyan-400 hover:text-cyan-300 font-medium"
                    >
                      Invite +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. 36-HOUR HACKATHON SCHEDULE TIMELINE */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-neutral-100">
            36-Hour Sprint Roadmap
          </h2>
          <p className="mt-2 text-sm text-neutral-400">
            How championship teams pace their time from kickoff to the final stage demo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {TIMELINE_MILESTONES.map((step, idx) => (
            <div
              key={step.time}
              className="relative rounded-xl border border-neutral-850 bg-neutral-900/30 p-5 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-cyan-400 font-mono mb-2">
                  <span>{step.time}</span>
                  <span className="text-neutral-600">0{idx + 1}</span>
                </div>
                <h4 className="font-display text-sm font-semibold text-neutral-100">
                  {step.title}
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-neutral-400">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. FINAL CALL TO ACTION */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-neutral-900 via-neutral-900 to-cyan-950/40 p-8 sm:p-12 text-center">
          <div className="mx-auto max-w-2xl">
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-neutral-100">
              Ready to ship something unforgettable?
            </h2>
            <p className="mt-3 text-sm text-neutral-300 leading-relaxed">
              Join students from over 40 universities. Post your hackathon idea or request to join a squad today.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={onOpenCreateProject}
                className="rounded-lg bg-cyan-500 px-5 py-2.5 text-xs font-semibold text-neutral-950 hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20"
              >
                Submit Your Project Idea
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="rounded-lg border border-neutral-800 bg-neutral-950 px-5 py-2.5 text-xs font-semibold text-neutral-300 hover:text-white transition-colors"
              >
                Become a Mentor or Sponsor
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
