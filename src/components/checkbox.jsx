import PropTypes from 'prop-types';

export default function Checkbox({ className, ...props }) {
  return (
    <input
      type="checkbox"
      className={`grid h-[1em] w-[1em] appearance-none place-content-center border before:hidden before:h-[0.6em] before:w-[0.6em] before:bg-black checked:border-black checked:before:grid ${className ?? ''}`}
      {...props}
    />
  );
}

Checkbox.propTypes = {
  className: PropTypes.string,
};
