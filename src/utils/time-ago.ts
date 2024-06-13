import TimeAgo from 'javascript-time-ago';

// English.
import en from 'javascript-time-ago/locale/en';

TimeAgo.addDefaultLocale(en);

export const timeAgo = (date: string) => {
  const t = new TimeAgo('en-US');
  return t.format(new Date(date));
};
