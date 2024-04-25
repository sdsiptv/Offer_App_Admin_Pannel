import { Button, Container, CssBaseline, Grid } from '@material-ui/core';
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

export default function ViewListCategory() {
  const classes = useStyles();
  const history = useHistory();
  const [Category, setCategory] = useState([]);

  const columns = [
    {
      field: 'images',
      title: 'Logo',
      render: rowData =>
        typeof rowData.images == 'string' ? (
          <img src={rowData.images} alt="" width={40} height={30} />
        ) : null,
    },
    { field: 'name', title: 'Name' },
    { field: 'position', title: 'Position' },
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
              history.push('EditCategory', {
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

  const getCategory = () => {
    apis.getCategory().then(res => {
      console.log('hii', res?.data)
      setCategory(res?.data);
    });
  };

  useEffect(() => {
    getCategory();
  }, []);

  // const deleteHandler = data => {
  //   let filter = data.map(obj => obj.id);
  //   apis.deleteCategory(JSON.stringify(filter)).then(res => {
  //     toastMessage('Successfully deleted');
  //     getCategory();
  //   });
  // };

  const deleteHandler = data => {
    let filter = data.map(obj => obj.id);
    if (filter.length === 0) {
      console.log("No IDs to delete");
      return;
    }
    let idToDelete = filter[0];
    apis.deleteCategory(idToDelete).then(res => {
      toastMessage('Successfully Deleted');
      getCategory();
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
          <Grid item xs={2}>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                style={{ backgroundColor: GREEN }}
                onClick={() => {
                  history.push('/AddCategory');
                }}
              >
                Add Category
              </Button>
            </div>
          </Grid>

          <Grid item xs={12}>
            <MaterialTables
              title={<span style={{ color: '#ff3737', fontSize: "x-large" }}>PRODUCT CATEGORY</span>}
              columns={columns}
              data={Category}
              deleteHandler={deleteHandler}
            />
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
