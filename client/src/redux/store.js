import { configureStore } from '@reduxjs/toolkit';
import { authReducer } from './slices/authorization';
import { registReducer } from './slices/registration';
import { filterProdReducer } from './slices/filterProducts';
import { cardProductReducer } from './slices/cardProduct';
import { cartReducer } from './slices/cartLocal';
import { favoritesReducer } from './slices/wishList';
import { searchReducer } from './slices/search';
import { checkoutReducer } from './slices/checkout';
import { cartBackReducer } from './slices/cartBackEnd';
import { customerReducer } from './slices/customer';

export const store = configureStore({
  reducer: {
    authorization: authReducer,
    registration: registReducer,
    filterProducts: filterProdReducer,
    cardProduct: cardProductReducer,
    cartLocal: cartReducer,
    cartBackEnd: cartBackReducer,
    favorites: favoritesReducer,
    search: searchReducer,
    checkout: checkoutReducer,
    customer: customerReducer,
  },
});
