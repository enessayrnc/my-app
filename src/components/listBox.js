import React, { useState } from "react";
import "./listBox.css";
import maplibregl from "maplibre-gl";

export default function ListBox({ propsListbox, getclickMap }) {
  // console.log(getclickMap);

  const [enes, setEnes] = useState();

  const handleClick = (elem) => {
    getclickMap.flyTo({
      center: elem?.geometry?.coordinates,
      zoom: 15,
    });

    if (enes) {
      
      enes.remove();

    }
    let popup = new maplibregl.Popup()
      .setLngLat(elem?.geometry?.coordinates)
      .setHTML(
        "<b>Park ID: </b>" +
          elem?.properties?.parkID +
          "<br>" +
          "<b>Park Adı: </b>" +
          elem?.properties?.parkName +
          "<br>" +
          "<b>Kapasite: </b>" +
          elem?.properties?.capacity +
          "<br>" +
          "<b>Çalışma Saatleri: </b>" +
          elem?.properties?.workHours +
          "<br>" +
          "<b>Park Tipi: </b>" +
          elem?.properties?.parkType +
          "<br>" +
          "<b>Ücretsiz Park Süresi: </b>" +
          elem?.properties?.freeTime +
          " dk" +
          "<br>" +
          "<b>İlçe: </b>" +
          elem?.properties?.district
      )
      .addTo(getclickMap);
    setEnes(popup);

  
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
