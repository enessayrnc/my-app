import React, { useEffect } from "react";
import { Panorama } from "cbs-panorama";
import './panoramacontainer.css';




export default function PanoramaContainer({setPanorama} ) {
   
  
    const resetPanorama = () => {
      Panorama.Reset()
    }

  
  
  setPanorama(Panorama)
    useEffect(() => {
		Panorama.ConfigurePanorama({
			    token: "fc242a68-62be-41ca-92ab-27a6c92e0ecb",
			    panoramaType: "2018",
      environment: "test",
            title:"panorama"
			});
      

      
     
        }, []);

       
  return (
    <div id="panorama-container">
      <div className="panorama-header">
        
        
      
      </div>
          <button id="panorama-close-button" className="btn-closee btn-new" onClick={()=>{
        
          // resetPanorama()

        
        
      } }>
    
        Kapat</button>

      <iframe id="panorama-iframe" src=""></iframe>
    </div>
  );
}
