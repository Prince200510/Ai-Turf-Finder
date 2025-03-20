import React from "react";
import "../TurfCare/TurfCare.css";
import Img from "../../assets/content-image-right-turf.jpg"; 
import img1 from"../../assets/thumb_American-buffalograss-NE91-118-Turf-Finder-1.jpg";
import img2 from"../../assets/thumb_Paspalum-notatum-bahiagrass-Turf-Finder-1.jpg";
import img3 from"../../assets/thumb_Blue-couch-Turf-Finder-1.jpg";

const turfgrasses = [
    {
      name: "American buffalograss",
      scientificName: "Buchloe dactyloides",
      image: img1,
      description:
        "Buchloe (formerly Bouteloua) dactyloides is a perennial warm-season turfgrass species. In the United States, the grass species is called 'American buffalograss' and in Australia and online, retailers who sell the seed commonly call it 'buffalograss seed'. ",
    },
    {
      name: "Bahiagrass",
      scientificName: "Paspalum notatum",
      image: img2,
      description:
        "A hard-wearing, coarse-textured grass with soft leaves. This species of turfgrass is commonly found along roadsides and within older parks. The species has excellent rhizomes which provide great wear tolerance and is near impossible to divot the turfgrass once firmly established.",
    },
    {
      name: "Blue couch",
      scientificName: "Digitaria didactyla",
      image: img3,
      description:
        "Blue couch is also a popular choice with Queensland homeowners. It is well adapted to acid sandy soils, and will tolerate low fertility but at the same time respond to added fertiliser. Like green couch, it is a medium textured turf best suited to being mown short, but is more forgiving of the irregular mowing habits followed by many homeowners.",
    },
  ];

export default function Species() {
  return (
    <div className="container-parent-turf-care">
      <div className="turf-care-container">
        <div className="turf-care-parent-card">
          <div className="turf-care-text">
            <h1>Turf Species Difference</h1>
            <p>
            Following is a list of commercial warm- and cool-season turfgrass species. A species contains many different varieties or turf types. It is very important to choose a suitable turfgrass species, then the turf variety. Unfortunately, not one species of grass is suitable to all evnironments or needs.
            </p>
            <p>
            Below each turf species thumbnail description is a green button called 'Display Varieties'. Click on each to see what turf varieties are available for that particualr turf species. Detailed photographs are also provied to help people who want to know what turf type they already have. 
            </p>
          </div>
          <div className="turf-care-image">
            <img src={Img} alt="Turf Care" />
          </div>
        </div>
        <div className="turf-care-text-2">
            <div>
            <div className="container">
                <div className="cards">
                  {turfgrasses.map((grass, index) => (
                    <div className="card" key={index}>
                      <h3 className="grass-name">{grass.name}</h3>
                      <p className="scientific-name">{grass.scientificName}</p>
                      <img src={grass.image} alt={grass.name} className="grass-image" style={{width: "250px"}}/>
                      <p className="description">{grass.description}</p>
                    </div>
                  ))}
                </div>
    </div>
            </div>
          </div>
      </div>
    </div>
  );
}
