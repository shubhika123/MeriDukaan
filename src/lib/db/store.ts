import { Merchant, EscalationTicket, ToolCallLog, AgentTrace, BottleneckReport } from '../types';

export const INITIAL_MERCHANTS: Merchant[] = [
  {
    id: 'm-sharma-fitness',
    profile: {
      id: 'm-sharma-fitness',
      merchantName: 'Ramesh Kumar',
      businessName: 'Sharma Fitness Studio',
      category: 'Gym / Fitness',
      city: 'Lucknow',
      locality: 'Hazratganj',
      phone: '+91 98765 43210',
      whatsApp: '+91 98765 43210',
      facebookPage: 'Sharma Fitness Studio Official',
      productsOrServices: 'Personal Training, Group HIIT, Strength Training',
      targetAudience: 'Working professionals & local fitness prospects (ages 20-45)',
      campaignObjective: 'Customer Acquisition',
      budget: '₹5,000',
      targetRadius: '5 km',
      offer: '3-Day Free VIP Gym Pass + Body Composition Analysis',
      preferredLanguage: 'hi',
      preferredScript: 'Devanagari',
      voiceEnabled: true,
      codeMixingEnabled: true
    },
    stage: 'CHANNEL_CONNECTION',
    status: 'Escalated',
    risk: 'Medium',
    lastActivity: '12 mins ago',
    attemptsCount: { facebook_permission: 2 },
    campaignStrategy: {
      objective: 'Customer Acquisition',
      audience: 'Local residents & office workers within 5km of Hazratganj, Lucknow',
      locationTargeting: 'Lucknow (Hazratganj + 5km radius)',
      budget: '₹5,000',
      duration: '10 Days',
      offer: '3-Day Free VIP Trial Pass',
      cta: 'Book Free Trial',
      strategyExplanation: 'Target high-intent local residents in Lucknow with a zero-risk 3-day pass to capture leads via Meta Lead Form.'
    },
    creatives: [
      {
        id: 'c-sharma-1',
        type: 'Variant A (Offer-focused)',
        languageVariant: 'Hinglish',
        hook: '🔥 Transform your fitness in Lucknow! 3-Day Free VIP Pass available now!',
        primaryText: 'Ready to reach your fitness goals? Get an exclusive 3-day pass to Sharma Fitness Studio in Hazratganj. Certified personal trainers & modern equipment.',
        headline: 'Claim 3-Day Free VIP Pass',
        offer: '3-Day Free VIP Pass + Body Composition Test',
        cta: 'Book Free Trial',
        creativeConcept: 'High-energy studio photo with bold yellow trial badge.',
        status: 'approved',
        journeyMapping: {
          awareness: 'Urgency-driven hook targeting Lucknow residents.',
          interest: 'Certified trainers & modern equipment details.',
          consideration: '3-day free VIP trial incentive.',
          trust: 'Hazratganj location verification.',
          action: 'Direct CTA button.'
        }
      },
      {
        id: 'c-sharma-2',
        type: 'Variant B (Trust-focused)',
        languageVariant: 'Hindi',
        hook: '⭐ लखनऊ का पसंदीदा जिम - 500+ मेंबर्स का भरोसा!',
        primaryText: 'हज़रतगंज में पाएं आधुनिक उपकरण, पर्सनल ट्रेनिंग और फ्रेंडली माहौल। आज ही अपनी फिटनेस यात्रा शुरू करें।',
        headline: 'लखनऊ के टॉप-रेटेड जिम का अनुभव करें',
        offer: 'निःशुल्क पर्सनल कंसल्टेशन',
        cta: 'Learn More',
        creativeConcept: 'Real member photo with glowing 5-star review callout.',
        status: 'approved',
        journeyMapping: {
          awareness: 'Social proof title with 500+ member rating.',
          interest: 'Friendly atmosphere & modern equipment.',
          consideration: 'Free consultation.',
          trust: 'Local member satisfaction.',
          action: 'Learn More button.'
        }
      },
      {
        id: 'c-sharma-3',
        type: 'Variant C (Local-focused)',
        languageVariant: 'Hinglish',
        hook: '📍 Lucknow Hazratganj Professionals! Short on workout time?',
        primaryText: 'Conveniently located 2 minutes from metro station. Morning & evening slots for busy professionals.',
        headline: 'Fitness Fits Your Routine',
        offer: '3-Day Pass + Free Shaker Bottle',
        cta: 'Book Free Trial',
        creativeConcept: 'Map pin graphic showing 2-min metro distance.',
        status: 'approved',
        journeyMapping: {
          awareness: 'Geo-targeted callout for Hazratganj professionals.',
          interest: 'Solves time-crunch issue.',
          consideration: 'Free shaker bonus.',
          trust: 'Relatable local office scenario.',
          action: 'Book trial before work.'
        }
      }
    ],
    channels: {
      facebookConnected: true,
      facebookAccountName: 'Sharma Fitness Studio Official',
      adAccountPermissionGranted: false,
      instagramConnected: true,
      instagramAccountHandle: '@sharmafitness_lucknow',
      whatsAppVerified: true,
      whatsAppPhoneNumber: '+91 98765 43210',
      lastErrorCode: 'ERR_AD_ACCOUNT_PERMISSION_REQUIRED',
      lastErrorMessage: 'Ad Account permission pending on Meta Business Manager'
    }
  },
  {
    id: 'm-glow-salon',
    profile: {
      id: 'm-glow-salon',
      merchantName: 'Priya Sharma',
      businessName: 'Glow Beauty Salon',
      category: 'Salon & Spa',
      city: 'Delhi',
      locality: 'South Extension',
      phone: '+91 91234 56789',
      whatsApp: '+91 91234 56789',
      facebookPage: 'Glow Beauty Salon Delhi',
      productsOrServices: 'Organic facials, bridal packages, hair styling',
      targetAudience: 'Women aged 18-40 in South Delhi',
      campaignObjective: 'Customer Acquisition',
      budget: '₹8,000',
      targetRadius: '5 km',
      offer: 'Flat 20% OFF First Visit',
      preferredLanguage: 'hi',
      preferredScript: 'Devanagari',
      voiceEnabled: true,
      codeMixingEnabled: true
    },
    stage: 'CREATIVE_APPROVAL',
    status: 'In Progress',
    risk: 'Low',
    lastActivity: '45 mins ago',
    attemptsCount: {},
    campaignStrategy: {
      objective: 'Customer Acquisition',
      audience: 'Women in South Delhi looking for premium salon services',
      locationTargeting: 'Delhi (South Extension + 5km radius)',
      budget: '₹8,000',
      duration: '14 Days',
      offer: '20% OFF First Visit',
      cta: 'Claim Voucher',
      strategyExplanation: 'Drive first-time salon footfall with an introductory 20% off voucher code via Instagram & Facebook.'
    },
    creatives: [
      {
        id: 'c-[#MD-1042]',
        type: 'Variant A (Offer-focused)',
        languageVariant: 'Hinglish',
        hook: '✨ South Delhi ladies! Get 20% OFF your first facial & hair makeover!',
        primaryText: 'Experience premium organic beauty treatments at Glow Beauty Salon South Ex.',
        headline: 'Get 20% OFF First Visit',
        offer: '20% OFF First Visit',
        cta: 'Claim Voucher',
        creativeConcept: 'Aesthetic glowing skin photoshoot visual.',
        status: 'pending',
        journeyMapping: {
          awareness: 'Targeted South Delhi callout.',
          interest: 'Organic beauty perks.',
          consideration: '20% discount code.',
          trust: 'South Ex studio tag.',
          action: 'Claim voucher CTA.'
        }
      }
    ],
    channels: {
      facebookConnected: true,
      facebookAccountName: 'Glow Beauty Salon Delhi',
      adAccountPermissionGranted: true,
      instagramConnected: true,
      instagramAccountHandle: '@glowsalon_delhi',
      whatsAppVerified: true,
      whatsAppPhoneNumber: '+91 91234 56789'
    }
  },
  {
    id: 'm-swaad-restaurant',
    profile: {
      id: 'm-swaad-restaurant',
      merchantName: 'Rajesh Gupta',
      businessName: 'Swaad Family Restaurant',
      category: 'Restaurant',
      city: 'Jaipur',
      locality: 'C-Scheme',
      phone: '+91 99887 76655',
      whatsApp: '+91 99887 76655',
      productsOrServices: 'Authentic Rajasthani Thali, North Indian Thali, Catering',
      targetAudience: 'Families & food lovers in Jaipur',
      campaignObjective: 'WhatsApp Orders',
      budget: '₹10,000',
      targetRadius: '8 km',
      offer: 'Free Dessert Platter with Royal Thali',
      preferredLanguage: 'hi'
    },
    stage: 'LIVE',
    status: 'Live',
    risk: 'Low',
    lastActivity: '2 hours ago',
    attemptsCount: {},
    creatives: [],
    channels: {
      facebookConnected: true,
      facebookAccountName: 'Swaad Restaurant Jaipur',
      adAccountPermissionGranted: true,
      instagramConnected: true,
      whatsAppVerified: true,
      whatsAppPhoneNumber: '+91 99887 76655'
    },
    metaCampaignId: 'act-991203'
  },
  {
    id: 'm-meera-boutique',
    profile: {
      id: 'm-meera-boutique',
      merchantName: 'Ananya Sen',
      businessName: 'Meera Boutique',
      category: 'Apparel & Fashion',
      city: 'Kolkata',
      locality: 'Park Street',
      phone: '+91 97766 55443',
      whatsApp: '+91 97766 55443',
      productsOrServices: 'Handloom sarees, custom ethnic wear, designer dupattas',
      targetAudience: 'Women shopping for festive sarees',
      campaignObjective: 'Customer Acquisition',
      budget: '₹6,000',
      targetRadius: '5 km',
      offer: 'Flat 15% OFF Handloom Collection',
      preferredLanguage: 'bn'
    },
    stage: 'CHANNEL_CONNECTION',
    status: 'In Progress',
    risk: 'Low',
    lastActivity: '3 hours ago',
    attemptsCount: {},
    creatives: [],
    channels: {
      facebookConnected: true,
      facebookAccountName: 'Meera Boutique Kolkata',
      adAccountPermissionGranted: true,
      instagramConnected: false,
      whatsAppVerified: true
    }
  },
  {
    id: 'm-mithaas-bakery',
    profile: {
      id: 'm-mithaas-bakery',
      merchantName: 'Amit Deshmukh',
      businessName: 'Mithaas Bakery',
      category: 'Bakery',
      city: 'Mumbai',
      locality: 'Dadar',
      phone: '+91 98112 23344',
      whatsApp: '+91 98112 23344',
      productsOrServices: 'Custom birthday cakes, fresh sourdough, artisanal cookies',
      targetAudience: 'Local neighborhood families in Dadar & Prabhadevi',
      campaignObjective: 'WhatsApp Orders',
      budget: '₹7,000',
      targetRadius: '3 km',
      offer: 'Free Mini Cupcakes on Cake Orders above ₹500',
      preferredLanguage: 'mr'
    },
    stage: 'LIVE',
    status: 'Live',
    risk: 'Low',
    lastActivity: 'Yesterday',
    attemptsCount: {},
    creatives: [],
    channels: {
      facebookConnected: true,
      facebookAccountName: 'Mithaas Bakery Mumbai',
      adAccountPermissionGranted: true,
      instagramConnected: true,
      whatsAppVerified: true
    },
    metaCampaignId: 'act-441209'
  },
  {
    id: 'm-noida-mobile',
    profile: {
      id: 'm-noida-mobile',
      merchantName: 'Vikram Patel',
      businessName: 'Noida Mobile Hub',
      category: 'Mobile Store',
      city: 'Noida',
      locality: 'Atta Market Sector 18',
      phone: '+91 96543 21098',
      whatsApp: '+91 96543 21098',
      productsOrServices: 'Mobile screen repair, tempered glass, refurbished iPhones',
      targetAudience: 'Local residents in Sector 18 Noida',
      campaignObjective: 'Customer Acquisition',
      budget: '₹500', // Below minimum requirement
      targetRadius: '3 km',
      offer: 'Free Tempered Glass with Repair',
      preferredLanguage: 'hi'
    },
    stage: 'CAMPAIGN_DRAFT',
    status: 'Blocked',
    risk: 'High',
    lastActivity: '4 hours ago',
    attemptsCount: { budget_validation: 3 },
    creatives: [],
    channels: {
      facebookConnected: true,
      facebookAccountName: 'Noida Mobile Hub Page',
      adAccountPermissionGranted: false,
      instagramConnected: false,
      whatsAppVerified: false
    }
  },
  {
    id: 'm-freshbite-cafe',
    profile: {
      id: 'm-freshbite-cafe',
      merchantName: 'Sunita Reddy',
      businessName: 'FreshBite Cafe',
      category: 'Café',
      city: 'Bengaluru',
      locality: 'Koramangala',
      phone: '+91 95432 10987',
      whatsApp: '+91 95432 10987',
      productsOrServices: 'Cold brew coffee, avocado toast, vegan bowls',
      targetAudience: '',
      campaignObjective: '',
      budget: '',
      targetRadius: '5 km',
      offer: 'Free Cold Brew with Any Breakfast',
      preferredLanguage: 'kn'
    },
    stage: 'BUSINESS_DETAILS',
    status: 'In Progress',
    risk: 'Low',
    lastActivity: 'Just now',
    attemptsCount: {},
    creatives: [],
    channels: {
      facebookConnected: false,
      adAccountPermissionGranted: false,
      instagramConnected: false,
      whatsAppVerified: false
    }
  },
  {
    id: 'm-fitzone-amritsar',
    profile: {
      id: 'm-fitzone-amritsar',
      merchantName: 'Gurpreet Singh',
      businessName: 'FitZone Gym',
      category: 'Gym / Fitness',
      city: 'Amritsar',
      locality: 'Ranjit Avenue',
      phone: '+91 94321 09876',
      whatsApp: '+91 94321 09876',
      productsOrServices: 'Crossfit, cardio, personal workout training',
      targetAudience: '',
      campaignObjective: '',
      budget: '',
      targetRadius: '10 km',
      offer: '',
      preferredLanguage: 'pa'
    },
    stage: 'SIGNED_UP',
    status: 'In Progress',
    risk: 'Low',
    lastActivity: 'Just now',
    attemptsCount: {},
    creatives: [],
    channels: {
      facebookConnected: false,
      adAccountPermissionGranted: false,
      instagramConnected: false,
      whatsAppVerified: false
    }
  }
];

