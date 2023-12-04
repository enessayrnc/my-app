import React, { useState } from "react";
import "./App.css";
import Map from "./components/map";
import ListBox from "./components/listBox";
import SavedParks from "./components/savedParks";
import Popup from "./components/popup";
import PanoramaContainer from "./components/panoramacontainer";
import Navbar from "./components/navbar";
import Message from "./components/message";
// import LayerManager from "./components/layermanager";


function App() {
  const [items, setItems] = useState([]);
  const [map, setMap] = useState([]);
  const [parks, setParks] = useState([]);
  const [open, setOpen] = useState(false);
  const [openMessage, setOpenMessage] = useState(false);
  const [data22, setData22] = useState(false);

  

  

  const [id, setId] = useState(false);

  return (
    <div className="App">
      <Navbar></Navbar>

      <Map
        setOpenMessage={setOpenMessage}
        propsMap={setItems}
        clickMap={setMap}
        save={setParks}
        data22={setData22}
      ></Map>
      <ListBox
        setOpenMessage={setOpenMessage}
        save={setParks}
        setItems={setItems}
        propsListbox={items}
        getclickMap={map}
        data22={data22}

      ></ListBox>
      <SavedParks
        setid={setId}
        setopen={setOpen}
        savedParks={parks}
        setParks={setParks}
        getclickMap={map}
        data22={data22}

      ></SavedParks>

      {openMessage ? (
        <Message closeMessage={() => setOpenMessage(false)} />
      ) : null}

      <PanoramaContainer />

      {open ? (
        <Popup
          setOpenMessage={setOpenMessage}
          setParks={setParks}
          id={id}
          savedParks={parks}
          text="Düzenle!"
          closePopup={() => setOpen(false)}
        />
      ) : null}
      {/* <LayerManager></LayerManager> */}
    </div>
  );
}

export default App;
