import React, { useState } from "react";
import "./App.css";
import Map from "./components/map";
import ListBox from "./components/listBox";
import SavedParks from "./components/savedParks";
import Popup from "./components/popup";

function App() {
  const [items, setItems] = useState([]);
  const [map, setMap] = useState([]);
  const [parks, setParks] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(false);
  return (
    <div className="App">
      <Map propsMap={setItems} clickMap={setMap} save={setParks}></Map>
      <ListBox propsListbox={items} getclickMap={map}></ListBox>
      <SavedParks  setid ={setId} setopen={setOpen} savedParks={parks} setParks={setParks}></SavedParks>
      
      {open ? (
        <Popup setid={id} savedParks={parks} text="Düzenle!" closePopup={() => setOpen(false)} />
      ) : null}
    </div>
  );
}

export default App;