export const INITIAL_ESCALATIONS: EscalationTicket[] = [
  {
    ticketId: 'MD-1042',
    merchantId: 'm-sharma-fitness',
    merchantName: 'Ramesh Kumar',
    businessName: 'Sharma Fitness Studio',
    issue: 'Facebook Ad Account Permission pending on Meta Business Manager',
    attempts: 2,
    currentStage: 'CHANNEL_CONNECTION',
    agentDiagnosis: 'Saathi verified Facebook Page is linked, but Meta Ad Account permission is missing. 2 automated attempts failed. User requires guided permission grant flow or manual ops team assistance.',
    recommendedAction: 'Send merchant step-by-step WhatsApp authorization link or trigger manual call by Merchant Support.',
    assignedTeam: 'Merchant Support',
    priority: 'Medium',
    createdTime: '2h 14m ago',
    status: 'Open',
    owner: 'Merchant Support Team'
  },
  {
    ticketId: 'MD-1039',
    merchantId: 'm-noida-mobile',
    merchantName: 'Vikram Patel',
    businessName: 'Noida Mobile Hub',
    issue: 'Campaign Budget Below Sandbox Minimum (₹500 daily limit)',
    attempts: 3,
    currentStage: 'CAMPAIGN_DRAFT',
    agentDiagnosis: 'Merchant entered ₹150 budget which fails Meta Ads delivery criteria. Minimum daily spend requirement is ₹500.',
    recommendedAction: 'Prompt merchant via Saathi to approve minimum daily budget upgrade to ₹500.',
    assignedTeam: 'Billing Team',
    priority: 'Medium',
    createdTime: '4 hours ago',
    status: 'Investigating',
    owner: 'Billing Operations'
  }
];

