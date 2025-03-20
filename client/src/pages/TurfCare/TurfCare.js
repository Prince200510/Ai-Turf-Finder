import React from "react";
import "./TurfCare.css";
import Img from "../../assets/afterplanting.jpg"; 

export default function TurfCare() {
  return (
    <div className="container-parent-turf-care">
      <div className="turf-care-container">
        <div className="turf-care-parent-card">
          <div className="turf-care-text">
            <h1>After Planting Care</h1>
            <p>
              Care of your turfgrass following installation is very important.
              The amount of care and maintenance provided early on will shape
              how your grass will establish and perform. The four (4) most
              important maintenance components, post initial of vegetative
              turfgrass (sod) or seed, are:<br></br> (i) providing root to soil contact,<br></br>
              (ii) water (irrigation), <br></br>(iii) routine mowing once the grass has
              rooted, and <br></br>(iv) fertility. Follow the steps below to ensure your
              turf thrives after planting.
            </p>
          </div>
          <div className="turf-care-image">
            <img src={Img} alt="Turf Care" />
          </div>
        </div>
        <div className="turf-care-text-2">
            <div>
                <h1>Turf Slabs or Rolls</h1>
                <p>
                 <ul>
                    <li>Immediately after laying your turf, a pre-emergent herbicide is recommended to be applied across the grass to limit or prevent germinating weeds. A pre-emergent herbicide can be purchased as a stand alone product, or it can be purchased as a combination pre-emergent herbicide which also contains slow release fertiliser. The herbicide content provides a thin layer of protection across the thatch and soil, so when a weed seed germinates, it hits the herbicide layer and dies.</li>
                    <li>Fertiliser is essential for turf growth and development. Turf fertiliser can be applied at planting or shortly after. An annual program is then recommended.</li>
                    <li>As a general rule, new turf should be watered heavily at least every second day, plus two light applications each day. In very hot weather, the frequency of light watering may need to be increased to several light waterings per day.</li>
                    <li>Newly laid turf only has a very shallow root system and must be kept moist for the first 2 weeks to prevent it from drying out or browning off. Different soils have different moisture holding capacities, so you will need to check regularly to ensure that the turf and soil below are kept moist.</li>
                    <li>As deeper roots develop, the watering regieme can be cut back to deep watering every week, depending on weather and seasonal conditions. You may need to increase the watering to twice a week during summer.</li>
                    <li>Although the grass will accept light traffic following planting, it should not be brought into full service until firmly rooted. This usually takes around 2 to 4 weeks depending on the species of turfgrass, your location and time of planting.</li>
                    <li>Newly laid turf should also be mowed as soon as it has firmly anchored to the soil. Rooting can be easily checked by attempting to lift corners of the turf. The first mow should be just a light trim and the grass should not be scalped. The height can then be gradually reduced over the next 2 to 3 mowings. It is important to not mow more than one third of the leaf blade off to limit stress to the plant (unless you are scarifying or dethatching). For more advice and tips on mowing.</li>
                    <li>Depending on the quality of your turf installation and lateral growth of your turfgrass, you may still notice the turf joins between the slabs or rolls for sometime. These will soon dissapear when when lateral growth and turf density increases. Alternatively, topdressing sand can be applied along the turf joins if noticable gaps are visible.</li>
                 </ul>
                </p>
            </div>
          </div>
      </div>
    </div>
  );
}
