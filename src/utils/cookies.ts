import { setCookie, getCookie, deleteCookie } from 'cookies-next';

// Function to set a cookie
export const setSessionCookie = (
  key: any,
  value: any,
  domain: string = 'localhost'
) => {
  setCookie(key, value, {
    domain,
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    secure: process.env.NODE_ENV === 'production',
  });
};

// Function to get a cookie
export const getSessionCookie = (
  key: any,
  domain: string = 'localhost'
) => {
  return getCookie(key, { domain });
};

// Function to delete a cookie
export const deleteSessionCookie = (
  key: any,
  domain: string = 'localhost'
) => {
  deleteCookie(key, { domain });
};
