'use client';

import React, { useState, useEffect } from 'react';
import { Merchant, MerchantProfile } from '@/lib/types';
import { detectMissingFields } from '@/lib/ai/agents/onboardingAgent';
import {
  Send,
  Bot,
  User,
  CheckCircle2,
  AlertCircle,
  Globe,
  ArrowRight,
  RefreshCw,
  Building2,
  Tag,
  MapPin,
  Target,
  DollarSign,
  Gift,
  Briefcase
} from 'lucide-react';

interface OnboardingViewProps {
  merchant: Merchant;
  onUpdateProfile: (updatedProfile: MerchantProfile) => void;
  onProceedToCampaign: () => void;
  language: 'en' | 'hi';
  setLanguage: (lang: 'en' | 'hi') => void;
}

interface ChatMessage {
  id: string;
  sender: 'ai' | 'merchant';
  text: string;
  timestamp: string;
}

export function OnboardingView({
  merchant,
  onUpdateProfile,
  onProceedToCampaign,
  language,
  setLanguage
}: OnboardingViewProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMessages([
      {
        id: 'msg-1',
        sender: 'ai',
        text: language === 'hi'
          ? `Namaste! Main aapka **Meri Dukaan AI Saathi** hoon. Kripya apne business ke baare mein batayein taaki hum aapke liye Meta Ads campaign shuru kar sakein.`
          : `Hello! I'm your **Meri Dukaan AI Saathi**. Let's set up your business profile to activate your Meta Ads campaign. Tell me about your business!`,
        timestamp: new Date().toLocaleTimeString()
      }
    ]);
  }, [language]);

  const missingFields = detectMissingFields(merchant.profile);
  const isComplete = missingFields.length === 0;

  const handleSendMessage = async (customMsg?: string) => {
    const textToSend = customMsg || inputText;
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'merchant',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages(prev => [...prev, userMsg]);
    if (!customMsg) setInputText('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          merchantId: merchant.id,
          message: textToSend
        })
      });

      if (res.ok) {
        const data = await res.json();
        onUpdateProfile(data.profile);

        const aiMsg: ChatMessage = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: data.reply,
          timestamp: new Date().toLocaleTimeString()
        };
        setMessages(prev => [...prev, aiMsg]);
      }
    } catch (err) {
      console.error('Error in chat route:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFieldChange = (field: keyof MerchantProfile, value: string) => {
    const updated = { ...merchant.profile, [field]: value };
    onUpdateProfile(updated);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Workspace Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-md bg-white border border-[#E4E7E5] shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-[#0B8063] flex items-center justify-center text-white shrink-0">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-[#111918]">
                {language === 'hi' ? 'Merchant Onboarding Workspace (हिंदी)' : 'Merchant Onboarding Workspace'}
              </h2>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#0B8063]/10 text-[#0B8063] font-semibold border border-[#0B8063]/20">
                Agent 1 (Onboarding)
              </span>
            </div>
            <p className="text-xs text-[#66706F]">Conversational business profiling and entity extraction</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-[10px] text-[#66706F] font-medium">Profile Strength</div>
            <div className="text-xs font-bold text-[#111918]">
              {8 - missingFields.length} / 8 Fields Completed
            </div>
          </div>
          <div className="w-24 h-2 bg-[#F1F3F2] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#0B8063] transition-all duration-300"
              style={{ width: `${((8 - missingFields.length) / 8) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Split Layout: Left Chat (7 cols) - Right Form (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Chat Panel */}
        <div className="lg:col-span-7 flex flex-col h-[600px] rounded-md bg-white border border-[#E4E7E5] overflow-hidden shadow-xs">
          <div className="p-3.5 bg-[#F8F8F5] border-b border-[#E4E7E5] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#16835B]" />
              <span className="text-xs font-semibold text-[#111918]">
                {language === 'hi' ? 'Live AI Agent Session (हिंदी)' : 'Live Agent Session'}
              </span>
            </div>
            <button
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="text-xs text-[#0B8063] hover:underline flex items-center gap-1 font-medium"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'Switch to Hindi (हिंदी)' : 'Switch to English'}</span>
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-4 no-scrollbar">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.sender === 'merchant' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'ai' && (
                  <div className="w-9 h-9 rounded-lg bg-[#0B8063] text-white flex items-center justify-center text-sm shrink-0 shadow-xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}
                <div
                  className={`max-w-[82%] p-4 rounded-xl text-sm sm:text-base leading-relaxed ${
                    msg.sender === 'merchant'
                      ? 'bg-[#0B8063] text-white font-medium rounded-br-xs shadow-xs'
                      : 'bg-[#F8F8F5] border border-[#E4E7E5] text-[#111918] font-medium rounded-bl-xs shadow-2xs'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                  <span className={`text-xs block mt-1.5 text-right ${msg.sender === 'merchant' ? 'text-white/80' : 'text-[#8E9897]'}`}>{msg.timestamp}</span>
                </div>
                {msg.sender === 'merchant' && (
                  <div className="w-9 h-9 rounded-lg bg-[#111918] text-white flex items-center justify-center text-sm shrink-0 shadow-xs">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-xs text-[#0B8063] font-medium">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Processing input & updating profile parameters...</span>
              </div>
            )}
          </div>

          {missingFields.length > 0 && (
            <div className="px-4 py-2 bg-[#F8F8F5] border-t border-[#E4E7E5] flex items-center gap-2 overflow-x-auto text-[11px]">
              <span className="text-[#66706F] font-medium shrink-0">Missing:</span>
              {missingFields.map(f => (
                <span
                  key={f}
                  className="px-2 py-0.5 rounded bg-white border border-[#E4E7E5] text-[#111918] hover:border-[#0B8063] shrink-0 cursor-pointer font-medium"
                  onClick={() =>
                    handleSendMessage(
                      f === 'Budget'
                        ? (language === 'hi' ? 'Mera budget ₹5,000 mahina hai' : 'My monthly advertising budget is ₹5,000')
                        : (language === 'hi' ? `Mera ${f} GlowFit Gym hai` : `My ${f} is GlowFit Gym`)
                    )
                  }
                >
                  + Add {f}
                </span>
              ))}
            </div>
          )}

          <div className="p-3.5 bg-[#F8F8F5] border-t border-[#E4E7E5] flex items-center gap-2.5">
            <input
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
              placeholder={
                language === 'hi'
                  ? 'Apne business ke baare mein batayein (e.g. Meri gym Lucknow me hai)...'
                  : 'Tell the agent about your business (e.g., I own a gym in Lucknow)...'
              }
              className="flex-1 bg-white border border-[#E4E7E5] rounded-lg px-4 py-3 text-sm sm:text-base text-[#111918] placeholder-[#8E9897] focus:outline-none focus:border-[#0B8063] font-medium"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={loading || !inputText.trim()}
              className="p-3 rounded-lg bg-[#0B8063] hover:bg-[#087F5B] disabled:opacity-50 text-white transition-colors font-bold flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Structured Merchant Profile Form (5 cols) */}
        <div className="lg:col-span-5 rounded-xl bg-white border border-[#E4E7E5] p-6 space-y-4 flex flex-col justify-between shadow-2xs">
          <div>
            <div className="flex items-center justify-between pb-3.5 border-b border-[#E4E7E5]">
              <h3 className="text-xs sm:text-sm font-extrabold text-[#111918] uppercase tracking-wider flex items-center gap-2">
                <Briefcase className="w-4.5 h-4.5 text-[#0B8063]" />
                <span>MERCHANT PROFILE DETAILS</span>
              </h3>
              {isComplete ? (
                <span className="text-xs font-bold text-[#16835B] bg-[#16835B]/10 px-2.5 py-1 rounded-md">
                  ✓ READY
                </span>
              ) : (
                <span className="text-xs font-bold text-[#B7791F] bg-[#B7791F]/10 px-2.5 py-1 rounded-md">
                  ⚠ INCOMPLETE
                </span>
              )}
            </div>

            <div className="space-y-4 pt-4">
              <div>
                <label className="text-xs sm:text-sm font-bold text-[#111918] block mb-1">Business Name</label>
                <input
                  type="text"
                  value={merchant.profile.businessName}
                  onChange={e => handleFieldChange('businessName', e.target.value)}
                  className="w-full bg-[#F8F8F5] border border-[#E4E7E5] rounded-lg px-3.5 py-2.5 text-sm sm:text-base text-[#111918] focus:outline-none focus:border-[#0B8063] font-medium"
                  placeholder="e.g. Sharma Fitness Studio"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs sm:text-sm font-bold text-[#111918] block mb-1">Category</label>
                  <input
                    type="text"
                    value={merchant.profile.category}
                    onChange={e => handleFieldChange('category', e.target.value)}
                    className="w-full bg-[#F8F8F5] border border-[#E4E7E5] rounded-lg px-3.5 py-2.5 text-sm sm:text-base text-[#111918] focus:outline-none focus:border-[#0B8063] font-medium"
                    placeholder="e.g. Gym & Fitness"
                  />
                </div>

                <div>
                  <label className="text-xs sm:text-sm font-bold text-[#111918] block mb-1">City / Location</label>
                  <input
                    type="text"
                    value={merchant.profile.city || merchant.profile.location}
                    onChange={e => handleFieldChange('city', e.target.value)}
                    className="w-full bg-[#F8F8F5] border border-[#E4E7E5] rounded-lg px-3.5 py-2.5 text-sm sm:text-base text-[#111918] focus:outline-none focus:border-[#0B8063] font-medium"
                    placeholder="e.g. Hazratganj, Lucknow"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs sm:text-sm font-bold text-[#111918] block mb-1">Target Audience</label>
                <input
                  type="text"
                  value={merchant.profile.targetAudience}
                  onChange={e => handleFieldChange('targetAudience', e.target.value)}
                  className="w-full bg-[#F8F8F5] border border-[#E4E7E5] rounded-lg px-3.5 py-2.5 text-sm sm:text-base text-[#111918] focus:outline-none focus:border-[#0B8063] font-medium"
                  placeholder="e.g. Working professionals & fitness enthusiasts (20-45 yrs)"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs sm:text-sm font-bold text-[#111918] block mb-1">Objective</label>
                  <input
                    type="text"
                    value={merchant.profile.campaignObjective}
                    onChange={e => handleFieldChange('campaignObjective', e.target.value)}
                    className="w-full bg-[#F8F8F5] border border-[#E4E7E5] rounded-lg px-3.5 py-2.5 text-sm sm:text-base text-[#111918] focus:outline-none focus:border-[#0B8063] font-medium"
                    placeholder="e.g. Lead Generation"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-medium text-[#66706F] block mb-1">Budget</label>
                  <input
                    type="text"
                    value={merchant.profile.budget}
                    onChange={e => handleFieldChange('budget', e.target.value)}
                    className="w-full bg-[#F8F8F5] border border-[#E4E7E5] rounded px-3 py-1.5 text-xs text-[#111918] focus:outline-none"
                    placeholder="e.g. ₹5,000"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-medium text-[#66706F] block mb-1">Offer / Incentive</label>
                <input
                  type="text"
                  value={merchant.profile.offer}
                  onChange={e => handleFieldChange('offer', e.target.value)}
                  className="w-full bg-[#F8F8F5] border border-[#E4E7E5] rounded px-3 py-1.5 text-xs text-[#111918] focus:outline-none"
                  placeholder="e.g. 3-day free trial"
                />
              </div>
            </div>
          </div>

          <button
            onClick={onProceedToCampaign}
            disabled={!isComplete}
            className="w-full py-2.5 rounded-md bg-[#0B8063] hover:bg-[#087F5B] disabled:opacity-50 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors mt-4"
          >
            <span>{language === 'hi' ? 'Campaign & Creative Studio par aage badhein' : 'Proceed to Campaign & Creative Studio'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
