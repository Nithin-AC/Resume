// import React, { useState, useEffect, useRef } from "react";
// import "../index.css";

// function Chatbot({ onClose }) {
//   const [input, setInput] = useState("");
//   const [messages, setMessages] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 700);
//   const messagesEndRef = useRef(null);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 700);
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const stripMarkdown = (text) => {
//     return text
//       .replace(/[*_~`#>]/g, "")
//       .replace(/\*\*(.*?)\*\*/g, "$1")
//       .replace(/\*(.*?)\*/g, "$1")
//       .replace(/_(.*?)_/g, "$1")
//       .replace(/`/g, "")
//       .replace(/\n\s*\n/g, "\n");
//   };
//   const sendMessage = async () => {
//     if (!input.trim()) return;
  
//     const token = localStorage.getItem("token");
//     const newMessages = [...messages, { role: "user", text: input }];
//     setMessages(newMessages);
//     setInput("");
  
//     if (!token) {
//       setMessages((prev) => [
//         ...prev,
//         { role: "model", text: "Please log in to continue." },
//       ]);
//       return;
//     }
  
//     setIsLoading(true);
  
//     try {
//       const res = await fetch("https://resume-4hsf.onrender.com/api/gemini-chat/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ message: input }),
//       });
  
//       const data = await res.json();
//       setIsLoading(false);
//       const cleanedText = stripMarkdown(data.reply || "Server error.");
//       setMessages((prev) => [...prev, { role: "model", text: cleanedText }]);
//     } catch (error) {
//       console.error("Chat error:", error);
//       setIsLoading(false);
//       setMessages((prev) => [...prev, { role: "model", text: "Server error." }]);
//     }
//   };
  

//   const handleKeyDown = (e) => {
//     if (e.key === "Enter") sendMessage();
//   };


//   return (

// <div className={isMobile ? "chatbot-fullscreen" : "chatbot-container"}>
//   {isMobile && (
//     <div className="chatbot-header-bar">
//       <span className="chatbot-back">Hironyx Assistant</span>
//       <span className="chatbot-close-btn" onClick={onClose}>×</span>
//     </div>
//   )}

//   <div className="chatbot-messages">
//     {messages.map((msg, index) => (
//       <div key={index} className={`chatbot-message ${msg.role === "user" ? "user" : "ai"}`}>
//         <div className="chat-message-content">{msg.text}</div>
//       </div>
//     ))}

//     {isLoading && (
//       <div className="chatbot-message ai">
//         <span className="typing-dot"></span>
//       </div>
//     )}

//     <div ref={messagesEndRef} />
//   </div>

//   <div className="chatbot-input-container">
//     <input
//       type="text"
//       placeholder="Type your message..."
//       value={input}
//       onChange={(e) => setInput(e.target.value)}
//       onKeyDown={handleKeyDown}
//     />
//     <button onClick={sendMessage}>➤</button>
//   </div>
// </div>

//   );
// }

// export { Chatbot };
import React, { useState, useEffect, useRef } from "react";
import "../index.css";
import { jwtDecode } from "jwt-decode";

function isTokenExpired(token) {
  try {
    const decoded = jwtDecode(token);
    return decoded.exp < Date.now() / 1000;
  } catch {
    return true;
  }
}

function Chatbot({ onClose }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 700);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 700);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const stripMarkdown = (text) => {
    return text
      .replace(/[*_~`#>]/g, "")
      .replace(/\*\*(.*?)\*\*/g, "$1")
      .replace(/\*(.*?)\*/g, "$1")
      .replace(/_(.*?)_/g, "$1")
      .replace(/`/g, "")
      .replace(/\n\s*\n/g, "\n");
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    let token = localStorage.getItem("token");
    const refresh = localStorage.getItem("refreshtoken");

    if (!token || isTokenExpired(token)) {
      if (refresh && !isTokenExpired(refresh)) {
        try {
          const res = await fetch("https://resume-4hsf.onrender.com/api/token/refresh/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh })
          });
          const data = await res.json();
          if (data.access) {
            token = data.access;
            localStorage.setItem("token", token);
          } else {
            setMessages((prev) => [...prev, { role: "model", text: "Please log in to continue." }]);
            return;
          }
        } catch {
          setMessages((prev) => [...prev, { role: "model", text: "Please log in to continue." }]);
          return;
        }
      } else {
        setMessages((prev) => [...prev, { role: "model", text: "Please log in to continue." }]);
        return;
      }
    }

    const newMessages = [...messages, { role: "user", text: input }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("https://resume-4hsf.onrender.com/api/gemini-chat/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      const cleanedText = stripMarkdown(data.reply || "Server error.");
      setMessages((prev) => [...prev, { role: "model", text: cleanedText }]);
    } catch (error) {
      setMessages((prev) => [...prev, { role: "model", text: "Server error." }]);
    }

    setIsLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className={isMobile ? "chatbot-fullscreen" : "chatbot-container"}>
      {isMobile && (
        <div className="chatbot-header-bar">
          <span className="chatbot-back">Hironyx Assistant</span>
          <span className="chatbot-close-btn" onClick={onClose}>×</span>
        </div>
      )}

      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`chatbot-message ${msg.role === "user" ? "user" : "ai"}`}>
            <div className="chat-message-content">{msg.text}</div>
          </div>
        ))}

        {isLoading && (
          <div className="chatbot-message ai">
            <span className="typing-dot"></span>
          </div>
        )}

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
        <button onClick={sendMessage}>➤</button>
      </div>
    </div>
  );
}

export { Chatbot };
