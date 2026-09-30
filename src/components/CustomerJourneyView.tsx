'use client';

import React, { useState } from 'react';
import { Merchant, AdVariant } from '@/lib/types';
import {
  Network,
  Eye,
  Heart,
  ShoppingCart,
  ShieldCheck,
  Zap,
  Info,
  ArrowDown
} from 'lucide-react';

interface CustomerJourneyViewProps {
  merchant: Merchant;
}

export function CustomerJourneyView({ merchant }: CustomerJourneyViewProps) {
  const creatives = merchant.creatives || [];
  const [selectedVariantId, setSelectedVariantId] = useState<string>(creatives[0]?.id || '');

  const activeVariant = creatives.find(c => c.id === selectedVariantId) || creatives[0];

  const journeyStages = [
    {
      id: 'awareness',
      stageName: 'AWARENESS',
      icon: <Eye className="w-4 h-4 text-[#0B8063]" />,
      customerSees: 'Attention-grabbing hook addressing local Noida geographic relevance.',
      adProvides: activeVariant?.hook || '🔥 Transform your fitness routine in Noida!',
      actionExpected: 'Stops scrolling and reads primary text headline.'
    },
    {
      id: 'interest',
      stageName: 'INTEREST',
      icon: <Heart className="w-4 h-4 text-[#0B8063]" />,
      customerSees: 'Value proposition, clean facility perks, and professional trainer detail.',
      adProvides: activeVariant?.primaryText || 'Certified personal trainers & group HIIT classes in Sector 62.',
      actionExpected: 'Evaluates service quality against daily routine needs.'
    },
    {
      id: 'consideration',
      stageName: 'CONSIDERATION',
      icon: <ShoppingCart className="w-4 h-4 text-[#0B8063]" />,
      customerSees: 'High-value trial offer with zero upfront cost commitment.',
      adProvides: activeVariant?.offer || '3-Day Free VIP Pass + Body Composition Test',
      actionExpected: 'Compares risk-free offer against competitor prices.'
    },
    {
      id: 'trust',
      stageName: 'TRUST',
      icon: <ShieldCheck className="w-4 h-4 text-[#0B8063]" />,
      customerSees: 'Verified Sector 62 location map tag & 500+ member ratings.',
      adProvides: activeVariant?.journeyMapping?.trust || '⭐ 500+ Member Ratings & Sector 62 Location',
      actionExpected: 'Overcomes safety/legitimacy doubts.'
    },
    {
      id: 'action',
      stageName: 'ACTION',
      icon: <Zap className="w-4 h-4 text-[#0B8063]" />,
      customerSees: 'Clear call-to-action button directing to instant booking form.',
      adProvides: activeVariant?.cta || 'Book Free Trial',
      actionExpected: 'Fills contact details to claim pass immediately.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Workspace Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-md bg-white border border-[#E4E7E5] shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-[#0B8063] flex items-center justify-center text-white shrink-0">
            <Network className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-[#111918]">From attention to action.</h2>
            <p className="text-xs text-[#66706F]">Simulated customer journey progression per creative component</p>
          </div>
        </div>

        {creatives.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#66706F] font-medium">Variant:</span>
            {creatives.map(v => (
              <button
                key={v.id}
                onClick={() => setSelectedVariantId(v.id)}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-all ${
                  (activeVariant?.id === v.id)
                    ? 'bg-[#0B8063] text-white'
                    : 'bg-[#F8F8F5] text-[#66706F] border border-[#E4E7E5] hover:text-[#111918]'
                }`}
              >
                {v.type.split(' ')[1]}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Rationale Notice */}
      <div className="p-4 rounded-md bg-[#173B3F] text-white text-xs flex items-start gap-3 shadow-xs">
        <Info className="w-4 h-4 text-[#0B8063] shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-white">Funnel Analysis:</span> This framework illustrates how individual ad copy elements map directly to buyer psychological stages (Awareness → Interest → Consideration → Trust → Action).
        </div>
      </div>

      {/* Clean Progression Cards */}
      <div className="space-y-4">
        {journeyStages.map((st, idx) => (
          <React.Fragment key={st.id}>
            <div className="p-5 rounded-md bg-white border border-[#E4E7E5] space-y-3 hover:border-[#0B8063] transition-colors shadow-xs">
              <div className="flex items-center justify-between border-b border-[#E4E7E5] pb-2">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded bg-[#0B8063]/10">
                    {st.icon}
                  </div>
                  <span className="text-xs font-bold text-[#0B8063] font-mono tracking-wider">
                    STAGE {idx + 1}: {st.stageName}
                  </span>
                </div>
                <span className="text-[10px] text-[#66706F] font-medium">Customer Journey Step</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs pt-1">
                <div>
                  <span className="text-[10px] font-semibold text-[#66706F] uppercase block mb-1">What Customer Sees</span>
                  <p className="text-[#111918] font-medium leading-relaxed">{st.customerSees}</p>
                </div>

                <div className="p-3 rounded bg-[#F8F8F5] border border-[#E4E7E5]">
                  <span className="text-[10px] font-semibold text-[#0B8063] uppercase block mb-1">Ad Copy Element</span>
                  <p className="text-[#111918] font-bold text-xs">{st.adProvides}</p>
                </div>

                <div>
                  <span className="text-[10px] font-semibold text-[#66706F] uppercase block mb-1">Expected Action</span>
                  <p className="text-[#66706F] leading-relaxed">{st.actionExpected}</p>
                </div>
              </div>
            </div>

            {idx < journeyStages.length - 1 && (
              <div className="flex justify-center">
                <ArrowDown className="w-4 h-4 text-[#8E9897]" />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
