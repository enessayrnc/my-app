import React from "react";
import "./listBox.css";

export default function ListBox({ propsListbox }) {
  console.log(propsListbox);

  return (
    <div className="container">
      {propsListbox.map((item) => (
        <>
          <div className="listItem">
            {"Park Adı: " + item.properties.parkName}
            <br></br>
            {"Kapasite: " + item.properties.capacity}
            <br></br>
            {"Çalışma Saatleri: " + item.properties.workHours}
          </div>
          <div className="line"></div>
        </>
      ))}
    </div>
  );
}
