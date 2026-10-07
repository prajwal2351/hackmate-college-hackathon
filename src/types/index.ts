export type PageType = 'home' | 'projects' | 'team' | 'resources' | 'contact';

export type ProjectCategory = 
  | 'All'
  | 'AI & Machine Learning'
  | 'HealthTech & Bio'
  | 'Web3 & Fintech'
  | 'EdTech & Learning'
  | 'CyberSecurity'
  | 'Climate & Sustainability'
  | 'Open Innovation';

export interface Project {
  id: string;
  title: string;
  tagline: string;
  category: ProjectCategory;
  problem: string;
  solution: string;
  techStack: string[];
  teamSize: number;
  maxTeamSize: number;
  leader: {
    name: string;
    avatar: string;
    role: string;
    college: string;
  };
  openRoles: string[];
  status: 'Seeking Teammates' | 'Team Full' | 'Prototyping';
  stars: number;
  featured?: boolean;
  githubUrl?: string;
  createdAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  avatar: string;
  role: 'Frontend' | 'Backend' | 'AI / ML' | 'UI / UX Design' | 'Mobile Dev' | 'Product / Pitch';
  college: string;
  graduationYear: string;
  skills: string[];
  bio: string;
  availability: 'Ready to Join' | 'Leading Team' | 'Seeking 1 More';
  hackathonWins: number;
  github?: string;
  linkedin?: string;
  discord?: string;
}

export interface ResourceItem {
  id: string;
  category: 'Boilerplates' | 'Free APIs & Credits' | 'Pitch Templates' | 'Design & Assets';
  title: string;
  description: string;
  badge?: string;
  linkText: string;
  url: string;
  command?: string;
  tags: string[];
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  university: string;
  topic: 'Team Formation Help' | 'Become a Mentor' | 'Sponsor HackMate' | 'Campus Ambassador' | 'General Query';
  message: string;
  timestamp: string;
}
