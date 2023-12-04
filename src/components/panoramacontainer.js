import React, { useEffect } from "react";
import { Panorama } from "cbs-panorama";
import './panoramacontainer.css';




export default function PanoramaContainer( ) {
   
    useEffect(() => {
		Panorama.ConfigurePanorama({
			    token: "fc242a68-62be-41ca-92ab-27a6c92e0ecb",
			    panoramaType: "2018",
            title:"panorama"
			});
        }, []);
  return (
    <div id="panorama-container">
      <div className="panorama-header"></div>
          <button id="panorama-close-button" className="btn-closee btn-new">Kapat</button>
      <iframe id="panorama-iframe" src=""></iframe>
    </div>
  );
}
