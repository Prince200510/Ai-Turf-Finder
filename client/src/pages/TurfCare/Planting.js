import React from "react";
import "./TurfCare.css";
import Img from "../../assets/content_site-prep-and-turf-laying.jpg"; 
import Img1 from "../../assets/content-image-turf-slabs.jpg"; 
import Img2 from "../../assets/content-image-turf-rolls.jpg"; 
import Img3 from "../../assets/content-image-washed-turfgrass.jpg"; 

export default function Planting() {
  return (
    <div className="container-parent-turf-care">
      <div className="turf-care-container">
        <div className="turf-care-parent-card">
          <div className="turf-care-text">
            <h1>Planting</h1>
            <p>
            Planting methods depend on whether you are laying vegetative turf (sod) or using seed. Most lawns or recreational areas are laid as vegetative turf which provides an instant result and surface protection. Only 8% of new lawns are seeded. Vegetatve turf normally comes in rolled strips (turf rolls) or turf slabs (see images below) that are usually 45 cm to 50 cm wide. If you are purchasing turf from a retailer and not direct from the turf supplier, check to see what size or area of the turf they are selling so you don't fall short. Normally a turf slab does not equate to 1m² e.g. Bunnings turf slabs or rolls are usually only 0.75m². 
            </p>
          </div>
          <div className="turf-care-image">
            <img src={Img} alt="Turf Care" />
          </div>
        </div>
        <div className="turf-care-text-2">
            <div>
                <h1>Vegetative Turf</h1>
                <p>
                 <ul>
                    <li>Be sure you have ordered enough turfgrass for your lawn area. Refer to our turf calculator page for help..</li>
                    <li>Prepare and level your soil for planting as detailed in our site preparation page. Ideally you would like to have 100 mm to 150 mm of good quality topsoil or turf underlay present. Skimping on the quality and quantity of soil should be avoided as you will encounter long term management issues.</li>
                    <li>Lay the turf as soon as possible. Ideally, as soon as it arrives on site, or on the day you receive it for best results. Leaving the turf slabs or rolls on a pallet or in a stack allows the turf to heat and even cook. This results in what is called "pallet burn". Significant turf loss (death) can result.</li>
                    <li>Starting at a straight edge such as a path or driveway, lay the rolled out strips side by side in rows and end to end within each row.</li>
                    <li>Stagger the joints (as best as possible) in adjoining rows like bricks so not to have the turf joins of adjacent rolls aligned.</li>
                    <li>Make sure all joints (sides and ends) are butted together tightly without overlapping. This is to stop the turf edges drying out and causing ongoing management issues or a trip hazard. You or your turf installer should not have to fill gaps with sand or soil.</li>
                    <li>Use a large knife or spade for cutting turf around trees, garden beds and edging.</li>
                 </ul>
                </p>
             <div class="sub-img-planting">
                <img src={Img1} alt="Turf Care" />
                <img src={Img2} alt="Turf Care" />
                <img src={Img3} alt="Turf Care" />
             </div>
             <h1></h1>
             <h1>Seeding</h1>
                <p>
                 <ul>
                    <li>If time permits, prepare and water the seed bed prior to sowing. This will encourage the germination of the most undesirable seeds i.e. weeds. Eradicate the emerging seedlings with glyphosate, as per label recommendations, before sowing your desired turf seed.</li>
                    <li>Take care to spread the seed evenly over the area during planting. Except for kikuyu and buffalograss, seed of most warm-season turfgrasses (green and blue couch, centipede grass, zoysia) is quite small.</li>
                    <li>Seeding rates for these warm-season turfgrasses are usually between 0.5 and 1 kilogram per 100 square metres. Refer to instructions on the packet for specific information.</li>
                    <li>Mix the seed with moistened ‘brickies’ sand before planting to help in spreading it evenly. For best results, use five parts of moist sand to one part of seed.</li>
                    <li>Spread the seed in at least two applications across the area, the second crisscrossing the first at right angles to it.</li>
                    <li>After seeding, rake the area lightly, covering the seed with no more than about 2-3 mm of soil.</li>
                 </ul>
                </p>
            </div>
          </div>
      </div>
    </div>
  );
}
