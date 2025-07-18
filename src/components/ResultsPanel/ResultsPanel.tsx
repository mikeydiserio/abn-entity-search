import { Select } from "@/components/ui";
import { sortOptions } from "@/mocks/content";
import type { CompanyEntity } from "@/types";
import { useEffect, useState } from "react";
import { ResultItem } from "./ResultItem";
import * as S from "./ResultsPanel.styles";

interface ResultsPanel {
  entities?: CompanyEntity[];
  handleResultClick: (entity: CompanyEntity) => void;
  error: any;
  loading: boolean;
}
const mockedlistitem = {
  name: "asd",
  id: 1,
  abn: "",
  acn: "",
  industry: "",
  industryCode: "",
  employeeCount: 1,
  revenueBand: "",
  website: "",
  emailDomain: "",
  phone: "",
};
export const ResultsPanel = ({
  entities,
  handleResultClick,
  loading,
  error,
}: ResultsPanel) => {
  const [sortOrder, setSortOrder] = useState("");
  const renderSkeletonLoading = () => {
    return <S.SkeletonLoading />;
  };

  useEffect(() => {
    return;
  }, []);

  return (
    <S.ResultsColumn>
      <S.ResultsContainer>
        <S.ResultsHeader>
          <S.ResultsTitle>
            {entities?.length ? (
              <p>
                showing <span>{entities?.length || 0}</span> results for
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
              onChange={(e) => setSortOrder(e.target.value)}
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

        {entities &&
          entities?.length > 0 &&
          entities?.map((entity: CompanyEntity) => (
            <ResultItem
              key={entity.id || entity.abn}
              company={entity}
              onClick={() => handleResultClick(entity)}
            />
          ))}
      </S.ResultsList>
      {loading ? null : renderSkeletonLoading()}
      {error && <p>App has dun goofed it</p>}
    </S.ResultsColumn>
  );
};

export default ResultsPanel;
