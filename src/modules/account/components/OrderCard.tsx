import { timeAgo } from '@/utils/time-ago';
import { toAddressString } from '@/utils/toAddressString';
import { Card, Stack, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';

interface OrderCardProps {
  order: any;
}

const OrderCard = ({ order }: OrderCardProps) => {
  return (
    <Link
      href={`/orders/${order.id}`}
      style={{
        textDecoration: 'none',
      }}
    >
      <Card>
        <Stack style={{ padding: '20px' }} gap={1} flex={1}>
          <Stack
            direction="row"
            justifyContent="space-between"
            gap={1}
          >
            <Typography
              variant="body1"
              textOverflow="ellipsis"
              overflow="hidden"
              whiteSpace="nowrap"
            >
              {order.store.name}
            </Typography>
            <Typography variant="body1">${order.total}</Typography>
          </Stack>
          <Stack
            direction="row"
            justifyContent="space-between"
            gap={1}
          >
            <Typography
              variant="caption"
              textOverflow="ellipsis"
              overflow="hidden"
              whiteSpace="nowrap"
            >
              {toAddressString(order.store.address)}
            </Typography>
            <Typography
              variant="caption"
              textOverflow="ellipsis"
              overflow="hidden"
              whiteSpace="nowrap"
            >
              {timeAgo(order.createdAt)}
            </Typography>
          </Stack>
        </Stack>
      </Card>
    </Link>
  );
};

export default OrderCard;
