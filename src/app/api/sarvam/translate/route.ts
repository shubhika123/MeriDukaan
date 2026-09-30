import { NextResponse } from 'next/server';
import { SarvamAIService } from '@/lib/sarvam';

export async function POST(req: Request) {
  try {
    const { text, targetLanguage = 'hi-IN', sourceLanguage = 'en-IN' } = await req.json();

    if (!text) {
      return NextResponse.json({ error: 'Text parameter is required' }, { status: 400 });
    }

    const res = await SarvamAIService.translate({
      input_text: text,
      source_language_code: sourceLanguage,
      target_language_code: targetLanguage
    });

    return NextResponse.json({
      success: true,
      translatedText: res.translated_text,
      sourceLanguage: res.source_language_detected || sourceLanguage,
      targetLanguage
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Translation failed' }, { status: 500 });
  }
}
