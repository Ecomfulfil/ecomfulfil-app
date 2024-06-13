import { setCookie, getCookie, deleteCookie } from 'cookies-next';

// Function to set a cookie
export const setSessionCookie = (key: any, value: any) => {
  setCookie(key, value, {
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 1 week
    secure: true,
  });
};

// Function to get a cookie
export const getSessionCookie = (key: any) => {
  return getCookie(key);
};

// Function to delete a cookie
export const deleteSessionCookie = (key: any) => {
  deleteCookie(key);
};
