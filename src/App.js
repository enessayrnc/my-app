import React, { useState } from "react";
import "./App.css";
import Map from "./components/map";
import ListBox from "./components/listBox";
import SavedParks from "./components/savedParks";

function App() {
  const [items, setItems] = useState([]);
  const [map, setMap] = useState([]);
  const [parks, setParks] = useState([]);

  return (
    <div className="App">
      <Map
        propsMap={setItems}
        clickMap={setMap}
        save={setParks}
      ></Map>
      <ListBox propsListbox={items} getclickMap={map}></ListBox>
      <SavedParks savedParks={parks} setParks={setParks}></SavedParks>
    </div>
  );
}

export default App;
