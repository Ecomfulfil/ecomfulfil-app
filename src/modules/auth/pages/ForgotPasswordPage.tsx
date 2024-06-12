import Head from 'next/head';
import NextLink from 'next/link';
import { Box, Button, Link, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForgotPasswordMutation } from '@/store/auth';
import { toast } from 'react-toastify';
import CustomField from '@/components/common/CustomField';
import Loader from '@/components/feedback/Loader';
import { MainLayout } from '@/layouts/MainLayout';
import { Fragment } from 'react';

interface FormData {
  email: string;
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
});

const ForgotPasswordPage = () => {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await forgotPassword(data).unwrap();
      toast.success(
        'Email sent successfully. Please check your inbox.'
      );
    } catch (error: any) {
      toast.error(error?.data?.message || error.error);
    }
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
            <Typography variant="h4">Forgot Password</Typography>
            <Typography color="text.secondary" variant="body2">
              Enter your email and we′ll send you instructions to
              reset your password
            </Typography>
          </Stack>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <CustomField
              name="email"
              label="Email"
              control={control}
              errors={errors}
            />
            <Link
              component={NextLink}
              href="/forgot-password"
              underline="hover"
              variant="subtitle2"
            >
              Back to login?
            </Link>
            <Button
              fullWidth
              size="large"
              sx={{ mt: 3 }}
              type="submit"
              variant="contained"
            >
              {isLoading ? <Loader /> : 'Send Reset Link'}
            </Button>
          </form>
        </Box>
      </Box>
    </Fragment>
  );
};

ForgotPasswordPage.getLayout = (page: any) => (
  <MainLayout>{page}</MainLayout>
);
ForgotPasswordPage.authGuard = false;

export default ForgotPasswordPage;
