import { React } from 'react';

import { Container, Grid, Typography } from '@mui/material';
import style from './SuccessfulOrder.module.scss';

function SuccessfulOrder() {
  return (
    <Container maxWidth="lg">
      <Grid
        container
        spacing={1}
        display="flex"
        justifyContent="space-around"
        alignItems="center"
        marginTop="100px"
        style={{ backgroundColor: '#ffffff', borderRadius: '10px' }}
        padding="50px"
      >
        <Grid item className={style.info} textAlign="center" width="400px">
          <Typography variant="h4" mb={3}>
            Your order has succeeded!
          </Typography>
          <Typography variant="h4">
            Thank you for your shopping at MobiStore!
          </Typography>
        </Grid>
        <Grid item style={{ overflow: 'hidden' }} textAlign="center">
          <img src="/logo2.png" alt="" className={style.img} />
        </Grid>
      </Grid>
    </Container>
  );
}

export default SuccessfulOrder;
