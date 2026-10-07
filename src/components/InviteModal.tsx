import React, { useState } from 'react';
import { TeamMember, Project } from '../types';
import { X, Send, Check } from 'lucide-react';

interface InviteModalProps {
  member: TeamMember | null;
  projects: Project[];
  onClose: () => void;
  onSendInvite: (memberId: string, memberName: string, projectName: string, message: string) => void;
}

export const InviteModal: React.FC<InviteModalProps> = ({
  member,
  projects,
  onClose,
  onSendInvite,
}) => {
  const [selectedProject, setSelectedProject] = useState(projects[0]?.title || '');
  const [inviteMessage, setInviteMessage] = useState(
    "Hey! We loved your profile and would love to have your skills on our hackathon squad."
  );

  if (!member) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSendInvite(member.id, member.name, selectedProject, inviteMessage);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-xl border border-neutral-800 bg-neutral-900 p-6 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg border border-neutral-800 p-1 text-neutral-400 hover:text-white"
          aria-label="Close invite modal"
        >
          <X className="h-4 w-4" />
        </button>

        <h3 className="text-lg font-bold text-neutral-100 font-display">
          Invite {member.name}
        </h3>
        <p className="mt-1 text-xs text-neutral-400">
          Send an invitation to join your hackathon project squad.
        </p>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1">
              Select Your Project Squad
            </label>
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(e.target.value)}
              className="w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-neutral-200 focus:border-cyan-500 focus:outline-none"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.title}>
                  {p.title} ({p.category})
                </option>
              ))}
              <option value="New Unnamed Project">New Unnamed Project Concept</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-neutral-300 mb-1">
              Invitation Note / Pitch
            </label>
            <textarea
              rows={3}
              value={inviteMessage}
              onChange={(e) => setInviteMessage(e.target.value)}
              className="w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-neutral-200 focus:border-cyan-500 focus:outline-none"
            />
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
              className="flex items-center gap-1.5 rounded-md bg-cyan-500 px-3.5 py-1.5 text-xs font-semibold text-neutral-950 hover:bg-cyan-400"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Send Squad Invite</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
