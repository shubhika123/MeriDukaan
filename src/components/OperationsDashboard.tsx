'use client';

import React, { useState } from 'react';
import { Merchant, BottleneckReport } from '@/lib/types';
import { store } from '@/lib/db/store';
import { runBottleneckDetectionAgent } from '@/lib/ai/agents/operationsAgent';
import {
  LayoutDashboard,
  Users,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Search,
  Bot,
  Lightbulb,
  BarChart2,
  RefreshCw,
  ArrowRight
} from 'lucide-react';

interface OperationsDashboardProps {
  merchants: Merchant[];
  onSelectMerchant: (merchant: Merchant) => void;
  onOpenOnboarding: () => void;
}

export function OperationsDashboard({
  merchants,
  onSelectMerchant,
  onOpenOnboarding
}: OperationsDashboardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [bottleneckReport, setBottleneckReport] = useState<BottleneckReport>(store.getBottleneckReport());
  const [runningAgent, setRunningAgent] = useState(false);

  const filteredMerchants = merchants.filter(m => {
    const matchesSearch =
      m.profile.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.profile.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || m.status.toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const handleRunOperationsAgent = () => {
    setRunningAgent(true);
    setTimeout(() => {
      const report = runBottleneckDetectionAgent();
      setBottleneckReport(report);
      setRunningAgent(false);
    }, 500);
  };

  const funnelSteps = [
    { label: 'Signed Up', count: 124 },
    { label: 'Profile Complete', count: 118 },
    { label: 'Campaign Created', count: 105 },
    { label: 'Creative Approved', count: 94 },
    { label: 'Campaign Ready', count: 89 },
    { label: 'Live', count: 87 }
  ];

  const bottlenecksList = [
    { label: 'WhatsApp Verification', pct: 42, color: 'bg-[#C2413B]' },
    { label: 'Creative Approval', pct: 27, color: 'bg-[#B7791F]' },
    { label: 'Business Details', pct: 18, color: 'bg-[#0B8063]' },
    { label: 'Channel Connection', pct: 13, color: 'bg-[#66706F]' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-md bg-white border border-[#E4E7E5] shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-[#0B8063] flex items-center justify-center text-white shrink-0">
            <LayoutDashboard className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#111918]">Merchant Activation Operations</h2>
            <p className="text-xs text-[#66706F]">Live activation funnel metrics and bottleneck intelligence</p>
          </div>
        </div>

        <button
          onClick={onOpenOnboarding}
          className="px-4 py-2 rounded-md bg-[#0B8063] hover:bg-[#087F5B] text-white font-semibold text-xs transition-colors shadow-xs"
        >
          + Onboard New Merchant
        </button>
      </div>

      {/* Ryze-style Top KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-md bg-white border border-[#E4E7E5] space-y-1">
          <span className="text-[11px] text-[#66706F] font-medium block">Merchant Activation</span>
          <div className="text-2xl font-bold text-[#111918]">87%</div>
          <span className="text-[10px] text-[#16835B] font-semibold">+4.2% vs last week</span>
        </div>

        <div className="p-4 rounded-md bg-white border border-[#E4E7E5] space-y-1">
          <span className="text-[11px] text-[#66706F] font-medium block">Campaign Go-Live</span>
          <div className="text-2xl font-bold text-[#0B8063]">72%</div>
          <span className="text-[10px] text-[#66706F]">87 active campaigns</span>
        </div>

        <div className="p-4 rounded-md bg-white border border-[#E4E7E5] space-y-1">
          <span className="text-[11px] text-[#66706F] font-medium block">Blocked Merchants</span>
          <div className="text-2xl font-bold text-[#C2413B]">8</div>
          <span className="text-[10px] text-[#C2413B] font-semibold">Requires support</span>
        </div>

        <div className="p-4 rounded-md bg-white border border-[#E4E7E5] space-y-1">
          <span className="text-[11px] text-[#66706F] font-medium block">Avg Resolution Time</span>
          <div className="text-2xl font-bold text-[#111918]">3h 42m</div>
          <span className="text-[10px] text-[#66706F]">SLA target: 4h</span>
        </div>
      </div>

      {/* Activation Funnel & Bottlenecks Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Activation Funnel (7 cols) */}
        <div className="lg:col-span-7 p-6 rounded-md bg-white border border-[#E4E7E5] space-y-4 shadow-xs">
          <h3 className="text-xs font-bold text-[#111918] uppercase tracking-wider flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-[#0B8063]" />
            <span>ACTIVATION FUNNEL</span>
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 pt-1">
            {funnelSteps.map((step, idx) => (
              <div key={step.label} className="p-3 rounded-md bg-[#F8F8F5] border border-[#E4E7E5] text-center space-y-1">
                <span className="text-[10px] text-[#66706F] font-medium block truncate">{step.label}</span>
                <div className="text-base font-bold text-[#111918]">{step.count}</div>
                <div className="w-full bg-[#E4E7E5] rounded-full h-1 overflow-hidden">
                  <div className="bg-[#0B8063] h-full" style={{ width: `${Math.round((step.count / 124) * 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottlenecks List (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-md bg-white border border-[#E4E7E5] space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-[#111918] uppercase tracking-wider">
              BOTTLENECKS
            </h3>
            <span className="text-[10px] text-[#66706F]">Friction Distribution</span>
          </div>

          <div className="space-y-3 pt-1">
            {bottlenecksList.map(item => (
              <div key={item.label} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-[#111918]">{item.label}</span>
                  <span className="font-bold text-[#111918]">{item.pct}%</span>
                </div>
                <div className="w-full bg-[#F1F3F2] rounded-full h-1.5 overflow-hidden">
                  <div className={`${item.color} h-full`} style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottleneck Agent Analysis Recommendation */}
      <div className="p-5 rounded-md bg-[#173B3F] text-white space-y-3 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#20383A] pb-2">
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4 text-[#0B8063]" />
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              BOTTLENECK DETECTION AGENT (AGENT 5)
            </h3>
          </div>
          <button
            onClick={handleRunOperationsAgent}
            disabled={runningAgent}
            className="px-3 py-1 rounded bg-[#0B8063] hover:bg-[#087F5B] text-white text-[11px] font-semibold flex items-center gap-1 transition-colors"
          >
            {runningAgent ? <RefreshCw className="w-3 h-3 animate-spin" /> : <RefreshCw className="w-3 h-3" />}
            <span>Re-Run Agent</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs pt-1">
          <div>
            <span className="text-[#8E9897] block text-[10px]">Primary Friction Point:</span>
            <span className="font-bold text-[#C2413B] text-sm">{bottleneckReport.detectedBottleneck}</span>
          </div>
          <div className="col-span-2">
            <span className="text-[#8E9897] block text-[10px]">Suggested Intervention:</span>
            <p className="text-white text-xs leading-relaxed font-medium">{bottleneckReport.suggestedIntervention}</p>
          </div>
        </div>
      </div>

      {/* Merchant Directory Table */}
      <div className="p-6 rounded-md bg-white border border-[#E4E7E5] space-y-4 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h3 className="text-xs font-bold text-[#111918] uppercase tracking-wider">
            MERCHANT DIRECTORY ({filteredMerchants.length})
          </h3>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#66706F] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filter merchants..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="bg-[#F8F8F5] border border-[#E4E7E5] rounded px-3 pl-8 py-1.5 text-xs text-[#111918] placeholder-[#66706F] focus:outline-none"
              />
            </div>

            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="bg-[#F8F8F5] border border-[#E4E7E5] rounded px-3 py-1.5 text-xs text-[#111918] focus:outline-none"
            >
              <option value="all">All Statuses</option>
              <option value="live">Live</option>
              <option value="in progress">In Progress</option>
              <option value="blocked">Blocked</option>
              <option value="escalated">Escalated</option>
            </select>
          </div>
        </div>

        {/* Directory Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#111918]">
            <thead className="bg-[#F8F8F5] text-[#66706F] font-semibold border-b border-[#E4E7E5]">
              <tr>
                <th className="p-3">Merchant / Business</th>
                <th className="p-3">Category</th>
                <th className="p-3">Location</th>
                <th className="p-3">Stage</th>
                <th className="p-3">Status</th>
                <th className="p-3">Risk Level</th>
                <th className="p-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E7E5]">
              {filteredMerchants.map(m => (
                <tr
                  key={m.id}
                  className="hover:bg-[#F8F8F5] transition-colors cursor-pointer"
                  onClick={() => onSelectMerchant(m)}
                >
                  <td className="p-3 font-bold text-[#111918]">{m.profile.businessName}</td>
                  <td className="p-3 text-[#66706F]">{m.profile.category}</td>
                  <td className="p-3 text-[#66706F]">{m.profile.locality ? `${m.profile.locality}, ${m.profile.city}` : m.profile.city || m.profile.location || '—'}</td>
                  <td className="p-3 font-semibold text-[#0B8063] font-mono text-[11px]">{m.stage}</td>
                  <td className="p-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      m.status === 'Live' ? 'bg-[#16835B]/10 text-[#16835B]' :
                      m.status === 'Escalated' ? 'bg-[#C2413B]/10 text-[#C2413B]' :
                      m.status === 'Blocked' ? 'bg-[#B7791F]/10 text-[#B7791F]' :
                      'bg-[#0B8063]/10 text-[#0B8063]'
                    }`}>
                      {m.status}
                    </span>
                  </td>
                  <td className="p-3 font-semibold">
                    <span className={m.risk === 'High' ? 'text-[#C2413B]' : m.risk === 'Medium' ? 'text-[#B7791F]' : 'text-[#16835B]'}>
                      {m.risk}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button className="px-3 py-1 rounded bg-[#F1F3F2] hover:bg-[#E4E7E5] text-[#111918] text-[11px] font-semibold transition-colors border border-[#E4E7E5]">
                      Open Record
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
