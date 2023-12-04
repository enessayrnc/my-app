import React from "react";
import "./message.css";

export default function Message({closeMessage}) {
  return (
    <div className="message-container">
      <div className="message-background"></div>

      <div className="message-content">
        <h2>Onay Mesajı</h2>
        <h4 style={{ color: "green"}}>Kayıt başarıyla gerçekleşti!</h4>
        <button className="btn-save" onClick={closeMessage}>Kapat</button>
      </div>
    </div>
  );
}
