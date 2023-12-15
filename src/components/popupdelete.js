import React, { useState, useEffect } from "react";
import "./popup.css";

export default function Popupdelete({ text, closePopupDelete, savedParks, id, setParks, setOpenMessage, getclickMap,data22,messageText }) {
  

    const clearItem = (index) => {
        const updatedParks = [...savedParks];
        updatedParks.splice(index, 1);
        setParks(updatedParks);
        localStorage.setItem("pushitems", JSON.stringify(updatedParks));
        console.log(updatedParks, "updateparksssss");
        data22.features = [];
        for (var i = 0; i < updatedParks.length; i++) {
          const newData2 = data22.features.push({
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [updatedParks[i].longitude, updatedParks[i].latitude],
            },
            properties: {
              id: updatedParks[i].parkID,
              name: updatedParks[i].parkName,
              capacity: updatedParks[i].capacity,
              name: updatedParks[i].parkName,
              workHours: updatedParks[i].workHours,
              parkType: updatedParks[i].parkType,
              freeTime: updatedParks[i].freeTime,
              longitude: updatedParks[i].longitude,
              latitude: updatedParks[i].latitude,
            },
          });
          console.log(data22, "newdata2");
        }
        getclickMap.getSource("savedparks")?.setData(data22);
        closePopupDelete()
      };
     
     
    

      
  return (
    <div className="popup-container" >
      <div className="popup-body" style={{left:"30%",right:"30%",bottom:"30%",top:"30%"}}>
        <h1 style={{color:"red"}}>{text}</h1>
        <h5 style={{fontSize:"18px", color:"black", fontWeight:"600"}}>Kaydetmiş olduğunuz parkı silmek üzeresiniz. Devam etmek istiyor musunuz?</h5>
        <div className="btn-group">
        
        <button className="btn-save" style={{width:"100%"}} onClick={()=>{
         setOpenMessage(true);

            clearItem()
        }}>Devam Et</button>

        <button className="btn-closee btn-popup" onClick={closePopupDelete}>İptal</button>
        </div>
       
      </div>
    </div>
    
  );
}
