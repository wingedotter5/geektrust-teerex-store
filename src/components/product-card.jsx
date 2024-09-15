import PropTypes from 'prop-types';

import AddToCartButton from './add-to-cart-button';

export default function ProductCard({ product }) {
  return (
    <div className="flex flex-col gap-4 rounded border bg-white p-2">
      <div className="h-64">
        <img className="h-full w-full object-cover" src={product.imageURL} />
      </div>
      <hr />
      <div className="flex flex-col gap-1">
        <p className="text-lg font-bold">
          {product.name} ({product.gender})
        </p>
        <small>Available: {product.quantity}</small>
        <div className="flex items-center justify-between">
          <div>Rs {product.price}</div>
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
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
