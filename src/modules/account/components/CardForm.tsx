import { Button, Grid, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from '@stripe/react-stripe-js';
import { Box } from '@mui/system';
import { toast } from 'react-toastify';
import Loader from '@/components/feedback/Loader';
import { useCreateSetupIntentMutation } from '@/store/stripe';
import { useRouter } from 'next/router';

const CardForm = () => {
  const router = useRouter();
  const stripe = useStripe();
  const elements = useElements();
  const [cardholderName, setCardholderName] = useState('');

  const [createSetupIntent, { isLoading: isLoading }] =
    useCreateSetupIntentMutation();

  const cardElementOptions = {
    style: {
      base: {
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      if (!stripe || !elements) {
        return;
      }

      const cardNumberElement =
        elements.getElement(CardNumberElement);
      const cardExpiryElement =
        elements.getElement(CardExpiryElement);
      const cardCvcElement = elements.getElement(CardCvcElement);

      if (
        !cardNumberElement ||
        !cardExpiryElement ||
        !cardCvcElement
      ) {
        return;
      }

      // Create a token using the card number element
      const tokenRes = await stripe.createToken(cardNumberElement, {
        name: cardholderName,
      });

      if (tokenRes.error) {
        throw tokenRes.error;
      }

      const token = tokenRes.token;

      await createSetupIntent({
        tokenId: token.id,
        paymentMethodId: token?.card?.id,
      }).unwrap();

      if (router.query.returnUrl) {
        router.replace((router.query.returnUrl as string) || '/');
      } else {
        router.replace('/account/payment-method');
      }
    } catch (err: any) {
      toast.error(err?.data?.message || err.error);
    }
  };

  if (!stripe || !elements) {
    return <></>;
  }

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <Stack gap={1}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="caption">Name on Card</Typography>
            <input
              type="text"
              id="cardholder-name"
              style={{
                width: '100%',
                padding: '15px',
                borderRadius: '10px',
                border: '1px solid #b9b7b7',
                fontSize: '16px',
                backgroundColor: 'transparent',
              }}
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="caption">Card Number</Typography>
            <Box
              sx={{
                padding: '15px',
                borderRadius: '10px',
                border: '1px solid #b9b7b7',
              }}
            >
              <CardNumberElement options={cardElementOptions} />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption">Expiration date</Typography>
            <Box
              sx={{
                padding: '15px',
                borderRadius: '10px',
                border: '1px solid #b9b7b7',
              }}
            >
              <CardExpiryElement options={cardElementOptions} />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption">CVC</Typography>
            <Box
              sx={{
                padding: '15px',
                borderRadius: '10px',
                border: '1px solid #b9b7b7',
              }}
            >
              <CardCvcElement options={cardElementOptions} />
            </Box>
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={isLoading}
          sx={{
            position: 'fixed',
            bottom: 50,
            right: 50,
          }}
        >
          {isLoading ? <Loader /> : 'Continue'}
        </Button>
      </Stack>
    </form>
  );
};

export default CardForm;
