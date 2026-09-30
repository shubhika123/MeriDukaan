'use client';

import React from 'react';
import {
  Compass,
  Users,
  Megaphone,
  Network,
  Sliders,
  ShieldAlert,
  LayoutDashboard,
  Bot,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Briefcase,
  Play,
  Globe,
  MapPin,
  Sparkles
} from 'lucide-react';
import { TabType } from '@/lib/types';

interface SidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  language: 'en' | 'hi';
  setLanguage: (lang: 'en' | 'hi') => void;
  onStartDemo: () => void;
  selectedMerchantName?: string;
}

export function Sidebar({
  activeTab,
  setActiveTab,
  language,
  setLanguage,
  onStartDemo,
  selectedMerchantName
}: SidebarProps) {
  const isHindi = language === 'hi';

  const mainNavItems: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: isHindi ? 'ओवरव्यू (Overview)' : 'Overview', icon: <Compass className="w-4.5 h-4.5" /> },
    { id: 'onboarding', label: isHindi ? 'मर्चेंट ऑनबोर्डिंग' : 'Merchant Onboarding', icon: <Users className="w-4.5 h-4.5" /> },
    { id: 'campaigns', label: isHindi ? 'विज्ञापन व ऑफर स्टूडियो' : 'Ad & Offer Studio', icon: <Megaphone className="w-4.5 h-4.5" /> },
    { id: 'saathi', label: isHindi ? 'साथी सपोर्ट (हिंदी/वॉइस 🎙️)' : 'Saathi Support (Voice 🎙️)', icon: <Bot className="w-4.5 h-4.5 text-[#0B8063]" /> },
    { id: 'journey', label: isHindi ? 'ग्राहक लीड यात्रा' : 'Customer Lead Journey', icon: <Network className="w-4.5 h-4.5" /> }
  ];

  const executionNavItems: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'sandbox', label: isHindi ? 'मेटा व व्हाट्सएप चैनल' : 'Meta Ads Channels', icon: <Sliders className="w-4.5 h-4.5" /> },
    { id: 'escalations', label: isHindi ? 'हेल्प डेस्क व टिकट्स' : 'Help Desk & Tickets', icon: <ShieldAlert className="w-4.5 h-4.5" /> },
    { id: 'settings', label: isHindi ? 'सेटिंग्स व भाषा' : 'Settings & Language', icon: <Globe className="w-4.5 h-4.5" /> }
  ];

  const opsNavItems: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: isHindi ? 'बिजनेस ऑपरेशन्स' : 'Operations Dashboard', icon: <LayoutDashboard className="w-4.5 h-4.5" /> },
    { id: 'console', label: isHindi ? 'AI निर्णय लॉग' : 'Agent Reasoning Log', icon: <Bot className="w-4.5 h-4.5" /> },
    { id: 'knowledge', label: isHindi ? 'नॉलेज बेस (RAG)' : 'Knowledge Base', icon: <BookOpen className="w-4.5 h-4.5" /> },
    { id: 'evaluation', label: isHindi ? 'AI गुणवत्ता जांच' : 'Agent Evaluation', icon: <CheckCircle2 className="w-4.5 h-4.5" /> }
  ];

  const renderNavGroup = (title: string, items: typeof mainNavItems) => (
    <div className="space-y-1">
      <div className="px-3 text-[11px] font-bold uppercase tracking-wider text-[#52605E] mb-1.5">
        {title}
      </div>
      {items.map(item => {
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
              isActive
                ? 'bg-[#0B8063] text-white font-extrabold shadow-sm'
                : 'text-[#2D3735] hover:text-[#111918] hover:bg-[#EEF1EF]'
            }`}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span className={isActive ? 'text-white' : 'text-[#52605E]'}>
                {item.icon}
              </span>
              <span className="truncate">{item.label}</span>
            </div>
            {isActive && <ChevronRight className="w-3.5 h-3.5 text-white shrink-0" />}
          </button>
        );
      })}
    </div>
  );

  return (
    <aside className="w-72 bg-[#F8F8F5] border-r border-[#E4E7E5] flex flex-col h-screen sticky top-0 z-40 shrink-0 select-none">
      {/* Fixed Top Branding Header */}
      <div className="px-5 py-4 border-b border-[#E4E7E5] bg-[#F8F8F5] shrink-0 flex items-center justify-between">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('overview')}>
          <div className="w-9 h-9 rounded-xl bg-[#0B8063] flex items-center justify-center text-white shrink-0 shadow-sm">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base font-extrabold text-[#111918] tracking-tight">
                Meri Dukaan
              </span>
            </div>
            <span className="text-[11px] text-[#52605E] font-semibold block">
              Digital Growth Engine
            </span>
          </div>
        </div>

        <span className="px-2 py-0.5 rounded-full bg-[#0B8063]/10 text-[#0B8063] text-[10px] font-extrabold uppercase tracking-wide">
          v2.0
        </span>
      </div>

      {/* Main Continuous Scrollable Column */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6 no-scrollbar">
        {/* Navigation Categories */}
        <nav className="space-y-5">
          {renderNavGroup(isHindi ? 'दुकान ऑनबोर्डिंग व विज्ञापन' : 'Dukaan Onboarding & Ads', mainNavItems)}
          {renderNavGroup(isHindi ? 'चैनल व सहायता केंद्र' : 'Channels & Support', executionNavItems)}
          {renderNavGroup(isHindi ? 'बिजनेस ऑपरेशन्स व क्वालिटी' : 'Business Ops & Evaluation', opsNavItems)}
        </nav>

        {/* Active Merchant Live Snapshot Card */}
        <div className="p-3.5 rounded-xl bg-white border border-[#E4E7E5] space-y-2.5 shadow-2xs">
          <div className="flex items-center justify-between text-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#52605E]">
              {isHindi ? 'एक्टिव दुकान प्रोफाइल' : 'Active Shop Profile'}
            </span>
            <span className="w-2 h-2 rounded-full bg-[#16835B] animate-pulse" />
          </div>

          <div className="space-y-1">
            <div className="font-extrabold text-[#111918] text-sm flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-[#0B8063]" />
              <span className="truncate">{selectedMerchantName || 'Sharma Fitness'}</span>
            </div>
            <div className="text-xs text-[#52605E] flex items-center gap-1 font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#8E9897]" />
              <span>{isHindi ? 'लखनऊ • 5 किमी दायरा' : 'Lucknow • 5 km Radius'}</span>
            </div>
          </div>

          <div className="pt-2 border-t border-[#E4E7E5] flex items-center justify-between text-xs text-[#3D4745]">
            <span className="font-medium">{isHindi ? 'आज के लीड्स:' : 'Leads Today:'}</span>
            <span className="font-extrabold text-[#0B8063] bg-[#0B8063]/10 px-2 py-0.5 rounded">12 WhatsApp Calls</span>
          </div>
        </div>

        {/* Warm Saathi Voice Assistant Card */}
        <div 
          onClick={() => setActiveTab('saathi')}
          className="p-4 rounded-xl bg-gradient-to-br from-[#0B8063]/12 via-[#0B8063]/6 to-transparent border border-[#0B8063]/30 space-y-2.5 cursor-pointer hover:border-[#0B8063] transition-all shadow-2xs group"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-[#0B8063] text-white flex items-center justify-center shadow-2xs">
                <Bot className="w-4 h-4" />
              </div>
              <span className="text-xs font-extrabold text-[#111918]">
                {isHindi ? 'साथी वॉइस व चैट सपोर्ट' : 'Saathi Voice & Chat Help'}
              </span>
            </div>
            <Sparkles className="w-4 h-4 text-[#0B8063] animate-spin-slow" />
          </div>
          <p className="text-xs text-[#4A5553] leading-relaxed font-medium">
            {isHindi
              ? 'कोई सवाल या परेशानी? हिंदी में बोलकर साथी AI से तुरंत समाधान पाएं।'
              : 'Have questions? Talk to Saathi in Hindi or English voice anytime.'}
          </p>
          <div className="text-xs font-extrabold text-[#0B8063] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            <span>{isHindi ? 'साथी से बात करें 🎙️' : 'Talk to Saathi 🎙️'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* Action Buttons Section */}
        <div className="space-y-2.5 pt-2 border-t border-[#E4E7E5]">
          <button
            onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
            className="w-full flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-white hover:bg-[#F1F3F2] border border-[#E4E7E5] text-xs text-[#111918] font-extrabold transition-colors shadow-2xs"
          >
            <Globe className="w-4 h-4 text-[#0B8063]" />
            <span>Language: <strong className="text-[#0B8063] font-extrabold">{language === 'en' ? 'English' : 'हिंदी Active'}</strong></span>
          </button>

          <button
            onClick={onStartDemo}
            className="w-full flex items-center justify-center gap-2 px-3.5 py-3 rounded-xl bg-[#0B8063] hover:bg-[#087F5B] text-white text-xs font-extrabold shadow-sm transition-colors transform hover:-translate-y-0.5"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Load GlowFit Gym Demo</span>
          </button>
        </div>

        {/* Footer Note */}
        <div className="text-center text-[11px] text-[#8E9897] font-medium pt-2 pb-2">
          {isHindi ? 'मेरी दुकान © 2026 • Sarvam & Agentic AI Stack' : 'Meri Dukaan © 2026 • Powered by Sarvam & Agentic AI'}
        </div>
      </div>
    </aside>
  );
}
