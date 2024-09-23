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

    const fetchStates = async () => {
        try {
            const res = await apis.getState();
            setState(res?.data);
            console.log('States:', res?.data);
        } catch (error) {
            console.error('Error fetching states:', error);
        }
    };

    const fetchDistricts = async (stateId) => {
        try {
            const res = await apis.getDistrict(stateId);
            setDistrict(res?.data);
            console.log('Districts for state', stateId, ':', res?.data);
        } catch (error) {
            console.error('Error fetching districts:', error);
        }
    };

    const fetchCities = async (districtId) => {
        try {
            const res = await apis.getCities(districtId);
            setCity(res?.data);
            console.log('Cities for district', districtId, ':', res?.data);
        } catch (error) {
            console.error('Error fetching cities:', error);
        }
    };

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
        fetchStates();
    }, []);

    const handleViewVendor = (vendorData) => {
        setSelectedVendor(vendorData);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleFilterChange = () => {
        const filters = {
            state: selectedState,
            district: selectedDistrict,
            city: selectedCity,
        };
        getAllUsers(filters);
    };

    return (
        <Container component="main" maxWidth="xl">
            <CssBaseline />
            <div className={classes.paper}>
                <Grid container spacing={1}>
                    {/* <Grid item xs={3}>
                        <TextField
                            id="filled-select-state"
                            select
                            label="State"
                            required
                            fullWidth
                            helperText="Please select your State"
                            variant="outlined"
                            size="small"
                            value={selectedState}
                            onChange={(e) => {
                                const stateId = e.target.value;
                                setSelectedState(stateId);
                                fetchDistricts(stateId);
                                handleFilterChange();
                            }}
                        >
                            {State.map((ele) => (
                                <MenuItem key={ele.id} value={ele.id}>
                                    {ele.state_name} 
                                </MenuItem>
                            ))}
                        </TextField>

                    </Grid>

                    <Grid item xs={3}>
                        <TextField
                            variant="outlined"
                            select
                            fullWidth
                            name="district"
                            label="District"
                            size="small"
                            helperText="Please select your District"
                            value={selectedDistrict}
                            onChange={(e) => {
                                const districtId = e.target.value;
                                setSelectedDistrict(districtId);
                                fetchCities(districtId);
                                handleFilterChange();
                            }}
                        >
                            {District.map((provider) => (
                                <MenuItem key={provider.id} value={provider.id}>
                                    {provider.district_name}
                                </MenuItem>
                            ))}
                        </TextField>

                    </Grid>

                    <Grid item xs={3}>
                        <TextField
                            variant="outlined"
                            select
                            fullWidth
                            name="city"
                            label="City"
                            size="small"
                            helperText="Please select your City"
                            value={selectedCity}
                            onChange={(e) => {
                                const cityId = e.target.value;
                                setSelectedCity(cityId);
                                handleFilterChange();
                            }}
                        >
                            {City.map((provider) => (
                                <MenuItem key={provider.id} value={provider.id}>
                                    {provider.city_name}
                                </MenuItem>
                            ))}
                        </TextField>

                    </Grid> */}

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
                                        <TableCell><Typography style={{ fontSize: "18px", color: "#000000", fontWeight: "700" }}>Date of Birth:</Typography></TableCell>
                                        <TableCell style={{ fontSize: "18px" }}>{selectedVendor.dob}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><Typography style={{ fontSize: "18px", color: "#000000", fontWeight: "700" }}>Gender:</Typography></TableCell>
                                        <TableCell style={{ fontSize: "18px" }}>{selectedVendor.gender}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell><Typography style={{ fontSize: "18px", color: "#000000", fontWeight: "700" }}>Postal Code:</Typography></TableCell>
                                        <TableCell style={{ fontSize: "18px" }}>{selectedVendor.postalcode}</TableCell>
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
