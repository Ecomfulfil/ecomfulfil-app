export const isCurrentDateBetween = (
  startDateString: string,
  endDateString: string
) => {
  const currentDate = new Date();
  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);

  return currentDate >= startDate && currentDate <= endDate;
};
