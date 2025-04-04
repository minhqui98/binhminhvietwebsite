import React from "react";
import { Carousel, Row, Col } from "react-bootstrap";
import { useMediaQuery } from "react-responsive";

const images = [
  "/images/carousel/carousel2.jpg",
  "/images/carousel/carousel3.jpg",
  "/images/carousel/carousel4.jpg",
  "/images/carousel/carousel1.jpg",
  "/images/carousel/carousel8.jpg",
  "/images/carousel/carousel6.jpg",
  "/images/carousel/carousel7.jpg",
  "/images/carousel/carousel5.jpg",

  // "https://via.placeholder.com/300x200?text=Image+2",
  // "https://via.placeholder.com/300x200?text=Image+3",
  // "https://via.placeholder.com/300x200?text=Image+4",
  // "https://via.placeholder.com/300x200?text=Image+5",
];

const ResponsiveCarousel = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  return (
    <div className="mt-5">
    <Carousel interval={2000} indicators={false} pause={false}>
      {isMobile
        ? images.map((img, index) => (
            <Carousel.Item key={index}>
              <img className="d-block w-100" src={img} alt={`Slide ${index}`} />
            </Carousel.Item>
          ))
        : images.reduce((acc, _, i, arr) => {
            if (i % 4 === 0) {
              acc.push(arr.slice(i, i + 4));
            }
            return acc;
          }, []).map((group, idx) => (
            <Carousel.Item key={idx}>
              <Row>
                {group.map((img, index) => (
                  <Col key={index} md={3}>
                    <img className="d-block w-100" src={img} alt={`Slide ${idx}-${index}`} />
                  </Col>
                ))}
              </Row>
            </Carousel.Item>
          ))}
    </Carousel>
    </div>
  );
};

export default ResponsiveCarousel;
