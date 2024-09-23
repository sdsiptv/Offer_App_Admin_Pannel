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

export default function ListAdvertisement() {
  const classes = useStyles();
  const history = useHistory();
  const [Advertisement, setAdvertisement] = useState([]);

  const columns = [
    {
      field: 'images',
      title: 'Images',
      render: rowData =>
        typeof rowData.logo == 'string' ? (
          <img src={rowData.logo} alt="" width={40} height={30} />
        ) : null,
    },
    { field: 'position', title: 'Position' },
    // {
    //   field: 'actions',
    //   title: 'Actions',
    //   sorting: false,
    //   render: rowData => (
    //     <Tooltip title="Edit">
    //       <IconButton
    //         variant="contained"
    //         size="small"
    //         color="secondary"
    //         onClick={() => {
    //           history.push('EditPopularTVProviders', {
    //             state: { data: rowData },
    //           });
    //         }}
    //       >
    //         <EditIcon />
    //       </IconButton>
    //     </Tooltip>
    //   ),
    // },
  ];

  const getAdvertisement = () => {
    apis.getAdvertisement().then(res => {
      setAdvertisement(res?.data);
    });
  };

  useEffect(() => {
    getAdvertisement();
  }, []);

  const deleteHandler = data => {
    let filter = data[0]?.id;
    apis.deleteAdvertisement(filter).then(res => {
      toastMessage('Successfully deleted');
      getAdvertisement();
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
                  history.push('/AddAdvertisement');
                }}
              >
                Add Advertisement
              </Button>
            </div>
          </Grid>

          <Grid item xs={12}>
            <MaterialTables
              title={<span style={{ color: '#ff3737', fontSize: "x-large" }}>ADVERTISEMENT</span>}
              columns={columns}
              data={Advertisement}
              deleteHandler={deleteHandler}
            />
          </Grid>
        </Grid>
      </div>


    </Container>
  );
}
