import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Avatar, Box, Container, CssBaseline, Typography } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import EmailInput from '../input/EmailInput';
import PasswordInput from '../input/PassowrdInput';
import SubmitButton from '../../molecules/SubmitButton';
import { useFirebase } from '../../../hooks/firebase/useFirebase';

type MailPasswordRequest = {
  email: string;
  password: string;
};

const SignInForm = () => {
  const methods = useForm();
  const { SignIn } = useFirebase();

  const submit = (data: MailPasswordRequest) => {
    SignIn(data.email, data.password);
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
          Sign In
        </Typography>
        <FormProvider {...methods}>
          <Box component='form' onSubmit={methods.handleSubmit(submit)} sx={{ mt: 1 }}>
            <EmailInput />
            <PasswordInput />
            <SubmitButton />
          </Box>
        </FormProvider>
      </Box>
    </Container>
  );
};

export default SignInForm;
