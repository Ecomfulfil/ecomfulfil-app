import Head from 'next/head';
import NextLink from 'next/link';
import { Box, Button, Link, Stack, Typography } from '@mui/material';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '@/hooks/useAuth';
import CustomField from '@/components/common/CustomField';
import Loader from '@/components/feedback/Loader';
import { MainLayout } from '@/layouts/MainLayout';
import { Fragment } from 'react';

interface FormData {
  email: string;
  password: string;
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(8).max(32).required(),
});

const LoginPage = () => {
  const { login, isLoading } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    await login(data);
  };

  return (
    <Fragment>
      <Head>
        <title>Ecomfulfil</title>
        <meta name="robots" content="noindex" />
      </Head>
      <Box
        sx={{
          backgroundColor: 'background.paper',
          flex: '1 1 auto',
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            maxWidth: 550,
            px: 3,
            py: '100px',
            width: '100%',
          }}
        >
          <Stack spacing={1} sx={{ mb: 3 }}>
            <Typography variant="h4">Login</Typography>
            <Typography color="text.secondary" variant="body2">
              Don&apos;t have an account? &nbsp;
              <Link
                component={NextLink}
                href="/register"
                underline="hover"
                variant="subtitle2"
              >
                Register
              </Link>
            </Typography>
          </Stack>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <CustomField
              name="email"
              label="Email"
              control={control}
              errors={errors}
            />
            <CustomField
              name="password"
              label="Password"
              type="password"
              control={control}
              errors={errors}
            />
            <Link
              component={NextLink}
              href="/forgot-password"
              underline="hover"
              variant="subtitle2"
            >
              Forgot password?
            </Link>
            <Button
              fullWidth
              size="large"
              sx={{ mt: 3 }}
              type="submit"
              variant="contained"
            >
              {isLoading ? <Loader /> : 'Continue'}
            </Button>
          </form>
        </Box>
      </Box>
    </Fragment>
  );
};

LoginPage.getLayout = (page: any) => <MainLayout>{page}</MainLayout>;
LoginPage.noAuthGuard = true;

export default LoginPage;
