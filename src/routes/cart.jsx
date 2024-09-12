import { useDispatch, useSelector } from 'react-redux';

import AddToCartButton from '../components/add-to-cart-button';
import Button from '../components/button';
import { removeFromCart } from '../redux/cart-slice';
import productsApi from '../redux/products-api';

export default function CartPage() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const { data: products } = useSelector(
    productsApi.endpoints.getAllProducts.select(),
  );
  const totalAmount = cartItems.reduce(
    (total, item) => (total += item.quantity * item.price),
    0,
  );

  return (
    <div>
      <h2 className="mb-4 text-2xl">Shopping Cart</h2>
      {cartItems.length ? (
        <div className="flex max-w-lg flex-col gap-4">
          <ul className="divide-y rounded border">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="grid grid-cols-[auto_1fr_auto] items-center gap-4 p-2"
              >
                <img
                  className="h-12 w-12"
                  src={item.imageURL}
                  alt={item.name}
                />
                <div>
                  <p>{item.name}</p>
                  <p>Rs {item.price}</p>
                </div>
                <div className="flex items-center gap-2 justify-self-end">
                  <AddToCartButton
                    product={products.find((product) => product.id === item.id)}
                  />
                  <Button onClick={() => dispatch(removeFromCart(item.id))}>
                    Remove
                  </Button>
                </div>
              </li>
            ))}
          </ul>
          <hr />
          <div className="text-center text-lg">
            Total amount Rs {totalAmount}
          </div>
          <Button>Checkout</Button>
        </div>
      ) : (
        <p>Cart is empty</p>
      )}
    </div>
  );
}
