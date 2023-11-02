import React from "react";
import "./listBox.css";
import maplibregl from "maplibre-gl";


export default function ListBox({ propsListbox, getclickMap }) {
  console.log(getclickMap);

  const hanleClick=(elem)=>{

    getclickMap.flyTo({
      center: elem?.geometry?.coordinates,
      zoom: 15,
    })
         let popup=new maplibregl.Popup()
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
          
        //   if (popup.isOpen()) {

        //     popup.remove();
        
        // } else {
        
        //     // popup.addTo(this.refMapboxMap.current.map.map);
        
        //     popup.addTo(getclickMap);
        // }
  
  }
  return (
    <div className="container">
      {propsListbox.map((elem) => (
        <>
          <div
            className="listItem"
            onClick={() =>hanleClick(elem)
              
         
          }
            
            

            
          >
            {"Park Adı: " + elem.properties.parkName}
            <br></br>
            {"Park Tipi: " + elem.properties.parkType}
            <br></br>

            {"Kapasite: " + elem.properties.capacity}
            <br></br>
            {"Çalışma Saatleri: " + elem.properties.workHours}
          </div>
          <div className="line"></div>
        </>
      ))}
    </div>
  );
}
