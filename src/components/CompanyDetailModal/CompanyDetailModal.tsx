'use client'
import React, { useEffect } from 'react'
import { BusinessName, SearchResult } from '../..//types'
import {
  formatABN,
  formatACN,
  formatDate,
  formatRevenueBand,
} from '../../utils/helpers'
import * as S from './CompanyDetailModal.styles'

interface CompanyDetailModalProps {
  details: any
  onClose: () => void
  result: SearchResult
}

export const CompanyDetailModal: React.FC<CompanyDetailModalProps> = ({
  result,
  onClose,
}) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleEsc)
    document.body.style.overflow = 'hidden'

    return () => {
      window.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = 'auto'
    }
  }, [onClose])

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <S.ModalOverlay onClick={handleOverlayClick}>
      <S.ModalContent>
        <S.ModalHeader>
          <h2>{result?.name}</h2>
          <S.ModalCloseButton onClick={onClose}>&times;</S.ModalCloseButton>
        </S.ModalHeader>
        <S.ModalBody>
          <S.DetailSection>
            <h3>result Information</h3>
            <S.DetailGrid>
              <S.DetailItem>
                <S.DetailLabel>Legal Name{result.legal_name}</S.DetailLabel>
                <S.DetailValue>result Name: {result.name}</S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailLabel>ABN</S.DetailLabel>
                <S.DetailValue>
                  {result.abn && formatABN(result.abn)}
                </S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailLabel>ACN</S.DetailLabel>
                <S.DetailValue>
                  {result.acn && formatACN(result.acn)}
                </S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailLabel>Industry</S.DetailLabel>
                <S.DetailValue>{result.industry}</S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailLabel>GST Status</S.DetailLabel>
                <S.DetailValue>
                  {result.gst_status} FROM DATE: {result.gst_status_from_date}
                </S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailLabel>ABN Status</S.DetailLabel>
                <S.DetailValue>{result.abn_status}</S.DetailValue>
              </S.DetailItem>
            </S.DetailGrid>
          </S.DetailSection>

          <S.DetailSection>
            <h3>Business Address</h3>
            <S.DetailGrid>
              <S.DetailItem>
                <S.DetailLabel>Street</S.DetailLabel>
                <S.DetailValue>{result.address.street}</S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailLabel>Suburb</S.DetailLabel>
                <S.DetailValue>{result.address.suburb}</S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailLabel>State</S.DetailLabel>
                <S.DetailValue>{result.address.state}</S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailLabel>Postcode</S.DetailLabel>
                <S.DetailValue>{result.address.postcode}</S.DetailValue>
              </S.DetailItem>
            </S.DetailGrid>
          </S.DetailSection>

          <S.DetailSection>
            <h3>Business Operations</h3>
            <S.DetailGrid>
              <S.DetailItem>
                <S.DetailLabel>Employee Count</S.DetailLabel>
                <S.DetailValue>
                  {result.employeeCount.toLocaleString()} employees
                </S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailLabel>Revenue Band</S.DetailLabel>
                <S.DetailValue>
                  {formatRevenueBand(result.revenueBand)}
                </S.DetailValue>
              </S.DetailItem>
            </S.DetailGrid>
          </S.DetailSection>

          <S.DetailSection>
            <h3>Business Names</h3>
            <S.BusinessNamesList>
              {result.business_names.map((bn: BusinessName) => (
                <S.BusinessNameItem key={bn.id}>
                  <strong>{bn.name}</strong> ({bn.type})
                </S.BusinessNameItem>
              ))}
            </S.BusinessNamesList>
          </S.DetailSection>

          <S.DetailSection>
            <h3>Registration Details</h3>
            <S.DetailGrid>
              <S.DetailItem>
                <S.DetailLabel>ABN Effective From</S.DetailLabel>
                <S.DetailValue>
                  {formatDate(result.abn_status_from_date)}
                </S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailLabel>GST Effective From</S.DetailLabel>
                <S.DetailValue>
                  {formatDate(result.gst_status_from_date)}
                </S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailLabel>Last Updated</S.DetailLabel>
                <S.DetailValue>{formatDate(result.last_updated)}</S.DetailValue>
              </S.DetailItem>
            </S.DetailGrid>
          </S.DetailSection>
        </S.ModalBody>
      </S.ModalContent>
    </S.ModalOverlay>
  )
}
export default CompanyDetailModal
