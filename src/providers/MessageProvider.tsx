import React, { createContext, useContext, useState, useCallback } from "react";

import styles from "@/styles/MessageProvider.module.css";
import Message from "@/components/Message";

type MessageType = "error" | "success" | "warn" | "info";
type MessagePosition = "top-left" | "top-right" | "center";

interface Message {
  id: number;
  type: MessageType;
  content: string;
  position: MessagePosition;
  duration: number;
}

interface MessageContextType {
  successMsg: (
    content: string,
    position?: MessagePosition,
    duration?: number
  ) => void;
  errorMsg: (
    content: string,
    position?: MessagePosition,
    duration?: number
  ) => void;
  warnMsg: (
    content: string,
    position?: MessagePosition,
    duration?: number
  ) => void;
  infoMsg: (
    content: string,
    position?: MessagePosition,
    duration?: number
  ) => void;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

let messageId = 0;

export const MessageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const removeMessage = useCallback((id: number) => {
    setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== id));
  }, []);

  const showMessage = useCallback(
    (
      type: MessageType,
      content: string,
      position: MessagePosition = "top-right",
      duration: number = 3000
    ) => {
      const id = messageId++;
      const newMessage = { id, type, content, position, duration };
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    },
    []
  );

  const successMsg = (
    content: string,
    position?: MessagePosition,
    duration?: number
  ) => {
    showMessage("success", content, position, duration);
  };

  const errorMsg = (
    content: string,
    position?: MessagePosition,
    duration?: number
  ) => {
    showMessage("error", content, position, duration);
  };

  const warnMsg = (
    content: string,
    position?: MessagePosition,
    duration?: number
  ) => {
    showMessage("warn", content, position, duration);
  };

  const infoMsg = (
    content: string,
    position?: MessagePosition,
    duration?: number
  ) => {
    showMessage("info", content, position, duration);
  };

  return (
    <MessageContext.Provider value={{ successMsg, errorMsg, warnMsg, infoMsg }}>
      {children}
      {["top-left", "top-right", "center"].map((pos) => (
        <div key={pos} className={`${styles.messageContainer} ${styles[pos]}`}>
          {messages
            .filter((msg) => msg.position === pos)
            .map((msg) => (
              <Message key={msg.id} message={msg} onComplete={removeMessage} />
            ))}
        </div>
      ))}
    </MessageContext.Provider>
  );
};

export const useMessage = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessage must be used within a MessageProvider");
  }
  return context;
};
