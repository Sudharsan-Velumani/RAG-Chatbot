import React, { useState } from "react";
import FileUpload from "./components/upload";
import Chat from "./components/chatbot";
import "./App.css";

function App() {
  const [chatHistory, setChatHistory] = useState([]);
  const [conversation, setConversation] = useState(null);

  return (
    <div className="app">
      <header className="header">
        <h1> RAG-ChatBot📚</h1>
      </header>
      <div className="main">
        <div className="sidebar">
          <FileUpload setConversation={setConversation} />
        </div>
        <div className="chat-wrapper">
          <div className="chat-container">
            <Chat chatHistory={chatHistory} setChatHistory={setChatHistory} conversation={conversation} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
