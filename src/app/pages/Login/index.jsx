import React, { useEffect, useState } from 'react';
import {
  Grid,
  Avatar,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
  IconButton
} from '@material-ui/core';
import { ResponsiveContainer } from 'recharts';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import apis from 'app/api';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { toastMessage } from 'utils/helper';
import { login } from 'store/session/actions';
import useStyles from './styles';
import Burgur from '../../assets/Burgur.png';
import SDS from '../../assets/OfferLogo.png';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { toast } from 'react-toastify';

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
        dispatch(
          login(res?.data[0].token,  res.data[0].emailid, res.data[0].roles),
          console.log('token1', res.data[0].token),
          console.log('tokenuser', res.data[0].fullname),
          console.log('tokenrole', res.data[0].role)
        );
        history.push({
          pathname: '/dashboard',
          state: { toastMessage: 'Login Successfully' }
        });
        
      })
      .catch(error => {
        toast.error(
          error?.response?.status === 401
            ? 'Invalid Credentials'
            : 'Unable to login at the moment',
          {
            position: 'top-right',
            autoClose: true,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          },
        );
      });
  };

  return (
    <div className={classes.backgroundImage}>
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <div className={classes.paper}>
          <ResponsiveContainer width="100%%" height="100%" className={classes.responsive}>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={1}>
                </Grid>
                <Grid item xs={4}>
                  <img src={Burgur} className={classes.image} alt="Logo" height="400px" />
                </Grid>
                <Grid item xs={4}>
                  {/* <img src={SDS} className={classes.login} alt="Logo" height="100px" /> */}
                  <Typography component="h1" variant="h5" className={classes.login}>
                    LOGIN
                  </Typography>     
                  <form
                    className={classes.form}
                    noValidate
                    onSubmit={handleSubmit(onSubmit)}
                  >
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
                </Grid>

                <Grid item xs={2}>
                </Grid>
              </Grid>
            </Grid>
          </ResponsiveContainer>
        </div>
      </Container>
    </div>
  );
}

export default Login;
