"use client";
import React from "react";
import * as S from "./Select.styles";

interface Option {
  value: string | number;
  label: string;
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: Option[];
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  id,
  ...rest
}) => {
  return (
    <S.SelectContainer>
      <S.SelectLabel htmlFor={id}>{label}</S.SelectLabel>
      <S.SelectInput id={id} {...rest}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </S.SelectInput>
    </S.SelectContainer>
  );
};
