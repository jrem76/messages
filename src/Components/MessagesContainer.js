import React, { useState, useEffect, useCallback } from "react";

import { MessageItem } from "./MessageItem";
import { MessageForm } from "./MessageForm";

import "./styles/MessagesContainer.css";
/**
 * Component to store messages.
 *
 */

export const MessagesContainer = () => {
  const [messages, setMessages] = useState([]);

  const getMessages = useCallback(async () => {
    await fetch("http://localhost:8000/messages")
      .then((response) => response.json())
      .then((data) => {
        // reverse is used to show latest messages in first.
        setMessages(data.reverse());
      });
  }, []);

  const addMessage = async (newMessage) => {
    setMessages([
      {
        ...newMessage,
        id: messages.length,
      },
      ...messages,
    ]);

    // Save API should be here
  };

  // getMessages to Init component.
  useEffect(() => {
    getMessages();
  }, [getMessages]);

  return (
    <div>
      <MessageForm submitForm={addMessage} />
      {messages && (
        <div data-testid="messagesContainer">
          {messages.length !== 0 && (
            <div className="messagesContainer__list">
              <h3> Messages in DB {messages.length}</h3>
              {messages.map((message) => (
                <MessageItem
                  key={`message-${message.id}`}
                  message={message.message}
                  isPrivate={message.isPrivate}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
