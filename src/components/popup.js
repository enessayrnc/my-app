import React, { useId, useState } from "react";
import "./popup.css";

export default function Popup({ text, closePopup, savedParks, setid }) {
  const [message, setMessage] = useState("");
  const handleChange = (event) => {
    setMessage(event.target.value);
  };
  

  return (
    <div className="popup-container">
      <div className="popup-body">
        <h1>{text}</h1>
        {savedParks.map(
          (elem) =>
            setid === elem[0].id && ( //setid elem.id'ye eşitse koşulu aşağıdaki divleri oluşturuyor.
              <div className="list-items">
                {/* PARK ID */}
                <div className="input-box">
                  <label>Park ID: </label>
                  <input
                    type="text"
                    id="id"
                    name="id"
                    onChange={handleChange}
                    value={elem[0].id}
                  ></input>
                </div>
                {/* PARK ADI */}
                <div className="input-box">
                  <label>Park Adı: </label>
                  <input
                    type="text"
                    id="id"
                    name="id"
                    onChange={handleChange}
                    value={elem[0].name}
                  ></input>
                </div>
                {/* PARK KAPASİTESİ */}
                <div className="input-box">
                  <label>Kapasite: </label>
                  <input
                    type="text"
                    id="hours"
                    name="hours"
                    onChange={handleChange}
                    value={elem[0].capacity}
                  ></input>
                </div>
                {/* ÇALIŞMA SAATLERİ */}
                <div className="input-box">
                  <label>Çalışma Saatleri: </label>
                  <input
                    type="text"
                    id="hours"
                    name="hours"
                    onChange={handleChange}
                    value={elem[0].workHours}
                  ></input>
                </div>
                {/* PARK TİPİ */}
                <div className="input-box">
                  <label>Park Tipi: </label>
                  <input
                    type="text"
                    id="type"
                    name="type"
                    onChange={handleChange}
                    value={elem[0].parkType}
                  ></input>
                </div>
                {/* ÜCRETSİZ PARK SÜRESİ */}
                <div className="input-box">
                  <label>Ücretsiz Park Süresi: </label>
                  <input
                    type="text"
                    id="freePark"
                    name="freePark"
                    onChange={handleChange}
                    value={elem[0].freeTime}
                  ></input>
                </div>
              </div>
            )
        )}
        <button className="btn-save" onClick={console.log(message, "kaydedilen mesaj")}>
          Kaydet
        </button>
        <button onClick={closePopup}>Close Popup</button>
      </div>
    </div>
  );
}
