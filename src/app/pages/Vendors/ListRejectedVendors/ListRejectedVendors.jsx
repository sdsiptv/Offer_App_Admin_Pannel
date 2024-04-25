import {
  Button,
  Container,
  CssBaseline,
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
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
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

export default function ViewRejectedVendors() {
  const classes = useStyles();
  const history = useHistory();
  const [RejectedVendors, setRejectedVendors] = useState([]);
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
  ];

  const handleViewVendor = (vendorData) => {
    setSelectedVendor(vendorData);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const getRejectedVendors = () => {
    apis.getRejectedVendors().then(res => {
      console.log('hii', res?.data)
      setRejectedVendors(res?.data);
    });
  };

  useEffect(() => {
    getRejectedVendors();
  }, []);

  const deleteHandler = data => {
    let filter = data.map(obj => obj.id);
    if (filter.length === 0) {
      console.log("No IDs to delete");
      return;
    }
    let idToDelete = filter[0];
    apis.deleteCategory(idToDelete).then(res => {
      toastMessage('Successfully Deleted');
      getRejectedVendors();
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
            <MaterialTables
              title={<span style={{ color: '#ff3737', fontSize: "x-large" }}>LIST REJECTED VENDORS</span>}
              columns={columns}
              data={RejectedVendors}
              deleteHandler={deleteHandler}
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
