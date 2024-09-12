import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { addToCart, reduceItem } from '../redux/cart-slice';
import Button from './button';

export default function AddToCartButton({ product }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const increment = () => {
    try {
      dispatch(addToCart(product));
    } catch (error) {
      alert(error.message);
    }
  };

  const decrement = () => {
    dispatch(reduceItem(product.id));
  };

  const count = cartItems.find((item) => item.id === product.id)?.quantity || 0;

  if (count > 0) {
    return (
      <div className="flex w-28 items-center gap-2 rounded bg-black p-2 px-3 text-white">
        <button
          className="h-6 w-6 rounded-full border bg-white text-center text-black"
          onClick={decrement}
        >
          -
        </button>
        <div className="flex flex-1 items-center justify-center">{count}</div>
        <button
          className="h-6 w-6 rounded-full border bg-white text-center text-black"
          onClick={increment}
        >
          +
        </button>
      </div>
    );
  }

  return (
    <Button onClick={increment} className="w-28">
      Add to cart
    </Button>
  );
}

AddToCartButton.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    imageURL: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    price: PropTypes.number,
    currency: PropTypes.string,
    color: PropTypes.string,
    gender: PropTypes.string,
    quantity: PropTypes.number,
  }).isRequired,
};
