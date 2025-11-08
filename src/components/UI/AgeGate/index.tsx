'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { styled } from 'styled-components';

const Overlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(11, 11, 11, 0.95);
  backdrop-filter: blur(10px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const Modal = styled(motion.div)`
  max-width: 500px;
  width: 100%;
  background: linear-gradient(135deg, rgba(246, 175, 207, 0.1) 0%, rgba(169, 192, 176, 0.1) 100%);
  border: 2px solid rgba(246, 175, 207, 0.3);
  border-radius: 1.5rem;
  padding: 3rem 2rem;
  text-align: center;
  box-shadow: 0 20px 60px rgba(246, 175, 207, 0.2);

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
  }
`;

const Icon = styled.div`
  font-size: 4rem;
  margin-bottom: 1.5rem;
  animation: float 3s ease-in-out infinite;

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: var(--white);
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Description = styled.p`
  font-size: 1rem;
  color: var(--light-gray);
  line-height: 1.6;
  margin-bottom: 2rem;

  strong {
    color: var(--primary);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Button = styled.button<{ $primary?: boolean }>`
  padding: 1rem 2.5rem;
  border-radius: 0.75rem;
  border: 2px solid ${props => props.$primary ? 'var(--primary)' : 'rgba(255, 255, 255, 0.2)'};
  background: ${props => props.$primary ? 'var(--primary)' : 'transparent'};
  color: ${props => props.$primary ? 'var(--Background)' : 'var(--white)'};
  font-size: 1rem;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px ${props => props.$primary ? 'rgba(246, 175, 207, 0.4)' : 'rgba(255, 255, 255, 0.1)'};
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 0.875rem 2rem;
    width: 100%;
  }
`;

const Disclaimer = styled.p`
  margin-top: 2rem;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.4);
  line-height: 1.4;
`;

const AGE_GATE_KEY = 'sweet_psilocybe_age_verified';
const AGE_GATE_EXPIRY = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds

const AgeGate = () => {
  const [showGate, setShowGate] = useState(false);

  useEffect(() => {
    // Check if user has already verified age
    const stored = localStorage.getItem(AGE_GATE_KEY);
    
    if (stored) {
      try {
        const { timestamp } = JSON.parse(stored);
        const now = Date.now();
        
        // Check if verification has expired
        if (now - timestamp < AGE_GATE_EXPIRY) {
          return; // Still valid, don't show gate
        }
      } catch (e) {
        // Invalid stored data, clear it
        localStorage.removeItem(AGE_GATE_KEY);
      }
    }
    
    // Show age gate
    setShowGate(true);
  }, []);

  const handleVerify = (isOver18: boolean) => {
    if (isOver18) {
      // Store verification with timestamp
      localStorage.setItem(AGE_GATE_KEY, JSON.stringify({
        verified: true,
        timestamp: Date.now(),
      }));
      setShowGate(false);
    } else {
      // Redirect to educational resource
      window.location.href = 'https://www.samhsa.gov/find-help/national-helpline';
    }
  };

  return (
    <AnimatePresence>
      {showGate && (
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Modal
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Icon>🍄</Icon>
            <Title>Age Verification Required</Title>
            <Description>
              This site contains <strong>educational content</strong> about psilocybin research 
              and is intended for adults 18 years and older.
              <br /><br />
              Please verify your age to continue.
            </Description>
            
            <ButtonGroup>
              <Button onClick={() => handleVerify(false)}>
                I&apos;m Under 18
              </Button>
              <Button $primary onClick={() => handleVerify(true)}>
                I&apos;m 18 or Older
              </Button>
            </ButtonGroup>

            <Disclaimer>
              By clicking &quot;I&apos;m 18 or Older&quot; you confirm that you are of legal age in your
              jurisdiction and agree to our Terms of Use. This site is for educational
              purposes only and does not provide medical advice.
            </Disclaimer>
          </Modal>
        </Overlay>
      )}
    </AnimatePresence>
  );
};

export default AgeGate;
