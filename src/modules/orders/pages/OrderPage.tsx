import React from 'react';
import { Box, Grid, Stack, Typography, styled } from '@mui/material';
import Image from 'next/image';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Link from 'next/link';
import { useGetOrderQuery } from '@/store/order';
import { useParams } from 'next/navigation';
import OrderItemList from '../components/OrderItemList';
import Footer from '@/components/layout/Footer';

const LeftSidePanel = styled(Grid)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: 'white',
}));

const OrderPage = () => {
  const params = useParams();

  const { data: order, isLoading } = useGetOrderQuery(params?.id, {
    skip: !params,
  });

  if (!order) {
    return;
  }

  return (
    <Grid container>
      <LeftSidePanel item xs={12} md={5} padding={3}>
        <Stack height="100%" gap={3} justifyContent="space-between">
          <Stack direction="row" alignItems="center">
            <Image
              src="/assets/logo.png"
              alt="logo"
              width={50}
              height={50}
            />
            <Link
              href="/"
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                textDecoration: 'none',
                color: 'white',
              }}
            >
              <ChevronLeftIcon fontSize="large" />
              <Typography variant="body1" fontWeight="bold">
                Back to home
              </Typography>
            </Link>
          </Stack>
          <Box>
            <Typography variant="h5">
              Order #{order?.orderId}
            </Typography>
            <Typography variant="body1">
              Estimated {order.type.toUpperCase()} Time:
              {new Date(order.estimatedTime).toLocaleTimeString(
                'en-US',
                {
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true,
                  timeZone: order.store.operationalInfo.timeZone,
                }
              )}
            </Typography>
            <Typography variant="body1">
              {order.type} order
            </Typography>
            <Typography variant="body1">
              My Card (*{order.paymentDetail?.card?.last4})
            </Typography>
            <Typography variant="body1">
              {new Date(order.createdAt).toLocaleTimeString('en-US', {
                timeZone: order.store.operationalInfo.timeZone,
              })}{' '}
              at{' '}
              {new Date(order.createdAt).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true,
                timeZone: order.store.operationalInfo.timeZone,
              })}
            </Typography>
          </Box>
          <Box></Box>
        </Stack>
      </LeftSidePanel>
      <Grid
        item
        xs={12}
        md={7}
        sx={{
          height: '100vh',
          minHeight: '100vh',
          overflow: 'auto',
          backgroundColor: '#f9f9f9',
        }}
      >
        <Stack>
          <Box minHeight="100vh">
            <OrderItemList order={order} />
          </Box>
          <Footer />
        </Stack>
      </Grid>
    </Grid>
  );
};

OrderPage.authGuard = true;

export default OrderPage;
