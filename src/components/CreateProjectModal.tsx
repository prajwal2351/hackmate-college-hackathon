import React, { useState } from 'react';
import { Project, ProjectCategory } from '../types';
import { X, Plus, Sparkles, Check } from 'lucide-react';

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (project: Omit<Project, 'id' | 'createdAt' | 'stars'>) => void;
}

export const CreateProjectModal: React.FC<CreateProjectModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [category, setCategory] = useState<ProjectCategory>('AI & Machine Learning');
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState('');
  const [techInput, setTechInput] = useState('React, TypeScript, FastAPI, PostgreSQL');
  const [rolesInput, setRolesInput] = useState('Frontend Developer, ML Engineer');
  const [maxTeamSize, setMaxTeamSize] = useState(4);
  const [currentSize, setCurrentSize] = useState(1);
  const [leaderName, setLeaderName] = useState('');
  const [leaderCollege, setLeaderCollege] = useState('');
  const [leaderRole, setLeaderRole] = useState('Fullstack Lead');
  const [githubUrl, setGithubUrl] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !problem || !solution || !leaderName) return;

    const techStack = techInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    const openRoles = rolesInput
      .split(',')
      .map((r) => r.trim())
      .filter(Boolean);

    const initials = leaderName
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'LD';

    const newProject: Omit<Project, 'id' | 'createdAt' | 'stars'> = {
      title,
      tagline: tagline || title,
      category,
      problem,
      solution,
      techStack: techStack.length > 0 ? techStack : ['React', 'TypeScript'],
      teamSize: currentSize,
      maxTeamSize,
      leader: {
        name: leaderName,
        avatar: initials,
        role: leaderRole,
        college: leaderCollege || 'Student Hacker',
      },
      openRoles: currentSize < maxTeamSize ? openRoles : [],
      status: currentSize >= maxTeamSize ? 'Team Full' : 'Seeking Teammates',
      githubUrl: githubUrl || undefined,
    };

    onSubmit(newProject);
    onClose();
  };

  const categories: ProjectCategory[] = [
    'AI & Machine Learning',
    'HealthTech & Bio',
    'Web3 & Fintech',
    'EdTech & Learning',
    'CyberSecurity',
    'Climate & Sustainability',
    'Open Innovation',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-xl border border-neutral-800 bg-neutral-900 p-6 sm:p-8 shadow-2xl my-8">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-lg border border-neutral-800 p-1.5 text-neutral-400 hover:border-neutral-700 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-medium text-cyan-400">
          <Sparkles className="h-4 w-4" />
          <span>Launch Your Hackathon Squad</span>
        </div>

        <h2 className="mt-1 text-2xl font-bold tracking-tight text-neutral-100 font-display">
          Post Project or Idea
        </h2>
        <p className="mt-1 text-xs text-neutral-400">
          Publish your concept to find talented developers, designers, and domain specialists.
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                Project Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. BioFlow Neural Mesh"
                className="w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-neutral-100 placeholder-neutral-500 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                Hackathon Track / Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as ProjectCategory)}
                className="w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-neutral-100 focus:border-cyan-500 focus:outline-none"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1">
              Elevator Pitch / Tagline *
            </label>
            <input
              type="text"
              required
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              placeholder="e.g. Decentralized clinical study recruitment with cryptographic zero-knowledge proofs"
              className="w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-neutral-100 placeholder-neutral-500 focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                Problem Statement *
              </label>
              <textarea
                rows={3}
                required
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                placeholder="What core friction or obstacle are you addressing?"
                className="w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-neutral-100 placeholder-neutral-500 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                Proposed Hackathon Solution *
              </label>
              <textarea
                rows={3}
                required
                value={solution}
                onChange={(e) => setSolution(e.target.value)}
                placeholder="How does your prototype or technical solution solve it?"
                className="w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-neutral-100 placeholder-neutral-500 focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                Tech Stack (comma separated)
              </label>
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                placeholder="React, PyTorch, FastAPI, Supabase"
                className="w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-neutral-100 placeholder-neutral-500 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                Open Roles Needed (comma separated)
              </label>
              <input
                type="text"
                value={rolesInput}
                onChange={(e) => setRolesInput(e.target.value)}
                placeholder="Frontend Dev, UI/UX Designer, Pitch Lead"
                className="w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-neutral-100 placeholder-neutral-500 focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                Your Name (Team Lead) *
              </label>
              <input
                type="text"
                required
                value={leaderName}
                onChange={(e) => setLeaderName(e.target.value)}
                placeholder="e.g. Maya Chen"
                className="w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-neutral-100 placeholder-neutral-500 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                College / Major
              </label>
              <input
                type="text"
                value={leaderCollege}
                onChange={(e) => setLeaderCollege(e.target.value)}
                placeholder="e.g. Stanford University · CS"
                className="w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-neutral-100 placeholder-neutral-500 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                Current Team Size
              </label>
              <div className="flex items-center gap-2">
                <select
                  value={currentSize}
                  onChange={(e) => setCurrentSize(Number(e.target.value))}
                  className="w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-neutral-100 focus:border-cyan-500 focus:outline-none"
                >
                  <option value={1}>1 (Just me)</option>
                  <option value={2}>2 Members</option>
                  <option value={3}>3 Members</option>
                  <option value={4}>4 (Full squad)</option>
                </select>
                <span className="text-xs text-neutral-500">/ 4 max</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1">
              GitHub Repo or Pitch Deck Link (optional)
            </label>
            <input
              type="url"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              placeholder="https://github.com/your-username/your-hack-repo"
              className="w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-neutral-100 placeholder-neutral-500 focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div className="pt-3 border-t border-neutral-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md px-3.5 py-2 text-xs font-medium text-neutral-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded-md bg-cyan-500 px-4 py-2 text-xs font-semibold text-neutral-950 hover:bg-cyan-400 transition-colors"
            >
              <Plus className="h-4 w-4" />
              <span>Publish Hackathon Project</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
