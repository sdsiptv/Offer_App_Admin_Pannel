import React, { useEffect, useState, useRef } from 'react';
import {
    Button,
    Checkbox,
    Container,
    CssBaseline,
    FormControlLabel,
    Grid,
    MenuItem,
    TextField,
    Typography,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';
import apis from 'app/api';
import { GREEN, LIGHT_GREY } from 'utils/constant/color';
import { failureNotification, toastMessage } from 'utils/helper';
import { Autocomplete } from '@material-ui/lab';
import useStyles from 'styles/globalStyles';

export default function AddEditHotOffers({ pageMode = 'add' }) {
    const hiddenFileInput = React.useRef(null);
    const history = useHistory();
    const location = useLocation();
    const classes = useStyles();
    const { register, handleSubmit, setValue } = useForm();
    const [customerData, setCustomerData] = useState([]);
    const [hotOffers, setHotOffers] = useState([]);
    const [selectedVendorId, setSelectedVendorId] = useState(null);
    const [Offer, setOffer] = useState('');
    const [Type, setType] = useState('');
    const [districts, setDistricts] = useState([]);
    const [isForced, setIsForced] = useState(0);
    const [forcedTiming, setForcedTiming] = useState('');
    const [ImageVideo, setImageVideo] = useState(false);
    const [showUploadField, setShowUploadField] = useState(false);
    const [uploadFile, setUploadFile] = useState(null);
    const [previewFile, setPreviewFile] = useState(null);

    const hiddenFileInput1 = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUploadFile(file);
            setPreviewFile({
                url: URL.createObjectURL(file),
                type: file.type,
            });
        }
    };

    const onSubmit = ({ url, force_timing }) => {
        let data = new FormData();

        if (!selectedVendorId || !Offer) {
            failureNotification('Please fill in all required fields');
            return;
        }

        data.append('vendor_id', selectedVendorId);
        data.append('offer_id', Offer);
        data.append('url', url);
        data.append('type', Type)
        if (isForced) {
            data.append('forced', isForced);
            if (isForced === 1) {
                data.append('force_timing', force_timing);
            }
        } else {
            data.append('forced', isForced);
        }

        if (showUploadField && uploadFile) {
            data.append('images', uploadFile);
        }

        const apiCall =
            pageMode === 'add'
                ? apis.addHotOffers(data)
                : apis.editHotOffers(location.state.state.data?.id, data);

        apiCall
            .then((res) => {
                toastMessage(
                    pageMode === 'add' ? `Successfully Added` : `Successfully Updated`
                );
                history.push('/ViewHotOffers');
            })
            .catch((err) => {
                failureNotification('Network Error');
            });
    };


    const fetchOffers = (vendorId) => {
        apis.getOffersUsingId(vendorId)
            .then((res) => {
                setHotOffers(res?.data || []);
            })
            .catch((err) => {
                failureNotification('Failed to fetch offers');
            });
    };

    useEffect(() => {
        if (location.state && location.state.state?.data) {
            const params = location.state.state.data;

            setSelectedVendorId(params.vendor_id);
            fetchOffers(params.vendor_id);
            setOffer(params.offer_id);
            setType(params.type);
            setValue('url', params.url);
            setIsForced(params.forced || false);
            setValue('force_timing', params.force_timing);
        } else {
            history.push('/AddHotOffers');
        }
    }, [location.state, setValue, history]);



    const handleGetCustomer = () => {
        apis.getAllVendors()
            .then((res) => {
                setCustomerData(res.data || []);
            })
            .catch((err) => {
                failureNotification('Failed to fetch customers');
            });
    };

    useEffect(() => {
        handleGetCustomer();
    }, []);

    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={classes.paper}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography component="h1" variant="h5" className={classes.title}>
                                {pageMode === 'add' ? 'ADD' : 'EDIT'} HOT OFFERS
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Autocomplete
                                id="vendor_id"
                                options={customerData}
                                getOptionLabel={option => `${option?.id} - ${option?.shop_name}`}
                                value={customerData.find(vendor => vendor.id === selectedVendorId) || null}
                                onChange={(event, newValue) => {
                                    if (newValue) {
                                        setSelectedVendorId(newValue.id);
                                        fetchOffers(newValue.id);
                                    } else {
                                        setSelectedVendorId(null);
                                        setHotOffers([]);
                                    }
                                }}
                                renderInput={params => (
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
                                label="Upload Type"
                                fullWidth
                                variant="outlined"
                                size="small"
                                value={Type || ''}
                                onChange={(e) => setType(e.target.value)}
                            >
                                <MenuItem value="0">YouTube</MenuItem>
                                <MenuItem value="1">Own Content Video</MenuItem>
                                <MenuItem value="2">Own Content Image</MenuItem>
                            </TextField>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                id="offer_id"
                                select
                                label="Offer"
                                fullWidth
                                variant="outlined"
                                size="small"
                                value={Offer || ''}
                                onChange={(e) => setOffer(e.target.value)}
                            >
                                {hotOffers.map(offer => (
                                    <MenuItem key={offer.id} value={offer.id}>
                                        {offer.offer_name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                fullWidth
                                name="url"
                                label="URL"
                                type="text"
                                InputLabelProps={{ shrink: true }}
                                id="url"
                                {...register('url')}
                            />
                        </Grid>

                        <Grid item xs={4}>
                            <FormControlLabel
                                label="Forced"
                                control={
                                    <Checkbox
                                        checked={isForced === 1}
                                        onChange={(e) => setIsForced(e.target.checked ? 1 : 0)}
                                        style={{ color: '#673ab7' }}
                                    />
                                }
                            />
                        </Grid>

                        {isForced && (
                            <Grid item xs={8}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    name="force_timing"
                                    label="Forced Timing"
                                    type="text"
                                    InputLabelProps={{ shrink: true }}
                                    id="force_timing"
                                    {...register('force_timing')}
                                />
                            </Grid>
                        )}

                        <Grid item xs={4}>
                            <FormControlLabel
                                label="Image (or) Video"
                                control={
                                    <Checkbox
                                        checked={showUploadField}
                                        onChange={(e) => {
                                            setShowUploadField(e.target.checked);
                                            if (e.target.checked) {
                                                setValue('url', ''); 
                                            }
                                        }}
                                        style={{ color: '#673ab7' }}
                                    />
                                }
                            />

                        </Grid>

                        {showUploadField && (
                            <Grid item xs={8}>
                                <div style={{ display: 'flex', alignItems: 'center' }}>
                                    <input
                                        type="file"
                                        accept="image/*,video/*"
                                        ref={hiddenFileInput1}
                                        style={{ display: 'none' }}
                                        onChange={handleFileChange}
                                        id="contained-button-file1"
                                    />
                                    <label htmlFor="contained-button-file1">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            component="span"
                                        >
                                            Upload File
                                        </Button>
                                    </label>

                                    {previewFile && (
                                        <div style={{ paddingLeft: '10px' }}>
                                            {previewFile.type.startsWith('image') ? (
                                                <img
                                                    src={previewFile.url}
                                                    alt="Preview"
                                                    style={{ width: '100px' }}
                                                />
                                            ) : (
                                                <video
                                                    controls
                                                    src={previewFile.url}
                                                    style={{ width: '150px' }}
                                                />
                                            )}
                                        </div>
                                    )}
                                </div>
                            </Grid>
                        )}

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
                                        fullWidth
                                        variant="contained"
                                        style={{ backgroundColor: GREEN, width: 150 }}
                                    >
                                        {pageMode === 'add' ? 'Create' : 'Update'}
                                    </Button>
                                </div>
                                <div>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        style={{ backgroundColor: LIGHT_GREY, width: 150 }}
                                        onClick={() => {
                                            history.push('/ViewHotOffers');
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
