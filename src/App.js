import React,{useState} from "react";
import './App.css'
import Map from "./components/map";
import ListBox from "./components/listBox";





function App() {
  const [items, setItems] = useState([]);


  
  return (
    

    <div className="App">
    {/* <Navbar></Navbar> */}
    <Map propsMap={setItems}></Map>
    <ListBox propsListbox={items} berkay= 'berkay'></ListBox>
    
   



    
    </div>
  );
}

export default App;
