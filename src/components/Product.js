import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Product.css';
import { translateStatus } from '../api';

const Product = ({ name, price, status, id }) => {
  return (
    <div className='product'>
      <img src='./images/product.png' alt='' />

      <h3>{name}</h3>
      <div className='product__dividor' />
      <h3>{price} zł</h3>

      <div className='product__statuses'>
        {status &&
          status.map((e, idx) => (
            <div
              key={`product-${id}-status-${idx}`}
              className='product__status'
            >
              {translateStatus(e)}
            </div>
          ))}
      </div>
    </div>
  );
};

Product.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  status: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
};

export default Product;
