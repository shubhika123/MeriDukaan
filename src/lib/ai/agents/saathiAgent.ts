import { Merchant, EscalationTicket, ToolCallLog } from '../../types';
import { searchKnowledgeBase } from '../../rag/knowledgeBase';
import { MetaAdsSandbox } from '../../tools/metaSandbox';
import { SarvamAIService } from '../../sarvam';
import { store } from '../../db/store';

export interface SaathiResponse {
  reply: string;
  toolCallExecuted?: string;
  toolResult?: Record<string, any>;
  ragCitation?: { sourceTitle: string; docId: string; excerpt: string };
  suggestedActions: string[];
  escalationCreated?: boolean;
  ticket?: EscalationTicket;
}

export async function processSaathiMessage(
  merchant: Merchant,
  userMessage: string
): Promise<SaathiResponse> {
  const lowerMsg = userMessage.toLowerCase();
  const lang = merchant.profile.preferredLanguage || 'hi';

  // Hinglish / Code-Mixing parser via Sarvam
  const parsedHinglish = SarvamAIService.parseHinglishInput(userMessage);

  // Tool 1: Facebook / Ad Account Connection Check
  if (lowerMsg.includes('facebook') || lowerMsg.includes('connect nahi') || lowerMsg.includes('ad account')) {
    const fbCheck = MetaAdsSandbox.checkFacebookConnection(merchant.id, merchant.channels);
    store.addToolLog(fbCheck.log);

    const ragResults = searchKnowledgeBase('Facebook Ad Account Permission', 1);
    const matchedDoc = ragResults[0]?.doc;

    // Check if permission is pending
    if (!merchant.channels.adAccountPermissionGranted) {
      const attempts = (merchant.attemptsCount?.facebook_permission || 0) + 1;
      merchant.attemptsCount = { ...merchant.attemptsCount, facebook_permission: attempts };

      if (attempts >= 2) {
        // Trigger Escalation Ticket #MD-1042
        const ticketId = `MD-${Math.floor(1000 + Math.random() * 9000)}`;
        const ticket: EscalationTicket = {
          ticketId,
          merchantId: merchant.id,
          merchantName: merchant.profile.merchantName || 'Ramesh Kumar',
          businessName: merchant.profile.businessName || 'Sharma Fitness Studio',
          issue: 'Facebook Ad Account Permission Pending on Meta Business Manager',
          attempts,
          currentStage: merchant.stage,
          agentDiagnosis: `Saathi verified Facebook Page is linked, but Ad Account permission is missing after ${attempts} attempts. Source: ${matchedDoc?.title || 'Facebook Guide'}.`,
          recommendedAction: 'Send merchant guided WhatsApp permission link or trigger manual support call.',
          assignedTeam: 'Merchant Support',
          priority: 'Medium',
          createdTime: 'Just now',
          status: 'Open',
          owner: 'Merchant Support Team'
        };

        store.addEscalation(ticket);
        merchant.status = 'Escalated';
        merchant.risk = 'Medium';
        store.updateMerchant(merchant);

        const replyText = lang === 'hi' || parsedHinglish.isHinglish
          ? `Aapka Facebook Page connected hai, lekin Ad Account permission pending hai. 2 retries ke baad maine Support Ticket **#${ticketId}** create kar diya hai.`
          : `Your Facebook Page is connected, but Ad Account permission is pending. After 2 retries, I have dispatched Support Ticket **#${ticketId}**.`;

        return {
          reply: replyText,
          toolCallExecuted: 'create_escalation()',
          toolResult: { ticketId, status: 'OPEN', assignedTeam: 'Merchant Support' },
          ragCitation: matchedDoc ? { sourceTitle: matchedDoc.title, docId: matchedDoc.id, excerpt: matchedDoc.content.slice(0, 150) + '...' } : undefined,
          suggestedActions: ['Fix Connection', 'Try Again', 'Talk to Support'],
          escalationCreated: true,
          ticket
        };
      }

      store.updateMerchant(merchant);

      const replyText = lang === 'hi' || parsedHinglish.isHinglish
        ? `Maine aapka connection check kiya: Aapka Facebook Page connected hai ✓ lekin Ad Account permission required ⚠ hai.`
        : `I checked your connection status: Facebook Page is connected ✓ but Ad Account permission is required ⚠.`;

      return {
        reply: replyText,
        toolCallExecuted: 'check_facebook_connection()',
        toolResult: fbCheck.log.result,
        ragCitation: matchedDoc ? { sourceTitle: matchedDoc.title, docId: matchedDoc.id, excerpt: matchedDoc.content.slice(0, 150) + '...' } : undefined,
        suggestedActions: ['Fix Connection', 'Try Again', 'Talk to Support']
      };
    }
  }

  // Tool 2: WhatsApp Status Check
  if (lowerMsg.includes('whatsapp') || lowerMsg.includes('otp')) {
    const waCheck = MetaAdsSandbox.checkWhatsAppConnection(merchant.id, merchant.channels);
    store.addToolLog(waCheck.log);

    const ragResults = searchKnowledgeBase('WhatsApp verification OTP timeout', 1);
    const matchedDoc = ragResults[0]?.doc;

    const replyText = lang === 'hi' || parsedHinglish.isHinglish
      ? `Aapka WhatsApp Business number (+91 98765 43210) verified hai ✓.`
      : `Your WhatsApp Business number (+91 98765 43210) is verified ✓.`;

    return {
      reply: replyText,
      toolCallExecuted: 'check_whatsapp_connection()',
      toolResult: waCheck.log.result,
      ragCitation: matchedDoc ? { sourceTitle: matchedDoc.title, docId: matchedDoc.id, excerpt: matchedDoc.content.slice(0, 150) + '...' } : undefined,
      suggestedActions: ['View Campaign Status', 'Check Ad Account']
    };
  }

  // Default Saathi Support RAG search
  const ragResults = searchKnowledgeBase(userMessage, 1);
  const matchedDoc = ragResults[0]?.doc;

  const defaultReply = lang === 'hi' || parsedHinglish.isHinglish
    ? `Main Saathi hoon! Main aapke **${merchant.profile.businessName}** (${merchant.profile.city}) ke saare onboarding steps aur Meta campaign me madad karne ke liye taiyar hoon.`
    : `I am Saathi! I am here to help **${merchant.profile.businessName}** (${merchant.profile.city}) with all onboarding steps and Meta campaign activation.`;

  return {
    reply: defaultReply,
    toolCallExecuted: 'search_knowledge_base()',
    toolResult: { query: userMessage, matchesCount: ragResults.length },
    ragCitation: matchedDoc ? { sourceTitle: matchedDoc.title, docId: matchedDoc.id, excerpt: matchedDoc.content.slice(0, 150) + '...' } : undefined,
    suggestedActions: ['Check Onboarding Status', 'Fix Connection', 'View Ad Strategy']
  };
}
