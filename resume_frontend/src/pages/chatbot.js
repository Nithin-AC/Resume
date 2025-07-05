import React, { useState, useEffect, useRef } from "react";
import "../index.css"; 

function Chatbot({ onClose }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("https://resume-4hsf.onrender.com/api/gemini-chat/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      if (data.reply) {
        setMessages((prev) => [...prev, { role: "model", text: data.reply }]);
      } else {
        setMessages((prev) => [...prev, { role: "model", text: "Kindly log in to begin your conversation."}]);
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [...prev, { role: "model", text: "Server error." }]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chatbot-message ${msg.role === "user" ? "user" : "ai"}`}
          >
            <strong>{msg.role === "user" ? "You" : "Hironyx AI"}:</strong> {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="chatbot-input-container">
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button  onClick={sendMessage}>➤</button>
      </div>
    </div>
  );
}

export { Chatbot };
