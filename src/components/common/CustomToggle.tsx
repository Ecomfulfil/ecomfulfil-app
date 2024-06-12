import React from 'react';
import { styled } from '@mui/system';
import {
  Paper,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(
  ({ theme }) => ({
    '& .MuiToggleButtonGroup-grouped': {
      margin: theme.spacing(0.5),
      border: 0,
      '&.Mui-disabled': {
        border: 0,
      },
      '&:not(:first-of-type)': {
        borderRadius: theme.shape.borderRadius,
      },
      '&:first-of-type': {
        borderRadius: theme.shape.borderRadius,
      },
    },
  })
);

const CustomToggle = ({
  options,
  value,
  onChange,
  size = 'small',
}: any) => {
  return (
    <Paper
      elevation={0}
      sx={{
        border: `1px solid grey`,
        width: 'fit-content',
        display: 'inline-block',
      }}
    >
      <StyledToggleButtonGroup
        value={value}
        onChange={onChange}
        size={size}
      >
        {options.map((o: any, i: any) => (
          <ToggleButton value={o.value} key={i}>
            {o.label}
          </ToggleButton>
        ))}
      </StyledToggleButtonGroup>
    </Paper>
  );
};

export default CustomToggle;
