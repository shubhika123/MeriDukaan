import { NextResponse } from 'next/server';
import { generateCreativeVariants, regenerateSingleVariant } from '@/lib/ai/agents/creativeAgent';
import { store } from '@/lib/db/store';

export async function POST(req: Request) {
  try {
    const { merchantId, action, variantType, feedback } = await req.json();
    const merchant = store.getMerchant(merchantId);
    if (!merchant) return NextResponse.json({ error: 'Merchant not found' }, { status: 404 });

    if (!merchant.campaignStrategy) {
      return NextResponse.json({ error: 'Campaign strategy must be generated first' }, { status: 400 });
    }

    if (action === 'regenerate_single') {
      const newVar = regenerateSingleVariant(variantType, merchant.profile, feedback);
      merchant.creatives = merchant.creatives.map(c => c.type === variantType ? newVar : c);
      store.updateMerchant(merchant);
      return NextResponse.json({ creatives: merchant.creatives, merchant });
    }

    const variants = generateCreativeVariants(merchant.profile, merchant.campaignStrategy);
    merchant.creatives = variants;
    merchant.stage = 'CREATIVE_APPROVAL';
    store.updateMerchant(merchant);

    return NextResponse.json({ creatives: variants, merchant });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
