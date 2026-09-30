import { NextResponse } from 'next/server';
import { diagnoseAndTroubleshoot } from '@/lib/ai/agents/troubleshootingAgent';
import { store } from '@/lib/db/store';

export async function POST(req: Request) {
  try {
    const { merchantId, issue } = await req.json();
    const merchant = store.getMerchant(merchantId);
    if (!merchant) return NextResponse.json({ error: 'Merchant not found' }, { status: 404 });

    const result = diagnoseAndTroubleshoot(merchant, issue);
    return NextResponse.json({ result, merchant });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
