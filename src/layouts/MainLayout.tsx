import { Fragment } from 'react';
import { Box } from '@mui/material';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const MainLayout = (props: any) => {
  const { children, footer } = props;

  return (
    <Fragment>
      <Header />
      <Box sx={{ mt: 12 }}>{children}</Box>
      {footer != false && <Footer />}
    </Fragment>
  );
};
