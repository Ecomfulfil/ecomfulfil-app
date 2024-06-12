import Head from 'next/head';
import { Box, Button, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useResetPasswordMutation } from '@/store/auth';
import { toast } from 'react-toastify';
import { useSearchParams } from 'next/navigation';
import CustomField from '@/components/common/CustomField';
import Loader from '@/components/feedback/Loader';
import { MainLayout } from '@/layouts/MainLayout';
import { Fragment } from 'react';

interface FormData {
  password: string;
}

const schema = yup.object().shape({
  password: yup.string().min(8).max(32).required(),
});

const ResetPasswordPage = () => {
  const searchParams = useSearchParams();

  const token = searchParams.get('token');
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (body: FormData) => {
    try {
      await resetPassword({ token, body }).unwrap();
      toast.success('Password changed successfully.');
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
            <Typography variant="h4">Reset Password</Typography>
          </Stack>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <CustomField
              name="password"
              label="Password"
              type="password"
              control={control}
              errors={errors}
            />

            <Button
              fullWidth
              size="large"
              sx={{ mt: 3 }}
              type="submit"
              variant="contained"
            >
              {isLoading ? <Loader /> : 'Reset'}
            </Button>
          </form>
        </Box>
      </Box>
    </Fragment>
  );
};

ResetPasswordPage.getLayout = (page: any) => (
  <MainLayout>{page}</MainLayout>
);
ResetPasswordPage.authGuard = false;

export default ResetPasswordPage;
