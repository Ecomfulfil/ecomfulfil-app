export const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export const AUTH_URL = `/v1/auth`;
export const USERS_URL = `/v1/users`;
export const STORES_URL = `/v1/stores`;
export const CATEGORIES_URL = `/v1/categories`;
export const ITEMS_URL = `/v1/items`;
export const ORDERS_URL = `/v1/orders`;
export const STRIPE_URL = `/v1/stripe`;
export const SUBSCRIBERS_URL = '/v1/subscribers';

export const cities = [
  { label: 'Los Angeles', value: 'Los Angeles' },
  { label: 'San Francisco', value: 'San Francisco' },
  { label: 'San Diego', value: 'San Diego' },
  { label: 'Sacramento', value: 'Sacramento' },
  { label: 'San Jose', value: 'San Jose' },
  { label: 'Fresno', value: 'Fresno' },
  { label: 'Oakland', value: 'Oakland' },
  { label: 'Santa Barbara', value: 'Santa Barbara' },
  { label: 'Palm Springs', value: 'Palm Springs' },
  { label: 'Long Beach', value: 'Long Beach' },
];

export const states = [{ label: 'California', value: 'CA' }];

export const employmentTypes = [
  { label: 'Full-Time', value: 'Full-Time' },
  { label: 'Part-Time', value: 'Part-Time' },
  { label: 'Contract', value: 'Contract' },
  { label: 'Temporary', value: 'Temporary' },
  { label: 'Internship', value: 'Internship' },
  { label: 'Freelance', value: 'Freelance' },
  { label: 'Volunteer', value: 'Volunteer' },
];

export const days = [
  { label: 'Monday', value: 'Monday' },
  { label: 'Tuesday', value: 'Tuesday' },
  { label: 'Wednesday', value: 'Wednesday' },
  { label: 'Thursday', value: 'Thursday' },
  { label: 'Friday', value: 'Friday' },
  { label: 'Saturday', value: 'Saturday' },
  { label: 'Sunday', value: 'Sunday' },
];

export const months = [
  { label: 'January', value: 'January' },
  { label: 'February', value: 'February' },
  { label: 'March', value: 'March' },
  { label: 'April', value: 'April' },
  { label: 'May', value: 'May' },
  { label: 'June', value: 'June' },
  { label: 'July', value: 'July' },
  { label: 'August', value: 'August' },
  { label: 'September', value: 'September' },
  { label: 'October', value: 'October' },
  { label: 'November', value: 'November' },
  { label: 'December', value: 'December' },
];
