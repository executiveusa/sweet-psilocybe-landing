'use client';
import { styled } from 'styled-components';

export const Wrapper = styled.section`
  background: linear-gradient(180deg, var(--Background) 0%, #1a1a1a 100%);
  padding: 8rem 0;

  @media (max-width: 768px) {
    padding: 4rem 0;
  }
`;

export const Inner = styled.div`
  max-width: 768px;
  width: 90%;
  margin: 0 auto;
  text-align: center;
`;

export const Header = styled.div`
  margin-bottom: 3rem;

  h2 {
    font-size: 3.5rem;
    font-weight: 700;
    color: var(--white);
    margin-bottom: 1rem;
    
    span {
      color: var(--primary);
    }
  }

  p {
    font-size: 1.25rem;
    color: var(--light-gray);
    line-height: 1.75rem;
    max-width: 600px;
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    margin-bottom: 2rem;
    
    h2 {
      font-size: 2rem;
    }

    p {
      font-size: 1rem;
      line-height: 1.5rem;
    }
  }
`;

export const FormWrapper = styled.form`
  display: flex;
  gap: 1rem;
  max-width: 600px;
  margin: 0 auto 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Input = styled.input`
  flex: 1;
  padding: 1.25rem 1.5rem;
  border-radius: 0.75rem;
  border: 2px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  color: var(--white);
  font-size: 1rem;
  font-family: 'Inter', sans-serif;
  transition: all 0.3s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }

  &:focus {
    outline: none;
    border-color: var(--primary);
    background: rgba(246, 175, 207, 0.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    padding: 1rem 1.25rem;
  }
`;

export const SubmitButton = styled.button`
  padding: 1.25rem 3rem;
  border-radius: 0.75rem;
  border: none;
  background: var(--primary);
  color: var(--Background);
  font-size: 1rem;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover:not(:disabled) {
    background: #f39bc4;
    transform: translateY(-2px);
    box-shadow: 0 10px 30px rgba(246, 175, 207, 0.3);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    padding: 1rem 2rem;
    width: 100%;
  }
`;

export const Message = styled.p<{ $isError?: boolean }>`
  margin-top: 1rem;
  font-size: 0.9rem;
  color: ${props => props.$isError ? '#ff6b6b' : 'var(--secondary)'};
  font-weight: 500;
  min-height: 1.5rem;
`;

export const ErrorText = styled.p`
  color: #ff6b6b;
  font-size: 0.875rem;
  margin-top: 0.5rem;
  text-align: left;
`;

export const Disclaimer = styled.p`
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.4);
  margin-top: 1.5rem;

  a {
    color: var(--primary);
    text-decoration: underline;
    
    &:hover {
      color: #f39bc4;
    }
  }
`;

export const DemoModeNotice = styled.div`
  margin-top: 2rem;
  padding: 1rem 1.5rem;
  border-radius: 0.75rem;
  background: rgba(246, 175, 207, 0.1);
  border: 1px solid rgba(246, 175, 207, 0.3);
  
  p {
    color: var(--primary);
    font-size: 0.875rem;
    
    strong {
      font-weight: 600;
    }
  }
`;
