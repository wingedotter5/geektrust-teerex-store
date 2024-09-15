import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import Filters from '../components/filters';
import ProductCard from '../components/product-card';
import Search from '../components/search';
import { useGetAllProductsQuery } from '../redux/products-api';
import { searchTextChange } from '../redux/products-slice';

export default function ProductsPage() {
  const dispatch = useDispatch();
  const [, setSearchParams] = useSearchParams();
  const filters = useSelector((state) => state.products.filters);
  const { data: products, error, isLoading } = useGetAllProductsQuery();
  const [isShowFiltersMobile, setIsShowFiltersMobile] = useState(false);

  if (isLoading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  if (error) {
    return <div className="p-10 text-center">{error.error}</div>;
  }

  function onSearch(query) {
    dispatch(searchTextChange(query));
    setSearchParams((params) => {
      params.set('query', query);
      return params;
    });
  }

  function showFiltersMobile() {
    setIsShowFiltersMobile(true);
  }

  function hideFiltersMobile() {
    setIsShowFiltersMobile(false);
  }

  const productsToRender = getProductsToRender(products, filters);

  return (
    <div className="flex items-start gap-2">
      <Filters
        products={products}
        className="sticky top-2 hidden rounded border p-2 md:flex"
      />
      <div className="flex flex-1 flex-col gap-4">
        <div className="flex items-center gap-2 bg-white">
          <Search
            className="flex-1"
            onSearch={onSearch}
            placeholder="Search for products"
            initialValue={filters.searchText}
          />
          <button
            onClick={showFiltersMobile}
            className="rounded bg-black p-2 md:hidden"
          >
            🔧
          </button>
        </div>
        {productsToRender.length ? (
          <div>
            <p className="mb-4">{productsToRender.length} matches found</p>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
              {productsToRender.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ) : (
          <h2 className="p-8 text-center">No match found</h2>
        )}
      </div>
      {isShowFiltersMobile ? (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] md:hidden">
          <div className="absolute right-0 top-0 flex h-full w-[80%] flex-col gap-2 bg-white p-2">
            <Filters products={products} />
            <button
              onClick={hideFiltersMobile}
              className="bg-black py-2 text-white"
            >
              Done
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function getProductsToRender(products, filters) {
  return products
    .filter(
      (product) =>
        product.name.toLowerCase().includes(filters.searchText) ||
        product.color.toLowerCase().includes(filters.searchText) ||
        product.type.toLowerCase().includes(filters.searchText),
    )
    .filter((product) => {
      if (filters.price.length === 0) {
        return true;
      }

      for (const range of filters.price) {
        const rangeSplit = range.split('to');
        const min = parseInt(rangeSplit[0]);
        const max = rangeSplit[1] ? parseInt(rangeSplit[1]) : Infinity;

        if (product.price >= min && product.price <= max) {
          return true;
        }
      }

      return false;
    })
    .filter((product) =>
      filters.color.length ? filters.color.includes(product.color) : true,
    )
    .filter((product) =>
      filters.gender.length ? filters.gender.includes(product.gender) : true,
    )
    .filter((product) =>
      filters.type.length ? filters.type.includes(product.type) : true,
    );
}
