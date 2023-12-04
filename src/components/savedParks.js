import React, { useState } from "react";
import "./savedParks.css";

export default function SavedParks({ savedParks, setParks, setopen, setid, getclickMap, data22 }) {
  const [isShown, setIsShown] = useState(true);

  const allClear = () => {
    localStorage.setItem("pushitems", "[]");
    setParks([]);
    data22.features = []

    getclickMap.getSource("savedparks")?.setData(data22);

  };

  // const haritaVeriKaynaginiGuncelle = (veri) => {
  //   if (getclickMap) {
  //     getclickMap.getSource("savedparks")?.setData(newData2);
  //   }
  // };
  const clearItem = (index) => {
    const updatedParks = [...savedParks];
     updatedParks.splice(index, 1);
    setParks(updatedParks);
    localStorage.setItem("pushitems", JSON.stringify(updatedParks));
    console.log(updatedParks,'updateparksssss')
data22.features = []
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
    })
  }
    getclickMap.getSource("savedparks")?.setData(data22);



  };
  

  const handleClicks = (event) => {
    // 👇️ toggle shown state
    setIsShown((current) => !current);
  };
  const getSources = () => {
    getclickMap.getSource("savedparks")?.setData(data22);

  };
  return (
    <>
      {isShown && (
        <div className="parksBox">
          <div className="title"> Kaydettiklerim</div>
          <div className="content">

          {savedParks.length > 0 ? (
            savedParks.map((elem, index) => (
              <div className="listItem">
                {"Park ID: " + elem.id}
                <br></br>
                {"Park Adı: " + elem.name}
                <br></br>
                {"Kapasite: " + elem.capacity}
                <br></br>
                {"Çalışma Saatleri: " + elem.workHours}
                <br></br>
                {"Park Tipi: " + elem.parkType}
                <br></br>
                {"Ücretsiz Park Süresi: " + elem.freeTime}
                <br></br>
                {"Longitude: " + elem.longitude}
                <br></br>
                {"Latitude: " + elem.latitude}
                <br></br>
                <div className="btn-group">
                 

                  <button
                    className="btn-save" style={{ width: "100%"}}
                    onClick={() => {
                      setopen(true);
                      // setopenpanorama(true)
                      setid(elem.id);
                    }}
                  >
                    Düzenle
                  </button>

                  <button
                    className="btn-closee btn-delete" style={{ width: "100%", backgroundColor:"white"}}
                    onClick={() => clearItem(index)}
                  >
                    Sil
                  </button>
                </div>
              </div>
            ))
          ) : (
            <h5 className="no-records-message" style={{ color: "red"}}> 
              Henüz bir park kaydetmediniz!
            </h5>
          )}

            
          </div>
          {savedParks.length > 0 && (
            <button
              className="btn-closee btn-all-clear"
              onClick={() =>{allClear()
              getSources()
            } 
              
            }

            >
              Tümünü Temizle
            </button>
          )}
        </div>
      )}

      <div className="show-hide-buttons">
        <button className="show-hide-button btn-save" onClick={handleClicks}>
          Kaydettiklerim
        </button>
        {/* <button>Genişlet</button> */}
      </div>
    </>
  );
}
