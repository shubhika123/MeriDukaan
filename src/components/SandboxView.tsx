'use client';

import React, { useState } from 'react';
import { Merchant, OnboardingStage, ToolCallLog } from '@/lib/types';
import { MetaAdsSandbox } from '@/lib/tools/metaSandbox';
import { store } from '@/lib/db/store';
import {
  Sliders,
  Play,
  Terminal,
  Cpu,
  Globe,
  Camera,
  Phone,
  Lock,
  Code
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface SandboxViewProps {
  merchant: Merchant;
  onUpdateMerchant: (updated: Merchant) => void;
}

export function SandboxView({ merchant, onUpdateMerchant }: SandboxViewProps) {
  const [executingTool, setExecutingTool] = useState<string | null>(null);
  const [logs, setLogs] = useState<ToolCallLog[]>(store.getToolLogs());

  const stages: { key: OnboardingStage; label: string }[] = [
    { key: 'SIGNED_UP', label: 'Signed Up' },
    { key: 'BUSINESS_DETAILS', label: 'Business Details' },
    { key: 'CAMPAIGN_OBJECTIVE', label: 'Campaign Objective' },
    { key: 'CAMPAIGN_DRAFT', label: 'Campaign Draft' },
    { key: 'CREATIVE_GENERATED', label: 'Creative Generated' },
    { key: 'CREATIVE_APPROVAL', label: 'Creative Approval' },
    { key: 'CHANNEL_CONNECTION', label: 'Channel Connection' },
    { key: 'CAMPAIGN_READY', label: 'Campaign Ready' },
    { key: 'MERCHANT_CONFIRMATION', label: 'Confirmation' },
    { key: 'LIVE', label: 'Live' }
  ];

  const currentStageIndex = stages.findIndex(s => s.key === merchant.stage);

  const refreshLogs = () => {
    setLogs([...store.getToolLogs()]);
  };

  const handleToolExecute = (toolName: string, actionFn: () => ToolCallLog) => {
    setExecutingTool(toolName);
    setTimeout(() => {
      const newLog = actionFn();
      store.addToolLog(newLog);
      refreshLogs();
      setExecutingTool(null);
    }, 400);
  };

  const handleConnectFacebook = () => {
    handleToolExecute('connect_facebook', () => {
      const res = MetaAdsSandbox.connectFacebook(merchant.id, merchant.profile.businessName || 'Merchant');
      merchant.channels.facebookConnected = true;
      merchant.channels.facebookAccountName = res.accountName;
      onUpdateMerchant({ ...merchant });
      return res.log;
    });
  };

  const handleConnectInstagram = () => {
    handleToolExecute('connect_instagram', () => {
      const handle = `@${(merchant.profile.businessName || 'merchant').toLowerCase().replace(/\s+/g, '_')}`;
      const res = MetaAdsSandbox.connectInstagram(merchant.id, handle);
      merchant.channels.instagramConnected = true;
      merchant.channels.instagramAccountHandle = res.handle;
      onUpdateMerchant({ ...merchant });
      return res.log;
    });
  };

  const handlePublish = () => {
    handleToolExecute('publish_campaign', () => {
      const res = MetaAdsSandbox.publishCampaign(merchant.id, merchant.metaCampaignId || 'meta-draft-84192');
      merchant.stage = 'LIVE';
      merchant.status = 'Live';
      merchant.risk = 'Low';
      merchant.metaCampaignId = res.liveId;
      onUpdateMerchant({ ...merchant });

      try {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch (e) {}

      return res.log;
    });
  };

  const availableToolsList = [
    'check_facebook_connection',
    'check_instagram_connection',
    'create_campaign_draft',
    'set_targeting',
    'set_budget',
    'publish_campaign'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Developer Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-md bg-white border border-[#E4E7E5] shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-[#173B3F] flex items-center justify-center text-white shrink-0">
            <Code className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-[#111918] font-mono">META ADS SANDBOX</h2>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#16835B]/10 text-[#16835B] font-bold font-mono">
                Status: Connected
              </span>
            </div>
            <p className="text-xs text-[#66706F]">Developer sandbox integration console for agentic tool calls</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#66706F]">
          <Lock className="w-3.5 h-3.5 text-[#B7791F]" />
          <span>Simulated Integration Environment</span>
        </div>
      </div>

      {/* State Stepper */}
      <div className="p-5 rounded-md bg-white border border-[#E4E7E5] space-y-3 shadow-xs">
        <span className="text-[10px] font-bold text-[#66706F] uppercase tracking-wider block font-mono">
          CAMPAIGN ACTIVATION STATE MACHINE
        </span>

        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2 text-center">
          {stages.map((st, idx) => {
            const isDone = idx < currentStageIndex;
            const isCurrent = idx === currentStageIndex;

            return (
              <div
                key={st.key}
                className={`p-2 rounded border text-[10px] font-mono transition-all ${
                  isCurrent
                    ? 'bg-[#0B8063] text-white border-[#0B8063] font-bold'
                    : isDone
                    ? 'bg-[#16835B]/10 text-[#16835B] border-[#16835B]/30'
                    : 'bg-[#F8F8F5] text-[#8E9897] border-[#E4E7E5]'
                }`}
              >
                <div className="text-[9px] uppercase opacity-75">Stage {idx + 1}</div>
                <div className="truncate">{st.label}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Available Tools & Channel Status Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Channel Setup & Actions (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-5 rounded-md bg-white border border-[#E4E7E5] space-y-4 shadow-xs">
            <span className="text-[10px] font-bold text-[#66706F] uppercase tracking-wider block font-mono">
              AVAILABLE SANDBOX TOOLS
            </span>

            <div className="space-y-1.5 font-mono text-xs">
              {availableToolsList.map(tName => (
                <div key={tName} className="p-2 rounded bg-[#F8F8F5] border border-[#E4E7E5] flex items-center justify-between text-[11px]">
                  <span className="text-[#0B8063] font-semibold">{tName}</span>
                  <span className="text-[9px] text-[#16835B] font-bold uppercase">Ready</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-md bg-white border border-[#E4E7E5] space-y-3 shadow-xs">
            <span className="text-[10px] font-bold text-[#66706F] uppercase tracking-wider block font-mono">
              CHANNEL CONNECTIONS
            </span>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded bg-[#F8F8F5] border border-[#E4E7E5] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-[#66706F]" />
                  <span className="font-medium text-[#111918]">Facebook Page</span>
                </div>
                {merchant.channels.facebookConnected ? (
                  <span className="text-[10px] font-bold text-[#16835B]">Connected</span>
                ) : (
                  <button onClick={handleConnectFacebook} className="px-2 py-0.5 rounded bg-[#0B8063] text-white text-[10px] font-semibold">
                    Connect
                  </button>
                )}
              </div>

              <div className="p-3 rounded bg-[#F8F8F5] border border-[#E4E7E5] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Camera className="w-3.5 h-3.5 text-[#66706F]" />
                  <span className="font-medium text-[#111918]">Instagram Profile</span>
                </div>
                {merchant.channels.instagramConnected ? (
                  <span className="text-[10px] font-bold text-[#16835B]">Connected</span>
                ) : (
                  <button onClick={handleConnectInstagram} className="px-2 py-0.5 rounded bg-[#0B8063] text-white text-[10px] font-semibold">
                    Connect
                  </button>
                )}
              </div>
            </div>

            <button
              onClick={handlePublish}
              disabled={merchant.stage === 'LIVE'}
              className="w-full py-2.5 rounded bg-[#0B8063] hover:bg-[#087F5B] disabled:opacity-50 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors mt-2"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>{merchant.stage === 'LIVE' ? 'Campaign Live' : 'Publish & Activate Campaign'}</span>
            </button>
          </div>
        </div>

        {/* Right Side: Tool Execution Log (7 cols) */}
        <div className="lg:col-span-7 p-5 rounded-md bg-[#111918] text-[#F8F8F5] border border-[#20383A] space-y-3 shadow-xs h-[520px] flex flex-col">
          <div className="flex items-center justify-between border-b border-[#20383A] pb-2 font-mono">
            <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-[#0B8063]" /> TOOL EXECUTION LOG
            </span>
            <span className="text-[10px] text-[#8E9897]">{logs.length} Entries</span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-2 font-mono text-[11px] pt-1">
            {logs.map(log => (
              <div key={log.id} className="p-3 rounded bg-[#173B3F]/40 border border-[#20383A] space-y-1">
                <div className="flex items-center justify-between text-[#8E9897] text-[10px]">
                  <span className="text-white font-bold">{log.agentName}</span>
                  <span>{log.timestamp}</span>
                </div>
                <div className="text-[#0B8063] font-bold">
                  tool: <span className="text-white">{log.toolName}</span>
                </div>
                <div className="text-[#8E9897] text-[10px] overflow-x-auto">
                  <span>args:</span> {JSON.stringify(log.args)}
                </div>
                <div className="text-emerald-400 text-[10px] overflow-x-auto">
                  <span>result:</span> {JSON.stringify(log.result)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
