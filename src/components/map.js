import React, { useRef, useEffect, useState } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import "./map.css";
import images from '../location-dot-duotone (1).png'


export default function Map() {
  //   const mapContainer = useRef(null);
  const mapContainer = useRef(null);
  const [lng] = useState(29.068335);
  const [lat] = useState(41.110069);
  const [zoom] = useState(7.6);
  const [data, setData] = useState();

  //veriye istek atma
  useEffect(() => {
    fetch("https://api.ibb.gov.tr/ispark/Park")
      .then((response) => response.json())
      .then((jsonData) => {
        console.log(jsonData);

        //json verisini geojson'a manipüle etme
        let geojsonData = { type: "FeatureCollection", features: [] };
        for (var i = 0; i < jsonData.length; i++) {
          geojsonData.features.push({
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [
                jsonData[i].lng,
                jsonData[i].lat,
              ],
            },
            properties: {},
          });
        }
        setData(geojsonData);

        console.log(geojsonData);
      });
  }, []);
  useEffect(() => {
    if (!data) return; // harıtayı data olmadığında boş dönderir. İlk anda veri olmadığı için hataya düşmesini engelliyor.

    const map = new maplibregl.Map({
      //   container: mapContainer.current,
      container: "map",
      style: "https://demotiles.maplibre.org/style.json",
      center: [lng, lat],
      zoom: zoom,
    });
    map.addControl(new maplibregl.NavigationControl());

    // -----geojsonı haritada gösterme-------
    map.on("load", () => {
      // Add an image to use as a custom marker
      map.loadImage(
        images,
        (error, image) => {
          if (error) throw error;
          map.addImage("custom-marker", image);

          map.addSource("sa", {
            type: "geojson",
            data: data,
          });

          // Add a symbol layer
          map.addLayer({
            id: "saas",
            type: "symbol",
            source: "sa",
            size:'24px',
            layout: {
              "icon-image": "custom-marker",
            },
          });
        }
      );
    });
  }, [data]);
  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" id="map" />
    </div>
  );
}
