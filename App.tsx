import React, { useState, useEffect } from 'react';
import { NavigationTab, UserProfile } from './types';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { DashboardView } from './components/DashboardView';
import { ChatView } from './components/ChatView';
import { GoalModeView } from './components/GoalModeView';
import { StudyModeView } from './components/StudyModeView';
import { ImageStudioView } from './components/ImageStudioView';
import { VideoLabView } from './components/VideoLabView';
import { AICouncilView } from './components/AICouncilView';
import { DailyNewsView } from './components/DailyNewsView';
import { NotesAiView } from './components/NotesAiView';
import { QuizGeneratorView } from './components/QuizGeneratorView';
import { ExamPrepView } from './components/ExamPrepView';
import { CodingLabView } from './components/CodingLabView';
import { EnglishLearnView } from './components/EnglishLearnView';
import { GroupDiscussionView } from './components/GroupDiscussionView';
import { ProjectHelperView } from './components/ProjectHelperView';
import { CareerAiView } from './components/CareerAiView';
import { CheflyAiView } from './components/CheflyAiView';
import { RegistrationModal } from './components/RegistrationModal';
import { UpgradeModal } from './components/UpgradeModal';
import {
  LayoutDashboard,
  Newspaper,
  MessageSquare,
  Sparkles,
  Video,
  Users2,
  Target,
  GraduationCap,
} from 'lucide-react';

const DAILY_LIMIT = 20;

