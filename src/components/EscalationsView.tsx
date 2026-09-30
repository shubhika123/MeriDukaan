'use client';

import React, { useState } from 'react';
import { EscalationTicket, Merchant } from '@/lib/types';
import { store } from '@/lib/db/store';
import { diagnoseAndTroubleshoot } from '@/lib/ai/agents/troubleshootingAgent';
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Clock,
  UserCheck,
  Sparkles,
  RefreshCw
} from 'lucide-react';

interface EscalationsViewProps {
  merchant: Merchant;
  onUpdateMerchant: (m: Merchant) => void;
}

export function EscalationsView({ merchant, onUpdateMerchant }: EscalationsViewProps) {
  const [escalations, setEscalations] = useState<EscalationTicket[]>(store.getEscalations());
  const [runningTroubleshooting, setRunningTroubleshooting] = useState(false);

  const handleResolveTicket = (ticketId: string) => {
    store.updateEscalationStatus(ticketId, 'Resolved');
    setEscalations([...store.getEscalations()]);
  };

  const handleTriggerTroubleshooting = () => {
    setRunningTroubleshooting(true);
    setTimeout(() => {
      diagnoseAndTroubleshoot(merchant);
      onUpdateMerchant({ ...merchant });
      setEscalations([...store.getEscalations()]);
      setRunningTroubleshooting(false);
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Workspace Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-md bg-white border border-[#E4E7E5] shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-[#C2413B] flex items-center justify-center text-white shrink-0">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#111918]">Support & Escalation Management</h2>
            <p className="text-xs text-[#66706F]">Active support tickets triggered by automated guardrails</p>
          </div>
        </div>

        <button
          onClick={handleTriggerTroubleshooting}
          disabled={runningTroubleshooting}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-md bg-[#0B8063] hover:bg-[#087F5B] text-white font-semibold text-xs shadow-xs transition-colors"
        >
          {runningTroubleshooting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
          <span>Run Troubleshooting Agent</span>
        </button>
      </div>

      {/* Escalation Tickets List */}
      <div className="space-y-4">
        {escalations.map(ticket => (
          <div
            key={ticket.ticketId}
            className="p-5 rounded-md bg-white border border-[#E4E7E5] space-y-4 shadow-xs hover:border-[#0B8063] transition-colors"
          >
            {/* Header Row */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#E4E7E5]">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-[#0B8063] bg-[#0B8063]/10 px-2 py-0.5 rounded font-mono">
                  #{ticket.ticketId.replace('ESC-', '')}
                </span>
                <h3 className="text-sm font-bold text-[#111918]">{ticket.merchantName}</h3>
                <span className="text-xs text-[#66706F]">Stage: <strong className="text-[#111918]">{ticket.currentStage}</strong></span>
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  ticket.priority === 'High' || ticket.priority === 'Urgent'
                    ? 'bg-[#C2413B]/10 text-[#C2413B]'
                    : 'bg-[#B7791F]/10 text-[#B7791F]'
                }`}>
                  Priority: {ticket.priority}
                </span>

                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  ticket.status === 'Resolved'
                    ? 'bg-[#16835B]/10 text-[#16835B]'
                    : 'bg-[#0B8063]/10 text-[#0B8063]'
                }`}>
                  Status: {ticket.status}
                </span>
              </div>
            </div>

            {/* Content Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded bg-[#F8F8F5] border border-[#E4E7E5] space-y-1.5">
                <span className="text-[10px] font-bold text-[#C2413B] uppercase block">Issue Overview</span>
                <p className="text-[#111918] font-semibold">{ticket.issue}</p>
                <div className="text-[10px] text-[#66706F]">Failed Attempts: {ticket.attempts}</div>
              </div>

              <div className="p-3.5 rounded bg-[#F8F8F5] border border-[#E4E7E5] space-y-1.5">
                <span className="text-[10px] font-bold text-[#0B8063] uppercase block">AI Diagnosis & Grounding</span>
                <p className="text-[#111918] text-[11px] leading-relaxed">{ticket.agentDiagnosis}</p>
                <div className="text-[10px] text-[#0B8063] font-bold">
                  Recommended Action: {ticket.recommendedAction}
                </div>
              </div>
            </div>

            {/* Bottom Actions Row */}
            <div className="flex items-center justify-between pt-2 border-t border-[#E4E7E5]">
              <div className="flex items-center gap-2 text-[11px] text-[#66706F]">
                <UserCheck className="w-3.5 h-3.5 text-[#0B8063]" />
                <span>Assigned Team: <strong className="text-[#111918]">{ticket.assignedTeam}</strong></span>
                <span className="mx-2">•</span>
                <Clock className="w-3.5 h-3.5 text-[#8E9897]" />
                <span>Age: 2h 14m ({ticket.createdTime})</span>
              </div>

              {ticket.status !== 'Resolved' && (
                <button
                  onClick={() => handleResolveTicket(ticket.ticketId)}
                  className="px-3 py-1.5 rounded bg-[#16835B] hover:bg-[#087F5B] text-white font-semibold text-xs flex items-center gap-1 transition-colors"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" /> Mark Resolved
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
