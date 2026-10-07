import React, { useState, useMemo } from 'react';
import { Project, ProjectCategory } from '../types';
import { ProjectCard } from '../components/ProjectCard';
import { Search, Plus, Filter, Sparkles, X, SlidersHorizontal } from 'lucide-react';

interface ProjectsPageProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onStarProject: (id: string) => void;
  starredProjectIds: Set<string>;
  onOpenCreateProject: () => void;
  onRequestJoinProject: (project: Project) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  projects,
  onSelectProject,
  onStarProject,
  starredProjectIds,
  onOpenCreateProject,
  onRequestJoinProject,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Seeking Teammates' | 'Team Full'>('All');
  const [sortBy, setSortBy] = useState<'stars' | 'newest' | 'spots'>('stars');

  const categories: ProjectCategory[] = [
    'All',
    'AI & Machine Learning',
    'HealthTech & Bio',
    'Web3 & Fintech',
    'EdTech & Learning',
    'CyberSecurity',
    'Climate & Sustainability',
    'Open Innovation',
  ];

  // Real-time filtering
  const filteredProjects = useMemo(() => {
    return projects
      .filter((project) => {
        // Search query match
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          const matchesTitle = project.title.toLowerCase().includes(query);
          const matchesTagline = project.tagline.toLowerCase().includes(query);
          const matchesProblem = project.problem.toLowerCase().includes(query);
          const matchesTech = project.techStack.some((t) => t.toLowerCase().includes(query));
          const matchesRoles = project.openRoles.some((r) => r.toLowerCase().includes(query));
          if (!matchesTitle && !matchesTagline && !matchesProblem && !matchesTech && !matchesRoles) {
            return false;
          }
        }

        // Category filter
        if (selectedCategory !== 'All' && project.category !== selectedCategory) {
          return false;
        }

        // Status filter
        if (statusFilter !== 'All' && project.status !== statusFilter) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'stars') {
          return b.stars - a.stars;
        }
        if (sortBy === 'spots') {
          const spotsA = a.maxTeamSize - a.teamSize;
          const spotsB = b.maxTeamSize - b.teamSize;
          return spotsB - spotsA;
        }
        return 0; // Newest keeps insertion/mock order
      });
  }, [projects, searchQuery, selectedCategory, statusFilter, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setStatusFilter('All');
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Header & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-850 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Collegiate Project Repository</span>
          </div>
          <h1 className="mt-1 font-display text-3xl font-extrabold tracking-tight text-neutral-100">
            Hackathon Projects & Ideas
          </h1>
          <p className="mt-1 text-sm text-neutral-400">
            Discover ongoing initiatives, explore problem statements, and join teams before registration closes.
          </p>
        </div>

        <button
          onClick={onOpenCreateProject}
          className="flex items-center justify-center gap-2 rounded-lg bg-cyan-500 px-4 py-2.5 text-xs font-semibold text-neutral-950 hover:bg-cyan-400 transition-all active:scale-95 whitespace-nowrap shadow-md shadow-cyan-500/10"
        >
          <Plus className="h-4 w-4" />
          <span>Post Your Idea</span>
        </button>
      </div>

      {/* Search & Control Bar */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Real-time Search input */}
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects by title, tech stack (e.g. Python, React), or open roles..."
              className="w-full rounded-lg border border-neutral-800 bg-neutral-900/90 pl-10 pr-10 py-2.5 text-xs sm:text-sm text-neutral-100 placeholder-neutral-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2.5 text-xs text-neutral-300 focus:border-cyan-500 focus:outline-none"
            >
              <option value="All">All Squad Statuses</option>
              <option value="Seeking Teammates">Seeking Teammates</option>
              <option value="Team Full">Team Full</option>
            </select>

            {/* Sort by */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2.5 text-xs text-neutral-300 focus:border-cyan-500 focus:outline-none"
            >
              <option value="stars">Most Starred</option>
              <option value="spots">Most Open Spots</option>
              <option value="newest">Recently Posted</option>
            </select>
          </div>
        </div>

        {/* Category Filter Tabs (Interactive Segmented Buttons) */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-900/60 border border-neutral-800/80 rounded-xl overflow-x-auto">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap ${
                  isSelected
                    ? 'bg-neutral-800 text-cyan-400 font-semibold shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-850'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Header Count & Active Filters Indicator */}
      <div className="flex items-center justify-between text-xs text-neutral-400">
        <div className="flex items-center gap-2">
          <span>
            Showing <strong className="font-mono text-neutral-200">{filteredProjects.length}</strong> project{filteredProjects.length === 1 ? '' : 's'}
          </span>
          {(searchQuery || selectedCategory !== 'All' || statusFilter !== 'All') && (
            <>
              <span>·</span>
              <button
                onClick={clearFilters}
                className="text-cyan-400 hover:underline"
              >
                Clear all filters
              </button>
            </>
          )}
        </div>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
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
      ) : (
        <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-12 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-neutral-800 text-neutral-400 mb-4">
            <Search className="h-6 w-6" />
          </div>
          <h3 className="font-display text-lg font-bold text-neutral-200">
            No matching projects found
          </h3>
          <p className="mt-1 text-xs text-neutral-400 max-w-sm mx-auto">
            Try adjusting your search keywords or filter settings, or be the first to publish a project in this track!
          </p>
          <div className="mt-5 flex items-center justify-center gap-3">
            <button
              onClick={clearFilters}
              className="rounded-lg border border-neutral-800 bg-neutral-800 px-3.5 py-2 text-xs font-medium text-neutral-200 hover:bg-neutral-750"
            >
              Reset Filters
            </button>
            <button
              onClick={onOpenCreateProject}
              className="rounded-lg bg-cyan-500 px-3.5 py-2 text-xs font-semibold text-neutral-950 hover:bg-cyan-400"
            >
              Post This Idea
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
