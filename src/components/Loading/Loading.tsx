'use client';

import * as S from './Loading.styles';

interface LoadingProps {
  message?: string;
  size?: string
}

export const LoadingSpinner: React.FC<LoadingProps> = ({
  size = 'medium',
  message = 'Loading...',
}) => {
    return (
        <S.LoadingWrapper size={size} > 
        <S.Spinner />
        {message && (
          <p className="loading-message">{message}</p>
        )}
        </S.LoadingWrapper>
    );
};

export default function Loading({ 
  size = 'medium',
  message = 'Loading...',
}: LoadingProps) {
  return (
      <S.LoadingWrapper size={size} > 
        <S.Spinner />
        {message && (
          <p className="loading-message">{message}</p>
        )}
      </S.LoadingWrapper>
    );
}

// Inline spinner for buttons or small spaces
export function InlineSpinner({ size = 'small' }: { size?: 'small' | 'medium' }) {
  return (
    <S.LoadingWrapper size={size} > 
        <S.Spinner />
    </S.LoadingWrapper>
  );
}

// Full page loading overlay
export function LoadingOverlay({ message = 'Loading...' }: { message?: string }) {
  return (
      <S.LoadingWrapper> 
        <S.Spinner />
        {message && (
          <p className="loading-message">{message}</p>
        )}
      </S.LoadingWrapper>
  );
}

