import { NextResponse } from 'next/server'

import { runSeed } from '@/seed/runSeed'

export async function GET() {
  try {
    return NextResponse.json(await runSeed())
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}
