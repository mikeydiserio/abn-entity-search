'use client'

import React, { useEffect, useRef, useState, ReactElement } from 'react';
import * as S from "./SearchBar.styles";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSearch?: () => void;
  className?: string;
  disabled?: boolean;
  autoFocus?: boolean;
  showSearchButton?: boolean;
  debounceMs?: number;
  placeholder?: string;
  onSelectSuggestion?: (suggestion: string) => void;
  showSuggestions?: boolean;
}

export default function SearchBar({
  onSelectSuggestion,
  value,
  onChange,
  onSearch,
  placeholder = "Enter company name, ABN or ACN...",
  disabled = false,
  autoFocus = false,
  showSearchButton = true,
  debounceMs = 300,
  showSuggestions = false
}: SearchBarProps) {
  const [inputValue, setInputValue] = useState(value);
  const [suggestions, _setSuggestions] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Sync external value changes
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Auto focus if requested
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [autoFocus]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);

    // Clear existing debounce
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    // Set new debounce
    debounceRef.current = setTimeout(() => {
      onChange(newValue);
    }, debounceMs);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      // Clear debounce and trigger immediate search
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
      onChange(inputValue);
      onSearch?.();
    }
  };

  const handleSearchClick = () => {
    // Clear debounce and trigger immediate search
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    onChange(inputValue);
    onSearch?.();
  };

  const handleClear = () => {
    setInputValue('');
    onChange('');
    inputRef.current?.focus();
  };

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);


    // TODO Where will suggestions come from?
    // if users own history then can probably remove this
    const renderSuggestions = (): ReactElement | null => {
      return (
        <S.SearchSuggestions>
          {suggestions.map((suggestion) => (
            <S.SuggestionItem
              key={suggestion}
              onMouseDown={() => {
                onChange(suggestion);
                if (onSelectSuggestion) onSelectSuggestion(suggestion);
              }}
            >
              {suggestion}
            </S.SuggestionItem>
          ))}
        </S.SearchSuggestions>
      );
    };

  return (
    <S.SearchBox>
      <S.SearchInput
          ref={inputRef}
          type="text"
          className="search-input"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          disabled={disabled}
          aria-label="Search companies"
        />

        {inputValue && (
          <button
            type="button"
            className="clear-button"
            onClick={handleClear}
            aria-label="Clear search"
            disabled={disabled}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        )}

      {showSearchButton && (
      <S.SearchButton
          type="button"
          className="search-button"
          onClick={handleSearchClick}
          disabled={disabled}
          aria-label="Search"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
          <span>Search</span>
        </S.SearchButton>
      )}
            {showSuggestions ? renderSuggestions() : null}
      </S.SearchBox>

  );
}

// Compact search bar variant
export function CompactSearchBar(props: Omit<SearchBarProps, 'showSearchButton'>) {
  return (
    <SearchBar
      {...props}
      showSearchButton={false}
      className={`compact-search ${props.className || ''}`}
    />
  );
}
