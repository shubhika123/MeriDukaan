'use client';

import React, { useState } from 'react';
import {
  Compass,
  Store,
  MessageSquare,
  Sparkles,
  Megaphone,
  Network,
  ShieldCheck,
  Play,
  ArrowRight,
  Globe,
  CheckCircle2,
  PhoneCall,
  Bot,
  Layers,
  Star,
  Users,
  Building2,
  ChevronRight,
  UserCheck
} from 'lucide-react';
import { Merchant } from '@/lib/types';
import { AuthModal } from './AuthModal';

interface LandingPageProps {
  onStartDemo: () => void;
  onEnterApp: (merchant?: Merchant) => void;
  language: 'en' | 'hi';
  setLanguage: (lang: 'en' | 'hi') => void;
}

export function LandingPage({
  onStartDemo,
  onEnterApp,
  language,
  setLanguage
}: LandingPageProps) {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
  const isHindi = language === 'hi';

  const openAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleAuthSuccess = (merchant: Merchant, isNew: boolean) => {
    onEnterApp(merchant);
  };

  return (
    <div className="min-h-screen bg-[#F8F8F5] text-[#111918] font-sans selection:bg-[#0B8063] selection:text-white flex flex-col">
      {/* Top Navbar */}
      <header className="sticky top-0 z-40 bg-[#F8F8F5]/95 backdrop-blur-md border-b border-[#E4E7E5] px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onEnterApp()}>
            <div className="w-10 h-10 rounded-xl bg-[#0B8063] flex items-center justify-center text-white shrink-0 shadow-xs">
              <Compass className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-extrabold text-[#111918] tracking-tight block">
                Meri Dukaan
              </span>
              <span className="text-xs text-[#52605E] font-medium block">
                {isHindi ? 'डिजिटल ग्रोथ प्लेटफॉर्म' : 'Digital Growth Platform'}
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-[#3D4745]">
            <a href="#features" className="hover:text-[#0B8063] transition-colors">
              {isHindi ? 'सुविधाएं (Features)' : 'Features'}
            </a>
            <a href="#success-stories" className="hover:text-[#0B8063] transition-colors">
              {isHindi ? 'मर्चेंट सफलता गाथाएं' : 'Success Stories'}
            </a>
            <a href="#how-it-works" className="hover:text-[#0B8063] transition-colors">
              {isHindi ? 'यह कैसे काम करता है' : 'How It Works'}
            </a>
            <a href="#pricing" className="hover:text-[#0B8063] transition-colors">
              {isHindi ? 'प्लान और शुल्क' : 'Pricing'}
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLanguage(language === 'hi' ? 'en' : 'hi')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-[#E4E7E5] text-xs font-bold text-[#111918] hover:bg-[#F1F3F2] shadow-2xs"
            >
              <Globe className="w-4 h-4 text-[#0B8063]" />
              <span>{isHindi ? 'हिंदी' : 'English'}</span>
            </button>

            <button
              onClick={() => openAuth('login')}
              className="px-4 py-2 rounded-lg bg-white hover:bg-[#F1F3F2] border border-[#E4E7E5] text-xs sm:text-sm font-bold text-[#111918] transition-colors shadow-2xs"
            >
              {isHindi ? 'लॉगिन' : 'Login'}
            </button>

            <button
              onClick={() => openAuth('signup')}
              className="px-4.5 py-2.5 rounded-lg bg-[#0B8063] hover:bg-[#087F5B] text-white text-xs sm:text-sm font-bold shadow-md transition-all transform hover:-translate-y-0.5"
            >
              {isHindi ? '🚀 मुफ्त दुकान जोड़ें' : '🚀 Register Dukaan'}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0B8063]/12 text-[#0B8063] text-xs sm:text-sm font-bold tracking-wide">
              <Sparkles className="w-4 h-4" />
              <span>{isHindi ? '🏪 भारत का पहला AI मर्चेंट ग्रोथ प्लेटफॉर्म' : '🏪 India\'s #1 AI Merchant Growth Engine'}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#111918] leading-[1.15]">
              {isHindi ? (
                <>अपनी दुकान को <span className="text-[#0B8063]">व्हाट्सएप, इंस्टाग्राम व फेसबुक</span> पर आसान तरीके से बढ़ाएं।</>
              ) : (
                <>Grow your shop with <span className="text-[#0B8063]">direct customer calls & WhatsApp leads.</span></>
              )}
            </h1>

            <p className="text-[#3D4745] text-lg sm:text-xl leading-relaxed font-normal max-w-2xl">
              {isHindi
                ? 'विज्ञापन अनुभव की जरूरत नहीं। हिंदी, हिंग्लिश और 11 भारतीय भाषाओं में AI एजेंट्स आपके साथ कदम-दर-कदम चलेंगे।'
                : 'Zero technical skills needed. Specialized AI agents in Hindi, Hinglish & 11 Indian languages guide you step-by-step to launch local ads.'}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                onClick={() => openAuth('signup')}
                className="flex items-center gap-2.5 px-7 py-4 rounded-xl bg-[#0B8063] hover:bg-[#087F5B] text-white font-extrabold text-base shadow-lg transition-all transform hover:-translate-y-0.5"
              >
                <span>{isHindi ? '🚀 अपनी दुकान मुफ्त में जोड़ें (Register Free)' : '🚀 Register Your Shop Free'}</span>
                <ArrowRight className="w-5 h-5" />
              </button>

              <button
                onClick={onStartDemo}
                className="flex items-center gap-2.5 px-6 py-4 rounded-xl bg-white hover:bg-[#F1F3F2] text-[#111918] font-bold text-base border border-[#E4E7E5] shadow-2xs transition-colors"
              >
                <Play className="w-5 h-5 fill-current text-[#0B8063]" />
                <span>{isHindi ? '▶️ मर्चेंट डेमो देखें' : '▶️ Watch 2-Min Demo'}</span>
              </button>
            </div>

            {/* Micro Social Proof */}
            <div className="pt-6 flex items-center gap-6 text-xs sm:text-sm text-[#52605E] font-medium border-t border-[#E4E7E5]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4.5 h-4.5 text-[#0B8063]" />
                <span>{isHindi ? '8,000+ एक्टिव दुकानें' : '8,000+ Active Shops'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4.5 h-4.5 text-[#0B8063]" />
                <span>{isHindi ? 'हिंदी व हिंग्लिश सहायता' : 'Hindi & Hinglish Support'}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4.5 h-4.5 text-[#0B8063]" />
                <span>{isHindi ? '0% सेटअप फीस' : 'Zero Setup Fee'}</span>
              </div>
            </div>
          </div>

          {/* Right Hero Visual Card */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E4E7E5] shadow-xl space-y-6">
              <div className="flex items-center justify-between border-b border-[#E4E7E5] pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0B8063] text-white flex items-center justify-center font-bold">
                    <Store className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#111918]">Sharma Fitness Studio</div>
                    <div className="text-xs text-[#52605E]">Hazratganj, Lucknow • Gym & Fitness</div>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#16835B] bg-[#16835B]/10 px-2.5 py-1 rounded-md">
                  ✓ LIVE AD
                </span>
              </div>

              {/* Sample Ad Poster Preview */}
              <div className="p-5 rounded-xl bg-[#F8F8F5] border border-[#E4E7E5] space-y-3">
                <div className="flex items-center justify-between text-xs text-[#0B8063] font-bold">
                  <span>🔥 Special Festival Offer Poster</span>
                  <span>5 km Radius</span>
                </div>
                <h3 className="text-base font-extrabold text-[#111918]">
                  🔥 Don&apos;t miss out in Hazratganj, Lucknow! 3-Day Free VIP Pass ending soon!
                </h3>
                <p className="text-xs text-[#52605E] leading-relaxed">
                  Ready to upgrade your routine with Sharma Fitness Studio? Claim your exclusive free trial today! Premium equipment & certified trainers.
                </p>
                <div className="pt-2 flex items-center justify-between">
                  <span className="text-xs font-bold text-white bg-[#0B8063] px-3 py-1.5 rounded-lg">
                    Book Free Trial
                  </span>
                  <span className="text-xs font-semibold text-[#52605E]">Direct WhatsApp Leads</span>
                </div>
              </div>

              {/* Live Metric */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-lg bg-[#F8F8F5] text-center border border-[#E4E7E5]">
                  <div className="text-xl font-extrabold text-[#111918]">120+</div>
                  <div className="text-[11px] font-bold text-[#0B8063]">Customer Leads</div>
                </div>
                <div className="p-3 rounded-lg bg-[#F8F8F5] text-center border border-[#E4E7E5]">
                  <div className="text-xl font-extrabold text-[#111918]">₹5,000</div>
                  <div className="text-[11px] font-bold text-[#0B8063]">Monthly Budget</div>
                </div>
              </div>

              <button
                onClick={() => openAuth('signup')}
                className="w-full py-3 rounded-xl bg-[#111918] hover:bg-black text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2"
              >
                <span>Create Ad Poster For Your Shop</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-16 bg-white border-y border-[#E4E7E5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-3xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-[#0B8063]">
              {isHindi ? 'विशेषताएं (Platform Features)' : 'Platform Features'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111918]">
              {isHindi ? 'आपकी दुकान के लिए खास AI सुविधाएं' : 'Everything Your Shop Needs To Grow Online'}
            </h2>
            <p className="text-base text-[#52605E]">
              {isHindi
                ? 'बिना किसी विज्ञापन एजेंसी के अपनी दुकान के लिए खुद व्हाट्सएप और फेसबुक विज्ञापन चलाएं।'
                : 'Run targeted local ads without needing expensive ad agencies or complex marketing knowledge.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-[#F8F8F5] border border-[#E4E7E5] space-y-4 hover:border-[#0B8063] transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#0B8063] text-white flex items-center justify-center font-bold">
                <Bot className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#111918]">
                {isHindi ? '1. साथी वॉइस व चैट असिस्टेंट' : '1. Saathi Voice & Chat Assistant'}
              </h3>
              <p className="text-sm text-[#52605E] leading-relaxed">
                {isHindi
                  ? 'हिंदी, हिंग्लिश और आपकी स्थानीय भाषा में बोलकर या लिखकर मदद पाएं। साथी आपके सभी सवाल हल करेगा।'
                  : 'Talk or text in Hindi, Hinglish, or regional languages. Saathi answers questions and fixes issues.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8F8F5] border border-[#E4E7E5] space-y-4 hover:border-[#0B8063] transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#0B8063] text-white flex items-center justify-center font-bold">
                <Megaphone className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#111918]">
                {isHindi ? '2. 1-क्लिक ऑफर पोस्टर क्रिएटर' : '2. 1-Click Offer Poster Studio'}
              </h3>
              <p className="text-sm text-[#52605E] leading-relaxed">
                {isHindi
                  ? 'AI आपकी दुकान के लिए 3 अलग ऑफर पोस्टर (ऑफर, भरोसा, स्थानीय) तैयार करता है।'
                  : 'AI generates 3 distinct ad variants (Offer-focused, Trust-focused, Local-focused) for your shop.'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#F8F8F5] border border-[#E4E7E5] space-y-4 hover:border-[#0B8063] transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#0B8063] text-white flex items-center justify-center font-bold">
                <PhoneCall className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-[#111918]">
                {isHindi ? '3. 3-5 किमी स्थानीय ग्राहक दायरा' : '3. 3–5 km Local Radius Ads'}
              </h3>
              <p className="text-sm text-[#52605E] leading-relaxed">
                {isHindi
                  ? 'आपके विज्ञापन केवल आपकी दुकान के पास रहने वाले लोगों को दिखेंगे, जिससे सीधे व्हाट्सएप संदेश मिलेंगे।'
                  : 'Target customers living near your physical store. Get direct phone calls & WhatsApp inquiries.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section id="success-stories" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-[#0B8063]">
            {isHindi ? 'सफलता गाथाएं' : 'Merchant Success Stories'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111918]">
            {isHindi ? 'देश भर के व्यापारी मेरी दुकान से खुश हैं' : 'Real Results From Indian Store Owners'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-white border border-[#E4E7E5] space-y-4 shadow-2xs">
            <div className="flex items-center gap-1 text-[#B7791F]">
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
            </div>
            <p className="text-sm text-[#3D4745] italic">
              &quot;Pehle ad agency ko ₹15,000 dena padta tha. Meri Dukaan se maine ₹5,000 me 120+ gym members bana liye. Hindi assistant bohot aasan hai!&quot;
            </p>
            <div className="border-t border-[#E4E7E5] pt-3">
              <div className="font-bold text-[#111918]">Ramesh Kumar</div>
              <div className="text-xs text-[#52605E]">Sharma Fitness Studio, Lucknow</div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#E4E7E5] space-y-4 shadow-2xs">
            <div className="flex items-center gap-1 text-[#B7791F]">
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
            </div>
            <p className="text-sm text-[#3D4745] italic">
              &quot;Diwali ke dauran mithai ke 3x orders WhatsApp par aaye. 5 km radius targeting se kewal Jaipur ke grahakon ko ad dikha.&quot;
            </p>
            <div className="border-t border-[#E4E7E5] pt-3">
              <div className="font-bold text-[#111918]">Rajesh Gupta</div>
              <div className="text-xs text-[#52605E]">Gupta Sweets & Bakers, Jaipur</div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-[#E4E7E5] space-y-4 shadow-2xs">
            <div className="flex items-center gap-1 text-[#B7791F]">
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
              <Star className="w-4 h-4 fill-current" />
            </div>
            <p className="text-sm text-[#3D4745] italic">
              &quot;Saathi Voice assistant se baat karke 2 minute me ad setup ho gaya. Instant customer calls aana shuru ho gaye.&quot;
            </p>
            <div className="border-t border-[#E4E7E5] pt-3">
              <div className="font-bold text-[#111918]">Priya Sharma</div>
              <div className="text-xs text-[#52605E]">Priya&apos;s Organic Kitchen, Bengaluru</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="py-16 bg-[#111918] text-white">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
            {isHindi ? 'आज ही अपनी दुकान को डिजिटल बनाएं!' : 'Ready to grow your local shop with AI?'}
          </h2>
          <p className="text-base sm:text-lg text-[#8E9897] max-w-2xl mx-auto">
            {isHindi
              ? 'बिना किसी परेशानी के अपनी दुकान के लिए पहला विज्ञापन अभियान शुरू करें।'
              : 'Register your shop in 2 minutes and launch your first AI-guided ad campaign.'}
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => openAuth('signup')}
              className="px-8 py-4 rounded-xl bg-[#0B8063] hover:bg-[#087F5B] text-white font-extrabold text-base shadow-lg transition-all"
            >
              {isHindi ? '🚀 मुफ्त खाता बनाएं (Sign Up Free)' : '🚀 Register Your Dukaan Free'}
            </button>
            <button
              onClick={() => openAuth('login')}
              className="px-8 py-4 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-base border border-white/20 transition-all"
            >
              {isHindi ? '🔑 दुकान लॉगिन (Login)' : '🔑 Login to Existing Store'}
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#F8F8F5] border-t border-[#E4E7E5] py-8 text-xs text-[#52605E] mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#111918]">Meri Dukaan</span>
            <span>— Digital growth, in your language.</span>
          </div>
          <div>Powered by Sarvam AI & Agentic AI Stack • 2026</div>
        </div>
      </footer>

      {/* Auth Modal Popup */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
        initialMode={authMode}
        language={language}
      />
    </div>
  );
}
