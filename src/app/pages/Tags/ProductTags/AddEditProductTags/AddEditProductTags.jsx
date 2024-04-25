import {
  Button,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Typography,
  MenuItem
} from '@material-ui/core';
import apis from 'app/api';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';
import { GREEN, LIGHT_GREY } from 'utils/constant/color';
import useStyles from 'styles/globalStyles';
import { failureNotification, toastMessage } from 'utils/helper';

export default function AddEditProductTags({ pageMode = 'add' }) {
  const hiddenFileInput = React.useRef(null);
  const history = useHistory();
  const location = useLocation();
  const classes = useStyles();
  const [Category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    getCategory();
  }, []);

  const onSubmit = ({ name, position }) => {
    let data = new FormData();
    data.append('name', name);
    data.append('category_id', selectedCategory);
    data.append('position', position);

    if (pageMode === 'edit') {
      const categoryId = location.state.state.data?.id;
      data.append('id', categoryId);
    }
    
    const apiCall =
      pageMode === 'add'
        ? apis.addProductTags(data)
        : apis.editProductTags(location.state.state.data?.id, data);

    apiCall
      .then(res => {
        toastMessage(
          pageMode === 'add' ? `Successfully Added ` : `Successfully updated`,
        );
        history.push('/ViewProductTags');
      })
      .catch(err => {
        failureNotification('Network error');
      });
  };

  useEffect(() => {
    if (location.state) {
      let params = location.state.state.data;
      setValue('name', params.name);
      setValue('position', params.position);
      setSelectedCategory(params.category_id);
      setValue('id', params.id);
    } else {
      history.push('/AddProductTags');
    }
  }, []);

  const getCategory = () => {
    apis.getCategory()
      .then((res) => {
        setCategory(res?.data);
        console.log('testCategory', res?.data)
      })
      .catch((error) => {
        console.error('Error fetching states:', error);
      });
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.paper}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography component="h1" variant="h5" className={classes.title}>
                {pageMode === 'add' ? 'ADD' : 'EDIT'} PRODUCT TAGS
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="filled-select-currency"
                select
                label="Category"
                required
                fullWidth
                helperText="Please select your Category"
                variant="outlined"
                size="small"
                value={selectedCategory}
                type="text"
                onChange={e => {
                  console.log('SelectedCategory   ', e.target.value);
                  setSelectedCategory(e.target.value);
                }}
              >
                {Category.map(ele => (
                  <MenuItem key={ele.id} value={ele.id}>
                    {ele.name}
                  </MenuItem>
                ))}
              </TextField>
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
                name="position"
                label="Position"
                type="text"
                InputLabelProps={{ shrink: true }}
                id="position"
                {...register('position', { required: true })}
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
                      history.push('/ViewProductTags');
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
