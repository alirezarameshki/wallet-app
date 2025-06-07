import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./index.css";
import { motion } from "framer-motion";

function WelcomeComponent({ setPage }) {
const slideContent = [
  {
    image: "../img/Group 1.svg",
    text: "Fastest Payment in the world",
    text2: "Integrate multiple payment methods to help you speed up the process quickly",
  },
  {
    image: "../img/Group 3.svg",
    text: "Connect with your friends instantly",
    text2: "Easy and fast communication with friends and family anytime",
  },
  {
    image: "../img/Group 4.svg",
    text: "Security and privacy are our priorities",
    text2: "Your information will always be safe with us",
  },
];;

  const [swiperRef, setSwiperRef] = useState(null);

 
  const pageVariants = {
    initial: { x: "100%", opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: "-100%", opacity: 0 },
  };

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="welcome-component"
    >
      <Swiper
        spaceBetween={0}
        slidesPerView={1}
        pagination={{ clickable: true }}
        modules={[Pagination, Navigation]}
        className="swiper-container"
        onSwiper={setSwiperRef}
      >
        {slideContent.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="slide-content">
              <img src={slide.image} alt={`Slide ${index + 1}`} className="slide-image" />
              <div className="pagination_slide"></div>
              <div className="texts">
                <div className="slide-text">{slide.text}</div>
                <p className="text2">{slide.text2}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        className="button-next"
        onClick={() => {
          if (swiperRef) {
            if (swiperRef.isEnd) {
              setPage("signIn");
            } else {
              swiperRef.slideNext();
            }
          }
        }}
      >
        Next
      </button>
    </motion.div>
  );
}

export default WelcomeComponent;