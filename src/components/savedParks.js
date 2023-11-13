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
console.log(savedParks,'savedparks')
  return (
    <div className="parksBox">
      <div className="title"> Kaydettiklerim</div>
      <div className="content">
        {(savedParks).map((elem) => (
          <div className="listItem" >
            {"Park ID: " + elem[0].id }
            <br></br>
            {"Park Adı: " +elem[0].name}
            <br></br>
            {"Kapasite: " +elem[0].capacity}
            <br></br>
            {"Çalışma Saatleri: " +elem[0].workHours}
            <br></br>
            {"Park Tipi: " +elem[0].parkType}
            <br></br>
            {"Ücretsiz Park Süresi: " +elem[0].freeTime}
            <br></br>
            
            {/* <button onClick={()=> itemRemove()}>Sil</button> */}
            <button onClick={() => {setopen(true)
               setid(elem[0].id)} }>Düzenle</button>
           
          </div>
        ))}
      </div>

      <button onClick={() => allClear()}>Tümünü Temizle</button>
    </div>
  );
}
