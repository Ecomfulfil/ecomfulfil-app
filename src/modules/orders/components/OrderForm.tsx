import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useCreateOrderMutation } from '@/store/order';
import { toast } from 'react-toastify';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import CustomField from '@/components/common/CustomField';
import Loader from '@/components/feedback/Loader';
import { debounce } from 'lodash';
import { useValidatePromoCodeMutation } from '@/store/promo-code';

interface Address {
  line1: string;
  line2?: string;
  postalCode: string;
  state: string;
  city: string;
  country: string;
}

interface User {
  name: string;
  company?: string;
  address: Address;
}

interface FormData {
  sender: User;
  receiver: User;
  promoCode?: string;
  weight: number;
  length?: number;
  width?: number;
  height?: number;
}

const schema = yup.object().shape({
  sender: yup.object().shape({
    name: yup.string().required('Name is required'),
    company: yup.string(),
    address: yup.object().shape({
      line1: yup.string().required('Line 1 is required'),
      line2: yup.string(),
      postalCode: yup.string().required('Postal code is required'),
      state: yup.string().required('State is required'),
      city: yup.string().required('City is required'),
      country: yup.string().required('Country is required'),
    }),
  }),
  receiver: yup.object().shape({
    name: yup.string().required('Name is required'),
    company: yup.string(),
    address: yup.object().shape({
      line1: yup.string().required('Line 1 is required'),
      line2: yup.string(),
      postalCode: yup.string().required('Postal code is required'),
      state: yup.string().required('State is required'),
      city: yup.string().required('City is required'),
      country: yup.string().required('Country is required'),
    }),
  }),
  promoCode: yup.string(),
  weight: yup
    .number()
    .typeError('Weight is required')
    .required('Weight is required'),
});

const OrderForm = () => {
  const [createOrder, { isLoading }] = useCreateOrderMutation();
  const [
    validatePromoCode,
    { isLoading: validatePromoCodeLoading, data: promoCodeData },
  ] = useValidatePromoCodeMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    defaultValues: {
      sender: {
        name: 'Zubair',
        company: '',
        address: {
          line1: '123',
          line2: '',
          postalCode: '54000',
          state: 'Punjab',
          city: 'Lahore',
          country: 'Pakistan',
        },
      },
      receiver: {
        name: 'Fahad',
        company: '',
        address: {
          line1: '123',
          line2: '',
          postalCode: '54000',
          state: 'Punjab',
          city: 'Lahore',
          country: 'Pakistan',
        },
      },
      promoCode: '',
      weight: 10,
    },
    resolver: yupResolver(schema),
  });

  const watchedValues = watch();

  const onSubmit = async (data: FormData) => {
    try {
      delete data.promoCode;
      delete data.length;
      delete data.width;
      delete data.height;
      await createOrder({
        ...data,
        ...(promoCodeData && { promoCode: promoCodeData.id }),
      }).unwrap();
      toast.success('Order created successfully');
    } catch (err: any) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const applyPromoCodeHandler = async () => {
    try {
      const { promoCode } = watchedValues;
      const res = await validatePromoCode({
        code: promoCode,
      }).unwrap();
      console.log(res);
    } catch (err: any) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack gap={5}>
        <Typography variant="h1" color="primary">
          Order Label
        </Typography>
        <Grid container spacing={3}>
          <Grid item md={12}>
            <Card>
              <CardHeader
                title="Service Details"
                sx={{
                  bgcolor: 'secondary.main',
                  color: 'primary.main',
                }}
              />
              <CardContent>
                <Grid
                  container
                  spacing={1}
                  sx={{ width: { xs: '100%', md: '50%' } }}
                >
                  <Grid item md={12}>
                    <CustomField
                      name="weight"
                      label="Weight (70.00 lbs max)"
                      placeholder="0 lbs"
                      type="number"
                      control={control}
                      errors={errors}
                    />
                  </Grid>
                  <Grid item md={12}>
                    <CustomField
                      name="promoCode"
                      label="Promo Code (optional)"
                      control={control}
                      errors={errors}
                      inputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <Button
                              onClick={applyPromoCodeHandler}
                              disabled={validatePromoCodeLoading}
                            >
                              {validatePromoCodeLoading ? (
                                <Loader />
                              ) : (
                                'Apply'
                              )}
                            </Button>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item md={12} alignContent="center">
                    <Typography variant="body1">
                      Label Price: {}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={12}>
            <Card>
              <CardHeader
                title="Dimensions"
                sx={{
                  bgcolor: 'secondary.main',
                  color: 'primary.main',
                }}
              />
              <CardContent>
                <Grid container spacing={1}>
                  <Grid item md={6}>
                    <CustomField
                      name="length"
                      label="Length (in)"
                      placeholder="0.00 in"
                      type="number"
                      control={control}
                      errors={errors}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <CustomField
                      name="width"
                      label="Width (in)"
                      placeholder="0.00 in"
                      type="number"
                      control={control}
                      errors={errors}
                    />
                  </Grid>
                  <Grid item md={6}>
                    <CustomField
                      name="height"
                      label="Height (in)"
                      placeholder="0.00 in"
                      type="number"
                      control={control}
                      errors={errors}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item md={6}>
            <UserDetails
              title="Sender Details"
              control={control}
              errors={errors}
              userPrefix="sender"
            />
          </Grid>
          <Grid item md={6}>
            <UserDetails
              title="Receiver Details"
              control={control}
              errors={errors}
              userPrefix="receiver"
            />
          </Grid>
        </Grid>
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
          {isLoading ? <Loader /> : 'Continue'}
        </Button>
      </Stack>
    </form>
  );
};

interface UserDetailsProps {
  title: string;
  control: any;
  errors: any;
  userPrefix: string;
}

const UserDetails = ({
  title,
  control,
  errors,
  userPrefix,
}: UserDetailsProps) => (
  <Card>
    <CardHeader
      title={title}
      sx={{ bgcolor: 'secondary.main', color: 'primary.main' }}
    />
    <CardContent>
      <Grid container spacing={1}>
        <Grid item md={6}>
          <CustomField
            name={`${userPrefix}.name`}
            label="Name*"
            control={control}
            errors={errors}
          />
        </Grid>
        <Grid item md={6}>
          <CustomField
            name={`${userPrefix}.company`}
            label="Company"
            control={control}
            errors={errors}
          />
        </Grid>
        <Grid item md={6}>
          <CustomField
            name={`${userPrefix}.address.line1`}
            label="Line1*"
            control={control}
            errors={errors}
          />
        </Grid>
        <Grid item md={6}>
          <CustomField
            name={`${userPrefix}.address.line2`}
            label="Line2"
            control={control}
            errors={errors}
          />
        </Grid>
        <Grid item md={6}>
          <CustomField
            name={`${userPrefix}.address.postalCode`}
            label="Postal Code*"
            control={control}
            errors={errors}
          />
        </Grid>
        <Grid item md={6}>
          <CustomField
            name={`${userPrefix}.address.state`}
            label="State*"
            control={control}
            errors={errors}
          />
        </Grid>
        <Grid item md={6}>
          <CustomField
            name={`${userPrefix}.address.city`}
            label="City*"
            control={control}
            errors={errors}
          />
        </Grid>
        <Grid item md={6}>
          <CustomField
            name={`${userPrefix}.address.country`}
            label="Country*"
            control={control}
            errors={errors}
          />
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

export default OrderForm;
