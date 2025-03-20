import React, { useState, useRef, useEffect } from 'react';
import image1 from "../assets/1.jpeg";
import image2 from "../assets/2.jpeg";
import image3 from "../assets/3.jpeg";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './css/Slider.css';

const images = [image1, image2, image3];


export default function ImageSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  const slides = [
    {
      image: image1,
      alt: 'Additional Image',
      title: 'THE PALACE OF PRINCE',
      info: 'Welcome to The Palace of Prince, a luxurious hotel in [Ghatkopar]. We offer fancy rooms and great service. Whether you re here for work or fun, enjoy our awesome amenities and feel like royalty. Welcome to your fancy home away from home.',
    },
    {
      image: image2,
      alt: 'Additional Image',
      title: 'THE PALACE OF PRINCE',
      info: 'Welcome to The Palace of Prince, a luxurious hotel in [Ghatkopar]. We offer fancy rooms and great service. Whether you re here for work or fun, enjoy our awesome amenities and feel like royalty. Welcome to your fancy home away from home.',
    },
    {
      image: image3,
      alt: 'Additional Image',
      title: 'THE PALACE OF PRINCE',
      info: 'Welcome to The Palace of Prince, a luxurious hotel in [Ghatkopar]. We offer fancy rooms and great service. Whether you re here for work or fun, enjoy our awesome amenities and feel like royalty. Welcome to your fancy home away from home.',
    },
  ]

  useEffect(() => {
      const interval = setInterval(() => {
        if (sliderRef.current) {
          const nextIndex = (currentIndex + 1) % slides.length;
          setCurrentIndex(nextIndex);
          sliderRef.current.slickGoTo(nextIndex);
        }
      }, 5000);
  
      return () => clearInterval(interval);
    }, [currentIndex, slides.length]);
  
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 5000,
      afterChange: (current) => setCurrentIndex(current),
    };
  
  return (
    <div className="slider-container">
      <div className="home-container">
      <div className="home-img">
        <Slider {...settings} ref={sliderRef}>
            {slides.map((slide, index) => (
              <div key={index} className="slide">
                <div
                  className="slide-content"
                  style={{
                    zIndex: -1,
                    backgroundColor: 'rgba(169, 169, 169, 0.3)', 
                  }}
                >
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    style={{ width: '100vw', height: '643px' }}
                  />
                  <div className="text-content">
                    <h1>{slide.title}</h1>
                    <p>{slide.info}</p>
                    <button>READ MORE</button>
                    <button>CONTACT US</button>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}
