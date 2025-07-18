import styled from "styled-components";

export const Panel = styled.div`
  padding: 1.5rem;
  width: 100%;
  border-right: 2px solid white;
  background-color: white;
  width: 30%;
  margin-left: 24px;
`;

export const FilterGroup = styled.div`
  padding: 20px 0;
  border-bottom: 1px solid #d9d9d9;
  &:last-of-type {
    border-bottom: none;
  }
`;

export const FiltersWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

export const FilterTitle = styled.h3`
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

export const FilterHeading = styled.h2`
  font-weight: 600;
  font-size: 28px;
  margin-bottom: 0.5rem;
`;

export const FilterOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const FilterRow = styled.div`
  display: flex;
  align-items: center;
  flex-flow: row wrap;

  label {
    font-size: 14px;
    cursor: pointer;
  }

  input[type="checkbox"] {
    width: 18px;
    height: 18px;
    cursor: pointer;
    margin-right: 0.5rem;
  }
`;

export const EmployeesNo = styled.div`
  display: flex;
  flex-flow: column nowrap;
`;

export const Checklabel = styled.label`
  display: block;
  color: #374151;
  font-size: 14px;
`;

export const CheckboxItem = styled.div`
  display: block;
`;

export const ApplyButton = styled.button`
  color: white;
  border: none;
  width: 100%;
  padding: 15px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background-color: #374151;
  }
`;
