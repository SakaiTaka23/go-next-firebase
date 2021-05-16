import { Button, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SubmitButton = () => {
  const classes = useStyles();

  return (
    <Button type='submit' variant='contained' color='primary' fullWidth className={classes.submit}>
      submit
    </Button>
  );
};

export default SubmitButton;
