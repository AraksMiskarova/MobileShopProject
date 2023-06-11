import { React } from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import style from './MainCardSlider.module.scss';

function MainCardSlider({ imageUrls }) {
  const dotsDisabled = true;

  return (
    <Slider
      dots={dotsDisabled}
      infinite="true"
      speed={500}
      slidesToShow={1}
      slidesToScroll={1}
      autoplay={false}
      arrows={false}
      className={style.slick_slider}
      dotsClass={style['slick-dots']}
    >
      <div className={style.slick_slide}>
        <img src={imageUrls[0]} alt="2" />
      </div>
      <div className={style.slick_slide}>
        <img src={imageUrls[1]} alt="2" />
      </div>
      <div className={style.slick_slide}>
        <img src={imageUrls[2]} alt="2" />
      </div>
      <div className={style.slick_slide}>
        <img src={imageUrls[3]} alt="2" />
      </div>
    </Slider>
  );
}

MainCardSlider.defaultProps = {
  imageUrls: ['/logo2.png', '/logo2.png', '/logo2.png', '/logo2.png'],
};

MainCardSlider.propTypes = {
  imageUrls: PropTypes.arrayOf(PropTypes.string),
};

export default MainCardSlider;
