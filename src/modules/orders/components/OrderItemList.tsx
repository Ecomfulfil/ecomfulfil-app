import { addDecimals } from '@/utils/cart-utils';
import { toAddressString } from '@/utils/toAddressString';
import {
  Avatar,
  Box,
  Button,
  Card,
  Stack,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import React from 'react';

const OrderItemList = ({ order }: any) => {
  return (
    <Box>
      {order.orderItems.map((item: any) => (
        <Card
          key={item.id}
          sx={{
            width: {
              sm: '80%',
              md: '50%',
            },
            margin: 'auto',
            my: 3,
          }}
        >
          <Stack
            direction="row"
            style={{ padding: '20px' }}
            alignItems="start"
          >
            <Avatar
              src={item.image}
              sx={{
                width: '80px',
                height: 'auto',
                objectFit: 'contain',
                mr: 1,
              }}
            />
            <Stack gap={1} flex={1}>
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="h6">{item.name}</Typography>
                <Typography fontWeight="bold">
                  ${addDecimals(item.price)}
                </Typography>
              </Stack>
              <Stack flex={1} marginLeft={1}>
                {item.modifications
                  .flatMap((modification: any) =>
                    modification.modifiers.map((m: any) => m)
                  )
                  .map((m: any) => (
                    <Stack
                      key={m.id}
                      direction="row"
                      justifyContent="space-between"
                    >
                      <Typography variant="caption">
                        {m.name}
                      </Typography>
                      <Typography fontWeight="caption">
                        ${addDecimals(m.price)}
                      </Typography>
                    </Stack>
                  ))}
              </Stack>
            </Stack>
          </Stack>
        </Card>
      ))}
      <Card
        sx={{
          width: {
            sm: '80%',
            md: '50%',
          },
          margin: 'auto',
          my: 3,
        }}
      >
        <Stack style={{ padding: '20px' }} gap={2}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body1">Subtotal</Typography>
            <Typography variant="body1" fontWeight="bold">
              ${addDecimals(order.subTotal)}
            </Typography>
          </Stack>
          {order.discount < 0 && (
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body1">Discount</Typography>
              <Typography variant="body1" fontWeight="bold">
                -${-1 * Number(addDecimals(order.discount))}
              </Typography>
            </Stack>
          )}
          {order.type === 'delivery' && (
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body1">
                Delivery charges
              </Typography>
              <Typography variant="body1" fontWeight="bold">
                ${addDecimals(order.delivery)}
              </Typography>
            </Stack>
          )}
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body1">
              Tax ({order.store?.operationalInfo?.tax || 0}%)
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              ${addDecimals(order.tax)}
            </Typography>
          </Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h5">Total</Typography>
            <Typography variant="h5">
              ${addDecimals(order.total)}
            </Typography>
          </Stack>
        </Stack>
      </Card>
      <Stack
        sx={{
          width: {
            sm: '80%',
            md: '50%',
          },
          margin: 'auto',
          my: 3,
          padding: '20px',
        }}
      >
        <Stack gap={2} alignItems="start">
          {order.type === 'delivery' && (
            <Stack>
              <Typography variant="body1" fontWeight="bold">
                Deliver To
              </Typography>
              <Typography variant="body1">
                {toAddressString(order.deliveryDetail.address)}
              </Typography>
            </Stack>
          )}
          <Stack
            gap={2}
            direction="row"
            justifyContent="space-between"
          >
            <Stack>
              <Typography variant="body1">
                {order.store.name}
              </Typography>
              <Typography variant="body1">
                {toAddressString(order.store.address)}
              </Typography>
              {order.store.phones?.length > 0 && (
                <Stack gap={1} alignItems="start">
                  <Typography variant="caption">
                    Store number: +{order.store.phones[0]}
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    href={`tel:${order.store.phones[0]}`}
                  >
                    Call Store
                  </Button>
                </Stack>
              )}
            </Stack>
            <Image
              src="/assets/logo.png"
              alt="logo"
              width={50}
              height={50}
            />
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default OrderItemList;
