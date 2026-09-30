'use client';

import React, { useState } from 'react';
import { AgentTrace } from '@/lib/types';
import { store } from '@/lib/db/store';
import { Bot, Terminal, Cpu, CheckCircle2, ArrowRight } from 'lucide-react';

export function AgentConsoleView() {
  const [traces] = useState<AgentTrace[]>(store.getTraces());

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Workspace Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-md bg-white border border-[#E4E7E5] shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-[#0B8063] flex items-center justify-center text-white shrink-0">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#111918]">Agent Reasoning Console</h2>
            <p className="text-xs text-[#66706F]">Operational execution trace (Excludes private chain-of-thought)</p>
          </div>
        </div>

        <span className="px-2.5 py-1 rounded bg-[#0B8063]/10 text-[#0B8063] font-mono font-bold text-xs">
          5 Agents Operational
        </span>
      </div>

      {/* Ryze/Pi-inspired Split Layout: Left Trace Stream (7 cols) - Right Operational Context (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Agent Trace Stream (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {traces.map((trace, idx) => (
            <div
              key={trace.id}
              className="p-5 rounded-lg bg-[#111918] text-white border border-[#20383A] space-y-3 shadow-xs"
            >
              <div className="flex items-center justify-between pb-2 border-b border-[#20383A]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span className="text-xs font-bold text-white">{trace.agentName}</span>
                  <span className="text-[10px] text-[#8E9897] font-mono">Step #{idx + 1}</span>
                </div>
                <span className="text-[10px] text-[#8E9897] font-mono">{trace.timestamp}</span>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-[#8E9897] block text-[10px]">Action Taken:</span>
                  <p className="font-semibold text-white">{trace.action}</p>
                </div>

                <div className="p-2.5 rounded bg-[#173B3F]/50 border border-[#20383A] font-mono text-[11px]">
                  <span className="text-[#8E9897] block text-[10px]">Tool Executed:</span>
                  <span className="text-[#0B8063] font-bold">{trace.toolExecuted || 'None (Direct Reasoning)'}</span>
                </div>

                <div>
                  <span className="text-[#8E9897] block text-[10px]">Result Summary:</span>
                  <p className="text-[#8E9897] text-[11px]">{trace.resultSummary}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-[#20383A] text-[11px] font-semibold text-[#0B8063] flex items-center justify-between">
                <span>Next Step: {trace.nextStep}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Live Merchant Context Panel (5 cols) */}
        <div className="lg:col-span-5 p-5 rounded-md bg-white border border-[#E4E7E5] space-y-4 shadow-xs h-fit">
          <h3 className="text-xs font-bold text-[#111918] uppercase tracking-wider">
            AGENT ORCHESTRATION STATE
          </h3>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded bg-[#F8F8F5] border border-[#E4E7E5] space-y-1">
              <span className="text-[10px] text-[#66706F] uppercase block font-medium">Active Merchant</span>
              <span className="font-bold text-[#111918]">GlowFit Gym (Sector 62, Noida)</span>
            </div>

            <div className="p-3 rounded bg-[#F8F8F5] border border-[#E4E7E5] space-y-1">
              <span className="text-[10px] text-[#66706F] uppercase block font-medium">Active Stage</span>
              <span className="font-bold text-[#0B8063] font-mono">CHANNEL_CONNECTION</span>
            </div>

            <div className="p-3 rounded bg-[#F8F8F5] border border-[#E4E7E5] space-y-1">
              <span className="text-[10px] text-[#66706F] uppercase block font-medium">Guardrail Protocol</span>
              <span className="text-[#16835B] font-semibold">Strict confirm on publish_campaign()</span>
            </div>

            <div className="p-3 rounded bg-[#F8F8F5] border border-[#E4E7E5] space-y-1">
              <span className="text-[10px] text-[#66706F] uppercase block font-medium">RAG Grounding SLA</span>
              <span className="text-[#111918] font-medium">Knowledge Base Grounding Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
