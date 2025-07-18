"use client";
import { ReactNode } from "react";
import * as S from "./Button.styles";

export interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
}

export const Button = ({ children, onClick }: ButtonProps) => {
  return <S.Button onClick={onClick}>{children}</S.Button>;
};
