import React, { useRef, useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./map.css";
import images from "../location-dot-duotone (1).png";
import reactDom from "react-dom";

export default function Map(props) {
  //   const mapContainer = useRef(null);
  const mapContainer = useRef(null);
  const [lng] = useState(29.068335);
  const [lat] = useState(41.110069);
  const [zoom] = useState(7.6);
  const [data, setData] = useState();
  const [elem, setElem] = useState();

  const [items, setItems] = useState(null);
  // const [items, setItems] = useState({});

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
            },
          });
        }

        setData(geojsonData); //geojsonData'ya veriler eklendi. Ve state'ddeki durumu değişti

        // console.log(geojsonData);
      });
  }, []);
  useEffect(() => {
    if (!data) return; // harıtayı data olmadığında boş dönderir. İlk anda veri olmadığı için hataya düşmesini engelliyor.

    const map = new maplibregl.Map({
      //   container: mapContainer.current,
      container: "map",
      style:
        "https://tiles.basemaps.cartocdn.com/gl/positron-gl-style/style.json",
      center: [lng, lat],
      zoom: zoom,
    });
    props.clickMap(map);
    map.addControl(new maplibregl.NavigationControl());

    // -----geojsonı haritada gösterme-------
    map.on("load", () => {
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
    });

    map.on("click", "places", (e) => {
      const coordinates = e.features[0].geometry.coordinates.slice();
      const parkID = e.features[0].properties.parkID;
      const parkName = e.features[0].properties.parkName;
      const capacity = e.features[0].properties.capacity;
      const workHours = e.features[0].properties.workHours;
      const parkType = e.features[0].properties.parkType;
      const freeTime = e.features[0].properties.freeTime;
      const district = e.features[0].properties.district;

      // Ensure that if the map is zoomed out such that multiple
      // copies of the feature are visible, the popup appears
      // over the copy being pointed to.
      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
      }

      const popupDiv = document.createElement("div");
      reactDom.render(
        <PopupTest popup={e.features[0].properties} setItems={setItems} />,
        popupDiv
      );

      let popup = new maplibregl.Popup()
        .setLngLat(coordinates)
        .setDOMContent(popupDiv)
        // .setHTML(
        //   "<b>Park ID: </b>" +
        //     parkID +
        //     "<br>" +
        //     "<b>Park Adı: </b>" +
        //     parkName +
        //     "<br>" +
        //     "<b>Kapasite: </b>" +
        //     capacity +
        //     "<br>" +
        //     "<b>Çalışma Saatleri: </b>" +
        //     workHours +
        //     "<br>" +
        //     "<b>Park Tipi: </b>" +
        //     parkType +
        //     "<br>" +
        //     "<b>Ücretsiz Park Süresi: </b>" +
        //     freeTime +
        //     " dk" +
        //     "<br>" +
        //     "<b>İlçe: </b>" +
        //     district +
        //     "<br>" +
        //     `<button className='button1' onClick="()=>enes()">KAYDET</button>`
        // )
        .addTo(map);

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
        zoom: 15,
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
  }, [data]);

  useEffect(() => {
    if (!items) return;
    const local = localStorage.getItem("pushitems");
    const localArray = JSON.parse(local) !== null ? JSON.parse(local) : [];

    localArray.push(items);

    localStorage.setItem("pushitems", JSON.stringify(localArray));

    props.save(localArray);
  }, [items]);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" id="map" />
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
          setItems(
            {
              id: popup.parkID,
              name: popup.parkName,
              capacity: popup.capacity,
              name: popup.parkName,
              workHours: popup.workHours,
              parkType: popup.parkType,
              freeTime: popup.freeTime,
            }
          )
        }
      >
        Kaydet
      </button>
    </div>
  );
};
