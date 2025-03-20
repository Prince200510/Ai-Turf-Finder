import React, { useState, useEffect, useRef } from "react";
import "./css/ChatBot.css";
import { IoMdSend } from "react-icons/io";
import { FaCommentDots } from "react-icons/fa";
import axios from "axios";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! Ask me anything about turf! 🌱" },
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  const handleSend = async () => {
    if (input.trim() === "") return;
    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);
    try {
      const response = await axios.post("http://localhost:5000/chat-bot/", {
        query: input,
      });
      const botReply = { sender: "bot", text: response.data.response };
      setMessages((prev) => [...prev, botReply]);
    } catch (error) {
      console.error("❌ Error fetching AI response:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Error processing your request!" },
      ]);
    }
    setInput("");
  };
  const handleCloseChat = () => {
    setIsOpen(false);
    setMessages([{ sender: "bot", text: "Hello! Ask me anything about turf! 🌱" }]);
  };

  return (
    <>
      <div className="chat-icon" onClick={() => setIsOpen(!isOpen)}>
        <FaCommentDots size={24} />
      </div>
      {isOpen && (
        <div className="chat-container">
          <div className="chat-header">
            <h3>💬 Chat with Turf Bot</h3>
            <button onClick={handleCloseChat}>✖️</button>
          </div>
          <div className="chat-body">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`chat-message ${msg.sender === "user" ? "user" : "bot"}`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <div className="chat-footer">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button onClick={handleSend}>
              <IoMdSend size={20} />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
