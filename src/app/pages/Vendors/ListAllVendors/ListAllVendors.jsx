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

export default function ViewAllVendors() {
    const classes = useStyles();
    const history = useHistory();
    const [allVendors, setAllVendors] = useState([]);
    const [selectedVendor, setSelectedVendor] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);

    const columns = [
        {
            field: 'images',
            title: 'Logo',
            render: rowData =>
                typeof rowData.images == 'string' ? (
                    <img src={rowData.images} alt="" width={40} height={30} />
                ) : null,
        },
        { field: 'id', title: 'Vendor ID' },
        { field: 'shop_name', title: 'Shop Name' },
        { field: 'emailid', title: 'EmailID' },
        { field: 'category', title: 'category' },
        { field: 'mobile_no', title: 'Mobile Number' },
        { field: 'state_name', title: 'state' },
        { field: 'district_name', title: 'district' },
        { field: 'city_name', title: 'city' },
        {
            field: 'createdAt',
            title: 'Created At',
            render: rowData => moment(rowData.createdAt).format('YYYY-MM-DD HH:MM'),
        },
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

    const getAllVendors = () => {
        apis.getAllVendors().then(res => {
            console.log('hii', res?.data)
            setAllVendors(res?.data);
        });
    };

    useEffect(() => {
        getAllVendors();
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
                            title={<span style={{ color: '#ff3737', fontSize: "x-large" }}>ALL Vendor List</span>}
                            columns={columns}
                            data={allVendors}
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
                                        <TableCell><Typography style={{ fontSize: "18px", color: "#000000", fontWeight: "700" }}>Shop Image:</Typography></TableCell>
                                        <TableCell style={{ fontSize: "18px" }}>{selectedVendor.images}</TableCell>
                                    </TableRow>
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
                                        <TableCell><Typography style={{ fontSize: "18px", color: "#000000", fontWeight: "700" }}>Category:</Typography></TableCell>
                                        <TableCell style={{ fontSize: "18px" }}>{selectedVendor.category}</TableCell>
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
