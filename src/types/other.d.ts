interface MonthYear {
  year: number;
  month: number;
}

interface Fns {
  cardType(cardNumber: string): string;
  formatCardNumber(cardNumber: string): string;
  validateCardNumber(cardNumber: string): boolean;
  validateCardCVC(cvc: string, type?: string): boolean;
  validateCardExpiry(monthYear: string, year?: string): boolean;
  cardExpiryVal(monthYear: string | HTMLInputElement): MonthYear;
}

export type PaymentTypes = {
  fns: Fns;
  formatCardCVC(elem: HTMLInputElement): HTMLInputElement;
  restrictNumeric(elem: HTMLInputElement): HTMLInputElement;
  formatCardNumber(elem: HTMLInputElement): HTMLInputElement;
  formatCardExpiry(elem: HTMLInputElement): HTMLInputElement;
};

export type DeliveryDetail = {
  id?: string;
  name: string;
  phone: string;
  title: string;
  dropOff: number;
  note?: string;
  address: {
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    latitude: number;
    longitude: number;
  };
};
