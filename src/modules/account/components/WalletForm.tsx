import React from 'react';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { toast } from 'react-toastify';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Stack,
} from '@mui/material';
import CustomField from '@/components/common/CustomField';
import Loader from '@/components/feedback/Loader';
import { useCreateTopupSessionMutation } from '@/store/stripe';

interface FormData {
  amount: string;
}

const schema = yup.object().shape({
  amount: yup.string().required('Amount is required'),
});

const formFields = [{ name: 'amount', label: 'Amount *' }];

const WalletForm = ({ user }: any) => {
  const [createTopupSession, { isLoading }] =
    useCreateTopupSessionMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const res = await createTopupSession({
        amount: data.amount,
      }).unwrap();
      window.open(res.sessionUrl);
    } catch (err: any) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Card>
        <CardHeader
          title={`Avalable Balance: ${user?.balance || 0}`}
        />
        <CardContent>
          <Stack gap={1} alignItems="end">
            {formFields.map((field: any, i: any) => (
              <CustomField
                key={i}
                {...field}
                control={control}
                errors={errors}
              />
            ))}
            <Button
              type="submit"
              variant="contained"
              disabled={isLoading}
            >
              {isLoading ? <Loader /> : 'Topup'}
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </form>
  );
};

export default WalletForm;
