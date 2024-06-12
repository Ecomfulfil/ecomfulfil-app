import React from 'react';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useUpdateUserMutation } from '@/store/user';
import { toast } from 'react-toastify';
import { states } from '@/configs/constants';
import { Button, Stack } from '@mui/material';
import CustomField from '@/components/common/CustomField';
import Loader from '@/components/feedback/Loader';

interface UserFormProps {
  user: any;
}

interface FormData {
  name: string;
  phone: string;
  dateOfBirth: string;
}

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  phone: yup.string().required('Phone is required'),
  dateOfBirth: yup.string().required('Date of Birth is required'),
});

const formFields = [
  { name: 'name', label: 'Name *' },
  { name: 'phone', label: 'Phone *', type: 'phone' },
  { name: 'dateOfBirth', label: 'Date of Birth *', type: 'date' },
];

const UserForm = ({ user }: UserFormProps) => {
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: user.name ?? '',
      phone: user.phone ?? '',
      dateOfBirth: user.dateOfBirth ?? '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await updateUser({
        name: data.name,
        phone: data.phone,
        dateOfBirth: data.dateOfBirth,
      });
    } catch (err: any) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack gap={1}>
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
          size="large"
          sx={{
            position: 'fixed',
            bottom: 50,
            right: 50,
          }}
          disabled={isLoading}
        >
          {isLoading ? <Loader /> : 'Update'}
        </Button>
      </Stack>
    </form>
  );
};

export default UserForm;
