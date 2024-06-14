import { timeAgo } from '@/utils/time-ago';
import { toAddressString } from '@/utils/toAddressString';
import {
  Button,
  Card,
  Stack,
  Typography,
  Box,
  Grid,
} from '@mui/material';
import Link from 'next/link';
import React from 'react';

interface OrderCardProps {
  order: any;
}

const OrderCard = ({ order }: OrderCardProps) => {
  return (
    <Card
      elevation={3}
      sx={{
        borderRadius: '16px',
        padding: '20px',
      }}
    >
      <Stack gap={2}>
        <Box>
          <Typography
            variant="body1"
            noWrap
            sx={{
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
          >
            <strong>Tracking #:</strong> {order.trackingNumber}
          </Typography>
          <Typography variant="h6">
            <strong>Total:</strong> ${order.total}
          </Typography>
          <Typography variant="h6">
            <strong>Weight:</strong> {order.weight} lbs
          </Typography>
          {order.promoCode && (
            <Typography variant="h6">
              <strong>Promo Code:</strong> ({order.promoCode}) $
              {order.promoCodeAmount || 0}
            </Typography>
          )}
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box>
              <Typography
                variant="body1"
                noWrap
                sx={{
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                }}
              >
                <strong>Sender:</strong> {order.sender.name}
              </Typography>
              <Typography
                variant="caption"
                noWrap
                sx={{
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                }}
              >
                {toAddressString(order.sender.address)}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box>
              <Typography
                variant="body1"
                noWrap
                sx={{
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                }}
              >
                <strong>Receiver:</strong> {order.receiver.name}
              </Typography>
              <Typography
                variant="caption"
                noWrap
                sx={{
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                }}
              >
                {toAddressString(order.receiver.address)}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Button
            variant="contained"
            color="primary"
            sx={{ alignSelf: 'start' }}
            href={order.pdf}
            target="_blank"
            disabled={(order.pdf ?? '') === ''}
          >
            Download PDF
          </Button>
          <Typography variant="caption" color="text.secondary">
            {timeAgo(order.createdAt)}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
};

export default OrderCard;
