import React,{useState} from "react";
import './App.css'
import Map from "./components/map";
import ListBox from "./components/listBox";





function App() {
  const [items, setItems] = useState([]);
  const [map, setMap] = useState([]);


  
  return (
    

    <div className="App">
    <Map propsMap={setItems} clickMap = {setMap}></Map>
    <ListBox propsListbox={items} getclickMap= {map}></ListBox>
    
   



    
    </div>
  );
}

export default App;
