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
import moment from 'moment';

export default function ListEvents() {
  const classes = useStyles();
  const history = useHistory();
  const [Events, setEvents] = useState([]);

  const columns = [
    {
      field: 'images',
      title: 'Logo',
      render: rowData =>
        typeof rowData.images == 'string' ? (
          <img src={rowData.images} alt="" width={40} height={30} />
        ) : null,
    },
    { field: 'event_name', title: 'Event Name' },
    { field: 'url', title: 'URL' },
    { field: 'locations', title: 'Location' },
    {
      field: 'event_date',
      title: 'Event Date',
      // render: rowData => moment(rowData.created_at).format('YYYY-MM-DD'),
    },
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
              history.push('EditEvents', {
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

  const getEvents = () => {
    apis.getEvents().then(res => {
      console.log('hii', res?.data)
      setEvents(res?.data);
    });
  };

  useEffect(() => {
    getEvents();
  }, []);

  const deleteHandler = data => {
    let filter = data.map(obj => obj.id);
    if (filter.length === 0) {
      console.log("No IDs to delete");
      return;
    }
    let idToDelete = filter[0];
    apis.deleteEvents(idToDelete).then(res => {
      toastMessage('Successfully Deleted');
      getEvents();
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
                  history.push('/AddEvents');
                }}
              >
                Add Events
              </Button>
            </div>
          </Grid>

          <Grid item xs={12}>
            <MaterialTables
              title={<span style={{ color: '#ff3737', fontSize: "x-large" }}>HANDLE EVENTS</span>}
              columns={columns}
              data={Events}
              deleteHandler={deleteHandler}
            />
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
