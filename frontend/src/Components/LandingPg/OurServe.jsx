// frontend/src/Components/LandingPg/OurServe.jsx

import { useState, useEffect } from "react";
import "./OurServe.css";
import serveSvg1 from "../../assets/serveSvg1.svg";
import serveJpg2 from "../../assets/serveJpg2.jpg";
import serveJpg3 from "../../assets/serveJpeg3.jpg";

const slides = [
  {
    image: serveSvg1,
    title: "Shaun Matthews",
    caption: "Lorem Ipsum has been the industry's standard dummy text...",
  },
  {
    image: serveJpg2,
    title: "Alexis Berry",
    caption: "Lorem Ipsum has been the industry's standard dummy text...",
  },
  {
    image: serveJpg3,
    title: "Billie Pierce",
    caption: "Lorem Ipsum has been the industry's standard dummy text...",
  },
];

const OurServe = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = slides.length;

  // Autoplay effect: Runs once on mount
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    }, 4000);

    return () => clearInterval(interval);
  }, [totalSlides]);

  const handleNext = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
  };

  const handlePrev = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? totalSlides - 1 : prevSlide - 1
    );
  };

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="slider-container">
      <div className="slider-wrapper">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`slide ${index === currentSlide ? "active" : ""}`}
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="content">
              <h2 className="title">{slide.title}</h2>
              <p className="caption">{slide.caption}</p>
            </div>
          </div>
        ))}
      </div>

      <button className="prev-button" onClick={handlePrev}>
        &#10094;
      </button>
      <button className="next-button" onClick={handleNext}>
        &#10095;
      </button>

      <div className="dots-container">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${index === currentSlide ? "active" : ""}`}
            onClick={() => handleDotClick(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default OurServe;
