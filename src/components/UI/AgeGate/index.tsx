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

const DateInput = styled.input`
  width: 100%;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 0.75rem;
  border: 2px solid rgba(246, 175, 207, 0.3);
  background: rgba(11, 11, 11, 0.5);
  color: var(--white);
  font-size: 1rem;
  font-family: 'Inter', sans-serif;
  text-align: center;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: var(--primary);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.4);
  }
`;

const ErrorMessage = styled.p`
  color: #e74c3c;
  font-size: 0.875rem;
  margin-bottom: 1rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const Button = styled.button<{ $primary?: boolean; disabled?: boolean }>`
  padding: 1rem 2.5rem;
  border-radius: 0.75rem;
  border: 2px solid ${props => props.$primary ? 'var(--primary)' : 'rgba(255, 255, 255, 0.2)'};
  background: ${props => props.$primary ? 'var(--primary)' : 'transparent'};
  color: ${props => props.$primary ? 'var(--Background)' : 'var(--white)'};
  font-size: 1rem;
  font-weight: 600;
  font-family: 'Inter', sans-serif;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  opacity: ${props => props.disabled ? 0.5 : 1};
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 30px ${props => props.$primary ? 'rgba(246, 175, 207, 0.4)' : 'rgba(255, 255, 255, 0.1)'};
  }

  &:active:not(:disabled) {
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

const AgeGate = () => {
  const [showGate, setShowGate] = useState(false);
  const [birthDate, setBirthDate] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Check server-side verification status
    const checkVerification = async () => {
      try {
        const response = await fetch('/api/age-verify');
        const data = await response.json();
        
        if (!data.verified) {
          setShowGate(true);
        }
      } catch (err) {
        // If API fails, show gate as safety measure
        console.error('Age verification check failed:', err);
        setShowGate(true);
      }
    };

    checkVerification();
  }, []);

  const handleVerify = async () => {
    if (!birthDate) {
      setError('Please enter your birth date');
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/age-verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ birthDate }),
      });

      const data = await response.json();

      if (response.ok && data.verified) {
        setShowGate(false);
      } else {
        setError(data.error || 'Verification failed');
      }
    } catch (err) {
      console.error('Age verification error:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleExit = () => {
    // Redirect to educational resource
    window.location.href = 'https://www.samhsa.gov/find-help/national-helpline';
  };

  return (
    <AnimatePresence>
      {showGate && (
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="age-gate-title"
          aria-describedby="age-gate-description"
        >
          <Modal
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Icon role="img" aria-label="Mushroom">🍄</Icon>
            <Title id="age-gate-title">Age Verification Required</Title>
            <Description id="age-gate-description">
              This site contains <strong>educational content</strong> about psilocybin research 
              and is intended for adults 18 years and older.
              <br /><br />
              Please enter your birth date to continue.
            </Description>
            
            <DateInput
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              aria-label="Birth date"
              aria-required="true"
            />
            
            {error && <ErrorMessage role="alert">{error}</ErrorMessage>}
            
            <ButtonGroup>
              <Button onClick={handleExit}>
                Exit Site
              </Button>
              <Button 
                $primary 
                onClick={handleVerify}
                disabled={isSubmitting || !birthDate}
              >
                {isSubmitting ? 'Verifying...' : 'Verify Age'}
              </Button>
            </ButtonGroup>

            <Disclaimer>
              By verifying your age you confirm that you are of legal age in your
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
