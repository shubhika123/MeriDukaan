'use client';

import React, { useState } from 'react';
import { Merchant, IndianLanguage } from '@/lib/types';
import { Settings, Globe, Mic, Cpu, Lock, CheckCircle2, Key } from 'lucide-react';

interface SettingsViewProps {
  merchant: Merchant;
  onUpdateMerchant: (m: Merchant) => void;
  language?: 'en' | 'hi';
  setLanguage?: (lang: 'en' | 'hi') => void;
}

export function SettingsView({ merchant, onUpdateMerchant }: SettingsViewProps) {
  const [profile, setProfile] = useState(merchant.profile);

  const handleLanguageChange = (lang: IndianLanguage) => {
    const updatedProfile = { ...profile, preferredLanguage: lang };
    setProfile(updatedProfile);
    onUpdateMerchant({ ...merchant, profile: updatedProfile });
  };

  const handleToggleSetting = (field: 'voiceEnabled' | 'codeMixingEnabled') => {
    const updatedProfile = { ...profile, [field]: !profile[field] };
    setProfile(updatedProfile);
    onUpdateMerchant({ ...merchant, profile: updatedProfile });
  };

  const languagesList: { code: IndianLanguage; name: string; script: string }[] = [
    { code: 'hi', name: 'Hindi (हिन्दी)', script: 'Devanagari' },
    { code: 'en', name: 'English', script: 'Latin' },
    { code: 'bn', name: 'Bengali (বাংলা)', script: 'Bengali' },
    { code: 'mr', name: 'Marathi (मराठी)', script: 'Devanagari' },
    { code: 'ta', name: 'Tamil (தமிழ்)', script: 'Tamil' },
    { code: 'te', name: 'Telugu (తెలుగు)', script: 'Telugu' },
    { code: 'gu', name: 'Gujarati (ગુજરાતી)', script: 'Gujarati' },
    { code: 'kn', name: 'Kannada (ಕನ್ನಡ)', script: 'Kannada' },
    { code: 'ml', name: 'Malayalam (മലയാളം)', script: 'Malayalam' },
    { code: 'pa', name: 'Punjabi (ਪੰਜਾਬੀ)', script: 'Gurmukhi' },
    { code: 'or', name: 'Odia (ଓଡ଼ିଆ)', script: 'Odia' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Workspace Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-md bg-white border border-[#E4E7E5] shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-[#0B8063] flex items-center justify-center text-white shrink-0">
            <Settings className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#111918]">Platform Settings & Preferences</h2>
            <p className="text-xs text-[#66706F]">Manage language layers, voice interaction, and Sarvam AI integration</p>
          </div>
        </div>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Language & Voice Preferences (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-md bg-white border border-[#E4E7E5] space-y-5 shadow-xs">
          <h3 className="text-xs font-bold text-[#111918] uppercase tracking-wider flex items-center gap-2">
            <Globe className="w-4 h-4 text-[#0B8063]" />
            <span>INDIAN LANGUAGE PREFERENCES</span>
          </h3>

          <div className="space-y-4 text-xs">
            <div>
              <label className="text-[#66706F] block mb-2 font-medium">Preferred Interface Language</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {languagesList.map(l => (
                  <button
                    key={l.code}
                    onClick={() => handleLanguageChange(l.code)}
                    className={`p-2.5 rounded-md border text-left font-medium transition-all ${
                      profile.preferredLanguage === l.code
                        ? 'bg-[#0B8063]/10 border-[#0B8063] text-[#0B8063] font-bold'
                        : 'bg-[#F8F8F5] border-[#E4E7E5] text-[#111918] hover:border-[#0B8063]'
                    }`}
                  >
                    <div>{l.name}</div>
                    <div className="text-[10px] text-[#66706F]">{l.script}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[#E4E7E5] space-y-3">
              <div className="flex items-center justify-between p-3 rounded bg-[#F8F8F5] border border-[#E4E7E5]">
                <div>
                  <div className="font-bold text-[#111918]">Code-Mixing (Hinglish Support)</div>
                  <div className="text-[10px] text-[#66706F]">Allow mixing English terms in Hindi conversation</div>
                </div>
                <input
                  type="checkbox"
                  checked={profile.codeMixingEnabled ?? true}
                  onChange={() => handleToggleSetting('codeMixingEnabled')}
                  className="w-4 h-4 accent-[#0B8063]"
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded bg-[#F8F8F5] border border-[#E4E7E5]">
                <div>
                  <div className="font-bold text-[#111918]">Voice Support Mode (Sarvam TTS / STT)</div>
                  <div className="text-[10px] text-[#66706F]">Enable mic speech-to-text and audio response playback</div>
                </div>
                <input
                  type="checkbox"
                  checked={profile.voiceEnabled ?? true}
                  onChange={() => handleToggleSetting('voiceEnabled')}
                  className="w-4 h-4 accent-[#0B8063]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* API Status Panel (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-md bg-white border border-[#E4E7E5] space-y-5 shadow-xs">
          <h3 className="text-xs font-bold text-[#111918] uppercase tracking-wider flex items-center gap-2">
            <Key className="w-4 h-4 text-[#0B8063]" />
            <span>INTEGRATIONS STATUS</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded bg-[#F8F8F5] border border-[#E4E7E5] space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#111918]">Sarvam AI API</span>
                <span className="text-[10px] font-bold text-[#16835B] bg-[#16835B]/10 px-2 py-0.5 rounded">
                  ACTIVE
                </span>
              </div>
              <p className="text-[11px] text-[#66706F]">Configured via server-side SARVAM_API_KEY environment variable.</p>
            </div>

            <div className="p-3.5 rounded bg-[#F8F8F5] border border-[#E4E7E5] space-y-1">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#111918]">Meta Ads Integration</span>
                <span className="text-[10px] font-bold text-[#B7791F] bg-[#B7791F]/10 px-2 py-0.5 rounded">
                  SANDBOX DEMO
                </span>
              </div>
              <p className="text-[11px] text-[#66706F]">Simulated integration sandbox for tool calls and activation workflows.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
