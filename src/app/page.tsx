'use client';

import React, { useState, useEffect } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { OverviewView } from '@/components/OverviewView';
import { OnboardingView } from '@/components/OnboardingView';
import { CampaignView } from '@/components/CampaignView';
import { CustomerJourneyView } from '@/components/CustomerJourneyView';
import { SandboxView } from '@/components/SandboxView';
import { EscalationsView } from '@/components/EscalationsView';
import { OperationsDashboard } from '@/components/OperationsDashboard';
import { AgentConsoleView } from '@/components/AgentConsoleView';
import { KnowledgeBaseView } from '@/components/KnowledgeBaseView';
import { EvaluationView } from '@/components/EvaluationView';
import { ScriptedDemoModal } from '@/components/ScriptedDemoModal';
import { SaathiSupportView } from '@/components/SaathiSupportView';
import { SettingsView } from '@/components/SettingsView';
import { LandingPage } from '@/components/LandingPage';
import { AuthModal } from '@/components/AuthModal';
import { Merchant, TabType } from '@/lib/types';
import { store } from '@/lib/db/store';

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [merchants, setMerchants] = useState<Merchant[]>(store.getMerchants());
  const [selectedMerchantId, setSelectedMerchantId] = useState<string>('m-glowfit');
  const [language, setLanguage] = useState<'en' | 'hi'>('hi');
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');

  useEffect(() => {
    // Sync merchants from store
    setMerchants([...store.getMerchants()]);
  }, [activeTab]);

  const activeMerchant = merchants.find(m => m.id === selectedMerchantId) || merchants[0];

  const handleUpdateMerchant = (updated: Merchant) => {
    store.updateMerchant(updated);
    setMerchants([...store.getMerchants()]);
  };

  const handleUpdateProfile = (updatedProfile: any) => {
    const updated = {
      ...activeMerchant,
      profile: updatedProfile,
      lastActivity: 'Just now'
    };
    handleUpdateMerchant(updated);
  };

  const handleStartDemo = () => {
    setSelectedMerchantId('m-glowfit');
    setActiveTab('onboarding');
    setIsDemoModalOpen(true);
  };

  const handleOpenAuth = (mode: 'login' | 'signup' = 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleAuthSuccess = (merchant: Merchant, isNew: boolean) => {
    setMerchants([...store.getMerchants()]);
    setSelectedMerchantId(merchant.id);
    setActiveTab(isNew ? 'onboarding' : 'overview');
  };

  if (activeTab === 'landing') {
    return (
      <LandingPage
        onStartDemo={handleStartDemo}
        onEnterApp={(m) => {
          if (m) setSelectedMerchantId(m.id);
          setActiveTab('overview');
        }}
        language={language}
        setLanguage={setLanguage}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F8F5] text-[#111918] flex items-stretch font-sans selection:bg-[#0B8063] selection:text-white overflow-x-hidden">
      {/* Desktop Left Sidebar */}
      <div className="hidden md:flex md:flex-col w-72 shrink-0 bg-[#F8F8F5] border-r border-[#E4E7E5] self-stretch">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={tab => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          language={language}
          setLanguage={setLanguage}
          onStartDemo={handleStartDemo}
          selectedMerchantName={activeMerchant?.profile.businessName}
        />
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs md:hidden flex">
          <Sidebar
            activeTab={activeTab}
            setActiveTab={tab => {
              setActiveTab(tab);
              setMobileSidebarOpen(false);
            }}
            language={language}
            setLanguage={setLanguage}
            onStartDemo={() => {
              handleStartDemo();
              setMobileSidebarOpen(false);
            }}
            selectedMerchantName={activeMerchant?.profile.businessName}
          />
          <div className="flex-1" onClick={() => setMobileSidebarOpen(false)} />
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top Header Bar */}
        <Header
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          language={language}
          setLanguage={setLanguage}
          onStartDemo={handleStartDemo}
          selectedMerchantName={activeMerchant?.profile.businessName}
          onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          onOpenAuth={handleOpenAuth}
        />

        {/* Dynamic View Container */}
        <main className="flex-1 pb-16">
          {activeTab === 'overview' && (
            <OverviewView
              onStartDemo={handleStartDemo}
              onOpenDashboard={() => setActiveTab('dashboard')}
              onOpenOnboarding={() => setActiveTab('onboarding')}
              language={language}
              setLanguage={setLanguage}
            />
          )}

          {activeTab === 'onboarding' && (
            <OnboardingView
              merchant={activeMerchant}
              onUpdateProfile={handleUpdateProfile}
              onProceedToCampaign={() => setActiveTab('campaigns')}
              language={language}
              setLanguage={setLanguage}
            />
          )}

          {activeTab === 'saathi' && (
            <SaathiSupportView
              merchant={activeMerchant}
              onUpdateMerchant={handleUpdateMerchant}
              language={language}
              setLanguage={setLanguage}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsView
              merchant={activeMerchant}
              onUpdateMerchant={handleUpdateMerchant}
              language={language}
              setLanguage={setLanguage}
            />
          )}

          {activeTab === 'campaigns' && (
            <CampaignView
              merchant={activeMerchant}
              onUpdateMerchant={handleUpdateMerchant}
              onProceedToSandbox={() => setActiveTab('sandbox')}
            />
          )}

          {activeTab === 'journey' && (
            <CustomerJourneyView merchant={activeMerchant} />
          )}

          {activeTab === 'sandbox' && (
            <SandboxView
              merchant={activeMerchant}
              onUpdateMerchant={handleUpdateMerchant}
            />
          )}

          {activeTab === 'escalations' && (
            <EscalationsView
              merchant={activeMerchant}
              onUpdateMerchant={handleUpdateMerchant}
            />
          )}

          {activeTab === 'dashboard' && (
            <OperationsDashboard
              merchants={merchants}
              onSelectMerchant={m => {
                setSelectedMerchantId(m.id);
                setActiveTab('onboarding');
              }}
              onOpenOnboarding={() => setActiveTab('onboarding')}
            />
          )}

          {activeTab === 'console' && <AgentConsoleView />}

          {activeTab === 'knowledge' && <KnowledgeBaseView />}

          {activeTab === 'evaluation' && <EvaluationView />}
        </main>

        {/* Footer */}
        <footer className="border-t border-[#E4E7E5] bg-[#F8F8F5] py-6 text-center text-xs text-[#66706F] mt-auto">
          <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#111918]">Meri Dukaan</span>
              <span>— Digital growth, in your language.</span>
            </div>
            <div>Powered by Agentic AI & Sarvam AI Language Stack</div>
          </div>
        </footer>
      </div>

      {/* Scripted GlowFit Gym Demo Interactive Modal */}
      <ScriptedDemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        merchant={activeMerchant}
        onUpdateMerchant={handleUpdateMerchant}
        onSwitchTab={tab => setActiveTab(tab)}
      />

      {/* Auth Modal (Login / Sign Up for Merchants) */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
        initialMode={authMode}
        language={language}
      />
    </div>
  );
}
