import {
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import apis from 'app/api';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';
import { GREEN, LIGHT_GREY } from 'utils/constant/color';
import useStyles from 'styles/globalStyles';
import { failureNotification, toastMessage } from 'utils/helper';

export default function AddEditOfferTags({ pageMode = 'add' }) {
  const hiddenFileInput = React.useRef(null);
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();
  const { register, handleSubmit, setValue } = useForm();

  const onSubmit = data => {
    const apiCall =
      pageMode === 'add'
        ? apis.addOfferTags(data.name, data.calculative)
        : apis.editOfferTags(data.id, data.name, data.calculative);

    apiCall
      .then(res => {
        toastMessage(
          pageMode === 'add' ? `Successfully Added ` : `Successfully updated`,
        );
        history.push('/ViewOfferTags');
      })
      .catch(err => {
        failureNotification('Network error');
      });
  };

  useEffect(() => {
    if (location.state) {
      let params = location.state.state.data;
      setValue('name', params.name);
      setValue('calculative', params.calculative);
      setValue('id', params.id);
    } else {
      history.push('/AddOfferTags');
    }
  }, []);

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.paper}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography component="h1" variant="h5" className={classes.title}>
                {pageMode === 'add' ? 'ADD' : 'EDIT'} OFFER TAGS
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="name"
                label="Name"
                type="text"
                InputLabelProps={{ shrink: true }}
                id="name"
                {...register('name', { required: true })}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="calculative"
                label="Calculative"
                type="number"
                InputLabelProps={{ shrink: true }}
                id="calculative"
                {...register('calculative', { required: true })}
              />
            </Grid>

            <Grid item xs={12}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}
              >
                <div>
                  <Button
                    type="submit"
                    required
                    fullWidth
                    variant="contained"
                    style={{ backgroundColor: GREEN, width: 150 }}
                  >
                    {pageMode === 'add' ? 'Create' : 'Update'}
                  </Button>
                </div>
                <div>
                  <Button
                    required
                    fullWidth
                    variant="contained"
                    style={{ backgroundColor: LIGHT_GREY.length, width: 150 }}
                    onClick={() => {
                      history.push('/ViewOfferTags');
                    }}
                  >
                    Back
                  </Button>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </form>
    </Container>
  );
}