export const INITIAL_TOOL_LOGS: ToolCallLog[] = [
  {
    id: 'tl-101',
    timestamp: '18:15:10',
    merchantId: 'm-sharma-fitness',
    agentName: 'Saathi Support Agent',
    toolName: 'check_facebook_connection()',
    args: { merchantId: 'm-sharma-fitness' },
    result: { connected: true, accountName: 'Sharma Fitness Studio Official', adAccountPermission: 'PENDING' },
    status: 'success'
  },
  {
    id: 'tl-102',
    timestamp: '18:15:14',
    merchantId: 'm-sharma-fitness',
    agentName: 'Saathi Support Agent',
    toolName: 'check_whatsapp_connection()',
    args: { merchantId: 'm-sharma-fitness' },
    result: { verified: true, number: '+91 98765 43210' },
    status: 'success'
  },
  {
    id: 'tl-103',
    timestamp: '18:16:01',
    merchantId: 'm-sharma-fitness',
    agentName: 'Saathi Support Agent',
    toolName: 'create_escalation()',
    args: { merchantId: 'm-sharma-fitness', issue: 'Facebook Ad Account Permission' },
    result: { ticketId: 'MD-1042', status: 'OPEN' },
    status: 'success'
  }
];

export const INITIAL_TRACES: AgentTrace[] = [
  {
    id: 'tr-1',
    timestamp: '18:14:00',
    agentName: 'Onboarding Agent',
    action: 'Processed Hinglish input from Ramesh Kumar (Sharma Fitness Studio, Lucknow)',
    toolExecuted: 'update_merchant_profile()',
    resultSummary: 'Extracted Profile: Lucknow, Gym/Fitness, ₹5,000 budget, 5 km radius.',
    nextStep: 'Handoff to Campaign Strategy Agent'
  },
  {
    id: 'tr-2',
    timestamp: '18:14:45',
    agentName: 'Campaign Strategy Agent',
    action: 'Generated Customer Acquisition plan for Lucknow location',
    toolExecuted: 'create_campaign_draft()',
    resultSummary: 'Draft ID meta-draft-99120 created successfully.',
    nextStep: 'Handoff to Creative Agent'
  },
  {
    id: 'tr-3',
    timestamp: '18:15:30',
    agentName: 'Creative Agent',
    action: 'Synthesized 3 ad copy variants (Hindi, Hinglish, English)',
    toolExecuted: 'upload_creative()',
    resultSummary: '3 ad variants uploaded to Sandbox.',
    nextStep: 'Awaiting Merchant Approval'
  },
  {
    id: 'tr-4',
    timestamp: '18:16:10',
    agentName: 'Saathi Support Agent',
    action: 'Diagnosed Facebook Ad Account permission error using RAG knowledge base',
    toolExecuted: 'search_knowledge_base("Facebook Ad Account Permission")',
    resultSummary: 'Source: Merchant Onboarding Guide (kb-fb-setup). Dispatched Escalation Ticket MD-1042.',
    nextStep: 'Escalated to Merchant Support Team'
  }
];

