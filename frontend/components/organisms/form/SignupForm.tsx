import React, { useContext } from 'react';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Avatar, Container, makeStyles, Typography } from '@material-ui/core';
import { FormProvider, useForm } from 'react-hook-form';
import EmailInput from '../input/EmailInput';
import PasswordInput from '../input/PassowrdInput';
import SubmitButton from '../../molecules/SubmitButton';
import { AuthContext } from '../../../hooks/firebase/useFirebase';
import NameInput from '../input/NameInput';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

type MailPasswordRequest = {
  name: string;
  email: string;
  password: string;
};

const SignupForm = () => {
  const classes = useStyles();
  const methods = useForm();
  const { Signup } = useContext(AuthContext);

  const submit = (data: MailPasswordRequest) => {
    console.log(data);
    Signup(data.email, data.password, data.name);
  };

  return (
    <Container maxWidth='xs'>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign Up
        </Typography>
        <FormProvider {...methods}>
          <form className={classes.form} onSubmit={methods.handleSubmit(submit)}>
            <NameInput />
            <EmailInput />
            <PasswordInput />
            <SubmitButton />
          </form>
        </FormProvider>
      </div>
    </Container>
  );
};

export default SignupForm;
