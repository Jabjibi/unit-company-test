// src/app/api/docs/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { swaggerSpec } from '@/lib/swagger';

export async function GET(req: NextRequest) {
  return NextResponse.json(swaggerSpec);
}
