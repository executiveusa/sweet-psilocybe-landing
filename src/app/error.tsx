'use client';

import { useEffect } from 'react';
import styled from 'styled-components';

const ErrorContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
`;

const ErrorContent = styled.div`
  max-width: 600px;
`;

const ErrorTitle = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const ErrorMessage = styled.p`
  font-size: 1.125rem;
  color: #a0a0a0;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const RetryButton = styled.button`
  padding: 1rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(231, 76, 60, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const ErrorCode = styled.code`
  display: block;
  margin-top: 2rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  color: #e74c3c;
  font-family: 'Courier New', monospace;
  font-size: 0.875rem;
  word-break: break-word;
`;

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Component error:', error);
    }
    
    // TODO: Send to error tracking service (e.g., Sentry)
    // trackError(error);
  }, [error]);

  return (
    <ErrorContainer>
      <ErrorContent>
        <ErrorTitle>Oops! Something went wrong</ErrorTitle>
        <ErrorMessage>
          We encountered an unexpected error. Don't worry, our team has been notified and we're working on a fix.
        </ErrorMessage>
        <RetryButton onClick={() => reset()}>
          Try Again
        </RetryButton>
        {process.env.NODE_ENV === 'development' && (
          <ErrorCode>
            {error.message}
          </ErrorCode>
        )}
      </ErrorContent>
    </ErrorContainer>
  );
}
