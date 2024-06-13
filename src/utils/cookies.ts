import { setCookie, getCookie, deleteCookie } from 'cookies-next';

// Function to set a cookie
export const setSessionCookie = (key: any, value: any) => {
  setCookie(key, value, {
    domain: process.env.NEXT_PUBLIC_DOMAIN || 'localhost',
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    secure: process.env.NODE_ENV === 'production',
  });
};

// Function to get a cookie
export const getSessionCookie = (key: any) => {
  return getCookie(key, {
    domain: process.env.NEXT_PUBLIC_DOMAIN || 'localhost',
  });
};

// Function to delete a cookie
export const deleteSessionCookie = (key: any) => {
  deleteCookie(key, {
    domain: process.env.NEXT_PUBLIC_DOMAIN || 'localhost',
  });
};
