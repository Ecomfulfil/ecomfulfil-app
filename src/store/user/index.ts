import { USERS_URL } from '@/configs/constants';
import { apiSlice } from '../api';

export const userSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateUser: builder.mutation({
      query(body) {
        return {
          url: `${USERS_URL}`,
          method: 'PATCH',
          body: body,
        };
      },
      invalidatesTags: ['User'],
    }),
  }),
});

export const { useUpdateUserMutation } = userSlice;
