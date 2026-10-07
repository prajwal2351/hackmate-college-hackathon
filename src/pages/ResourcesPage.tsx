import React, { useState } from 'react';
import { ResourceItem } from '../types';
import { RESOURCES } from '../data/mockData';
import { 
  Copy, 
  Check, 
  ExternalLink, 
  Calculator, 
  Presentation, 
  Code2, 
  Cpu, 
  Layers, 
  Sparkles,
  BookOpen
} from 'lucide-react';

interface ResourcesPageProps {
  onShowToast: (message: string) => void;
}

export const ResourcesPage: React.FC<ResourcesPageProps> = ({ onShowToast }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Rubric calculator states
  const [techScore, setTechScore] = useState(22);
  const [innovationScore, setInnovationScore] = useState(24);
  const [designScore, setDesignScore] = useState(20);
  const [impactScore, setImpactScore] = useState(21);

  const totalScore = techScore + innovationScore + designScore + impactScore;

  const handleCopyCommand = (command: string, id: string) => {
    navigator.clipboard.writeText(command);
    setCopiedId(id);
    onShowToast(`Copied clone command to clipboard!`);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const getRubricVerdict = (score: number) => {
    if (score >= 90) return { label: 'Top 3 Finalist Contender', color: 'text-emerald-400', desc: 'Outstanding technical depth, crisp UX, and real commercial potential.' };
    if (score >= 75) return { label: 'Strong Honorable Mention', color: 'text-cyan-400', desc: 'Solid execution. Polish your live pitch demo flow to stand out.' };
    return { label: 'Needs Polish Before Code Freeze', color: 'text-amber-400', desc: 'Focus on 1 core working feature rather than 5 half-finished tabs.' };
  };

  const verdict = getRubricVerdict(totalScore);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-12">
      {/* Header */}
      <div className="border-b border-neutral-850 pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Hackathon Accelerator Toolkit</span>
        </div>
        <h1 className="mt-1 font-display text-3xl font-extrabold tracking-tight text-neutral-100">
          Developer Resources & Starter Kits
        </h1>
        <p className="mt-1 text-sm text-neutral-400">
          Pre-tested boilerplates, free sponsor API credits, presentation pitch guidelines, and an interactive judging rubric evaluator.
        </p>
      </div>

      {/* 1. Curated Boilerplates & Starter Repos */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-display text-xl font-bold text-neutral-100 flex items-center gap-2">
              <Code2 className="h-5 w-5 text-cyan-400" />
              <span>Production Boilerplates & Free Student APIs</span>
            </h2>
            <p className="mt-1 text-xs text-neutral-400">
              Skip setup overhead. Clone these verified repos to deploy working endpoints in minutes.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {RESOURCES.map((item) => (
            <div
              key={item.id}
              className="rounded-xl border border-neutral-800/80 bg-neutral-900/60 p-5 flex flex-col justify-between hover:border-cyan-500/30 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-neutral-400 mb-2">
                  <span className="font-medium text-cyan-400">{item.category}</span>
                  {item.badge && (
                    <span className="text-[11px] font-mono text-neutral-400">
                      {item.badge}
                    </span>
                  )}
                </div>

                <h3 className="font-display text-base font-bold text-neutral-100">
                  {item.title}
                </h3>
                <p className="mt-2 text-xs text-neutral-400 leading-relaxed">
                  {item.description}
                </p>

                {/* Tags */}
                <div className="mt-3 flex flex-wrap gap-1">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded border border-neutral-800 bg-neutral-950 px-2 py-0.5 text-[10px] font-mono text-neutral-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-5 pt-3 border-t border-neutral-800/80">
                {item.command ? (
                  <button
                    onClick={() => handleCopyCommand(item.command!, item.id)}
                    className="flex w-full items-center justify-center gap-1.5 rounded-md bg-neutral-800 px-3 py-2 text-xs font-medium text-neutral-200 hover:bg-neutral-700 transition-colors"
                  >
                    {copiedId === item.id ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Command Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5 text-neutral-400" />
                        <span>Copy Terminal Clone Command</span>
                      </>
                    )}
                  </button>
                ) : (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-center gap-1.5 rounded-md bg-neutral-800 px-3 py-2 text-xs font-medium text-neutral-200 hover:bg-neutral-700 transition-colors"
                  >
                    <span>{item.linkText}</span>
                    <ExternalLink className="h-3.5 w-3.5 text-neutral-400" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Interactive Judging Rubric Calculator */}
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/40 p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-neutral-800 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-cyan-400 font-medium">
              <Calculator className="h-4 w-4" />
              <span>Self-Assessment Simulator</span>
            </div>
            <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-neutral-100">
              Interactive Hackathon Judging Rubric
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-neutral-400 max-w-xl">
              Calibrated against standard Major League Hacking (MLH) and Stanford TreeHacks scorecards. Slide each metric to test your squad's competitive viability.
            </p>
          </div>

          {/* Big Score Dial */}
          <div className="flex items-center gap-4 bg-neutral-950 p-4 rounded-xl border border-neutral-800">
            <div>
              <p className="text-xs text-neutral-400 uppercase tracking-wider">Simulated Total</p>
              <div className="flex items-baseline gap-1">
                <span className="font-mono text-4xl font-extrabold tabular-nums text-neutral-100">
                  {totalScore}
                </span>
                <span className="text-sm font-mono text-neutral-500">/ 100</span>
              </div>
            </div>
            <div className="border-l border-neutral-800 pl-4">
              <p className={`text-xs font-semibold ${verdict.color}`}>
                {verdict.label}
              </p>
              <p className="text-[11px] text-neutral-400 max-w-[200px]">
                {verdict.desc}
              </p>
            </div>
          </div>
        </div>

        {/* 4 Sliders */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Tech Complexity */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-semibold text-neutral-200">
                1. Technical Complexity & Architecture
              </label>
              <span className="font-mono tabular-nums text-cyan-400 font-bold">
                {techScore} / 25
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="25"
              value={techScore}
              onChange={(e) => setTechScore(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
            <p className="text-[11px] text-neutral-400 leading-relaxed">
              Are you implementing real ML inference, webhooks, or smart contracts rather than simple static mocked JSON?
            </p>
          </div>

          {/* Innovation & Novelty */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-semibold text-neutral-200">
                2. Innovation & Originality
              </label>
              <span className="font-mono tabular-nums text-cyan-400 font-bold">
                {innovationScore} / 25
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="25"
              value={innovationScore}
              onChange={(e) => setInnovationScore(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
            <p className="text-[11px] text-neutral-400 leading-relaxed">
              Is this addressing a fresh problem angle or another generic todo list app? Does it challenge existing workflows?
            </p>
          </div>

          {/* Design & UX */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-semibold text-neutral-200">
                3. Design, Fluidity & User Experience
              </label>
              <span className="font-mono tabular-nums text-cyan-400 font-bold">
                {designScore} / 25
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="25"
              value={designScore}
              onChange={(e) => setDesignScore(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
            <p className="text-[11px] text-neutral-400 leading-relaxed">
              Can a judge understand how to use your prototype within 5 seconds without instructions?
            </p>
          </div>

          {/* Real-World Impact */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label className="font-semibold text-neutral-200">
                4. Real-World Practical Impact & Viability
              </label>
              <span className="font-mono tabular-nums text-cyan-400 font-bold">
                {impactScore} / 25
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="25"
              value={impactScore}
              onChange={(e) => setImpactScore(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
            <p className="text-[11px] text-neutral-400 leading-relaxed">
              Does this solve a genuine pain point for a defined user base (students, clinics, cities, researchers)?
            </p>
          </div>
        </div>
      </div>

      {/* 3. The 3-Minute Hackathon Demo Formula */}
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 sm:p-8">
        <div className="max-w-2xl">
          <div className="flex items-center gap-2 text-xs text-cyan-400 font-medium">
            <Presentation className="h-4 w-4" />
            <span>Championship Presentation Playbook</span>
          </div>
          <h2 className="mt-1 font-display text-2xl font-bold tracking-tight text-neutral-100">
            The Winning 3-Minute Demo Formula
          </h2>
          <p className="mt-1 text-xs text-neutral-400">
            Judges listen to 40+ pitches consecutively. Win their attention by following this exact 180-second clock:
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-4">
            <div className="font-mono text-xs text-cyan-400 font-semibold mb-1">
              00:00 - 00:30 (30s)
            </div>
            <h4 className="font-display text-sm font-bold text-neutral-100">
              The Real-World Hook
            </h4>
            <p className="mt-2 text-xs text-neutral-400 leading-relaxed">
              Lead with a human story or alarming quantitative statistic. Never start with "Hi, we built an app using React".
            </p>
          </div>

          <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-4">
            <div className="font-mono text-xs text-cyan-400 font-semibold mb-1">
              00:30 - 02:00 (90s)
            </div>
            <h4 className="font-display text-sm font-bold text-neutral-100">
              The Live Working Demo
            </h4>
            <p className="mt-2 text-xs text-neutral-400 leading-relaxed">
              Show the magic moment! Execute the core user flow on screen. Have a backup screen recording ready in case of Wi-Fi drops.
            </p>
          </div>

          <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-4">
            <div className="font-mono text-xs text-cyan-400 font-semibold mb-1">
              02:00 - 02:30 (30s)
            </div>
            <h4 className="font-display text-sm font-bold text-neutral-100">
              Technical Architecture
            </h4>
            <p className="mt-2 text-xs text-neutral-400 leading-relaxed">
              Display a concise system architecture slide highlighting your APIs, custom models, and latency handling.
            </p>
          </div>

          <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-4">
            <div className="font-mono text-xs text-cyan-400 font-semibold mb-1">
              02:30 - 03:00 (30s)
            </div>
            <h4 className="font-display text-sm font-bold text-neutral-100">
              Next Steps & Defense
            </h4>
            <p className="mt-2 text-xs text-neutral-400 leading-relaxed">
              Outline 1 concrete next step if awarded grant funding. Leave remaining time open for energetic judge questions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
