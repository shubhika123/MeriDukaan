'use client';

import React from 'react';
import {
  Play,
  ArrowRight,
  Bot,
  Layers,
  ShieldCheck,
  LayoutDashboard,
  CheckCircle2,
  FileText,
  MessageSquare,
  BarChart3,
  Cpu,
  Lock,
  Globe,
  Compass,
  ArrowUpRight
} from 'lucide-react';

interface OverviewViewProps {
  onStartDemo: () => void;
  onOpenDashboard: () => void;
  onOpenOnboarding: () => void;
  language?: 'en' | 'hi';
  setLanguage?: (lang: 'en' | 'hi') => void;
}

export function OverviewView({ onStartDemo, onOpenDashboard, onOpenOnboarding, language = 'hi' }: OverviewViewProps) {
  const isHindi = language === 'hi';

  const activationSteps = isHindi ? [
    { code: '01', title: '1. दुकान विवरण', desc: 'हिंदी या अंग्रेजी में अपनी दुकान का नाम, शहर और फोन नंबर बताएं' },
    { code: '02', title: '2. ऑफर तैयार', desc: 'AI आपके लिए विशेष ऑफर और 5 किमी का स्थानीय दायरा बनाएगा' },
    { code: '03', title: '3. आसान समीक्षा', desc: 'हिंदी या हिंग्लिश में विज्ञापन पोस्टर देखें और ओके करें' },
    { code: '04', title: '4. चैनल जुड़ना', desc: 'व्हाट्सएप बिजनेस, फेसबुक और इंस्टाग्राम आसानी से जुड़ेंगे' },
    { code: '05', title: '5. ग्राहक कॉल', desc: 'विज्ञापन लाइव होंगे और सीधे ग्राहकों के व्हाट्सएप मैसेज पाएं' }
  ] : [
    { code: '01', title: '1. Shop Details', desc: 'Share your business name, city & phone number in chat' },
    { code: '02', title: '2. Offer Draft', desc: 'AI creates tailored offers & local target radius (e.g. 5 km)' },
    { code: '03', title: '3. Easy Review', desc: 'Review & approve offer posters in Hindi, Hinglish, or English' },
    { code: '04', title: '4. Channel Setup', desc: 'Links WhatsApp Business, Facebook & Instagram effortlessly' },
    { code: '05', title: '5. Customer Calls', desc: 'Go live and receive direct customer WhatsApp messages & calls' }
  ];

  const agentsList = isHindi ? [
    {
      name: 'ऑनबोर्डिंग एजेंट (Onboarding)',
      code: 'ONBOARD',
      purpose: 'हिंदी या अंग्रेजी बातचीत में व्यापारियों की प्रोफाइल आसानी से तैयार करता है।',
      action: 'दुकान विवरण जांच',
      status: 'एक्टिव'
    },
    {
      name: 'अभियान रणनीति एजेंट (Strategy)',
      code: 'CAMPAIGN',
      purpose: 'उद्देश्य, स्थानीय 5 किमी दायरा और दैनिक बजट योजना बनाता है।',
      action: 'विज्ञापन ड्राफ्ट तैयार',
      status: 'एक्टिव'
    },
    {
      name: 'क्रिएटिव एजेंट (Creative)',
      code: 'CREATIVE',
      purpose: 'स्थानीय ग्राहकों के लिए 3 अलग ऑफर पोस्टर व मैसेज हिंदी में बनाता है।',
      action: 'पोस्टर तैयार',
      status: 'एक्टिव'
    },
    {
      name: 'साथी सपोर्ट एजेंट (Saathi Support)',
      code: 'SUPPORT',
      purpose: 'व्यापारियों के सवालों के जवाब हिंदी/हिंग्लिश में बोलकर या लिखकर देता है।',
      action: 'व्हाट्सएप SLA ट्रैकिंग',
      status: 'एक्टिव'
    },
    {
      name: 'ऑपरेशन्स एजेंट (Operations)',
      code: 'OPERATIONS',
      purpose: 'व्यापारी वृद्धि के आंकड़े देखता है और सभी रुकावटें तुरंत दूर करता है।',
      action: 'ग्रोथ विश्लेषण',
      status: 'एक्टिव'
    }
  ] : [
    {
      name: 'Onboarding Agent',
      code: 'ONBOARD',
      purpose: 'Helps merchants quickly set up business profile in conversational Hindi or English.',
      action: 'Validates business details',
      status: 'ACTIVE'
    },
    {
      name: 'Campaign Strategy Agent',
      code: 'CAMPAIGN',
      purpose: 'Formulates objective, local area radius targeting, and daily budget plan.',
      action: 'Drafting Meta campaign',
      status: 'ACTIVE'
    },
    {
      name: 'Creative Agent',
      code: 'CREATIVE',
      purpose: 'Generates 3 ad copy variants (Offer, Trust, Local) tailored for local customers.',
      action: 'Generating ad copy',
      status: 'ACTIVE'
    },
    {
      name: 'Saathi Support Agent',
      code: 'SUPPORT',
      purpose: 'Answers merchant questions in Hindi/Hinglish via text or voice & resolves issues.',
      action: 'Monitoring WhatsApp SLA',
      status: 'ACTIVE'
    },
    {
      name: 'Operations Agent',
      code: 'OPERATIONS',
      purpose: 'Tracks merchant activation metrics and ensures zero setup roadblocks.',
      action: 'Analyzing growth funnel',
      status: 'ACTIVE'
    }
  ];

  return (
    <div className="space-y-12 py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Editorial Hero Section */}
      <div className="space-y-6 pt-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[#0B8063]/12 text-[#0B8063] text-xs sm:text-sm font-bold tracking-wide">
          {isHindi ? '🏪 मेरी दुकान — आपका डिजिटल बिज़नेस साथी' : '🏪 Meri Dukaan — Digital Business Companion'}
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#111918] max-w-4xl leading-[1.2]">
          {isHindi 
            ? 'अपनी दुकान को व्हाट्सएप, इंस्टाग्राम और फेसबुक पर आसान तरीके से बढ़ाएं।' 
            : 'Grow your local shop on WhatsApp, Instagram & Facebook with ease.'}
        </h1>

        <p className="text-[#3D4745] text-base sm:text-lg lg:text-xl max-w-3xl leading-relaxed font-normal">
          {isHindi
            ? 'अपने शहर के नए ग्राहकों तक पहुंचें — बिना किसी तकनीकी झंझट के। हिंदी और हिंग्लिश में चरण-दर-चरण AI एजेंट सहायता के साथ।'
            : 'Reach local customers in your city — Zero technical complexity. Guided step-by-step with specialized AI agents in your language.'}
        </p>

        <div className="flex flex-wrap items-center gap-4 pt-3">
          <button
            onClick={onStartDemo}
            className="flex items-center gap-2.5 px-6 py-3.5 rounded-lg bg-[#0B8063] hover:bg-[#087F5B] text-white font-bold text-sm sm:text-base shadow-md transition-all transform hover:-translate-y-0.5"
          >
            <Play className="w-4.5 h-4.5 fill-current" />
            <span>{isHindi ? '▶️ मर्चेंट डेमो देखें (शर्मा फिटनेस, लखनऊ)' : '▶️ Start Merchant Demo (Lucknow Gym)'}</span>
          </button>

          <button
            onClick={onOpenOnboarding}
            className="flex items-center gap-2 px-6 py-3.5 rounded-lg bg-white hover:bg-[#F1F3F2] text-[#111918] font-semibold text-sm border border-[#E4E7E5] transition-colors shadow-2xs"
          >
            <span>{isHindi ? '➕ नया ऑनबोर्डिंग शुरू करें' : '➕ Start New Onboarding'}</span>
            <ArrowRight className="w-4.5 h-4.5 text-[#0B8063]" />
          </button>
        </div>
      </div>

      {/* Outcome Metrics Banner */}
      <div className="pt-8 border-t border-[#E4E7E5] space-y-4">
        <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#52605E]">
          {isHindi ? 'भारतीय व्यापारी मेरी दुकान पर भरोसा क्यों करते हैं' : 'Why Indian Merchants Trust Meri Dukaan'}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-2">
          <div className="space-y-1 p-4 rounded-xl bg-white border border-[#E4E7E5] shadow-2xs">
            <div className="text-3xl sm:text-4xl font-extrabold text-[#111918]">8+</div>
            <div className="text-xs sm:text-sm font-bold text-[#0B8063]">{isHindi ? 'एक्टिव दुकानें' : 'Active Indian Shops'}</div>
            <div className="text-xs text-[#52605E]">Lucknow, Jaipur, Pune, Bengaluru</div>
          </div>
          <div className="space-y-1 p-4 rounded-xl bg-white border border-[#E4E7E5] shadow-2xs">
            <div className="text-3xl sm:text-4xl font-extrabold text-[#0B8063]">72%</div>
            <div className="text-xs sm:text-sm font-bold text-[#0B8063]">{isHindi ? 'अधिक ग्राहक कॉल्स' : 'More Customer Calls'}</div>
            <div className="text-xs text-[#52605E]">{isHindi ? 'व्हाट्सएप और फोन लीड्स' : 'WhatsApp & Phone Lead Generation'}</div>
          </div>
          <div className="space-y-1 p-4 rounded-xl bg-white border border-[#E4E7E5] shadow-2xs">
            <div className="text-3xl sm:text-4xl font-extrabold text-[#111918]">94%</div>
            <div className="text-xs sm:text-sm font-bold text-[#0B8063]">{isHindi ? 'ऑटो-गाइडेड सेटअप' : 'Auto-Guided Setup'}</div>
            <div className="text-xs text-[#52605E]">{isHindi ? 'हिंदी और अंग्रेजी भाषा में' : 'In Hindi & English Language'}</div>
          </div>
          <div className="space-y-1 p-4 rounded-xl bg-white border border-[#E4E7E5] shadow-2xs">
            <div className="text-3xl sm:text-4xl font-extrabold text-[#111918]">24/7</div>
            <div className="text-xs sm:text-sm font-bold text-[#0B8063]">{isHindi ? 'हिंदी सपोर्ट व वॉइस' : 'Human & Voice Support'}</div>
            <div className="text-xs text-[#52605E]">{isHindi ? 'तत्काल साथी सहायता' : 'Instant Help Desk & Call Backup'}</div>
          </div>
        </div>
      </div>

      {/* Workflow Steps Presentation */}
      <div className="space-y-6 pt-6">
        <h2 className="text-base sm:text-lg font-bold text-[#111918]">
          {isHindi ? 'ग्राहक वृद्धि के 5 आसान चरण' : '5-Step Easy Path to Customer Growth'}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4">
          {activationSteps.map((step, idx) => (
            <div
              key={step.title}
              className="p-5 rounded-xl bg-white border border-[#E4E7E5] space-y-3 relative hover:border-[#0B8063] transition-all hover:shadow-sm"
            >
              <div className="flex items-center justify-between text-xs text-[#52605E]">
                <span className="font-mono text-xs text-[#0B8063] font-extrabold px-2 py-0.5 rounded bg-[#0B8063]/10">{step.code}</span>
                {idx < activationSteps.length - 1 && (
                  <ArrowRight className="hidden md:block w-4 h-4 text-[#8E9897]" />
                )}
              </div>
              <h3 className="text-sm sm:text-base font-bold text-[#111918]">{step.title}</h3>
              <p className="text-xs sm:text-sm text-[#52605E] leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Friendly Light Assistants Section (Replaces dark artificial box) */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E4E7E5] space-y-6 shadow-2xs">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#0B8063]/10 text-[#0B8063] text-xs font-bold">
            <Bot className="w-4 h-4" />
            <span>{isHindi ? 'AI बिजनेस सहायक' : '5 AI Business Assistants'}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#111918]">
            {isHindi ? 'आपकी दुकान के लिए 5 विशेष AI सहायक' : '5 Specialized AI Assistants For Your Shop'}
          </h2>
          <p className="text-xs sm:text-sm text-[#52605E] max-w-2xl leading-relaxed">
            {isHindi 
              ? 'हर काम के लिए अलग सहायक — दुकान विवरण एकत्रित करने से लेकर ऑफर पोस्टर बनाने और व्हाट्सएप कॉल्स लाने तक।'
              : 'Each assistant handles a specific step — from collecting shop details to generating ad posters and managing customer leads.'}
          </p>
        </div>

        {/* 5 Friendly Light Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {agentsList.map(agent => (
            <div
              key={agent.code}
              className="p-4 rounded-xl bg-[#F8F8F5] border border-[#E4E7E5] space-y-3 flex flex-col justify-between hover:border-[#0B8063] transition-all hover:shadow-2xs"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-extrabold text-[#0B8063] bg-[#0B8063]/10 px-2 py-0.5 rounded">
                    {agent.code}
                  </span>
                  <span className="text-xs font-bold text-[#16835B] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#16835B] animate-pulse" />
                    {agent.status}
                  </span>
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-[#111918]">{agent.name}</h3>
                <p className="text-xs text-[#52605E] leading-relaxed font-normal">{agent.purpose}</p>
              </div>

              <div className="pt-2 border-t border-[#E4E7E5] text-xs text-[#3D4745]">
                <span className="text-[#52605E] text-[11px] block font-medium">{isHindi ? 'मुख्य कार्य:' : 'Active Task:'}</span>
                <span className="font-bold text-[#0B8063]">{agent.action}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimers & Integrity Note */}
      <div className="p-4 rounded-xl bg-white border border-[#E4E7E5] text-xs sm:text-sm text-[#52605E] flex items-start sm:items-center gap-3 shadow-2xs">
        <ShieldCheck className="w-5 h-5 text-[#0B8063] shrink-0 mt-0.5 sm:mt-0" />
        <div>
          <span className="font-bold text-[#111918]">
            {isHindi ? 'सुरक्षित मेटा व व्हाट्सएप चैनल कनेक्शन:' : 'Meta & WhatsApp Channel Safety:'}
          </span>{' '}
          {isHindi
            ? 'आपकी दुकान की जानकारी और व्हाट्सएप नंबर 100% सुरक्षित है। प्रदर्शन के लिए सिमुलेटेड मेटा सैंडबॉक्स वातावरण का उपयोग किया गया है।'
            : 'All Meta Ads connections, Facebook page linking, and WhatsApp OTP flows run in a verified Sandbox environment.'}
        </div>
      </div>
    </div>
  );
}
