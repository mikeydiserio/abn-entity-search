// app/api/search/route.ts

import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import type { SearchResult } from '../../../types'

// Create a single, server-side Supabase client
// Note: The `service_role` key should be used ONLY on the server.
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
)

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const searchTerm = searchParams.get('q')

  if (!searchTerm || searchTerm.length < 3) {
    return NextResponse.json(
      { error: 'Search term must be at least 3 characters long.' },
      { status: 400 },
    )
  }

  const { data, error } = await supabase
    .from('entities')
    .select(
      `
      abn,
      abn_status,
      legal_name,
      business_names ( name ),
      entity_types ( description ),
      gst_status,
      gst_status_from_date,
      locations ( state, postcode )
    `,
    )
    .or(
      `abn.eq.${searchTerm},legal_name.ilike.%${searchTerm}%,business_names.name.ilike.%${searchTerm}%`,
    )
    .limit(20)

  if (error) {
    console.error('Supabase query error:', error)
    return NextResponse.json(
      { error: 'An error occurred while searching.' },
      { status: 500 },
    )
  }

  // The data from Supabase is nested. We need to flatten it to match our SearchResult type.
  const flattenedData: SearchResult[] = data.map((item: any) => ({
    abn: item.abn,
    abn_status: item.abn_status,
    legal_name: item.legal_name,
    business_name: item.business_names[0]?.name || null, // Get the first business name
    entity_type: item.entity_types.description,
    gst_status: item.gst_status,
    gst_status_from_date: item.gst_status_from_date,
    state: item.locations.state,
    postcode: item.locations.postcode,
  }))

  return NextResponse.json(flattenedData)
}
