import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useEffect,
} from "react";
import ReactDOM from "react-dom";
import styles from "./MessageProvider.module.scss";
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
  showMessage: (
    type: MessageType,
    content: string,
    position?: MessagePosition,
    duration?: number
  ) => void;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

let messageId = 0;
let addMessage: (
  type: MessageType,
  content: string,
  position?: MessagePosition,
  duration?: number
) => void;

export const MessageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

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

  // 将 showMessage 赋值给全局的 addMessage，确保全局调用有效
  addMessage = showMessage;

  return (
    <MessageContext.Provider value={{ showMessage }}>
      {children}
      {isBrowser &&
        ReactDOM.createPortal(
          ["top-left", "top-right", "center"].map((pos) => (
            <div
              key={pos}
              className={`${styles.messageContainer} ${styles[pos]}`}
            >
              {messages
                .filter((msg) => msg.position === pos)
                .map((msg) => (
                  <Message
                    key={msg.id}
                    message={msg}
                    onComplete={removeMessage}
                  />
                ))}
            </div>
          )),
          document.body
        )}
    </MessageContext.Provider>
  );
};

// 定义 useMessage 钩子，允许在 React 组件中访问上下文
export const useMessage = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessage must be used within a MessageProvider");
  }
  return context;
};

// 直接暴露全局 message 对象，像 antd 的 message.error 一样调用
export const message = {
  success: (
    content: string,
    position: MessagePosition = "top-right",
    duration: number = 3000
  ) => addMessage && addMessage("success", content, position, duration),
  error: (
    content: string,
    position: MessagePosition = "top-right",
    duration: number = 3000
  ) => addMessage && addMessage("error", content, position, duration),
  warn: (
    content: string,
    position: MessagePosition = "top-right",
    duration: number = 3000
  ) => addMessage && addMessage("warn", content, position, duration),
  info: (
    content: string,
    position: MessagePosition = "top-right",
    duration: number = 3000
  ) => addMessage && addMessage("info", content, position, duration),
};
