import { TextField } from '@material-ui/core';
import React from 'react';
import { useFormContext } from 'react-hook-form';

const NameInput = () => {
  const { register } = useFormContext();

  return (
    <TextField
      variant='outlined'
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
