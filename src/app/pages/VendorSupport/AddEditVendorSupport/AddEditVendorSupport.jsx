import {
    Button,
    Container,
    CssBaseline,
    Grid,
    TextField,
    Typography,
    MenuItem
} from '@material-ui/core';
import apis from 'app/api';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';
import { GREEN, LIGHT_GREY } from 'utils/constant/color';
import useStyles from 'styles/globalStyles';
import { failureNotification, toastMessage } from 'utils/helper';

export default function AddEditVendorSupport({ pageMode = 'add' }) {
    const hiddenFileInput = React.useRef(null);
    const history = useHistory();
    const location = useLocation();
    const classes = useStyles();

    const { register, handleSubmit, setValue } = useForm();

    const onSubmit = ({
        constact_number_1,
        constact_number_2,
        whatsapp,
        support_mail,
        profile,
        customerapp,
        vendorapp,
        customerapp_ios,
        vendorapp_ios
    }) => {

        let data = new FormData();
        data.append('constact_number_1', constact_number_1);
        data.append('constact_number_2', constact_number_2);
        data.append('whatsapp', whatsapp);
        data.append('support_mail', support_mail);
        data.append('profile', profile);
        data.append('customerapp', customerapp);
        data.append('vendorapp', vendorapp);
        data.append('customerapp_ios', customerapp_ios);
        data.append('vendorapp_ios', vendorapp_ios);
        // if (pageMode === 'edit') {
        //     const categoryId = location.state.state.data?.id;
        //     data.append('id', categoryId);
        // }

        const apiCall =
            pageMode === 'add'
                ? apis.addVendorSupport(data)
                : apis.editVendorSupport(location.state.state.data?.id, data);

        apiCall
            .then(res => {
                toastMessage(
                    pageMode === 'add' ? `Successfully Added ` : `Successfully updated`,
                );
                history.push('/ViewVendorSupport');
            })
            .catch(err => {
                failureNotification('Network error');
            });
    };

    useEffect(() => {
        if (location.state) {
            let params = location.state.state.data;
            setValue('constact_number_1', params.constact_number_1);
            setValue('constact_number_2', params.constact_number_2);
            setValue('whatsapp', params.whatsapp);
            setValue('support_mail', params.support_mail);
            setValue('profile', params.profile);
            setValue('customerapp', params.customerapp);
            setValue('vendorapp', params.vendorapp);
            setValue('customerapp_ios', params.customerapp_ios);
            setValue('vendorapp_ios', params.vendorapp_ios);
            setValue('id', params.id);
        } else {
            history.push('/AddVendorSupport');
        }
    }, []);

    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={classes.paper}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography component="h1" variant="h5" className={classes.title}>
                                {pageMode === 'add' ? 'ADD' : 'EDIT'} VENDOR SUPPORT
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="constact_number_1"
                                label="Constact Number 1"
                                type="number"
                                InputLabelProps={{ shrink: true }}
                                id="constact_number_1"
                                {...register('constact_number_1', { required: true })}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="constact_number_2"
                                label="Constact Number 2"
                                type="number"
                                InputLabelProps={{ shrink: true }}
                                id="constact_number_2"
                                {...register('constact_number_2', { required: true })}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="whatsapp"
                                label="Whatsapp"
                                type="number"
                                InputLabelProps={{ shrink: true }}
                                id="whatsapp"
                                {...register('whatsapp', { required: true })}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="support_mail"
                                label="Support Mail"
                                type="text"
                                InputLabelProps={{ shrink: true }}
                                id="support_mail"
                                {...register('support_mail', { required: true })}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="profile"
                                label="Profile BaseURL"
                                type="text"
                                InputLabelProps={{ shrink: true }}
                                id="profile"
                                {...register('profile', { required: true })}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="customerapp"
                                label="Customer"
                                type="text"
                                InputLabelProps={{ shrink: true }}
                                id="customerapp"
                                {...register('customerapp', { required: true })}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="vendorapp"
                                label="Vendor"
                                type="text"
                                InputLabelProps={{ shrink: true }}
                                id="vendorapp"
                                {...register('vendorapp', { required: true })}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="customerapp_ios"
                                label="Customer IOS"
                                type="text"
                                InputLabelProps={{ shrink: true }}
                                id="customerapp_ios"
                                {...register('customerapp_ios', { required: true })}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="vendorapp_ios"
                                label="Vendor IOS"
                                type="text"
                                InputLabelProps={{ shrink: true }}
                                id="vendorapp_ios"
                                {...register('vendorapp_ios', { required: true })}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'flex-end',
                                }}
                            >
                                <div>
                                    <Button
                                        type="submit"
                                        required
                                        fullWidth
                                        variant="contained"
                                        style={{ backgroundColor: GREEN, width: 150 }}
                                    >
                                        {pageMode === 'add' ? 'Create' : 'Update'}
                                    </Button>
                                </div>
                                <div>
                                    <Button
                                        required
                                        fullWidth
                                        variant="contained"
                                        style={{ backgroundColor: LIGHT_GREY.length, width: 150 }}
                                        onClick={() => {
                                            history.push('/ViewVendorSupport');
                                        }}
                                    >
                                        Back
                                    </Button>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </form>
        </Container>
    );
}
