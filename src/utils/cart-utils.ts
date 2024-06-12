import { toast } from 'react-toastify';
import { isCurrentDateBetween } from './dateUtils';

export const calculateEstimatedTime = (preparationTime: any) => {
  // Calculate the average preparation time in minutes
  let preparationTimeInMinutes;
  if (preparationTime.unit === 'minutes') {
    preparationTimeInMinutes =
      (preparationTime.min + preparationTime.max) / 2;
  } else if (preparationTime.unit === 'hours') {
    preparationTimeInMinutes =
      ((preparationTime.min + preparationTime.max) / 2) * 60;
  } else {
    throw new Error(`Unsupported time unit: ${preparationTime.unit}`);
  }

  // Get the current time
  const currentTime = new Date();

  // Add the total estimated time to the current time
  const estimatedTime = new Date(
    currentTime.getTime() + preparationTimeInMinutes * 60000
  );

  // Format the estimated time in UTC
  const formattedEstimatedTime =
    estimatedTime.toISOString().slice(0, -5) + 'Z';

  return formattedEstimatedTime;
};

export const addDecimals = (num: any) => {
  return ((num || 0) / 100).toFixed(2);
};

export const calculateDiscount = (amount: number, discount: any) => {
  if (
    discount &&
    isCurrentDateBetween(discount.startDate, discount.endDate) &&
    discount.isActive &&
    amount > discount.minimumOrderAmount
  ) {
    if (discount!.type == 'percentage') {
      let discountAmount = 0;
      discountAmount = (amount / 100) * (discount?.value ?? 1);
      discountAmount =
        discountAmount > (discount!.maximumDiscountAmount ?? 0)
          ? discount!.maximumDiscountAmount ?? 0
          : discountAmount;

      return -Math.round(discountAmount);
    } else {
      return -discount.value;
    }
  }
  return 0;
};

// NOTE: the code below has been changed from the course code to fix an issue
// with type coercion of strings to numbers.
// Our addDecimals function expects a number and returns a string, so it is not
// correct to call it passing a string as the argument.

export const updateCart = (state: any) => {
  // Calculate the items price in whole number (pennies) to avoid issues with
  // floating point number calculations
  const itemsPrice = state.cartItems.reduce(
    (acc: any, item: any) =>
      acc + (item.price * 100 * item.qty) / 100,
    0
  );
  state.itemsPrice = addDecimals(itemsPrice);

  // Calculate the shipping price
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  state.shippingPrice = addDecimals(shippingPrice);

  // Calculate the tax price
  const taxPrice = 0.15 * itemsPrice;
  state.taxPrice = addDecimals(taxPrice);

  const totalPrice = itemsPrice + shippingPrice + taxPrice;
  // Calculate the total price
  state.totalPrice = addDecimals(totalPrice);

  // Save the cart to localStorage
  localStorage.setItem('cart', JSON.stringify(state));

  return state;
};

export const updateModification = (
  modifications: any,
  modifierGroup: any,
  modifier: any
) => {
  // Clone the modifications array to avoid direct mutation
  let updatedModifications = [...modifications];

  // Find the index of the modifier group
  const groupIndex = updatedModifications.findIndex(
    (g) => g.id === modifierGroup.id
  );

  if (groupIndex !== -1) {
    // Find the index of the modifier within the group
    const modifierIndex = updatedModifications[
      groupIndex
    ].modifiers.findIndex((m: any) => m.id === modifier.id);

    if (modifierIndex !== -1) {
      // Modifier found, remove it
      updatedModifications[groupIndex].modifiers.splice(
        modifierIndex,
        1
      );

      // Remove the group if no modifiers are left
      if (updatedModifications[groupIndex].modifiers.length === 0) {
        updatedModifications.splice(groupIndex, 1);
      }
    } else {
      // Check for max limit before adding the modifier
      if (
        !modifierGroup.max ||
        updatedModifications[groupIndex].modifiers.length <
          modifierGroup.max
      ) {
        // Modifier not found and limit not reached, add it
        updatedModifications[groupIndex].modifiers.push(modifier);
      } else if (modifierGroup.max === 1) {
        updatedModifications[groupIndex].modifiers = [modifier];
      } else {
        toast.error(
          `Maximum limit of ${modifierGroup.max} modifiers reached for '${modifierGroup.name}'. You cannot add more modifiers to this group.`
        );
      }
      // If max limit is reached, you might want to handle it (e.g., show an error message)
    }
  } else {
    // Modifier group not found, create a new group with this modifier
    updatedModifications.push({
      id: modifierGroup.id,
      name: modifierGroup.name,
      modifiers: [modifier],
    });
  }

  return updatedModifications;
};

export const calculateTaxAmount = (
  totalAmount: number,
  taxPercentage: number
) => {
  if (taxPercentage) {
    const taxAmount = (totalAmount * taxPercentage) / 100;
    return Math.round(taxAmount);
  }
  return 0;
};
