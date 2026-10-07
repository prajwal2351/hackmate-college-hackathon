import React, { useState } from 'react';
import { PageType } from '../types';
import { ArrowRight, Check, Github, Twitter, Linkedin, MessageSquare } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageType) => void;
  onShowToast: (message: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onShowToast }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      onShowToast('Please enter a valid student or developer email.');
      return;
    }
    setSubscribed(true);
    onShowToast('Subscribed! You will receive hackathon squad announcements.');
    setEmail('');
  };

  return (
    <footer className="border-t border-neutral-900 bg-neutral-950 text-neutral-400">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand & summary */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded bg-gradient-to-br from-cyan-500 to-indigo-600 text-neutral-950 font-bold text-xs">
                HM
              </span>
              <span className="font-display text-lg font-bold tracking-tight text-neutral-100">
                Hack<span className="text-cyan-400">Mate</span>
              </span>
            </div>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-neutral-400">
              The collaborative platform designed for college hackers to brainstorm transformative ideas, assemble complementary project squads, and ship winning prototypes.
            </p>
            <div className="mt-5 flex items-center gap-4 text-neutral-500">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-cyan-400 transition-colors"
                aria-label="GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-cyan-400 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-cyan-400 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-cyan-400 transition-colors"
                aria-label="Discord"
              >
                <MessageSquare className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-200">
              Platform
            </h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-neutral-200 transition-colors"
                >
                  Home & Tracks
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('projects')}
                  className="hover:text-neutral-200 transition-colors"
                >
                  Browse Projects
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('team')}
                  className="hover:text-neutral-200 transition-colors"
                >
                  Find Teammates
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('resources')}
                  className="hover:text-neutral-200 transition-colors"
                >
                  Dev Resources & Kits
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-neutral-200 transition-colors"
                >
                  Contact & Mentors
                </button>
              </li>
            </ul>
          </div>

          {/* Tracks */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-200">
              Prize Tracks
            </h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="text-neutral-400">AI & Cognitive Agents</li>
              <li className="text-neutral-400">HealthTech & Bio</li>
              <li className="text-neutral-400">Web3 & Fintech</li>
              <li className="text-neutral-400">Climate & Clean Cities</li>
              <li className="text-neutral-400">EdTech & Accessibility</li>
              <li className="text-neutral-400">Open Innovation</li>
            </ul>
          </div>

          {/* Newsletter / Notifications */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-neutral-200">
              Stay in the Loop
            </h4>
            <p className="mt-2 text-xs leading-relaxed text-neutral-400">
              Get notified when new project squads form or mentor slots open.
            </p>
            <form onSubmit={handleSubscribe} className="mt-3">
              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@university.edu"
                  className="w-full rounded-md border border-neutral-800 bg-neutral-900 px-3 py-1.5 text-xs text-neutral-100 placeholder-neutral-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
                />
                <button
                  type="submit"
                  className="flex items-center justify-center gap-1.5 rounded-md bg-neutral-800 px-3 py-1.5 text-xs font-medium text-neutral-200 hover:bg-neutral-700 transition-colors"
                >
                  {subscribed ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-400" />
                      <span>Subscribed</span>
                    </>
                  ) : (
                    <>
                      <span>Get Hack Alerts</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-neutral-900 pt-8 sm:flex-row text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} HackMate. Crafted for collegiate innovation hackathons.</p>
          <div className="flex items-center gap-6">
            <span>Built with React & Tailwind</span>
            <span>·</span>
            <span>Open Source Community</span>
            <span>·</span>
            <button
              onClick={() => onNavigate('contact')}
              className="hover:text-neutral-300 transition-colors"
            >
              Support & Code of Conduct
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
