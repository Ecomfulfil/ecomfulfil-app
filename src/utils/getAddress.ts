export const getAddress = (place: any) => {
  const line1 = place.formatted_address.split(',')[0];
  const { city, state, country, postalCode } =
    place.address_components.reduce((acc: any, component: any) => {
      if (component.types.includes('locality'))
        acc.city = component.long_name;
      else if (
        component.types.includes('administrative_area_level_1')
      )
        acc.state = component.short_name;
      else if (component.types.includes('country'))
        acc.country = component.long_name;
      else if (component.types.includes('postal_code'))
        acc.postalCode = component.long_name;
      return acc;
    }, {});
  return { city, state, country, postalCode, line1 };
};
