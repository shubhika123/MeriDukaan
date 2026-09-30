import { KnowledgeDoc } from '../types';

export const KNOWLEDGE_BASE_DOCS: KnowledgeDoc[] = [
  {
    id: 'kb-fb-setup',
    title: 'Facebook Page & Ad Account Permissions Guide',
    category: 'Meta Ads Basics',
    tags: ['facebook', 'ad account', 'permissions', 'meta', 'onboarding'],
    content: `Connecting Facebook to Meri Dukaan requires two permissions:
1. Facebook Page Admin status: Ensures Meri Dukaan can post ad creatives on behalf of your business.
2. Ad Account Advertiser permission: Needed to configure campaign budgets and publish drafts.
If connection status shows 'Permission Pending', open Meta Business Suite -> Settings -> User Permissions, and grant 'Advertiser' access.`
  },
  {
    id: 'kb-whatsapp-setup',
    title: 'WhatsApp Business Setup & OTP Verification',
    category: 'WhatsApp Business',
    tags: ['whatsapp', 'otp', 'verification', 'phone', 'business'],
    content: `WhatsApp Business API activation requires verifying your business mobile number via a 6-digit OTP code.
Common Issues:
1. Number already bound to personal WhatsApp app: Must unbind before registering for Business API.
2. Network OTP delays: Allow 60 seconds before triggering resend. Max retries: 3.
3. If verification remains stuck after 3 retries, Saathi automatically dispatches an Escalation Ticket (#MD-1042) to Merchant Support.`
  },
  {
    id: 'kb-campaign-objectives',
    title: 'Local Indian SMB Campaign Objectives & Targeting Radius',
    category: 'Meta Ads Basics',
    tags: ['objective', 'customer acquisition', 'radius', 'lucknow', 'budget'],
    content: `For Indian local merchants (Gyms, Salons, Bakeries, Restaurants, Boutiques):
- Recommended Objective: 'Customer Acquisition' (Lead Generation for trial passes & appointments).
- Target Radius: 3km to 8km around your shop locality (e.g., Hazratganj Lucknow or South Ex Delhi).
- Recommended Monthly Budget: Minimum ₹5,000 for consistent local reach.`
  },
  {
    id: 'kb-creative-guidelines',
    title: 'Creative Best Practices & Policy Guidelines',
    category: 'Creative Guidelines',
    tags: ['creative', 'ad copy', 'hinglish', 'hindi', 'offer'],
    content: `Ad Copy Best Practices for Indian Audiences:
1. High-Impact Hook: Include local geographic callouts (e.g., 'Lucknow Hazratganj Professionals!').
2. Clear Offer: Highlight tangible discounts (e.g. 3-Day Free VIP Pass or 20% Off First Visit).
3. Call To Action (CTA): Explicit next step like 'Book Free Trial' or 'Claim Voucher'.
4. Language Variants: Provide copy in Hindi, Hinglish, and English for maximum conversion.`
  },
  {
    id: 'kb-escalation-policy',
    title: 'Operational Escalation & Support SLA Guidelines',
    category: 'Escalation Policy',
    tags: ['escalation', 'support', 'sla', 'saathi', 'human'],
    content: `Escalation SLA Rules:
1. If automated channel connection or budget validation fails twice, Saathi creates an escalation ticket.
2. Assigned Team: Merchant Support or Technical Support depending on issue classification.
3. Response Target SLA: 15 minutes for High priority, 2 hours for Medium priority.`
  },
  {
    id: 'kb-hindi-faqs',
    title: 'Meri Dukaan Hindi & Hinglish Merchant FAQs',
    category: 'Hindi FAQs',
    tags: ['hindi', 'faq', 'meridukaan', 'hinglish', 'support'],
    content: `अक्सर पूछे जाने वाले सवाल (Meri Dukaan Hindi FAQ):
1. 'क्या मुझे कंप्यूटर की जरूरत है?' - नहीं, मेरी दुकान पूरी तरह से आपके मोबाइल और व्हाट्सऐप पर काम करती है।
2. 'मेरा बजट कितना होना चाहिए?' - आप सिर्फ ₹5,000 प्रति महीने से स्थानीय विज्ञापन शुरू कर सकते हैं।
3. 'क्या मैं अपनी भाषा में बात कर सकता हूं?' - हां, साथी (Saathi AI) हिंदी, हिंग्लिश और आपकी अपनी भाषा समझता है।`
  }
];

export interface SearchResult {
  doc: KnowledgeDoc;
  score: number;
}

export function searchKnowledgeBase(query: string, topK: number = 2): SearchResult[] {
  const queryWords = query.toLowerCase().split(/\W+/).filter(Boolean);
  
  const results = KNOWLEDGE_BASE_DOCS.map(doc => {
    let score = 0;
    const textToSearch = `${doc.title} ${doc.category} ${doc.content} ${doc.tags.join(' ')}`.toLowerCase();
    
    queryWords.forEach(word => {
      if (word.length < 3) return;
      if (doc.tags.some(t => t.toLowerCase() === word)) score += 5;
      if (doc.title.toLowerCase().includes(word)) score += 4;
      const count = (textToSearch.match(new RegExp(word, 'g')) || []).length;
      score += count;
    });

    return { doc, score };
  });

  results.sort((a, b) => b.score - a.score);
  return results.slice(0, topK);
}
