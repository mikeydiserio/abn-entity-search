import { useEffect, useState } from 'react'
import { Select } from '../../components/ui'
import { sortOptions } from '../../mocks/content'
import type { SearchResult } from '../../types'
import { ResultItem } from './ResultItem'
import * as S from './ResultsPanel.styles'

interface ResultsPanel {
  results?: SearchResult[]
  handleResultClick: (result: SearchResult) => void
  error: any
  loading: boolean
}
const mockedlistitem = {
  name: 'asd',
  id: 1,
  abn: '',
  acn: '',
  industry: '',
  industryCode: '',
  employeeCount: 1,
  revenueBand: '',
  website: '',
  emailDomain: '',
  phone: '',
}
export const ResultsPanel = ({
  results,
  handleResultClick,
  loading,
  error,
}: ResultsPanel) => {
  const [sortOrder, setSortOrder] = useState('')
  const renderSkeletonLoading = () => {
    return <S.SkeletonLoading />
  }

  useEffect(() => {
    return
  }, [])

  return (
    <S.ResultsColumn>
      <S.ResultsContainer>
        <S.ResultsHeader>
          <S.ResultsTitle>
            {results?.length ? (
              <p>
                showing <span>{results?.length || 0}</span> results for
                'serchedTerm'
              </p>
            ) : (
              <p>Try searching for something</p>
            )}
          </S.ResultsTitle>

          <S.ResultsSort>
            <Select
              id="sortBy"
              name="sortBy"
              label="Sort By"
              options={sortOptions}
              value={sortOrder}
              onChange={e => setSortOrder(e.target.value)}
            />
          </S.ResultsSort>
        </S.ResultsHeader>
      </S.ResultsContainer>

      <S.ResultsList>
        {/* <ResultItem
          company={mockedlistitem}
          onClick={() => handleResultClick(mockedlistitem)}
        />
        <ResultItem
          company={mockedlistitem}
          onClick={() => handleResultClick(mockedlistitem)}
        />
        <ResultItem
          company={mockedlistitem}
          onClick={() => handleResultClick(mockedlistitem)}
        /> */}

        {results &&
          results?.length > 0 &&
          results?.map((result: SearchResult) => (
            <ResultItem
              key={result.abn}
              result={result}
              onClick={() => handleResultClick(result)}
            />
          ))}
      </S.ResultsList>
      {loading ? null : renderSkeletonLoading()}
      {error && <p>App has dun goofed it</p>}
    </S.ResultsColumn>
  )
}

export default ResultsPanel
