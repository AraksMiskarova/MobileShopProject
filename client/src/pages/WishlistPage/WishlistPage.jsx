import { React, useEffect } from 'react';
import { Grid, Container } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import style from './WishlistPage.module.scss';
import ListCard from '../../components/Smart/ListCard/ListCard';
import {
  setSelectedProductsFav,
  stateSelectedProductsFav,
} from '../../redux/slices/wishList';

function WishlistPage() {
  const dispatch = useDispatch();
  const selectedProductsFav = useSelector(stateSelectedProductsFav);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(selectedProductsFav));
  }, [selectedProductsFav]);

  useEffect(() => {
    const data = localStorage.getItem('favorites');
    const jsonFav = JSON.parse(data);
    if (jsonFav) {
      dispatch(setSelectedProductsFav(jsonFav));
    }
  }, []);

  return (
    <Container maxWidth="lg">
      <div className={style.title}>
        <h2>Your Wishlist In MobiStore</h2>
        <p>
          We all have some desires, this is your wish list in MobiStore. What is
          it for? You can share your wish list with others, for example in the
          form of a clue what you want for your birthday. Or note what you
          liked, so as not to fill your head with unnecessary trifles. And if
          you know what you need this product later, save it here so you do not
          have to look it up later.
        </p>
      </div>
      <Grid container spacing={1} marginTop={0} marginBottom={5}>
        {selectedProductsFav &&
          selectedProductsFav.map((product, index) => (
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
    </Container>
  );
}

export default WishlistPage;
