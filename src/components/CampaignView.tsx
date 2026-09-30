'use client';

import React, { useState } from 'react';
import { Merchant, AdVariant } from '@/lib/types';
import {
  Megaphone,
  CheckCircle2,
  RefreshCw,
  Edit3,
  ArrowRight,
  Target,
  DollarSign,
  Calendar,
  Gift,
  MousePointer,
  Users,
  Eye,
  TrendingUp,
  Sparkles
} from 'lucide-react';

interface CampaignViewProps {
  merchant: Merchant;
  onUpdateMerchant: (updated: Merchant) => void;
  onProceedToSandbox: () => void;
}

export function CampaignView({
  merchant,
  onUpdateMerchant,
  onProceedToSandbox
}: CampaignViewProps) {
  const [generatingStrategy, setGeneratingStrategy] = useState(false);
  const [generatingCreatives, setGeneratingCreatives] = useState(false);
  const [editingVariant, setEditingVariant] = useState<AdVariant | null>(null);
  const [rejectionFeedback, setRejectionFeedback] = useState<{ [id: string]: string }>({});

  const strategy = merchant.campaignStrategy;
  const creatives = merchant.creatives || [];

  const handleGenerateStrategy = async () => {
    setGeneratingStrategy(true);
    try {
      const res = await fetch('/api/agents/campaign', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ merchantId: merchant.id })
      });
      if (res.ok) {
        const data = await res.json();
        onUpdateMerchant(data.merchant);
      }
    } catch (err) {
      console.error('Failed to generate strategy:', err);
    } finally {
      setGeneratingStrategy(false);
    }
  };

  const handleGenerateCreatives = async () => {
    setGeneratingCreatives(true);
    try {
      const res = await fetch('/api/agents/creative', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ merchantId: merchant.id, action: 'generate_all' })
      });
      if (res.ok) {
        const data = await res.json();
        onUpdateMerchant(data.merchant);
      }
    } catch (err) {
      console.error('Failed to generate creatives:', err);
    } finally {
      setGeneratingCreatives(false);
    }
  };

  const handleApproveVariant = (id: string) => {
    const updatedCreatives = creatives.map(c =>
      c.id === id ? { ...c, status: 'approved' as const } : c
    );
    const updatedMerchant = { ...merchant, creatives: updatedCreatives, stage: 'CHANNEL_CONNECTION' as const };
    onUpdateMerchant(updatedMerchant);
  };

  const handleRejectVariant = async (id: string, variantType: AdVariant['type']) => {
    const feedback = rejectionFeedback[id] || 'Focus more on local Noida convenience';
    setGeneratingCreatives(true);
    try {
      const res = await fetch('/api/agents/creative', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          merchantId: merchant.id,
          action: 'regenerate_single',
          variantType,
          feedback
        })
      });
      if (res.ok) {
        const data = await res.json();
        onUpdateMerchant(data.merchant);
      }
    } catch (err) {
      console.error('Failed to regenerate variant:', err);
    } finally {
      setGeneratingCreatives(false);
    }
  };

  const handleSaveEdit = (variant: AdVariant) => {
    const updatedCreatives = creatives.map(c => (c.id === variant.id ? variant : c));
    onUpdateMerchant({ ...merchant, creatives: updatedCreatives });
    setEditingVariant(null);
  };

  const allApproved = creatives.length > 0 && creatives.every(c => c.status === 'approved');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Top Workspace Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-md bg-white border border-[#E4E7E5] shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-[#0B8063] flex items-center justify-center text-white shrink-0">
            <Megaphone className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-[#111918]">Campaign & Creative Workspace</h2>
              <span className="text-[10px] px-2 py-0.5 rounded bg-[#0B8063]/10 text-[#0B8063] font-semibold border border-[#0B8063]/20">
                Ryze Campaign Studio
              </span>
            </div>
            <p className="text-xs text-[#66706F]">Manage campaign parameters, target audience, and ad copy variants</p>
          </div>
        </div>

        {allApproved && (
          <button
            onClick={onProceedToSandbox}
            className="flex items-center gap-2 px-4 py-2 rounded-md bg-[#0B8063] hover:bg-[#087F5B] text-white font-semibold text-xs shadow-xs transition-colors"
          >
            <span>Proceed to Channel Activation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Ryze-style Top Advertising Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <div className="p-4 rounded-md bg-white border border-[#E4E7E5] space-y-1">
          <span className="text-[11px] text-[#66706F] font-medium block">Total Budget</span>
          <div className="text-lg font-bold text-[#111918]">{strategy?.budget || '₹5,000'}</div>
          <span className="text-[10px] text-[#66706F]">10-Day Duration</span>
        </div>

        <div className="p-4 rounded-md bg-white border border-[#E4E7E5] space-y-1">
          <span className="text-[11px] text-[#66706F] font-medium block">Est. Local Reach</span>
          <div className="text-lg font-bold text-[#111918]">14,200</div>
          <span className="text-[10px] text-[#16835B] font-medium">8km radius</span>
        </div>

        <div className="p-4 rounded-md bg-white border border-[#E4E7E5] space-y-1">
          <span className="text-[11px] text-[#66706F] font-medium block">Target Leads</span>
          <div className="text-lg font-bold text-[#0B8063]">88 Leads</div>
          <span className="text-[10px] text-[#66706F]">Form submissions</span>
        </div>

        <div className="p-4 rounded-md bg-white border border-[#E4E7E5] space-y-1">
          <span className="text-[11px] text-[#66706F] font-medium block">Est. CTR / Conversion</span>
          <div className="text-lg font-bold text-[#111918]">6.2%</div>
          <span className="text-[10px] text-[#16835B] font-medium">+1.4% benchmark</span>
        </div>

        <div className="p-4 rounded-md bg-white border border-[#E4E7E5] space-y-1">
          <span className="text-[11px] text-[#66706F] font-medium block">Status</span>
          <div className="text-lg font-bold text-[#0B8063]">
            {merchant.stage === 'LIVE' ? 'LIVE' : allApproved ? 'READY' : 'DRAFT'}
          </div>
          <span className="text-[10px] text-[#66706F]">{creatives.filter(c => c.status === 'approved').length}/3 Approved</span>
        </div>
      </div>

      {/* Ryze-style AI Recommendation Widget */}
      <div className="p-5 rounded-md bg-[#173B3F] text-white space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0B8063]">
            <Sparkles className="w-3.5 h-3.5 text-[#0B8063]" /> AI RECOMMENDATION
          </div>
          <span className="text-[10px] text-[#8E9897] font-mono">Agent 2 & 3 Output</span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-white mb-1">
              {allApproved
                ? 'All ad variants approved. Ready to initialize Meta Sandbox channel connection.'
                : 'Campaign strategy formulated. Please review the 3 ad copy variants below.'}
            </h3>
            <p className="text-xs text-[#8E9897]">
              Campaign: <span className="text-white font-medium">{merchant.profile.businessName} — October Membership Campaign</span>
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {!strategy ? (
              <button
                onClick={handleGenerateStrategy}
                disabled={generatingStrategy}
                className="px-4 py-2 rounded-md bg-[#0B8063] hover:bg-[#087F5B] text-white font-semibold text-xs transition-colors"
              >
                {generatingStrategy ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : 'Generate Strategy'}
              </button>
            ) : creatives.length === 0 ? (
              <button
                onClick={handleGenerateCreatives}
                disabled={generatingCreatives}
                className="px-4 py-2 rounded-md bg-[#0B8063] hover:bg-[#087F5B] text-white font-semibold text-xs transition-colors"
              >
                {generatingCreatives ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : 'Generate 3 Variants'}
              </button>
            ) : allApproved ? (
              <button
                onClick={onProceedToSandbox}
                className="px-4 py-2 rounded-md bg-[#0B8063] hover:bg-[#087F5B] text-white font-semibold text-xs transition-colors"
              >
                Connect Channels
              </button>
            ) : (
              <span className="text-xs text-[#8E9897]">Approve variants below</span>
            )}
          </div>
        </div>
      </div>

      {/* Campaign Strategy Section */}
      <div className="p-6 rounded-md bg-white border border-[#E4E7E5] space-y-4">
        <h3 className="text-sm font-bold text-[#111918] uppercase tracking-wider flex items-center gap-2">
          <Target className="w-4 h-4 text-[#0B8063]" />
          <span>CAMPAIGN STRATEGY</span>
        </h3>

        {strategy ? (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 pt-1">
            <div className="p-3 rounded-md bg-[#F8F8F5] border border-[#E4E7E5]">
              <span className="text-[10px] text-[#66706F] uppercase block font-medium">Objective</span>
              <span className="text-xs font-bold text-[#111918]">{strategy.objective}</span>
            </div>
            <div className="p-3 rounded-md bg-[#F8F8F5] border border-[#E4E7E5]">
              <span className="text-[10px] text-[#66706F] uppercase block font-medium">Audience</span>
              <span className="text-xs font-semibold text-[#111918] line-clamp-1">{strategy.audience}</span>
            </div>
            <div className="p-3 rounded-md bg-[#F8F8F5] border border-[#E4E7E5]">
              <span className="text-[10px] text-[#66706F] uppercase block font-medium">Budget</span>
              <span className="text-xs font-bold text-[#0B8063]">{strategy.budget}</span>
            </div>
            <div className="p-3 rounded-md bg-[#F8F8F5] border border-[#E4E7E5]">
              <span className="text-[10px] text-[#66706F] uppercase block font-medium">Duration</span>
              <span className="text-xs font-semibold text-[#111918]">{strategy.duration}</span>
            </div>
            <div className="p-3 rounded-md bg-[#F8F8F5] border border-[#E4E7E5]">
              <span className="text-[10px] text-[#66706F] uppercase block font-medium">CTA Button</span>
              <span className="text-xs font-bold text-[#0B8063]">{strategy.cta}</span>
            </div>
          </div>
        ) : (
          <div className="text-center py-6 text-[#66706F] text-xs">
            No strategy generated yet. Click &quot;Generate Strategy&quot; to invoke Agent 2.
          </div>
        )}
      </div>

      {/* Suggested Creatives Section (3 Cards) */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-[#111918] uppercase tracking-wider">
            SUGGESTED CREATIVES (3 VARIANTS)
          </h3>
          <span className="text-xs text-[#66706F]">{creatives.length} Variants</span>
        </div>

        {creatives.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {creatives.map(variant => (
              <div
                key={variant.id}
                className={`p-5 rounded-md bg-white border flex flex-col justify-between transition-all ${
                  variant.status === 'approved'
                    ? 'border-[#0B8063] bg-[#0B8063]/5'
                    : 'border-[#E4E7E5]'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#111918] bg-[#F1F3F2] px-2.5 py-1 rounded">
                      {variant.type}
                    </span>
                    {variant.status === 'approved' ? (
                      <span className="text-[10px] font-bold text-[#16835B] bg-[#16835B]/10 px-2 py-0.5 rounded">
                        APPROVED
                      </span>
                    ) : (
                      <span className="text-[10px] font-semibold text-[#B7791F] bg-[#B7791F]/10 px-2 py-0.5 rounded">
                        PENDING
                      </span>
                    )}
                  </div>

                  {/* Creative Preview Box */}
                  <div className="p-4 rounded-md bg-[#F8F8F5] border border-[#E4E7E5] space-y-2 text-xs">
                    <div className="flex items-center gap-2 pb-2 border-b border-[#E4E7E5]">
                      <div className="w-5 h-5 rounded bg-[#0B8063] text-white flex items-center justify-center text-[10px] font-bold">
                        {merchant.profile.businessName?.charAt(0) || 'M'}
                      </div>
                      <span className="font-semibold text-[#111918]">{merchant.profile.businessName}</span>
                      <span className="text-[10px] text-[#66706F] ml-auto">Sponsored</span>
                    </div>

                    <p className="font-bold text-[#111918]">{variant.hook}</p>
                    <p className="text-[#66706F] text-[11px] leading-relaxed">{variant.primaryText}</p>

                    <div className="p-2.5 rounded bg-white border border-[#E4E7E5] flex items-center justify-between mt-2">
                      <div>
                        <div className="font-bold text-[#111918] text-[11px]">{variant.headline}</div>
                        <div className="text-[10px] text-[#66706F]">{variant.offer}</div>
                      </div>
                      <span className="px-2.5 py-1 rounded bg-[#0B8063] text-white font-bold text-[10px]">
                        {variant.cta}
                      </span>
                    </div>
                  </div>

                  <div className="text-[11px] text-[#66706F]">
                    <span className="font-semibold text-[#111918]">Strategy Rationale: </span>
                    {variant.creativeConcept}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-[#E4E7E5] space-y-2">
                  {variant.status !== 'approved' && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleApproveVariant(variant.id)}
                        className="flex-1 py-1.5 rounded-md bg-[#0B8063] hover:bg-[#087F5B] text-white font-semibold text-xs flex items-center justify-center gap-1 transition-colors"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                      </button>
                      <button
                        onClick={() => setEditingVariant(variant)}
                        className="p-1.5 rounded-md bg-white hover:bg-[#F1F3F2] border border-[#E4E7E5] text-[#111918] transition-colors"
                        title="Edit variant"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  {variant.status !== 'approved' && (
                    <div className="space-y-1.5">
                      <input
                        type="text"
                        placeholder="Rejection feedback..."
                        value={rejectionFeedback[variant.id] || ''}
                        onChange={e =>
                          setRejectionFeedback({ ...rejectionFeedback, [variant.id]: e.target.value })
                        }
                        className="w-full bg-[#F8F8F5] border border-[#E4E7E5] rounded px-2.5 py-1 text-[11px] text-[#111918] focus:outline-none"
                      />
                      <button
                        onClick={() => handleRejectVariant(variant.id, variant.type)}
                        className="w-full py-1 rounded bg-[#F1F3F2] hover:bg-[#E4E7E5] text-[#111918] font-medium text-[11px] flex items-center justify-center gap-1 transition-colors border border-[#E4E7E5]"
                      >
                        <RefreshCw className="w-3 h-3 text-[#66706F]" /> Regenerate with AI
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10 rounded-md bg-white border border-[#E4E7E5] text-[#66706F] text-xs">
            Click &quot;Generate 3 Variants&quot; to synthesize offer, trust, and local ad copy variants.
          </div>
        )}
      </div>

      {/* Edit Variant Modal */}
      {editingVariant && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-[#E4E7E5] rounded-md p-6 max-w-lg w-full space-y-4 shadow-xl">
            <h3 className="text-sm font-bold text-[#111918] flex items-center gap-2">
              <Edit3 className="w-4 h-4 text-[#0B8063]" /> Edit Ad Variant Details
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="text-[#66706F] block mb-1 font-medium">Hook</label>
                <input
                  type="text"
                  value={editingVariant.hook}
                  onChange={e => setEditingVariant({ ...editingVariant, hook: e.target.value })}
                  className="w-full bg-[#F8F8F5] border border-[#E4E7E5] rounded px-3 py-2 text-[#111918]"
                />
              </div>
              <div>
                <label className="text-[#66706F] block mb-1 font-medium">Primary Text</label>
                <textarea
                  value={editingVariant.primaryText}
                  onChange={e => setEditingVariant({ ...editingVariant, primaryText: e.target.value })}
                  className="w-full bg-[#F8F8F5] border border-[#E4E7E5] rounded px-3 py-2 text-[#111918] h-20"
                />
              </div>
              <div>
                <label className="text-[#66706F] block mb-1 font-medium">Headline</label>
                <input
                  type="text"
                  value={editingVariant.headline}
                  onChange={e => setEditingVariant({ ...editingVariant, headline: e.target.value })}
                  className="w-full bg-[#F8F8F5] border border-[#E4E7E5] rounded px-3 py-2 text-[#111918]"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setEditingVariant(null)}
                className="px-4 py-2 rounded-md bg-[#F1F3F2] text-[#111918] text-xs font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSaveEdit(editingVariant)}
                className="px-4 py-2 rounded-md bg-[#0B8063] text-white text-xs font-semibold"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
