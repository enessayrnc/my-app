import React from "react";
import "./layermanager.css";

export default function LayerManager({}) {
  return (
    <div className="manager-container">
      <div className="checkbox-content">
        <label>Tüm İsparklar</label>
        <input type="checkbox"></input>
      </div>

      <div className="checkbox-content">
        <label>Kaydettiklerim</label>
        <input  type="checkbox"></input>
      </div>
    </div>
  );
}
