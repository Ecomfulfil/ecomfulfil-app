import React, { Fragment } from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useGetOrdersQuery } from '@/store/order';
import HistoryIcon from '@mui/icons-material/History';
import { SplitLayout } from '@/layouts/SplitLayout';
import OrderList from '../components/OrderList';
import Head from 'next/head';
import Loader from '@/components/feedback/Loader';
import { useAuth } from '@/hooks/useAuth';

const HistoryPage = () => {
  const { user } = useAuth();

  const { data, isLoading } = useGetOrdersQuery(
    {
      page: 1,
      limit: 50,
      sortBy: '-createdAt',
      user: user.id,
    },
    {
      skip: !user,
    }
  );

  return (
    <Fragment>
      <Head>
        <title>Ecomfulfil</title>
        <meta name="robots" content="noindex" />
      </Head>
      {isLoading ? (
        <Loader center />
      ) : (
        <Box
          sx={{
            paddingY: 5,
            paddingX: { xs: '10%', md: '20%' },
            minHeight: '88vh',
          }}
        >
          {!data || data.results.length < 1 ? (
            <NoOrderView />
          ) : (
            <OrderList orders={data.results} />
          )}
        </Box>
      )}
    </Fragment>
  );
};

const NoOrderView = () => (
  <Stack
    gap={2}
    justifyContent="center"
    sx={{
      minHeight: '75vh',
    }}
  >
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
    >
      <Stack alignItems="start" gap={1}>
        <HistoryIcon
          sx={{
            fontSize: '150px',
            color: 'red',
          }}
        />
        <Typography variant="h5">No recent activity items</Typography>
        <Button variant="outlined" href="/">
          Back to Home
        </Button>
      </Stack>
    </Box>
  </Stack>
);

HistoryPage.getLayout = (page: any) => (
  <SplitLayout title="History">{page}</SplitLayout>
);

HistoryPage.authGuard = true;

export default HistoryPage;
