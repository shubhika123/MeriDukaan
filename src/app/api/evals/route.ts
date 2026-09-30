import { NextResponse } from 'next/server';
import { runEvaluationSuite } from '@/lib/evals/evalSuite';

export async function GET() {
  const evalData = runEvaluationSuite();
  return NextResponse.json(evalData);
}

export async function POST() {
  const evalData = runEvaluationSuite();
  return NextResponse.json(evalData);
}