class AppStore {
  private merchants: Merchant[] = [...INITIAL_MERCHANTS];
  private escalations: EscalationTicket[] = [...INITIAL_ESCALATIONS];
  private toolLogs: ToolCallLog[] = [...INITIAL_TOOL_LOGS];
  private traces: AgentTrace[] = [...INITIAL_TRACES];

  getMerchants(): Merchant[] {
    return this.merchants;
  }

  getMerchant(id: string): Merchant | undefined {
    return this.merchants.find(m => m.id === id);
  }

  updateMerchant(updated: Merchant): void {
    const idx = this.merchants.findIndex(m => m.id === updated.id);
    if (idx !== -1) {
      this.merchants[idx] = updated;
    } else {
      this.merchants.push(updated);
    }
  }

  getEscalations(): EscalationTicket[] {
    return this.escalations;
  }

  addEscalation(ticket: EscalationTicket): void {
    this.escalations.unshift(ticket);
  }

  updateEscalationStatus(ticketId: string, status: EscalationTicket['status']): void {
    const t = this.escalations.find(x => x.ticketId === ticketId);
    if (t) {
      t.status = status;
      if (status === 'Resolved') {
        const m = this.merchants.find(x => x.id === t.merchantId);
        if (m) {
          m.status = 'In Progress';
          m.risk = 'Low';
        }
      }
    }
  }

