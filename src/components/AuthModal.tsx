'use client';

import React, { useState } from 'react';
import { Merchant, MerchantProfile, IndianLanguage } from '@/lib/types';
import { store } from '@/lib/db/store';
import {
  X,
  Store,
  User,
  Phone,
  MapPin,
  Tag,
  Target,
  IndianRupee,
  Globe,
  ArrowRight,
  CheckCircle2,
  Lock,
  Sparkles,
  LogIn
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (merchant: Merchant, isNew: boolean) => void;
  initialMode?: 'login' | 'signup';
  language?: 'en' | 'hi';
}

export function AuthModal({
  isOpen,
  onClose,
  onSuccess,
  initialMode = 'signup',
  language = 'hi'
}: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const isHindi = language === 'hi';

  // Sign up form state
  const [merchantName, setMerchantName] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [category, setCategory] = useState('Gym & Fitness');
  const [city, setCity] = useState('Lucknow');
  const [locality, setLocality] = useState('Hazratganj');
  const [phone, setPhone] = useState('');
  const [campaignObjective, setCampaignObjective] = useState('Customer Calls & Messages');
  const [budget, setBudget] = useState('₹5,000');
  const [targetRadius, setTargetRadius] = useState('5 km');
  const [preferredLanguage, setPreferredLanguage] = useState<IndianLanguage>('hi');

  // Login form state
  const [loginPhone, setLoginPhone] = useState('');
  const [selectedPresetId, setSelectedPresetId] = useState('m-glowfit');

  if (!isOpen) return null;

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName.trim() || !phone.trim()) return;

    const newProfile: MerchantProfile = {
      id: `m-custom-${Date.now()}`,
      merchantName: merchantName.trim() || 'Dukaan Owner',
      businessName: businessName.trim(),
      category: category || 'Retail Shop',
      city: city.trim() || 'Lucknow',
      locality: locality.trim() || 'Local Area',
      location: `${locality.trim() || 'Local Area'}, ${city.trim() || 'Lucknow'}`,
      phone: phone.trim().startsWith('+91') ? phone.trim() : `+91 ${phone.trim()}`,
      whatsApp: phone.trim().startsWith('+91') ? phone.trim() : `+91 ${phone.trim()}`,
      productsOrServices: `${category} services & products`,
      targetAudience: `Local customers in ${city} within ${targetRadius}`,
      campaignObjective: campaignObjective || 'Customer Calls',
      budget: budget || '₹5,000',
      targetRadius: targetRadius || '5 km',
      offer: '15% Off First Order / Free Trial Pass',
      preferredLanguage: preferredLanguage || 'hi',
      voiceEnabled: true,
      codeMixingEnabled: true
    };

    const newMerchant: Merchant = {
      id: newProfile.id,
      profile: newProfile,
      stage: 'SIGNED_UP',
      status: 'In Progress',
      risk: 'Low',
      lastActivity: 'Just now',
      creatives: [],
      channels: {
        facebookConnected: false,
        instagramConnected: false,
        whatsAppVerified: true,
        whatsAppPhoneNumber: newProfile.whatsApp
      },
      attemptsCount: { whatsapp: 0 }
    };

    store.updateMerchant(newMerchant);
    onSuccess(newMerchant, true);
    onClose();
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const merchants = store.getMerchants();
    let target = merchants.find(m => m.id === selectedPresetId);

    if (!target && loginPhone.trim()) {
      target = merchants.find(
        m => m.profile.phone.includes(loginPhone.trim()) || m.profile.whatsApp.includes(loginPhone.trim())
      );
    }

    if (!target) target = merchants[0];

    onSuccess(target, false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl border border-[#E4E7E5] max-w-xl w-full p-6 sm:p-8 space-y-6 relative shadow-2xl animate-in fade-in zoom-in-95 duration-200 my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-[#F1F3F2] text-[#66706F] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0B8063]/10 text-[#0B8063] text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isHindi ? 'मेरी दुकान मर्चेंट पोर्टल' : 'Meri Dukaan Merchant Portal'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111918] tracking-tight">
            {mode === 'signup'
              ? (isHindi ? 'अपनी दुकान का मुफ्त पंजीकरण करें' : 'Register Your Dukaan Free')
              : (isHindi ? 'दुकानदार लॉगिन' : 'Merchant Login')}
          </h2>
          <p className="text-xs sm:text-sm text-[#52605E]">
            {mode === 'signup'
              ? (isHindi ? 'कुछ आसान सवालों के जवाब दें और AI से अपने ग्राहक बढ़ाएं' : 'Fill details below to activate AI Customer Growth in 2 minutes')
              : (isHindi ? 'अपने पंजीकृत मोबाइल नंबर या दुकान आईडी से लॉगिन करें' : 'Access your existing active store profile')}
          </p>
        </div>

        {/* Mode Switcher Tabs */}
        <div className="grid grid-cols-2 p-1 bg-[#F8F8F5] rounded-xl border border-[#E4E7E5]">
          <button
            onClick={() => setMode('signup')}
            className={`py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
              mode === 'signup'
                ? 'bg-[#0B8063] text-white shadow-xs'
                : 'text-[#52605E] hover:text-[#111918]'
            }`}
          >
            {isHindi ? '✨ नया पंजीकरण (Sign Up)' : '✨ New Registration'}
          </button>
          <button
            onClick={() => setMode('login')}
            className={`py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all ${
              mode === 'login'
                ? 'bg-[#0B8063] text-white shadow-xs'
                : 'text-[#52605E] hover:text-[#111918]'
            }`}
          >
            {isHindi ? '🔑 लॉगिन करें (Login)' : '🔑 Login to Shop'}
          </button>
        </div>

        {/* SIGN UP FORM */}
        {mode === 'signup' && (
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="text-xs font-bold text-[#111918] block mb-1 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#0B8063]" />
                  <span>{isHindi ? 'दुकानदार का नाम (Owner Name)' : 'Owner Name'}</span>
                </label>
                <input
                  type="text"
                  required
                  value={merchantName}
                  onChange={e => setMerchantName(e.target.value)}
                  placeholder={isHindi ? 'उदा. रमेश कुमार' : 'e.g. Ramesh Kumar'}
                  className="w-full bg-[#F8F8F5] border border-[#E4E7E5] rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-[#111918] focus:outline-none focus:border-[#0B8063] font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#111918] block mb-1 flex items-center gap-1.5">
                  <Store className="w-3.5 h-3.5 text-[#0B8063]" />
                  <span>{isHindi ? 'दुकान का नाम (Shop Name) *' : 'Business / Shop Name *'}</span>
                </label>
                <input
                  type="text"
                  required
                  value={businessName}
                  onChange={e => setBusinessName(e.target.value)}
                  placeholder={isHindi ? 'उदा. शर्मा फिटनेस स्टूडियो / गुप्ता स्वीट्स' : 'e.g. Sharma Fitness Studio'}
                  className="w-full bg-[#F8F8F5] border border-[#E4E7E5] rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-[#111918] focus:outline-none focus:border-[#0B8063] font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="text-xs font-bold text-[#111918] block mb-1 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#0B8063]" />
                  <span>{isHindi ? 'बिजनेस श्रेणी (Category)' : 'Business Category'}</span>
                </label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full bg-[#F8F8F5] border border-[#E4E7E5] rounded-lg px-3 py-2.5 text-xs sm:text-sm text-[#111918] focus:outline-none focus:border-[#0B8063] font-medium"
                >
                  <option value="Gym & Fitness">Gym & Fitness (जिम व फिटनेस)</option>
                  <option value="Sweets & Bakery">Sweets & Bakery (मिठाई व बेकरी)</option>
                  <option value="Clothing & Boutique">Clothing & Boutique (कपड़े व बुटीक)</option>
                  <option value="Restaurant & Cafe">Restaurant & Cafe (रेस्तरां व कैफे)</option>
                  <option value="Salon & Beauty">Salon & Beauty (सलून व ब्यूटी)</option>
                  <option value="Electronics & Mobile">Electronics & Mobile (इलेक्ट्रॉनिक्स)</option>
                  <option value="General & Grocery Store">General & Grocery (किराना दुकान)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-[#111918] block mb-1 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#0B8063]" />
                  <span>{isHindi ? 'व्हाट्सएप / फोन नंबर *' : 'WhatsApp / Mobile No *'}</span>
                </label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  placeholder="9876543210"
                  className="w-full bg-[#F8F8F5] border border-[#E4E7E5] rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-[#111918] focus:outline-none focus:border-[#0B8063] font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="text-xs font-bold text-[#111918] block mb-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#0B8063]" />
                  <span>{isHindi ? 'शहर (City)' : 'City'}</span>
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  placeholder="Lucknow / Jaipur / Pune"
                  className="w-full bg-[#F8F8F5] border border-[#E4E7E5] rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-[#111918] focus:outline-none focus:border-[#0B8063] font-medium"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#111918] block mb-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#0B8063]" />
                  <span>{isHindi ? 'इलाका / क्षेत्र (Locality)' : 'Locality / Area'}</span>
                </label>
                <input
                  type="text"
                  value={locality}
                  onChange={e => setLocality(e.target.value)}
                  placeholder="Hazratganj / FC Road"
                  className="w-full bg-[#F8F8F5] border border-[#E4E7E5] rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-[#111918] focus:outline-none focus:border-[#0B8063] font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-bold text-[#111918] block mb-1">
                  {isHindi ? 'विज्ञापन दायरा' : 'Target Radius'}
                </label>
                <select
                  value={targetRadius}
                  onChange={e => setTargetRadius(e.target.value)}
                  className="w-full bg-[#F8F8F5] border border-[#E4E7E5] rounded-lg px-2.5 py-2 text-xs text-[#111918] font-medium"
                >
                  <option value="3 km">3 km Radius</option>
                  <option value="5 km">5 km Radius</option>
                  <option value="10 km">10 km Radius</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#111918] block mb-1">
                  {isHindi ? 'मासिक बजट' : 'Monthly Budget'}
                </label>
                <select
                  value={budget}
                  onChange={e => setBudget(e.target.value)}
                  className="w-full bg-[#F8F8F5] border border-[#E4E7E5] rounded-lg px-2.5 py-2 text-xs text-[#111918] font-medium"
                >
                  <option value="₹3,000">₹3,000 / month</option>
                  <option value="₹5,000">₹5,000 / month</option>
                  <option value="₹10,000">₹10,000 / month</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-[#111918] block mb-1">
                  {isHindi ? 'पसंदीदा भाषा' : 'Language'}
                </label>
                <select
                  value={preferredLanguage}
                  onChange={e => setPreferredLanguage(e.target.value as IndianLanguage)}
                  className="w-full bg-[#F8F8F5] border border-[#E4E7E5] rounded-lg px-2.5 py-2 text-xs text-[#111918] font-medium"
                >
                  <option value="hi">हिंदी (Hindi)</option>
                  <option value="en">English</option>
                  <option value="bn">বাংলা (Bengali)</option>
                  <option value="mr">मराठी (Marathi)</option>
                  <option value="gu">ગુજરાતી (Gujarati)</option>
                  <option value="ta">தமிழ் (Tamil)</option>
                  <option value="te">తెలుగు (Telugu)</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#0B8063] hover:bg-[#087F5B] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md transition-all mt-2"
            >
              <span>{isHindi ? '🚀 दुकान जोड़ें और ऑनबोर्डिंग शुरू करें' : '🚀 Register & Start Onboarding'}</span>
              <ArrowRight className="w-4.5 h-4.5" />
            </button>
          </form>
        )}

        {/* LOGIN FORM */}
        {mode === 'login' && (
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#111918] block flex items-center gap-1.5">
                <Store className="w-4 h-4 text-[#0B8063]" />
                <span>{isHindi ? 'अपनी एक्टिव दुकान चुनें (Select Shop Profile)' : 'Select Existing Shop Profile'}</span>
              </label>
              <div className="space-y-2 max-h-52 overflow-y-auto pr-1 no-scrollbar">
                {store.getMerchants().map(m => (
                  <div
                    key={m.id}
                    onClick={() => setSelectedPresetId(m.id)}
                    className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                      selectedPresetId === m.id
                        ? 'border-[#0B8063] bg-[#0B8063]/10 shadow-2xs'
                        : 'border-[#E4E7E5] bg-white hover:border-[#0B8063]'
                    }`}
                  >
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-[#111918]">{m.profile.businessName}</div>
                      <div className="text-xs text-[#52605E]">
                        {m.profile.merchantName} • {m.profile.locality ? `${m.profile.locality}, ${m.profile.city}` : m.profile.city}
                      </div>
                    </div>
                    {selectedPresetId === m.id && (
                      <CheckCircle2 className="w-5 h-5 text-[#0B8063]" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-[#E4E7E5]"></div>
              <span className="flex-shrink mx-3 text-xs text-[#8E9897] font-semibold">{isHindi ? 'या मोबाइल नंबर से' : 'OR BY MOBILE NO'}</span>
              <div className="flex-grow border-t border-[#E4E7E5]"></div>
            </div>

            <div>
              <label className="text-xs font-bold text-[#111918] block mb-1">
                {isHindi ? '10-अंकों का मोबाइल नंबर' : '10-Digit Mobile Number'}
              </label>
              <input
                type="text"
                value={loginPhone}
                onChange={e => setLoginPhone(e.target.value)}
                placeholder="9876543210"
                className="w-full bg-[#F8F8F5] border border-[#E4E7E5] rounded-lg px-3.5 py-2.5 text-xs sm:text-sm text-[#111918] focus:outline-none focus:border-[#0B8063] font-medium"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#0B8063] hover:bg-[#087F5B] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-md transition-all"
            >
              <LogIn className="w-4.5 h-4.5" />
              <span>{isHindi ? 'दुकान लॉगिन करें' : 'Login to Merchant Workspace'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
