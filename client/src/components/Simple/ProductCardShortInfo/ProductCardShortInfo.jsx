import React from 'react';
import { ListItem, IconButton, Divider } from '@mui/material';
import { Close } from '@mui/icons-material';
import style from './ProductCardShortInfo.module.scss';

function ProductCardShortInfo() {
  return (
    <ListItem>
      <div className={style.items}>
        <div className={style.img}>
          <img
            src="https://cdn.tehnoezh.ua/0/0/0/0/4/4/5/6/3/000044563_545_545.jpeg"
            alt=""
          />
        </div>
        <div>
          <div className={style.text}>
            Б/У Apple iPhone 11 128 Gb Purple (Отличное),UAH
          </div>
          <div className={style.buttons}>
            <BasketQuantity />
            <div>
              <IconButton>
                <Close />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
      <Divider />
    </ListItem>
  );
}

export default ProductCardShortInfo;
