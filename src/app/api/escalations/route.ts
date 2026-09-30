import { NextResponse } from 'next/server';
import { store } from '@/lib/db/store';

export async function GET() {
  return NextResponse.json({ escalations: store.getEscalations() });
}

export async function POST(req: Request) {
  try {
    const { ticketId, status } = await req.json();
    if (ticketId && status) {
      store.updateEscalationStatus(ticketId, status);
      return NextResponse.json({ escalations: store.getEscalations() });
    }
    return NextResponse.json({ error: 'Missing ticketId or status' }, { status: 400 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
