'use client'

import React from 'react'
import { Button } from '../ui'
import * as S from './EmptyState.styles'

interface EmptyStateProps {
  title?: string
  description?: string
  icon?: React.ReactNode
  action?: React.ReactNode
}

export const EmptyState = ({
  title = 'No results found',
  description = 'Try adjusting your search or filter criteria',
  icon,
  action,
}: EmptyStateProps) => {
  return (
    <S.Wrapper>
      {icon && <S.IconWrapper>{icon}</S.IconWrapper>}
      <S.Content>
        <S.Title>{title}</S.Title>
        <S.Description>{description}</S.Description>
        {action && <S.ActionWrapper>{action}</S.ActionWrapper>}
      </S.Content>
    </S.Wrapper>
  )
}

export const NoDataEmptyState = () => {
  return (
    <EmptyState
      title="No data available"
      description="Please check your connection and ensure the database contains data."
      icon={
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M9 12l2 2 4-4" />
          <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
        </svg>
      }
    />
  )
}

export const SearchEmptyState = ({
  onClearSearch,
}: {
  onClearSearch?: () => void
}) => {
  return (
    <EmptyState
      title="No companies found"
      description="We couldn't find any companies matching your search criteria. Try different keywords or clear your filters."
      icon={
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
      }
      action={
        onClearSearch && (
          <Button onClick={() => onClearSearch()}>Clear Search</Button>
        )
      }
    />
  )
}

export default EmptyState
