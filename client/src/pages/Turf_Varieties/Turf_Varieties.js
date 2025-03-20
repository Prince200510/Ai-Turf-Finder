import React from "react";
import "./Turf_Varieties.css";
import img1 from"../../assets/thumb_Pensacola-Bahia-Seed-Turf-Finder.jpg";
import img2 from"../../assets/thumb_Aussiblue-1-turf-finder.jpg";
import img3 from"../../assets/thumb_qld-blue-couch-4-turf-finder.jpg";
import img4 from"../../assets/thumb_tropika.jpg";
import img5 from"../../assets/thumb_broadleaf-carpet-grass-1-turf-finder.jpg";
import img6 from"../../assets/thumb_browtop-bentgrass-3-turf-finder.jpg";


const grassData = [
  { name: "Pensacola", type: "Bahiagrass", image: img1 },
  { name: "Aussiblue", type: "Blue couch", image: img2 },
  { name: "Qld Blue Couch", type: "Blue couch", image: img3 },
  { name: "Tropika", type: "Blue couch", image: img4 },
  { name: "Broadleaf carpet grass", type: "Broadleaf carpet grass", image: img5 },
  { name: "Browntop bentgrass", type: "Browntop bentgrass", image: img6 },
];

const Turfgrass = () => {
  return (
    <div className="container-parent-turf-care">
    <div className="container1">
      <h2 className="title1">Warm-season Turfgrasses</h2>
      <div className="cards1">
        {grassData.map((grass, index) => (
          <div className="card123" key={index}>
            <h3 className="grass-name1">{grass.name}</h3>
            <p className="scientific-name1">{grass.type}</p>
            <img className="grass-image1" src={grass.image} alt={grass.name} />
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Turfgrass;
