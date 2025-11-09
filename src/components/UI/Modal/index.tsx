"use client";
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { styled } from "styled-components";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: string;
}

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  z-index: 10000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;

  @media (max-width: 768px) {
    padding: 0.5rem;
    align-items: flex-end;
  }
`;

const ModalContainer = styled.div<{ maxWidth?: string }>`
  background: var(--ink);
  border: 1px solid rgba(246, 175, 207, 0.2);
  border-radius: 1rem;
  max-width: ${(props) => props.maxWidth || "800px"};
  max-height: 90vh;
  overflow-y: auto;
  position: relative;

  @media (max-width: 768px) {
    width: 100%;
    max-height: 85vh;
    border-radius: 1rem 1rem 0 0;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid rgba(246, 175, 207, 0.2);

  h2 {
    color: var(--petal);
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0;
  }

  @media (max-width: 768px) {
    padding: 1rem 1.5rem;

    h2 {
      font-size: 1.25rem;
    }
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: var(--light-gray);
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: all 0.2s ease;

  &:hover {
    background: rgba(246, 175, 207, 0.1);
    color: var(--petal);
  }

  &:focus {
    outline: 2px solid var(--petal);
    outline-offset: 2px;
  }
`;

const ModalBody = styled.div`
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem 1.5rem;
  }

  h3 {
    color: var(--petal);
    font-size: 1.25rem;
    font-weight: 600;
    margin-top: 2rem;
    margin-bottom: 1rem;

    &:first-child {
      margin-top: 0;
    }
  }

  p {
    color: var(--light-gray);
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  ul,
  ol {
    color: var(--light-gray);
    line-height: 1.6;
    margin-bottom: 1rem;
    padding-left: 1.5rem;
  }

  li {
    margin-bottom: 0.5rem;
  }

  a {
    color: var(--petal);
    text-decoration: underline;

    &:hover {
      color: var(--primary);
    }
  }

  .highlight {
    background: rgba(246, 175, 207, 0.1);
    padding: 1rem;
    border-radius: 0.5rem;
    border-left: 4px solid var(--petal);
    margin: 1rem 0;
  }

  .disclaimer {
    background: rgba(255, 193, 7, 0.1);
    padding: 1rem;
    border-radius: 0.5rem;
    border-left: 4px solid #ffc107;
    margin: 1rem 0;

    h4 {
      color: #ffc107;
      margin: 0 0 0.5rem 0;
      font-size: 1rem;
      font-weight: 600;
    }
  }
`;

const Modal = ({ isOpen, onClose, title, children, maxWidth }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <ModalOverlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleOverlayClick}
        >
          <ModalContainer maxWidth={maxWidth}>
            <ModalHeader>
              <h2>{title}</h2>
              <CloseButton onClick={onClose} aria-label="Close modal">
                ×
              </CloseButton>
            </ModalHeader>
            <ModalBody>{children}</ModalBody>
          </ModalContainer>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};

export default Modal;
