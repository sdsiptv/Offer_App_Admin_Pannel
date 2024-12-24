import { Button, Container, CssBaseline, Grid, TextField, MenuItem } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import apis from 'app/api';
import MaterialTables from 'app/components/MaterialTables';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { GREEN } from 'utils/constant/color';
import { toastMessage } from 'utils/helper';
import useStyles from 'styles/globalStyles';
import { useForm } from 'react-hook-form';

export default function ViewProductTags() {
  const classes = useStyles();
  const history = useHistory();
  const [Category, setCategory] = useState([]);
  const [selectedCategory, setselectedCategory] = useState('');
  const [ProductTags, setProductTags] = useState([]);
  const { register, handleSubmit, setValue } = useForm();

  const columns = [
    { field: 'name', title: 'Product Tags' },
    { field: 'position', title: 'Position' },
    { field: 'id', title: 'Product Tag ID' },
    {
      field: 'actions',
      title: 'Actions',
      sorting: false,
      render: rowData => (
        <Tooltip title="Edit">
          <IconButton
            variant="contained"
            size="small"
            color="secondary"
            onClick={() => {
              history.push('EditProductTags', {
                state: { data: rowData },
              });
            }}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = () => {
    apis.getCategory()
      .then((res) => {
        setCategory(res?.data);
        console.log('Category', res?.data);
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });
  };

  const fetchProduct = (categoryId) => {
    apis.getProductTags(categoryId)
      .then((res) => {
        setProductTags(res?.data);
        console.log('Product for category ', categoryId, ':', res?.data);
      })
      .catch((error) => {
        console.error('Error fetching vendors:', error);
      });
  };

  const deleteHandler = (data) => {
    let filter = data.map(obj => obj.id);
    if (filter.length === 0) {
      console.log("No IDs to delete");
      return;
    }
    let idToDelete = filter[0];
    apis.deleteProductTags(idToDelete).then(res => {
      toastMessage('Successfully Deleted');
      fetchProduct(selectedCategory);
    });
  };

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <div className={classes.paper}>
        <Grid container spacing={1}>
          <Grid item xs={10}>
            <Grid container spacing={1} alignItems="flex-end"></Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                id="filled-select-category"
                select
                label="Category"
                required
                fullWidth
                helperText="Please select your Category"
                variant="outlined"
                size="small"
                value={selectedCategory}
                type="text"
                onChange={(e) => {
                  const selectedCategoryId = e.target.value;
                  console.log('Selected category ID: ', selectedCategoryId);
                  setselectedCategory(selectedCategoryId);
                  fetchProduct(selectedCategoryId);
                }}
              >
                {Category.map((ele) => (
                  <MenuItem key={ele.id} value={ele.id}>
                    {ele.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={8}>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  style={{ backgroundColor: GREEN }}
                  onClick={() => {
                    history.push('/AddProductTags');
                  }}
                >
                  Add Product Tags
                </Button>
              </div>
            </Grid>

            <Grid item xs={12}>
              <MaterialTables
                title={<span style={{ color: '#ff3737', fontSize: "x-large" }}>PRODUCT TAGS</span>}
                columns={columns}
                data={ProductTags}
                deleteHandler={deleteHandler}
              />
            </Grid>

          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
