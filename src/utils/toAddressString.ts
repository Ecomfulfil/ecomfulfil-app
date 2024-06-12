export const toAddressString = (address: any) => {
  return `${address?.line1 ?? ''}, ${address?.city ?? ''}, ${
    address?.state ?? ''
  } ${address?.postalCode ?? ''}`;
};
