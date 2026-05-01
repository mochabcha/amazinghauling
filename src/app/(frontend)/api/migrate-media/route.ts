import { NextResponse } from 'next/server'

import { getPayloadClient } from '@/lib/payload'
import { migrateExistingMediaToS3 } from '@/lib/mediaMigration'

export async function POST() {
  try {
    const payload = await getPayloadClient()
    return NextResponse.json(await migrateExistingMediaToS3(payload))
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 })
  }
}
