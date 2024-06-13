import React, { Fragment } from 'react';
import { Grid } from '@mui/material';
import { useGetOrderQuery } from '@/store/order';
import { useParams } from 'next/navigation';
import { SplitLayout } from '@/layouts/SplitLayout';
import Head from 'next/head';

const OrderPage = () => {
  const params = useParams();

  const { data: order, isLoading } = useGetOrderQuery(params?.id, {
    skip: !params,
  });

  if (!order) {
    return;
  }

  return (
    <Fragment>
      <Head>
        <title>Ecomfulfil</title>
        <meta name="robots" content="noindex" />
      </Head>
    </Fragment>
  );
};

OrderPage.getLayout = (page: any) => (
  <SplitLayout title="Order">{page}</SplitLayout>
);

OrderPage.authGuard = true;

export default OrderPage;
