import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Message from "./message";

function Chat({ conversation }) {
  const [chatHistory, setChatHistory] = useState([
    { sender: "bot", message: "Hi! How can I help you today?" }
  ]);
  const [question, setQuestion] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleQuestion = async (e) => {
    e.preventDefault();
    if (!question || !conversation) return;

    const updatedChat = [...chatHistory, { sender: "user", message: question }];
    setChatHistory(updatedChat);
    setQuestion("");
    setIsTyping(true);

    try {
      const response = await axios.post("http://127.0.0.1:8000/query/", {
        query: question,
        conversation_id: conversation.id,
      });

      const botMessage = response.data.answer;
      setIsTyping(false);

      let currentText = "";
      let index = 0;

      const interval = setInterval(() => {
        if (index < botMessage.length) {
          currentText += botMessage[index];
          setChatHistory([...updatedChat, { sender: "bot", message: currentText }]);
          index++;
        } else {
          clearInterval(interval);
        }
      }, 20);

    } catch (error) {
      console.error("Error sending question:", error);
      setIsTyping(false);
    }
  };

  return (
    <div className="chat">
      <div className="chat-history" ref={chatRef}>
        {chatHistory.map((msg, index) => (
          <Message key={index} sender={msg.sender} message={msg.message} />
        ))}
        {isTyping && <div className="bot-typing">Bot is typing...</div>}
      </div>
      <form onSubmit={handleQuestion} className="chat-input">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask a question..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chat;
