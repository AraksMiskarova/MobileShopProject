import React from 'react';
import { Container } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

import ButtonDark from '../../UI/Buttons/ButtonDark/ButtonDark';

import style from './AccessoriesInfo.module.scss';

function AccessoriesInfo() {
  const { ref, inView } = useInView({
    threshold: 0.1, //
    triggerOnce: true,
  });
  return (
    <Container maxWidth="lg">
      <div className={style.AccessoriesInfo}>
        <h2>
          <span>MobiStore</span> can also offer accessories for every taste!
        </h2>
        <NavLink
          className={style.link}
          to="/products/filter?categories=accessories"
        >
          <ButtonDark label="See more" />
        </NavLink>
        <div
          ref={ref}
          className={`${style.logo} ${inView ? style.visibleLogo : ''}`}
        >
          {' '}
        </div>
      </div>
    </Container>
  );
}

export default AccessoriesInfo;
