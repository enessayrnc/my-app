import React, { useRef, useState } from "react";
import "./listBox.css";
import maplibregl from "maplibre-gl";
import reactDom from "react-dom";

export default function ListBox({
  propsListbox,
  getclickMap,
  save,
  setOpenMessage,
  data22,
  setAcikpopup,
  acikpopup,
  panorama
}) {
  const haritaVeriKaynaginiGuncelle = (veri) => {
    if (getclickMap) {
      getclickMap.getSource("savedparks")?.setData(veri);
    }
  };
  const handleClick = (elem) => {
    if (acikpopup) {
      acikpopup.remove();
    }

    console.log(
      "🚀 ~ file: listBox.js:12 ~ handleClick ~ elem:",
      elem?.geometry?.coordinates
    );
    getclickMap.flyTo({
      center: elem?.geometry?.coordinates,
      zoom: 17,
    });

    
    
      
    
    const popupDiv = document.createElement("div");
    reactDom.render(
      <PopupTest
        popup={elem.properties}
        save={save}
        setOpenMessage={setOpenMessage}
        haritaVeriKaynaginiGuncelle={haritaVeriKaynaginiGuncelle}
        data22={data22}
        getclickMap={getclickMap}
        panorama={panorama}
      />,
      popupDiv
    );
    let popup = new maplibregl.Popup()
      .setLngLat(elem?.geometry?.coordinates)
      .setDOMContent(popupDiv)
      .addTo(getclickMap);
    setAcikpopup(popup);

    getclickMap.on("zoomend", function () {
      var currentZoom = getclickMap.getZoom();

      if (currentZoom <= 12) {
        popup.remove(); // Pop-up'ı kapat
      }
    });
  };
  const panoramaFunc = () => {
    panorama.HidePanoramaFrame()

  }

  return (
    <div className="container">
      {/* <button className="btn-hide">Gizle</button>

      <button className="btn-expand">Genişlet</button> */}

      <label className="label-listbox">
        {propsListbox.length} adet İSPARK görüntülüyorsunuz.
      </label>

      {propsListbox.map((elem) => (
        <>
          <div className="listItem" onClick={() => {handleClick(elem)
          panoramaFunc()}}>
                          <div className="listItem-title">{elem.properties.parkName}</div>

            <div className="rowitem">
              <div className="subtitle">Park ID: </div>
              <div className="values">{elem.properties.parkID}</div>
            </div>
            {/* <div className="rowitem">
              <div className="subtitle">Park Adı: </div>
              <div className="values">{elem.properties.parkName}</div>
            </div> */}
            <div className="rowitem">
              <div className="subtitle">Park Tipi: </div>
              <div className="values">{elem.properties.parkType}</div>
            </div>
            <div className="rowitem">
              <div className="subtitle">Kapasite: </div>
              <div className="values">{elem.properties.capacity}</div>
            </div>

            <div className="rowitem">
              <div className="subtitle">Çalışma Saatleri: </div>
              <div className="values">{elem.properties.workHours}</div>
            </div>
            <div className="rowitem">
              <div className="subtitle">Koordinatlar: </div>
              <div className="values">
                {elem.properties.latitude}, {elem.properties.longitude}
              </div>
            </div>
          </div>
        </>
      ))}
    </div>
  );
}

const PopupTest = ({
  popup,
  save,
  setOpenMessage,
  data22,
  haritaVeriKaynaginiGuncelle,
  getclickMap,
  panorama
}) => {
  const savedItems = JSON.parse(localStorage.getItem("pushitems")) || [];
  const isItemSaved = savedItems.some((item) => item.id === popup.parkID);

  const saveButtonRef = useRef(null);

  const handleSaveClick = (item) => {
    const local = localStorage.getItem("pushitems");
    const localArray = JSON.parse(local) !== null ? JSON.parse(local) : [];

    const localId = localArray.findIndex((elem) => elem.id === item.id);
    if (localId > -1) {
      localArray.splice(localId, 1);
    }

    localArray.push(item);

    localStorage.setItem("pushitems", JSON.stringify(localArray));

    save(localArray);

    saveButtonRef.current.disabled = true;
  };

  const newfunction = () => {
    const local = localStorage.getItem("pushitems");
    const localArray = JSON.parse(local) !== null ? JSON.parse(local) : [];

    getclickMap.getSource("savedparks")?.setData(localArray);
  };
  return (
    <div className="map-popup">
      <div>
        {/* {if(popup.parkID == data22)} */}
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
        <b>Longitude: </b>
        {popup.longitude}
        <br></br>
        <b>Latitude: </b>
        {popup.latitude}
        <br></br>
      </div>
      <div className="btn-group">
        {/* EĞER açılan popup'ın id'si savedparksda(save) var ise disabled olarak gelmeli. */}
        {/* { save.id
          ? () : ()
        }  */}
        <button
          disabled={isItemSaved}
          ref={saveButtonRef}
          className="btn-save"
          onClick={() => {
            setOpenMessage(true);
            handleSaveClick({
              id: popup.parkID,
              name: popup.parkName,
              capacity: popup.capacity,
              workHours: popup.workHours,
              parkType: popup.parkType,
              freeTime: popup.freeTime,
              longitude: popup.longitude,
              latitude: popup.latitude,
            });
            const newData2 = data22.features.push({
              type: "Feature",
              geometry: {
                type: "Point",
                coordinates: [popup.longitude, popup.latitude],
              },
              properties: {
                id: popup.parkID,
                name: popup.parkName,
                capacity: popup.capacity,
                workHours: popup.workHours,
                parkType: popup.parkType,
                freeTime: popup.freeTime,
                longitude: popup.longitude,
                latitude: popup.latitude,
              },
            });
            haritaVeriKaynaginiGuncelle(data22);
            newfunction();
            console.log(data22, "ha bu data22");
          }}
        >
          Kaydet
        </button>

        <button
          className="btn-closee"
          onClick={() =>
            panorama.OpenPanoramaOnLocation(popup.longitude, popup.latitude)
          }
        >
          Sokak Görüntüsü
        </button>
      </div>
    </div>
  );
};
