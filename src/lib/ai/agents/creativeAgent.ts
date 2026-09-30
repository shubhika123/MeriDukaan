import { MerchantProfile, CampaignStrategy, AdVariant } from '../../types';
import { MetaAdsSandbox } from '../../tools/metaSandbox';
import { store } from '../../db/store';

export function generateCreativeVariants(
  profile: MerchantProfile,
  strategy: CampaignStrategy
): AdVariant[] {
  const bName = profile.businessName || 'Your Business';
  const loc = profile.locality ? `${profile.locality}, ${profile.city}` : profile.city || profile.location || 'your area';
  const off = profile.offer || strategy.offer || 'Special Discount';
  const cta = strategy.cta || 'Claim Offer';

  const variants: AdVariant[] = [
    {
      id: `c-var-a-${Date.now()}`,
      type: 'Variant A (Offer-focused)',
      hook: `🔥 Don't miss out on ${loc}! ${off} is ending soon!`,
      primaryText: `Ready to upgrade your routine with ${bName}? Claim your exclusive offer today before slots fill up! Premium service & experienced staff.`,
      headline: `Claim ${off} Today!`,
      offer: off,
      cta: cta,
      creativeConcept: 'High-energy vibrant graphic featuring bold promotional badges and high contrast discount colors.',
      status: 'pending',
      journeyMapping: {
        awareness: 'Urgency-driven hook capturing high attention in feed.',
        interest: 'Clear breakdown of primary service value and quality.',
        consideration: 'Direct highlight of the high-value promotional offer.',
        trust: 'Established reputation & location reassurance.',
        action: 'Direct CTA driving immediate click/sign up.'
      }
    },
    {
      id: `c-var-b-${Date.now()}`,
      type: 'Variant B (Trust-focused)',
      hook: `⭐ Rated #1 in ${loc} by over 500+ satisfied customers!`,
      primaryText: `Discover why people in ${loc} trust ${bName} for top quality. Professional, clean, and dedicated to your complete satisfaction.`,
      headline: `Experience ${bName} Excellence`,
      offer: `Free Consultation & ${off}`,
      cta: 'Learn More',
      creativeConcept: 'Authentic customer video testimonial with glowing 5-star review quote callouts on screen.',
      status: 'pending',
      journeyMapping: {
        awareness: 'Social proof title with 5-star rating visual.',
        interest: 'Highlights genuine customer satisfaction & care.',
        consideration: 'Low-risk free consultation incentive.',
        trust: 'Overwhelming social proof & local member reviews.',
        action: 'Simple non-friction Learn More CTA.'
      }
    },
    {
      id: `c-var-c-${Date.now()}`,
      type: 'Variant C (Local-focused)',
      hook: `📍 Calling all ${loc} residents! Looking for the best local spot?`,
      primaryText: `Conveniently located in the heart of ${loc}, ${bName} is your go-to destination. Easy access, flexible timings, and warm friendly atmosphere.`,
      headline: `Your Local Favorite in ${loc}`,
      offer: off,
      cta: cta,
      creativeConcept: 'Clean map pin visual with neighborhood landmarks and warm welcoming team photo.',
      status: 'pending',
      journeyMapping: {
        awareness: 'Hyper-local geographic callout mentioning exact neighborhood.',
        interest: 'Emphasizes convenience and proximity.',
        consideration: 'Special local resident introductory offer.',
        trust: 'Familiar local landmarks establishing physical presence.',
        action: 'Action button directing locals to visit or book.'
      }
    }
  ];

  // Upload to Meta Sandbox
  variants.forEach(v => {
    const res = MetaAdsSandbox.uploadCreative(profile.id, 'meta-draft-sandbox', v.id, v.hook);
    store.addToolLog(res.log);
  });

  store.addTrace({
    id: `tr-${Date.now()}`,
    timestamp: new Date().toLocaleTimeString(),
    agentName: 'Creative Agent',
    action: 'Generated 3 distinct ad copy & visual variants (Offer, Trust, Local)',
    toolExecuted: 'upload_creative()',
    resultSummary: 'Synthesized 3 variants and uploaded creative media to Sandbox.',
    nextStep: 'Awaiting Merchant Approval in Creative Studio'
  });

  return variants;
}

export function regenerateSingleVariant(
  variantType: 'Variant A (Offer-focused)' | 'Variant B (Trust-focused)' | 'Variant C (Local-focused)',
  profile: MerchantProfile,
  feedback?: string
): AdVariant {
  const bName = profile.businessName || 'Your Business';
  const loc = profile.locality ? `${profile.locality}, ${profile.city}` : profile.city || profile.location || 'your area';
  const off = profile.offer || 'Exclusive Offer';

  const newVariant: AdVariant = {
    id: `c-var-regen-${Date.now()}`,
    type: variantType,
    hook: feedback ? `✨ Updated: ${feedback.slice(0, 30)}...` : `🎉 Brand New Fresh Angle for ${bName} in ${loc}!`,
    primaryText: `We updated our offer based on your preference! Enjoy ${off} with guaranteed satisfaction at ${bName}, ${loc}.`,
    headline: `Special ${off} for ${loc}`,
    offer: off,
    cta: 'Claim Offer Now',
    creativeConcept: 'Refined modern visual layout tailored specifically to merchant feedback.',
    status: 'pending',
    journeyMapping: {
      awareness: 'Fresh customized headline.',
      interest: 'Refined service explanation.',
      consideration: 'Tailored exclusive offer.',
      trust: 'Guaranteed satisfaction seal.',
      action: 'Direct claim button.'
    }
  };

  store.addTrace({
    id: `tr-${Date.now()}`,
    timestamp: new Date().toLocaleTimeString(),
    agentName: 'Creative Agent',
    action: `Regenerated ${variantType} based on feedback: "${feedback || 'None'}"`,
    toolExecuted: 'upload_creative()',
    resultSummary: 'New variant ready for review.',
    nextStep: 'Awaiting Merchant Approval'
  });

  return newVariant;
}
