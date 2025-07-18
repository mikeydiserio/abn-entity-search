"use client";
import { CompanyEntity } from "@/types";
import { formatABN } from "@/utils/helpers";
import styled from "styled-components";
import * as S from "./ResultsPanel.styles";

const CompanyName = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 10px;
  position: relative;
  z-index: 1;
`;

const CompanyDetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px 15px;
  margin: 20px 0;
  position: relative;
  z-index: 1;
`;

const DetailItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const DetailLabel = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
`;

const DetailValue = styled.span`
  font-size: 14px;
  color: #374151;
  font-weight: 500;
`;

const CompanyTags = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: auto; /* Pushes tags to the bottom */
  padding-top: 20px;
  position: relative;
  z-index: 1;
`;

const Tag = styled.span`
  padding: 6px 12px;
  background: #f3f4f6;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  color: #374151;
`;

interface CompanyCardProps {
  company: CompanyEntity;
  onClick: () => void;
}

export const ResultItem: React.FC<CompanyCardProps> = ({
  company,
  onClick,
}) => {
  return (
    <S.ResultsItem onClick={onClick}>
      <S.ResultsTitle>{company?.name}</S.ResultsTitle>
      <S.ResultsTitle>{company?.legal_name}</S.ResultsTitle>
      <CompanyDetailsGrid>
        <DetailItem>
          <DetailLabel>ABN</DetailLabel>
          <DetailValue>
            {company ? formatABN(company?.abn || "No ABN Provided") : null}
          </DetailValue>
        </DetailItem>
        <DetailItem>
          <DetailLabel>Industry</DetailLabel>
          <DetailValue>{company.industry || "N / A"}</DetailValue>
        </DetailItem>
        <DetailItem>
          <DetailLabel>Employee Count</DetailLabel>
          <DetailValue>
            {company?.employeeCount?.toLocaleString() || "Not listed"}
          </DetailValue>
        </DetailItem>
        <DetailItem>
          <DetailLabel>Location</DetailLabel>
          <DetailValue>
            {company?.address && company.address.toString()},
            {company?.address && company.address.toString()}
          </DetailValue>
        </DetailItem>
        <DetailItem>
          <DetailLabel>ABN Status</DetailLabel>
          <DetailValue>
            {company?.address && company.address.toString()},
            {company?.address && company.address.toString()}
          </DetailValue>
        </DetailItem>
      </CompanyDetailsGrid>
      <CompanyTags>
        <Tag>{company.industry}</Tag>
        <Tag>{company.revenueBand}</Tag>
        <Tag>{company?.address?.state || ""}</Tag>
      </CompanyTags>
    </S.ResultsItem>
  );
};
export default ResultItem;
