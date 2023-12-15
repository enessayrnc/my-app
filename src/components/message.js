import React from "react";
import "./message.css";

export default function Message({closeMessage,messageText}) {
  return (
    <div className="message-container">
      <div className="message-background"></div>

      <div className="message-content">
        <h1 style={{ color: "green"}}>Onay!</h1>
        <h5 style={{ color: "black"}}>İşlem başarıyla gerçekleşti.</h5>
        <button className="btn-save" onClick={closeMessage}>Kapat</button>
      </div>
    </div>
  );
}
