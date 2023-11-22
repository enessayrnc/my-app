import React, { useState } from "react";
import "./App.css";
import Map from "./components/map";
import ListBox from "./components/listBox";
import SavedParks from "./components/savedParks";
import Popup from "./components/popup";
import PanoramaContainer from "./components/panoramacontainer";
import Navbar from "./components/navbar";


function App() {
  const [items, setItems] = useState([]);
  const [map, setMap] = useState([]);
  const [parks, setParks] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(false);

  return (
    <div className="App">
            <Navbar></Navbar>

      <Map propsMap={setItems} clickMap={setMap} save={setParks}></Map>
      <ListBox
        setItems={setItems}
        propsListbox={items}
        getclickMap={map}
      ></ListBox>
      <SavedParks
        setid={setId}
        setopen={setOpen}
        savedParks={parks}
        setParks={setParks}
      ></SavedParks>

      <PanoramaContainer />

      {open ? (
        <Popup
          setParks={setParks}
          id={id}
          savedParks={parks}
          text="Düzenle!"
          closePopup={() => setOpen(false)}
        />
      ) : null}
    </div>
  );
}

export default App;
