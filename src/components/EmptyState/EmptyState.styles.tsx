'use client'

import styled from 'styled-components'

export interface EmptyStateProps {
  title?: string
  description?: string
  icon?: React.ReactNode
  action?: React.ReactNode
}

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  text-align: center;
  color: #555;
`

export const IconWrapper = styled.div`
  margin-bottom: 1rem;
  color: #999;
`

export const Content = styled.div`
  max-width: 400px;
`

export const Title = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`

export const Description = styled.p`
  margin-bottom: 1rem;
  color: #777;
`

export const ActionWrapper = styled.div`
  margin-top: 1rem;
`

export const ClearButton = styled.button`
  padding: 0.5rem 1rem;
  background: transparent;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: #f5f5f5;
  }
`
