import React, { useState, useMemo } from 'react';
import { TeamMember } from '../types';
import { Search, UserPlus, Trophy, Users, X, Github, Linkedin, MessageSquare, Check, Sparkles } from 'lucide-react';

interface TeamPageProps {
  members: TeamMember[];
  onOpenPostProfile: () => void;
  onOpenInvite: (member: TeamMember) => void;
  onShowToast: (message: string) => void;
}

export const TeamPage: React.FC<TeamPageProps> = ({
  members,
  onOpenPostProfile,
  onOpenInvite,
  onShowToast,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('All');
  const [availabilityFilter, setAvailabilityFilter] = useState<string>('All');

  const roleCategories = [
    'All',
    'Frontend',
    'Backend',
    'AI / ML',
    'UI / UX Design',
    'Mobile Dev',
    'Product / Pitch',
  ];

  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      // Search
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = member.name.toLowerCase().includes(query);
        const matchesCollege = member.college.toLowerCase().includes(query);
        const matchesBio = member.bio.toLowerCase().includes(query);
        const matchesSkills = member.skills.some((s) => s.toLowerCase().includes(query));
        if (!matchesName && !matchesCollege && !matchesBio && !matchesSkills) {
          return false;
        }
      }

      // Role filter
      if (selectedRole !== 'All' && member.role !== selectedRole) {
        return false;
      }

      // Availability filter
      if (availabilityFilter !== 'All' && member.availability !== availabilityFilter) {
        return false;
      }

      return true;
    });
  }, [members, searchQuery, selectedRole, availabilityFilter]);

  const copyContact = (contact: string, type: string) => {
    navigator.clipboard.writeText(contact);
    onShowToast(`Copied ${type} handle: ${contact}`);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-neutral-850 pb-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Collegiate Talent Matchmaker</span>
          </div>
          <h1 className="mt-1 font-display text-3xl font-extrabold tracking-tight text-neutral-100">
            Find Hackathon Teammates
          </h1>
          <p className="mt-1 text-sm text-neutral-400">
            Assemble a high-velocity squad with complementary skills in engineering, design, and product strategy.
          </p>
        </div>

        <button
          onClick={onOpenPostProfile}
          className="flex items-center justify-center gap-2 rounded-lg bg-cyan-500 px-4 py-2.5 text-xs font-semibold text-neutral-950 hover:bg-cyan-400 transition-all active:scale-95 whitespace-nowrap shadow-md shadow-cyan-500/10"
        >
          <UserPlus className="h-4 w-4" />
          <span>Post Your Profile</span>
        </button>
      </div>

      {/* Search & Filters */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search hackers by skill (e.g. PyTorch, Figma, Next.js), university, or name..."
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

          <div className="flex items-center gap-2">
            <select
              value={availabilityFilter}
              onChange={(e) => setAvailabilityFilter(e.target.value)}
              className="rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2.5 text-xs text-neutral-300 focus:border-cyan-500 focus:outline-none"
            >
              <option value="All">All Availabilities</option>
              <option value="Ready to Join">Ready to Join</option>
              <option value="Leading Team">Leading Team</option>
              <option value="Seeking 1 More">Seeking 1 More</option>
            </select>
          </div>
        </div>

        {/* Role Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-neutral-900/60 border border-neutral-800/80 rounded-xl overflow-x-auto">
          {roleCategories.map((role) => {
            const isSelected = selectedRole === role;
            return (
              <button
                key={role}
                onClick={() => setSelectedRole(role)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap ${
                  isSelected
                    ? 'bg-neutral-800 text-cyan-400 font-semibold shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-850'
                }`}
              >
                {role}
              </button>
            );
          })}
        </div>
      </div>

      {/* Results Count */}
      <div className="text-xs text-neutral-400">
        Showing <strong className="font-mono text-neutral-200">{filteredMembers.length}</strong> available collegiate hacker{filteredMembers.length === 1 ? '' : 's'}
      </div>

      {/* Member Cards Grid */}
      {filteredMembers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="group relative flex flex-col justify-between rounded-xl border border-neutral-800/80 bg-neutral-900/60 p-6 transition-all duration-200 hover:-translate-y-1 hover:border-cyan-500/40 hover:bg-neutral-900/90 hover:shadow-xl hover:shadow-cyan-950/20"
            >
              <div>
                {/* Header: Role unboxed metadata & trophies */}
                <div className="flex items-center justify-between text-xs text-neutral-400">
                  <span className="font-semibold text-cyan-400">{member.role}</span>
                  {member.hackathonWins > 0 && (
                    <span className="flex items-center gap-1 text-amber-400">
                      <Trophy className="h-3.5 w-3.5" />
                      <span className="font-mono tabular-nums">{member.hackathonWins} Wins</span>
                    </span>
                  )}
                </div>

                {/* Profile Header */}
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500/30 to-purple-500/30 text-indigo-300 font-bold text-sm border border-indigo-500/30 shadow-inner">
                    {member.avatar}
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display text-base font-bold text-neutral-100 group-hover:text-cyan-300 transition-colors truncate">
                      {member.name}
                    </h3>
                    <p className="text-xs text-neutral-400 truncate">
                      {member.college}
                    </p>
                    <p className="text-[11px] text-neutral-500">
                      {member.graduationYear}
                    </p>
                  </div>
                </div>

                {/* Bio */}
                <p className="mt-3.5 text-xs text-neutral-300 leading-relaxed line-clamp-3">
                  {member.bio}
                </p>

                {/* Skills */}
                <div className="mt-4">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500 block mb-1.5">
                    Core Skills
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {member.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded border border-neutral-800 bg-neutral-950 px-2 py-0.5 text-[11px] font-mono text-neutral-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="mt-6 pt-4 border-t border-neutral-800/80">
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-medium ${
                    member.availability === 'Ready to Join'
                      ? 'text-emerald-400'
                      : member.availability === 'Seeking 1 More'
                      ? 'text-cyan-400'
                      : 'text-amber-400'
                  }`}>
                    {member.availability}
                  </span>

                  <div className="flex items-center gap-2">
                    {member.discord && (
                      <button
                        onClick={() => copyContact(member.discord!, 'Discord')}
                        title={`Discord: ${member.discord}`}
                        className="text-neutral-500 hover:text-indigo-400 transition-colors p-1"
                      >
                        <MessageSquare className="h-4 w-4" />
                      </button>
                    )}
                    {member.github && (
                      <button
                        onClick={() => copyContact(`https://github.com/${member.github}`, 'GitHub')}
                        title={`GitHub: @${member.github}`}
                        className="text-neutral-500 hover:text-neutral-200 transition-colors p-1"
                      >
                        <Github className="h-4 w-4" />
                      </button>
                    )}
                    <button
                      onClick={() => onOpenInvite(member)}
                      className="rounded-md bg-cyan-500 px-3 py-1 text-xs font-semibold text-neutral-950 hover:bg-cyan-400 transition-colors"
                    >
                      Invite
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-12 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-neutral-800 text-neutral-400 mb-4">
            <Users className="h-6 w-6" />
          </div>
          <h3 className="font-display text-lg font-bold text-neutral-200">
            No hackers match these criteria
          </h3>
          <p className="mt-1 text-xs text-neutral-400 max-w-sm mx-auto">
            Try clearing search filters or be the first to post your profile in this discipline!
          </p>
          <div className="mt-5 flex items-center justify-center gap-3">
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedRole('All');
                setAvailabilityFilter('All');
              }}
              className="rounded-lg border border-neutral-800 bg-neutral-800 px-3.5 py-2 text-xs font-medium text-neutral-200 hover:bg-neutral-750"
            >
              Reset Filters
            </button>
            <button
              onClick={onOpenPostProfile}
              className="rounded-lg bg-cyan-500 px-3.5 py-2 text-xs font-semibold text-neutral-950 hover:bg-cyan-400"
            >
              Post Your Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
