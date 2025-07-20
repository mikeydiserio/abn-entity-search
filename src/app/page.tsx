'use client'
import { createClient } from '@supabase/supabase-js'
import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'
// Assuming your components are correctly imported
import { DetailModal } from '../components/DetailModal/DetailModal'
import EmptyState from '../components/EmptyState/EmptyState'
import FilterPanel from '../components/FilterPanel'
import Header from '../components/Header/Header'
import { LoadingSpinner } from '../components/Loading'
import ResultsPanel from '../components/ResultsPanel'
import type { FilterState, SearchResult } from '../types'

export const ResultsAndFilters = styled.div`
  display: flex;
  margin-top: 60px;
  align-items: flex-start;
`

export const PageContainer = styled.div`
  display: block;
  margin: 0 auto;
  width: 100%;
  max-width: 1080px;
`

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)

// The custom useDebounce hook remains the same
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])
  return debouncedValue
}

const PAGE_SIZE = 20

async function fetchEntityData(
  searchTerm: string = '',
  page: number = 1,
  filters?: Partial<FilterState>,
) {
  try {
    const { data, error } = await supabase.rpc('search_entities', {
      search_term: searchTerm,
      page_number: page,
      page_size: PAGE_SIZE,
    })

    if (error) {
      console.error('Supabase RPC Error:', error)
      return {
        data: [],
        totalCount: 0,
        error: error.message,
      }
    }

    // Assuming the first row contains the total count
    const totalCount = data?.[0]?.total_count || 0

    return {
      data: data || [],
      totalCount,
      error: null,
    }
  } catch (error) {
    console.error('Fetch error:', error)
    return {
      data: [],
      totalCount: 0,
      error:
        error instanceof Error ? error.message : 'An unknown error occurred',
    }
  }
}
export default function HomePage() {
  const [filters, setFilters] = useState<FilterState>({
    states: [],
    industries: [],
    employeeSizes: [],
    revenueBands: [],
    activeOnly: false,
    gstRegistered: false,
  })
  const [query, setQuery] = useState('Diserio')
  const [results, setResults] = useState<SearchResult[]>([])
  const [pageNo, setPageNo] = useState(0)
  const [hasMore, setHasMore] = useState(true)

  const [selectedResult, setSelectedResult] = useState<SearchResult | null>(
    null,
  )
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const debouncedQuery = useDebounce(query, 500)

  useEffect(() => {
    fetchEntityData(debouncedQuery, pageNo, filters)
  }, [])

  // This function is now memoized with useCallback to prevent re-creation on every render.
  const fetchData = useCallback(
    async (
      currentPage: number,
      currentFilters: FilterState,
      currentQuery: string,
    ) => {
      // A search query is required to fetch data
      if (currentQuery.length < 3) {
        setResults([])
        setHasMore(true) // Reset
        return
      }

      setIsLoading(true)
      setError(null)

      // Construct the query parameters to send to the backend API route
      const params = new URLSearchParams({
        q: currentQuery,
        page: currentPage.toString(),
      })
      if (currentFilters.activeOnly) params.append('activeOnly', 'true')
      if (currentFilters.gstRegistered) params.append('gstRegistered', 'true')
      if (currentFilters.states && currentFilters.states.length > 0)
        params.append('states', currentFilters.states.join(','))
      // Add other filters like industries here if your API supports them
      // if (currentFilters.industries && currentFilters.industries.length > 0)
      //   params.append('industries', currentFilters.industries.join(','))

      try {
        const response = await fetch(`/api/search?${params.toString()}`)
        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || 'Failed to fetch results.')
        }

        // Assumes API returns { data: SearchResult[], count: number }
        const { data, count } = await response.json()

        // If it's the first page, replace results. Otherwise, append them.
        setResults(prev => (currentPage === 0 ? data : [...prev, ...data]))
        // Check if there are more results to load
        setHasMore((currentPage + 1) * PAGE_SIZE < count)
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'An unknown error occurred.',
        )
      } finally {
        setIsLoading(false)
      }
    },
    [],
  )

  // This is the primary effect for fetching data.
  // It runs ONLY when the debounced query or filters change.
  useEffect(() => {
    setPageNo(0) // Reset to the first page
    setResults([]) // Clear old results
    fetchData(0, filters, debouncedQuery)
  }, [debouncedQuery, filters, fetchData])

  const handleLoadMore = () => {
    const nextPage = pageNo + 1
    setPageNo(nextPage)
    fetchData(nextPage, filters, debouncedQuery)
  }

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  const handleResultClick = (result: SearchResult) => {
    setSelectedResult(result)
  }

  return (
    <PageContainer>
      {/* FIX: Pass the real-time 'query' to the Header for responsive input */}
      <Header searchTerm={query} setSearchTerm={setQuery} />
      <main>
        <ResultsAndFilters>
          <ResultsPanel
            handleResultClick={handleResultClick}
            results={results}
          />
          <FilterPanel
            filters={filters}
            // FIX: Removed redundant 'setFilters' prop. 'onFilterChange' is sufficient.
            onFilterChange={handleFilterChange}
            onApplyFilters={() => {}} // Filters apply automatically
            onResetFilters={() =>
              setFilters({
                industries: [],
                employeeSizes: [],
                revenueBands: [],
                states: [], // Reset to empty array, not stateOptions
                gstRegistered: false,
                activeOnly: false,
              })
            }
          />
        </ResultsAndFilters>

        {error && (
          <div className="error-container">
            <p>Error: {error}</p>
            <button onClick={() => fetchData(pageNo, filters, debouncedQuery)}>
              Try Again
            </button>
          </div>
        )}

        {/* FIX: Show EmptyState only if there's a valid search term */}
        {!isLoading &&
          !error &&
          results.length === 0 &&
          debouncedQuery.length >= 3 && (
            <EmptyState
              title="No entities found"
              description="Try adjusting your search terms or filters"
            />
          )}

        {isLoading && (
          <div className="loading-more">
            <LoadingSpinner size="small" message="Loading..." />
          </div>
        )}

        {hasMore && !isLoading && results.length > 0 && (
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <button onClick={handleLoadMore}>Load More</button>
          </div>
        )}

        {selectedResult && (
          <DetailModal
            // FIX: Assuming DetailModal takes a 'result' prop
            result={selectedResult}
            onClose={() => setSelectedResult(null)}
          />
        )}
      </main>
    </PageContainer>
  )
}
