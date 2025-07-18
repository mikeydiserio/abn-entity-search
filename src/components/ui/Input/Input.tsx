'use client';
import * as S from './Input.styles';

export interface InputProps {
  type: string
  id: string
  placeholder: string
  autoComplete: boolean
  value: any
  onChange: () => void
  onFocus: () => void
  onBlur: () => void
}

export const Input = (
  type: any,
  id: any,
  placeholder: any,
  autoComplete: any,
  value: any,
  onChange: any,
  onFocus: any,
  onBlur: any
) => {
  return (
    <>
      <label>Input Label</label>
      <S.Input id={id} autoComplete={autoComplete} type={type} value={value} placeholder={placeholder} onBlur={onBlur} onFocus={onFocus} onChange={onChange}/>
    </>
  );
}