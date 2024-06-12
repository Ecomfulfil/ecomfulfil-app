import { Fragment } from 'react';
import { Grid, Typography } from '@mui/material';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const SplitLayout = (props: any) => {
  const { children, footer, title } = props;

  return (
    <Fragment>
      <Header />
      <Grid container sx={{ mt: 12 }}>
        <Grid
          item
          md={4}
          display="flex"
          justifyContent="center"
          alignItems="center"
          padding={3}
        >
          <Typography variant="h5">{title}</Typography>
        </Grid>
        <Grid
          item
          md={8}
          sx={{
            height: '90vh',
            overflow: 'auto',
            backgroundColor: '#f9f9f9',
          }}
        >
          {children}
          {footer != false && <Footer />}
        </Grid>
      </Grid>
    </Fragment>
  );
};
