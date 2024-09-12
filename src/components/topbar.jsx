import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

export default function Topbar() {
  const totalItemsCount = useSelector((state) => state.cart.items).reduce(
    (total, item) => (total += item.quantity),
    0,
  );

  return (
    <div className="flex items-center justify-between border-b bg-white p-4">
      <NavLink className="rounded bg-black p-2 text-2xl font-bold text-white">
        TeeRex Store
      </NavLink>
      <div className="flex items-center gap-2">
        <NavLink
          className={({ isActive }) => (isActive ? 'underline' : '')}
          to="/products"
        >
          Products
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${isActive ? 'underline' : ''} relative`
          }
          to="/cart"
        >
          Cart
          <div className="absolute -right-1/2 -top-1/2 h-6 w-6 rounded-full bg-black text-center text-white">
            {totalItemsCount}
          </div>
        </NavLink>
      </div>
    </div>
  );
}
