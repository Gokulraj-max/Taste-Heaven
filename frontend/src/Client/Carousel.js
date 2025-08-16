import React, { useState, useEffect, useRef } from "react";
import "./Carousel.css";
import img2 from '../assets/images/cor0.jpg';
import img1 from '../assets/images/cor1.jpg';
import img3 from '../assets/images/cor2.jpg';
import img4 from '../assets/images/cor3.jpg';

// Image array with dynamic text
const images = [
  {
    src: img1,
    alt: "Image 1",
    author: "TasteHeaven Culinary Team",
    title: "Savor the Flavor",
    topic: "Potatoes with Fresh Greens",
    description: "A hearty potato dish infused with aromatic herbs and fresh greens."
  },
  {
    src: img2,
    alt: "Image 2",
    author: "TasteHeaven Culinary Team",
    title: "A Perfect Start",
    topic: "Sandwich, Tomatoes & Coffee",
    description: "A wholesome sandwich layered with fresh tomatoes and greens."
  },
  {
    src: img3,
    alt: "Image 3",
    author: "TasteHeaven Culinary Team",
    title: "Brazilian Delight",
    topic: "Açaí Dessert – A Taste of Brazil",
    description: "A rich and refreshing Brazilian açaí dessert."
  },
  {
    src: img4,
    alt: "Image 4",
    author: "TasteHeaven Culinary Team",
    title: "Savory Delight",
    topic: "Black Pasta",
    description: "A bold and savory black pasta dish, infused with rich flavors."
  },
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);

  // Function to handle next and previous slide
  const showSlider = (type) => {
    if (!carouselRef.current) return; // Check if ref is available

    if (type === "next") {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      carouselRef.current.classList.add("next");
    } else {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
      carouselRef.current.classList.add("prev");
    }

    setTimeout(() => {
      if (carouselRef.current) {
        carouselRef.current.classList.remove("next");
        carouselRef.current.classList.remove("prev");
      }
    }, 500);
  };

  // Auto-slide effect
  useEffect(() => {
    const autoSlide = setInterval(() => {
      showSlider("next");
    }, 5000);

    return () => clearInterval(autoSlide);
  }, []);

  return (
    <div className="carousel" ref={carouselRef}>
      {/* Main Slider */}
      <div className="list">
        {images.map((img, index) => (
          <div key={index} className={`item ${index === currentIndex ? "active" : ""}`}>
            <img src={img.src} alt={img.alt} />
            <div className="content">
              <div className="author">{img.author}</div>
              <div className="title">{img.title}</div>
              <div className="topic">{img.topic}</div>
              <div className="des">{img.description}</div>
              <div className="buttons">
                <button>SEE MORE</button>
                <button>OFFERS</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Thumbnail Preview */}
      <div className="thumbnail">
        {images.map((img, index) => (
          <div key={index} className={`item ${index === currentIndex ? "active" : ""}`}>
            <img src={img.src} alt={img.alt} />
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <div className="arrows">
        <button onClick={() => showSlider("prev")}>{"<"}</button>
        <button onClick={() => showSlider("next")}>{">"}</button>
      </div>
    </div>
  );
};

export default Carousel;
