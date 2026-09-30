import { NextResponse } from 'next/server';
import { analyzeOnboardingMessage } from '@/lib/ai/agents/onboardingAgent';
import { store } from '@/lib/db/store';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { merchantId, message } = body;

    const merchant = store.getMerchant(merchantId || 'm-glowfit');
    if (!merchant) {
      return NextResponse.json({ error: 'Merchant not found' }, { status: 404 });
    }

    const analysis = analyzeOnboardingMessage(message || '', merchant.profile);

    // Apply updates to merchant in store
    merchant.profile = { ...merchant.profile, ...analysis.updatedProfile };
    if (analysis.isComplete && merchant.stage === 'BUSINESS_DETAILS') {
      merchant.stage = 'CAMPAIGN_DRAFT';
      merchant.status = 'In Progress';
    }
    merchant.lastActivity = 'Just now';
    store.updateMerchant(merchant);

    return NextResponse.json({
      reply: analysis.nextQuestion,
      profile: merchant.profile,
      missingFields: analysis.missingFields,
      isComplete: analysis.isComplete,
      stage: merchant.stage,
      language: analysis.extractedLanguage,
      merchant
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Internal Server Error' }, { status: 500 });
  }
}
