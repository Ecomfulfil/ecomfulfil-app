import Head from 'next/head';
import { Box, Button, Link, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAuth } from '@/hooks/useAuth';
import CustomField from '@/components/common/CustomField';
import CustomCheckbox from '@/components/common/CustomCheckbox';
import Loader from '@/components/feedback/Loader';
import { MainLayout } from '@/layouts/MainLayout';
import { Fragment } from 'react';

interface FormData {
  name: string;
  email: string;
  password: string;
  terms: boolean;
}

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).max(32).required(),
  terms: yup
    .bool()
    .oneOf([true], 'You must accept the privacy policy & terms')
    .required(),
});

const RegisterPage = () => {
  const { register, isLoading, config } = useAuth();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    await register({
      name: data.name,
      email: data.email,
      password: data.password,
    });
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
            <Typography variant="h4">Create an account</Typography>
          </Stack>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={2}>
              <Typography variant="h6">
                Personal Information
              </Typography>
              <CustomField
                name="name"
                label="Name"
                control={control}
                errors={errors}
              />
              <Typography variant="h6">Account Security</Typography>
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
              <Typography variant="h6">TERMS OF USE</Typography>
              <CustomCheckbox
                name="terms"
                label={
                  <Typography variant="body2" component="span">
                    I agree to{' '}
                    <Link
                      style={{ fontWeight: 'bold' }}
                      href="/terms-of-use"
                    >
                      Terms of Use
                    </Link>{' '}
                    &{' '}
                    <Link
                      style={{ fontWeight: 'bold' }}
                      href="/privacy-policy"
                    >
                      Privacy Policy
                    </Link>
                  </Typography>
                }
                control={control}
                errors={errors}
              />
            </Stack>
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

RegisterPage.getLayout = (page: any) => (
  <MainLayout>{page}</MainLayout>
);
RegisterPage.noAuthGuard = true;

export default RegisterPage;
