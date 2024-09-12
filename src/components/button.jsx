import PropTypes from 'prop-types';

export default function Button({ children, className, ...props }) {
  return (
    <button
      className={`rounded bg-black p-2 text-white ${className ?? ''}`}
      {...props}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};
