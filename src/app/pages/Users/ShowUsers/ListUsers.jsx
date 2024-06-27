import React, { useEffect, useState } from 'react';
import { Button, Container, CssBaseline, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import moment from 'moment';
import MaterialTables from 'app/components/MaterialTables';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import apis from 'app/api';
import { useHistory } from 'react-router-dom';
import { GREEN } from 'utils/constant/color';
import { toastMessage } from 'utils/helper';
import useStyles from 'styles/globalStyles';
import DRMWaitListTable from 'app/components/DrmWaitlistTable';
import ReportRoundedIcon from '@material-ui/icons/ReportRounded';

export default function ListUsers() {
    const classes = useStyles();
    const history = useHistory();
    const [Users, setUsers] = useState([]);
    const [selectedVendor, setSelectedVendor] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    const columns = [
        { field: 'fullname', title: 'Name' },
        { field: 'emailid', title: 'EmailID' },
        { field: 'mobile_no', title: 'Mobile Number' },
        { field: 'address', title: 'Address' },
        // {
        //     field: 'createdAt',
        //     title: 'Created At',
        //     render: rowData => moment(rowData.createdAt).format('YYYY-MM-DD HH:MM'),
        // },
   
        {
            field: 'actions',
            title: 'View Users',
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
            title: 'BlockList Users',
            sorting: false,
            render: rowData => (
                <Tooltip title="View">
                    <IconButton
                        variant="contained"
                        color="secondary"
                        size="small"
                        onClick={() => handleBlockusers(rowData)}
                    >
                        <ReportRoundedIcon />
                    </IconButton>
                </Tooltip>
            ),
        },
    ];

    const handleBlockusers = (rowData) => {
        apis.addUserBlock(rowData.id).then(res => {
          toastMessage('Users BlockListed successfully');
          getAllUsers();
        }).catch(error => {
          console.error('Error accepting vendor:', error);
          toastMessage('Failed to accept vendor');
        });
      };

    const getAllUsers = () => {
        apis.getAllUsers().then(res => {
            console.log('hii', res?.data)
            setUsers(res?.data);
        });
    };

    useEffect(() => {
        getAllUsers();
    }, []);

    const handleViewVendor = (vendorData) => {
        setSelectedVendor(vendorData);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    return (
        <Container component="main" maxWidth="xl">
            <CssBaseline />
            <div className={classes.paper}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <DRMWaitListTable
                            title={<span style={{ color: '#ff3737', fontSize: "x-large" }}>ALL Users List</span>}
                            columns={columns}
                            data={Users}
                        />
                    </Grid>
                </Grid>
            </div>
            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle style={{ fontSize: "20px", color: "#E74C3C",textAlign:"center" }}>USERS DETAILS</DialogTitle>
                <DialogContent>
                    {selectedVendor && (
                        <TableContainer>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell><Typography style={{ fontSize: "18px", color: "#000000",fontWeight:"700" }}>Shop Name:</Typography></TableCell>
                                        <TableCell style={{ fontSize: "18px" }}>{selectedVendor.fullname}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><Typography style={{ fontSize: "18px", color: "#000000",fontWeight:"700" }}>Email:</Typography></TableCell>
                                        <TableCell style={{ fontSize: "18px" }}>{selectedVendor.emailid}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><Typography style={{ fontSize: "18px", color: "#000000",fontWeight:"700" }}>Mobile Number:</Typography></TableCell>
                                        <TableCell style={{ fontSize: "18px" }}>{selectedVendor.mobile_no}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><Typography style={{ fontSize: "18px", color: "#000000",fontWeight:"700" }}>Address:</Typography></TableCell>
                                        <TableCell style={{ fontSize: "18px" }}>{selectedVendor.address}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><Typography style={{ fontSize: "18px", color: "#000000",fontWeight:"700" }}>Date of Birth:</Typography></TableCell>
                                        <TableCell style={{ fontSize: "18px" }}>{selectedVendor.dob}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><Typography style={{ fontSize: "18px", color: "#000000",fontWeight:"700" }}>Gender:</Typography></TableCell>
                                        <TableCell style={{ fontSize: "18px" }}>{selectedVendor.gender}</TableCell>
                                    </TableRow>
                                    {/* <TableRow>
                                        <TableCell><Typography style={{ fontSize: "18px", color: "#000000",fontWeight:"700" }}>State:</Typography></TableCell>
                                        <TableCell style={{ fontSize: "18px" }}>{selectedVendor.state}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><Typography style={{ fontSize: "18px", color: "#000000",fontWeight:"700" }}>District:</Typography></TableCell>
                                        <TableCell style={{ fontSize: "18px" }}>{selectedVendor.district}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><Typography style={{ fontSize: "18px", color: "#000000",fontWeight:"700" }}>City:</Typography></TableCell>
                                        <TableCell style={{ fontSize: "18px" }}>{selectedVendor.city}</TableCell>
                                    </TableRow> */}
                                    <TableRow>
                                        <TableCell><Typography style={{ fontSize: "18px", color: "#000000",fontWeight:"700" }}>Postal Code:</Typography></TableCell>
                                        <TableCell style={{ fontSize: "18px" }}>{selectedVendor.postalcode}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><Typography style={{ fontSize: "18px", color: "#000000",fontWeight:"700" }}>Created At:</Typography></TableCell>
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
