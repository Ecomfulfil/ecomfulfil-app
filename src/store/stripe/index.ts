import { STRIPE_URL } from '@/configs/constants';
import { apiSlice } from '../api';

export const storeSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createTopupSession: builder.mutation({
      query(body) {
        return {
          url: `${STRIPE_URL}/create-topup-session`,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Stripe'],
    }),
  }),
});

export const { useCreateTopupSessionMutation } = storeSlice;
