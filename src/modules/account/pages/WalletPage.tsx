import React, { Fragment } from 'react';
import { Stack } from '@mui/material';
import { SplitLayout } from '@/layouts/SplitLayout';
import Head from 'next/head';
import { useAuth } from '@/hooks/useAuth';
import WalletForm from '../components/WalletForm';

const WalletPage = () => {
  const { user } = useAuth();

  return (
    <Fragment>
      <Head>
        <title>Ecomfulfil</title>
        <meta name="robots" content="noindex" />
      </Head>
      <Stack
        sx={{
          paddingY: 5,
          paddingX: { xs: '10%', md: '20%' },
          minHeight: '80vh',
        }}
        gap={3}
      >
        {user && <WalletForm user={user} />}
      </Stack>
    </Fragment>
  );
};

WalletPage.getLayout = (page: any) => (
  <SplitLayout title="Wallet">{page}</SplitLayout>
);

WalletPage.authGuard = true;

export default WalletPage;
