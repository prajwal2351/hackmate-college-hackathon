/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageType, Project, TeamMember } from './types';
import { INITIAL_PROJECTS, INITIAL_MEMBERS } from './data/mockData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { ProjectModal } from './components/ProjectModal';
import { CreateProjectModal } from './components/CreateProjectModal';
import { InviteModal } from './components/InviteModal';
import { PostProfileModal } from './components/PostProfileModal';

// Pages
import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { TeamPage } from './pages/TeamPage';
import { ResourcesPage } from './pages/ResourcesPage';
import { ContactPage } from './pages/ContactPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');

  // Persistent projects state
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem('hackmate_projects');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_PROJECTS;
  });

  // Persistent members state
  const [members, setMembers] = useState<TeamMember[]>(() => {
    try {
      const saved = localStorage.getItem('hackmate_members');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_MEMBERS;
  });

  // Starred projects
  const [starredProjectIds, setStarredProjectIds] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem('hackmate_starred');
      if (saved) return new Set(JSON.parse(saved));
    } catch (e) {
      console.error(e);
    }
    return new Set(['proj-1', 'proj-3', 'proj-8']);
  });

  // Modals state
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [createProjectModalOpen, setCreateProjectModalOpen] = useState(false);
  const [inviteModalMember, setInviteModalMember] = useState<TeamMember | null>(null);
  const [postProfileModalOpen, setPostProfileModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('hackmate_projects', JSON.stringify(projects));
    } catch (e) {
      console.error(e);
    }
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem('hackmate_members', JSON.stringify(members));
    } catch (e) {
      console.error(e);
    }
  }, [members]);

  useEffect(() => {
    try {
      localStorage.setItem('hackmate_starred', JSON.stringify(Array.from(starredProjectIds)));
    } catch (e) {
      console.error(e);
    }
  }, [starredProjectIds]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage((current) => (current === message ? null : current));
    }, 3500);
  };

  const handleStarProject = (projectId: string) => {
    setStarredProjectIds((prev) => {
      const next = new Set(prev);
      const isStarred = next.has(projectId);
      if (isStarred) {
        next.delete(projectId);
        showToast('Removed from your starred ideas.');
      } else {
        next.add(projectId);
        showToast('Project added to your starred ideas!');
      }
      return next;
    });
  };

  const handleCreateProject = (newProjectData: Omit<Project, 'id' | 'createdAt' | 'stars'>) => {
    const newProject: Project = {
      ...newProjectData,
      id: `proj-${Date.now()}`,
      stars: 1,
      createdAt: 'Just now',
    };
    setProjects((prev) => [newProject, ...prev]);
    showToast(`Project "${newProject.title}" has been published!`);
  };

  const handleApplyToProject = (
    projectId: string,
    applicantName: string,
    role: string,
    note: string
  ) => {
    showToast(`Squad application from ${applicantName} submitted for role: ${role}`);
  };

  const handleSendInvite = (
    memberId: string,
    memberName: string,
    projectName: string,
    message: string
  ) => {
    showToast(`Squad invite sent to ${memberName} for project "${projectName}"!`);
  };

  const handlePostProfile = (newMemberData: Omit<TeamMember, 'id'>) => {
    const newMember: TeamMember = {
      ...newMemberData,
      id: `mem-${Date.now()}`,
    };
    setMembers((prev) => [newMember, ...prev]);
    showToast(`Your profile has been listed on the Team Matchmaker board!`);
  };

  return (
    <div className="min-h-screen bg-[#080b11] text-neutral-100 flex flex-col selection:bg-cyan-500 selection:text-neutral-950 font-sans">
      {/* Top Bar Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        onOpenCreateProject={() => setCreateProjectModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={setCurrentPage}
            featuredProjects={projects}
            members={members}
            onSelectProject={setSelectedProject}
            onStarProject={handleStarProject}
            starredProjectIds={starredProjectIds}
            onOpenCreateProject={() => setCreateProjectModalOpen(true)}
            onRequestJoinProject={(project) => setSelectedProject(project)}
            onOpenInvite={(member) => setInviteModalMember(member)}
          />
        )}

        {currentPage === 'projects' && (
          <ProjectsPage
            projects={projects}
            onSelectProject={setSelectedProject}
            onStarProject={handleStarProject}
            starredProjectIds={starredProjectIds}
            onOpenCreateProject={() => setCreateProjectModalOpen(true)}
            onRequestJoinProject={(project) => setSelectedProject(project)}
          />
        )}

        {currentPage === 'team' && (
          <TeamPage
            members={members}
            onOpenPostProfile={() => setPostProfileModalOpen(true)}
            onOpenInvite={(member) => setInviteModalMember(member)}
            onShowToast={showToast}
          />
        )}

        {currentPage === 'resources' && (
          <ResourcesPage onShowToast={showToast} />
        )}

        {currentPage === 'contact' && (
          <ContactPage onShowToast={showToast} />
        )}
      </main>

      {/* Footer */}
      <Footer onNavigate={setCurrentPage} onShowToast={showToast} />

      {/* Modals & Overlays */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onStar={handleStarProject}
        isStarred={selectedProject ? starredProjectIds.has(selectedProject.id) : false}
        onApply={handleApplyToProject}
      />

      <CreateProjectModal
        isOpen={createProjectModalOpen}
        onClose={() => setCreateProjectModalOpen(false)}
        onSubmit={handleCreateProject}
      />

      <InviteModal
        member={inviteModalMember}
        projects={projects}
        onClose={() => setInviteModalMember(null)}
        onSendInvite={handleSendInvite}
      />

      <PostProfileModal
        isOpen={postProfileModalOpen}
        onClose={() => setPostProfileModalOpen(false)}
        onSubmit={handlePostProfile}
      />

      {/* Global Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}
