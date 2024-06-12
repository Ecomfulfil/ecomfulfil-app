import React, { Fragment } from 'react';
import { Box } from '@mui/material';
import { SplitLayout } from '@/layouts/SplitLayout';
import Head from 'next/head';

const SettingsPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Ecomfulfil</title>
        <meta name="robots" content="noindex" />
      </Head>
      <Box
        sx={{
          paddingY: 5,
          paddingX: { xs: '10%', md: '20%' },
          minHeight: '90vh',
        }}
      ></Box>
    </Fragment>
  );
};

SettingsPage.getLayout = (page: any) => (
  <SplitLayout title="Ecomfulfil Settings">{page}</SplitLayout>
);

SettingsPage.authGuard = true;

export default SettingsPage;
