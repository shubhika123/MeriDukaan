export type TabType =
  | 'landing'
  | 'overview'
  | 'onboarding'
  | 'campaigns'
  | 'saathi'
  | 'journey'
  | 'sandbox'
  | 'escalations'
  | 'dashboard'
  | 'console'
  | 'knowledge'
  | 'evaluation'
  | 'settings';

export type IndianLanguage =
  | 'en'
  | 'hi'
  | 'bn'
  | 'mr'
  | 'ta'
  | 'te'
  | 'gu'
  | 'kn'
  | 'ml'
  | 'pa'
  | 'or';

export type OnboardingStage =
  | 'SIGNED_UP'
  | 'BUSINESS_DETAILS'
  | 'CAMPAIGN_OBJECTIVE'
  | 'CAMPAIGN_DRAFT'
  | 'CREATIVE_GENERATED'
  | 'CREATIVE_APPROVAL'
  | 'CHANNEL_CONNECTION'
  | 'CAMPAIGN_READY'
  | 'MERCHANT_CONFIRMATION'
  | 'LIVE';

export type StatusBadge = 'Complete' | 'In Progress' | 'Blocked' | 'Escalated' | 'Live';

export type RiskLevel = 'Low' | 'Medium' | 'High';

export interface MerchantProfile {
  id: string;
  merchantName: string; // e.g. "Ramesh Kumar"
  businessName: string; // e.g. "Sharma Fitness Studio"
  category: string;     // e.g. "Gym / Fitness"
  city: string;         // e.g. "Lucknow"
  locality: string;     // e.g. "Hazratganj"
  location?: string;    // e.g. "Lucknow, Uttar Pradesh" (for legacy compat)
  phone: string;
  whatsApp: string;
  website?: string;
  instagramHandle?: string;
  facebookPage?: string;
  productsOrServices: string;
  targetAudience: string;
  campaignObjective: string; // e.g. "Customer Acquisition"
  budget: string;            // e.g. "₹5,000"
  targetRadius: string;      // e.g. "5 km"
  offer: string;
  preferredLanguage: IndianLanguage;
  preferredScript?: string;
  voiceEnabled?: boolean;
  codeMixingEnabled?: boolean;
}

export interface CampaignStrategy {
  objective: string;
  audience: string;
  locationTargeting: string;
  budget: string;
  duration: string;
  offer: string;
  cta: string;
  strategyExplanation: string;
}

export interface AdVariant {
  id: string;
  type: 'Variant A (Offer-focused)' | 'Variant B (Trust-focused)' | 'Variant C (Local-focused)';
  languageVariant?: 'Hindi' | 'Hinglish' | 'English';
  hook: string;
  primaryText: string;
  headline: string;
  offer: string;
  cta: string;
  creativeConcept: string;
  status: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
  journeyMapping: {
    awareness: string;
    interest: string;
    consideration: string;
    trust: string;
    action: string;
  };
}

export interface ChannelConnectionStatus {
  facebookConnected: boolean;
  facebookAccountName?: string;
  adAccountPermissionGranted?: boolean;
  instagramConnected: boolean;
  instagramAccountHandle?: string;
  whatsAppVerified: boolean;
  whatsAppPhoneNumber?: string;
  lastErrorCode?: string;
  lastErrorMessage?: string;
}

export interface Merchant {
  id: string;
  profile: MerchantProfile;
  stage: OnboardingStage;
  status: StatusBadge;
  risk: RiskLevel;
  lastActivity: string;
  campaignStrategy?: CampaignStrategy;
  creatives: AdVariant[];
  channels: ChannelConnectionStatus;
  metaCampaignId?: string;
  attemptsCount: Record<string, number>;
}

export interface EscalationTicket {
  ticketId: string;
  merchantId: string;
  merchantName: string;
  businessName?: string;
  issue: string;
  attempts: number;
  currentStage: OnboardingStage;
  agentDiagnosis: string;
  recommendedAction: string;
  assignedTeam: 'Technical Support' | 'Merchant Support' | 'Account Operations' | 'Policy Team' | 'Billing Team';
  priority: 'Low' | 'Medium' | 'High' | 'Urgent';
  createdTime: string;
  status: 'Open' | 'Investigating' | 'Waiting for Merchant' | 'Escalated' | 'Resolved';
  owner?: string;
}

export interface ToolCallLog {
  id: string;
  timestamp: string;
  merchantId: string;
  agentName: string;
  toolName: string;
  args: Record<string, any>;
  result: Record<string, any>;
  status: 'success' | 'failed' | 'pending';
}

export interface AgentTrace {
  id: string;
  timestamp: string;
  agentName: 'Onboarding Agent' | 'Campaign Strategy Agent' | 'Creative Agent' | 'Saathi Support Agent' | 'Operations Agent' | 'Troubleshooting Agent';
  action: string;
  toolExecuted?: string;
  resultSummary: string;
  nextStep: string;
}

export interface KnowledgeDoc {
  id: string;
  title: string;
  category: 'Meta Ads Basics' | 'WhatsApp Business' | 'Troubleshooting' | 'Escalation Policy' | 'Creative Guidelines' | 'Hindi FAQs';
  content: string;
  tags: string[];
}

export interface EvaluationCase {
  id: string;
  scenario: string;
  category: 'onboarding' | 'routing' | 'tool_selection' | 'troubleshooting' | 'escalation' | 'rag_grounding' | 'multilingual' | 'hinglish';
  input: string;
  expectedOutput: string;
  expectedTool?: string;
  passed?: boolean;
  latencyMs?: number;
  tokensUsed?: number;
  groundedScore?: number;
}

export interface BottleneckReport {
  detectedBottleneck: string;
  observation: string;
  affectedCount: number;
  dropoffPercentage: number;
  suggestedIntervention: string;
  timestamp: string;
}
