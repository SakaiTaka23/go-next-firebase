import { TextField } from '@material-ui/core';
import React from 'react';
import { useFormContext } from 'react-hook-form';

const EmailInput = () => {
  const { register } = useFormContext();

  return (
    <TextField
      variant='outlined'
      margin='normal'
      placeholder='Email Address *'
      fullWidth
      {...register('email', {
        required: true,
        pattern: /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
      })}
    />
  );
};

export default EmailInput;
