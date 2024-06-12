import Head from 'next/head';
import { Box, Button, Link, Stack, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CustomField from '@/components/common/CustomField';
import CustomCheckbox from '@/components/common/CustomCheckbox';
import Loader from '@/components/feedback/Loader';
import { MainLayout } from '@/layouts/MainLayout';
import { Fragment } from 'react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { useDeleteAccountMutation } from '@/store/auth';

interface FormData {
  email: string;
  reason: string;
  confirm: boolean;
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  reason: yup.string().required(),
  confirm: yup
    .bool()
    .oneOf([true], 'You must confirm it.')
    .required(),
});

const RegisterPage = () => {
  const router = useRouter();
  const [deleteAccount, { isLoading }] = useDeleteAccountMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await deleteAccount({
        email: data.email,
        reason: data.reason,
      }).unwrap();
      router.replace('/');
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
            <Typography variant="h4">
              Account Deletion Request
            </Typography>
          </Stack>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={2}>
              <CustomField
                name="email"
                label="Email"
                control={control}
                errors={errors}
              />
              <CustomField
                name="reason"
                label="Reason"
                control={control}
                errors={errors}
                multiline
                rows={3}
              />
              <CustomCheckbox
                name="confirm"
                label={
                  <Typography variant="body2" component="span">
                    I confirm that I want to delete my account and all
                    associated data.
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
              {isLoading ? <Loader /> : 'Send Request'}
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

RegisterPage.authGuard = false;

export default RegisterPage;
