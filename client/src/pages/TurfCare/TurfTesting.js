import React from "react";
import "./TurfCare.css";
import Img from "../../assets/content-image-right-turf.jpg"; 

export default function TurfTesting() {
  return (
    <div className="container-parent-turf-care">
      <div className="turf-care-container">
        <div className="turf-care-parent-card">
          <div className="turf-care-text">
            <h1>Analytical Testing</h1>
            <p>
            Knowing the health and quality of your soil and irrigation water is very important in being able to produce a healthy turfgrass. We are able to assist by providing accurate results with a fast turnaround to enable you to make informed decisions on what management inputs are actually required.
            </p>
          </div>
          <div className="turf-care-image">
            <img src={Img} alt="Turf Care" />
          </div>
        </div>
        <div className="turf-care-text-2">
            <div>
                <h1>Test method and background:</h1>
                <p>
                 <ul>
                    <li>Comprehensive soil nutritional testing:</li>
                    <ul>
                        <li>Test method: Sufficiency Level of Available Nutrients (SLAN) method by Australasian Soil and Plant Analysis Council (ASPAC) accredited laboratory. </li>
                        <li>Background: Testing includes pH (H2O), Electrical Conductivity (EC), Organic Matter, Macro nutrients N, P, K, S, Mg, Ca and Macro nutrients or elements Na, Fe, B, Al, Cl, Cu, B, Mn and Zn.  </li>
                    </ul>
                    <li>Comprehensive leaf tissue nutritional testing:</li>
                    <ul>
                        <li>Test method: Sufficiency Level of Available Nutrients (SLAN) method by Australasian Soil and Plant Analysis Council (ASPAC) accredited laboratory. </li>
                        <li>Background: Testing includes Macro nutrients N, P, K, S, Mg, Ca and Macro nutrients or elements Na, Fe, B, Cu, B, Mn and Zn.  </li>
                    </ul>
                    <li>Comprehensive water nutritional testing:</li>
                    <ul>
                        <li>Test method: Testing conducted by Australasian Soil and Plant Analysis Council (ASPAC) accredited laboratory. </li>
                        <li>Background: Testing includes pH (H2O), Electrical Conductivity (EC), N, P, K, S, Mg, Ca, Na, Fe, B, Cl, Cu, B, Mn and Zn.  </li>
                    </ul>
                 </ul>
                </p>
                <h1>Soil Testing Information Video:</h1>
                <p>Below is demonstration video provided by The Aussie Lawn on how to sample your soil and what to expect from the soil test results.</p>
                <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/xVNwyFp7-Ik"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                ></iframe>
            </div>
          </div>
      </div>
    </div>
  );
}
