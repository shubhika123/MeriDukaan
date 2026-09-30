import { NextResponse } from 'next/server';
import { SarvamAIService } from '@/lib/sarvam';
import { IndianLanguage } from '@/lib/types';

export async function POST(req: Request) {
  try {
    const { audioData, languageCode = 'hi' } = await req.json();

    if (!audioData) {
      return NextResponse.json({ error: 'Audio data (base64 string) is required' }, { status: 400 });
    }

    const result = await SarvamAIService.speechToText(audioData, languageCode as IndianLanguage);

    return NextResponse.json({
      success: true,
      transcript: result.transcript,
      confidence: result.confidence
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Speech-to-text failed' }, { status: 500 });
  }
}
