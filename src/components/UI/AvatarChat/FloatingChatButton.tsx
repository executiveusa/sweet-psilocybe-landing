"use client";

import React, { useState } from "react";
import styled from "styled-components";
import AvatarChat from "./index";

/**
 * FloatingChatButton Component
 * 
 * Floating button that opens the avatar chat widget
 * Positioned fixed at bottom-right of screen
 */
const FloatingChatButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {isOpen && (
        <ChatOverlay>
          <ChatWrapper>
            <AvatarChat onClose={() => setIsOpen(false)} />
          </ChatWrapper>
        </ChatOverlay>
      )}

      <FloatingButton
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        $isOpen={isOpen}
      >
        {isOpen ? "✕" : "🍄"}
      </FloatingButton>
    </>
  );
};

const ChatOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(11, 11, 11, 0.5);
  backdrop-filter: blur(4px);
  z-index: 9998;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  animation: fadeIn 0.2s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    padding: 0;
  }
`;

const ChatWrapper = styled.div`
  animation: slideUp 0.3s ease-out;

  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 100%;

    > div {
      max-width: 100%;
      height: 100%;
      border-radius: 0;
    }
  }
`;

const FloatingButton = styled.button<{ $isOpen: boolean }>`
  position: fixed;
  bottom: 24px;
  right: 24px;
  width: 64px;
  height: 64px;
  border: none;
  border-radius: 50%;
  background: ${(props) =>
    props.$isOpen
      ? "#0b0b0b"
      : "linear-gradient(135deg, #f6afcf 0%, #a9c0b0 100%)"};
  color: ${(props) => (props.$isOpen ? "#f6afcf" : "#0b0b0b")};
  font-size: 32px;
  cursor: pointer;
  box-shadow: 0 8px 24px rgba(246, 175, 207, 0.4);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 12px 32px rgba(246, 175, 207, 0.6);
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    bottom: 16px;
    right: 16px;
    width: 56px;
    height: 56px;
    font-size: 28px;
  }
`;

export default FloatingChatButton;
