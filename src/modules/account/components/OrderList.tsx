import { Stack } from '@mui/material';
import React from 'react';
import OrderCard from './OrderCard';

interface OrdersListProps {
  orders: any[];
}

const OrderList = ({ orders }: OrdersListProps) => {
  return (
    <Stack gap={1}>
      {orders.map((order: any) => (
        <OrderCard key={order.id} order={order} />
      ))}
    </Stack>
  );
};

export default OrderList;
