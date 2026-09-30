import { NextResponse } from 'next/server';
import { SarvamAIService } from '@/lib/sarvam';
import { IndianLanguage } from '@/lib/types';

export async function POST(req: Request) {
  try {
    const { text, targetLanguage = 'hi' } = await req.json();

    if (!text) {
      return NextResponse.json({ error: 'Text is required for TTS' }, { status: 400 });
    }

    const result = await SarvamAIService.textToSpeech(text, targetLanguage as IndianLanguage);

    return NextResponse.json({
      success: true,
      audioUrl: result.audioUrl,
      durationMs: result.durationMs
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'TTS generation failed' }, { status: 500 });
  }
}
