import { MerchantProfile, OnboardingStage, IndianLanguage } from '../../types';
import { MetaAdsSandbox } from '../../tools/metaSandbox';
import { store } from '../../db/store';

export interface OnboardingAnalysis {
  updatedProfile: Partial<MerchantProfile>;
  missingFields: string[];
  isComplete: boolean;
  nextQuestion: string;
  detectedStage: OnboardingStage;
  extractedLanguage: IndianLanguage;
}

export function detectMissingFields(profile: MerchantProfile): string[] {
  const missing: string[] = [];
  if (!profile.businessName?.trim()) missing.push('Business Name');
  if (!profile.category?.trim()) missing.push('Category');
  if (!profile.city?.trim() && !profile.location?.trim()) missing.push('City');
  if (!profile.productsOrServices?.trim()) missing.push('Products/Services');
  if (!profile.targetAudience?.trim()) missing.push('Target Audience');
  if (!profile.campaignObjective?.trim()) missing.push('Campaign Objective');
  if (!profile.budget?.trim()) missing.push('Budget');
  if (!profile.offer?.trim()) missing.push('Offer');
  return missing;
}

export function analyzeOnboardingMessage(
  userText: string,
  currentProfile: MerchantProfile
): OnboardingAnalysis {
  const updated = { ...currentProfile };
  const lower = userText.toLowerCase();

  // Detect Language
  const isHindi = /([<ctrl42><ctrl42><ctrl42>]|mujhe|meri|apni|dukaan|shop|chahiye|hai|aur|dokan|bhai|kaise|sweets|kaam)/i.test(userText);
  const language = isHindi ? 'hi' : (currentProfile.preferredLanguage || 'en');
  updated.preferredLanguage = language;

  // Conversational Field Extraction
  if (!updated.businessName || updated.businessName === 'New Merchant') {
    if (lower.includes('gym') || lower.includes('glowfit')) updated.businessName = 'GlowFit Gym';
    else if (lower.includes('sweets') || lower.includes('sharma')) updated.businessName = 'Sharma Sweets';
    else if (lower.includes('threads') || lower.includes('urban')) updated.businessName = 'Urban Threads';
    else if (lower.includes('brew') || lower.includes('café')) updated.businessName = 'Café Brew';
    else if (userText.length < 40 && !userText.includes(' ')) updated.businessName = userText;
  }

  if (lower.includes('gym') || lower.includes('fitness') || lower.includes('workout')) {
    updated.category = 'Fitness & Wellness';
  } else if (lower.includes('sweets') || lower.includes('mithai') || lower.includes('food')) {
    updated.category = 'Food & Confectionery';
  } else if (lower.includes('clothes') || lower.includes('apparel') || lower.includes('fashion')) {
    updated.category = 'Apparel & Fashion';
  }

  if (lower.includes('noida') || lower.includes('sector')) {
    updated.location = 'Sector 62, Noida';
  } else if (lower.includes('delhi') || lower.includes('chandni')) {
    updated.location = 'Chandni Chowk, Delhi';
  } else if (lower.includes('mumbai') || lower.includes('bandra')) {
    updated.location = 'Bandra West, Mumbai';
  } else if (lower.includes('bengaluru') || lower.includes('bangalore') || lower.includes('koramangala')) {
    updated.location = 'Koramangala, Bengaluru';
  }

  if (lower.includes('memberships') || lower.includes('trial') || lower.includes('leads')) {
    updated.campaignObjective = 'Lead Generation';
    if (!updated.productsOrServices) updated.productsOrServices = 'Gym memberships, personal training';
  } else if (lower.includes('order') || lower.includes('sales') || lower.includes('box')) {
    updated.campaignObjective = 'Conversions';
  }

  if (lower.includes('5000') || lower.includes('5,000') || lower.includes('5k')) {
    updated.budget = '₹5,000';
  } else if (lower.includes('10000') || lower.includes('10,000') || lower.includes('10k')) {
    updated.budget = '₹10,000';
  } else if (lower.includes('150') || lower.includes('₹150')) {
    updated.budget = '₹150';
  }

  if (lower.includes('trial') || lower.includes('3-day') || lower.includes('free')) {
    updated.offer = '3-Day Free VIP Pass + Body Composition Test';
  } else if (lower.includes('discount') || lower.includes('15%')) {
    updated.offer = 'Flat 15% OFF on Orders';
  }

  if (!updated.targetAudience && updated.category === 'Fitness & Wellness') {
    updated.targetAudience = 'Local residents & working professionals within 5km radius';
  }

  const missing = detectMissingFields(updated);
  const isComplete = missing.length === 0;

  let nextQuestion = '';
  if (isComplete) {
    nextQuestion = language === 'hi'
      ? 'Aapki saari business details mil gayi hain! Main ab aapki campaign strategy aur 3 ad variants generate kar raha hoon. Kya hum aage badhein?'
      : 'All business details captured! I have formulated your campaign plan. Would you like me to generate your 3 ad variants now?';
  } else {
    const firstMissing = missing[0];
    if (language === 'hi') {
      nextQuestion = `Kripya mujhe apna **${firstMissing}** batayein taaki hum campaign taiyar kar sakein.`;
    } else {
      nextQuestion = `Could you please provide your **${firstMissing}** to proceed with campaign creation?`;
    }
  }

  let detectedStage: OnboardingStage = 'BUSINESS_DETAILS';
  if (isComplete) detectedStage = 'CAMPAIGN_DRAFT';

  // Record tool calls
  const merchantId = currentProfile.id;
  store.addToolLog({
    id: `tl-${Date.now()}`,
    timestamp: new Date().toLocaleTimeString(),
    merchantId,
    agentName: 'Onboarding Agent',
    toolName: 'update_merchant_profile()',
    args: { merchantId, updatedFields: updated },
    result: { missingCount: missing.length, isComplete },
    status: 'success'
  });

  store.addTrace({
    id: `tr-${Date.now()}`,
    timestamp: new Date().toLocaleTimeString(),
    agentName: 'Onboarding Agent',
    action: `Processed message from merchant (${language.toUpperCase()})`,
    toolExecuted: 'update_merchant_profile()',
    resultSummary: `Extracted profile details. Missing fields remaining: ${missing.length}.`,
    nextStep: isComplete ? 'Transition to Campaign Strategy Agent' : `Ask for ${missing[0]}`
  });

  return {
    updatedProfile: updated,
    missingFields: missing,
    isComplete,
    nextQuestion,
    detectedStage,
    extractedLanguage: language
  };
}
