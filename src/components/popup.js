import React, { useState, useEffect } from "react";
import "./popup.css";

export default function Popup({ text, closePopup, savedParks, id, setParks }) {
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

  return (
    <div className="popup-container">
      <div className="popup-body">
        <h1>{text}</h1>
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
                type="text"
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
                value={updatedValues.freeTime || 0}
              ></input>
            </div>
          </div>
        )}
        <button className="btn-save" onClick={handleSave}>
          Kaydet
        </button>
        <button onClick={closePopup}>Close Popup</button>
      </div>
    </div>
  );
}
