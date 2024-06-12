import { AUTH_URL } from '@/configs/constants';
import { apiSlice } from '../api';

export const userSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getConfig: builder.query({
      query: () => ({
        url: `/v1/config`,
      }),
    }),
    getMe: builder.query({
      query: () => ({
        url: `${AUTH_URL}/me`,
      }),
      keepUnusedDataFor: 5,
    }),
    login: builder.mutation({
      query(body) {
        return {
          url: `${AUTH_URL}/login`,
          method: 'POST',
          body,
        };
      },
    }),
    register: builder.mutation({
      query(body) {
        return {
          url: `${AUTH_URL}/register`,
          method: 'POST',
          body,
        };
      },
    }),
    forgotPassword: builder.mutation({
      query(body) {
        return {
          url: `${AUTH_URL}/forgot-password`,
          method: 'POST',
          body,
        };
      },
    }),
    resetPassword: builder.mutation({
      query({ token, body }) {
        return {
          url: `${AUTH_URL}/reset-password?token=${token}`,
          method: 'POST',
          body,
        };
      },
    }),
    deleteAccount: builder.mutation({
      query(body) {
        return {
          url: `${AUTH_URL}/delete-account`,
          method: 'POST',
          body,
        };
      },
    }),
  }),
});

export const {
  useGetConfigQuery,
  useGetMeQuery,
  useLoginMutation,
  useRegisterMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useDeleteAccountMutation,
} = userSlice;
