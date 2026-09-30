import { ChannelConnectionStatus, ToolCallLog } from '../types';

export class MetaAdsSandbox {
  static checkFacebookConnection(merchantId: string, channels: ChannelConnectionStatus): { connected: boolean; accountName?: string; log: ToolCallLog } {
    const isConnected = channels.facebookConnected;
    const log: ToolCallLog = {
      id: `tool-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toLocaleTimeString(),
      merchantId,
      agentName: 'Saathi Support Agent',
      toolName: 'check_facebook_connection()',
      args: { merchantId },
      result: {
        pageConnected: isConnected,
        pageName: channels.facebookAccountName || 'Official Page',
        adAccountPermission: channels.adAccountPermissionGranted ? 'GRANTED' : 'PENDING'
      },
      status: 'success'
    };
    return { connected: isConnected, accountName: channels.facebookAccountName, log };
  }

  static checkWhatsAppConnection(merchantId: string, channels: ChannelConnectionStatus): { verified: boolean; number?: string; log: ToolCallLog } {
    const isVerified = channels.whatsAppVerified;
    const log: ToolCallLog = {
      id: `tool-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toLocaleTimeString(),
      merchantId,
      agentName: 'Saathi Support Agent',
      toolName: 'check_whatsapp_connection()',
      args: { merchantId },
      result: { verified: isVerified, number: channels.whatsAppPhoneNumber || '+91 98765 43210' },
      status: 'success'
    };
    return { verified: isVerified, number: channels.whatsAppPhoneNumber, log };
  }

  static connectFacebook(merchantId: string, pageName: string): { success: boolean; accountName: string; log: ToolCallLog } {
    const accountName = `${pageName} Official Page`;
    const log: ToolCallLog = {
      id: `tool-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toLocaleTimeString(),
      merchantId,
      agentName: 'Channel Connection Tool',
      toolName: 'connect_facebook()',
      args: { merchantId, pageName },
      result: { success: true, accountName, status: 'CONNECTED_SANDBOX' },
      status: 'success'
    };
    return { success: true, accountName, log };
  }

  static connectInstagram(merchantId: string, handle: string): { success: boolean; handle: string; log: ToolCallLog } {
    const formattedHandle = handle.startsWith('@') ? handle : `@${handle}`;
    const log: ToolCallLog = {
      id: `tool-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toLocaleTimeString(),
      merchantId,
      agentName: 'Channel Connection Tool',
      toolName: 'connect_instagram()',
      args: { merchantId, handle: formattedHandle },
      result: { success: true, handle: formattedHandle, status: 'CONNECTED_SANDBOX' },
      status: 'success'
    };
    return { success: true, handle: formattedHandle, log };
  }

  static createCampaignDraft(merchantId: string, objective: string, name: string): { campaignId: string; log: ToolCallLog } {
    const campaignId = `meta-draft-${Math.floor(10000 + Math.random() * 90000)}`;
    const log: ToolCallLog = {
      id: `tool-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toLocaleTimeString(),
      merchantId,
      agentName: 'Campaign Strategy Agent',
      toolName: 'create_campaign_draft()',
      args: { merchantId, objective, campaignName: name },
      result: { draftId: campaignId, status: 'DRAFT_CREATED' },
      status: 'success'
    };
    return { campaignId, log };
  }

  static uploadCreative(merchantId: string, campaignId: string, creativeId: string, hookText: string): { mediaId: string; log: ToolCallLog } {
    const mediaId = `meta-media-${Math.floor(1000 + Math.random() * 9000)}`;
    const log: ToolCallLog = {
      id: `tool-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toLocaleTimeString(),
      merchantId,
      agentName: 'Creative Agent',
      toolName: 'upload_creative()',
      args: { merchantId, campaignId, creativeId, snippet: hookText },
      result: { mediaId, status: 'CREATIVE_UPLOADED_SANDBOX' },
      status: 'success'
    };
    return { mediaId, log };
  }

  static setTargeting(merchantId: string, campaignId: string, location: string, radius: string): { log: ToolCallLog } {
    const log: ToolCallLog = {
      id: `tool-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toLocaleTimeString(),
      merchantId,
      agentName: 'Campaign Strategy Agent',
      toolName: 'set_targeting()',
      args: { merchantId, campaignId, location, radius },
      result: { targetingApplied: true, status: 'TARGETING_CONFIGURED' },
      status: 'success'
    };
    return { log };
  }

  static setBudget(merchantId: string, campaignId: string, budget: string): { success: boolean; error?: string; log: ToolCallLog } {
    const num = parseInt(budget.replace(/[^0-9]/g, ''), 10);
    const isValid = !isNaN(num) && num >= 500;
    
    const log: ToolCallLog = {
      id: `tool-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toLocaleTimeString(),
      merchantId,
      agentName: 'Campaign Strategy Agent',
      toolName: 'set_budget()',
      args: { merchantId, campaignId, requestedBudget: budget },
      result: isValid
        ? { success: true, dailyBudget: `₹${Math.round(num / 10)}`, totalBudget: `₹${num}` }
        : { success: false, error: 'Budget below minimum requirement (₹500)' },
      status: isValid ? 'success' : 'failed'
    };

    return { success: isValid, error: isValid ? undefined : 'Budget below minimum requirement of ₹500', log };
  }

  static publishCampaign(merchantId: string, campaignId: string): { success: boolean; liveId: string; log: ToolCallLog } {
    const liveId = `act-${Math.floor(1000000 + Math.random() * 9000000)}`;
    const log: ToolCallLog = {
      id: `tool-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toLocaleTimeString(),
      merchantId,
      agentName: 'Campaign Activation Engine',
      toolName: 'publish_campaign()',
      args: { merchantId, campaignId },
      result: { success: true, activeCampaignId: liveId, deliveryStatus: 'ACTIVE_DELIVERING' },
      status: 'success'
    };
    return { success: true, liveId, log };
  }
}
