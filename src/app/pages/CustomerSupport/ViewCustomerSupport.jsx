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

export default function ViewCustomerSupport() {
    const classes = useStyles();
    const history = useHistory();
    const [CustomerSupport, setCustomerSupport] = useState([]);

    const columns = [
        { field: 'constact_number_1', title: 'Contact Number 1' },
        { field: 'constact_number_2', title: 'Contact Number 2' },
        { field: 'whatsapp', title: 'Whatsapp' },
        { field: 'support_mail', title: 'Support Mail' },
        { field: 'vendorapp', title: 'Vendor' },
        { field: 'customerapp', title: 'Customer' },
        { field: 'vendorapp_ios', title: 'Vendor IOS' },
        { field: 'customerapp_ios', title: 'Customer IOS' },
        // { field: 'profile', title: 'Profile BaseURL' },
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
                            history.push('EditCustomerSupport', {
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

    const getCustomerSupport = () => {
        apis.getCustomerSupport().then(res => {
            if (res?.data) {
                const formattedData = [res.data];
                setCustomerSupport(formattedData);
            } else {
                setCustomerSupport([]);
            }
        }).catch(error => {
            console.error("Failed to fetch customer support:", error);
            toastMessage('Error fetching customer support');
        });
    };



    useEffect(() => {
        getCustomerSupport();
    }, []);

    const deleteHandler = data => {
        let filter = data.map(obj => obj.id);
        if (filter.length === 0) {
            console.log("No IDs to delete");
            return;
        }
        let idToDelete = filter[0];
        apis.deleteCustomerSupport(idToDelete).then(() => {
            toastMessage('Successfully Deleted');
            getCustomerSupport();
        });
    };

    return (
        <Container component="main" maxWidth="xl">
            <CssBaseline />
            <div className={classes.paper}>
                <Grid container spacing={1}>
                    <Grid item xs={10}>
                        <Grid container spacing={1} alignItems="flex-end"></Grid>
                    </Grid>
                    <Grid item xs={2}>
                        {CustomerSupport.length === 0 && (
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button
                                    variant="contained"
                                    style={{ backgroundColor: GREEN }}
                                    onClick={() => {
                                        history.push('/AddCustomerSupport');
                                    }}
                                >
                                    Add Support
                                </Button>
                            </div>
                        )}
                    </Grid>

                    <Grid item xs={12}>
                        <MaterialTables
                            title={<span style={{ color: '#ff3737', fontSize: "x-large" }}>CUSTOMER SUPPORT</span>}
                            columns={columns}
                            data={CustomerSupport}
                            deleteHandler={deleteHandler}
                        />
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
}