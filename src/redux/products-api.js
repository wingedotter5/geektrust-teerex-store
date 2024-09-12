import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://geektrust.s3.ap-southeast-1.amazonaws.com',
  }),
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => '/coding-problems/shopping-cart/catalogue.json',
    }),
  }),
});

export const { useGetAllProductsQuery } = productsApi;
export default productsApi;
