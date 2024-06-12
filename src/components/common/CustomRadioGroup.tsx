import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@mui/material';
import React from 'react';

const CustomRadioGroup = ({
  label,
  value,
  options,
  onChange,
}: any) => {
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">
        {label}
      </FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue={value}
        name="radio-buttons-group"
        onChange={onChange}
      >
        {options.map((o: any, i: any) => (
          <FormControlLabel
            key={i}
            value={o.value}
            control={<Radio />}
            label={o.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default CustomRadioGroup;
