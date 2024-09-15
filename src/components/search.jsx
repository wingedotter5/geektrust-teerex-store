import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import Button from './button';

export default function Search({
  className,
  placeholder,
  onSearch,
  initialValue = '',
}) {
  const [query, setQuery] = useState(initialValue);

  function onSubmit(event) {
    event.preventDefault();
    onSearch(query);
  }

  function onChange(event) {
    setQuery(event.target.value);
  }

  useEffect(() => {
    setQuery(initialValue);
  }, [initialValue]);

  return (
    <form
      onSubmit={onSubmit}
      className={`flex items-center gap-2 bg-white ${className ? className : ''}`}
    >
      <input
        name="search"
        value={query}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full flex-1 border-b p-2 focus:border-black focus:outline-none"
      />
      <Button>Search</Button>
    </form>
  );
}

Search.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
  initialValue: PropTypes.string,
};
