import {
    Button,
    Container,
    CssBaseline,
    Grid,
    TextField,
    Typography,
    Select,
    MenuItem,
    FormControl,
    InputLabel
} from '@material-ui/core';
import apis from 'app/api';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { GREEN, LIGHT_GREY } from 'utils/constant/color';
import useStyles from 'styles/globalStyles';
import { failureNotification, toastMessage } from 'utils/helper';
import { Autocomplete } from '@material-ui/lab';

export default function AddVendorSubscription() {
    const hiddenFileInput = React.useRef(null);
    const history = useHistory();
    const classes = useStyles();
    const { register, handleSubmit } = useForm();
    const [customerData, setCustomerData] = useState([]);
    const [userIds, setUserId] = useState(null);

    // const onSubmit = data => {
    //     apis.addVendorSubscription(data.name,data.use)
    //         .then(res => {
    //             toastMessage('Successfully Added');
    //             history.push('/');
    //         })
    //         .catch(err => {
    //             failureNotification('Network error');
    //         });
    // };

    const onSubmit = data => {
        const payload = {
            vendor_id: userIds,
            subscription: data.subscription,
        };

        apis.addVendorSubscription(payload)
            .then(res => {
                toastMessage('Successfully Added');
                history.push('/dashboard');
            })
            .catch(err => {
                failureNotification('Network error');
            });
    };


    useEffect(() => {
        apis.getAllVendors().then(res => {
            setCustomerData(res.data);
        });
    }, []);

    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={classes.paper}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography component="h1" variant="h5" className={classes.title}>
                                ADD VENDOR SUBSCRIPTION
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Autocomplete
                                id="Vendor_id"
                                options={customerData}
                                getOptionLabel={option => option?.id + ' - ' + option?.shop_name}
                                onChange={(event, newValue) => {
                                    if (newValue) {
                                        setUserId(newValue.id);
                                    } else {
                                        setUserId(null);
                                    }
                                }}
                                renderInput={params => (
                                    <TextField
                                        {...params}
                                        label="Vendor"
                                        variant="outlined"
                                        helperText="Please select your Vendor"
                                        autoFocus
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl variant="outlined" required fullWidth>
                                <InputLabel id="name-label" shrink>
                                    Rank
                                </InputLabel>
                                <Select
                                    labelId="name-label"
                                    id="subscription"
                                    label="Rank"
                                    defaultValue=""
                                    {...register('subscription', { required: true })}
                                >
                                    <MenuItem value={2}>Bronze</MenuItem>
                                    <MenuItem value={3}>Silver</MenuItem>
                                    <MenuItem value={4}>Gold</MenuItem>
                                    <MenuItem value={5}>Platinum</MenuItem>
                                </Select>
                            </FormControl>
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
                                        Create
                                    </Button>
                                </div>
                                <div>
                                    <Button
                                        required
                                        fullWidth
                                        variant="contained"
                                        style={{ backgroundColor: LIGHT_GREY.length, width: 150 }}
                                        onClick={() => {
                                            history.push('/dashboard');
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
