// app/api/search/route.ts

import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

// Initialize Supabase client (ensure env vars are set)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
)

const PAGE_SIZE = 20

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const searchTerm = searchParams.get('q')
  const page = parseInt(searchParams.get('page') || '0', 10)

  try {
    let data, error, count

    // FIX: This logic correctly decides which database function to call.
    // This avoids building the complex filter URL that causes the error.
    if (searchTerm && searchTerm.length >= 3) {
      // If there's a search term, call the search function.
      const rpcResponse = await supabase.rpc('search_entities', {
        search_term: searchTerm,
        page_number: page,
        page_size: PAGE_SIZE,
      })

      data = rpcResponse.data
      error = rpcResponse.error
      // Estimate the total count for pagination purposes during a search
      count =
        data && data.length === PAGE_SIZE
          ? (page + 2) * PAGE_SIZE
          : page * PAGE_SIZE + (data?.length || 0)
    } else {
      // If there's no search term, get a random set for the initial page load.
      const rpcResponse = await supabase.rpc('get_random_entities', {
        limit_count: 100,
      })

      data = rpcResponse.data
      error = rpcResponse.error
      count = data?.length || 0
    }

    if (error) {
      console.error('Supabase RPC error:', error)
      throw new Error(error.message)
    }

    return NextResponse.json({
      data: data || [],
      count,
    })
  } catch (err) {
    console.error('API Route Error:', err)
    return NextResponse.json(
      {
        error:
          err instanceof Error ? err.message : 'An unknown error occurred.',
      },
      { status: 500 },
    )
  }
}
