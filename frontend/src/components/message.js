import React from "react";

function Message({ sender, message }) {
  return (
    <div className={`chat-message ${sender}`}>
      <div className="avatar">
        <img
          src={
            sender === "user"
              ? "https://png.pngtree.com/png-vector/20190321/ourmid/pngtree-vector-users-icon-png-image_856952.jpg"
              : "https://cdn-icons-png.flaticon.com/512/6134/6134346.png"
          }
          alt={sender}
        />
      </div>
      <div className="message" style={{ whiteSpace: "pre-wrap", lineHeight: "1.8" }}>
        {message}
      </div>
    </div>
  );
}

export default Message;
