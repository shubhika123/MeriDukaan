import { NextResponse } from 'next/server';
import { generateCampaignStrategy } from '@/lib/ai/agents/campaignAgent';
import { store } from '@/lib/db/store';

export async function POST(req: Request) {
  try {
    const { merchantId } = await req.json();
    const merchant = store.getMerchant(merchantId);
    if (!merchant) return NextResponse.json({ error: 'Merchant not found' }, { status: 404 });

    const strategy = generateCampaignStrategy(merchant.profile);
    merchant.campaignStrategy = strategy;
    merchant.stage = 'CREATIVE_GENERATED';
    store.updateMerchant(merchant);

    return NextResponse.json({ strategy, merchant });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
