import React, { Fragment } from 'react';
import { Container, Stack } from '@mui/material';
import Head from 'next/head';
import OrderForm from '../components/OrderForm';
import { MainLayout } from '@/layouts/MainLayout';

const CreateOrderPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Ecomfulfil</title>
        <meta name="robots" content="noindex" />
      </Head>
      <Container style={{ marginTop: '30px' }}>
        <OrderForm />
      </Container>
    </Fragment>
  );
};

CreateOrderPage.getLayout = (page: any) => (
  <MainLayout>{page}</MainLayout>
);

CreateOrderPage.authGuard = true;

export default CreateOrderPage;
