import React, { useState } from "react";
import "./TurfCare.css";
import Img from "../../assets/content_irrigation-home-lawn-installation.jpg"; 

const faqData = [
    {
      question: "When to Water?",
      answer:
        "The quality of most lawns is only affected when they start to show symptoms of wilting or drought stress. During the latter periods, the grass blades turn bluish-purple, or grey and the leaves begin to wilt. Leaves fold or roll along their length. Footprints also remain in the lawn for several hours. Leaves with plenty of water quickly return to their rigid upright shape, while leaves lacking water will remain trampled for a period of time. If high temperatures and dry conditions continue without rain or irrigation, the above-ground tissues of the plant material will brown and die. Variation may be seen because of micro climates or variation in soil type or depth. Recovery will be largely dependent on the turf species you have and if the turf grows be either stolons and/or underground rhizomes.",
    },
    {
      question: "How much water to apply?",
      answer: "You only need to water the lawn when it shows symptoms of stress.  This could be after a week during hot weather, or after 2 to 3 weeks during cool weather.  Critical factors are the effective rooting depth of the lawn and the moisture holding capacity of the soil.  The objective is to apply enough water with each irrigation to soak the soil to a desirable depth of approximately 150 mm to 200 mm. Water should also not be applied at a rate that is higher than the soils infiltration rate i.e. capacity to drain. Sand normally absorbs water quickly. An exception to this rule are dry hydrophobic sands, which are coated in a layer of organic matter that repels moisture causing water to run horizontally across the soil surface.  Products are available at to treat this condition. Clays are thirty times slower than sands in accepting applied moisture.  If water is applied too quickly to these soils it is wasted, becoming runoff.  Such soils respond best to light sprinkling over a longer period of time.",
    },
    {
      question: "Does the type of sprinkler I use make a difference?",
      answer: "Properly designed and operated automatic irrigation systems with pop-up sprinklers can supply water uniformly over an entire area without wasted runoff.  However, the most common type of watering occurs with hose-end sprinklers. Some studies have shown that the average homeowner applies 2.5 times the amount of water that is required for turf growth when using hose-end sprinklers.  There are several types of systems available. Select one that best fits your size and shape of lawn and then operate it efficiently. All hose-end sprinklers can be attached to an inexpensive timer that can be used to shut off unattended sprinklers and avoid over-irrigation.",
    },
    {
      question: "References",
      answer: "Content included on this page has been modified; original content was published in Lawns and Lawn Care, a homeowner’s guide (no date); Gardening with grey water and on the web by the former Dept of Primary Industries and Fisheries. Permission for use has been granted by the now Dept of Agriculture and Fisheries.",
    }
  ];

export default function Irrigation() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
      setOpenIndex(openIndex === index ? null : index);
    };

  return (
    <div className="container-parent-turf-care">
      <div className="turf-care-container">
        <div className="turf-care-parent-card">
          <div className="turf-care-text">
            <h1>Irrigation</h1>
            <p>Various cultural practices should be adopted and planning undertaken when irrigating your turfgrass. This will help to improve the quality and health of your turfgrass and more importantly to save you money and the environment, by not wasting water.</p>
            <h2>Quick facts on lawn watering:</h2>
            <ul>
                <li>Irrigation water should have a pH between 6 and 7 and a low Electrical Conductivity (EC) reading. Turf Finder can assist with pH and EC testing of your irrigation water. Please refer to our Analytical page.</li>
                <li>Irrigate by monitoring the appearance of your lawn. You may not need to irrigate every week. More water will be required during spring and summer to compensate for evapotranspiration and plant uptake.</li>
                <li>Infrequent and deep watering to encourage extended root growth and to conserve water is recommended.</li>
                <li>Deeper roots draw moisture from a larger volume of soil and therefore require less irrigation. Taller grass has deeper roots and is less likely to wilt. Taller grass also shades the soil surface and reduces temperatures at the soil surface.</li>
                <li>Lawns growing on sandy soils generally require more frequent irrigation than those on loam or clay soils.</li>
            </ul>
          </div>
          <div className="turf-care-image">
            <img src={Img} alt="Turf Care" />
          </div>
        </div>
        <div className="turf-care-text-2">
            <div>
                <h1>Irrigation</h1>
                <div className="faq-container">
      <h2>FAQ</h2>
      <div className="faq-list">
        {faqData.map((faq, index) => (
          <div key={index} className="faq-item">
            <div className="faq-question" onClick={() => toggleFAQ(index)}>
              <span>{faq.question}</span>
              <span className={`arrow ${openIndex === index ? "open" : ""}`}>&#9662;</span>
            </div>
            <div className={`faq-answer ${openIndex === index ? "show" : ""}`}>
              {faq.answer}
            </div>
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
