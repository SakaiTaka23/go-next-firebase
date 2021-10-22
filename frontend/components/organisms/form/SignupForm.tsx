import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Avatar, Box, Container, CssBaseline, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useFirebase } from '../../../hooks/firebase/useFirebase';
import EmailInput from '../input/EmailInput';
import PasswordInput from '../input/PassowrdInput';
import SubmitButton from '../../molecules/SubmitButton';
import NameInput from '../input/NameInput';

type MailPasswordRequest = {
  name: string;
  email: string;
  password: string;
};

const SignUpForm = () => {
  const methods = useForm();
  const { SignUp } = useFirebase();

  const submit = (data: MailPasswordRequest) => {
    SignUp(data.email, data.password, data.name);
  };

  return (
    <Container component='main' maxWidth='xs'>
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign Up
        </Typography>
        <FormProvider {...methods}>
          <Box component='form' onSubmit={methods.handleSubmit(submit)} sx={{ mt: 3 }}>
            <NameInput />
            <EmailInput />
            <PasswordInput />
            <SubmitButton />
          </Box>
        </FormProvider>
      </Box>
    </Container>
  );
};

export default SignUpForm;