export default function App() {
  const [activeTab, setActiveTab] = useState<NavigationTab>('dashboard');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false);
  const [isUpgradeOpen, setIsUpgradeOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [prefilledPrompt, setPrefilledPrompt] = useState<string>('');

  // Daily Usage Tracking
  const getTodayKey = () => {
    const today = new Date().toISOString().split('T')[0];
    return `fullstop_daily_usage_${today}`;
  };

  const [dailyUsage, setDailyUsage] = useState<number>(() => {
    const stored = localStorage.getItem(getTodayKey());
    return stored ? parseInt(stored, 10) : 0;
  });

  // Load user profile on mount
  useEffect(() => {
    const saved = localStorage.getItem('fullstop_user_profile');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setUserProfile(parsed);
      } catch (e) {
        console.error('Failed to parse user profile', e);
        setIsRegistrationOpen(true);
      }
    } else {
      setIsRegistrationOpen(true);
    }
  }, []);

  // Update localStorage when daily usage changes
  useEffect(() => {
    localStorage.setItem(getTodayKey(), dailyUsage.toString());
  }, [dailyUsage]);

  // Quota checker & incrementor
  const handleIncrementUsage = (): boolean => {
    if (userProfile?.isPro) {
      return true; // Pro users have unlimited queries
    }
    if (dailyUsage >= DAILY_LIMIT) {
      return false; // Free quota reached
    }
    setDailyUsage((prev) => prev + 1);
    return true;
  };

  const handleUpgradeToPro = () => {
    if (userProfile) {
      const updated: UserProfile = { ...userProfile, isPro: true };
      setUserProfile(updated);
      localStorage.setItem('fullstop_user_profile', JSON.stringify(updated));
    }
  };

  const handleResetDailyLimit = () => {
    setDailyUsage(0);
    localStorage.setItem(getTodayKey(), '0');
  };

  const handleLaunchPrompt = (tab: NavigationTab, prompt: string) => {
    setPrefilledPrompt(prompt);
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-[#050505] bg-grid-pattern text-[#e6e0e9] flex flex-col md:flex-row relative selection:bg-[#cfbcff]/30 selection:text-[#cfbcff]">
      {/* Background ambient lighting effects */}
      <div className="ambient-glow -top-32 -left-32 w-96 h-96 bg-[#6750a4]/20" />
      <div className="ambient-glow -bottom-32 -right-32 w-96 h-96 bg-[#cfbcff]/10" />

      {/* Persistent Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        userProfile={userProfile}
        dailyUsage={dailyUsage}
        dailyLimit={DAILY_LIMIT}
        onOpenUpgrade={() => setIsUpgradeOpen(true)}
        onOpenProfile={() => setIsRegistrationOpen(true)}
        isOpenMobile={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      {/* Main Workspace Frame */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen pb-20 md:pb-6 relative z-10">
        <Header
          activeTab={activeTab}
          userProfile={userProfile}
          dailyUsage={dailyUsage}
          dailyLimit={DAILY_LIMIT}
          onOpenUpgrade={() => setIsUpgradeOpen(true)}
          onToggleMobileMenu={() => setMobileMenuOpen((prev) => !prev)}
        />

        <main className="flex-1 overflow-x-hidden">
          {activeTab === 'dashboard' && (
            <DashboardView
              userProfile={userProfile}
              onSelectTab={setActiveTab}
              dailyUsage={dailyUsage}
              dailyLimit={DAILY_LIMIT}
              onOpenUpgrade={() => setIsUpgradeOpen(true)}
              onLaunchPrompt={handleLaunchPrompt}
            />
          )}

          {activeTab === 'daily-news' && (
            <DailyNewsView
              onSelectTab={setActiveTab}
              onLaunchPrompt={handleLaunchPrompt}
              dailyUsage={dailyUsage}
              dailyLimit={DAILY_LIMIT}
              onIncrementUsage={handleIncrementUsage}
              onOpenUpgrade={() => setIsUpgradeOpen(true)}
            />
          )}

          {activeTab === 'chat' && (
            <ChatView
              userProfile={userProfile}
              dailyUsage={dailyUsage}
              dailyLimit={DAILY_LIMIT}
              onIncrementUsage={handleIncrementUsage}
              onOpenUpgrade={() => setIsUpgradeOpen(true)}
            />
          )}

          {activeTab === 'goal-mode' && (
            <GoalModeView
              userProfile={userProfile}
              dailyUsage={dailyUsage}
              dailyLimit={DAILY_LIMIT}
              onIncrementUsage={handleIncrementUsage}
              onOpenUpgrade={() => setIsUpgradeOpen(true)}
              initialPrompt={prefilledPrompt}
            />
          )}

          {activeTab === 'chefly-ai' && (
            <CheflyAiView
              userProfile={userProfile}
              dailyUsage={dailyUsage}
              dailyLimit={DAILY_LIMIT}
              onIncrementUsage={handleIncrementUsage}
              onOpenUpgrade={() => setIsUpgradeOpen(true)}
              initialPrompt={prefilledPrompt}
            />
          )}

          {activeTab === 'study-mode' && (
            <StudyModeView
              userProfile={userProfile}
              dailyUsage={dailyUsage}
              dailyLimit={DAILY_LIMIT}
              onIncrementUsage={handleIncrementUsage}
              onOpenUpgrade={() => setIsUpgradeOpen(true)}
              initialPrompt={prefilledPrompt}
            />
          )}

          {activeTab === 'notes-ai' && (
            <NotesAiView
              userProfile={userProfile}
              dailyUsage={dailyUsage}
              dailyLimit={DAILY_LIMIT}
              onIncrementUsage={handleIncrementUsage}
              onOpenUpgrade={() => setIsUpgradeOpen(true)}
              initialPrompt={prefilledPrompt}
            />
          )}

          {activeTab === 'quiz-generator' && (
            <QuizGeneratorView
              userProfile={userProfile}
              dailyUsage={dailyUsage}
              dailyLimit={DAILY_LIMIT}
              onIncrementUsage={handleIncrementUsage}
              onOpenUpgrade={() => setIsUpgradeOpen(true)}
              initialPrompt={prefilledPrompt}
            />
          )}

          {activeTab === 'exam-prep' && (
            <ExamPrepView
              userProfile={userProfile}
              dailyUsage={dailyUsage}
              dailyLimit={DAILY_LIMIT}
              onIncrementUsage={handleIncrementUsage}
              onOpenUpgrade={() => setIsUpgradeOpen(true)}
              initialPrompt={prefilledPrompt}
            />
          )}

          {activeTab === 'coding-lab' && (
            <CodingLabView
              userProfile={userProfile}
              dailyUsage={dailyUsage}
              dailyLimit={DAILY_LIMIT}
              onIncrementUsage={handleIncrementUsage}
              onOpenUpgrade={() => setIsUpgradeOpen(true)}
              initialPrompt={prefilledPrompt}
            />
          )}

          {activeTab === 'english-learn' && (
            <EnglishLearnView
              userProfile={userProfile}
              dailyUsage={dailyUsage}
              dailyLimit={DAILY_LIMIT}
              onIncrementUsage={handleIncrementUsage}
              onOpenUpgrade={() => setIsUpgradeOpen(true)}
              initialPrompt={prefilledPrompt}
            />
          )}

          {activeTab === 'group-discussion' && (
            <GroupDiscussionView
              userProfile={userProfile}
              dailyUsage={dailyUsage}
              dailyLimit={DAILY_LIMIT}
              onIncrementUsage={handleIncrementUsage}
              onOpenUpgrade={() => setIsUpgradeOpen(true)}
              initialPrompt={prefilledPrompt}
            />
          )}

          {activeTab === 'project-helper' && (
            <ProjectHelperView
              userProfile={userProfile}
              dailyUsage={dailyUsage}
              dailyLimit={DAILY_LIMIT}
              onIncrementUsage={handleIncrementUsage}
              onOpenUpgrade={() => setIsUpgradeOpen(true)}
              initialPrompt={prefilledPrompt}
            />
          )}

          {activeTab === 'career-ai' && (
            <CareerAiView
              userProfile={userProfile}
              dailyUsage={dailyUsage}
              dailyLimit={DAILY_LIMIT}
              onIncrementUsage={handleIncrementUsage}
              onOpenUpgrade={() => setIsUpgradeOpen(true)}
              initialPrompt={prefilledPrompt}
            />
          )}

          {activeTab === 'image-studio' && (
            <ImageStudioView
              userProfile={userProfile}
              dailyUsage={dailyUsage}
              dailyLimit={DAILY_LIMIT}
              onIncrementUsage={handleIncrementUsage}
              onOpenUpgrade={() => setIsUpgradeOpen(true)}
              initialPrompt={prefilledPrompt}
            />
          )}

          {activeTab === 'video-lab' && (
            <VideoLabView
              userProfile={userProfile}
              dailyUsage={dailyUsage}
              dailyLimit={DAILY_LIMIT}
              onIncrementUsage={handleIncrementUsage}
              onOpenUpgrade={() => setIsUpgradeOpen(true)}
              initialPrompt={prefilledPrompt}
            />
          )}

          {activeTab === 'ai-council' && (
            <AICouncilView
              userProfile={userProfile}
              dailyUsage={dailyUsage}
              dailyLimit={DAILY_LIMIT}
              onIncrementUsage={handleIncrementUsage}
              onOpenUpgrade={() => setIsUpgradeOpen(true)}
              initialPrompt={prefilledPrompt}
            />
          )}
        </main>
      </div>

      {/* Mobile Floating Command Bar */}
      <nav
        id="mobile-bottom-command-bar"
        className="fixed bottom-0 inset-x-0 z-30 md:hidden bg-[#09080e]/95 backdrop-blur-xl border-t border-white/10 px-2 py-1.5 flex items-center justify-between overflow-x-auto gap-1"
      >
        {[
          { id: 'dashboard' as NavigationTab, label: 'Home', icon: LayoutDashboard },
          { id: 'daily-news' as NavigationTab, label: 'News', icon: Newspaper },
          { id: 'chat' as NavigationTab, label: 'Chat', icon: MessageSquare },
          { id: 'goal-mode' as NavigationTab, label: 'Goal', icon: Target },
          { id: 'study-mode' as NavigationTab, label: 'Study', icon: GraduationCap },
          { id: 'image-studio' as NavigationTab, label: 'Image', icon: Sparkles },
          { id: 'video-lab' as NavigationTab, label: 'Video', icon: Video },
          { id: 'ai-council' as NavigationTab, label: 'Council', icon: Users2 },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-0.5 py-1 px-2 rounded-xl transition-all flex-shrink-0 ${
                isActive ? 'text-[#cfbcff]' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="text-[9px] font-mono">{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* User Registration Modal */}
      <RegistrationModal
        isOpen={isRegistrationOpen}
        onComplete={(profile) => {
          setUserProfile(profile);
          setIsRegistrationOpen(false);
        }}
        initialProfile={userProfile}
        canDismiss={Boolean(userProfile)}
        onDismiss={() => setIsRegistrationOpen(false)}
      />

      {/* Upgrade to Pro Modal */}
      <UpgradeModal
        isOpen={isUpgradeOpen}
        onClose={() => setIsUpgradeOpen(false)}
        onUpgradeToPro={handleUpgradeToPro}
        onResetDailyLimit={handleResetDailyLimit}
        dailyUsage={dailyUsage}
        dailyLimit={DAILY_LIMIT}
        isPro={Boolean(userProfile?.isPro)}
      />
    </div>
  );
}
