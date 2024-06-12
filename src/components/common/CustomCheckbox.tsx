import {
  Checkbox,
  FormControlLabel,
  FormHelperText,
} from '@mui/material';
import React from 'react';
import { useController } from 'react-hook-form';

const CustomCheckbox = ({
  label,
  name,
  control,
  errors,
  ...rest
}: any) => {
  const { field } = useController({
    name: name as string,
    control,
    defaultValue: false,
  });

  return (
    <>
      <FormControlLabel
        label={label}
        control={
          <Checkbox
            onChange={(e: any) => field.onChange(e.target.checked)}
            checked={Boolean(field.value)}
          />
        }
      />
      {errors && errors[name] && (
        <FormHelperText error>{errors[name].message}</FormHelperText>
      )}
    </>
  );
};

export default CustomCheckbox;
