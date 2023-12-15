import React, { useState, useEffect } from "react";
import "./popup.css";

export default function Popupdelete({ text, closePopupAllDelete, savedParks, id, setParks, setOpenMessage, getclickMap,data22,messageText }) {
  

    const allClear = () => {
        localStorage.setItem("pushitems", "[]");
        setParks([]);
        data22.features = [];
    
        getclickMap.getSource("savedparks")?.setData(data22);
        closePopupAllDelete()

      };
      
  return (
    <div className="popup-container" >
      <div className="popup-body" style={{left:"30%",right:"30%",bottom:"30%",top:"30%"}}>
        <h1 style={{color:"red"}}>{text}</h1>
        <h5 style={{fontSize:"18px", color:"black", fontWeight:"600"}}>Kaydetmiş olduğunuz tüm parkları silmek üzeresiniz. Devam etmek istiyor musunuz?</h5>
        <div className="btn-group">
        
        <button className="btn-save" style={{width:"100%"}} onClick={()=>{
         setOpenMessage(true);
         allClear();

        }}>Devam Et</button>

        <button className="btn-closee btn-popup" onClick={closePopupAllDelete}>İptal</button>
        </div>
       
      </div>
    </div>
    
  );
}
