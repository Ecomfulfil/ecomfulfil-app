import React, { useState } from 'react';
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { useController } from 'react-hook-form';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/material.css';

interface CustomFieldProps {
  variant?: 'standard' | 'filled' | 'outlined' | undefined;
  size?: 'small' | 'medium';
  name: string;
  label?: string;
  placeholder?: string;
  control: any;
  type?: any;
  accept?: string;
  errors?: Record<string, any>;
  setValue?: (name: string, value: any) => void;
  hidden?: boolean;
  options?: Array<{ label: string; value: any }>;
  inputProps?: any;
  multiline?: any;
  rows?: any;
  multiple?: any;
  disabled?: any;
  autoComplete?: any;
}

const CustomField: React.FC<CustomFieldProps> = ({
  variant,
  name,
  label,
  placeholder,
  control,
  type = 'text',
  accept,
  errors,
  setValue,
  hidden,
  options,
  size,
  inputProps,
  multiline,
  rows,
  multiple,
  disabled,
  autoComplete,
}) => {
  const {
    field,
    fieldState: { invalid, isTouched },
  } = useController({
    name,
    control,
    defaultValue: '',
  });
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (setValue && event.target.files) {
      setValue(name, event.target.files[0]);
    }
  };

  const renderInputField = () => {
    switch (type) {
      case 'file':
        return (
          <TextField
            size={size}
            type="file"
            placeholder={placeholder}
            inputProps={{ accept }}
            onChange={handleFileChange}
            error={invalid && isTouched}
            disabled={disabled}
          />
        );
      case 'phone':
        return (
          <PhoneInput
            {...field}
            country="us"
            value={field.value || ''}
            inputStyle={{
              fontSize: 16,
              width: '100%',
              height: '53px',
              borderRadius: '8px',
              backgroundColor: 'transparent',
            }}
            specialLabel={label}
          />
        );
      case 'select':
        return (
          <>
            <InputLabel variant="outlined">{label}</InputLabel>
            <Select
              variant={variant || 'outlined'}
              label={label}
              {...field}
              multiple={multiple}
              disabled={disabled}
              size={size}
              style={{
                height: '53px',
              }}
            >
              {options?.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </>
        );
      case 'date':
        return (
          <TextField
            variant={variant || 'outlined'}
            size={size}
            label={label}
            placeholder={placeholder}
            type={type}
            inputProps={inputProps}
            {...field}
            error={invalid && isTouched}
            disabled={disabled}
          />
        );
      case 'password':
        return (
          <TextField
            variant={variant || 'outlined'}
            size={size}
            label={label}
            placeholder={placeholder}
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              ...inputProps,
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={togglePasswordVisibility}
                    edge="end"
                  >
                    {showPassword ? (
                      <VisibilityOff />
                    ) : (
                      <Visibility />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            {...field}
            error={invalid && isTouched}
            disabled={disabled}
          />
        );
      default:
        return (
          <TextField
            variant={variant || 'outlined'}
            size={size}
            label={label}
            placeholder={placeholder}
            type={type}
            InputProps={inputProps}
            {...field}
            error={invalid && isTouched}
            multiline={multiline}
            rows={rows}
            disabled={disabled}
          />
        );
    }
  };

  return (
    <FormControl
      fullWidth
      sx={{
        mb: 1,
        textAlign: 'left',
      }}
      hidden={hidden}
    >
      {renderInputField()}
      {errors?.[name] && (
        <FormHelperText error>{errors[name].message}</FormHelperText>
      )}
    </FormControl>
  );
};

export default CustomField;
