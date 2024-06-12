import { ORDERS_URL } from '@/configs/constants';
import { apiSlice } from '../api';

export const orderSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: (params) => ({
        url: `${ORDERS_URL}/history`,
        params,
      }),
      providesTags: ['Order'],
      keepUnusedDataFor: 5,
    }),
    getOrder: builder.query({
      query: (id) => ({
        url: `${ORDERS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createOrder: builder.mutation({
      query(body) {
        return {
          url: `${ORDERS_URL}`,
          method: 'POST',
          body: body,
        };
      },
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useGetOrderQuery,
  useCreateOrderMutation,
} = orderSlice;
