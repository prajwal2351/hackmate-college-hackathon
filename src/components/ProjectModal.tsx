import React, { useState } from 'react';
import { Project } from '../types';
import { X, ExternalLink, Star, Users, UserCheck, Send, Check } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onStar: (projectId: string) => void;
  isStarred: boolean;
  onApply: (projectId: string, applicantName: string, role: string, note: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onStar,
  isStarred,
  onApply,
}) => {
  const [applicantName, setApplicantName] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [applicationNote, setApplicationNote] = useState('');
  const [applied, setApplied] = useState(false);

  if (!project) return null;

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName || !selectedRole) return;
    onApply(project.id, applicantName, selectedRole, applicationNote);
    setApplied(true);
  };

  const spotsLeft = project.maxTeamSize - project.teamSize;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-xl border border-neutral-800 bg-neutral-900 p-6 sm:p-8 shadow-2xl my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 rounded-lg border border-neutral-800 p-1.5 text-neutral-400 hover:border-neutral-700 hover:text-white transition-colors"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header Metadata (Clean unboxed metadata) */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-neutral-400">
          <span className="font-medium text-cyan-400">{project.category}</span>
          <span aria-hidden="true">·</span>
          <span>Added {project.createdAt}</span>
          <span aria-hidden="true">·</span>
          <span className="flex items-center gap-1 text-neutral-300">
            <Users className="h-3.5 w-3.5" />
            {project.teamSize}/{project.maxTeamSize} Members
          </span>
          {spotsLeft > 0 ? (
            <>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-400">{spotsLeft} spot{spotsLeft > 1 ? 's' : ''} open</span>
            </>
          ) : (
            <>
              <span aria-hidden="true">·</span>
              <span className="text-neutral-500">Squad Full</span>
            </>
          )}
        </div>

        {/* Project Title & Tagline */}
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-neutral-100 font-display">
          {project.title}
        </h2>
        <p className="mt-2 text-sm text-neutral-300 leading-relaxed">
          {project.tagline}
        </p>

        {/* Project Sections */}
        <div className="mt-6 space-y-5 text-sm">
          {/* Problem Statement */}
          <div className="rounded-lg border border-neutral-800/80 bg-neutral-950/60 p-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              The Problem
            </h4>
            <p className="mt-1.5 text-xs sm:text-sm text-neutral-300 leading-relaxed">
              {project.problem}
            </p>
          </div>

          {/* Solution */}
          <div className="rounded-lg border border-neutral-800/80 bg-neutral-950/60 p-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              Proposed Solution & Prototype
            </h4>
            <p className="mt-1.5 text-xs sm:text-sm text-neutral-300 leading-relaxed">
              {project.solution}
            </p>
          </div>

          {/* Tech Stack */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">
              Technology Architecture
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-md border border-neutral-800 bg-neutral-950 px-2.5 py-1 text-xs font-mono text-neutral-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Team Lead & Open Roles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="rounded-lg border border-neutral-800/80 bg-neutral-950/40 p-3.5">
              <span className="text-xs text-neutral-400">Team Lead & Founder</span>
              <div className="mt-2 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-300 font-semibold text-xs border border-indigo-500/30">
                  {project.leader.avatar}
                </div>
                <div>
                  <p className="text-xs font-medium text-neutral-100">{project.leader.name}</p>
                  <p className="text-xs text-neutral-400">{project.leader.college}</p>
                </div>
              </div>
            </div>

            <div className="rounded-lg border border-neutral-800/80 bg-neutral-950/40 p-3.5">
              <span className="text-xs text-neutral-400">Open Squad Roles Needed</span>
              <div className="mt-2">
                {project.openRoles.length > 0 ? (
                  <ul className="space-y-1 text-xs text-cyan-300">
                    {project.openRoles.map((role) => (
                      <li key={role} className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />
                        <span>{role}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-neutral-500">Roster currently locked.</p>
                )}
              </div>
            </div>
          </div>

          {/* External links & Bookmarking */}
          <div className="flex items-center justify-between pt-2 border-t border-neutral-800">
            <div className="flex items-center gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-neutral-200 transition-colors"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  <span>GitHub Repository</span>
                </a>
              )}
            </div>

            <button
              onClick={() => onStar(project.id)}
              className={`inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-xs transition-colors ${
                isStarred
                  ? 'border-amber-500/50 bg-amber-500/10 text-amber-300'
                  : 'border-neutral-800 text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Star className={`h-3.5 w-3.5 ${isStarred ? 'fill-amber-400 text-amber-400' : ''}`} />
              <span>{isStarred ? 'Starred' : 'Star Idea'}</span>
              <span className="font-mono tabular-nums text-neutral-500">
                ({project.stars + (isStarred ? 1 : 0)})
              </span>
            </button>
          </div>

          {/* Join Squad Form */}
          {spotsLeft > 0 && (
            <div className="mt-4 rounded-lg border border-cyan-500/30 bg-cyan-950/20 p-4">
              <h4 className="text-xs font-semibold text-cyan-300 flex items-center gap-1.5">
                <UserCheck className="h-4 w-4" />
                <span>Request to Join {project.title} Squad</span>
              </h4>

              {applied ? (
                <div className="mt-3 flex items-center gap-2 text-xs font-medium text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 rounded-md p-3">
                  <Check className="h-4 w-4" />
                  <span>Application sent to {project.leader.name}! They will review your profile.</span>
                </div>
              ) : (
                <form onSubmit={handleApplySubmit} className="mt-3 space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs text-neutral-400 mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        value={applicantName}
                        onChange={(e) => setApplicantName(e.target.value)}
                        placeholder="e.g. Alex Rivera"
                        className="w-full rounded-md border border-neutral-800 bg-neutral-900 px-3 py-1.5 text-xs text-neutral-200 focus:border-cyan-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-neutral-400 mb-1">Applying For Role</label>
                      <select
                        required
                        value={selectedRole}
                        onChange={(e) => setSelectedRole(e.target.value)}
                        className="w-full rounded-md border border-neutral-800 bg-neutral-900 px-3 py-1.5 text-xs text-neutral-200 focus:border-cyan-500 focus:outline-none"
                      >
                        <option value="">Select a role...</option>
                        {project.openRoles.length > 0 ? (
                          project.openRoles.map((r) => (
                            <option key={r} value={r}>
                              {r}
                            </option>
                          ))
                        ) : (
                          <>
                            <option value="Frontend Engineer">Frontend Engineer</option>
                            <option value="Backend Engineer">Backend Engineer</option>
                            <option value="AI/ML Specialist">AI/ML Specialist</option>
                            <option value="Product / Pitch Specialist">Product / Pitch Specialist</option>
                          </>
                        )}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs text-neutral-400 mb-1">
                      Quick Note (What will you build during the 36 hours?)
                    </label>
                    <textarea
                      rows={2}
                      value={applicationNote}
                      onChange={(e) => setApplicationNote(e.target.value)}
                      placeholder="Share your relevant past projects or GitHub handle..."
                      className="w-full rounded-md border border-neutral-800 bg-neutral-900 px-3 py-1.5 text-xs text-neutral-200 focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-1.5 rounded-md bg-cyan-500 px-4 py-2 text-xs font-semibold text-neutral-950 hover:bg-cyan-400 transition-colors w-full sm:w-auto"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>Send Squad Application</span>
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
