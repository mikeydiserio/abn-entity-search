import React, { ReactElement, useState } from "react";
import * as S from "./SearchBar.styles";

export interface Company {
  id: string;
  name: string;
  // ...other fields as needed
}

export interface SearchBarProps {
  placeholder?: string;
  onSelectSuggestion?: (suggestion: string) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  handleSearchButton: (searchTerm: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = "Search by company name, ABN, ACN, or industry...",
  onSelectSuggestion,
  searchTerm,
  setSearchTerm,
  handleSearchButton,
}) => {
  const [suggestions, setSuggestions] = useState<Company[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<Boolean>(false);

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearchButton(searchTerm);
    }
  };

  // TODO Where will suggestions come from?
  // if users own history then can probably remove this
  const renderSuggestions = (): ReactElement | null => {
    return (
      <S.SearchSuggestions>
        {suggestions.map((company) => (
          <S.SuggestionItem
            key={company.id}
            onMouseDown={() => {
              setSearchTerm(company.name);
              if (onSelectSuggestion) onSelectSuggestion(company.name);
            }}
          >
            {company.name}
          </S.SuggestionItem>
        ))}
      </S.SearchSuggestions>
    );
  };

  return (
    <S.SearchBox>
      <S.SearchInput
        type="text"
        id="searchInput"
        placeholder={placeholder}
        autoComplete="off"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onFocus={() => setShowSuggestions(suggestions.length > 0)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
        onKeyDown={handleKeyPress}
      />
      <S.SearchButton>
        <i />
        <span>Search</span>
      </S.SearchButton>
      {showSuggestions ? renderSuggestions() : null}
    </S.SearchBox>
  );
};

export default SearchBar;
