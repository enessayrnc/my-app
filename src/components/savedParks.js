import React from "react";
import "./savedParks.css";

export default function SavedParks({ savedParks, setParks }) {
  const allClear = () => {
    localStorage.setItem("pushitems", "[]");
    setParks([])
  };
  // const itemRemove = ()=>{
  //   getclickMaps.clear()
  // }

  return (
    <div className="parksBox">
      <div className="title"> Kaydettiklerim</div>
      <div className="content">
      {savedParks.map((elem) => (
        <div
          className="listItem"
          //  onClick={() => itemRemove(elem)}
        >
          {"Park Adı: " + elem}
          <br></br>
        </div>
      ))}
      </div>
      
      <button onClick={() => allClear()}>Temizle</button>
    </div>
  );
}
