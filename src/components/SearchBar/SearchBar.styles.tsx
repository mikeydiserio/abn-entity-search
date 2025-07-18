import styled from "styled-components";

export const SearchIcon = styled.div`
  height: 24px;
  width: 24px;
`;

export const SearchInput = styled.input`
  display: block;
  height: 100%;
  width: 100%;
  padding: 24px;
  border: 2px solid transparent;
  outline: none;
  border-radius: 12px 0 0 12px;
  transition: var(--transition);

  &:focus {
    outline: 2px solid #3700ff;
    border: 2px solid #3700ff;
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.2);
  }
`;

export const SearchButton = styled.button`
  background: #3700ff;
  color: white;
  border: none;
  padding: 0 30px;
  font-size: 16px;
  cursor: pointer;
  transition: var(--transition);
  border-radius: 0 12px 12px 0;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: rgba(79, 70, 229);
  }
  &:focus {
    outline: 2px solid rgba(79, 70, 229);
  }
`;

export const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  border: 1px solid salmon;
`;

export const SearchBox = styled.div`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  width: 100%;
  box-shadow: var(--shadow-sm);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: var(--transition);

  &:focus-within {
    box-shadow: 0 0 0 2px var(--primary), var(--shadow-md);
  }
`;

export const SearchSuggestions = styled.div`
  position: absolute;
  z-index: 10;
  width: 100%;
  background-color: white;
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border: 1px solid #e5e7eb;
  overflow-y: auto;
  top: 30px;
`;

export const SuggestionItem = styled.div`
  color: black;
  padding: 0.75rem 1rem;
  cursor: pointer;

  &:hover {
    background-color: var(--light-gray);
  }
`;
