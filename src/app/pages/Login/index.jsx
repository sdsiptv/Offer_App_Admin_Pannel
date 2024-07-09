import React, { useState } from 'react';
import {
  Grid,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
  IconButton,
  Avatar,
} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import useStyles from './styles';
import Burgur from '../../assets/Burgur.png';
import apis from 'app/api';
import { login } from 'store/session/actions';

function Login() {
  const classes = useStyles();
  const history = useHistory();
  const { register, handleSubmit } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const onSubmit = data => {
    apis
      .login(data?.emailid, data?.password)
      .then(res => {
        if (res.status === 200) {
          dispatch(
            login(res?.data[0].token, res.data[0].emailid, res.data[0].roles)
          );
          toast.success('Login Successfully', { duration: 5000 });
          history.push('/dashboard');
        }
      })
      .catch(error => {
        toast.error(
          error?.response?.status === 401
            ? 'Invalid Credentials'
            : 'Username & Password Wrong',
          {
            position: 'top-right',
            autoClose: true,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        );
      });
  };

  return (
    <div className={classes.backgroundImage}>
      <Container component="main" maxWidth="md">
        <CssBaseline />
        <div className={classes.paper}>
          <Grid container spacing={2} alignItems="center" justify="center">
            <Grid item xs={12} sm={6}>
              <img src={Burgur} className={classes.image} alt="Logo" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <div className={classes.formContainer}>
                {/* <Avatar className={classes.avatar}>
                  <LockOutlinedIcon />
                </Avatar> */}
                <Typography component="h1" variant="h5" className={classes.login}>
                  LOGIN
                </Typography>
                <form className={classes.form} noValidate onSubmit={handleSubmit(onSubmit)}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    id="emailid"
                    label="Email Address / Username"
                    name="emailid"
                    {...register('emailid', { required: true })}
                  />
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    {...register('password', { required: true })}
                    InputProps={{
                      endAdornment: (
                        <IconButton onClick={() => setShowPassword(!showPassword)}>
                          {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                        </IconButton>
                      ),
                    }}
                  />
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    type="submit"
                    className={classes.submit}
                  >
                    Sign In
                  </Button>
                </form>
              </div>
            </Grid>
          </Grid>
        </div>
      </Container>
      <Toaster />
    </div>
  );
}

export default Login;
