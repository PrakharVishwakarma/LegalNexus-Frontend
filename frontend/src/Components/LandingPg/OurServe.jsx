// frontend/src/Components/LandingPg/OurServe.jsx

import { useState, useEffect } from "react";
import "./OurServe.css";
import serveSvg1 from "../../assets/serveSvg1.svg";
import file from "../../assets/file.svg";
import OurServe3 from "../../assets/OurServe3.svg";
import OurServe5 from "../../assets/OurServe5.svg";


const slides = [
  {
    image: serveSvg1, // Or any SVG that fits visually
    title: "Smart Case Management",
    caption:
      "Easily create, manage, and track legal cases with secure role-based access. Organize everything in one place with clarity and precision.",
  },
  {
    image: file, // Use a symbolic file or doc illustration
    title: "Secure Document Handling",
    caption:
      "Upload, organize, and view legal case files seamlessly. Every document is safely stored and versioned with access control at every step.",
  },
  {
    image: OurServe3, // Visual related to lock/shield for access
    title: "Granular Access Control",
    caption:
      "Control who can view, edit, or delete documents and cases. Assign permissions to judges, lawyers, police, or civilians — all in real time.",
  },
  {
    image: OurServe5, // IPFS or blockchain-themed visual
    title: "Blockchain-Backed Evidence",
    caption:
      "Every case and file is timestamped and stored on blockchain with IPFS integration, ensuring tamper-proof legal history and accountability.",
  },
];


const OurServe = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = slides.length;

  // Autoplay effect: Runs once on mount
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
    }, 7000);

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
            <div className="content bg-black/70 rounded-xl text-center px-4 py-6 shadow-md text-white w-[35rem]">
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
