'use client';
import Link from 'next/link';
import { styled } from 'styled-components';

export const LinkTo = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6.25rem;
  background: var(--green);
  color: var(--white);
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  text-decoration: none;

  &:hover {
    background: var(--primary);
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(169, 192, 176, 0.3);
  }

  &:focus {
    outline: 2px solid var(--primary);
    outline-offset: 2px;
  }

  &:active {
    transform: translateY(0);
  }
`;
