import React, { useState } from 'react';
import { TeamMember } from '../types';
import { X, UserPlus, Sparkles } from 'lucide-react';

interface PostProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (member: Omit<TeamMember, 'id'>) => void;
}

export const PostProfileModal: React.FC<PostProfileModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState<TeamMember['role']>('Frontend');
  const [college, setCollege] = useState('');
  const [graduationYear, setGraduationYear] = useState('Class of 2027');
  const [skillsInput, setSkillsInput] = useState('React, TypeScript, TailwindCSS, Next.js');
  const [bio, setBio] = useState('');
  const [hackathonWins, setHackathonWins] = useState(1);
  const [github, setGithub] = useState('');
  const [discord, setDiscord] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !college || !bio) return;

    const skills = skillsInput
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    const initials = name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2) || 'HM';

    const newMember: Omit<TeamMember, 'id'> = {
      name,
      avatar: initials,
      role,
      college,
      graduationYear,
      skills: skills.length > 0 ? skills : ['React', 'Python'],
      bio,
      availability: 'Ready to Join',
      hackathonWins,
      github: github || undefined,
      discord: discord || undefined,
    };

    onSubmit(newMember);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-lg rounded-xl border border-neutral-800 bg-neutral-900 p-6 sm:p-7 shadow-2xl my-8">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-lg border border-neutral-800 p-1.5 text-neutral-400 hover:border-neutral-700 hover:text-white"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-2 text-xs font-medium text-cyan-400">
          <Sparkles className="h-4 w-4" />
          <span>Hacker Directory</span>
        </div>

        <h3 className="mt-1 text-xl font-bold tracking-tight text-neutral-100 font-display">
          Post Your Teammate Profile
        </h3>
        <p className="mt-1 text-xs text-neutral-400">
          Make yourself discoverable to squads looking for your exact superpowers.
        </p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Jordan Lee"
                className="w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-1.5 text-xs text-neutral-100 placeholder-neutral-500 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                Primary Specialty *
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as TeamMember['role'])}
                className="w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-1.5 text-xs text-neutral-100 focus:border-cyan-500 focus:outline-none"
              >
                <option value="Frontend">Frontend Developer</option>
                <option value="Backend">Backend / Cloud Systems</option>
                <option value="AI / ML">AI / Machine Learning</option>
                <option value="UI / UX Design">UI / UX Designer</option>
                <option value="Mobile Dev">Mobile App Developer</option>
                <option value="Product / Pitch">Product & Pitch Lead</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                College / University & Major *
              </label>
              <input
                type="text"
                required
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                placeholder="e.g. UCLA · Electrical Eng"
                className="w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-1.5 text-xs text-neutral-100 placeholder-neutral-500 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                Graduation Year
              </label>
              <select
                value={graduationYear}
                onChange={(e) => setGraduationYear(e.target.value)}
                className="w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-1.5 text-xs text-neutral-100 focus:border-cyan-500 focus:outline-none"
              >
                <option value="Class of 2025">Class of 2025</option>
                <option value="Class of 2026">Class of 2026</option>
                <option value="Class of 2027">Class of 2027</option>
                <option value="Class of 2028">Class of 2028</option>
                <option value="Graduate / PhD">Graduate / PhD</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1">
              Top Skills & Frameworks (comma separated)
            </label>
            <input
              type="text"
              value={skillsInput}
              onChange={(e) => setSkillsInput(e.target.value)}
              placeholder="PyTorch, Docker, React, Tailwind, Solidity"
              className="w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-1.5 text-xs text-neutral-100 placeholder-neutral-500 focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1">
              Hacker Bio & What you want to build *
            </label>
            <textarea
              rows={3}
              required
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell squads what you love building, hackathons you attended, and what role you want to own."
              className="w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-1.5 text-xs text-neutral-100 placeholder-neutral-500 focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                GitHub or Portfolio Username
              </label>
              <input
                type="text"
                value={github}
                onChange={(e) => setGithub(e.target.value)}
                placeholder="github-handle"
                className="w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-1.5 text-xs text-neutral-100 placeholder-neutral-500 focus:border-cyan-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                Discord Tag
              </label>
              <input
                type="text"
                value={discord}
                onChange={(e) => setDiscord(e.target.value)}
                placeholder="handle#0000"
                className="w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-1.5 text-xs text-neutral-100 placeholder-neutral-500 focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-xs text-neutral-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded-md bg-cyan-500 px-4 py-2 text-xs font-semibold text-neutral-950 hover:bg-cyan-400"
            >
              <UserPlus className="h-4 w-4" />
              <span>Publish Hacker Profile</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
