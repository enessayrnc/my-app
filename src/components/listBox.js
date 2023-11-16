import React, { useState } from "react";
import "./listBox.css";
import maplibregl from "maplibre-gl";
import reactDom from "react-dom";

export default function ListBox({ propsListbox, getclickMap, setItems }) {
  // console.log(getclickMap);

  const [enes, setEnes] = useState();

  const handleClick = (elem) => {
    console.log("🚀 ~ file: listBox.js:12 ~ handleClick ~ elem:", elem)
    getclickMap.flyTo({
      center: elem?.geometry?.coordinates,
      zoom: 15,
    });

    const popupDiv = document.createElement("div");
    reactDom.render(
      <PopupTest popup={elem.properties} setItems={setItems} />,
      popupDiv
    );
    let popup = new maplibregl.Popup()
      .setLngLat(elem?.geometry?.coordinates)
      .setDOMContent(popupDiv)
      .addTo(getclickMap);
    setEnes(popup);

    if (enes) {
      enes.remove();
    }
  };
  return (
    <div className="container">
      <div className="title">İspark Otopark Listesi</div>
      {propsListbox.map((elem) => (
        <>
          <div className="listItem" onClick={() => handleClick(elem)}>
            {"Park Adı: " + elem.properties.parkName}
            <br></br>
            {"Park Tipi: " + elem.properties.parkType}
            <br></br>

            {"Kapasite: " + elem.properties.capacity}
            <br></br>
            {"Çalışma Saatleri: " + elem.properties.workHours}
          </div>
        </>
      ))}
    </div>
  );
}

const PopupTest = ({ popup, setItems }) => {
  return (
    <div>
      <div>
        <b>Park ID: </b>
        {popup.parkID}
        <br></br>
        <b>Park Adı: </b>
        {popup.parkName}
        <br></br>
        <b>Kapasite: </b>
        {popup.capacity}
        <br></br>
        <b>Çalışma Saatleri: </b>
        {popup.workHours}
        <br></br>
        <b>Park Tipi: </b>
        {popup.parkType}
        <br></br>
        <b>Ücretsiz Park Süresi: </b>
        {popup.freeTime}
        <br></br>
      </div>
      <button
        onClick={() =>
          setItems({
            id: popup.parkID,
            name: popup.parkName,
            capacity: popup.capacity,
            name: popup.parkName,
            workHours: popup.workHours,
            parkType: popup.parkType,
            freeTime: popup.freeTime,
          })
        }
      >
        Kaydet
      </button>
    </div>
  );
};
