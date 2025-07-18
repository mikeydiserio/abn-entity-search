"use client";
import { BusinessName, CompanyEntity } from "@/types";
import {
  formatABN,
  formatACN,
  formatDate,
  formatRevenueBand,
} from "@/utils/helpers";
import React, { useEffect } from "react";
import * as S from "./CompanyDetailModal.styles";

interface CompanyDetailModalProps {
  details: any;
  onClose: () => void;
  company: CompanyEntity;
}

export const CompanyDetailModal: React.FC<CompanyDetailModalProps> = ({
  company,
  onClose,
}) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <S.ModalOverlay onClick={handleOverlayClick}>
      <S.ModalContent>
        <S.ModalHeader>
          <h2>{company?.name}</h2>
          <S.ModalCloseButton onClick={onClose}>&times;</S.ModalCloseButton>
        </S.ModalHeader>
        <S.ModalBody>
          <S.DetailSection>
            <h3>Company Information</h3>
            <S.DetailGrid>
              <S.DetailItem>
                <S.DetailLabel>Legal Name{company.legal_name}</S.DetailLabel>
                <S.DetailValue>Company Name: {company.name}</S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailLabel>ABN</S.DetailLabel>
                <S.DetailValue>
                  {company.abn && formatABN(company.abn)}
                </S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailLabel>ACN</S.DetailLabel>
                <S.DetailValue>
                  {company.acn && formatACN(company.acn)}
                </S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailLabel>Industry</S.DetailLabel>
                <S.DetailValue>{company.industry}</S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailLabel>GST Status</S.DetailLabel>
                <S.DetailValue>
                  {company.gst_status} FROM DATE: {company.gst_status_from_date}
                </S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailLabel>ABN Status</S.DetailLabel>
                <S.DetailValue>{company.abn_status}</S.DetailValue>
              </S.DetailItem>
            </S.DetailGrid>
          </S.DetailSection>

          <S.DetailSection>
            <h3>Business Address</h3>
            <S.DetailGrid>
              <S.DetailItem>
                <S.DetailLabel>Street</S.DetailLabel>
                <S.DetailValue>{company.address.street}</S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailLabel>Suburb</S.DetailLabel>
                <S.DetailValue>{company.address.suburb}</S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailLabel>State</S.DetailLabel>
                <S.DetailValue>{company.address.state}</S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailLabel>Postcode</S.DetailLabel>
                <S.DetailValue>{company.address.postcode}</S.DetailValue>
              </S.DetailItem>
            </S.DetailGrid>
          </S.DetailSection>

          <S.DetailSection>
            <h3>Business Operations</h3>
            <S.DetailGrid>
              <S.DetailItem>
                <S.DetailLabel>Employee Count</S.DetailLabel>
                <S.DetailValue>
                  {company.employeeCount.toLocaleString()} employees
                </S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailLabel>Revenue Band</S.DetailLabel>
                <S.DetailValue>
                  {formatRevenueBand(company.revenueBand)}
                </S.DetailValue>
              </S.DetailItem>
            </S.DetailGrid>
          </S.DetailSection>

          <S.DetailSection>
            <h3>Business Names</h3>
            <S.BusinessNamesList>
              {company.business_names.map((bn: BusinessName) => (
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
                  {formatDate(company.abn_status_from_date)}
                </S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailLabel>GST Effective From</S.DetailLabel>
                <S.DetailValue>
                  {formatDate(company.gst_status_from_date)}
                </S.DetailValue>
              </S.DetailItem>
              <S.DetailItem>
                <S.DetailLabel>Last Updated</S.DetailLabel>
                <S.DetailValue>
                  {formatDate(company.last_updated)}
                </S.DetailValue>
              </S.DetailItem>
            </S.DetailGrid>
          </S.DetailSection>
        </S.ModalBody>
      </S.ModalContent>
    </S.ModalOverlay>
  );
};
export default CompanyDetailModal;
