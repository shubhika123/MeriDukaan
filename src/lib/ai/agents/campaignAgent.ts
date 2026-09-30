import { MerchantProfile, CampaignStrategy } from '../../types';
import { MetaAdsSandbox } from '../../tools/metaSandbox';
import { store } from '../../db/store';

export function generateCampaignStrategy(profile: MerchantProfile): CampaignStrategy {
  const isFitness = profile.category?.toLowerCase().includes('fitness') || profile.businessName?.toLowerCase().includes('gym');
  const isFood = profile.category?.toLowerCase().includes('food') || profile.category?.toLowerCase().includes('sweets') || profile.category?.toLowerCase().includes('cafe');

  let objective = profile.campaignObjective || (isFitness ? 'Lead Generation' : isFood ? 'Traffic / Messaging' : 'Local Awareness');
  let audience = profile.targetAudience || (isFitness ? 'Fitness enthusiasts & office workers (20-45 yrs)' : 'Local foodies & families within 5km');
  const locStr = profile.locality ? `${profile.locality}, ${profile.city}` : profile.city || profile.location || 'Local Area';
  let locationTargeting = `${locStr} (+ ${profile.targetRadius || '5km'} radius targeting)`;
  let budget = profile.budget || '₹5,000';
  let duration = '10 Days';
  let offer = profile.offer || (isFitness ? '3-Day Free VIP Pass' : '15% Off First Purchase');
  let cta = isFitness ? 'Book Free Trial' : isFood ? 'Order on WhatsApp' : 'Claim Offer';

  let strategyExplanation = `We recommend a high-intent **${objective}** campaign targeted at **${audience}** in **${locationTargeting}**. With a total budget of **${budget}** over **${duration}**, this strategy leverages the strong compelling offer of **"${offer}"** with a clear CTA button (**${cta}**) to maximize conversions.`;

  // Execute Tool Calls in Sandbox
  const draftRes = MetaAdsSandbox.createCampaignDraft(profile.id, objective, `${profile.businessName || 'SMB'} Campaign`);
  store.addToolLog(draftRes.log);

  const targetingRes = MetaAdsSandbox.setTargeting(profile.id, draftRes.campaignId, locationTargeting, audience);
  store.addToolLog(targetingRes.log);

  const budgetRes = MetaAdsSandbox.setBudget(profile.id, draftRes.campaignId, budget);
  store.addToolLog(budgetRes.log);

  store.addTrace({
    id: `tr-${Date.now()}`,
    timestamp: new Date().toLocaleTimeString(),
    agentName: 'Campaign Strategy Agent',
    action: 'Formulated tailored campaign strategy and set parameters in Meta Sandbox',
    toolExecuted: 'create_campaign_draft()',
    resultSummary: `Draft ID: ${draftRes.campaignId}, Objective: ${objective}, Budget: ${budget}.`,
    nextStep: 'Handoff to Creative Agent for ad variant generation'
  });

  return {
    objective,
    audience,
    locationTargeting,
    budget,
    duration,
    offer,
    cta,
    strategyExplanation
  };
}