  getToolLogs(): ToolCallLog[] {
    return this.toolLogs;
  }

  addToolLog(log: ToolCallLog): void {
    this.toolLogs.unshift(log);
  }

  getTraces(): AgentTrace[] {
    return this.traces;
  }

  addTrace(trace: AgentTrace): void {
    this.traces.unshift(trace);
  }

  getBottleneckReport(): BottleneckReport {
    const merchants = this.getMerchants();
    const total = merchants.length;
    
    const fbBlocked = merchants.filter(m => m.status === 'Escalated' && m.channels.adAccountPermissionGranted === false).length;
    
    return {
      detectedBottleneck: 'Facebook Ad Account Permission',
      observation: `High concentration of merchants (${fbBlocked} out of ${total}) blocked during channel connection due to pending Meta Ad Account permissions.`,
      affectedCount: fbBlocked || 18,
      dropoffPercentage: 42,
      suggestedIntervention: 'Add a guided permission grant walkthrough widget during initial merchant onboarding chat.',
      timestamp: new Date().toLocaleTimeString()
    };
  }

  resetDemoData(): void {
    this.merchants = JSON.parse(JSON.stringify(INITIAL_MERCHANTS));
    this.escalations = JSON.parse(JSON.stringify(INITIAL_ESCALATIONS));
    this.toolLogs = JSON.parse(JSON.stringify(INITIAL_TOOL_LOGS));
    this.traces = JSON.parse(JSON.stringify(INITIAL_TRACES));
  }
}

export const store = new AppStore();
