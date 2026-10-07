import React, { useState } from 'react';
import { FAQS } from '../data/mockData';
import { 
  Send, 
  Check, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Mail, 
  MessageSquare, 
  ShieldCheck, 
  Award, 
  Sparkles 
} from 'lucide-react';

interface ContactPageProps {
  onShowToast: (message: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onShowToast }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [university, setUniversity] = useState('');
  const [topic, setTopic] = useState('Team Formation Help');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setSubmitted(true);
    onShowToast('Message received! Our collegiate organizer team will reply within 4 hours.');
  };

  const handleReset = () => {
    setName('');
    setEmail('');
    setUniversity('');
    setMessage('');
    setSubmitted(false);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 space-y-12">
      {/* Page Header */}
      <div className="border-b border-neutral-850 pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400">
          <Sparkles className="h-3.5 w-3.5" />
          <span>Hackathon Concierge</span>
        </div>
        <h1 className="mt-1 font-display text-3xl font-extrabold tracking-tight text-neutral-100">
          Contact Organizers & Mentors
        </h1>
        <p className="mt-1 text-sm text-neutral-400">
          Have questions about team rules, sponsorship opportunities, or require an on-call technical mentor? We are here to support your squad.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-neutral-800 bg-neutral-900/60 p-6 sm:p-8">
            <h2 className="font-display text-xl font-bold text-neutral-100">
              Send us a message
            </h2>
            <p className="mt-1 text-xs text-neutral-400">
              Fill out this form and a campus coordinator or lead organizer will get back to you promptly.
            </p>

            {submitted ? (
              <div className="mt-6 rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-6 text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 mb-3">
                  <Check className="h-5 w-5" />
                </div>
                <h3 className="font-display text-base font-bold text-emerald-300">
                  Thank you, {name}!
                </h3>
                <p className="mt-2 text-xs text-neutral-300 leading-relaxed max-w-sm mx-auto">
                  Your message regarding <strong>"{topic}"</strong> has been transmitted to the HackMate event operations team.
                </p>
                <button
                  onClick={handleReset}
                  className="mt-5 rounded-md bg-neutral-800 px-4 py-2 text-xs font-medium text-neutral-200 hover:bg-neutral-700 transition-colors"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Maya Chen"
                      className="w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-neutral-100 placeholder-neutral-500 focus:border-cyan-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="student@university.edu"
                      className="w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-neutral-100 placeholder-neutral-500 focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Affiliated University / College
                    </label>
                    <input
                      type="text"
                      value={university}
                      onChange={(e) => setUniversity(e.target.value)}
                      placeholder="e.g. UC Berkeley, Stanford, MIT"
                      className="w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-neutral-100 placeholder-neutral-500 focus:border-cyan-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Inquiry Category *
                    </label>
                    <select
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      className="w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-neutral-100 focus:border-cyan-500 focus:outline-none"
                    >
                      <option value="Team Formation Help">Team Formation & Matchmaking</option>
                      <option value="Become a Mentor">Join as Industry Mentor</option>
                      <option value="Sponsor HackMate">Sponsor a Track / Prize Pool</option>
                      <option value="Campus Ambassador">Become a Campus Ambassador</option>
                      <option value="Technical Support">Platform Bug or Issue</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Your Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us what you need help with, what you're building, or how your company wants to get involved..."
                    className="w-full rounded-md border border-neutral-800 bg-neutral-950 px-3 py-2 text-xs text-neutral-100 placeholder-neutral-500 focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="flex items-center justify-center gap-1.5 rounded-lg bg-cyan-500 px-5 py-2.5 text-xs font-semibold text-neutral-950 hover:bg-cyan-400 transition-colors w-full sm:w-auto"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Send Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Info & Cards (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-6">
            <h3 className="font-display text-base font-bold text-neutral-100 flex items-center gap-2">
              <Mail className="h-4 w-4 text-cyan-400" />
              <span>Direct Communication</span>
            </h3>
            <p className="mt-2 text-xs text-neutral-400 leading-relaxed">
              Prefer direct email or chat? Our operations leads monitor these daily:
            </p>
            <div className="mt-4 space-y-2.5 text-xs">
              <div className="flex items-center justify-between text-neutral-300">
                <span className="text-neutral-500">Hackathon Support:</span>
                <span className="font-mono text-cyan-400">hack@hackmate.college</span>
              </div>
              <div className="flex items-center justify-between text-neutral-300">
                <span className="text-neutral-500">Sponsorships:</span>
                <span className="font-mono text-cyan-400">partners@hackmate.college</span>
              </div>
              <div className="flex items-center justify-between text-neutral-300">
                <span className="text-neutral-500">Mentorship Leads:</span>
                <span className="font-mono text-cyan-400">mentors@hackmate.college</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 p-6">
            <h3 className="font-display text-base font-bold text-neutral-100 flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Campus Ambassador Network</span>
            </h3>
            <p className="mt-2 text-xs text-neutral-400 leading-relaxed">
              Representing student hacker clubs across UC Berkeley, MIT, Georgia Tech, Stanford, Waterloo, Carnegie Mellon, and UT Austin.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-neutral-300">
              <Award className="h-4 w-4 text-amber-400" />
              <span>Want to host a HackMate local chapter at your school? Select "Campus Ambassador" in the form!</span>
            </div>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="rounded-2xl border border-neutral-800 bg-neutral-900/30 p-6 sm:p-8">
        <div className="mb-6">
          <h2 className="font-display text-xl font-bold text-neutral-100 flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-cyan-400" />
            <span>Frequently Asked Questions</span>
          </h2>
          <p className="mt-1 text-xs text-neutral-400">
            Answers to common questions regarding hackathon rules, teams, and eligibility.
          </p>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={faq.q}
                className="rounded-xl border border-neutral-850 bg-neutral-950/60 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between p-4 text-left text-xs sm:text-sm font-semibold text-neutral-200 hover:text-white transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4 text-cyan-400 shrink-0 ml-2" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-neutral-500 shrink-0 ml-2" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 pt-1 text-xs text-neutral-400 leading-relaxed border-t border-neutral-900">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
