import React, { useEffect, useState } from 'react';
import {
    Button,
    Container,
    CssBaseline,
    Grid,
    TextField,
    Typography,
    MenuItem
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';
import { GREEN, LIGHT_GREY } from 'utils/constant/color';
import useStyles from 'styles/globalStyles';
import { failureNotification, toastMessage } from 'utils/helper';
import { Autocomplete } from '@material-ui/lab';
import apis from 'app/api';

export default function AddEditAdInsertion({ pageMode = 'add' }) {
    const hiddenFileInput = React.useRef(null);
    const history = useHistory();
    const location = useLocation();
    const classes = useStyles();
    const { register, handleSubmit, setValue } = useForm();
    const [type, setType] = useState(pageMode === 'edit' ? '1' : '');
    const [imageObj, setImageObj] = useState(undefined);
    const [image, setImage] = useState('');
    const [hotOffers, setHotOffers] = useState([]);
    const [selectedVendorId, setSelectedVendorId] = useState(null);
    const [customerData, setCustomerData] = useState([]);
    const [offer, setOffer] = useState('');

    const handleImageChange = (event) => {
        const fileUploaded = event.target.files[0];
        setImageObj(fileUploaded);
    };

    const fetchOffers = (vendorId) => {
        apis.getOffersUsingId(vendorId)
            .then((res) => setHotOffers(res?.data || []))
            .catch(() => failureNotification('Failed to fetch offers'));
    };

    const handleGetCustomer = () => {
        apis.getAllVendors()
            .then((res) => setCustomerData(res.data || []))
            .catch(() => failureNotification('Failed to fetch customers'));
    };

    useEffect(() => {
        handleGetCustomer();
    }, []);

    const onSubmit = ({ name, position, url }) => {
        let data = new FormData();
        data.append('position', position);
        data.append('type', type);
    
        if (type === '0') {
            if (offer) {
                data.append('offer_id', offer);
            }
        } else if (type === '1') {
            if (url) {
                data.append('url', url);
            }
        }
    
        if (imageObj) {
            data.append('images', imageObj);
        }
    
        console.log('Payload:', Object.fromEntries(data.entries()));
    
        const apiCall =
            pageMode === 'add'
                ? apis.addAdInsertion(data)
                : apis.editAdInsertion(location.state.state.data?.id, data);
    
        apiCall
            .then(response => {
                if (response.status === 400) {
                    failureNotification(response.data?.message || 'Bad Request');
                } else if (response.success) {
                    toastMessage(pageMode === 'add' ? 'Successfully Added' : 'Successfully updated');
                    history.push('/ViewAdInsertion');
                }
            })
            .catch(error => {
                if (error.response && error.response.status === 400) {
                    failureNotification(error.response.data?.message || 'Bad Request');
                } else {
                    failureNotification('Network error');
                }
            });
    };
    

    useEffect(() => {
        if (location.state && location.state.state?.data) {
            const params = location.state.state.data;

            setSelectedVendorId(params.vendor_id);
            fetchOffers(params.vendor_id);
            setOffer(params.offer_id);

            setType(params.type || '1');

            setValue('url', params.url || '');
            setValue('position', params.position);

            if (params.image_url) {
                setImage(params.image_url);
            }
        } else if (pageMode === 'edit') {
            setType('1');
            setValue('url', '');
        } else {
            history.push('/AddAdInsertion');
        }
    }, [location.state, setValue, history, pageMode]);

    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={classes.paper}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography component="h1" variant="h5" className={classes.title}>
                                {pageMode === 'add' ? 'ADD' : 'EDIT'} AD INSERTION
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                select
                                variant="outlined"
                                required
                                fullWidth
                                name="type"
                                label="Type"
                                InputLabelProps={{ shrink: true }}
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                id="type"
                            >
                                <MenuItem value="0">Offer Redirect</MenuItem>
                                <MenuItem value="1">URL Redirect</MenuItem>
                            </TextField>
                        </Grid>

                        {type === '0' && (
                            <>
                                <Grid item xs={12}>
                                    <Autocomplete
                                        id="vendor_id"
                                        options={customerData}
                                        getOptionLabel={(option) => `${option?.id} - ${option?.shop_name}`}
                                        value={
                                            customerData.find((vendor) => vendor.id === selectedVendorId) || null
                                        }
                                        onChange={(event, newValue) => {
                                            if (newValue) {
                                                setSelectedVendorId(newValue.id);
                                                fetchOffers(newValue.id);
                                            } else {
                                                setSelectedVendorId(null);
                                                setHotOffers([]);
                                            }
                                        }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Vendor"
                                                variant="outlined"
                                                helperText="Please select a Vendor"
                                                autoFocus
                                            />
                                        )}
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        id="offer_id"
                                        select
                                        label="Offer"
                                        fullWidth
                                        variant="outlined"
                                        size="small"
                                        value={offer || ''}
                                        onChange={(e) => setOffer(e.target.value)}
                                    >
                                        {hotOffers.map((offer) => (
                                            <MenuItem key={offer.id} value={offer.id}>
                                                {offer.offer_name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                </Grid>
                            </>
                        )}

                        {type === '1' && (
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    name="url"
                                    label="URL"
                                    type="text"
                                    InputLabelProps={{ shrink: true }}
                                    id="url"
                                    defaultValue={location.state?.state?.data?.url || ''}
                                    {...register('url')}
                                />
                            </Grid>
                        )}


                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="position"
                                label="Position"
                                type="number"
                                InputLabelProps={{ shrink: true }}
                                id="position"
                                {...register('position', { required: true })}
                            />
                        </Grid>

                        <Grid item xs={6}>
                            <div style={{ display: 'flex' }}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={hiddenFileInput}
                                    style={{ display: 'none' }}
                                    onChange={handleImageChange}
                                    id="contained-button-file"
                                />
                                <label htmlFor="contained-button-file">
                                    <Button variant="contained" color="primary" component="span">
                                        ADD IMAGE
                                    </Button>
                                </label>
                                <img
                                    src={
                                        typeof imageObj === 'object'
                                            ? URL.createObjectURL(imageObj)
                                            : image
                                    }
                                    alt=""
                                    style={{ paddingLeft: '10px', width: '100px' }}
                                />
                            </div>
                        </Grid>

                        <Grid item xs={12}>
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    style={{ backgroundColor: GREEN, width: 150 }}
                                >
                                    {pageMode === 'add' ? 'Create' : 'Update'}
                                </Button>
                                <Button
                                    variant="contained"
                                    style={{ backgroundColor: LIGHT_GREY, width: 150 }}
                                    onClick={() => history.push('/ViewAdInsertion')}
                                >
                                    Back
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </form>
        </Container>
    );
}
