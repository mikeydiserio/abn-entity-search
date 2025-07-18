import styled from "styled-components";

export const SelectContainer = styled.div`
  position: relative;
`;

export const SelectLabel = styled.label`
  display: block;
  font-weight: 500;
  color: #374151;
  font-size: 14px;
`;

export const SelectInput = styled.select`
  width: 100%;
  border: 2px solid #e1e5e9;
  font-size: 14px;
  font-family: inherit;
  background: white;
  transition: all 0.3s ease;
  appearance: none;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;
