import React, { useRef, useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./map.css";
import images from "../location-dot-duotone (1).png";
import images2 from "../location-dot-duotone (3).png";

import reactDom from "react-dom";

export default function Map(props) {
  const mapContainer = useRef(null);
  const [lng] = useState(29.068335);
  const [lat] = useState(41.110069);
  const [zoom] = useState(8.8);
  const [data, setData] = useState();
  const [items, setItems] = useState(null);
  const [data2, setData2] = useState();
  const [maps, setMaps] = useState();

  //veriye istek atma
  useEffect(() => {
    fetch("https://api.ibb.gov.tr/ispark/Park")
      .then((response) => response.json())
      .then((jsonData) => {
        // console.log(jsonData);

        //json verisini geojson'a manipüle etme
        let geojsonData = { type: "FeatureCollection", features: [] };
        for (var i = 0; i < jsonData.length; i++) {
          geojsonData.features.push({
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [jsonData[i].lng, jsonData[i].lat],
            },
            properties: {
              parkID: jsonData[i].parkID,
              parkName: jsonData[i].parkName,
              capacity: jsonData[i].capacity,
              workHours: jsonData[i].workHours,
              parkType: jsonData[i].parkType,
              freeTime: jsonData[i].freeTime,
              district: jsonData[i].district,
              latitude: jsonData[i].lat,
              longitude: jsonData[i].lng,
            },
          });
        }

        setData(geojsonData); //geojsonData'ya veriler eklendi. Ve state'ddeki durumu değişti
        console.log(geojsonData, "gejsondata ilk");

        props.propsMap(geojsonData.features); //tüm veri list box'a gönderildi
        const local = localStorage.getItem("pushitems");
        const localArray = JSON.parse(local) !== null ? JSON.parse(local) : [];
        localStorage.setItem("pushitems", JSON.stringify(localArray));

        props.save(localArray);
      });
    //newgejson oluşturuyor
    let geojsonData2 = { type: "FeatureCollection", features: [] };
    const local = localStorage.getItem("pushitems");
    const localArray = JSON.parse(local) !== null ? JSON.parse(local) : [];
    console.log(localArray, "localarray");
    for (var i = 0; i < localArray.length; i++) {
      geojsonData2.features.push({
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
          latitude: localArray[i].latitude,
          longitude: localArray[i].longitude,
        },
      });
    }
    setData2(geojsonData2);
    props.data22(geojsonData2);
  }, []);

  useEffect(() => {
    if (!data) return; // harıtayı data olmadığında boş dönderir. İlk anda veri olmadığı için hataya düşmesini engelliyor.
    console.log("harita oluştu");
    const map = new maplibregl.Map({
      //   container: mapContainer.current,
      container: "map",
      style: "http://10.6.129.36/map/root_cbs.json",
      // style:
      //   "https://tiles.basemaps.cartocdn.com/gl/positron-gl-style/style.json",
      center: [lng, lat],
      zoom: zoom,
      minZoom: 8.8,
    });
    props.clickMap(map);
    map.addControl(new maplibregl.NavigationControl());

    // -----geojsonı haritada gösterme-------
    map.on("load", () => {
      props.panorama.ConfigureMapLibreMap(map, maplibregl);
      // console.log(props.panorama, 'lütfü')
      // Add an image to use as a custom marker

      map.loadImage(images, (error, image) => {
        if (error) throw error;
        map.addImage("custom-marker", image);

        map.addSource("places", {
          type: "geojson",
          data: data,
        });

        // Add a symbol layer
        map.addLayer({
          id: "places",
          type: "symbol",
          source: "places",
          size: "24px",
          layout: {
            "icon-image": "custom-marker",
            "icon-allow-overlap": true,
            "icon-anchor": "top",
          },
        });
      });

      //savedparks layers added
      map.loadImage(images2, (error, image2) => {
        if (error) throw error;
        map.addImage("custom-marker-saved", image2);

        const local = localStorage.getItem("pushitems");
        const localArray = JSON.parse(local) !== null ? JSON.parse(local) : [];

        // Add an image to use as a custom marker
        map.addSource("savedparks", {
          type: "geojson",
          data: data2, // Kaydedilmiş park noktalarını temsil eden GeoJSON verisini kullanın
        });
        console.log(localArray, "localarray");

        // Add a symbol layer
        map.addLayer({
          id: "savedparks",
          type: "symbol",
          source: "savedparks",
          size: "24px",
          layout: {
            "icon-image": "custom-marker-saved",
            "icon-allow-overlap": true,
            "icon-anchor": "top",
          },
        });
      });

      map.setPaintProperty("yapi_layer", "fill-extrusion-height", [
        "case",
        ["boolean", ["feature-state", "click"], false],
        ["get", "zemin_ustu_kat_sayisi"],
        0,
      ]);
    });

    const haritaVeriKaynaginiGuncelle = (veri) => {
      if (map) {
        map.getSource("savedparks")?.setData(veri);
      }
    };

    //yükseklik değiştirme
    let clickENes = null;
    const changeHeight = (e) => {
      console.log(clickENes);
      if (e.features.length > 0) {
        console.log(
          "🚀 ~ file: map.js:107 ~ changeHeight ~ clickedId:",
          clickENes
        );
        if (clickENes) {
          map.setFeatureState(
            { source: "yapi", sourceLayer: "yapi", id: clickENes },
            { click: false }
          );
        }

        map.setFeatureState(
          { source: "yapi", sourceLayer: "yapi", id: e.features[0].id },
          { click: true }
        );
        map.flyTo({
          pitch: 40,
          // zoom: 17,
        });
        console.log(
          "🚀 ~ file: map.js:115 ~ changeHeight ~ e.features[0].id:",
          e.features[0].id
        );
        clickENes = e.features[0].id;
      }
    };

    //yükseklikleri sıfırlama
    const clearHeight = (e) => {
      const clickPoint = map.queryRenderedFeatures(e.point);
      if (clickPoint[0].layer.id !== "yapi_layer") {
        console.log("adsbhfıcbdsıhvbj");
        if (clickENes) {
          map.setFeatureState(
            { source: "yapi", sourceLayer: "yapi", id: clickENes },
            { click: false }
          );
        }
        clickENes = null;
      }
    };

    map.on("click", "yapi_layer", changeHeight);
    map.on("click", "yapi_layer", clearHeight);

    map.on("click", (e) => {
      let feature;
      const renderedFeatures = e.target.queryRenderedFeatures(e.point);
      console.log(renderedFeatures)
      const savedParkFeatures = renderedFeatures.filter(
        (x) => x.layer.id === "savedparks"
      );
      if (savedParkFeatures.length > 0) {
        feature = savedParkFeatures[0];
      } else {
        const placesFeatures = renderedFeatures.filter(
          (x) => x.layer.id === "places"
        );
        if (placesFeatures.length > 0) {
          feature = placesFeatures[0];
        } else {
          return;
        }
      }
      const coordinates = feature.geometry.coordinates.slice();

      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }
      if (!props.acikpopup) { 
        props.panorama.HidePanoramaFrame(e)
        
      }
      
      const popupDiv = document.createElement("div");

      reactDom.render(
        <PopupTest
          setOpenMessage={props.setOpenMessage}
          save={props.save}
          popup={feature.properties}
          setItems={setItems}
          maps={maps}
          data2={data2}
          haritaVeriKaynaginiGuncelle={haritaVeriKaynaginiGuncelle}
          panorama={props.panorama}
        />,
        popupDiv
      );

      let popup = new maplibregl.Popup()
        .setLngLat(coordinates)
        .setDOMContent(popupDiv)
        .addTo(map);
      props.setAcikpopup(popup);

      if (props.acikpopup) {
        props.acikpopup.remove();
      }

      map.on("zoomend", function () {
        var currentZoom = map.getZoom();

        if (currentZoom <= 10) {
          popup.remove(); // Pop-up'ı kapat
        }
      });
    });


    //noktaya tıklandığında haritanın merkezine orayı alarak zoom seviyesini 15 yapar
    map.on("click", "places", (e) => {
      map.flyTo({
        center: e.features[0].geometry.coordinates,
        zoom: 17,
      });
    });

    // mouse bir noktaya geldiğinde ve ayrıldığında cursor değişimleri
    map.on("mouseenter", "places", () => {
      map.getCanvas().style.cursor = "pointer";
    });

    map.on("mouseleave", "places", () => {
      map.getCanvas().style.cursor = "";
    });

    // Render edilen feature sayısı
    map.on("moveend", "places", (e) => {
      const features = map.queryRenderedFeatures(e.features[0], {
        layers: ["places"],
      });

      props.propsMap(features);
    });
    setMaps(map);

    return () => {
      map.remove();
    };
  }, [data]);

  useEffect(() => {
    if (!items) return;
    const local = localStorage.getItem("pushitems");
    console.log(local, "local");
    const localArray = JSON.parse(local) !== null ? JSON.parse(local) : [];

    const localId = localArray.findIndex((elem) => elem.id === items.id);
    if (localId > -1) {
      localArray.splice(localId, 1);
    }

    localArray.push(items);

    localStorage.setItem("pushitems", JSON.stringify(localArray));

    props.save(localArray);
  }, [items]);

  const [checkedOne, setCheckedOne] = useState(true);
  const [checkedTwo, setCheckedTwo] = useState(true);

  useEffect(() => {
    if (!maps) return;

    if (maps.getLayer("places")) {
      if (checkedOne) {
        maps.setLayoutProperty("places", "visibility", "visible");
      } else {
        maps.setLayoutProperty("places", "visibility", "none");
      }
    }
    if (!maps) return;

    if (maps.getLayer("savedparks")) {
      if (checkedTwo) {
        maps.setLayoutProperty("savedparks", "visibility", "visible");
      } else {
        maps.setLayoutProperty("savedparks", "visibility", "none");
      }
    }
  }, [maps, checkedOne, checkedTwo]);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" id="map" />

      <div className="manager-container">
        <div className="manager-title">Katman Yöneticisi</div>
        <div className="vertical-line"></div>

        <div className="checkbox-box">
          <div className="checkbox-content">
            <div className="labels">Tüm İsparklar</div>
            <input
              type="checkbox"
              id="all-parks"
              checked={checkedOne}
              onChange={() => setCheckedOne(!checkedOne)}
            ></input>
          </div>

          <div className="checkbox-content">
            <div className="labels">Kaydettiklerim</div>
            <input
              type="checkbox"
              id="my-saved"
              checked={checkedTwo}
              onChange={() => setCheckedTwo(!checkedTwo)}
            ></input>
          </div>
        </div>
      </div>
    </div>
  );
}
const PopupTest = ({
  popup,
  setOpenMessage,
  save,
  data2,
  haritaVeriKaynaginiGuncelle,
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
  // const getSources = () => {
  //   maps.getSource("pushitems").setData(data2);

  // };
  const veriKaynaginiAl = () => {
    console.log("data2 aldım verdim bu nedir?", data2);
    haritaVeriKaynaginiGuncelle(data2); // Harita veri kaynağını güncellemek için fonksiyonu çağırın
  };
  console.log(data2, "data2");
  return (
    <div className="map-popup">
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
              id: popup.parkID,
              name: popup.parkName,
              capacity: popup.capacity,
              workHours: popup.workHours,
              parkType: popup.parkType,
              freeTime: popup.freeTime,
              longitude: popup.longitude,
              latitude: popup.latitude,
            });
            const newData2 = data2.features.push({
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
            haritaVeriKaynaginiGuncelle(data2);
            console.log("data2 aldım verdim bu nedir?", popup);
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

//kaydedilenler popup
// const PopupTestSaved = ({
//   popup,
//   setOpenMessage,
//   save,
//   data2,
//   haritaVeriKaynaginiGuncelle,
// }) => {
//   const savedItems = JSON.parse(localStorage.getItem("pushitems")) || [];
//   const isItemSaved = savedItems.some((item) => item.id === popup.parkID);
//   const saveButtonRef = useRef(null);

//   const handleSaveClick = (item) => {
//     const local = localStorage.getItem("pushitems");
//     const localArray = JSON.parse(local) !== null ? JSON.parse(local) : [];

//     const localId = localArray.findIndex((elem) => elem.id === item.id);
//     if (localId > -1) {
//       localArray.splice(localId, 1);
//     }

//     localArray.push(item);

//     localStorage.setItem("pushitems", JSON.stringify(localArray));

//     save(localArray);

//     saveButtonRef.current.disabled = true;
//   };
//   // const getSources = () => {
//   //   maps.getSource("pushitems").setData(data2);

//   // };
//   const veriKaynaginiAl = () => {
//     console.log("data2 aldım verdim bu nedir?", data2);
//     haritaVeriKaynaginiGuncelle(data2); // Harita veri kaynağını güncellemek için fonksiyonu çağırın
//   };
//   console.log(data2, "data2");
//   return (
//     <div className="map-popup">
//       <div>
//         <b>Park ID: </b>
//         {popup.parkID}
//         <br></br>
//         <b>Park Adı: </b>
//         {popup.parkName}
//         <br></br>
//         <b>Kapasite: </b>
//         {popup.capacity}
//         <br></br>
//         <b>Çalışma Saatleri: </b>
//         {popup.workHours}
//         <br></br>
//         <b>Park Tipi: </b>
//         {popup.parkType}
//         <br></br>
//         <b>Ücretsiz Park Süresi: </b>
//         {popup.freeTime}
//         <br></br>
//         <b>Longitude: </b>
//         {popup.longitude}
//         <br></br>
//         <b>Latitude: </b>
//         {popup.latitude}
//         <br></br>
//       </div>
//       <div className="btn-group">
//         <button
//           disabled={isItemSaved}
//           ref={saveButtonRef}
//           className="btn-save"
//           onClick={() => {
//             setOpenMessage(true);
//             handleSaveClick({
//               id: popup.parkID,
//               name: popup.parkName,
//               capacity: popup.capacity,
//               workHours: popup.workHours,
//               parkType: popup.parkType,
//               freeTime: popup.freeTime,
//               longitude: popup.longitude,
//               latitude: popup.latitude,
//             });
//             const newData2 = data2.features.push({
//               type: "Feature",
//               geometry: {
//                 type: "Point",
//                 coordinates: [popup.longitude, popup.latitude],
//               },
//               properties: {
//                 id: popup.parkID,
//                 name: popup.parkName,
//                 capacity: popup.capacity,
//                 workHours: popup.workHours,
//                 parkType: popup.parkType,
//                 freeTime: popup.freeTime,
//                 longitude: popup.longitude,
//                 latitude: popup.latitude,
//               },
//             });
//             haritaVeriKaynaginiGuncelle(data2);
//             console.log("data2 aldım verdim bu nedir?", popup);
//           }}
//         >
//           Kaydet
//         </button>

//         <button
//           className="btn-closee"
//           onClick={() =>
//             Panorama.OpenPanoramaOnLocation(popup.longitude, popup.latitude)
//           }
//         >
//           Sokak Görüntüsü
//         </button>
//       </div>
//     </div>
//   );
// };
