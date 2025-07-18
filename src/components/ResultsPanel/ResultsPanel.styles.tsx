import styled from "styled-components";

export const ResultsContainer = styled.div`
  position: relative;
  background: white;
  overflow: hidden;
  display: flex;
  justify-content: center;
`;

export const ResultsHeader = styled.div`
  padding: 24px;
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  font-weight: 500;
  border-bottom: 2px solid #cfcfcf;
`;

export const ResultsTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
`;

export const ResultsSort = styled.div`
  display: flex;
  align-items: flex-end;
  text-align: left;
  gap: 15px;
`;

export const SortSelect = styled.div`
  padding: 8px 15px;
  border: 1px solid var(--gray-light);
  background-color: white;
  cursor: pointer;
  outline: none;
`;

export const ResultsList = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  list-style-type: none;
`;
export const ResultsColumn = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  list-style-type: none;
  background: white;
`;

export const ResultsItem = styled.li`
  list-style-type: none;
  padding: 20px;
  border-bottom: 2px solid #cfcfcf;
  transition: var(--transition);
  cursor: pointer;
  position: relative;
  min-height: 48px;

  &:hover {
    background-color: #f8fbfe;
  }
`;

export const ResultTitle = styled.div`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 8px;
  color: var(--primary-dark);
`;

export const SkeletonLoading = styled.div`
  padding: 20px;
  border-bottom: 1px solid var(--gray-light);
  transition: var(--transition);
  cursor: pointer;
  position: relative;
  animation: skeleton-loading 1s linear infinite alternate;
  border-radius: var(--radius-md);
`;

export const SkeletonText = styled.div`
  width: 100%;
  height: 12px;
  margin-bottom: 10px;
`;
