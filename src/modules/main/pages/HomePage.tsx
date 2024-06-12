import React from 'react';
import Head from 'next/head';
import { MainLayout } from '@/layouts/MainLayout';
import Link from 'next/link';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Stack,
} from '@mui/material';
import Image from 'next/image';

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Ecomfulfil</title>
      </Head>

      <Stack gap={5}>
        <Box
          sx={{
            backgroundColor: 'primary.main',
            display: 'flex',
            alignItems: 'center',
            minHeight: '60vh',
          }}
        >
          <Container>
            <Typography variant="body1" gutterBottom>
              WELCOME TO THE 2024 NEXT BIG OPPORTUNITY
            </Typography>
            <Typography variant="h1" gutterBottom>
              START YOUR ECOMMERCE JOURNEY
            </Typography>
            <Button
              href="#plans"
              variant="contained"
              color="secondary"
            >
              See Plans
            </Button>
          </Container>
        </Box>
        <Container>
          <Stack gap={5}>
            <Grid container alignItems="center" spacing={3}>
              <Grid item lg={5} xs={12}>
                <Image
                  src="/assets/pexels-tiger-lily-4483610.jpg"
                  alt="Image"
                  width={0}
                  height={0}
                  sizes="100vh"
                  style={{
                    width: '100%',
                    height: 'auto',
                    boxShadow: '0px 3px 15px rgba(0, 0, 0, 0.2)',
                    borderRadius: '8px',
                  }}
                />
              </Grid>
              <Grid item lg={7} xs={12}>
                <Typography
                  variant="body1"
                  color="primary"
                  gutterBottom
                >
                  MISSION AND PHILOSOPHY
                </Typography>
                <Typography variant="h3" gutterBottom>
                  OUR MISSION
                </Typography>
                <Typography variant="body1">
                  At Ecomfulfil, we are dedicated to revolutionizing
                  e-commerce logistics. Our mission is to provide DFY
                  e-commerce service, empowering businesses with
                  seamless fulfillment solutions. Committed to
                  innovation, efficiency, and sustainability, we aim
                  to be the trusted partner that propels business to
                  new heights in the dynamic world of online commerce.
                </Typography>
              </Grid>
            </Grid>
            <Box sx={{ textAlign: 'center' }} id="plans">
              <Typography
                variant="body1"
                color="primary"
                gutterBottom
              >
                UNIQUE BENEFITS
              </Typography>
              <Typography variant="h2" gutterBottom>
                What We&apos;re Offering
              </Typography>
            </Box>
            <Grid container justifyContent="center" spacing={3}>
              <Grid item lg={5} md={6} xs={12}>
                <Card sx={{ boxShadow: 3, borderRadius: '8px' }}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Image
                      src="/assets/boxes.png"
                      alt="Image"
                      width={0}
                      height={0}
                      sizes="100vh"
                      style={{
                        width: '80%',
                        height: 'auto',
                      }}
                    />
                    <Typography variant="h5" gutterBottom>
                      DFY ECOMMERCE STORES
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Whether it is AMAZON, WALMART, ETSY, or TikTok,
                      we help you generate profits with our proven
                      4-Tier Automation, while you can enjoy a
                      luxurious life.
                    </Typography>
                    <Button
                      href="https://dfy.ecomfulfil.store/dfy-services"
                      variant="contained"
                      color="primary"
                    >
                      Order Service
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item lg={5} md={6} xs={12}>
                <Card sx={{ boxShadow: 3, borderRadius: '8px' }}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Image
                      src="/assets/truck.png"
                      alt="Image"
                      width={0}
                      height={0}
                      sizes="100vh"
                      style={{
                        width: '80%',
                        height: 'auto',
                      }}
                    />
                    <Typography variant="h5" gutterBottom>
                      FLAT SHIPPING LABELS
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      We understand the shipping charges eat 30% to
                      50% of the profit margins hence we are offering
                      $5 flat shipping all over the USA for up to 30
                      lbs.
                    </Typography>
                    <Link href="/order" passHref>
                      <Button variant="contained" color="primary">
                        Order Label
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Stack>
        </Container>
      </Stack>
    </>
  );
};

HomePage.getLayout = (page: any) => <MainLayout>{page}</MainLayout>;

export default HomePage;
