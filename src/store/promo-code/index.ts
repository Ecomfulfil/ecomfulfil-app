import { PROMO_CODES_URL } from '@/configs/constants';
import { apiSlice } from '../api';

export const promoCodeSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    validatePromoCode: builder.mutation({
      query(body) {
        return {
          url: `${PROMO_CODES_URL}/validate`,
          method: 'POST',
          body: body,
        };
      },
    }),
  }),
});

export const { useValidatePromoCodeMutation } = promoCodeSlice;
