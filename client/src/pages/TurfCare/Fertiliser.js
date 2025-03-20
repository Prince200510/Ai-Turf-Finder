import React, { useState } from "react";
import "./TurfCare.css";
import Img from "../../assets/content-image-fertiliser.jpg"; 

const faqData = [
    {
      question: "Soil test reports. What and how much fertiliser to apply?",
      answer:
        "Following soil nutritional testing, you will be provided with recommendations to adjust your Nitrogen (N), Phosphorous (P), Potassium (K), Calcium (Ca), Magnesium (Mg), Sulphur (S), and/or Iron (Fe) within your soil. Please download the following Fertiliser Application Record and Budget Planner (Excel file) provided by Turf Finder to help you identify what fertiliser(s) are required to help you reach your annual fertility requirement (kg/ha or g/100m2).",
    },
    {
      question: "What are micronutrients (trace elements)?",
      answer: "Micronutrients are essential nutrients required in small quantities for plant growth, such as Iron (Fe), Manganese (Mn), Zinc (Zn), Copper (Cu), Boron (B), and Molybdenum (Mo).",
    },
    {
      question: "What are macronutrients?",
      answer: "Macronutrients are nutrients required in larger amounts for plant growth, including Nitrogen (N), Phosphorus (P), and Potassium (K).",
    },
    {
      question: "What is a desirable soil pH?",
      answer: "The ideal soil pH for most plants is between 6.0 and 7.0, ensuring optimal nutrient availability.",
    },
    {
      question: "What is soil fertility?",
      answer: "Soil fertility refers to the soil’s ability to sustain plant growth by providing essential nutrients and a suitable environment.",
    },
    {
      question: "What is the difference between fertiliser types?",
      answer: "Fertilisers are categorized into organic (natural) and synthetic (chemical) types, each with unique benefits and applications.",
    },
  ];

export default function Fertiliser() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
      setOpenIndex(openIndex === index ? null : index);
    };

  return (
    <div className="container-parent-turf-care">
      <div className="turf-care-container">
        <div className="turf-care-parent-card">
          <div className="turf-care-text">
            <h1>Fertiliser</h1>
            <p>There are 17 essential chemical nutrients required to achieve optimal plant growth. They are classified according to the quantity required by plants as either macronutrients or micronutrients (trace elements).</p>
            <p>For each essential nutrient, plants have a sufficiency range within which optimal growth can be achieved. Nutrient concentrations higher or lower than the sufficiency range adversely affect plant growth through either toxicity or deficiency. These usually cause visual symptoms on plant leaves, in addition to deterioration in plant health and growth. </p>
            <p>Special fertiliser is also contained within pre-emergent fertiliser combination packages. Such products provide pre-emergent weed control along with slow release fertiliser. Click on the 'Pre-Emergent' tab below.</p>
          </div>
          <div className="turf-care-image">
            <img src={Img} alt="Turf Care" />
          </div>
        </div>
        <div className="turf-care-text-2">
            <div>
                <h1>Turf Slabs or Rolls</h1>
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
