import { NextResponse } from 'next/server';
import { processSaathiMessage } from '@/lib/ai/agents/saathiAgent';
import { store } from '@/lib/db/store';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, merchantId, language = 'hi' } = body;

    if (!message) {
      return NextResponse.json({ error: 'Message field is required' }, { status: 400 });
    }

    const merchants = store.getMerchants();
    const merchant = merchants.find(m => m.id === merchantId) || merchants[0];

    const response = await processSaathiMessage(merchant, message);

    return NextResponse.json(response);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Saathi agent execution failed' }, { status: 500 });
  }
}
