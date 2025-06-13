import React from "react";
import { Carousel, Container, Button } from "react-bootstrap";
import Img1 from "../assets/carousel/temp.png";
import Img2 from "../assets/carousel/temp.png";
import Img3 from "../assets/carousel/temp.png";
import { useNavigate } from "react-router-dom";

const SLIDE_HEIGHT = 300; // px, adjust as you like

const ControlledCarousel = () => {
  const navigate = useNavigate();
  const goToShop = async () => {
    navigate(`/products`, {});
  };
  return (
    <Container className="px-4 my-4">
      <Carousel fade interval={3000} controls={false} indicators pause={false}>
        {[Img1, Img2, Img3].map((src, idx) => (
          <Carousel.Item key={idx}>
            <div
              style={{
                position: "relative", // make this container the positioning context
                height: SLIDE_HEIGHT,
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
              }}
            >
              <img
                src={src}
                alt={`Slide ${idx + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
              <Button
                className="woody-toggle-btn"
                style={{
                  position: "absolute",
                  bottom: "20px",
                  left: "50%",
                  transform: "translateX(-600%)",
                  zIndex: 2,
                }}
                onClick={goToShop}
              >
                Shop Now
              </Button>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default ControlledCarousel;
