"use client";

import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

// Type definitions matching the spec
type AvatarEmotion =
  | "neutral"
  | "happy"
  | "excited"
  | "curious"
  | "thinking"
  | "reassuring"
  | "apologetic";

type Message = {
  id: string;
  role: "user" | "avatar";
  text: string;
  emotion?: AvatarEmotion;
  timestamp: Date;
};

type AvatarChatProps = {
  avatarId?: string;
  onClose?: () => void;
};

/**
 * AvatarChat Component
 * 
 * Autonomous sales avatar chat widget matching Sweet Psilocybe brand
 * Communicates with /api/store/ai/chat endpoint
 * Styled with brand colors: petal (pink), fern (green), ink (black), cream
 */
const AvatarChat: React.FC<AvatarChatProps> = ({
  avatarId = "sweet-psilocybe-avatar",
  onClose,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "avatar",
      text: "Hi! 👋 I'm here to help you explore our psilocybin research resources and find the perfect merchandise. What brings you here today?",
      emotion: "happy",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      role: "user",
      text: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/store/ai/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          conversation_id: conversationId,
          message: userMessage.text,
          avatar_id: avatarId,
          customer: {
            // Add customer context if available
            locale: navigator.language,
          },
          client_view: {
            page: "landing",
            url: window.location.href,
            device: window.innerWidth < 768 ? "mobile" : "desktop",
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response from avatar");
      }

      const data = await response.json();

      // Update conversation ID
      if (data.conversation_id && !conversationId) {
        setConversationId(data.conversation_id);
      }

      // Add avatar's response
      const avatarMessage: Message = {
        id: `msg-${Date.now()}-avatar`,
        role: "avatar",
        text: data.avatar_reply.reply_text,
        emotion: data.avatar_reply.emotion,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, avatarMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      
      // Add error message
      const errorMessage: Message = {
        id: `msg-${Date.now()}-error`,
        role: "avatar",
        text: "I apologize, but I'm having trouble connecting right now. Please try again in a moment.",
        emotion: "apologetic",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <ChatContainer>
      <ChatHeader>
        <HeaderContent>
          <AvatarIcon>🍄</AvatarIcon>
          <HeaderText>
            <HeaderTitle>Sweet Psilocybe Guide</HeaderTitle>
            <HeaderSubtitle>Your research & shopping assistant</HeaderSubtitle>
          </HeaderText>
        </HeaderContent>
        {onClose && (
          <CloseButton onClick={onClose} aria-label="Close chat">
            ✕
          </CloseButton>
        )}
      </ChatHeader>

      <MessagesContainer>
        {messages.map((message) => (
          <MessageWrapper key={message.id} $isUser={message.role === "user"}>
            <MessageBubble $isUser={message.role === "user"}>
              {message.text}
            </MessageBubble>
          </MessageWrapper>
        ))}
        {isLoading && (
          <MessageWrapper $isUser={false}>
            <MessageBubble $isUser={false}>
              <TypingIndicator>
                <Dot />
                <Dot />
                <Dot />
              </TypingIndicator>
            </MessageBubble>
          </MessageWrapper>
        )}
        <div ref={messagesEndRef} />
      </MessagesContainer>

      <InputContainer>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask me anything about psilocybin research or our products..."
          disabled={isLoading}
          aria-label="Chat message input"
        />
        <SendButton
          onClick={sendMessage}
          disabled={!input.trim() || isLoading}
          aria-label="Send message"
        >
          ➤
        </SendButton>
      </InputContainer>
    </ChatContainer>
  );
};

// Styled Components with Sweet Psilocybe branding

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  height: 600px;
  background: #f7f3ef; /* cream */
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(11, 11, 11, 0.15);
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
`;

const ChatHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  background: linear-gradient(135deg, #f6afcf 0%, #a9c0b0 100%); /* petal to fern */
  color: #0b0b0b; /* ink */
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const AvatarIcon = styled.div`
  font-size: 32px;
  line-height: 1;
`;

const HeaderText = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: 600;
`;

const HeaderSubtitle = styled.p`
  margin: 0;
  font-size: 12px;
  opacity: 0.8;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #0b0b0b;
  padding: 4px;
  opacity: 0.7;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`;

const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.05);
  }

  &::-webkit-scrollbar-thumb {
    background: #f6afcf;
    border-radius: 3px;
  }
`;

const MessageWrapper = styled.div<{ $isUser: boolean }>`
  display: flex;
  justify-content: ${(props) => (props.$isUser ? "flex-end" : "flex-start")};
`;

const MessageBubble = styled.div<{ $isUser: boolean }>`
  max-width: 75%;
  padding: 12px 16px;
  border-radius: 16px;
  background: ${(props) => (props.$isUser ? "#f6afcf" : "#ffffff")};
  color: #0b0b0b;
  font-size: 14px;
  line-height: 1.5;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  word-wrap: break-word;
`;

const TypingIndicator = styled.div`
  display: flex;
  gap: 4px;
  padding: 4px 0;
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #a9c0b0;
  animation: typing 1.4s infinite;

  &:nth-child(2) {
    animation-delay: 0.2s;
  }

  &:nth-child(3) {
    animation-delay: 0.4s;
  }

  @keyframes typing {
    0%,
    60%,
    100% {
      transform: translateY(0);
      opacity: 0.7;
    }
    30% {
      transform: translateY(-10px);
      opacity: 1;
    }
  }
`;

const InputContainer = styled.div`
  display: flex;
  padding: 16px 20px;
  gap: 12px;
  border-top: 1px solid rgba(11, 11, 11, 0.1);
  background: #ffffff;
`;

const Input = styled.input`
  flex: 1;
  padding: 12px 16px;
  border: 1px solid rgba(11, 11, 11, 0.2);
  border-radius: 24px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #f6afcf;
  }

  &::placeholder {
    color: rgba(11, 11, 11, 0.5);
  }
`;

const SendButton = styled.button`
  width: 44px;
  height: 44px;
  border: none;
  border-radius: 50%;
  background: #f6afcf;
  color: #0b0b0b;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: #a9c0b0;
    transform: scale(1.05);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default AvatarChat;
