import { Merchant, EscalationTicket } from '../../types';
import { searchKnowledgeBase } from '../../rag/knowledgeBase';
import { store } from '../../db/store';
import { MetaAdsSandbox } from '../../tools/metaSandbox';

export interface TroubleshootingResult {
  diagnosedProblem: string;
  ragCitation: { docTitle: string; docId: string; excerpt: string };
  recommendedFix: string;
  actionTaken: string;
  resolved: boolean;
  escalationTicket?: EscalationTicket;
}

export function diagnoseAndTroubleshoot(
  merchant: Merchant,
  issueDescription?: string
): TroubleshootingResult {
  const attempts = (merchant.attemptsCount?.whatsapp || 0) + (merchant.attemptsCount?.budget_validation || 0) + 1;
  const currentAttempts = merchant.attemptsCount || {};

  let targetQuery = issueDescription || merchant.channels.lastErrorMessage || 'WhatsApp verification pending';
  if (merchant.status === 'Blocked' && merchant.stage === 'CAMPAIGN_DRAFT') {
    targetQuery = 'Budget validation failure minimum daily budget limit';
  }

  // Perform RAG Knowledge Search
  const ragResults = searchKnowledgeBase(targetQuery, 1);
  const matchedDoc = ragResults[0]?.doc || {
    id: 'kb-troubleshooting-faq',
    title: 'Common Onboarding Issues & Recommended Fixes',
    category: 'Troubleshooting' as const,
    tags: [],
    content: 'Check connection parameters and verify admin permissions before retrying verification.'
  };

  const ragCitation = {
    docTitle: matchedDoc.title,
    docId: matchedDoc.id,
    excerpt: matchedDoc.content.slice(0, 180) + '...'
  };

  // Determine issue type and diagnosis
  let problem = 'WhatsApp Business OTP Verification Delay';
  let fix = 'Allow 60 seconds and trigger OTP resend.';
  let action = 'Invoked verify_whatsapp_otp() retry in Sandbox.';

  if (targetQuery.toLowerCase().includes('budget')) {
    problem = 'Campaign Budget Below Sandbox Minimum Threshold (₹500)';
    fix = 'Upgrade daily budget to ₹500/day to satisfy Meta Sandbox delivery requirements.';
    action = 'Prompted merchant to confirm budget adjustment.';
  } else if (targetQuery.toLowerCase().includes('facebook') || targetQuery.toLowerCase().includes('instagram')) {
    problem = 'Channel Connection OAuth Authorization Error';
    fix = 'Re-authenticate Facebook Page Admin credentials.';
    action = 'Generated OAuth re-authorization link.';
  }

  // Determine if resolution or escalation needed
  const shouldEscalate = attempts >= 3 || merchant.status === 'Escalated';

  let ticket: EscalationTicket | undefined = undefined;

  if (shouldEscalate) {
    const ticketId = `ESC-${Math.floor(1000 + Math.random() * 9000)}`;
    ticket = {
      ticketId,
      merchantId: merchant.id,
      merchantName: merchant.profile.merchantName,
      businessName: merchant.profile.businessName,
      issue: problem,
      attempts,
      currentStage: merchant.stage,
      agentDiagnosis: `Automated resolution failed after ${attempts} attempts. Diagnosis: ${problem}. RAG reference: ${matchedDoc.title} (${matchedDoc.id}).`,
      recommendedAction: fix,
      assignedTeam: targetQuery.includes('budget') ? 'Billing Team' : 'Technical Support',
      priority: attempts > 3 ? 'High' : 'Medium',
      createdTime: 'Just now',
      status: 'Open'
    };

    store.addEscalation(ticket);
    merchant.status = 'Escalated';
    merchant.risk = 'High';
    store.updateMerchant(merchant);

    store.addTrace({
      id: `tr-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString(),
      agentName: 'Troubleshooting Agent',
      action: `Diagnosed persistent issue: "${problem}". Triggered Human Escalation Ticket ${ticketId}`,
      toolExecuted: `search_knowledge_base("${targetQuery.slice(0, 20)}")`,
      resultSummary: `Grounded in ${matchedDoc.title}. Ticket ${ticketId} dispatched to ${ticket.assignedTeam}.`,
      nextStep: 'Awaiting human operations team intervention'
    });
  } else {
    // Record retry attempt
    merchant.attemptsCount = { ...currentAttempts, whatsapp: attempts };
    store.updateMerchant(merchant);

    store.addTrace({
      id: `tr-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString(),
      agentName: 'Troubleshooting Agent',
      action: `Retried automated fix for "${problem}" (Attempt ${attempts}/3)`,
      toolExecuted: 'verify_whatsapp_otp()',
      resultSummary: `Retried OTP dispatch. Status: Pending. Grounded in ${matchedDoc.title}.`,
      nextStep: 'Check connection status after delay'
    });
  }

  return {
    diagnosedProblem: problem,
    ragCitation,
    recommendedFix: fix,
    actionTaken: action,
    resolved: !shouldEscalate,
    escalationTicket: ticket
  };
}
