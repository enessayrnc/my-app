import React, { useRef, useState } from "react";
import "./savedParks.css";
import maplibregl from "maplibre-gl";

import reactDom from "react-dom";

export default function SavedParks({
  savedParks,
  setParks,
  setopen,
  setid,
  getclickMap,
  data22,
  setOpenMessage,
  setAcikpopup,
  acikpopup,
  panorama,
  setopendelete,
  setopenalldelete,
}) {
  const [isShown, setIsShown] = useState(true);

  const haritaVeriKaynaginiGuncelle = (veri) => {
    if (getclickMap) {
      getclickMap.getSource("savedparks")?.setData(veri);
    }
  };

  const handleClicks = (event) => {
    setIsShown((current) => !current);
  };

  const handleClick = (elem) => {
    if (acikpopup) {
      acikpopup.remove();
    }
    console.log(
      "🚀 ~ file: listBox.js:12 ~ handleClick ~ elem:",
      elem.latitude
    );

    const popupDiv = document.createElement("div");
    reactDom.render(
      <PopupTest
        popup={elem}
        setParks={setParks}
        setOpenMessage={setOpenMessage}
        haritaVeriKaynaginiGuncelle={haritaVeriKaynaginiGuncelle}
        data22={data22}
        panorama={panorama}
      />,
      popupDiv
    );
    const lat = elem.latitude;
    const lon = elem.longitude;
    console.log(elem, "ne bu");
    const coordinatess = [lon, lat];

    let popup = new maplibregl.Popup()
      .setLngLat(coordinatess)
      .setDOMContent(popupDiv)
      .addTo(getclickMap);
    setAcikpopup(popup);
    getclickMap.flyTo({
      center: coordinatess,
      zoom: 17,
    });
    getclickMap.on("zoomend", function () {
      var currentZoom = getclickMap.getZoom();

      if (currentZoom <= 12) {
        popup.remove(); // Pop-up'ı kapat
      }
    });
  };
  const panoramaFunc = () => {
    panorama.HidePanoramaFrame();
  };
  return (
    <>
      {isShown && (
        <div className="parksBox">
          <div className="title">
            {" "}
            Kaydettiklerim
            <div className="label-listbox">
              {savedParks.length} adet park kayıtlı.
            </div>
          </div>
          <div className="content">
            {savedParks.length > 0 ? (
              savedParks.map((elem, index) => (
                <div
                  className="listItem"
                  style={{ alignItems: "start" }}
                  onClick={() => {
                    handleClick(elem);
                    panoramaFunc();
                  }}
                >
                  {/* {"Park ID: " + elem.id}
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
                  {"Boylam: " + elem.longitude}
                  <br></br>
                  {"Enlem: " + elem.latitude}
                  <br></br> */}
                  <div>
                    <b>{"Park ID: "}</b>
                    {elem.id}
                  </div>
                  <div>
                    {" "}
                    <b>{"Park Adı: "}</b> {elem.name}
                  </div>
                  <div>
                    {" "}
                    <b>{"Kapasite: "}</b> {elem.capacity}
                  </div>

                  <div>
                    {" "}
                    <b>{"Çalışma Saatleri: "}</b> {elem.workHours}
                  </div>

                  <div>
                    {" "}
                    <b>{"Ücretsiz Park Süresi: "}</b> {elem.parkType}
                  </div>

                  <div>
                    {" "}
                    <b>{"Boylam: "}</b>{" "}
                    {elem.longitude }
                  </div>
                  <div>
                    {" "}
                    <b>{"Enlem: "}</b>{" "}
                    {elem.latitude }
                  </div>
                  <div className="btn-group">
                    <button
                      className="btn-save"
                      style={{ width: "100%" }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setopen(true);
                        // setopenpanorama(true)
                        setid(elem.id);
                        if (acikpopup) {
                          acikpopup.remove();
                        }
                        panoramaFunc();
                      }}
                    >
                      Düzenle
                    </button>

                    <button
                      className="btn-closee btn-delete"
                      style={{ width: "100%", backgroundColor: "white" }}
                      onClick={(e) => {
                        // clearItem(index);
                        e.stopPropagation();
                        setopendelete(true);

                        if (acikpopup) {
                          acikpopup.remove();
                        }
                      }}
                    >
                      Sil
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <h5
                className="no-records-message"
                style={{ color: "red", position: "absolute", top: "175px",  textAlign:"center" }}
              >
                Henüz bir park kaydetmediniz!
              </h5>
            )}
          </div>
          <div className="savedparks-footer">
            {savedParks.length > 0 && (
              <button
                className="btn-closee btn-all-clear"
                onClick={() => {
                  // allClear();
                  // getSources();
                  setopenalldelete(true);

                  if (acikpopup) {
                    acikpopup.remove();
                  }
                }}
              >
                Tümünü Temizle
              </button>
            )}
          </div>
        </div>
      )}

      <div className="show-hide-buttons">
        <button className="show-hide-button btn-save" onClick={handleClicks}>
          Kaydettiklerim ({savedParks.length})
        </button>
      </div>
    </>
  );
}

const PopupTest = ({
  popup,
  setParks,
  setOpenMessage,
  data22,
  haritaVeriKaynaginiGuncelle,
  panorama,
}) => {
  const savedItems = JSON.parse(localStorage.getItem("pushitems")) || [];
  const isItemSaved = savedItems.some((item) => item.id === popup.id);

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

    setParks(localArray);

    saveButtonRef.current.disabled = true;
  };
  return (
    <div className="map-popup">
      <div>
        <b>Park ID: </b>
        {popup.id}
        <br></br>
        <b>Park Adı: </b>
        {popup.name}
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
        <button
          disabled={isItemSaved}
          ref={saveButtonRef}
          className="btn-save"
          onClick={() => {
            setOpenMessage(true);
            handleSaveClick({
              id: popup.id,
              name: popup.name,
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
                id: popup.id,
                name: popup.name,
                capacity: popup.capacity,
                workHours: popup.workHours,
                parkType: popup.parkType,
                freeTime: popup.freeTime,
                longitude: popup.longitude,
                latitude: popup.latitude,
              },
            });
            haritaVeriKaynaginiGuncelle(data22);
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
