import { useState, useEffect } from "react";
import "./OurServe.css";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0MDE1NTg2Ng&ixlib=rb-1.2.1&q=85",
    title: "Shaun Matthews",
    caption: "Lorem Ipsum has been the industry's standard dummy text...",
  },
  {
    image:
      "https://images.unsplash.com/photo-1500643752441-4dc90cda350a?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0MDE1NTg2Ng&ixlib=rb-1.2.1&q=85",
    title: "Alexis Berry",
    caption: "Lorem Ipsum has been the industry's standard dummy text...",
  },
  {
    image:
      "https://images.unsplash.com/photo-1465408953385-7c4627c29435?crop=entropy&cs=srgb&fm=jpg&ixid=MnwxNDU4OXwwfDF8cmFuZG9tfHx8fHx8fHx8MTY0MDE1NTg2Ng&ixlib=rb-1.2.1&q=85",
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
  }, []);

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
