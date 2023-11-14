import React from "react";
import "./savedParks.css";


export default function SavedParks({ savedParks, setParks, setopen, setid }) {
  const allClear = () => {
    localStorage.setItem("pushitems", "[]");
    setParks([]);
  };
//   const itemRemove = ()=>{
// localStorage.removeItem("pushitems","[]")   
    
//   }

  return (
    <div className="parksBox">
      <div className="title"> Kaydettiklerim</div>
      <div className="content">
        {(savedParks).map((elem) => (
          <div className="listItem" >
            {"Park ID: " + elem.id }
            <br></br>
            {"Park Adı: " +elem.name}
            <br></br>
            {"Kapasite: " +elem.capacity}
            <br></br>
            {"Çalışma Saatleri: " +elem.workHours}
            <br></br>
            {"Park Tipi: " +elem.parkType}
            <br></br>
            {"Ücretsiz Park Süresi: " +elem.freeTime}
            <br></br>
            
            {/* <button onClick={()=> itemRemove()}>Sil</button> */}
            <button onClick={() => {setopen(true)
               setid(elem.id)} }>Düzenle</button>
           
          </div>
        ))}
      </div>

      <button onClick={() => allClear()}>Tümünü Temizle</button>
    </div>
  );
}
