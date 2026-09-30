'use client';

import React, { useState } from 'react';
import { Merchant, EscalationTicket } from '@/lib/types';
import { processSaathiMessage, SaathiResponse } from '@/lib/ai/agents/saathiAgent';
import { SarvamAIService } from '@/lib/sarvam';
import { store } from '@/lib/db/store';
import {
  Bot,
  User,
  Send,
  Mic,
  MicOff,
  Sparkles,
  ShieldAlert,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  Volume2,
  RefreshCw,
  Globe,
  ArrowRight
} from 'lucide-react';

interface SaathiSupportViewProps {
  merchant: Merchant;
  onUpdateMerchant: (m: Merchant) => void;
  onSwitchTab?: (tab: any) => void;
  language?: 'en' | 'hi';
  setLanguage?: (lang: 'en' | 'hi') => void;
}

interface ChatMessage {
  id: string;
  sender: 'saathi' | 'merchant';
  text: string;
  timestamp: string;
  toolCallExecuted?: string;
  toolResult?: Record<string, any>;
  ragCitation?: { sourceTitle: string; docId: string; excerpt: string };
  suggestedActions?: string[];
  isVoice?: boolean;
}

export function SaathiSupportView({
  merchant,
  onUpdateMerchant,
  onSwitchTab
}: SaathiSupportViewProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'saathi',
      text: `Namaste ${merchant.profile.merchantName || 'Rameshji'}! Main Saathi hoon, aapka business onboarding companion. Main aapki **${merchant.profile.businessName || 'Sharma Fitness Studio'}** (${merchant.profile.city || 'Lucknow'}) ke Facebook, WhatsApp aur Meta campaign me kaise madad kar sakta hoon?`,
      timestamp: new Date().toLocaleTimeString(),
      suggestedActions: ['Facebook connect nahi ho raha', 'WhatsApp status check karo', 'Campaign Strategy dikhao']
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [voiceState, setVoiceState] = useState<'idle' | 'listening' | 'thinking' | 'responding'>('idle');

  const handleSend = async (customText?: string, isVoice: boolean = false) => {
    const textToSend = customText || inputText;
    if (!textToSend.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'merchant',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString(),
      isVoice
    };

    setMessages(prev => [...prev, userMsg]);
    if (!customText) setInputText('');
    setLoading(true);

    try {
      const saathiRes = await processSaathiMessage(merchant, textToSend);

      if (saathiRes.escalationCreated) {
        onUpdateMerchant({ ...store.getMerchant(merchant.id)! });
      }

      // If voice enabled, generate TTS audio via Sarvam API
      if (isVoice) {
        setVoiceState('responding');
        await SarvamAIService.textToSpeech(saathiRes.reply, merchant.profile.preferredLanguage || 'hi');
        setTimeout(() => setVoiceState('idle'), 2000);
      }

      const saathiMsg: ChatMessage = {
        id: `saa-${Date.now()}`,
        sender: 'saathi',
        text: saathiRes.reply,
        timestamp: new Date().toLocaleTimeString(),
        toolCallExecuted: saathiRes.toolCallExecuted,
        toolResult: saathiRes.toolResult,
        ragCitation: saathiRes.ragCitation,
        suggestedActions: saathiRes.suggestedActions
      };

      setMessages(prev => [...prev, saathiMsg]);
    } catch (err) {
      console.error('Error in Saathi chat:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleVoiceToggle = async () => {
    if (voiceState !== 'idle') {
      setVoiceState('idle');
      return;
    }

    setVoiceState('listening');
    setTimeout(async () => {
      setVoiceState('thinking');
      const stt = await SarvamAIService.speechToText('', merchant.profile.preferredLanguage || 'hi');
      await handleSend(stt.transcript, true);
    }, 2500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Saathi Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-6 rounded-xl bg-white border border-[#E4E7E5] shadow-2xs">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-[#0B8063] flex items-center justify-center text-white shrink-0 shadow-xs">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2.5">
              <h2 className="text-lg sm:text-xl font-extrabold text-[#111918]">Saathi — AI Merchant Support Companion</h2>
              <span className="flex items-center gap-1.5 text-xs px-2.5 py-0.5 rounded-md bg-[#16835B]/10 text-[#16835B] font-bold font-mono">
                <span className="w-2 h-2 rounded-full bg-[#16835B] animate-ping" /> Online
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#52605E] font-medium">Multilingual Hindi/Hinglish support, direct channel status checks & instant help desk</p>
          </div>
        </div>

        <button
          onClick={handleVoiceToggle}
          className={`flex items-center gap-2.5 px-5 py-3 rounded-lg text-sm font-bold shadow-xs transition-all transform hover:-translate-y-0.5 ${
            voiceState !== 'idle'
              ? 'bg-[#C2413B] text-white animate-pulse'
              : 'bg-[#0B8063] hover:bg-[#087F5B] text-white'
          }`}
        >
          {voiceState !== 'idle' ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          <span>{voiceState !== 'idle' ? `Voice Mode (${voiceState.toUpperCase()})` : '🎙 Talk to Saathi (Hindi Voice)'}</span>
        </button>
      </div>

      {/* Main Chat & Sidebar Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side Chat (8 cols) */}
        <div className="lg:col-span-8 flex flex-col h-[650px] rounded-xl bg-white border border-[#E4E7E5] overflow-hidden shadow-2xs">
          <div className="p-4 bg-[#F8F8F5] border-b border-[#E4E7E5] flex items-center justify-between text-xs sm:text-sm font-semibold">
            <span className="text-[#111918] font-bold">Active Support Session</span>
            <span className="text-[#52605E]">Language: <strong className="text-[#0B8063] font-bold">Hindi / Hinglish (हिंदी)</strong></span>
          </div>

          <div className="flex-1 p-5 overflow-y-auto space-y-4 no-scrollbar">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex gap-3.5 ${msg.sender === 'merchant' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.sender === 'saathi' && (
                  <div className="w-9 h-9 rounded-lg bg-[#0B8063] text-white flex items-center justify-center text-sm shrink-0 mt-0.5 shadow-xs">
                    <Bot className="w-4.5 h-4.5" />
                  </div>
                )}
                <div
                  className={`max-w-[84%] p-4 rounded-xl text-sm sm:text-base leading-relaxed space-y-2.5 ${
                    msg.sender === 'merchant'
                      ? 'bg-[#0B8063] text-white font-medium rounded-br-xs shadow-xs'
                      : 'bg-[#F8F8F5] border border-[#E4E7E5] text-[#111918] font-medium rounded-bl-xs shadow-2xs'
                  }`}
                >
                  <p className="whitespace-pre-line font-medium">{msg.text}</p>

                  {/* Tool Call Log Display inside chat bubble */}
                  {msg.toolCallExecuted && (
                    <div className="p-3 rounded-lg bg-white border border-[#E4E7E5] font-mono text-xs space-y-1.5 text-[#111918] shadow-2xs">
                      <div className="flex items-center justify-between text-xs text-[#52605E]">
                        <span>Tool Executed</span>
                        <span className="text-[#16835B] font-bold">✓ SUCCESS</span>
                      </div>
                      <div className="text-[#0B8063] font-bold text-xs sm:text-sm">{msg.toolCallExecuted}</div>
                      {msg.toolResult && (
                        <div className="text-xs text-[#52605E] overflow-x-auto">
                          Result: {JSON.stringify(msg.toolResult)}
                        </div>
                      )}
                    </div>
                  )}

                  {/* RAG Citation Display */}
                  {msg.ragCitation && (
                    <div className="p-3 rounded-lg bg-[#0B8063]/10 border border-[#0B8063]/20 text-xs sm:text-sm text-[#0B8063] space-y-1">
                      <div className="font-bold flex items-center gap-1.5 font-mono">
                        <BookOpen className="w-4 h-4" /> Source: {msg.ragCitation.sourceTitle} ({msg.ragCitation.docId})
                      </div>
                      <p className="text-xs text-[#52605E] italic">&quot;{msg.ragCitation.excerpt}&quot;</p>
                    </div>
                  )}

                  <span className={`text-xs block text-right ${msg.sender === 'merchant' ? 'text-white/80' : 'text-[#8E9897]'}`}>{msg.timestamp}</span>
                </div>
                {msg.sender === 'merchant' && (
                  <div className="w-9 h-9 rounded-lg bg-[#111918] text-white flex items-center justify-center text-sm shrink-0 mt-0.5 shadow-xs">
                    <User className="w-4.5 h-4.5" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-xs text-[#0B8063] font-medium">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Saathi is analyzing issue & executing tool calls...</span>
              </div>
            )}
          </div>

          {/* Quick Action Suggestion Chips */}
          <div className="px-4 py-2 bg-[#F8F8F5] border-t border-[#E4E7E5] flex items-center gap-2 overflow-x-auto text-[11px]">
            <span className="text-[#66706F] font-medium shrink-0">Actions:</span>
            {['Fix Connection', 'Try Again', 'Talk to Support'].map(action => (
              <button
                key={action}
                onClick={() => handleSend(action)}
                className="px-2.5 py-1 rounded bg-white border border-[#E4E7E5] text-[#111918] font-medium hover:border-[#0B8063] shrink-0 transition-colors"
              >
                {action}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="p-3 bg-[#F8F8F5] border-t border-[#E4E7E5] flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Ask Saathi in Hindi or English (e.g. Facebook connect nahi ho raha)..."
              className="flex-1 bg-white border border-[#E4E7E5] rounded px-3.5 py-2 text-xs text-[#111918] placeholder-[#8E9897] focus:outline-none focus:border-[#0B8063]"
            />
            <button
              onClick={() => handleSend()}
              disabled={loading || !inputText.trim()}
              className="p-2 rounded bg-[#0B8063] hover:bg-[#087F5B] disabled:opacity-50 text-white transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Side: Merchant Onboarding Tracker & Escalation Widget (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-5 rounded-md bg-white border border-[#E4E7E5] space-y-3 shadow-xs">
            <span className="text-[10px] font-bold text-[#66706F] uppercase tracking-wider block font-mono">
              MERCHANT CONTEXT
            </span>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded bg-[#F8F8F5] border border-[#E4E7E5]">
                <span className="text-[10px] text-[#66706F] block font-medium">Business</span>
                <span className="font-bold text-[#111918]">{merchant.profile.businessName}</span>
                <span className="text-[10px] text-[#66706F] block">{merchant.profile.city} • {merchant.profile.category}</span>
              </div>

              <div className="p-3 rounded bg-[#F8F8F5] border border-[#E4E7E5]">
                <span className="text-[10px] text-[#66706F] block font-medium">Stage Status</span>
                <span className="font-bold text-[#0B8063] font-mono text-[11px]">{merchant.stage}</span>
              </div>

              <div className="p-3 rounded bg-[#F8F8F5] border border-[#E4E7E5] flex items-center justify-between">
                <span className="text-[10px] text-[#66706F] font-medium">Escalation Status</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  merchant.status === 'Escalated' ? 'bg-[#C2413B]/10 text-[#C2413B]' : 'bg-[#16835B]/10 text-[#16835B]'
                }`}>
                  {merchant.status}
                </span>
              </div>
            </div>

            <button
              onClick={() => onSwitchTab?.('escalations')}
              className="w-full py-2 rounded bg-[#F1F3F2] hover:bg-[#E4E7E5] text-[#111918] font-semibold text-xs flex items-center justify-center gap-1 border border-[#E4E7E5] transition-colors"
            >
              <span>View Escalation Desk</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#66706F]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
