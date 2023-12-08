import React, { useState, useEffect } from "react";
import "./popup.css";

export default function Popup({ text, closePopup, savedParks, id, setParks, setOpenMessage, getclickMap }) {
  const [updatedValues, setUpdatedValues] = useState(null);

  useEffect(() => {
    const defaultValues = savedParks.find((elem) => id === elem.id);

    setUpdatedValues(defaultValues || {});
  }, [id, savedParks]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // Local storage'dan veriyi al
    const local = localStorage.getItem("pushitems");
    const localArray = JSON.parse(local) !== null ? JSON.parse(local) : [];

    const updatedLocalStorage = localArray.map((elem) => {
      if (elem.id === id) {
        elem = updatedValues;
      }
      return elem
    });

    localStorage.setItem("pushitems", JSON.stringify(updatedLocalStorage));
    setParks(updatedLocalStorage);

    closePopup();
  };


  //test
  const newfunction = () => {
    const local = localStorage.getItem("pushitems");
    const localArray = JSON.parse(local) !== null ? JSON.parse(local) : [];
let geojsonData3 = { type: "FeatureCollection", features: [] };

for (var i = 0; i < localArray.length; i++) {
    geojsonData3.features.push({
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [localArray[i].longitude, localArray[i].latitude],
    },
    properties: {
      parkID: localArray[i].id,
      parkName: localArray[i].name,
      capacity: localArray[i].capacity,
      workHours: localArray[i].workHours,
      parkType: localArray[i].parkType,
      freeTime: localArray[i].freeTime,
      longitude: localArray[i].longitude,
      latitude: localArray[i].latitude,
    },
    
  });
  console.log(localArray, 'geojsondata3')
  

}
    console.log(localArray, "iiii")
    getclickMap.getSource("savedparks").setData(geojsonData3);
  }
//test



  return (
    <div className="popup-container">
      <div className="popup-body">
        <h1>{text}</h1>
        <p className="explain">Kaydettiğiniz parkları burada düzenleyerek kişiselleştirebilirsiniz.</p>
        {updatedValues && (
          <div className="list-items">
            {/* PARK ID */}
            <div className="input-box">
              <label>Park ID: </label>
              <input
                type="text"
                name="id"
                onChange={handleInputChange}
                value={updatedValues.id || ""}
                disabled
              ></input>
            </div>
            {/* PARK ADI */}
            <div className="input-box">
              <label>Park Adı: </label>
              <input
                type="text"
                name="name"
                onChange={handleInputChange}
                value={updatedValues.name || ""}
              ></input>
            </div>
            {/* PARK KAPASİTESİ */}
            <div className="input-box">
              <label>Kapasite: </label>
              <input
                type="number"
                name="capacity"
                onChange={handleInputChange}
                value={updatedValues.capacity || ""}
              ></input>
            </div>
            {/* ÇALIŞMA SAATLERİ */}
            <div className="input-box">
              <label>Çalışma Saatleri: </label>
              <input
                type="text"
                name="workHours"
                onChange={handleInputChange}
                value={updatedValues.workHours || ""}
                disabled
              ></input>
            </div>
            {/* PARK TİPİ */}
            <div className="input-box">
              <label>Park Tipi: </label>
              <input
                type="text"
                name="parkType"
                onChange={handleInputChange}
                value={updatedValues.parkType || ""}
              ></input>
            </div>
            {/* ÜCRETSİZ PARK SÜRESİ */}
            <div className="input-box">
              <label>Ücretsiz Park Süresi: </label>
              <input
                type="number"
                name="freeTime"
                onChange={handleInputChange}
                value={updatedValues.freeTime || ""}
              ></input>
            </div>
          </div>
        )}
        <div className="btn-group">
        <button className="btn-save btn-popup" onClick={() => {
                    setOpenMessage(true);
                    handleSave();
                    newfunction();
                    // setopenpanorama(true)
                    
                  }}>
          Kaydet
        </button>
        <button className="btn-closee btn-popup" onClick={closePopup}>Kapat</button>
        </div>
       
      </div>
    </div>
  );
}
