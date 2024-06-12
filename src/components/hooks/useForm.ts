// useForm.ts
import { useState } from 'react';

interface FormValues {
  [key: string]: any; // Define a more specific type based on your form structure
}

interface FormErrors {
  [key: string]: string;
}

const useForm = (
  initialValues: FormValues,
  validate: (values: FormValues) => FormErrors,
  handleFormSubmit: () => void
) => {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      handleFormSubmit();
    }
  };

  return {
    handleChange,
    handleSubmit,
    values,
    errors,
  };
};

export default useForm;
