'use client';

import React, { useState } from 'react';
import { Merchant } from '@/lib/types';
import {
  Play,
  ArrowRight,
  X
} from 'lucide-react';

interface ScriptedDemoModalProps {
  isOpen: boolean;
  onClose: () => void;
  merchant: Merchant;
  onUpdateMerchant: (m: Merchant) => void;
  onSwitchTab: (tab: any) => void;
}

export function ScriptedDemoModal({
  isOpen,
  onClose,
  merchant,
  onUpdateMerchant,
  onSwitchTab
}: ScriptedDemoModalProps) {
  const [currentStep, setCurrentStep] = useState(1);

  if (!isOpen) return null;

  const steps = [
    {
      num: 1,
      title: 'Merchant Enters Business Info',
      desc: 'Ramesh Kumar enters details for Sharma Fitness Studio in Lucknow.',
      tab: 'onboarding',
      action: () => {
        onSwitchTab('onboarding');
      }
    },
    {
      num: 2,
      title: 'AI Identifies Missing Fields',
      desc: 'Onboarding Agent validates profile and asks for target audience & budget in Hindi/Hinglish.',
      tab: 'onboarding',
      action: () => {
        onSwitchTab('onboarding');
      }
    },
    {
      num: 3,
      title: 'Campaign Strategy Generated',
      desc: 'Campaign Strategy Agent formulates Customer Acquisition plan (Lucknow, 5km, ₹5,000 budget).',
      tab: 'campaigns',
      action: () => {
        onSwitchTab('campaigns');
      }
    },
    {
      num: 4,
      title: '3 Ad Variants Generated',
      desc: 'Creative Agent generates 3 ad variants (Hindi, Hinglish, and English).',
      tab: 'campaigns',
      action: () => {
        onSwitchTab('campaigns');
      }
    },
    {
      num: 5,
      title: 'Merchant Rejects Variant C',
      desc: 'Ramesh requests more emphasis on Hazratganj metro proximity.',
      tab: 'campaigns',
      action: () => {
        onSwitchTab('campaigns');
      }
    },
    {
      num: 6,
      title: 'AI Regenerates Variant C',
      desc: 'Creative Agent produces updated hyper-local variant.',
      tab: 'campaigns',
      action: () => {
        onSwitchTab('campaigns');
      }
    },
    {
      num: 7,
      title: 'Merchant Approves All Variants',
      desc: 'Ramesh accepts creatives and advances to Channel Connection.',
      tab: 'campaigns',
      action: () => {
        merchant.stage = 'CHANNEL_CONNECTION';
        onUpdateMerchant({ ...merchant });
        onSwitchTab('sandbox');
      }
    },
    {
      num: 8,
      title: 'Facebook Page Connection Checked',
      desc: 'Facebook Page linked, but Ad Account permission is pending.',
      tab: 'sandbox',
      action: () => {
        merchant.channels.facebookConnected = true;
        merchant.channels.facebookAccountName = 'Sharma Fitness Studio Official';
        onUpdateMerchant({ ...merchant });
        onSwitchTab('sandbox');
      }
    },
    {
      num: 9,
      title: 'Saathi Explains Issue in Hindi',
      desc: 'Saathi checks connection status via check_facebook_connection() tool.',
      tab: 'saathi',
      action: () => {
        onSwitchTab('saathi');
      }
    },
    {
      num: 10,
      title: 'Merchant Retries Authorization',
      desc: 'Permission check fails again after 2 retries.',
      tab: 'saathi',
      action: () => {
        onSwitchTab('saathi');
      }
    },
    {
      num: 11,
      title: 'Escalation Ticket #MD-1042 Created',
      desc: 'Saathi dispatches ticket to Merchant Support team.',
      tab: 'escalations',
      action: () => {
        onSwitchTab('escalations');
      }
    },
    {
      num: 12,
      title: 'Operations Dashboard Updates Live',
      desc: 'Activation Funnel reflects updated metric and active escalation.',
      tab: 'dashboard',
      action: () => {
        onSwitchTab('dashboard');
      }
    },
    {
      num: 13,
      title: 'Operations Agent Detects Bottleneck',
      desc: 'Agent 5 highlights Facebook Ad Account Permission drop-off and recommends intervention.',
      tab: 'dashboard',
      action: () => {
        onSwitchTab('dashboard');
      }
    }
  ];

  const step = steps[currentStep - 1];

  const handleNext = () => {
    if (currentStep < steps.length) {
      const nextStepNum = currentStep + 1;
      setCurrentStep(nextStepNum);
      steps[nextStepNum - 1].action();
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      const prevStepNum = currentStep - 1;
      setCurrentStep(prevStepNum);
      steps[prevStepNum - 1].action();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full bg-[#121721] border border-[#1E2638] rounded-lg p-5 shadow-2xl text-white space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#1E2638]">
        <div className="flex items-center gap-2">
          <Play className="w-4 h-4 text-[#0B8063] fill-current" />
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Scripted Demo Guide (Step {currentStep}/13)
          </span>
        </div>
        <button onClick={onClose} className="p-1 rounded-md hover:bg-[#161C28] text-slate-400">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Current Step Description */}
      <div className="space-y-1.5">
        <h4 className="text-xs font-bold text-white flex items-center gap-2">
          <span className="w-5 h-5 rounded bg-[#0B8063] text-[11px] flex items-center justify-center font-bold">
            {step.num}
          </span>
          {step.title}
        </h4>
        <p className="text-xs text-slate-300 leading-relaxed font-medium">{step.desc}</p>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-[#161C28] rounded-full h-1.5 overflow-hidden">
        <div
          className="bg-[#0B8063] h-full transition-all duration-300"
          style={{ width: `${(currentStep / steps.length) * 100}%` }}
        />
      </div>

      {/* Step Actions */}
      <div className="flex items-center justify-between pt-1">
        <button
          onClick={handlePrev}
          disabled={currentStep === 1}
          className="px-3 py-1.5 rounded bg-[#161C28] hover:bg-[#1E2638] disabled:opacity-40 text-slate-300 text-xs font-medium"
        >
          Previous
        </button>

        {currentStep < steps.length ? (
          <button
            onClick={handleNext}
            className="px-4 py-1.5 rounded bg-[#0B8063] hover:bg-[#087F5B] text-white font-semibold text-xs flex items-center gap-1.5 shadow-xs"
          >
            <span>Next Step</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        ) : (
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded bg-[#16835B] hover:bg-[#087F5B] text-white font-semibold text-xs"
          >
            Finish Demo
          </button>
        )}
      </div>
    </div>
  );
}
