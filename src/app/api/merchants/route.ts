import { NextResponse } from 'next/server';
import { store } from '@/lib/db/store';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  
  if (id) {
    const merchant = store.getMerchant(id);
    if (!merchant) return NextResponse.json({ error: 'Merchant not found' }, { status: 404 });
    return NextResponse.json(merchant);
  }

  return NextResponse.json({
    merchants: store.getMerchants(),
    bottleneckReport: store.getBottleneckReport()
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (body.action === 'reset_demo') {
      store.resetDemoData();
      return NextResponse.json({ message: 'Demo dataset reset successfully', merchants: store.getMerchants() });
    }

    if (body.merchant) {
      store.updateMerchant(body.merchant);
      return NextResponse.json({ merchant: body.merchant });
    }

    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
