import React from 'react';
import { TextField } from '@mui/material';
import { useFormContext } from 'react-hook-form';

const NameInput = () => {
  const { register } = useFormContext();

  return (
    <TextField
      margin='normal'
      placeholder='Name *'
      fullWidth
      {...register('name', {
        required: true,
        minLength: 1,
        maxLength: 20,
      })}
    />
  );
};

export default NameInput;
