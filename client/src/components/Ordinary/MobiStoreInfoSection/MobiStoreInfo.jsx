import { React } from 'react';
import { Container } from '@mui/material';

import { useInView } from 'react-intersection-observer';

import style from './MobiStoreInfo.module.scss';

function MobiStoreInfo() {
  const { ref, inView } = useInView({
    threshold: 0.01,
    triggerOnce: true,
  });

  return (
    <div className={style.mobiStoreInfo}>
      <div
        ref={ref}
        className={`${style.leftSide} ${inView ? style.visibleLeft : ''}`}
      >
        {' '}
      </div>
      <div
        ref={ref}
        className={`${style.info} ${inView ? style.visibleInfo : ''}`}
      >
        <Container maxWidth="lg">
          {' '}
          <div className={style.infoTxt}>
            <h2>MobiStore - dealer of your telephone delight!</h2>
            <p>
              Today, digital technologies continue to develop at an incredible
              pace and new products appear on the market every day that amaze us
              with their capabilities and functionality. One of the most
              in-demand devices are smartphones, which have long become an
              integral part of our lives.
            </p>
            <p>
              Smartphones, tablets, laptops and other electronic devices not
              only simplify our lives, but also are key tools for increasing our
              productivity. Each device has its own unique features and
              capabilities that have been developed by professionals in the
              field of science and technology.
            </p>
            <p>
              If you want to buy a new smartphone, then turn to the{' '}
              <span>MobiStore</span>, which offers a wide selection of devices
              with a warranty and the ability to test before buying. Trained
              specialists will help you make the right choice and provide
              qualified assistance.
            </p>
            <p>
              In addition, <span>MobiStore</span> provides services of a service
              center, where you can get warranty and non-warranty repair of your
              device in the shortest possible time. Our center cares about the
              quality of service and is ready to offer you a fast and efficient
              solution to problems with your device.
            </p>
            <p>
              So, do not postpone the purchase of a new device, turn to{' '}
              <span>MobiStore</span> and get not only a great product, but also
              professional support in using technologies!
            </p>
          </div>
        </Container>
      </div>
      <div
        ref={ref}
        className={`${style.rightSide} ${inView ? style.visibleRight : ''}`}
      >
        {' '}
      </div>
    </div>
  );
}

export default MobiStoreInfo;
