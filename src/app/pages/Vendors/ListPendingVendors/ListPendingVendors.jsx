import {
  Button, Container, CssBaseline,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography
} from '@material-ui/core';
import moment from 'moment';
import IconButton from '@material-ui/core/IconButton';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import Tooltip from '@material-ui/core/Tooltip';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import CancelIcon from '@material-ui/icons/Cancel';
import apis from 'app/api';
import DRMWaitListTable from 'app/components/DrmWaitlistTable';
import MaterialTables from 'app/components/MaterialTables';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { GREEN } from 'utils/constant/color';
import { toastMessage } from 'utils/helper';
import useStyles from 'styles/globalStyles';

export default function ViewPendingVendors() {
  const classes = useStyles();
  const history = useHistory();
  const [PendingVendors, setPendingVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  const columns = [

    { field: 'shop_name', title: 'shop_name' },
    { field: 'emailid', title: 'emailid' },
    { field: 'mobile_no', title: 'mobile_no' },
    {
      field: 'actions',
      title: 'View Vendor',
      sorting: false,
      render: rowData => (
        <Tooltip title="View">
          <IconButton
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => handleViewVendor(rowData)}
          >
            <RemoveRedEyeIcon />
          </IconButton>
        </Tooltip>
      ),
    },
    {
      field: 'actions',
      title: 'Accept Vendor',
      sorting: false,
      render: rowData => (
        <Tooltip title="Accept">
          <IconButton
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => handleAccept(rowData)}
          >
            <DoneOutlineIcon />
          </IconButton>
        </Tooltip>
      ),
    },
    {
      field: 'actions',
      title: 'Reject Vendor',
      sorting: false,
      render: rowData => (
        <Tooltip title="Reject">
          <IconButton
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => handleReject(rowData)}
          >
            <CancelIcon />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  const handleViewVendor = (vendorData) => {
    setSelectedVendor(vendorData);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const getPendingVendors = () => {
    apis.getPendingVendors().then(res => {
      console.log('hii', res?.data)
      setPendingVendors(res?.data);
    });
  };

  useEffect(() => {
    getPendingVendors();
  }, []);

  const handleAccept = (rowData) => {
    apis.addAcceptVendors(rowData.id).then(res => {
      toastMessage('Vendor accepted successfully');
      getPendingVendors();
    }).catch(error => {
      console.error('Error accepting vendor:', error);
      toastMessage('Failed to accept vendor');
    });
  };

  const handleReject = (rowData) => {
    apis.addRejectVendors(rowData.id).then(res => {
      toastMessage('Vendor Rejected successfully');
      getPendingVendors();
    }).catch(error => {
      console.error('Error accepting vendor:', error);
      toastMessage('Failed to accept vendor');
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
          <Grid item xs={12}>
            <DRMWaitListTable
              title={<span style={{ color: '#ff3737', fontSize: "x-large" }}>LIST PENDING VENDORS</span>}
              columns={columns}
              data={PendingVendors}
            />
          </Grid>
        </Grid>
      </div>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle style={{ fontSize: "20px", color: "#E74C3C", textAlign: "center" }}>VENDOR DETAILS</DialogTitle>
        <DialogContent>
          {selectedVendor && (
            <TableContainer>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell><Typography style={{ fontSize: "18px", color: "#000000", fontWeight: "700" }}>Shop Name:</Typography></TableCell>
                    <TableCell style={{ fontSize: "18px" }}>{selectedVendor.shop_name}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><Typography style={{ fontSize: "18px", color: "#000000", fontWeight: "700" }}>Email:</Typography></TableCell>
                    <TableCell style={{ fontSize: "18px" }}>{selectedVendor.emailid}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><Typography style={{ fontSize: "18px", color: "#000000", fontWeight: "700" }}>Mobile Number:</Typography></TableCell>
                    <TableCell style={{ fontSize: "18px" }}>{selectedVendor.mobile_no}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell><Typography style={{ fontSize: "18px", color: "#000000", fontWeight: "700" }}>Created At:</Typography></TableCell>
                    <TableCell style={{ fontSize: "18px" }}>{moment(selectedVendor.createdAt).format('YYYY-MM-DD HH:MM')}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

    </Container>
  );
}
