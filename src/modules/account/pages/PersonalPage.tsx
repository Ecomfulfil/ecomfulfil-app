import React, { Fragment } from 'react';
import { Stack } from '@mui/material';
import { SplitLayout } from '@/layouts/SplitLayout';
import Head from 'next/head';
import UserForm from '../components/UserForm';
import { useAuth } from '@/hooks/useAuth';

const PersonalPage = () => {
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
        {user && <UserForm user={user} />}
      </Stack>
    </Fragment>
  );
};

PersonalPage.getLayout = (page: any) => (
  <SplitLayout title="Personal">{page}</SplitLayout>
);

PersonalPage.authGuard = true;

export default PersonalPage;
