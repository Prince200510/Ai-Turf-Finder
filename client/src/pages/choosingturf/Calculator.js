import React from "react";
import "../TurfCare/TurfCare.css";
import Img from "../../assets/content-image-right-turf.jpg"; 
import img1 from"../../assets/content-image-turf-calculator-rectangle.gif";
import img2 from"../../assets/content-image-turf-calculator-triangle.gif";
import img3 from"../../assets/content-image-turf-calculator-trapezoid.gif";
import img4 from"../../assets/content-image-turf-calculator-triangle.gif";


export default function Calculator() {
  return (
    <div className="container-parent-turf-care">
      <div className="turf-care-container">
        <div className="turf-care-parent-card">
          <div className="turf-care-text">
            <h1>Turf Area Calculator</h1>
            <p>
            Prepare a sketch or mud map of your lawn or area you wish to turf. Identify any significant features within the map e.g. boundary, paths, decking, pool etc. Use a tape measure to record actual measurements of these features in metres (m). Divide your lawn or area into either of the four (4) shapes shown below and carry out the simple calculations provided. Once you have a tally of all your calculated shapes, it is wise to add a further 5 % to the figure to allow for off-cuts and scrap material. Please note that not all turf slabs or rolls are the same size. So don't think of your requirement as two (2) rolls of turf for example; calculate your requirements in square metres (m2). Turfgrass is commonly sold in turf rolls and slabs. For larger projects, jumbo turf rolls or maxi rolls can be supplied.
            </p>
          </div>
          <div className="turf-care-image">
            <img src={Img} alt="Turf Care" />
          </div>
        </div>
        <div className="turf-care-text-2">
            <div>
               <img src={img1}></img>
               <img src={img2}></img>
               <img src={img3}></img>
            </div>
          </div>
      </div>
    </div>
  );
}
