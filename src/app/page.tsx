/* eslint-disable no-console */
'use client'
import { CompanyDetailModal } from '@/components/CompanyDetailModal/CompanyDetailModal'
import EmptyState from '@/components/EmptyState/EmptyState'
import FilterPanel from '@/components/FilterPanel'
import Header from '@/components/Header/Header'
import { LoadingSpinner } from '@/components/Loading'
import ResultsPanel from '@/components/ResultsPanel'
import { stateOptions } from '@/mocks/content'
import type { CompanyEntity, FilterState } from '@/types'
import { useCallback, useEffect, useState } from 'react'
import styled from 'styled-components'

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

async function fetchEntityData(
  searchTerm: string = '',
  page: number = 1,
  filters?: Partial<FilterState>,
) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

  console.log('Fetching data with:', { searchTerm, page, filters })
  // Create an abort controller with a reasonable timeout
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), 10000)

  if (
    !supabaseUrl ||
    !supabaseKey ||
    supabaseUrl.includes('<') ||
    supabaseKey.includes('<')
  ) {
    console.warn(
      'Supabase URL and Key are not set. Please replace the placeholder values.',
    )
    return { data: [], error: 'Supabase configuration not found' }
  }

  try {
    let selectQuery = `
  id,
  legal_name,
  abn,
  business_names:id,
  business_names:name,
  entity_types:code,
  locations:state
`

    let url = `${supabaseUrl}/rest/v1/entities?select=${encodeURIComponent(
      selectQuery,
    )}`

    // Build filter parameters
    const filterParams: string[] = []
    if (searchTerm.trim()) {
      filterParams.push(
        `or=(legal_name.ilike.*${encodeURIComponent(
          searchTerm,
        )}*,abn.like.*${encodeURIComponent(searchTerm.replace(/\s/g, ''))}*)`,
      )
    }

    // Additional filters handling
    if (filters) {
      if (filters.industries && filters.industries.length > 0) {
        filterParams.push(
          `industry.in.(${filters.industries
            .map(encodeURIComponent)
            .join(',')})`,
        )
      }

      if (filters.states && filters.states.length > 0) {
        filterParams.push(
          `locations.state.in.(${filters.states
            .map(encodeURIComponent)
            .join(',')})`,
        )
      }

      if (filters.activeOnly) {
        filterParams.push(`abn_status.eq=${encodeURIComponent('active')}`)
      }
    }

    if (filterParams.length > 0) {
      url += `&${filterParams.join('&')}`
    }

    const response = await fetch(url, {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`, // Use actual user token if authenticated
        'Content-Type': 'application/json',
      },
    })

    // Check response status
    if (!response.ok) {
      const errorText = await response.text()
      console.error('Error details:', {
        status: response.status,
        statusText: response.statusText,
        errorText,
      })
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    return { data, error: null }
  } catch (error) {
    console.error('An error occurred during the fetch operation:', error)
    return {
      data: [],
      error:
        error instanceof Error ? error.message : 'An unknown error occurred',
    }
  }
}

export default function HomePage() {
  const [entities, setEntities] = useState<CompanyEntity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('')
  const [filters, setFilters] = useState<FilterState>({
    industries: [],
    employeeSizes: [],
    revenueBands: [],
    states: [],
    activeOnly: false,
    gstRegistered: false,
  })
  const [selectedCompany, setSelectedCompany] = useState<CompanyEntity | null>(
    null,
  )
  const [page, setPage] = useState(1)

  // Reusable data loading function
  const loadData = useCallback(
    async (
      searchQuery: string = '',
      pageNum: number = 1,
      resetData: boolean = true,
    ) => {
      if (resetData) {
        setLoading(true)
        setError(null)
      }

      try {
        const { data, error: fetchError } = await fetchEntityData(
          searchQuery,
          pageNum,
          filters,
        )

        if (fetchError) {
          setError(fetchError)
          setEntities([])
        } else {
          setEntities(resetData ? data : prev => [...prev, ...data])
          setError(null)
        }
      } catch (err: any) {
        setError(err.message || 'An unknown error occurred')
        setEntities([])
      } finally {
        setLoading(false)
      }
    },
    [filters],
  )

  useEffect(() => {
    loadData('', 1, true)
  }, [])

  // Load data when search term changes
  useEffect(() => {
    if (debouncedSearchTerm !== searchTerm) return // Only run when debounce is complete
    loadData(debouncedSearchTerm, 1, true)
  }, [debouncedSearchTerm, loadData])

  // Load data when filters change
  useEffect(() => {
    loadData(debouncedSearchTerm, 1, true)
  }, [filters, loadData])

  const handleResultClick = (company: CompanyEntity) => {
    setSelectedCompany(company)
  }

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
  }

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  return (
    <PageContainer>
      <Header searchTerm={searchTerm} setSearchTerm={handleSearchChange} />
      <main>
        <ResultsAndFilters>
          <ResultsPanel
            handleResultClick={handleResultClick}
            entities={entities}
          />
          <FilterPanel
            filters={filters}
            setFilters={(name, value) =>
              setFilters(prev => ({
                ...prev,
                [name]: value,
              }))
            }
            onFilterChange={handleFilterChange}
            onApplyFilters={() => {}} // Filters apply automatically
            onResetFilters={() =>
              setFilters({
                industries: [],
                employeeSizes: [],
                revenueBands: [],
                states: stateOptions,
                gstRegistered: false,
                activeOnly: false,
              })
            }
          />
        </ResultsAndFilters>

        {error && (
          <div className="error-container">
            <p>Error: {error}</p>
            <button onClick={() => loadData(debouncedSearchTerm, 1, true)}>
              Try Again
            </button>
          </div>
        )}

        {!loading && !error && entities.length === 0 && (
          <EmptyState
            title="No entities found"
            description="Try adjusting your search terms or filters"
          />
        )}

        {loading && (
          <div className="loading-more">
            <LoadingSpinner size="small" message="Loading more..." />
          </div>
        )}

        {selectedCompany && (
          <CompanyDetailModal
            company={selectedCompany}
            details={selectedCompany}
            onClose={() => setSelectedCompany(null)}
          />
        )}
      </main>
    </PageContainer>
  )
}
