import React from 'react';
import { Project } from '../types';
import { Users, Star, ArrowUpRight, UserPlus, Check } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
  onStar: (projectId: string) => void;
  isStarred: boolean;
  onRequestJoin: (project: Project) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onSelect,
  onStar,
  isStarred,
  onRequestJoin,
}) => {
  const spotsLeft = project.maxTeamSize - project.teamSize;

  return (
    <div className="group relative flex flex-col justify-between rounded-xl border border-neutral-800/80 bg-neutral-900/60 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-cyan-500/40 hover:bg-neutral-900/90 hover:shadow-xl hover:shadow-cyan-950/20">
      <div>
        {/* Top unboxed metadata */}
        <div className="flex items-center justify-between text-xs text-neutral-400">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-cyan-400">{project.category}</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>{project.createdAt}</span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onStar(project.id);
            }}
            className={`flex items-center gap-1 rounded-md px-2 py-1 text-xs transition-colors ${
              isStarred
                ? 'text-amber-400 bg-amber-500/10'
                : 'text-neutral-500 hover:text-neutral-300'
            }`}
            aria-label="Star this project"
          >
            <Star className={`h-3.5 w-3.5 ${isStarred ? 'fill-amber-400' : ''}`} />
            <span className="font-mono tabular-nums">{project.stars + (isStarred ? 1 : 0)}</span>
          </button>
        </div>

        {/* Project Title & Tagline */}
        <div className="mt-3">
          <h3
            onClick={() => onSelect(project)}
            className="font-display text-lg font-bold tracking-tight text-neutral-100 group-hover:text-cyan-300 transition-colors cursor-pointer"
          >
            {project.title}
          </h3>
          <p className="mt-2 text-xs leading-relaxed text-neutral-400 line-clamp-2">
            {project.tagline}
          </p>
        </div>

        {/* Tech Stack List */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="rounded border border-neutral-800 bg-neutral-950 px-2 py-0.5 text-[11px] font-mono text-neutral-300"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="rounded border border-neutral-800/60 bg-neutral-950/60 px-1.5 py-0.5 text-[10px] font-mono text-neutral-500">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>

        {/* Open Roles Preview */}
        <div className="mt-4 pt-3 border-t border-neutral-800/80">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-neutral-400 flex items-center gap-1.5">
              <Users className="h-3.5 w-3.5 text-neutral-500" />
              <span>
                {project.teamSize}/{project.maxTeamSize} Members
              </span>
            </span>
            {spotsLeft > 0 ? (
              <span className="text-emerald-400 font-medium">
                {spotsLeft} spot{spotsLeft > 1 ? 's' : ''} open
              </span>
            ) : (
              <span className="text-neutral-500">Roster full</span>
            )}
          </div>

          {project.openRoles.length > 0 ? (
            <p className="text-[11px] text-cyan-400/90 truncate">
              Needs: <span className="text-neutral-300">{project.openRoles.join(', ')}</span>
            </p>
          ) : (
            <p className="text-[11px] text-neutral-500">Ready for hacking phase</p>
          )}
        </div>
      </div>

      {/* Footer Card Actions */}
      <div className="mt-5 flex items-center justify-between pt-3 border-t border-neutral-800/80">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded bg-indigo-500/20 text-[10px] font-semibold text-indigo-300">
            {project.leader.avatar}
          </span>
          <span className="text-xs text-neutral-400 truncate max-w-[110px]">
            {project.leader.name}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {spotsLeft > 0 ? (
            <button
              onClick={() => onRequestJoin(project)}
              className="flex items-center gap-1 rounded-md bg-neutral-800 px-2.5 py-1 text-xs font-medium text-neutral-200 hover:bg-neutral-700 transition-colors"
            >
              <UserPlus className="h-3 w-3 text-cyan-400" />
              <span>Join</span>
            </button>
          ) : null}

          <button
            onClick={() => onSelect(project)}
            className="flex items-center gap-1 rounded-md bg-cyan-500/10 px-2.5 py-1 text-xs font-semibold text-cyan-400 hover:bg-cyan-500/20 transition-colors"
          >
            <span>Details</span>
            <ArrowUpRight className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
