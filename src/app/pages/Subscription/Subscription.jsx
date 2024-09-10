import {
  Button, Container, CssBaseline, Checkbox,
  Grid,
  IconButton,
  Tooltip,
  TextField
} from '@material-ui/core';
import apis from 'app/api';
import DRMWaitListTable from 'app/components/DrmWaitlistTable';
import React, { useEffect, useState } from 'react';
import useStyles from 'styles/globalStyles';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';

export default function Subscription() {
  const classes = useStyles();
  const [PendingVendors, setPendingVendors] = useState([]);
  const history = useHistory();
  const columns = [
    { field: 'subscription_type', title: 'subscription_type' },
    {
      field: 'followers',
      title: 'followers',
      sorting: false,
      render: rowData => (
        <Tooltip title="Select">
          <Checkbox
            color="primary"
            checked={rowData.followers === 1}
            onChange={() => handleCheckboxChange(rowData, 'followers')}
          />
        </Tooltip>
      ),
    },
    {
      field: 'notification',
      title: 'notification',
      sorting: false,
      render: rowData => (
        <Tooltip title="Select">
          <Checkbox
            color="primary"
            checked={rowData.notification === 1}
            onChange={() => handleCheckboxChange(rowData, 'notification')}
          />
        </Tooltip>
      ),
    },
    {
      field: 'following_advanced',
      title: 'following_advanced',
      sorting: false,
      render: rowData => (
        <Tooltip title="Select">
          <Checkbox
            color="primary"
            checked={rowData.following_advanced === 1}
            onChange={() => handleCheckboxChange(rowData, 'following_advanced')}
          />
        </Tooltip>
      ),
    },
    {
      field: 'statistics_advanced',
      title: 'statistics_advanced',
      sorting: false,
      render: rowData => (
        <Tooltip title="Select">
          <Checkbox
            color="primary"
            checked={rowData.statistics_advanced === 1}
            onChange={() => handleCheckboxChange(rowData, 'statistics_advanced')}
          />
        </Tooltip>
      ),
    },
    {
      field: 'offer_count',
      title: 'offer_count',
      sorting: false,
      render: rowData => (
        <Tooltip title="Enter offer count">
          <TextField
            value={rowData.offer_count}
            type="number"
            variant="outlined"
            onChange={e => handleTextFieldChange(rowData, e.target.value)}
          />
        </Tooltip>
      ),
    },
    {
      field: 'actions',
      title: 'Submit',
      sorting: false,
      render: rowData => (
        <Tooltip title="Submit">
          <IconButton
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => handleSubmit(rowData)}
          >
            <Button
              variant="contained"
              color="secondary"
              size="small"
              onClick={() => handleSubmit(rowData)}
            >
              Submit
            </Button>
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  const handleCheckboxChange = (rowData, field) => {
    const updatedVendors = PendingVendors.map(vendor => {
      if (vendor.id === rowData.id) {
        return {
          ...vendor,
          [field]: vendor[field] === 1 ? 0 : 1,
        };
      }
      return vendor;
    });
    setPendingVendors(updatedVendors);
  };

  const handleTextFieldChange = (rowData, value) => {
    const updatedVendors = PendingVendors.map(vendor => {
      if (vendor.id === rowData.id) {
        return {
          ...vendor,
          offer_count: value,
        };
      }
      return vendor;
    });
    setPendingVendors(updatedVendors);
  };

  const handleSubmit = data => {
    apis.PutSubscripton(
      data.subscription_type,
      data.followers,
      data.notification,
      data.following_advanced,
      data.statistics_advanced,
      data.offer_count).then(res => {
        toast('Successfully added', {
          position: 'top-right',
          autoClose: 2000,
        });
        history.push('/dashboard');
      });
  };

  const getSubscription = () => {
    apis.getSubscription().then(res => {
      setPendingVendors(res?.data || []);
    });
  };

  useEffect(() => {
    getSubscription();
  }, []);

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <div className={classes.paper}>
        <Grid container spacing={1}>
          <Grid item xs={10}>
            <Grid container spacing={1} alignItems="flex-end"></Grid>
          </Grid>
          <Grid item xs={12}>
            <DRMWaitListTable
              title={<span style={{ color: '#ff3737', fontSize: "x-large" }}>SUBSCRIPTION</span>}
              columns={columns}
              data={PendingVendors}
            />
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
