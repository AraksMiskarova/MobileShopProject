import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { Box, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ListCard from '../ListCard/ListCard';

function BrowsingHistory() {
  const [prodArr, setProdArr] = useState(null);

  const prodBrowsingHistory = JSON.parse(
    localStorage.getItem('prodBrowsingHistory') || null,
  );

  useEffect(() => {
    setProdArr(prodBrowsingHistory);
  }, []);

  const prodQuantity = prodArr <= 0;
  // take out the all styles in a separate object
  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: '#ffffff',
        borderRadius: '10px',
        padding: '10px',
      }}
    >
      <Typography
        sx={{ fontSize: '25px', fontWeight: '600', marginLeft: '25px' }}
      >
        Browsing History
      </Typography>
      <Box>
        {prodQuantity ? (
          <Grid container spacing={1} margin="auto">
            <Box sx={{ width: '100%', textAlign: 'center' }}>
              <p>Ooops...</p>
              <p>You still haven&apos;t viewed any items! So sad...</p>
              <SentimentVeryDissatisfiedIcon fontSize="large" />
            </Box>
          </Grid>
        ) : (
          <Grid container spacing={1} marginTop={0} marginBottom="auto">
            {prodArr &&
              prodArr.map((product, index) => (
                <ListCard
                  product={product}
                  key={index}
                  imageUrl={product.imageUrls[0]}
                  name={product.name}
                  currentPrice={product.currentPrice}
                  itemNo={product.itemNo}
                  lg={3}
                  md={4}
                  sm={6}
                />
              ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
}

export default BrowsingHistory;
