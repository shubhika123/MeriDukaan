'use client';

import React from 'react';
import {
  Globe,
  Menu,
  ChevronRight,
  Play
} from 'lucide-react';
import { TabType } from '@/lib/types';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  language: 'en' | 'hi';
  setLanguage: (lang: 'en' | 'hi') => void;
  onStartDemo: () => void;
  selectedMerchantName?: string;
  onToggleMobileSidebar?: () => void;
  onOpenAuth?: (mode: 'login' | 'signup') => void;
}

const TAB_NAMES: Record<TabType, { title: string; category: string }> = {
  landing: { title: 'Welcome to Meri Dukaan', category: 'Home' },
  overview: { title: 'Meri Dukaan — Digital Growth Platform', category: 'Growth Platform' },
  onboarding: { title: 'Dukaan Profile & Onboarding', category: 'Merchant Journey' },
  campaigns: { title: 'Ad & Offer Creator Studio', category: 'Merchant Journey' },
  journey: { title: 'Customer Lead & Journey Flow', category: 'Merchant Journey' },
  saathi: { title: 'Saathi AI Assistant & Support Desk', category: 'Merchant Support' },
  sandbox: { title: 'Meta & WhatsApp Ad Channels', category: 'Channels & Setup' },
  escalations: { title: 'Help Desk & Support Tickets', category: 'Merchant Support' },
  dashboard: { title: 'Merchant Operations Overview', category: 'Business Analytics' },
  console: { title: 'AI Reasoning & Activity Log', category: 'AI System' },
  knowledge: { title: 'Help Guides & RAG Search', category: 'Merchant Knowledge' },
  evaluation: { title: 'Quality & Evaluation Benchmarks', category: 'System Quality' },
  settings: { title: 'Language & Preference Settings', category: 'Account Settings' }
};

export function Header({
  activeTab,
  language,
  setLanguage,
  onStartDemo,
  selectedMerchantName,
  onToggleMobileSidebar,
  onOpenAuth
}: HeaderProps) {
  const currentInfo = TAB_NAMES[activeTab] || { title: 'Dashboard', category: 'Platform' };

  return (
    <header className="sticky top-0 z-30 bg-[#F8F8F5]/95 backdrop-blur-md border-b border-[#E4E7E5] px-4 sm:px-8 py-3.5 flex items-center justify-between">
      {/* Left: Breadcrumbs & Page Title */}
      <div className="flex items-center gap-3.5">
        {onToggleMobileSidebar && (
          <button
            onClick={onToggleMobileSidebar}
            className="md:hidden p-2 rounded-lg bg-white border border-[#E4E7E5] text-[#111918]"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}

        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#52605E]">
            <span className="text-[#111918] font-bold">Meri Dukaan</span>
            <ChevronRight className="w-3.5 h-3.5 text-[#8E9897]" />
            <span className="text-[#0B8063] font-bold">{currentInfo.category}</span>
          </div>
          <h1 className="text-base sm:text-lg font-extrabold text-[#111918] tracking-tight">{currentInfo.title}</h1>
        </div>
      </div>

      {/* Right: Quick Action Controls */}
      <div className="flex items-center gap-3">
        {selectedMerchantName && (
          <div className="hidden sm:flex items-center gap-2.5 px-3.5 py-2 rounded-lg bg-white border border-[#E4E7E5] text-xs sm:text-sm text-[#111918] shadow-2xs">
            <span className="w-2.5 h-2.5 rounded-full bg-[#16835B] shrink-0 animate-pulse" />
            <span className="text-[#52605E] font-medium">Merchant:</span>
            <span className="font-bold text-[#111918]">{selectedMerchantName}</span>
          </div>
        )}

        <button
          onClick={() => setLanguage(language === 'hi' ? 'en' : 'hi')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-lg border text-xs sm:text-sm font-bold transition-all shadow-2xs ${
            language === 'hi'
              ? 'bg-[#0B8063] text-white border-[#0B8063] shadow-xs'
              : 'bg-white text-[#111918] border-[#E4E7E5] hover:bg-[#F1F3F2]'
          }`}
          title="Switch language between Hindi (हिंदी) and English"
        >
          <Globe className="w-4 h-4" />
          <span>{language === 'hi' ? 'हिंदी (Hindi Active)' : 'English (English Active)'}</span>
        </button>

        {onOpenAuth && (
          <button
            onClick={() => onOpenAuth('signup')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white hover:bg-[#F1F3F2] border border-[#E4E7E5] text-xs sm:text-sm text-[#111918] font-bold transition-colors shadow-2xs"
          >
            <span>{language === 'hi' ? '🔑 लॉगिन / साइनअप' : '🔑 Login / Sign Up'}</span>
          </button>
        )}
      </div>
    </header>
  );
}
