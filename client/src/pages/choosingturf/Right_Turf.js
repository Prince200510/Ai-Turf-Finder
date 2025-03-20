import React from "react";
import "../TurfCare/TurfCare.css";
import Img from "../../assets/content_Home-Lawn-Options-Turf-Finder.jpg"; 

export default function Right_Turf() {
  return (
    <div className="container-parent-turf-care">
      <div className="turf-care-container">
        <div className="turf-care-parent-card">
          <div className="turf-care-text">
            <h1>Choosing the Right Turf</h1>
            <p>Turfgrasses vary widely in how they adapt and perform within different environments. They all have their strengths and weaknesses. At present, there is no perfect turfgrass that suits all situations. Therefore, it is important to choose the best turfgrass for your environment and then managing it it accordingly to achieve a practical, sustainable and aesthetic turf surface. </p>
            <p>Today, homeowners and turf professionals alike, often choose their grass based on price, social media recommendations and marketing. However there are more important factors to be considered. These commonly include, your environment (e.g. location, shade, high wear), intended use, available resources and level of maintenance you wish to provide, water availability and quality, and soil type.</p>
          </div>
          <div className="turf-care-image">
            <img src={Img} alt="Turf Care" />
          </div>
        </div>
        <div className="turf-care-text-2">
            <div>
                <h1>Turf Price:</h1>
                <p>
                The choice of turf is often decided upon by price. However, a survey conducted by Brand Story in 2010 identified that 50% of people did not actually know the actual cost per square metre of turf. A further survey conducted by Turf India in 2014 identified that consumers were willing to pay between $10 and $20 per square metre for the supply of quality turf.
                </p>
                <p>Provided below is a price comparison, obtained by Turf Finder in 2018, between three prominent turfgrass species, soft leaf buffalo, green couch and zoysia, being sold across Australia. Please note that the prices will always vary depending on supply and demand; and demand has been high since COVID-19. Also, don't forget to ask your turf supplier if a delivery fee will be incurred if you are unable to organise farm pick-up. Delivery may be FREE, or typically a charge up to $130 may be incurred depending on the quantity of turf ordered and your delivery location.</p>
            </div>
          </div>
      </div>
    </div>
  );
}
