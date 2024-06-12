export const generateYears = () => {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = 0; i < 20; i++) {
    years.push({
      label: String(currentYear + i),
      value: String(currentYear + i),
    });
  }
  return years;
};
