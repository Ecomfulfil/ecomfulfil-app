import {
  fetchBaseQuery,
  createApi,
} from '@reduxjs/toolkit/query/react';
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';
import { BASE_URL } from '@/configs/constants';
import {
  deleteSessionCookie,
  getSessionCookie,
  setSessionCookie,
} from '@/utils/cookies';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders(headers) {
    const tokensString = getSessionCookie('tokens');
    if (tokensString) {
      const tokens = JSON.parse(tokensString);
      if (tokens) {
        headers.set('Authorization', `Bearer ${tokens.access.token}`);
      }
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  const tokensString = getSessionCookie('tokens');
  if (result.error && result.error.status === 401 && tokensString) {
    const tokens = JSON.parse(tokensString);
    const refreshToken = tokens.refresh.token || '';

    const refreshResult: any = await baseQuery(
      {
        url: '/v1/auth/refresh-tokens',
        method: 'POST',
        body: { refreshToken },
      },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      setSessionCookie(
        'tokens',
        JSON.stringify(refreshResult.data.tokens)
      );
      result = await baseQuery(args, api, extraOptions);
    } else {
      deleteSessionCookie('tokens');
      deleteSessionCookie('user');
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User', 'Store', 'Category', 'Item', 'Order', 'Stripe'],
  endpoints: (builder) => ({}),
});
