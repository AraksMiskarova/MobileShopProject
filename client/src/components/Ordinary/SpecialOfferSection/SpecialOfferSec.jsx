import React from 'react';
import { Container } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

import ButtonWhite from '../../UI/Buttons/ButtonWhite/ButtonWhite';

import style from './SpecialOfferSec.module.scss';

function SpecialOfferSec() {
  const { ref, inView } = useInView({
    threshold: 0.1, //
    triggerOnce: true,
  });
  return (
    <div ref={ref} className={style.specialOfferSec}>
      <Container maxWidth="lg">
        <h2>Special for You!</h2>
        <h3>
          iPhone 14 Pro is now available in the <span>MobiStore</span>!
        </h3>
        <NavLink className={style.link} to="/products/303125">
          <ButtonWhite label="Buy Now" />
        </NavLink>
        <div
          className={`${style.specialBcgr} ${
            inView ? style.visibleSpecialBcgr : ''
          }`}
        >
          {' '}
        </div>
      </Container>
    </div>
  );
}

export default SpecialOfferSec;
