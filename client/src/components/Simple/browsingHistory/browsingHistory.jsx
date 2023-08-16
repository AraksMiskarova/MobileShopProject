import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { Box, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ListCard from '../../Smart/ListCard/ListCard';

function BrowsingHistory() {
  const [prodArr, setProdArr] = useState(null);
  const prodQuantity = prodArr <= 0;

  const prodBrowsingHistory = JSON.parse(
    localStorage.getItem('prodBrowsingHistory') || null,
  );

  useEffect(() => {
    setProdArr(prodBrowsingHistory);
  }, [prodBrowsingHistory]);

  // fix style , set styles in object
  return (
    <Box
      sx={{ width: '100%', backgroundColor: '#ffffff', borderRadius: '10px' }}
    >
      <Typography sx={{ fontSize: '25px', fontWeight: '600' }}>
        BrowsingHistory
      </Typography>
      <Box>
        {prodQuantity ? (
          <Grid container spacing={1} margin="auto">
            <Box>
              <p>Ooops...</p>
              <p>
                There were no products with suitable filter settings, try
                changing your search parameters.
              </p>
              <SentimentVeryDissatisfiedIcon fontSize="large" />
            </Box>
          </Grid>
        ) : (
          <Grid container spacing={1} marginTop={0} marginBottom="auto">
            {prodArr.map((product, index) => (
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
