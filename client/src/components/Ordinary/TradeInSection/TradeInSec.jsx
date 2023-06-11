import { React } from 'react';
import { Container } from '@mui/material';

import { useInView } from 'react-intersection-observer';

import style from './TradeInSec.module.scss';

function TradeInSec() {
  const { ref, inView } = useInView({
    threshold: 0.01,
    triggerOnce: true,
  });

  return (
    <div className={style.tradeInSec}>
      <div
        ref={ref}
        className={`${style.leftSide} ${inView ? style.visibleLeft : ''}`}
      >
        {' '}
      </div>
      <Container maxWidth="lg">
        {' '}
        <div className={style.infoTxt}>
          <h2>
            In <span>MobiStore</span> you can use the <span>Trade-in</span>{' '}
            service and exchange your old gadget for a new one at favorable
            conditions!
          </h2>
        </div>
      </Container>
      <div
        ref={ref}
        className={`${style.rightSide} ${inView ? style.visibleRight : ''}`}
      >
        {' '}
      </div>
    </div>
  );
}

export default TradeInSec;
