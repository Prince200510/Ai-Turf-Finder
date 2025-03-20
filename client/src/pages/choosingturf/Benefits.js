import React from "react";
import "../TurfCare/TurfCare.css";
import Img from "../../assets/content-image-right-turf.jpg"; 

export default function Benefits() {
  return (
    <div className="container-parent-turf-care">
      <div className="turf-care-container">
        <div className="turf-care-parent-card">
          <div className="turf-care-text">
            <h1>🌿 Benefits of Turf</h1>
            <p>
            Playing on a well-maintained turf offers numerous advantages. It provides a smooth and safe playing surface, reducing the risk of injuries compared to traditional grounds. Turf fields are designed to withstand all weather conditions, ensuring year-round playability without worrying about muddy or uneven surfaces. They also require minimal maintenance, making them a cost-effective and sustainable choice. Additionally, artificial turf enhances game performance by offering consistent ball bounce and grip, making it a preferred choice for sports enthusiasts and professionals alike.
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
                    <li>Is good for mental health.</li>
                    <li>200 m2 of natural turf provides enough oxygen for 12 to 18 people each day.</li>
                    <li>A good lawn can increase the value of your home up to $75,000.</li>
                    <li>250 square metres of lawn can absorb carbon dioxide from the atmosphere and release enough oxygen for a family of four.</li>
                    <li>Turfgrass absorbs heat and breaks up radiant energy. An average size lawn of a house has the cooling effect of about 9 tonnes of air conditioning.</li>
                    <li>On a hot day, a grass lawn will be at least 15°C cooler than asphalt and 8°C cooler than bare soil. Studies have shown that artifical or synthetic turf is 19°C to 28°C (up to 3 times) higher in surface temperature than natural turf (Robinson, 1996).</li>
                    <li>Is cooler and softer to play sport on than artificial turfgrass.</li>
                    <li>Turfgrass reduces glare and is also effective in reducing noise.</li>
                    <li>Helps maintain a balanced ecosystem.</li>
                 </ul>
                </p>
                <p>Why wouldn't you have natural turf? </p>
                <iframe
                width="100%"
                height="315"
                src="https://www.youtube.com/embed/gcOgtlZSrqs"
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
