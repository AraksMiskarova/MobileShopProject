import { React, useState, useEffect } from 'react';
import Slider from 'react-slick';
import { useMediaQuery } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import style from './MainSlider.module.scss';

function MainSlider() {
  const dotsDisabled = true;

  const isMobile = useMediaQuery('(max-width:1300px)');
  const [isAutoplay, setIsAutoplay] = useState(false);
  const [endStatus, setEndStatus] = useState(false);
  const [mouseEnter, setMouseEnter] = useState(false);

  const handleMouseEnterTrue = () => {
    setMouseEnter(true);
  };

  const handleMouseEnterFalse = () => {
    setMouseEnter(false);
  };

  const handleEndTrue = () => {
    setEndStatus(true);
  };

  const handleEndFalse = () => {
    setEndStatus(false);
  };

  useEffect(() => {
    if (endStatus && mouseEnter) {
      setIsAutoplay(true);
    }
    if (!mouseEnter) {
      setIsAutoplay(false);
    }
  }, [endStatus, mouseEnter]);

  return (
    <div
      onMouseEnter={handleMouseEnterTrue}
      onMouseLeave={handleMouseEnterFalse}
    >
      {' '}
      <Slider
        dots={dotsDisabled}
        infinite="true"
        speed={!isAutoplay ? 3000 : 400}
        slidesToShow={!isMobile ? 2 : 1}
        slidesToScroll={1}
        autoplay="true"
        autoplaySpeed={4000}
        arrows={false}
        className={style.slick_slider}
        dotsClass={style['slick-dots']}
        afterChange={handleEndTrue}
        beforeChange={handleEndFalse}
      >
        <div className={style.slick_slide}>
          <img src="/Slide1.jpg" alt="2" />
        </div>
        <div className={style.slick_slide}>
          <img src="/Slide2.jpg" alt="2" />
        </div>
        <div className={style.slick_slide}>
          <img src="/Slide3.jpg" alt="2" />
        </div>
        <div className={style.slick_slide}>
          <img src="/Slide4.jpg" alt="2" />
        </div>
        <div className={style.slick_slide}>
          <img src="/Slide5.jpg" alt="2" />
        </div>
        <div className={style.slick_slide}>
          <img src="/Slide6.jpg" alt="2" />
        </div>
      </Slider>
      <div
        style={{ width: '100%', height: '30px', backgroundColor: '#000000' }}
      >
        {}
      </div>
    </div>
  );
}

export default MainSlider;
