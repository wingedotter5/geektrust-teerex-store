import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import {
  colorChange,
  genderChange,
  priceRangeChange,
  typeChange,
} from '../redux/products-slice';
import Checkbox from './checkbox';

export default function Filters({ className, products }) {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.products.filters);
  const availableColors = Array.from(
    new Set(products.map((product) => product.color)),
  ).sort();
  const availableGender = Array.from(
    new Set(products.map((product) => product.gender)),
  ).sort();
  const priceRanges = [
    {
      '0 - Rs 250': '0to250',
    },
    {
      'Rs 250 - 450': '250to450',
    },
    {
      'Rs 450+': '450to',
    },
  ];
  const availableTypes = Array.from(
    new Set(products.map((product) => product.type)),
  ).sort();

  function colorChangeHandler(event) {
    dispatch(
      colorChange({
        color: event.target.name,
        checked: event.target.checked,
      }),
    );
  }

  function genderChangeHandler(event) {
    dispatch(
      genderChange({
        gender: event.target.name,
        checked: event.target.checked,
      }),
    );
  }

  function priceRangeChangeHandler(event, value) {
    dispatch(
      priceRangeChange({
        range: value,
        checked: event.target.checked,
      }),
    );
  }

  function typeChangeHandler(event) {
    dispatch(
      typeChange({
        type: event.target.name,
        checked: event.target.checked,
      }),
    );
  }

  return (
    <div className={`flex min-w-64 flex-col gap-4 ${className ?? ''}`}>
      <div>
        <p className="font-bold text-black">Color</p>
        <div className="flex flex-col gap-1 pl-2">
          {availableColors.map((color) => (
            <label
              key={color}
              className="flex cursor-pointer items-center gap-2"
            >
              <Checkbox
                name={color}
                checked={filters.color.includes(color)}
                onChange={colorChangeHandler}
              />{' '}
              {color}
            </label>
          ))}
        </div>
      </div>
      <div>
        <p className="font-bold text-black">Gender</p>
        <div className="flex flex-col gap-1 pl-2">
          {availableGender.map((gender) => (
            <label
              key={gender}
              className="flex cursor-pointer items-center gap-2"
            >
              <Checkbox
                name={gender}
                checked={filters.gender.includes(gender)}
                onChange={genderChangeHandler}
              />{' '}
              {gender}
            </label>
          ))}
        </div>
      </div>
      <div>
        <p className="font-bold text-black">Price</p>
        <div className="flex flex-col gap-1 pl-2">
          {priceRanges.map((range) => {
            const [label, value] = Object.entries(range)[0];
            return (
              <label
                key={label}
                className="flex cursor-pointer items-center gap-2"
              >
                <Checkbox
                  name={label}
                  checked={filters.price.includes(value)}
                  onChange={(event) => priceRangeChangeHandler(event, value)}
                />{' '}
                {label}
              </label>
            );
          })}
        </div>
      </div>
      <div>
        <p className="font-bold text-black">Type</p>
        <div className="flex flex-col gap-1 pl-2">
          {availableTypes.map((type) => (
            <label
              key={type}
              className="flex cursor-pointer items-center gap-2"
            >
              <Checkbox
                name={type}
                checked={filters.type.includes(type)}
                onChange={typeChangeHandler}
              />{' '}
              {type}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

Filters.propTypes = {
  className: PropTypes.string,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      imageURL: PropTypes.string,
      name: PropTypes.string,
      type: PropTypes.string,
      price: PropTypes.number,
      currency: PropTypes.string,
      color: PropTypes.string,
      gender: PropTypes.string,
      quantity: PropTypes.number,
    }),
  ).isRequired,
};
