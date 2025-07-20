import React from 'react'
import {
  employeeSizeOptions,
  industryOptions,
  revenueOptions,
  stateOptions,
} from '../../mocks/content'
import { FilterPanelProps } from '../../types'
import * as S from './FilterPanel.styles'

export const FilterPanel: React.FC<FilterPanelProps> = ({
  onApplyFilters,
  onResetFilters,
  filters,
  setFilters,
}) => {
  const handleCheckboxChange = (
    group: 'industries' | 'employeeSizes' | 'states' | 'revenueBands',
    value: string,
  ) => {
    if (!filters) {
      ;<span>no filters</span> // This should be: return <span>no filters</span>;
    }
    const currentValues = filters[group]
    const newValues = currentValues.includes(value)
      ? currentValues.filter(item => item !== value)
      : [...currentValues, value]
    setFilters(group, newValues)
  }

  if (!filters) {
    ;<span>no filters</span>
  }

  return (
    <S.Panel>
      <S.FilterHeading>Refine Results</S.FilterHeading>
      <S.FilterGroup>
        <S.FilterOptions>
          <S.FilterRow>
            <input
              type="checkbox"
              id="active-checkbox"
              checked={filters.activeOnly}
              onChange={e => setFilters('activeOnly', e.target.checked)}
            />
            <label htmlFor="active-checkbox">Active entities only</label>
          </S.FilterRow>
          <S.FilterRow>
            <input
              type="checkbox"
              id="gst-checkbox"
              checked={filters.gstRegistered}
              onChange={e => setFilters('gstRegistered', e.target.checked)}
            />
            <label htmlFor="gst-checkbox">Registered for GST</label>
          </S.FilterRow>
        </S.FilterOptions>
      </S.FilterGroup>

      <S.FilterGroup>
        <S.FilterTitle>
          <i className="fas fa-industry"></i> Industry
        </S.FilterTitle>
        <S.FilterOptions>
          {industryOptions.map(opt => (
            <S.FilterRow key={opt}>
              <input
                type="checkbox"
                id={`ind-${opt}`}
                checked={filters.industries.includes(opt)}
                onChange={() => handleCheckboxChange('industries', opt)}
              />
              <label htmlFor={`ind-${opt}`}>{opt}</label>
            </S.FilterRow>
          ))}
        </S.FilterOptions>
      </S.FilterGroup>
      <S.FilterGroup>
        <S.FilterTitle>
          <i className="fas fa-industry"></i> Revenue band
        </S.FilterTitle>
        <S.FilterOptions>
          {revenueOptions.map(opt => (
            <S.FilterRow key={opt}>
              <input
                type="checkbox"
                id={`rev-${opt}`}
                checked={filters.revenueBands.includes(opt)}
                onChange={() => handleCheckboxChange('revenueBands', opt)}
              />
              <label htmlFor={`rev-${opt}`}>{opt}</label>
            </S.FilterRow>
          ))}
        </S.FilterOptions>
      </S.FilterGroup>
      <S.FilterGroup>
        <S.FilterTitle>
          <i /> States
        </S.FilterTitle>
        <S.FilterOptions>
          {stateOptions.map(opt => (
            <S.FilterRow key={opt}>
              <input
                type="checkbox"
                id={`state-${opt}`}
                checked={filters.states.includes(opt)}
                onChange={() => handleCheckboxChange('states', opt)}
              />
              <label htmlFor={`state-${opt}`}>{opt}</label>
            </S.FilterRow>
          ))}
        </S.FilterOptions>
      </S.FilterGroup>

      <S.FilterGroup>
        <S.FilterTitle>
          <i /> Employee size
        </S.FilterTitle>
        <S.FilterOptions>
          {employeeSizeOptions.map(opt => (
            <S.FilterRow key={opt}>
              <input
                type="checkbox"
                id={`empsiz-${opt}`}
                checked={filters.employeeSizes.includes(opt)}
                onChange={() => handleCheckboxChange('employeeSizes', opt)}
              />
              <label htmlFor={`empsiz-${opt}`}>{opt}</label>
            </S.FilterRow>
          ))}
        </S.FilterOptions>
      </S.FilterGroup>

      <S.ApplyButton
        onClick={onApplyFilters}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition mt-4"
      >
        Apply Filters
      </S.ApplyButton>
      <button
        onClick={onResetFilters}
        className="w-full text-indigo-600 py-2 px-4 rounded-md hover:bg-indigo-50 transition mt-2"
      >
        Reset
      </button>
    </S.Panel>
  )
}

export default FilterPanel
