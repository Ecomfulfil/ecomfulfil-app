export const isStoreOpenAndUntil = (
  store: any,
  currentTime = new Date()
) => {
  if (store.serialNumber === 2) {
    console.log(store);
  }
  if (
    !store.operationalInfo ||
    !store.operationalInfo.timeZone ||
    !store.operationalInfo.timings
  ) {
    console.error(
      'Store timezone or operational timings are not defined'
    );
    return { isOpen: false, openUntil: null };
  }
  const { timeZone, timings } = store.operationalInfo;

  // Convert the current time to the store's local time
  const localTime = new Date(
    currentTime.toLocaleString('en-US', { timeZone })
  );

  // Get the current day of the week
  const days = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ];
  const currentDay = days[localTime.getDay()].toLowerCase();

  // Find today's timings
  const todayTimings = timings[currentDay];

  if (
    !todayTimings ||
    !todayTimings.isOpen ||
    !todayTimings.slots ||
    todayTimings.slots.length === 0
  ) {
    return { isOpen: false, openUntil: null };
  }

  for (const slot of todayTimings.slots) {
    const [openingHour, openingMinute] = slot.from
      .split(':')
      .map(Number);
    const [closingHour, closingMinute] = slot.to
      .split(':')
      .map(Number);

    // Create date objects for the opening and closing times
    const openingTime = new Date(localTime);
    openingTime.setHours(openingHour, openingMinute, 0);

    const closingTime = new Date(localTime);
    closingTime.setHours(closingHour, closingMinute, 0);

    // Check if current time is within this slot
    if (localTime >= openingTime && localTime < closingTime) {
      const openUntil = `${closingTime.getHours()}:${closingTime
        .getMinutes()
        .toString()
        .padStart(2, '0')}`;
      return {
        isOpen: true,
        openUntil: convertTo12HourFormat(openUntil),
      };
    }
  }

  return { isOpen: false, openUntil: null };
};

export const getRelativeDay = (day: any) => {
  const days = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
  ];
  const todayIndex = new Date().getDay();
  if (day === days[todayIndex]) return 'Today';
  if (day === days[(todayIndex + 1) % 7]) return 'Tomorrow';
  return day.charAt(0).toUpperCase() + day.slice(1);
};

export const convertTo12HourFormat = (time: any) => {
  if (time === '00:00') return '12:00 AM'; // Special case for midnight

  const [hours, minutes] = time.split(':').map(Number);
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const convertedHours = hours % 12 || 12; // Converts '0' to '12'

  return `${convertedHours}:${
    minutes < 10 ? '0' + minutes : minutes
  } ${ampm}`;
};
