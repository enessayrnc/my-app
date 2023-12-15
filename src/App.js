import React, { useState } from "react";
import "./App.css";
import Map from "./components/map";
import ListBox from "./components/listBox";
import SavedParks from "./components/savedParks";
import Popup from "./components/popup";
import PanoramaContainer from "./components/panoramacontainer";
import Navbar from "./components/navbar";
import Message from "./components/message";
import Popupdelete from "./components/popupdelete";
import Popupalldelete from "./components/popupalldelete";


// import LayerManager from "./components/layermanager";


function App() {
  const [items, setItems] = useState([]);
  const [map, setMap] = useState([]);
  const [parks, setParks] = useState([]);
  const [open, setOpen] = useState(false);
  const [openMessage, setOpenMessage] = useState(false);
  const [data22, setData22] = useState(false);
  const [acikpopup, setAcikpopup] = useState(false);
  const [panorama, setPanorama] = useState([]);
  const [opendelete, setopendelete] = useState(false);
  const [openalldelete, setopenalldelete] = useState(false);






  

  

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
        setAcikpopup ={setAcikpopup}
        acikpopup={acikpopup}
        panorama = {panorama}

      ></Map>
      <ListBox
        setOpenMessage={setOpenMessage}
        save={setParks}
        setItems={setItems}
        propsListbox={items}
        getclickMap={map}
        data22={data22}
        setAcikpopup ={setAcikpopup}
        acikpopup={acikpopup}
        savedParks={parks}
        panorama = {panorama}





      ></ListBox>
      <SavedParks
        savedParks={parks}
        getclickMap={map}
        data22={data22}
        acikpopup={acikpopup}
        panorama = {panorama}
        setid={setId}
        setopen={setOpen}

        setParks={setParks}
        setOpenMessage={setOpenMessage}
        setAcikpopup ={setAcikpopup}
        setopendelete={setopendelete}
        setopenalldelete={setopenalldelete}







      ></SavedParks>

      {openMessage ? (
        <Message closeMessage={() => setOpenMessage(false)} />
      ) : null}

      <PanoramaContainer
              setPanorama={setPanorama}
              />

      {open ? (
        <Popup
          setOpenMessage={setOpenMessage}
          getclickMap={map}

          setParks={setParks}
          id={id}
          savedParks={parks}
          text="Düzenle!"
          closePopup={() => setOpen(false)}
          // messageText="Kaydetme işleminiz başarıyla gerçekleşti."
          // setmessageText={messageText}

        />
      ) : null}
      {opendelete ? (
        <Popupdelete
          setOpenMessage={setOpenMessage}
          getclickMap={map}
          data22={data22}

          setParks={setParks}
          id={id}
          savedParks={parks}
          text="Uyarı!"
          closePopupDelete={() => setopendelete(false)}
          // messageText="Seçili park, kaydedilenler arasından başarıyla silindi."
          // setmessageText={messageText}

        />
      ) : null}
      {openalldelete ? (
        <Popupalldelete
          setOpenMessage={setOpenMessage}
          getclickMap={map}
          data22={data22}

          setParks={setParks}
          id={id}
          savedParks={parks}
          text="Uyarı!"
          closePopupAllDelete={() => setopenalldelete(false)}
          // messageText="Seçili park, kaydedilenler arasından başarıyla silindi."
          // setmessageText={messageText}
          setid={setId}
          setopen={setOpen}
  
          setAcikpopup ={setAcikpopup}
          setopendelete={setopendelete}

        />
      ) : null}
    </div>
  );
}

export default App;
