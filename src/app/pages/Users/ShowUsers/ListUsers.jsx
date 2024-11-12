import React, { useEffect, useState } from 'react';
import {
    Button, Container, CssBaseline, Dialog, DialogActions, DialogContent,
    DialogTitle, Grid, Typography, TableContainer, Table, TableBody, TableRow,
    TableCell, TextField, MenuItem, IconButton, Tooltip
} from '@material-ui/core';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';
import moment from 'moment';
import DRMWaitListTable from 'app/components/DrmWaitlistTable';
import apis from 'app/api';
import { useHistory } from 'react-router-dom';
import { toastMessage } from 'utils/helper';
import useStyles from 'styles/globalStyles';
import ReportRoundedIcon from '@material-ui/icons/ReportRounded';
import { useForm } from 'react-hook-form';

export default function ListUsers() {
    const classes = useStyles();
    const history = useHistory();
    const [Users, setUsers] = useState([]);
    const [selectedVendor, setSelectedVendor] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [State, setState] = useState([]);
    const [City, setCity] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [District, setDistrict] = useState([]);

    const { register, handleSubmit, setValue } = useForm();

    const columns = [
        { field: 'fullname', title: 'Name' },
        { field: 'emailid', title: 'EmailID' },
        { field: 'mobile_no', title: 'Mobile Number' },
        { field: 'address', title: 'Address' },
        { field: 'state_name', title: 'state' },
        { field: 'district_name', title: 'district' },
        { field: 'city_name', title: 'city' },
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
                <Tooltip title="Block">
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

    const handleBlockusers = async (rowData) => {
        try {
            await apis.addUserBlock(rowData.id);
            toastMessage('User BlockListed successfully');
            getAllUsers();
        } catch (error) {
            console.error('Error blocking user:', error);
            toastMessage('Failed to block user');
        }
    };

    const getAllUsers = async (filters = {}) => {
        try {
            const res = await apis.getAllUsers(filters);
            setUsers(res?.data);
            console.log('Users:', res?.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
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
                <DialogTitle style={{ fontSize: "20px", color: "#E74C3C", textAlign: "center" }}>USERS DETAILS</DialogTitle>
                <DialogContent>
                    {selectedVendor && (
                        <TableContainer>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell><Typography style={{ fontSize: "18px", color: "#000000", fontWeight: "700" }}>Shop Name:</Typography></TableCell>
                                        <TableCell style={{ fontSize: "18px" }}>{selectedVendor.fullname}</TableCell>
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
                                        <TableCell><Typography style={{ fontSize: "18px", color: "#000000", fontWeight: "700" }}>Address:</Typography></TableCell>
                                        <TableCell style={{ fontSize: "18px" }}>{selectedVendor.address}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><Typography style={{ fontSize: "18px", color: "#000000", fontWeight: "700" }}>State:</Typography></TableCell>
                                        <TableCell style={{ fontSize: "18px" }}>{selectedVendor.state_name}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><Typography style={{ fontSize: "18px", color: "#000000", fontWeight: "700" }}>District:</Typography></TableCell>
                                        <TableCell style={{ fontSize: "18px" }}>{selectedVendor.district_name}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><Typography style={{ fontSize: "18px", color: "#000000", fontWeight: "700" }}>City:</Typography></TableCell>
                                        <TableCell style={{ fontSize: "18px" }}>{selectedVendor.city_name}</TableCell>
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
